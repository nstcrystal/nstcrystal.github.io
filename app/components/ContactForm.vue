<script setup lang="ts">
import type { FormError, FormSubmitEvent } from '@nuxt/ui'

const props = defineProps<{
  form: {
    icon: string
    title: string
    description: string
    nameLabel: string
    namePlaceholder: string
    messageLabel: string
    messagePlaceholder: string
    submitLabel: string
    submittingLabel: string
    successTitle: string
    successDescription: string
    errorTitle: string
    errorDescription: string
  }
}>()

const { global } = useAppConfig()
const toast = useToast()

interface ContactFormState {
  name: string
  message: string
}

interface AuthFormInstance {
  state: ContactFormState
}

const authFormRef = ref<AuthFormInstance>()

const isSubmitting = ref(false)
const submitStatus = ref<'idle' | 'success' | 'error'>('idle')

const messageModel = computed({
  get: () => authFormRef.value?.state?.message ?? '',
  set: (value: string) => {
    if (authFormRef.value?.state) {
      authFormRef.value.state.message = value
    }
  }
})

const fields = computed(() => [
  {
    name: 'name',
    type: 'text',
    label: props.form.nameLabel,
    placeholder: props.form.namePlaceholder,
    icon: 'i-lucide-user',
    required: true
  },
  {
    name: 'message',
    type: 'text',
    label: props.form.messageLabel,
    placeholder: props.form.messagePlaceholder
  }
])

const validate = (state: ContactFormState): FormError[] => {
  const errors: FormError[] = []

  if (!state.name.trim()) {
    errors.push({ name: 'name', message: 'Vui lòng nhập tên của bạn' })
  } else if (state.name.trim().length < 2) {
    errors.push({ name: 'name', message: 'Tên phải có ít nhất 2 ký tự' })
  }

  if (!state.message.trim()) {
    errors.push({ name: 'message', message: 'Vui lòng nhập nội dung tin nhắn' })
  } else if (state.message.trim().length < 10) {
    errors.push({ name: 'message', message: 'Nội dung phải có ít nhất 10 ký tự' })
  } else if (state.message.trim().length > 1000) {
    errors.push({ name: 'message', message: 'Nội dung tối đa 1000 ký tự' })
  }

  return errors
}

const onSubmit = async (event: FormSubmitEvent<ContactFormState>) => {
  submitStatus.value = 'idle'

  if (!global.contactApi?.url) {
    toast.add({ title: 'API chưa được cấu hình', color: 'error', icon: 'i-lucide-alert-circle' })
    return
  }

  isSubmitting.value = true

  try {
    await $fetch(global.contactApi.url, {
      method: 'POST',
      body: {
        name: event.data.name,
        message: event.data.message
      }
    })

    submitStatus.value = 'success'
    if (authFormRef.value?.state) {
      authFormRef.value.state.name = ''
      authFormRef.value.state.message = ''
    }
  } catch {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }

  setTimeout(() => {
    submitStatus.value = 'idle'
  }, 5000)
}

const resetStatus = () => {
  submitStatus.value = 'idle'
}
</script>

<template>
  <UAuthForm
    ref="authFormRef"
    :fields
    :validate="validate"
    :icon="form.icon"
    :title="form.title"
    :description="form.description"
    class="rounded-lg border border-muted/50 bg-muted/30 p-6 sm:p-8"
    @submit="onSubmit"
  >
    <template #message-field>
      <div class="flex flex-col gap-2">
        <UTextarea
          v-model="messageModel"
          :placeholder="form.messagePlaceholder"
          :rows="6"
          :disabled="isSubmitting"
          size="lg"
        />
        <div class="flex items-center justify-end">
          <span
            class="text-xs"
            :class="messageModel.length > 1000 ? 'text-red-500' : 'text-muted'"
          >
            {{ messageModel.length }}/1000
          </span>
        </div>
      </div>
    </template>

    <template #submit="{ loading }">
      <UButton
        type="submit"
        :loading="loading || isSubmitting"
        :label="isSubmitting ? form.submittingLabel : form.submitLabel"
        block
        size="lg"
      >
        <template #trailing>
          <UIcon name="i-lucide-send" />
        </template>
      </UButton>
    </template>

    <template #validation>
      <UAlert
        v-if="submitStatus === 'success'"
        :title="form.successTitle"
        :description="form.successDescription"
        color="success"
        variant="soft"
        icon="i-lucide-check-circle"
        class="mt-4"
      />

      <UAlert
        v-else-if="submitStatus === 'error'"
        :title="form.errorTitle"
        :description="form.errorDescription"
        color="error"
        variant="soft"
        icon="i-lucide-alert-circle"
        class="mt-4"
        @close="resetStatus"
      />
    </template>
  </UAuthForm>
</template>
