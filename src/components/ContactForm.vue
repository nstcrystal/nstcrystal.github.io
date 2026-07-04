<script setup lang="ts">
import { reactive, ref, watch, nextTick } from 'vue'
import { User, MessageSquare, Send, CheckCircle, AlertCircle } from 'lucide-vue-next'
import InputField from './InputField.vue'

interface ContactFormData {
  name: string
  message: string
}

interface FormErrors {
  name?: string
  message?: string
}

const formData = reactive<ContactFormData>({
  name: '',
  message: '',
})

const errors = reactive<FormErrors>({})

const isSubmitting = ref(false)

const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

const textareaRef = ref<HTMLTextAreaElement | null>(null)

// Auto resize textarea
watch(
  () => formData.message,
  async () => {
    await nextTick()

    if (!textareaRef.value) return

    textareaRef.value.style.height = 'auto'
    textareaRef.value.style.height = textareaRef.value.scrollHeight + 'px'
  },
)

function validateForm() {
  errors.name = undefined
  errors.message = undefined

  if (!formData.name.trim()) {
    errors.name = 'Name is required'
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  if (!formData.message.trim()) {
    errors.message = 'Message is required'
  } else if (formData.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  } else if (formData.message.trim().length > 1000) {
    errors.message = 'Message must be less than 1000 characters'
  }

  return !errors.name && !errors.message
}

async function sendMessage(data: ContactFormData) {
  const response = await fetch('https://webhook-discord-qtkh.onrender.com/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || 'API error')
  }

  return result
}

async function handleSubmit() {
  submitStatus.value = 'idle'

  if (!validateForm()) return

  isSubmitting.value = true

  try {
    await sendMessage({
      name: formData.name,
      message: formData.message,
    })

    submitStatus.value = 'success'

    formData.name = ''
    formData.message = ''

    setTimeout(() => {
      submitStatus.value = 'idle'
    }, 5000)
  } catch {
    submitStatus.value = 'error'

    setTimeout(() => {
      submitStatus.value = 'idle'
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <!-- Name -->
    <InputField
      v-model="formData.name"
      label="Your Name"
      type="text"
      placeholder="Vo Van Duy"
      :icon="User"
      :error="errors.name"
      :disabled="isSubmitting"
      required
    />

    <!-- Message -->
    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">
        Your Message
        <span class="ml-1 text-red-500">*</span>
      </label>

      <div class="relative">
        <div class="pointer-events-none absolute left-3 top-3">
          <MessageSquare :size="18" class="text-gray-400" />
        </div>

        <textarea
          ref="textareaRef"
          v-model="formData.message"
          :disabled="isSubmitting"
          placeholder="Tell me about your project, idea, or just say hi..."
          class="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 pl-11 text-gray-900 placeholder:text-gray-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none overflow-hidden min-h-[120px]"
          :class="[
            errors.message && 'border-red-500 focus:ring-red-500',
            isSubmitting && 'opacity-50 cursor-not-allowed',
          ]"
          style="max-height: 300px"
        />
      </div>

      <div class="flex items-center justify-between">
        <p v-if="errors.message" class="flex items-center gap-1 text-sm text-red-600">
          <span>⚠</span>
          {{ errors.message }}
        </p>

        <span v-else />

        <p
          class="text-xs"
          :class="formData.message.length > 1000 ? 'text-red-600' : 'text-gray-500'"
        >
          {{ formData.message.length }}/1000
        </p>
      </div>
    </div>

    <!-- Success -->
    <div
      v-if="submitStatus === 'success'"
      class="flex items-center gap-3 rounded-lg border border-green-200 bg-green-50 p-4"
    >
      <CheckCircle class="text-green-600" :size="20" />

      <div>
        <p class="font-medium text-green-900">Message sent successfully!</p>

        <p class="text-sm text-green-700">Thank you for reaching out. I'll get back to you soon.</p>
      </div>
    </div>

    <!-- Error -->
    <div
      v-if="submitStatus === 'error'"
      class="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 p-4"
    >
      <AlertCircle class="text-red-600" :size="20" />

      <div>
        <p class="font-medium text-red-900">Failed to send message</p>

        <p class="text-sm text-red-700">
          Please try again or contact me directly via social media.
        </p>
      </div>
    </div>

    <!-- Submit -->
    <button
      type="submit"
      :disabled="isSubmitting"
      class="flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3 font-medium text-white transition-all"
      :class="isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'"
    >
      <template v-if="isSubmitting">
        <div class="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
        Sending...
      </template>

      <template v-else>
        <Send :size="18" />
        Send Message
      </template>
    </button>
  </form>
</template>
