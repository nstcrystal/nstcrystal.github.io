<template>
  <div class="max-w-4xl mx-auto py-8 px-4">
    <h1 class="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Danh sách bài viết</h1>

    <div class="space-y-6">
      <article
        v-for="post in posts"
        :key="post.slug"
        class="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-shadow"
      >
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
          {{ post.frontmatter.title }}
        </h2>
        <p class="text-sm text-gray-500 mb-3">{{ post.frontmatter.date }}</p>
        <p class="text-gray-600 dark:text-gray-300 mb-4">
          {{ post.frontmatter.description || 'Không có mô tả cho bài viết này.' }}
        </p>

        <router-link
          :to="`/article/${post.slug}`"
          class="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center gap-1"
        >
          Đọc thêm <span>&rarr;</span>
        </router-link>
      </article>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { BlogPostInfo, PostFrontmatter } from '../composables/blog'

const posts = ref<BlogPostInfo[]>([])

// Hàm bóc tách Frontmatter thủ công từ chuỗi thuần túy
const parseFrontmatterManual = (rawContent: string | undefined): Partial<PostFrontmatter> => {
  if (!rawContent || typeof rawContent !== 'string') return {}

  const matches = rawContent.match(/^---([\s\S]*?)---/)
  const result: Record<string, string> = {}

  // Kiểm tra chắc chắn matches và phần tử index 1 tồn tại
  if (matches && matches[1]) {
    const lines = matches[1].split('\n')

    lines.forEach((line) => {
      const parts = line.split(':')

      // BẢO VỆ CHẮC CHẮN: Kiểm tra mảng parts có ít nhất 2 phần tử và phần tử đầu tiên hợp lệ
      if (parts.length >= 2 && parts[0]) {
        const key = parts[0].trim()
        // Gộp lại nội dung đề phòng giá trị chứa dấu hai chấm
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
  // Quét toàn bộ file dạng text thô thông qua query ?raw
  // Ép kiểu về { default: string } để khớp chính xác cấu trúc module của Vite
  const modules = import.meta.glob<{ default: string }>('../posts/*.md', {
    query: '?raw',
    eager: true,
  })

  const postList: BlogPostInfo[] = []

  for (const path in modules) {
    const moduleInstance = modules[path]
    if (!moduleInstance) continue

    // SỬA LỖI TẠI ĐÂY: Lấy thuộc tính .default chứa nội dung chuỗi text thực tế
    const fileContent = moduleInstance.default
    if (!fileContent) continue

    const slug = path.split('/').pop()?.replace('.md', '') || ''

    try {
      const attributes = parseFrontmatterManual(fileContent)

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
    } catch (error) {
      console.error(`Lỗi xử lý file ${path}:`, error)
    }
  }

  // Sắp xếp bài viết mới nhất lên đầu
  posts.value = postList.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
  })
})
</script>
