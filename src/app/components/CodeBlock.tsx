import { useState, useCallback } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import {
  atomDark,
  materialDark,
  dracula,
  vs,
  oneDark,
} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
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
  markdown: materialDark,
  md: materialDark,
};

const defaultTheme = atomDark;

/**
 * Language display name mapping
 */
const languageDisplayNames: Record<string, string> = {
  js: 'JavaScript',
  javascript: 'JavaScript',
  ts: 'TypeScript',
  typescript: 'TypeScript',
  tsx: 'TSX',
  jsx: 'JSX',
  css: 'CSS',
  scss: 'SCSS',
  html: 'HTML',
  xml: 'XML',
  json: 'JSON',
  yaml: 'YAML',
  yml: 'YAML',
  python: 'Python',
  py: 'Python',
  bash: 'Bash',
  sh: 'Shell',
  shell: 'Shell',
  sql: 'SQL',
  markdown: 'Markdown',
  md: 'Markdown',
  text: 'Text',
};

/**
 * CodeBlock Component
 * Renders syntax-highlighted code with a copy button
 * 
 * Features:
 * - Language-based syntax highlighting
 * - Copy to clipboard button with feedback
 * - Language label
 * - Horizontal scrolling for long lines
 */
export function CodeBlock({ code, language = 'text' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const theme = languageThemes[language] || defaultTheme;
  const displayLanguage = languageDisplayNames[language] || language.toUpperCase();

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  }, [code]);

  return (
    <div className="code-block relative rounded-lg overflow-hidden bg-gray-900 my-4">
      {/* Header with language label and copy button */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-xs font-medium text-gray-400">
          {displayLanguage}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2 py-1 text-xs text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
          aria-label={copied ? 'Copied!' : 'Copy code'}
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-400" />
              <span className="text-green-400">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={14} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code content with syntax highlighting */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          style={theme}
          language={language || 'text'}
          PreTag="div"
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '0.875rem',
            lineHeight: 1.6,
            background: 'transparent',
          }}
          codeTagProps={{
            style: {
              fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
            },
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
