import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

export const NotFound: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-[80svh] w-full flex items-center justify-center bg-bg_primary relative overflow-hidden px-4">
      {/* Blurred background shape */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: shouldReduceMotion ? 1 : [1, 1.15, 1],
            opacity: [0.06, 0.1, 0.06]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] rounded-full bg-primary/20 blur-[80px] md:blur-[120px]"
        />
      </div>

      <div className="max-w-md w-full text-center space-y-6 z-10 relative">
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto"
        >
          <AlertCircle className="w-8 h-8 text-secondary" />
        </motion.div>

        <div className="space-y-2">
          <h1 className="font-heading font-extrabold text-4xl text-text_primary tracking-tight">
            404 — Page Not Found
          </h1>
          <p className="text-sm md:text-base text-text_secondary leading-relaxed">
            The page you are looking for does not exist, has been archived, or was moved to another directory.
          </p>
        </div>

        <div className="pt-4">
          <Button to="/" variant="primary" className="shadow-lg">
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
};
export default NotFound;
