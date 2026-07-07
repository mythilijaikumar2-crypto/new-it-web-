import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { TRANSITIONS } from '../lib/motion';

const TESTIMONIALS = [
  {
    quote: "Ascope Tech designed and delivered our core cloud infrastructure in record time. Their architectural advice was flawless, and the performance has been outstanding.",
    author: "Saranya Krishnan",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "The team at Ascope Tech are elite engineering partners. They stepped in to rescue a failing mobile app codebase and turned it into our highest-rated product.",
    author: "Karthik Srinivasan",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "IT Staff Augmentation from Ascope Tech helped us scale our engineering team by 5 senior engineers in a week. Outstanding quality of code and work ethic.",
    author: "Hariharan Venkatesan",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "Working with Ascope Tech was a game-changer. They built our AI-powered customer analytics portal from scratch, delivering a clean, highly scalable interface.",
    author: "Divya Ramakrishnan",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "Ascope Tech has been our go-to partner for all critical software upgrades. Their attention to detail and responsiveness is unmatched.",
    author: "Srinivasan Ramanujam",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "Their expertise in custom database migration saved us weeks of downtime. Truly a remarkable engineering team.",
    author: "Lakshmi Narayanan",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "From UI/UX mockups to full production deployment, the development flow was extremely smooth and professional.",
    author: "Rajesh Kumar",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=150&q=80"
  },
  {
    quote: "The modern interface designs and optimization recommendations they provided exceeded all of our expectations.",
    author: "Sandhya Hegde",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
  }
];

export const TestimonialCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoplayPaused, setIsAutoplayPaused] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const autoplayTimerRef = useRef<any>(null);

  // Autoplay functionality (moves every 5 seconds)
  useEffect(() => {
    if (isAutoplayPaused) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    autoplayTimerRef.current = setInterval(() => {
      handleNext();
    }, 5000);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [activeIndex, isAutoplayPaused]);

  const handlePrev = () => {
    setDirection(-1);
    setActiveIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setActiveIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Drag handlers for mobile swipe
  const handleDragEnd = (_event: any, info: any) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      handlePrev();
    } else if (info.offset.x < -swipeThreshold) {
      handleNext();
    }
  };

  // Variants for mobile sliding
  const slideVariants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? 100 : -100,
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: TRANSITIONS.duration.normal }
      } as any
    },
    exit: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir > 0 ? -100 : 100,
      opacity: 0,
      transition: {
        x: { type: 'spring' as const, stiffness: 300, damping: 30 },
        opacity: { duration: TRANSITIONS.duration.snappy }
      } as any
    })
  };

  return (
    <div 
      className="w-full relative px-4"
      onMouseEnter={() => setIsAutoplayPaused(true)}
      onMouseLeave={() => setIsAutoplayPaused(false)}
      onTouchStart={() => setIsAutoplayPaused(true)}
      onTouchEnd={() => setIsAutoplayPaused(false)}
    >
      {/* Mobile/Tablet View (1 card visible at a time) */}
      <div className="md:hidden overflow-hidden relative min-h-[340px] flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={activeIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.4}
            onDragEnd={handleDragEnd}
            className="absolute w-full max-w-sm bg-card_bg border border-border_custom p-6 rounded-lg shadow-card_default text-left select-none touch-pan-y"
          >
            <Quote className="w-8 h-8 text-accent/20 mb-4" />
            <p className="text-sm text-text_secondary italic leading-relaxed mb-6">
              "{TESTIMONIALS[activeIndex].quote}"
            </p>
            <div className="flex items-center space-x-3">
              <img
                src={TESTIMONIALS[activeIndex].avatar}
                alt={TESTIMONIALS[activeIndex].author}
                className="w-10 h-10 rounded-full object-cover border border-border_custom"
                loading="lazy"
              />
              <div>
                <h4 className="font-heading font-extrabold text-sm text-text_primary">
                  {TESTIMONIALS[activeIndex].author}
                </h4>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Desktop View (Show 3 grid items) */}
      <div className="hidden md:grid grid-cols-3 gap-6">
        {[...TESTIMONIALS, ...TESTIMONIALS].slice(activeIndex, activeIndex + 3).map((item, idx) => (
          <div
            key={idx}
            className="bg-card_bg border border-border_custom p-8 rounded-lg shadow-card_default hover:shadow-card_hover transition-all duration-300 text-left flex flex-col justify-between"
          >
            <div>
              <Quote className="w-10 h-10 text-accent/20 mb-4" />
              <p className="text-base text-text_secondary italic leading-relaxed mb-6">
                "{item.quote}"
              </p>
            </div>
            <div className="flex items-center space-x-3 border-t border-divider pt-4 mt-auto">
              <img
                src={item.avatar}
                alt={item.author}
                className="w-12 h-12 rounded-full object-cover border border-border_custom"
                loading="lazy"
              />
              <div>
                <h4 className="font-heading font-extrabold text-sm text-text_primary">
                  {item.author}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Indicators & Buttons */}
      <div className="flex items-center justify-center space-x-6 mt-6">
        <button
          onClick={handlePrev}
          className="w-10 h-10 rounded-full bg-surface hover:bg-neutral-800 transition-colors flex items-center justify-center text-text_primary cursor-pointer min-h-[44px] min-w-[44px]"
          aria-label="Previous Testimonial"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        {/* Index Dots */}
        <div className="flex space-x-2">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > activeIndex ? 1 : -1);
                setActiveIndex(idx);
              }}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                activeIndex === idx ? 'w-6 bg-accent' : 'w-2 bg-surface'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="w-10 h-10 rounded-full bg-surface hover:bg-neutral-800 transition-colors flex items-center justify-center text-text_primary cursor-pointer min-h-[44px] min-w-[44px]"
          aria-label="Next Testimonial"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
export default TestimonialCarousel;
