import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  to?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  to,
  children,
  className = '',
  ...props
}) => {
  const shouldReduceMotion = useReducedMotion();

  // Added 'relative overflow-hidden' to clip the sheen effect
  const baseStyles = 'inline-flex items-center justify-center font-heading font-semibold rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-h-[44px] min-w-[44px] cursor-pointer relative overflow-hidden';
  
  const variantStyles = {
    primary: 'bg-primary text-text_primary hover:bg-primary_hover shadow-sm',
    secondary: 'bg-surface text-text_primary hover:bg-neutral-800 border border-border_custom',
    ghost: 'bg-transparent text-text_primary hover:bg-surface/50',
  };

  const paddingStyles = 'py-3 px-6 md:py-[14px] md:px-7 text-sm md:text-base';

  const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${paddingStyles} ${className}`;

  // Framer Motion spring interactions (parent hover state propagates to children)
  const hoverScale = shouldReduceMotion ? 1 : 1.02;
  const tapScale = shouldReduceMotion ? 1 : 0.97;

  const motionProps = {
    initial: "initial",
    whileHover: "hover",
    whileTap: "tap",
    animate: "animate",
    style: { scale: 1, y: 0 }
  };

  // Button scale/spring transitions
  const buttonWrapperVariants = {
    initial: { scale: 1, y: 0 },
    hover: { 
      scale: hoverScale, 
      y: shouldReduceMotion ? 0 : -2,
      transition: { type: 'spring' as const, stiffness: 400, damping: 15 }
    },
    tap: { 
      scale: tapScale, 
      y: 0,
      transition: { type: 'spring' as const, stiffness: 400, damping: 15 }
    }
  };

  // Sheen variants (sweeps from left to right)
  const sheenVariants = {
    initial: { x: "-120%" },
    hover: { 
      x: "150%",
      transition: { 
        duration: 0.6, 
        ease: "easeOut"
      } as any
    }
  };

  const renderContent = () => (
    <>
      <span className="relative z-10">{children}</span>
      {/* Sheen Element: Only render on primary and when reduced motion is disabled */}
      {variant === 'primary' && !shouldReduceMotion && (
        <motion.div
          variants={sheenVariants}
          className="absolute top-0 bottom-0 left-0 w-1/3 bg-linear-to-r from-transparent via-white/25 to-transparent -skew-x-20 pointer-events-none z-0"
        />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block">
        <motion.span
          className={combinedClassName}
          role="button"
          variants={buttonWrapperVariants}
          {...motionProps}
        >
          {renderContent()}
        </motion.span>
      </Link>
    );
  }

  return (
    <motion.button
      className={combinedClassName}
      variants={buttonWrapperVariants}
      {...motionProps}
      {...(props as any)}
    >
      {renderContent()}
    </motion.button>
  );
};
export default Button;
