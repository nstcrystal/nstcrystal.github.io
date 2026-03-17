import GithubSlugger from 'github-slugger';

export interface TOCItem {
  id: string;
  text: string;
  level: number;
}

const CODE_BLOCK_FENCE = /```[\s\S]*?```/g;
const TILDE_FENCE = /~~~[\s\S]*?~~~/g;

function stripCodeBlocks(markdown: string): string {
  return markdown.replace(CODE_BLOCK_FENCE, '').replace(TILDE_FENCE, '');
}

function normalizeHeadingText(raw: string): string {
  return raw
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/[*_~]/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Extract headings from markdown content and generate GitHub-style slugs.
 */
export function extractHeadings(markdown: string, maxDepth = 3): TOCItem[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const slugger = new GithubSlugger();
  const headings: TOCItem[] = [];
  const sanitized = stripCodeBlocks(markdown);

  let match: RegExpExecArray | null;
  while ((match = headingRegex.exec(sanitized)) !== null) {
    const level = match[1].length;
    if (level > maxDepth) continue;

    const rawText = match[2].replace(/\s+#+\s*$/, '').trim();
    const text = normalizeHeadingText(rawText);
    if (!text) continue;

    const id = slugger.slug(text);
    headings.push({ id, text, level });
  }

  return headings;
}
