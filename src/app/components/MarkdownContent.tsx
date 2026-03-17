import { useMemo, type ComponentPropsWithoutRef } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { CodeBlock } from './CodeBlock';

interface MarkdownContentProps {
  content: string;
  /** Base path for resolving relative image paths (e.g., 'hello-world' for /content/blog/images/hello-world/) */
  slug?: string;
}

type HeadingProps = ComponentPropsWithoutRef<'h1'>;

/**
 * Resolve image paths for markdown images
 * Supports:
 * - Absolute paths starting with / (served from public folder)
 * - Relative paths (resolved based on slug to /content/blog/images/{slug}/)
 * - External URLs (https://, http://)
 * 
 * @param src - The image source from markdown
 * @param slug - Optional blog post slug for resolving relative paths
 */
function resolveImagePath(src: string | undefined, slug?: string): string {
  if (!src) return '';
  
  // External URLs - return as-is
  if (src.startsWith('http://') || src.startsWith('https://')) {
    return src;
  }
  
  // Absolute paths starting with / - return as-is (served from public)
  if (src.startsWith('/')) {
    return src;
  }
  
  // Relative paths - resolve based on slug
  // Remove leading ./ if present
  const cleanPath = src.replace(/^\.\//, '');
  
//   If slug is provided, resolve to /content/blog/images/{slug}/{image}
//   Otherwise return to /content/blog/images/{image}
  if (slug) {
    return `/content/blog/images/${slug}/${cleanPath}`;
  }
  
  return `/content/blog/images/${cleanPath}`;
}

/**
 * Markdown Content Renderer
 * Renders Markdown content with GitHub Flavored Markdown support
 * 
 * Features:
 * - Full-width layout with optimal line-height
 * - Language-based syntax highlighting for code blocks with copy button
 * - Tables, task lists, strikethrough
 * - Automatic links
 * - Responsive images with proper path resolution
 * - Heading IDs for table of contents navigation
 * - Custom styling for all elements
 */
export function MarkdownContent({ content, slug }: MarkdownContentProps) {
  // Memoize the component renderers to avoid recreating on each render
  const components = useMemo(() => ({
    // Custom title style with ID for TOC navigation
    h1: ({ children, id }: HeadingProps) => {
      return (
        <h1 
          id={id}
          className="text-3xl font-bold text-gray-900 mt-8 mb-4 first:mt-0 leading-tight scroll-mt-20"
        >
          {children}
        </h1>
      );
    },
    h2: ({ children, id }: HeadingProps) => {
      return (
        <h2 
          id={id}
          className="text-2xl font-semibold text-gray-900 mt-6 mb-3 leading-tight scroll-mt-20"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children, id }: HeadingProps) => {
      return (
        <h3 
          id={id}
          className="text-xl font-semibold text-gray-900 mt-4 mb-2 leading-snug scroll-mt-20"
        >
          {children}
        </h3>
      );
    },
    h4: ({ children, id }: HeadingProps) => (
      <h4 id={id} className="text-lg font-semibold text-gray-900 mt-4 mb-2 leading-snug scroll-mt-20">
        {children}
      </h4>
    ),
    // Paragraph styles with better line-height
    p: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-gray-700 mb-4" style={{ lineHeight: 1.7 }}>
        {children}
      </p>
    ),
    // List styles
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700" style={{ lineHeight: 1.7 }}>
        {children}
      </ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-6 space-y-2 mb-4 text-gray-700" style={{ lineHeight: 1.7 }}>
        {children}
      </ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => (
      <li className="pl-1">{children}</li>
    ),
    // Code blocks with syntax highlighting and copy button
    code: ({ className, children, ...props }: { className?: string; children?: React.ReactNode }) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      const isInline = !match && !className;
      
      if (isInline) {
        return (
          <code
            className="px-1.5 py-0.5 bg-gray-100 text-pink-600 rounded text-sm font-mono"
            {...props}
          >
            {children}
          </code>
        );
      }
      
      const codeString = String(children).replace(/\n$/, '');
      
      return <CodeBlock code={codeString} language={language} />;
    },
    // Pre wrapper for code blocks
    pre: ({ children }: { children?: React.ReactNode }) => (
      <>{children}</>
    ),
    // Blockquote styles
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
        {children}
      </blockquote>
    ),
    // Link styles
    a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
      <a
        href={href}
        className="text-blue-600 hover:text-blue-800 underline transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    // Strong/Bold styles
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-semibold text-gray-900">
        {children}
      </strong>
    ),
    // Image styles - responsive with proper path resolution
    img: ({ src, alt }: { src?: string; alt?: string }) => (
      <figure className="my-6">
        <img
          src={resolveImagePath(src, slug)}
          alt={alt || ''}
          className="max-w-full h-auto rounded-lg shadow-md mx-auto"
          loading="lazy"
          onError={(e) => {
            // Hide broken images gracefully
            const target = e.currentTarget;
            target.style.display = 'none';
            const figcaption = target.parentElement?.querySelector('figcaption');
            if (figcaption) {
              figcaption.textContent = `Image not found: ${src}`;
              figcaption.className = 'text-center text-sm text-red-500 mt-2 italic';
            }
          }}
        />
        {alt && (
          <figcaption className="text-center text-sm text-gray-500 mt-2">
            {alt}
          </figcaption>
        )}
      </figure>
    ),
    // Table styles
    table: ({ children }: { children?: React.ReactNode }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border-collapse border border-gray-200">
          {children}
        </table>
      </div>
    ),
    th: ({ children }: { children?: React.ReactNode }) => (
      <th className="border border-gray-200 bg-gray-50 px-4 py-2 text-left font-semibold text-gray-900">
        {children}
      </th>
    ),
    td: ({ children }: { children?: React.ReactNode }) => (
      <td className="border border-gray-200 px-4 py-2 text-gray-700">
        {children}
      </td>
    ),
    // Horizontal rule
    hr: () => (
      <hr className="my-6 border-t border-gray-200" />
    ),
  }), [slug]);

  return (
    <div className="markdown-content w-full max-w-none">
      <Markdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSlug]}
        components={components}
      >
        {content}
      </Markdown>
    </div>
  );
}
