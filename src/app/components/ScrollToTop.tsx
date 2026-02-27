import { useEffect } from 'react';
import { useLocation } from 'react-router';

/**
 * ScrollToTop Component
 * 
 * Automatically scrolls to the top of the page when the route changes.
 * This improves UX by ensuring users start at the top of each new page.
 * 
 * Usage: Add this component once in your Layout or App component
 * It will work globally across all routes.
 * 
 * How it works:
 * 1. useLocation hook detects route changes via pathname
 * 2. useEffect runs whenever pathname changes
 * 3. window.scrollTo smoothly scrolls to top
 */
export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top smoothly when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  }, [pathname]); // Re-run when pathname changes

  // This component doesn't render anything
  return null;
}
