<script setup lang="ts">
import type { FunctionalComponent, HTMLAttributes } from 'vue'

interface Props {
  label: string
  error?: string
  icon?: FunctionalComponent
  type?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  class?: HTMLAttributes['class']
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
})

const model = defineModel<string>({
  default: '',
})
</script>

<template>
  <div class="space-y-2">
    <!-- Label -->
    <label class="block text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="ml-1 text-red-500">*</span>
    </label>

    <!-- Input -->
    <div class="relative">
      <div v-if="icon" class="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
        <component :is="icon" :size="18" class="text-gray-400" />
      </div>

      <input
        v-model="model"
        :type="type"
        :placeholder="placeholder"
        :disabled="disabled"
        :required="required"
        :class="[
          'w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200',
          icon && 'pl-11',
          error && 'border-red-500 focus:ring-red-500',
          props.class,
        ]"
      />
    </div>

    <!-- Error -->
    <p v-if="error" class="flex items-center gap-1 text-sm text-red-600">
      <span class="text-red-500">⚠</span>
      {{ error }}
    </p>
  </div>
</template>
