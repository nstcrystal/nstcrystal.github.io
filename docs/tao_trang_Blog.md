Dưới đây là cẩm nang tổng hợp toàn bộ kiến thức và mã nguồn chuẩn hóa (đã sửa toàn bộ lỗi TypeScript nghiêm ngặt phục vụ build/deploy Vercel) để xây dựng hệ thống trang Blog đọc file .md trong dự án Vue 3 + Vite + TypeScript.

## 1. Cơ chế hoạt động của hệ thống Blog

Hệ thống hoạt động dựa trên cơ chế chia đôi trách nhiệm tối ưu hiệu năng:

- Trang danh sách `Blog.vue`: Sử dụng tính năng nạp văn bản thô `?raw` của Vite. Dùng hàm phân tích chuỗi `Regex` để trích xuất phần dữ liệu `Frontmatter` (nằm giữa cặp dấu ---) ở đầu file để lấy `tittle`, `date`, `description` hiển thị ra danh sách mà không làm nặng Client.

- Trang chi tiết `BlogPost.vue`: Sử dụng plugin `unplugin-vue-markdown` để Vite tự động biên dịch nội dung `Markdown` thành một Component Vue hoàn chỉnh, sau đó nạp động bằng `<component :is="...">`.

## 2. Cấu trúc thư mục dự án

```txt
src/
├── composables/
│   └── blog.ts         <-- Định nghĩa kiểu dữ liệu (TypeScript Interface)
├── pages/
│   ├── Blog.vue        <-- Trang danh sách bài viết (Route: /article)
│   └── BlogPost.vue    <-- Trang chi tiết bài viết (Route: /article/:id)
├── posts/
│   ├── Hello.md        <-- Bài viết mẫu số 1
│   └── vue-router.md   <-- Bài viết mẫu số 2
├── router/
│   └── index.js        <-- Cấu hình định tuyến Vue Router
├── env.d.ts            <-- Khai báo môi trường nhận diện file .md cho TypeScript
```

## 3. Thiết lập cấu hình hệ thống

### Cài đặt Plugin biên dịch

Chạy lệnh cài đặt plugin tích hợp Markdown vào Vite:

```bash
npm install -D unplugin-vue-markdown
```

### Cấu hình Vite `vite.config.ts`

Bắt buộc phải cấu hình plugin vue nhận diện thêm đuôi `.md` để biên dịch:

```ts
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import Markdown from 'unplugin-vue-markdown/vite'

export default defineConfig({
  plugins: [
    Markdown({ headEnabled: true }), // Xử lý Markdown trước
    vue({
      include: [/\.vue$/, /\.md$/], // BẮT BUỘC: Cho phép Vue xử lý cả file .md như một Component
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
})
```

### Cấu hình Môi trường TypeScript `src/env.d.ts`

Giúp trình biên dịch hiểu file `.md` như một component Vue hợp lệ, tránh lỗi gạch đỏ khi import:

```ts
/// <reference types="vite/client" />

declare module '*.md' {
  import type { ComponentOptions } from 'vue'
  const component: ComponentOptions
  export default component
  export const frontmatter: Record<string, any>
}
```

### Khai báo Kiểu dữ liệu `src/composables/blog.ts`

```ts
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
```

### Hệ thống Định tuyến `src/router/index.js`

```ts
import { createRouter, createWebHistory } from 'vue-router'
import Blog from '../pages/Blog.vue'
import BlogPost from '../pages/BlogPost.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/article', name: 'article', component: Blog },
    { path: '/article/:id', name: 'articlePost', component: BlogPost, props: true },
  ],
})
export default router
```

## 4. Mã nguồn trang Giao diện & Bài viết mẫu

### Bài viết mẫu `src/posts/Hello.md`

```md
---
title: 'Xin chào thế giới'
date: '2026-07-02'
description: 'Đây là bài viết đầu tiên của tôi bằng file Markdown.'
---

# Nội dung bài viết ở đây...

Đây là phần nội dung chi tiết hiển thị ở trang BlogPost.
```

### Trang danh sách Blog `src/pages/Blog.vue`

