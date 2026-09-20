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
          initial: { opacity: 0, y: distance },
          animate: { opacity: 1, y: 0 },
        };
      case 'fadeDown':
        return {
          initial: { opacity: 0, y: -distance },
          animate: { opacity: 1, y: 0 },
        };
      case 'fadeLeft':
        return {
          initial: { opacity: 0, x: distance },
          animate: { opacity: 1, x: 0 },
        };
      case 'fadeRight':
        return {
          initial: { opacity: 0, x: -distance },
          animate: { opacity: 1, x: 0 },
        };
      case 'fadeScale':
        return {
          initial: { opacity: 0, scale: 0.94 },
          animate: { opacity: 1, scale: 1 },
        };
      case 'blurIn':
        return {
          initial: { opacity: 0, scale: 0.97 },
          animate: { opacity: 1, scale: 1 },
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
        hidden: { opacity: 0, y: yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.65,
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
 * InteractiveCard: High-performance card container with hardware-accelerated hover physics
 * and zero layout-thrashing / zero React state re-renders on mouse movements.
 */
export const InteractiveCard: React.FC<InteractiveCardProps> = ({
  children,
  className = '',
  onClick,
  id,
}) => {
  return (
    <div
      id={id}
      onClick={onClick}
      className={`relative group transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_35px_rgba(11,31,77,0.08)] ${className}`}
    >
      {children}
    </div>
  );
};
