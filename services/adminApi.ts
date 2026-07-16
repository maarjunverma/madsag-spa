
import { STRAPI_URL } from '../constants';
import { BlogPost, PortfolioItem, StrapiUser, StrapiLead } from '../types';

const BASE = STRAPI_URL.endsWith('/') ? STRAPI_URL.slice(0, -1) : STRAPI_URL;

/** Extracts a media URL from a Strapi field, supporting both v4 and v5 response shapes. */
function mediaUrl(field: any): string {
  if (field?.url) return `${BASE}${field.url}`;
  if (field?.data?.attributes?.url) return `${BASE}${field.data.attributes.url}`;
  return '';
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTH STORAGE HELPERS
// ─────────────────────────────────────────────────────────────────────────────
const TOKEN_KEY = 'madsag_admin_token';
const USER_KEY = 'madsag_admin_user';

export const adminAuthStorage = {
  getToken: (): string | null => localStorage.getItem(TOKEN_KEY),
  getUser: (): StrapiUser | null => {
    const u = localStorage.getItem(USER_KEY);
    return u ? JSON.parse(u) : null;
  },
  save: (token: string, user: StrapiUser) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },
  clear: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// BASE REQUEST HELPER
// ─────────────────────────────────────────────────────────────────────────────
async function apiRequest<T>(
  path: string,
  options: RequestInit = {},
  token?: string | null
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  const json = await res.json();
  if (!res.ok) {
    const msg =
      json?.error?.message ||
      json?.message ||
      `Request failed: ${res.status}`;
    throw new Error(msg);
  }
  return json as T;
}

// ─────────────────────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────────────────────
export interface LoginResponse {
  jwt: string;
  user: StrapiUser;
}

export const adminApi = {
  login: async (identifier: string, password: string): Promise<LoginResponse> => {
    return apiRequest<LoginResponse>('/api/auth/local', {
      method: 'POST',
      body: JSON.stringify({ identifier, password }),
    });
  },

  // ─── BLOG POSTS ───────────────────────────────────────────────────────────

  getBlogs: async (token: string): Promise<BlogPost[]> => {
    const res = await apiRequest<{ data: any[] }>(
      '/api/blog-posts?sort=createdAt:desc&pagination[pageSize]=100&populate=*',
      {},
      token
    );
    return res.data.map((item: any) => {
      const a = item.attributes ?? item;
      return {
        id: String(item.id),
        strapiId: item.id,
        title: a.title ?? '',
        excerpt: a.excerpt ?? '',
        content: a.content ?? '',
        author: a.author ?? '',
        date: a.publishedAt ? new Date(a.publishedAt).toLocaleDateString('en-IN') : new Date(a.createdAt).toLocaleDateString('en-IN'),
        category: a.category ?? 'General',
        image: mediaUrl(a.image),
        readTime: a.readTime ?? '5 min read',
      };
    });
  },

  createBlog: async (token: string, data: Partial<BlogPost>): Promise<void> => {
    await apiRequest('/api/blog-posts', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          author: data.author,
          category: data.category,
          readTime: data.readTime,
        },
      }),
    }, token);
  },

  updateBlog: async (token: string, strapiId: number, data: Partial<BlogPost>): Promise<void> => {
    await apiRequest(`/api/blog-posts/${strapiId}`, {
      method: 'PUT',
      body: JSON.stringify({
        data: {
          title: data.title,
          excerpt: data.excerpt,
          content: data.content,
          author: data.author,
          category: data.category,
          readTime: data.readTime,
        },
      }),
    }, token);
  },

  deleteBlog: async (token: string, strapiId: number): Promise<void> => {
    await apiRequest(`/api/blog-posts/${strapiId}`, { method: 'DELETE' }, token);
  },

  // ─── PORTFOLIO ITEMS ──────────────────────────────────────────────────────

  getPortfolioItems: async (token: string): Promise<PortfolioItem[]> => {
    const res = await apiRequest<{ data: any[] }>(
      '/api/portfolio-items?sort=createdAt:desc&pagination[pageSize]=100&populate=*',
      {},
      token
    );
    return res.data.map((item: any) => {
      const a = item.attributes ?? item;
      const tags = Array.isArray(a.tags)
        ? a.tags
        : typeof a.tags === 'string'
        ? a.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
        : [];
      return {
        id: String(item.id),
        strapiId: item.id,
        title: a.title ?? '',
        client: a.client ?? '',
        thumbnail: mediaUrl(a.thumbnail),
        description: a.description ?? '',
        challenge: a.challenge ?? '',
        solution: a.solution ?? '',
        result: a.result ?? '',
        images: (Array.isArray(a.images?.data) ? a.images.data : Array.isArray(a.images) ? a.images : []).map(
          (img: any) => mediaUrl(img)
        ).filter(Boolean),
        tags,
        liveUrl: a.liveUrl ?? '',
      };
    });
  },

  createPortfolioItem: async (token: string, data: Partial<PortfolioItem>): Promise<void> => {
    await apiRequest('/api/portfolio-items', {
      method: 'POST',
      body: JSON.stringify({
        data: {
          title: data.title,
          client: data.client,
          description: data.description,
          challenge: data.challenge,
          solution: data.solution,
          result: data.result,
          tags: Array.isArray(data.tags) ? data.tags : [],
        },
      }),
    }, token);
  },

  updatePortfolioItem: async (token: string, strapiId: number, data: Partial<PortfolioItem>): Promise<void> => {
    await apiRequest(`/api/portfolio-items/${strapiId}`, {
      method: 'PUT',
      body: JSON.stringify({
        data: {
          title: data.title,
          client: data.client,
          description: data.description,
          challenge: data.challenge,
          solution: data.solution,
          result: data.result,
          tags: Array.isArray(data.tags) ? data.tags : [],
        },
      }),
    }, token);
  },

  deletePortfolioItem: async (token: string, strapiId: number): Promise<void> => {
    await apiRequest(`/api/portfolio-items/${strapiId}`, { method: 'DELETE' }, token);
  },

  // ─── LEADS ────────────────────────────────────────────────────────────────

  getLeads: async (token: string): Promise<StrapiLead[]> => {
    const res = await apiRequest<{ data: any[] }>(
      '/api/leads?sort=createdAt:desc&pagination[pageSize]=200',
      {},
      token
    );
    return res.data.map((item: any) => {
      const a = item.attributes ?? item;
      return {
        id: item.id,
        FullName: a.FullName ?? '',
        Email: a.Email ?? '',
        Mobile_number: a.Mobile_number ?? '',
        Inquiry_subject: a.Inquiry_subject ?? '',
        url: a.url ?? '',
        Message: a.Message ?? '',
        createdAt: a.createdAt ?? '',
      };
    });
  },

  // ─── STATS ────────────────────────────────────────────────────────────────

  getStats: async (token: string): Promise<{ blogs: number; projects: number; leads: number }> => {
    const [blogsRes, portfolioRes, leadsRes] = await Promise.all([
      apiRequest<{ meta: { pagination: { total: number } } }>('/api/blog-posts?pagination[pageSize]=1', {}, token).catch(() => ({ meta: { pagination: { total: 0 } } })),
      apiRequest<{ meta: { pagination: { total: number } } }>('/api/portfolio-items?pagination[pageSize]=1', {}, token).catch(() => ({ meta: { pagination: { total: 0 } } })),
      apiRequest<{ meta: { pagination: { total: number } } }>('/api/leads?pagination[pageSize]=1', {}, token).catch(() => ({ meta: { pagination: { total: 0 } } })),
    ]);
    return {
      blogs: blogsRes.meta?.pagination?.total ?? 0,
      projects: portfolioRes.meta?.pagination?.total ?? 0,
      leads: leadsRes.meta?.pagination?.total ?? 0,
    };
  },
};
