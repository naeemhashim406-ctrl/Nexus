import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useSpring, useMotionValue, useTransform } from 'motion/react';

// Luxury easing curve for silky, organic deceleration
export const EASE_LUXURY = [0.22, 1, 0.36, 1] as const;

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'fadeScale' | 'blurIn';
  delay?: number;
  duration?: number;
  distance?: number;
  once?: boolean;
  threshold?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  variant = 'fadeUp',
  delay = 0,
  duration = 0.85,
  distance = 32,
  once = true,
  threshold = 0.15,
}) => {
  const getInitialAndAnimate = () => {
    switch (variant) {
      case 'fadeUp':
        return {
          initial: { opacity: 0, y: distance, filter: 'blur(4px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        };
      case 'fadeDown':
        return {
          initial: { opacity: 0, y: -distance, filter: 'blur(4px)' },
          animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
        };
      case 'fadeLeft':
        return {
          initial: { opacity: 0, x: distance, filter: 'blur(4px)' },
          animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
        };
      case 'fadeRight':
        return {
          initial: { opacity: 0, x: -distance, filter: 'blur(4px)' },
          animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
        };
      case 'fadeScale':
        return {
          initial: { opacity: 0, scale: 0.92, filter: 'blur(6px)' },
          animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
        };
      case 'blurIn':
        return {
          initial: { opacity: 0, filter: 'blur(12px)', scale: 0.98 },
          animate: { opacity: 1, filter: 'blur(0px)', scale: 1 },
        };
      default:
        return {
          initial: { opacity: 0, y: distance },
          animate: { opacity: 1, y: 0 },
        };
    }
  };

  const { initial, animate } = getInitialAndAnimate();

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: EASE_LUXURY,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
  once?: boolean;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.1,
  delayChildren = 0.05,
  once = true,
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.12 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}> = ({ children, className = '', yOffset = 24 }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset, filter: 'blur(4px)' },
        visible: {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          transition: {
            duration: 0.75,
            ease: EASE_LUXURY,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface InteractiveCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAngle?: number;
  enableSpotlight?: boolean;
  onClick?: () => void;
  id?: string;
}

/**
 * InteractiveCard: Adds subtle 3D hover physics and cursor light spotlight to revealed cards
 */
export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className = '',
  tiltAngle = 4,
  enableSpotlight = true,
  onClick,
  id,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Mouse position inside card for spotlight and tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Springs for silky physics
  const springConfig = { damping: 20, stiffness: 260 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltAngle, -tiltAngle]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltAngle, tiltAngle]), springConfig);
  const [spotlightPos, setSpotlightPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsTouchDevice(window.matchMedia('(pointer: coarse)').matches);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTouchDevice || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
    setSpotlightPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice) setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      id={id}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: isTouchDevice ? 0 : rotateX,
        rotateY: isTouchDevice ? 0 : rotateY,
      }}
      whileHover={{
        y: -4,
        transition: { duration: 0.3, ease: EASE_LUXURY },
      }}
      className={`relative group ${className}`}
    >
      {/* Dynamic Cursor Spotlight Effect */}
      {enableSpotlight && isHovered && !isTouchDevice && (
        <div
          className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-100 transition-opacity duration-300 z-10"
          style={{
            background: `radial-gradient(400px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(91, 184, 245, 0.12), transparent 70%)`,
          }}
        />
      )}
      {children}
    </motion.div>
  );
};
