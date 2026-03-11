import { useState, useEffect, useMemo } from 'react';
import { List } from 'lucide-react';

interface TOCItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  content: string;
}

/**
 * Extract headings from markdown content
 * Parses h1-h3 headings and generates IDs
 */
function extractHeadings(content: string): TOCItem[] {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings: TOCItem[] = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    // Generate a slug-style ID from the heading text
    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();

    headings.push({ id, text, level });
  }

  return headings;
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
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -80% 0px',
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
    <nav className="table-of-contents">
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="lg:hidden w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-4"
        aria-expanded={isExpanded}
      >
        <span className="flex items-center gap-2 font-medium text-gray-900">
          <List size={18} />
          Table of Contents
        </span>
        <span className="text-gray-500 text-sm">
          {isExpanded ? 'Hide' : 'Show'}
        </span>
      </button>

      {/* TOC list - always visible on desktop, toggleable on mobile */}
      <div className={`${isExpanded ? 'block' : 'hidden'} lg:block`}>
        <div className="hidden lg:flex items-center gap-2 mb-4 text-sm font-semibold text-gray-900 uppercase tracking-wider">
          <List size={16} />
          On this page
        </div>
        <ul className="space-y-1">
          {headings.map(({ id, text, level }) => (
            <li
              key={id}
              style={{ paddingLeft: `${(level - 1) * 12}px` }}
            >
              <button
                onClick={() => handleClick(id)}
                className={`
                  w-full text-left py-1.5 px-3 text-sm rounded-md transition-colors
                  ${activeId === id
                    ? 'text-blue-600 bg-blue-50 font-medium'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }
                `}
              >
                {text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
