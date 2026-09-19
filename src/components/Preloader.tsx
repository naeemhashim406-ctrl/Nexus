import React, { useEffect, useState } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setIsFadingOut(true), 150);
          setTimeout(() => onComplete(), 750);
          return 100;
        }
        // Accelerate smoothly
        const increment = Math.max(2, Math.floor((100 - prev) * 0.14));
        return Math.min(100, prev + increment);
      });
    }, 35);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#07132F] transition-opacity duration-700 select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Background ambient radial glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-[#1F4FA3]/20 blur-[120px] pointer-events-none" />

      <div className="relative flex flex-col items-center">
        {/* Animated Drawing N Mark */}
        <div className="relative w-28 h-28 mb-8">
          <svg
            viewBox="0 0 48 48"
            className="w-full h-full drop-shadow-[0_0_25px_rgba(91,184,245,0.4)]"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="preloader-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7CD0FF" />
                <stop offset="50%" stopColor="#5BB8F5" />
                <stop offset="100%" stopColor="#1F4FA3" />
              </linearGradient>
            </defs>

            {/* Left Pillar */}
            <path
              d="M11 9H17.5V39H11Z"
              fill="#FFFFFF"
              stroke="#5BB8F5"
              strokeWidth="0.8"
              style={{
                strokeDasharray: 90,
                strokeDashoffset: Math.max(0, 90 - (progress / 100) * 90),
                transition: 'stroke-dashoffset 0.1s linear',
              }}
            />

            {/* Right Pillar */}
            <path
              d="M30.5 9H37V39H30.5Z"
              fill="#FFFFFF"
              stroke="#5BB8F5"
              strokeWidth="0.8"
              style={{
                strokeDasharray: 90,
                strokeDashoffset: Math.max(0, 90 - (progress / 100) * 90),
                transition: 'stroke-dashoffset 0.1s linear',
              }}
            />

            {/* Faceted Diagonal Bar */}
            <path
              d="M17.5 9H23.5L34 32.5V39H28L17.5 15.5Z"
              fill="url(#preloader-grad)"
              style={{
                opacity: progress > 30 ? (progress - 30) / 70 : 0,
                transform: `scale(${0.8 + (progress / 100) * 0.2})`,
                transformOrigin: 'center',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
            />
          </svg>
        </div>

        {/* Wordmark */}
        <h1 className="font-sans text-2xl tracking-[0.32em] font-light text-white mb-2">
          NEXUS
        </h1>
        <p className="font-sans text-[10px] tracking-[0.25em] text-[#5BB8F5] uppercase font-medium mb-6">
          Global Travel &amp; Visa Solutions
        </p>

        {/* Progress Bar Line */}
        <div className="w-56 h-[2px] bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-gradient-to-r from-[#1F4FA3] via-[#5BB8F5] to-[#7CD0FF] transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Numeric Counter */}
        <span className="mt-3 font-sans text-xs tracking-widest text-[#8DBCE2]/80 font-mono">
          {progress}%
        </span>
      </div>
    </div>
  );
};
