/// <reference types="vite/client" />

declare module '*.md' {
  import type { ComponentOptions } from 'vue'
  const component: ComponentOptions
  export default component
  export const frontmatter: Record<string, any>
}
