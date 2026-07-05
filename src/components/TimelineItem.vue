<template>
  <div
    v-motion
    class="relative flex gap-6 pb-8 last:pb-0"
    :initial="{ opacity: 0, x: -20 }"
    :visible-once="{ opacity: 1, x: 0 }"
    :transition="{ delay: index * 150, duration: 500 }"
  >
    <!-- Timeline Line -->
    <div class="relative flex flex-col items-center">
      <!-- Icon Circle -->
      <div
        class="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 border-4 border-white shadow-md z-10"
      >
        <!-- Render Icon động bằng thẻ component -->
        <component :is="iconComponent" :size="20" class="text-blue-600" />
      </div>
      <!-- Vertical Line -->
      <div class="w-0.5 h-full bg-gray-200 absolute top-12" />
    </div>

    <!-- Content -->
    <div class="flex-1 pt-1">
      <!-- Period -->
      <span
        class="inline-block px-3 py-1 bg-blue-50 text-blue-700 text-sm font-medium rounded-full mb-2"
      >
        {{ item.period }}
      </span>

      <!-- Degree/Position -->
      <h3 class="text-xl font-semibold text-gray-900 mb-1">
        {{ item.degree }}
      </h3>

      <!-- Institution/Company -->
      <p class="text-gray-600 font-medium mb-2">
        {{ item.institution }}
      </p>

      <!-- Description -->
      <p v-if="item.description" class="text-gray-600 leading-relaxed">
        {{ item.description }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { GraduationCap, Briefcase } from 'lucide-vue-next'

// Định nghĩa cấu trúc dữ liệu cho từng mốc thời gian
interface TimelineData {
  institution: string
  degree: string
  period: string
  description?: string
}

// 1. Định nghĩa Props chuẩn TypeScript cho Vue 3
interface Props {
  item: TimelineData
  index: number
  type?: 'education' | 'experience'
}

// Thiết lập giá trị mặc định cho type là 'education'
const props = withDefaults(defineProps<Props>(), {
  type: 'education',
})

// 2. Dùng computed để chuyển đổi Icon linh hoạt dựa trên prop type
const iconComponent = computed(() => {
  return props.type === 'education' ? GraduationCap : Briefcase
})
</script>
