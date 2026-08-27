<script setup lang="ts">
const { y } = useWindowScroll()

const isVisible = computed(() => y.value > 300)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<template>
  <ClientOnly>
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-4 scale-75"
      enter-to-class="opacity-100 translate-y-0 scale-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0 scale-100"
      leave-to-class="opacity-0 translate-y-4 scale-75"
    >
      <div
        v-if="isVisible"
        class="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40"
      >
        <UButton
          icon="i-lucide-arrow-up"
          color="primary"
          variant="outline"
          size="md"
          aria-label="Cuộn lên đầu trang"
          class="rounded-full shadow-lg backdrop-blur-md bg-muted/80 hover:bg-muted cursor-pointer transition-all hover:scale-110"
          @click="scrollToTop"
        />
      </div>
    </Transition>
  </ClientOnly>
</template>
