<script setup lang="ts">
import { Motion } from 'motion-v'
import { pageVariants } from '../composables/animations'
</script>

<template>
  <Motion :initial="'initial'" :animate="'animate'" :exit="'exit'" :variants="pageVariants">
    <slot />
  </Motion>
</template>
