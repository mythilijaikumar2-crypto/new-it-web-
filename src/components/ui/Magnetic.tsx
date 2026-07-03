import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

interface MagneticProps {
  children: React.ReactElement<any>;
  range?: number;
}

export const Magnetic: React.FC<MagneticProps> = ({ children, range = 35 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Motion Values for positional offsets
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs for smooth lagged return/pull
  const springConfig = { damping: 15, stiffness: 150, mass: 0.6 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  useEffect(() => {
    // Only apply on fine-pointer devices (desktops with mouse)
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    setIsSupported(mediaQuery.matches);

    const handleQueryChange = (e: MediaQueryListEvent) => {
      setIsSupported(e.matches);
    };

    mediaQuery.addEventListener('change', handleQueryChange);
    return () => mediaQuery.removeEventListener('change', handleQueryChange);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Middle point of element
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Distance from pointer to center
    const distanceX = clientX - centerX;
    const distanceY = clientY - centerY;

    // Scale calculation based on range factor
    const forceFactor = range / 100;
    x.set(distanceX * forceFactor);
    y.set(distanceY * forceFactor);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  if (!isSupported || shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      {React.cloneElement(children, {
        className: `${children.props.className || ''} ${isHovered ? 'shadow-card_hover' : ''}`
      })}
    </motion.div>
  );
};
export default Magnetic;
