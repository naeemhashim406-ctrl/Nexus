import React from 'react';

interface BrandLogoProps {
  variant?: 'light' | 'dark' | 'monochrome';
  size?: 'sm' | 'md' | 'lg' | 'hero';
  showSubline?: boolean;
  className?: string;
  onClick?: () => void;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  size = 'md',
  showSubline = true,
  className = '',
  onClick,
}) => {
  const isDark = variant === 'dark';

  // Dimension scaling
  const dimensions = {
    sm: { symbol: 32, title: 'text-lg', sub: 'text-[7.5px]' },
    md: { symbol: 40, title: 'text-xl', sub: 'text-[8.5px]' },
    lg: { symbol: 48, title: 'text-2xl', sub: 'text-[9.5px]' },
    hero: { symbol: 64, title: 'text-3xl sm:text-4xl', sub: 'text-[10px] sm:text-[11px]' },
  }[size];

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 sm:gap-3.5 select-none transition-all flex-shrink-0 relative z-20 ${
        onClick ? 'cursor-pointer' : ''
      } ${className}`}
      aria-label="NEXUS Global Travel & Visa Solutions"
    >
      {/* Faceted N Mark Symbol */}
      <div className="relative flex-shrink-0">
        <svg
          width={dimensions.symbol}
          height={dimensions.symbol}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible drop-shadow-[0_4px_12px_rgba(91,184,245,0.25)]"
        >
          <defs>
            {/* Sky Blue to Royal Blue facet gradient */}
            <linearGradient id="nexus-diag-grad" x1="14" y1="10" x2="34" y2="38" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7CD0FF" />
              <stop offset="35%" stopColor="#5BB8F5" />
              <stop offset="70%" stopColor="#2F6CD6" />
              <stop offset="100%" stopColor="#1F4FA3" />
            </linearGradient>

            {/* Facet shadow overlay for 3D crystalline depth */}
            <linearGradient id="nexus-facet-shadow" x1="18" y1="12" x2="28" y2="34" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#5BB8F5" stopOpacity="0" />
              <stop offset="100%" stopColor="#0B1F4D" stopOpacity="0.45" />
            </linearGradient>

            {/* Ambient subtle glow */}
            <filter id="nexus-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Left Vertical Bar - Deep Navy */}
          <rect
            x="8"
            y="9"
            width="7"
            height="30"
            rx="1.5"
            fill={isDark ? '#E2EDFA' : '#0B1F4D'}
            className="transition-colors duration-300"
          />

          {/* Right Vertical Bar - Deep Navy */}
          <rect
            x="33"
            y="9"
            width="7"
            height="30"
            rx="1.5"
            fill={isDark ? '#E2EDFA' : '#0B1F4D'}
            className="transition-colors duration-300"
          />

          {/* Primary Diagonal Crystal Facet */}
          <path
            d="M15 9.5H21.5L34 33.5V38.5H27.5L15 14.5V9.5Z"
            fill="url(#nexus-diag-grad)"
          />

          {/* Micro Highlighting Facet for Diamond / Angular cut */}
          <path
            d="M15 9.5L27.5 33.5L34 38.5L21.5 14.5Z"
            fill="url(#nexus-facet-shadow)"
            opacity="0.75"
          />

          {/* Top-left pinhead spark */}
          <circle cx="11.5" cy="9.5" r="1.5" fill="#5BB8F5" opacity="0.9" />
          {/* Bottom-right pinhead spark */}
          <circle cx="36.5" cy="38.5" r="1.5" fill="#7CD0FF" opacity="0.9" />
        </svg>
      </div>

      {/* Wordmark & Subline */}
      <div className="flex flex-col justify-center min-w-0">
        <div
          className={`font-sans tracking-[0.2em] sm:tracking-[0.24em] font-light leading-none ${dimensions.title} ${
            isDark ? 'text-white' : 'text-[#0B1F4D]'
          }`}
        >
          NEXUS
        </div>
        {showSubline && (
          <span
            className={`tracking-[0.12em] sm:tracking-[0.2em] font-medium uppercase mt-1 leading-tight whitespace-nowrap overflow-hidden text-ellipsis max-w-[170px] xs:max-w-[210px] sm:max-w-none ${dimensions.sub} ${
              isDark ? 'text-[#8DBCE2]' : 'text-[#5B6B85]'
            }`}
          >
            GLOBAL TRAVEL &amp; VISA SOLUTIONS
          </span>
        )}
      </div>
    </div>
  );
};
