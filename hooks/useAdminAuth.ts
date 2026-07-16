
import { useState, useEffect, useCallback } from 'react';
import { AdminAuthState, StrapiUser } from '../types';
import { adminApi, adminAuthStorage } from '../services/adminApi';

export const useAdminAuth = () => {
  const [authState, setAuthState] = useState<AdminAuthState>({
    user: adminAuthStorage.getUser(),
    token: adminAuthStorage.getToken(),
    isAuthenticated: !!adminAuthStorage.getToken(),
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const { jwt, user } = await adminApi.login(email, password);
      adminAuthStorage.save(jwt, user);
      setAuthState({ user, token: jwt, isAuthenticated: true });
    } catch (err: any) {
      setError(err.message || 'Login failed. Check credentials.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    adminAuthStorage.clear();
    setAuthState({ user: null, token: null, isAuthenticated: false });
  }, []);

  return { ...authState, login, logout, isLoading, error };
};
