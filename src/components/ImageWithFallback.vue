<template>
  <!-- TRƯỜNG HỢP 1: Ảnh bị lỗi -> Hiển thị khung fallback -->
  <div
    v-if="didError"
    :class="['inline-block bg-gray-100 text-center align-middle', $attrs.class]"
    :style="$attrs.style as any"
  >
    <div class="flex items-center justify-center w-full h-full">
      <img
        :src="ERROR_IMG_SRC"
        alt="Error loading image"
        v-bind="filteredAttrs"
        :data-original-url="src"
      />
    </div>
  </div>

  <!-- TRƯỜNG HỢP 2: Ảnh chạy bình thường -->
  <img v-else :src="src" :alt="alt" v-bind="$attrs" @error="handleError" />
</template>

<script setup lang="ts">
import { ref, computed, useAttrs } from 'vue'

// 1. Định nghĩa các Props cơ bản
interface Props {
  src?: string
  alt?: string
}

defineProps<Props>()

// Tắt kế thừa thuộc tính tự động vào phần tử gốc (để ta tự kiểm soát bằng v-bind="$attrs")
defineOptions({
  inheritAttrs: false,
})

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg=='

// 2. Quản lý trạng thái lỗi
const didError = ref(false)

const handleError = () => {
  didError.value = true
}

// 3. Lọc bỏ class và style khỏi $attrs để tránh truyền trùng lặp vào thẻ img fallback
const attrs = useAttrs()
const filteredAttrs = computed(() => {
  const { class: _, style: __, ...rest } = attrs
  return rest
})
</script>
