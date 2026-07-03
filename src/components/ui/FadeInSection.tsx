import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { TRANSITIONS } from '../../lib/motion';

interface FadeInSectionProps {
  children: React.ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  stagger?: boolean;
  staggerChildrenDelay?: number;
  className?: string;
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  delay = 0,
  direction = 'up',
  stagger = false,
  staggerChildrenDelay = 0.08,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();

  const getTranslation = () => {
    if (shouldReduceMotion || direction === 'none') {
      return { x: 0, y: 0 };
    }
    const offset = 24;
    switch (direction) {
      case 'up':
        return { x: 0, y: offset };
      case 'down':
        return { x: 0, y: -offset };
      case 'left':
        return { x: offset, y: 0 };
      case 'right':
        return { x: -offset, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const translation = getTranslation();

  const containerVariants = {
    hidden: {
      opacity: 0,
      x: translation.x,
      y: translation.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: TRANSITIONS.duration.reveal,
        ease: TRANSITIONS.ease,
        delay: delay,
        when: 'beforeChildren',
        staggerChildren: stagger ? staggerChildrenDelay : 0,
      } as any,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const shouldReduceMotion = useReducedMotion();
  
  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 12 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring' as const, 
        stiffness: 260, 
        damping: 24 
      } as any
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};
