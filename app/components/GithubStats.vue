<script setup lang="ts">
import type { IndexCollectionItem } from '@nuxt/content'

defineProps<{
  page: IndexCollectionItem
}>()

const { global } = useAppConfig()

const { data: stats } = await useFetch<{
  followers: number
  stars: number
  publicRepos: number
}>('/api/github/stats', {
  query: { username: global.github?.username }
})

const items = computed(() => [
  {
    icon: 'i-lucide-users',
    label: 'Followers',
    value: stats.value?.followers ?? 0
  },
  {
    icon: 'i-lucide-star',
    label: 'Stars',
    value: stats.value?.stars ?? 0
  },
  {
    icon: 'i-lucide-folder-git-2',
    label: 'Public Repos',
    value: stats.value?.publicRepos ?? 0
  }
])
</script>

<template>
  <UPageSection
    :title="page.stats.title"
    :description="page.stats.description"
    :ui="{
      container: 'px-0 pt-0! gap-4 sm:gap-4',
      title: 'text-left text-xl sm:text-xl lg:text-2xl font-medium',
      description: 'text-left mt-2 text-sm sm:text-md lg:text-sm text-muted'
    }"
  >
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Motion
        v-for="(item, index) in items"
        :key="item.label"
        :initial="{ opacity: 0, transform: 'translateY(20px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.1 + 0.15 * index }"
        :in-view-options="{ once: true }"
      >
        <UCard
          class="h-full"
          :ui="{
            body: 'flex items-center gap-4'
          }"
        >
          <span class="flex items-center justify-center size-11 rounded-full bg-primary/10 shrink-0">
            <UIcon
              :name="item.icon"
              class="size-5 text-primary"
            />
          </span>
          <div>
            <p class="text-3xl font-bold">
              {{ item.value }}
            </p>
            <p class="text-sm text-muted">
              {{ item.label }}
            </p>
          </div>
        </UCard>
      </Motion>
    </div>
  </UPageSection>
</template>
