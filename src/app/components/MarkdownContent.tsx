import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  atomDark,
  materialDark,
  dracula,
  vs,
  oneDark,
} from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownContentProps {
  content: string;
}

/**
 * Language-specific theme mapping for code blocks
 * Each language gets a distinct visual style for better differentiation
 */
const languageThemes: Record<string, object> = {
  js: atomDark,
  javascript: atomDark,
  ts: materialDark,
  typescript: materialDark,
  tsx: materialDark,
  jsx: atomDark,
  css: dracula,
  scss: dracula,
  html: vs,
  xml: vs,
  json: oneDark,
  yaml: oneDark,
  yml: oneDark,
  python: materialDark,
  py: materialDark,
  bash: atomDark,
  sh: atomDark,
  shell: atomDark,
  sql: dracula,
  markdown: vs,
  md: vs,
};

const defaultTheme = atomDark;

/**
 * Markdown Content Renderer
 * Renders Markdown content with GitHub Flavored Markdown support
 * 
 * Features:
 * - Full-width layout with optimal line-height
 * - Language-based syntax highlighting for code blocks
 * - Tables, task lists, strikethrough
 * - Automatic links
 * - Responsive images
 * - Custom styling for all elements
 */
export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="markdown-content w-full max-w-none">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Custom heading styles
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4 first:mt-0 leading-tight">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3 leading-tight">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2 leading-snug">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-lg font-semibold text-gray-900 mt-4 mb-2 leading-snug">
              {children}
            </h4>
          ),
          // Paragraph styles with better line-height
          p: ({ children }) => (
            <p className="text-gray-700 mb-4" style={{ lineHeight: 1.7 }}>
              {children}
            </p>
          ),
          // List styles
          ul: ({ children }) => (
            <ul className="list-disc pl-6 space-y-2 mb-4 text-gray-700" style={{ lineHeight: 1.7 }}>
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 space-y-2 mb-4 text-gray-700" style={{ lineHeight: 1.7 }}>
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="pl-1">{children}</li>
          ),
          // Code blocks with language-based syntax highlighting
          code: ({ className, children, ...props }) => {
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
            
            const theme = languageThemes[language] || defaultTheme;
            const codeString = String(children).replace(/\n$/, '');
            
            return (
              <SyntaxHighlighter
                style={theme}
                language={language || 'text'}
                PreTag="div"
                customStyle={{
                  margin: 0,
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                }}
                {...props}
              >
                {codeString}
              </SyntaxHighlighter>
            );
          },
          // Pre wrapper for code blocks
          pre: ({ children }) => (
            <pre className="mb-4 overflow-x-auto">{children}</pre>
          ),
          // Blockquote styles
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
              {children}
            </blockquote>
          ),
          // Link styles
          a: ({ href, children }) => (
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
          strong: ({ children }) => (
            <strong className="font-semibold text-gray-900">
              {children}
            </strong>
          ),
          // Image styles - responsive
          img: ({ src, alt }) => (
            <img
              src={src}
              alt={alt || ''}
              className="max-w-full h-auto rounded-lg my-4"
              loading="lazy"
            />
          ),
          // Table styles
          table: ({ children }) => (
            <div className="overflow-x-auto mb-4">
              <table className="min-w-full border-collapse border border-gray-200">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border border-gray-200 bg-gray-50 px-4 py-2 text-left font-semibold text-gray-900">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-200 px-4 py-2 text-gray-700">
              {children}
            </td>
          ),
          // Horizontal rule
          hr: () => (
            <hr className="my-6 border-t border-gray-200" />
          ),
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}