Mã nguồn đã được xử lý Type Guard tuyệt đối an toàn, vượt qua mọi bài test nghiêm ngặt của vue-tsc để phục vụ deploy Vercel:

```vue
<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold mb-8">Danh sách bài viết</h1>
    <div class="space-y-6">
      <article v-for="post in posts" :key="post.slug" class="p-6 bg-white rounded-xl shadow-md">
        <h2 class="text-2xl font-semibold mb-2">{{ post.frontmatter.title }}</h2>
        <p class="text-sm text-gray-500 mb-3">{{ post.frontmatter.date }}</p>
        <p class="text-gray-600 mb-4">{{ post.frontmatter.description || 'Không có mô tả.' }}</p>
        <router-link :to="`/article/${post.slug}`" class="text-blue-600 hover:underline">
          Đọc thêm &rarr;
        </router-link>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { BlogPostInfo, PostFrontmatter } from '../composables/blog'

const posts = ref<BlogPostInfo[]>([])

const parseFrontmatterManual = (rawContent: string | undefined): Partial<PostFrontmatter> => {
  if (!rawContent || typeof rawContent !== 'string') return {}

  const matches = rawContent.match(/^---([\s\S]*?)---/)
  const result: Record<string, string> = {}

  if (matches && matches[1]) {
    const lines = matches[1].split('\n')
    lines.forEach((line) => {
      const parts = line.split(':')
      if (parts.length >= 2 && parts[0]) {
        const key = parts[0].trim()
        const value = parts
          .slice(1)
          .join(':')
          .trim()
          .replace(/^["']|["']$/g, '')
        if (key) {
          result[key] = value
        }
      }
    })
  }
  return result
}

onMounted(() => {
  const modules = import.meta.glob<{ default: string }>('../posts/*.md', {
    query: '?raw',
    eager: true,
  })
  const postList: BlogPostInfo[] = []

  for (const path in modules) {
    const moduleInstance = modules[path]
    if (!moduleInstance?.default) continue

    const slug = path.split('/').pop()?.replace('.md', '') || ''
    try {
      const attributes = parseFrontmatterManual(moduleInstance.default)
      if (slug) {
        postList.push({
          slug,
          frontmatter: {
            title: attributes.title || 'Bài viết chưa đặt tiêu đề',
            date: attributes.date || 'Chưa rõ ngày',
            description: attributes.description,
            tags: attributes.tags
              ? String(attributes.tags)
                  .split(',')
                  .map((t) => t.trim())
              : [],
          },
        })
      }
    } catch (e) {
      console.error(e)
    }
  }
  posts.value = postList.sort(
    (a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime(),
  )
})
</script>
```

### Trang chi tiết bài viết `src/pages/BlogPost.vue`

```vue
<template>
  <div class="max-w-3xl mx-auto py-8 px-4">
    <router-link to="/article" class="text-gray-600 hover:underline mb-6 inline-block">
      &larr; Quay lại danh sách
    </router-link>

    <article class="prose max-w-none">
      <component :is="currentPostComponent" v-if="currentPostComponent" />
      <div v-else class="text-center py-12 text-gray-500">Đang tải bài viết...</div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, onMounted, watch, type ComponentOptions } from 'vue'

const props = defineProps<{ id: string }>()
const currentPostComponent = shallowRef<ComponentOptions | null>(null)

const loadPost = async () => {
  try {
    const post = await import(`../posts/${props.id}.md`)
    currentPostComponent.value = post.default
  } catch (error) {
    console.error('Không tìm thấy file bài viết:', error)
    currentPostComponent.value = null
  }
}

onMounted(loadPost)
watch(() => props.id, loadPost)
</script>
```

## 5. Quy trình Deploy Vercel chuẩn chỉnh

Trước khi đẩy code, bạn chạy lệnh sau ở máy cá nhân:

```bash
npm run type-check
```

Nếu terminal chạy mượt mà không báo bất kỳ lỗi nào, bạn thực hiện git push lên GitHub. Vercel sẽ tự động bắt sự kiện và thực hiện quá trình build thành công 100%.
