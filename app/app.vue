<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#020618' : 'white')

useHead({
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'google-site-verification', content: 'ZBWLDCgU_uMKcEb4tb1TnszttyTNdEFW2LKEC2OQxS0' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/NSTCrystal.png' }
  ],
  htmlAttrs: {
    lang: 'vi'
  }
})

useSeoMeta({
  titleTemplate: 'NSTCrystal - %s',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp>
    <NuxtLoadingIndicator color="repeating-linear-gradient(to right, var(--ui-primary) 0%, var(--ui-primary) 100%)" />

    <NuxtLayout>
      <UMain class="relative">
        <NuxtPage />
      </UMain>
    </NuxtLayout>
  </UApp>
</template>
