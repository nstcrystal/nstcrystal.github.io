import fm from 'front-matter'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  cover: string
  tags: string[]
  content: string
}

interface FrontMatterAttributes {
  title: string
  description: string
  date: string
  cover: string
  tags?: string[]
}

const files = import.meta.glob('../posts/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>

function parseBlog(path: string, raw: string): BlogPost {
  const { attributes, body } = fm<FrontMatterAttributes>(raw)

  return {
    slug: path.substring(path.lastIndexOf('/') + 1).replace('.md', ''),
    title: attributes.title,
    description: attributes.description,
    date: attributes.date,
    cover: attributes.cover,
    tags: attributes.tags ?? [],
    content: body,
  }
}

export const blogs = Object.entries(files).map(([path, raw]) => parseBlog(path, raw))
