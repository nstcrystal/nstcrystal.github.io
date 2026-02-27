import type { BlogPost } from "../types";

/**
 * Blog Posts Data - Owner Managed
 *
 * This file contains all blog posts for the website.
 * Only the website owner can add/edit posts by modifying this file.
 *
 * Benefits of this approach:
 * 1. No database required - faster and simpler
 * 2. Version controlled - track changes with Git
 * 3. Secure - no public CRUD endpoints to exploit
 * 4. SEO friendly - content is server-rendered
 * 5. Easy to maintain - just edit this file
 *
 * To add a new post:
 * 1. Create a new object with unique id
 * 2. Fill in title, content (supports Markdown), date, and tags
 * 3. Add to the array below
 */

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Hello",
    content: `
# Xin Chào !!!

Đây là nơi tôi đăng các Blog 

> **Tôi đang thử tạo ra trang web cho riêng mình**


    `,
    // createdAt: "2026-02-20T10:00:00Z",
    createdAt: "2026-02-25",
    tags: ["Web"],
  },
];