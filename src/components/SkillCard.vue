<template>
  <div
    v-motion
    class="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
    :initial="{ opacity: 0, y: 20 }"
    :visible-once="{ opacity: 1, y: 0 }"
    :transition="{ delay: index * 100, duration: 500 }"
  >
    <!-- Icon and Category -->
    <div class="flex items-center gap-3 mb-4">
      <div class="p-2 bg-blue-50 rounded-lg">
        <!-- Render Component Động dựa vào kết quả hàm getIcon -->
        <component :is="getIcon" :size="24" class="text-blue-600" />
      </div>
      <h3 class="text-lg font-semibold text-gray-900">{{ category }}</h3>
    </div>

    <!-- Skills List -->
    <div class="flex flex-wrap gap-2">
      <span
        v-for="skill in skills"
        :key="skill"
        class="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colors"
      >
        {{ skill }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { motion } from 'motion-v'
import { Code2, Database, Globe, Palette, Server, Terminal } from 'lucide-vue-next'

// 1. Định nghĩa Props chuẩn TypeScript cho Vue
interface Props {
  category: string
  skills: string[]
  index: number
}

const props = defineProps<Props>()

// 2. Sử dụng computed để chọn icon động dựa theo tên category
const getIcon = computed(() => {
  switch (props.category.toLowerCase()) {
    case 'frontend':
      return Code2
    case 'backend':
      return Server
    case 'database':
      return Database
    case 'tools':
      return Terminal
    case 'design':
      return Palette
    default:
      return Globe
  }
})
</script>
