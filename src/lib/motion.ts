import type { Variants } from 'framer-motion';

// Easing and Physics Constants
export const TRANSITIONS = {
  ease: [0.16, 1, 0.3, 1] as [number, number, number, number], // Custom ease curve for elegant, smooth motion
  spring: {
    type: 'spring' as const,
    stiffness: 260,
    damping: 24,
  },
  hoverSpring: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 15,
  },
  duration: {
    snappy: 0.2,
    normal: 0.3,
    reveal: 0.5,
    slow: 0.8,
  }
};

// Reusable Framer Motion Variants
export const fadeIn = (duration = TRANSITIONS.duration.reveal): Variants => ({
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration, ease: TRANSITIONS.ease }
  }
});

export const slideUp = (yOffset = 20, duration = TRANSITIONS.duration.reveal): Variants => ({
  hidden: { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: TRANSITIONS.ease }
  }
});

export const slideRight = (xOffset = 20, duration = TRANSITIONS.duration.reveal): Variants => ({
  hidden: { opacity: 0, x: xOffset },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration, ease: TRANSITIONS.ease }
  }
});

export const scaleIn = (startScale = 0.95, duration = TRANSITIONS.duration.reveal): Variants => ({
  hidden: { opacity: 0, scale: startScale },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration, ease: TRANSITIONS.ease }
  }
});

// Stagger Parent & Child Configs
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren,
    }
  }
});

export const staggerItemSlideUp = (yOffset = 16): Variants => ({
  hidden: { opacity: 0, y: yOffset },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 260,
      damping: 24,
    }
  }
});

export const staggerItemFade = (): Variants => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { ease: TRANSITIONS.ease, duration: TRANSITIONS.duration.normal }
  }
});
