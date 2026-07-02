<template>
  <div class="max-w-3xl mx-auto py-8 px-4">
    <router-link
      to="/article"
      class="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white inline-flex items-center gap-2 mb-6"
    >
      <span>&larr;</span> Quay lại danh sách
    </router-link>

    <!-- Khu vực render nội dung bài viết -->
    <article class="prose dark:prose-invert max-w-none">
      <component :is="currentPostComponent" v-if="currentPostComponent" />
      <div v-else class="text-center py-12 text-gray-500">
        <p>Đang tải nội dung bài viết hoặc bài viết không tồn tại...</p>
      </div>
    </article>
  </div>
</template>

<script setup lang="ts">
import { shallowRef, onMounted, watch, type ComponentOptions } from 'vue'

// Định nghĩa Props nhận từ Vue Router
const props = defineProps<{
  id: string
}>()

// Dùng shallowRef cho Component để tránh Vue theo dõi reactivity quá sâu gây giảm hiệu năng
const currentPostComponent = shallowRef<ComponentOptions | null>(null)

const loadPost = async () => {
  try {
    // Nếu file BlogPost.vue nằm ở src/pages/, đi lùi 1 cấp '../posts/' là chính xác
    const post = await import(`../posts/${props.id}.md`)
    currentPostComponent.value = post.default
  } catch (error) {
    console.error('Lỗi khi tải file markdown:', error)
    currentPostComponent.value = null
  }
}

// Tải bài viết khi component được gắn vào DOM
onMounted(loadPost)

// Lắng nghe sự thay đổi của id (ví dụ người dùng bấm sang bài viết khác trực tiếp từ link gợi ý)
watch(() => props.id, loadPost)
</script>
