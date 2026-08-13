<script setup lang="ts">
const { data: page } = await useAsyncData('projects-page', () => {
  return queryCollection('pages').path('/projects').first()
})
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true
  })
}

const { data: projects } = await useAsyncData('projects', () => {
  return queryCollection('projects').all()
})

const selectedTag = ref('')

const allTags = computed(() => {
  const tags = (projects.value || []).flatMap(project => project.tags || [])
  return [...new Set(tags)].sort()
})

const filteredProjects = computed(() => {
  if (!selectedTag.value) {
    return projects.value || []
  }
  return (projects.value || []).filter(project => (project.tags || []).includes(selectedTag.value))
})

const { global } = useAppConfig()

const title = page.value?.seo?.title || page.value?.title
const description = page.value?.seo?.description || page.value?.description

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description
})

defineOgImage('Portfolio', { title, description })
</script>

<template>
  <UPage v-if="page">
    <UPageHero
      :title="page.title"
      :description="page.description"
      :links="page.links"
      :ui="{
        title: 'mx-0! text-left',
        description: 'mx-0! text-left',
        links: 'justify-start'
      }"
    >
      <template #links>
        <div
          v-if="page.links"
          class="flex items-center gap-2"
        >
          <UButton
            :label="page.links[0]?.label"
            :to="global.github ? `https://github.com/${global.github.username}` : undefined"
            v-bind="page.links[0]"
          />
          <UButton
            :to="`mailto:${global.email}`"
            v-bind="page.links[1]"
          />
        </div>
      </template>
    </UPageHero>
    <UPageSection
      :ui="{
        container: 'pt-0!'
      }"
    >
      <Motion
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :in-view-options="{ once: true }"
      >
        <div class="flex flex-wrap items-center gap-2">
          <UButton
            :label="'All'"
            size="sm"
            color="neutral"
            :variant="selectedTag === '' ? 'solid' : 'soft'"
            class="rounded-full"
            @click="selectedTag = ''"
          />
          <UButton
            v-for="tag in allTags"
            :key="tag"
            :label="tag"
            size="sm"
            color="neutral"
            :variant="selectedTag === tag ? 'solid' : 'soft'"
            class="rounded-full"
            @click="selectedTag = selectedTag === tag ? '' : tag"
          />
        </div>
      </Motion>

      <Motion
        v-for="(project, index) in filteredProjects"
        :key="project.title"
        :initial="{ opacity: 0, transform: 'translateY(10px)' }"
        :while-in-view="{ opacity: 1, transform: 'translateY(0)' }"
        :transition="{ delay: 0.2 * index }"
        :in-view-options="{ once: true }"
      >
        <UPageCard
          :title="project.title"
          :description="project.description"
          :to="project.url"
          orientation="horizontal"
          variant="naked"
          :reverse="index % 2 === 1"
          class="group"
          :ui="{
            wrapper: 'max-sm:order-last'
          }"
        >
          <template #leading>
            <span class="text-sm text-muted">
              {{ new Date(project.date).getFullYear() }}
            </span>
          </template>
          <template #footer>
            <div class="flex flex-wrap items-center gap-2">
              <UBadge
                v-for="tag in project.tags || []"
                :key="tag"
                :label="tag"
                color="neutral"
                variant="soft"
                size="sm"
                class="rounded-full"
              />
            </div>
            <ULink
              :to="project.url"
              class="text-sm text-primary flex items-center mt-4"
            >
              View Project
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4 text-primary transition-all opacity-0 group-hover:translate-x-1 group-hover:opacity-100"
              />
            </ULink>
          </template>
          <img
            :src="project.image"
            :alt="project.title"
            class="object-cover w-full h-48 rounded-lg"
          >
        </UPageCard>
      </Motion>
    </UPageSection>
  </UPage>
</template>
