import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 320);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Back to top"
      className={`back-to-top ${isVisible ? 'visible' : ''} bg-blue-600 text-white rounded-full shadow-lg px-4 py-3 flex items-center gap-2 text-sm font-medium hover:bg-blue-700`}
    >
      <ArrowUp size={18} />
      {/* Back to Top */}
    </button>
  );
}
