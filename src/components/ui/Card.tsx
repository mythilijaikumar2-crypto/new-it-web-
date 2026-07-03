import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TRANSITIONS } from '../../lib/motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hoverEffect = true,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Changed to bg-card_bg and border-border_custom for dark theme support
  const baseStyles = 'bg-card_bg rounded-lg border border-border_custom shadow-card_default overflow-hidden p-5 md:p-8 transition-shadow duration-300';
  const hoverStyles = hoverEffect ? 'hover:shadow-card_hover' : '';

  const motionProps = hoverEffect && !shouldReduceMotion
    ? {
        whileHover: { y: -6 },
        transition: TRANSITIONS.hoverSpring
      }
    : {};

  return (
    <motion.div
      className={`${baseStyles} ${hoverStyles} ${className}`}
      {...motionProps}
    >
      {children}
    </motion.div>
  );
};
export default Card;
