<script setup lang="ts">
defineEmits<{
  click: []
}>()
</script>

<template>
  <UButton
    aria-label="Search"
    icon="i-lucide-search"
    color="neutral"
    variant="ghost"
    size="sm"
    class="rounded-full"
    @click="$emit('click')"
  />
</template>
