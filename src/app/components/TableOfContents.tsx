import { useState, useEffect, useMemo } from 'react';
import { List, ChevronDown } from 'lucide-react';
import { extractHeadings } from '../utils/toc';

interface TableOfContentsProps {
  content: string;
}

/**
 * TableOfContents Component
 * Automatically generates a TOC from markdown headings
 * 
 * Features:
 * - Extracts h1-h3 headings from markdown content
 * - Clickable links that scroll to headings
 * - Active section highlighting while scrolling
 * - Responsive design (sidebar on desktop, collapsible on mobile)
 */
export function TableOfContents({ content }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isExpanded, setIsExpanded] = useState(false);

  const headings = useMemo(() => extractHeadings(content), [content]);

  // Track scroll position to highlight active section
  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting);
        if (visible.length === 0) return;

        const topEntry = visible.reduce((closest, entry) =>
          entry.boundingClientRect.top < closest.boundingClientRect.top ? entry : closest
        );

        setActiveId(topEntry.target.id);
      },
      {
        rootMargin: '-15% 0px -70% 0px',
        threshold: 0,
      }
    );

    // Observe all heading elements
    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  useEffect(() => {
    if (headings.length > 0) {
      setActiveId(headings[0].id);
    }
  }, [headings]);

  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsExpanded(false);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="table-of-contents bg-white border border-gray-200 rounded-xl p-4 lg:p-5 shadow-sm">
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="lg:hidden w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-lg border border-gray-200"
        aria-expanded={isExpanded}
        aria-controls="toc-dropdown"
      >
        <span className="flex items-center gap-2 font-medium text-gray-900">
          <List size={18} />
          On this page
        </span>
        <ChevronDown
          size={18}
          className={`text-gray-500 transition-transform ${isExpanded ? 'rotate-180' : 'rotate-0'}`}
          aria-hidden="true"
        />
      </button>

      {/* TOC list - always visible on desktop, toggleable on mobile */}
      <div
        id="toc-dropdown"
        className={`toc-dropdown ${isExpanded ? 'open' : ''}`}
      >
        <div className="hidden lg:flex items-center gap-2 mb-4 text-xs font-medium text-gray-900 uppercase tracking-wider">
          <List size={18} />
          On this page
        </div>
        <div className="toc-scroll toc-mobile-list">
          <ul className="space-y-1">
            {headings.map(({ id, text, level }) => (
              <li
                key={id}
                style={{ paddingLeft: `${(level - 1) * 12}px` }}
              >
                <button
                  onClick={() => handleClick(id)}
                  className={`toc-link ${
                    activeId === id ? 'active text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  {text}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
