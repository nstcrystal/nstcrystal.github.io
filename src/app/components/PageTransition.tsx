import { motion } from 'motion/react';
import { pageVariants } from '../utils/animations';

interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * Page Transition Wrapper Component
 * Wraps page content to add smooth entry/exit animations
 * 
 * Usage: Wrap your page content with this component
 * <PageTransition>
 *   <YourPageContent />
 * </PageTransition>
 */
export function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {children}
    </motion.div>
  );
}
