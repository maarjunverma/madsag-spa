import React from 'react';

interface MadsagLogoProps {
  className?: string;
  variant?: 'full' | 'mark';
}

const MadsagLogo: React.FC<MadsagLogoProps> = ({ className = 'h-10 w-auto', variant = 'full' }) => {
  if (variant === 'mark') {
    return (
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="MADSAG Logo Mark"
      >
        {/* Geometric mark: stylized M with angular geometry */}
        <polygon points="4,36 20,4 36,36 30,36 20,14 10,36" fill="#f59e0b" />
        <polygon points="14,26 20,14 26,26 22,26 20,18 18,26" fill="#030712" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 220 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="MADSAG"
    >
      {/* Geometric mark */}
      <polygon points="0,40 18,2 36,40 30,40 18,14 6,40" fill="#f59e0b" />
      <polygon points="10,30 18,14 26,30 22,30 18,18 14,30" fill="#030712" />

      {/* MADSAG wordmark */}
      <text
        x="46"
        y="34"
        fontFamily="'Poppins', 'Arial Black', sans-serif"
        fontWeight="900"
        fontSize="28"
        letterSpacing="-1"
        fill="#ffffff"
        style={{ userSelect: 'none' }}
      >
        MADSAG
      </text>
    </svg>
  );
};

export default MadsagLogo;
