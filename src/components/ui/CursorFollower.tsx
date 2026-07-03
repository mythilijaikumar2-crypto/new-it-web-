import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export const CursorFollower: React.FC = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Position coordinates
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Spring animations for the lag effect
  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable for desktop with mouse
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsSupported(mediaQuery.matches);

    const handleQueryChange = (e: MediaQueryListEvent) => {
      setIsSupported(e.matches);
    };

    mediaQuery.addEventListener('change', handleQueryChange);
    return () => mediaQuery.removeEventListener('change', handleQueryChange);
  }, []);

  useEffect(() => {
    if (!isSupported || shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.getAttribute('onclick') !== null
      ) {
        setIsHoveringClickable(true);
      } else {
        setIsHoveringClickable(false);
      }
    };

    const handleMouseLeaveWindow = () => {
      setIsVisible(false);
    };

    const handleMouseEnterWindow = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeaveWindow);
    document.addEventListener('mouseenter', handleMouseEnterWindow);

    // Apply custom-cursor-active class to body
    document.body.classList.add('custom-cursor-active');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeaveWindow);
      document.removeEventListener('mouseenter', handleMouseEnterWindow);
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isSupported, isVisible, shouldReduceMotion, cursorX, cursorY]);

  if (!isSupported || shouldReduceMotion || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Outer lagged ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: springX,
          y: springY,
        }}
        animate={{
          scale: isHoveringClickable ? 1.5 : 1,
          backgroundColor: isHoveringClickable ? 'rgba(6, 182, 212, 0.1)' : 'rgba(0,0,0,0)',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      />
      {/* Inner precise dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full bg-accent pointer-events-none z-50 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
        animate={{
          scale: isHoveringClickable ? 0.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      />
    </>
  );
};
