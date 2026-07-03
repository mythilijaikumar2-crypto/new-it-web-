import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { TRANSITIONS } from './lib/motion';

// Route-level Code Splitting (React.lazy)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Slim Top Route Loading Progress Bar for Suspense Fallback
const RouteProgressBar: React.FC = () => {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      animate={{ scaleX: [0, 0.3, 0.6, 0.85] }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      style={{ transformOrigin: '0%' }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-accent z-50"
    />
  );
};

// Sub-component to utilize useLocation hook inside BrowserRouter context
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Route transition variants
  const pageVariants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 10,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: TRANSITIONS.duration.normal,
        ease: TRANSITIONS.ease,
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -10,
      transition: {
        duration: TRANSITIONS.duration.snappy,
        ease: TRANSITIONS.ease,
      },
    },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="grow flex flex-col w-full"
      >
        <Suspense fallback={<RouteProgressBar />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </motion.main>
    </AnimatePresence>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>

      <div className="flex flex-col min-h-screen w-full bg-bg_primary text-text_primary select-none">
        {/* Navbar */}
        <Navbar />

        {/* Dynamic Pages router */}
        <AnimatedRoutes />

        {/* Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};
export default App;
