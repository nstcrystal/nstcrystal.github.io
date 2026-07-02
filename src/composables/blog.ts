export interface PostFrontmatter {
  title: string
  date: string
  description?: string
  tags?: string[]
}

export interface BlogPostInfo {
  slug: string
  frontmatter: PostFrontmatter
}
