import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { Sparkles, ArrowRight } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

const LUXURY_EASE = [0.76, 0, 0.24, 1] as const;

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isReadyToEnter, setIsReadyToEnter] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse interaction for 3D emblem parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 200 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 200 });

  const rotateX = useTransform(springY, [-200, 200], [8, -8]);
  const rotateY = useTransform(springX, [-200, 200], [-8, 8]);
  const glowX = useTransform(springX, [-200, 200], [-30, 30]);
  const glowY = useTransform(springY, [-200, 200], [-30, 30]);

  useEffect(() => {
    // Check user accessibility preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      onComplete();
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsReadyToEnter(true);
          // Auto-trigger smooth reveal if user doesn't click
          setTimeout(() => {
            triggerExit();
          }, 350);
          return 100;
        }
        // Organic acceleration curve
        const step = Math.max(3, Math.floor((100 - prev) * 0.18));
        return Math.min(100, prev + step);
      });
    }, 28);

    return () => clearInterval(interval);
  }, []);

  const triggerExit = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 950);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <motion.div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onClick={triggerExit}
      className="fixed inset-0 z-[9999] overflow-hidden select-none cursor-pointer"
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      {/* Top Shutter Panel - Slides Up gracefully */}
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: isExiting ? '-100%' : '0%' }}
        transition={{ duration: 0.95, ease: LUXURY_EASE }}
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#061126] border-b border-[#5BB8F5]/10 shadow-[0_25px_50px_rgba(0,0,0,0.5)] z-10"
      />

      {/* Bottom Shutter Panel - Slides Down gracefully */}
      <motion.div
        initial={{ y: '0%' }}
        animate={{ y: isExiting ? '100%' : '0%' }}
        transition={{ duration: 0.95, ease: LUXURY_EASE }}
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#061126] border-t border-[#5BB8F5]/10 shadow-[0_-25px_50px_rgba(0,0,0,0.5)] z-10"
      />

      {/* Horizontal Light Iris Line that flashes as curtains split */}
      <motion.div
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{
          opacity: isExiting ? [0, 1, 0] : 0,
          scaleX: isExiting ? [0, 1.2, 1.5] : 0,
        }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-gradient-to-r from-transparent via-[#5BB8F5] to-transparent z-30 pointer-events-none shadow-[0_0_20px_#5BB8F5]"
      />

      {/* Ambient Radial Deep Light Glow */}
      <motion.div
        style={{ x: glowX, y: glowY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-[#1F4FA3]/25 via-[#5BB8F5]/15 to-transparent blur-[120px] pointer-events-none z-15"
      />

      {/* Centerpiece Content */}
      <motion.div
        initial={{ opacity: 1, scale: 1 }}
        animate={{
          opacity: isExiting ? 0 : 1,
          scale: isExiting ? 1.05 : 1,
        }}
        transition={{ duration: 0.6, ease: LUXURY_EASE }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
      >
        {/* Interactive Holographic N Emblem */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 mb-8 group">
          {/* Subtle spinning halo ring */}
          <div className="absolute inset-0 rounded-full border border-[#5BB8F5]/20 animate-[spin_12s_linear_infinite]" />
          <div className="absolute -inset-2 rounded-full border border-dashed border-[#1F4FA3]/30 animate-[spin_20s_linear_infinite_reverse]" />

          <svg
            viewBox="0 0 48 48"
            className="w-full h-full drop-shadow-[0_0_30px_rgba(91,184,245,0.45)] transition-transform duration-300"
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

            {/* Left Vertical Pillar */}
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

            {/* Right Vertical Pillar */}
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
                opacity: progress > 25 ? (progress - 25) / 75 : 0,
                transform: `scale(${0.85 + (progress / 100) * 0.15})`,
                transformOrigin: 'center',
                transition: 'opacity 0.2s ease, transform 0.2s ease',
              }}
            />

            {/* Sparks */}
            {progress > 50 && (
              <>
                <circle cx="11.5" cy="9.5" r="1.5" fill="#7CD0FF" className="animate-ping opacity-75" />
                <circle cx="36.5" cy="38.5" r="1.5" fill="#5BB8F5" className="animate-pulse" />
              </>
            )}
          </svg>
        </div>

        {/* Wordmark & Typography */}
        <h1 className="font-sans text-2xl sm:text-3xl tracking-[0.34em] font-light text-white mb-2">
          NEXUS
        </h1>
        <p className="font-sans text-[9px] sm:text-[10px] tracking-[0.28em] text-[#5BB8F5] uppercase font-medium mb-7">
          Global Travel &amp; Visa Solutions
        </p>

        {/* Dynamic Progress Bar */}
        <div className="w-56 sm:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-[#1F4FA3] via-[#5BB8F5] to-[#7CD0FF] shadow-[0_0_10px_#5BB8F5]"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Progress Counter */}
        <div className="flex items-center gap-3 mt-3.5">
          <span className="font-sans text-xs tracking-widest text-[#8DBCE2]/90 font-mono">
            {progress}%
          </span>
        </div>

        {/* Interactive Prompt Button (Clickable hint) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-[10px] sm:text-[11px] text-[#5BB8F5] tracking-widest uppercase transition-all pointer-events-auto shadow-sm group"
        >
          <Sparkles className="w-3 h-3 text-[#7CD0FF] group-hover:rotate-12 transition-transform" />
          <span>{isReadyToEnter ? 'Click to Enter' : 'Click to Skip'}</span>
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};
