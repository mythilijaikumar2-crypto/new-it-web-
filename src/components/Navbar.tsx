import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { TRANSITIONS } from '../lib/motion';
import logoImage from '../assets/Ascope Tech logo transparent.png';

const LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Services', path: '/services' },
  { name: 'Portfolio', path: '/portfolio' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
];

export const Navbar: React.FC = () => {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Monitor scroll for glass transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Trap focus for mobile menu accessibility
  useEffect(() => {
    if (!isMobileMenuOpen || !mobileMenuRef.current) return;

    const focusableElements = mobileMenuRef.current.querySelectorAll(
      'a[href], button, textarea, input, select'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMobileMenuOpen]);

  // Disable scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'py-3.5 bg-bg_primary/75 backdrop-blur-lg shadow-card_default border-b border-border_custom/40' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center space-x-2 z-50">
          <img 
            src={logoImage} 
            alt="Ascope Tech" 
            className="h-8 md:h-10 w-auto object-contain" 
          />
        </NavLink>

        {/* Desktop Navbar (>= 768px) */}
        <nav className="hidden md:flex items-center space-x-1 relative">
          {LINKS.map((link, idx) => {
            const isActive = location.pathname === link.path;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`relative px-4 py-2 font-heading font-medium text-sm transition-colors duration-200 min-h-[44px] min-w-[44px] inline-flex items-center justify-center cursor-pointer ${
                  isActive ? 'text-text_primary' : 'text-text_secondary hover:text-text_primary'
                }`}
              >
                {/* Active/Hover Slider Indicator */}
                <AnimatePresence>
                  {((hoveredIndex === idx) || (isActive && hoveredIndex === null)) && !shouldReduceMotion && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 bg-surface/70 rounded-md -z-10"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={TRANSITIONS.spring}
                    />
                  )}
                </AnimatePresence>
                
                <span>{link.name}</span>
                
                {/* Fallback active indicator line (reduced motion or fallback) */}
                {isActive && (shouldReduceMotion || hoveredIndex !== null) && (
                  <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-primary" />
                )}
              </NavLink>
            );
          })}
          
          <div className="pl-4">
            <NavLink to="/contact" className="inline-block">
              <motion.span
                whileHover={{ scale: shouldReduceMotion ? 1 : 1.05 }}
                whileTap={{ scale: shouldReduceMotion ? 1 : 0.95 }}
                className="bg-primary text-text_primary font-heading font-semibold text-sm px-5 py-2.5 rounded-md shadow-sm hover:bg-primary_hover block cursor-pointer"
              >
                Start a Project
              </motion.span>
            </NavLink>
          </div>
        </nav>

        {/* Mobile Hamburger Trigger (< 768px) */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-11 h-11 text-text_primary focus:outline-none z-50 cursor-pointer"
          aria-label={isMobileMenuOpen ? 'Close Menu' : 'Open Menu'}
        >
          {/* Animated Hamburger Icon */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <motion.line
              x1="3"
              y1="6"
              x2="21"
              y2="6"
              animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{ transformOrigin: '12px 6px' }}
            />
            <motion.line
              x1="3"
              y1="12"
              x2="21"
              y2="12"
              animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.line
              x1="3"
              y1="18"
              x2="21"
              y2="18"
              animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.2 }}
              style={{ transformOrigin: '12px 18px' }}
            />
          </svg>
        </button>

        {/* Full-Screen Mobile Menu Drawer */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              initial={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { x: '100%' }}
              transition={{ duration: 0.3, ease: TRANSITIONS.ease }}
              className="fixed inset-0 bg-bg_primary z-40 flex flex-col justify-between pt-24 pb-8 px-6 md:hidden"
            >
              {/* Menu Links List */}
              <motion.div 
                variants={shouldReduceMotion ? {} : {
                  hidden: { opacity: 0 },
                  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
                }}
                initial="hidden"
                animate="visible"
                className="flex flex-col space-y-2 mt-8"
              >
                {LINKS.map((link) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      variants={shouldReduceMotion ? {} : {
                        hidden: { opacity: 0, x: 20 },
                        visible: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 200, damping: 20 } }
                      }}
                    >
                      <NavLink
                        to={link.path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center justify-between py-4 px-6 rounded-md font-heading font-semibold text-lg transition-colors min-h-[44px] ${
                          isActive
                            ? 'bg-surface text-text_primary'
                            : 'text-text_secondary active:bg-surface/50'
                        }`}
                      >
                        <span>{link.name}</span>
                        <ChevronRight className={`w-5 h-5 text-text_muted ${isActive ? 'text-text_primary' : ''}`} />
                      </NavLink>
                    </motion.div>
                  );
                })}
              </motion.div>

              {/* Mobile Menu Footer CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="w-full"
              >
                <NavLink
                  to="/contact"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full"
                >
                  <button className="w-full py-4 bg-primary text-text_primary font-heading font-semibold text-base rounded-md shadow-sm hover:bg-primary_hover transition-colors cursor-pointer min-h-[44px]">
                    Start a Project
                  </button>
                </NavLink>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};
export default Navbar;
