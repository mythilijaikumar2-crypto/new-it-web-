import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useInView, useReducedMotion } from 'framer-motion';

const STEPS = [
  {
    step: '01',
    title: 'Discover',
    description: 'We learn your business, goals, technical constraints, and conduct initial workshops to align on parameters.',
  },
  {
    step: '02',
    title: 'Design',
    description: 'Architecture diagrams, interactive wireframes, and interface decisions are finalized before writing code.',
  },
  {
    step: '03',
    title: 'Build',
    description: 'Agile development sprints with live weekly demos, code reviews, and constant progress visibility.',
  },
  {
    step: '04',
    title: 'Launch & Support',
    description: 'Smooth production deployment followed by proactive SLA-backed hosting, optimization, and scaling support.',
  },
];

interface TimelineItemProps {
  step: string;
  title: string;
  description: string;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ step, title, description, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const shouldReduceMotion = useReducedMotion();

  const isEven = index % 2 === 0;
  const initialX = shouldReduceMotion ? 0 : isEven ? -40 : 40;

  return (
    <div
      ref={ref}
      className={`relative flex flex-col md:flex-row items-center justify-between w-full mb-12 md:mb-24 last:mb-0 ${
        isEven ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Spacer on desktop */}
      <div className="hidden md:block w-[45%]" />

      {/* Step Indicator Dot */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 flex items-center justify-center z-10">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
          className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center font-heading font-extrabold text-sm md:text-base border-4 ${
            isInView
              ? 'bg-bg_primary border-accent text-accent shadow-[0_0_12px_rgba(6,182,212,0.3)]'
              : 'bg-bg_primary border-border_custom text-text_muted'
          }`}
        >
          {step}
        </motion.div>
      </div>

      {/* Timeline Card */}
      <motion.div
        initial={{ opacity: 0, x: initialX, y: shouldReduceMotion ? 0 : 20 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: initialX, y: 20 }}
        transition={{ type: 'spring', stiffness: 200, damping: 22, delay: 0.2 }}
        className={`w-full md:w-[45%] pl-12 md:pl-0 text-left ${
          isEven ? 'md:text-right' : 'md:text-left'
        }`}
      >
        <div className="bg-card_bg border border-border_custom p-6 md:p-8 rounded-lg shadow-card_default hover:shadow-card_hover transition-shadow duration-300">
          <h3 className="font-heading font-extrabold text-lg md:text-xl text-text_primary mb-2">
            {title}
          </h3>
          <p className="text-sm md:text-base text-text_secondary leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export const ProcessTimeline: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking for progress line drawing
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative max-w-[1000px] mx-auto px-4">
      {/* Timeline Connecting Line */}
      {!shouldReduceMotion && (
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 bg-surface -translate-x-1/2">
          <motion.div
            className="w-full h-full bg-accent origin-top"
            style={{ scaleY }}
          />
        </div>
      )}

      {/* Static Fallback Line for Reduced Motion */}
      {shouldReduceMotion && (
        <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 bg-accent -translate-x-1/2" />
      )}

      {/* Process Steps */}
      <div className="relative">
        {STEPS.map((step, index) => (
          <TimelineItem
            key={step.step}
            step={step.step}
            title={step.title}
            description={step.description}
            index={index}
          />
        ))}
      </div>
    </div>
  );
};
export default ProcessTimeline;
