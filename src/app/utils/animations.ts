/**
 * Animation variants and utilities for Motion (Framer Motion)
 * Reusable animation configurations for consistent motion throughout the app
 */

/**
 * Page transition variants
 * Used for smooth transitions when navigating between routes
 */
export const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: 'easeIn',
    },
  },
};

/**
 * Fade in animation for hero sections
 * Slightly delayed and slower for dramatic effect
 */
export const heroVariants = {
  initial: {
    opacity: 0,
    y: 30,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

/**
 * Stagger children animation
 * Used for animating lists of items with a delay between each
 */
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

/**
 * Individual item animation for staggered lists
 */
export const staggerItem = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: 'easeOut',
    },
  },
};

/**
 * Card hover animation
 * Subtle lift effect with shadow
 */
export const cardHover = {
  rest: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.03,
    y: -5,
    transition: {
      duration: 0.3,
      ease: 'easeOut',
    },
  },
};

/**
 * Scroll reveal animation
 * Triggers when element enters viewport
 */
export const scrollReveal = {
  initial: {
    opacity: 0,
    y: 50,
  },
  whileInView: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
  viewport: {
    once: true,
    margin: '-100px',
  },
};

/**
 * Simplified filter item animation variants
 * Clean fade + slide animations without scale transforms
 * 
 * Animation behavior:
 * - Exit: fade out with slight downward movement (0.2s)
 * - Enter: fade in with upward slide (0.25s)
 * 
 * This simplified approach:
 * - Feels smooth and lightweight
 * - Avoids jarring scale/bounce effects
 * - Maintains visual consistency with the site
 */
export const filterItemVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.25,
      ease: 'easeOut',
    },
  },
  exit: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 0.2,
      ease: 'easeIn',
    },
  },
};

/**
 * Simplified filter container animation
 * Minimal stagger for subtle sequential reveal
 */
export const filterContainerVariants = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.04,
    },
  },
};
