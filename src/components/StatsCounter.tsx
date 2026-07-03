import React, { useState, useEffect, useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

const STATS = [
  { value: 98, suffix: '%', label: 'Client Retention' },
  { value: 45, suffix: '+', label: 'Engineers Augmenting' },
  { value: 12, suffix: 'ms', label: 'Average SLA Latency' },
  { value: 150, suffix: 'k', label: 'TPS Peak Load' },
];

interface CounterProps {
  value: number;
  suffix: string;
}

const Counter: React.FC<CounterProps> = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setCount(value);
      return;
    }

    let start = 0;
    const duration = 1500; // ms
    const increment = value / (duration / 16); // ~60fps
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [isInView, value, shouldReduceMotion]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
};

export const StatsCounter: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {STATS.map((stat, idx) => (
        <div key={idx} className="space-y-2 text-center md:text-left">
          <div className="font-heading font-extrabold text-4xl md:text-5xl text-secondary">
            <Counter value={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-xs md:text-sm font-semibold uppercase tracking-wider text-text_muted">
            {stat.label}
          </div>
        </div>
      ))}
    </div>
  );
};
export default StatsCounter;
