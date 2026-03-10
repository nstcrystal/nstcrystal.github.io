/**
 * Blog Post metadata from frontmatter
 */
export interface BlogPostMeta {
  id: number;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  coverImage?: string;
}

/**
 * Complete Blog Post with content
 */
export interface BlogPostData extends BlogPostMeta {
  slug: string;
  content: string;
}

/**
 * Browser-compatible frontmatter parser
 * Parses YAML frontmatter between --- delimiters
 */
function parseFrontmatter(rawContent: string): { data: Record<string, unknown>; content: string } {
  const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
  const match = rawContent.match(frontmatterRegex);

  if (!match) {
    return { data: {}, content: rawContent };
  }

  const frontmatterStr = match[1];
  const content = match[2];

  // Parse simple YAML-like frontmatter
  const data: Record<string, unknown> = {};
  const lines = frontmatterStr.split('\n');

  for (const line of lines) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;

    const key = line.slice(0, colonIndex).trim();
    let value: unknown = line.slice(colonIndex + 1).trim();

    // Handle arrays (tags: [tag1, tag2])
    if (typeof value === 'string' && value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((item) => item.trim().replace(/^['"]|['"]$/g, ''));
    }
    // Handle numbers
    else if (typeof value === 'string' && !isNaN(Number(value)) && value !== '') {
      value = Number(value);
    }
    // Handle quoted strings
    else if (typeof value === 'string' && ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'")))) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return { data, content };
}

/**
 * Load all markdown blog posts using Vite's import.meta.glob
 * Posts are automatically sorted by id in descending order (newest first)
 */
export function loadBlogPosts(): BlogPostData[] {
  // Import all markdown files from the blog directory
  const posts = import.meta.glob('/src/content/blog/*.md', {
    eager: true,
    query: '?raw',
    import: 'default',
  }) as Record<string, string>;

  const blogPosts: BlogPostData[] = [];

  for (const [path, rawContent] of Object.entries(posts)) {
    // Extract slug from file path (e.g., /src/content/blog/hello-world.md -> hello-world)
    const slug = path.replace('/src/content/blog/', '').replace('.md', '');

    // Parse frontmatter and content using browser-compatible parser
    const { data, content } = parseFrontmatter(rawContent);

    const meta = data as BlogPostMeta;

    blogPosts.push({
      id: meta.id,
      title: meta.title,
      date: meta.date,
      tags: meta.tags || [],
      excerpt: meta.excerpt || '',
      coverImage: meta.coverImage,
      slug,
      content: content.trim(),
    });
  }

  // Sort by id descending (newest first)
  return blogPosts.sort((a, b) => b.id - a.id);
}

/**
 * Get a single blog post by its slug
 */
export function getBlogPostBySlug(slug: string): BlogPostData | undefined {
  const posts = loadBlogPosts();
  return posts.find((post) => post.slug === slug);
}

/**
 * Get a single blog post by its id
 */
export function getBlogPostById(id: number): BlogPostData | undefined {
  const posts = loadBlogPosts();
  return posts.find((post) => post.id === id);
}

/**
 * Get all unique tags from all blog posts
 */
export function getAllTags(): string[] {
  const posts = loadBlogPosts();
  const tagSet = new Set<string>();
  
  posts.forEach((post) => {
    post.tags.forEach((tag) => tagSet.add(tag));
  });
  
  return Array.from(tagSet).sort();
}

/**
 * Filter blog posts by tag
 */
export function getPostsByTag(tag: string): BlogPostData[] {
  const posts = loadBlogPosts();
  return posts.filter((post) => post.tags.includes(tag));
}
