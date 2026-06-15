// content.config.ts
import { defineCollection, defineContentConfig, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "**/*.md",
      // Định nghĩa thêm các trường dữ liệu tùy biến từ Frontmatter của file .md
      schema: z.object({
        date: z.string().optional(), // Khai báo cột date kiểu chữ (string) và không bắt buộc
      }),
    }),
  },
});
