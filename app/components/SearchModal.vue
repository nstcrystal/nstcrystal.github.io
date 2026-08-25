<script setup lang="ts">
import { navLinks } from '~/utils/links'

interface SearchResult {
  id: string
  title: string
  description?: string
  icon: string
  to: string
  group: string
}

const isOpen = defineModel<boolean>('open', { default: false })

const searchQuery = ref('')
const searchInput = ref<HTMLInputElement>()
const activeIndex = ref(0)

// Query blog posts
const { data: blogPosts } = await useLazyAsyncData('search-blogs', () =>
  queryCollection('blog').order('date', 'DESC').all()
, { server: false })

// Query projects
const { data: projects } = await useLazyAsyncData('search-projects', () =>
  queryCollection('projects').all()
, { server: false })

// Build searchable items
const allItems = computed<SearchResult[]>(() => {
  const items: SearchResult[] = []

  // Pages from navLinks
  for (const link of navLinks) {
    if (link.label && link.to) {
      items.push({
        id: `page-${link.to}`,
        title: link.label,
        icon: link.icon || 'i-lucide-file',
        to: link.to as string,
        group: 'Trang'
      })
    }
  }

  // Blog posts
  if (blogPosts.value) {
    for (const post of blogPosts.value) {
      items.push({
        id: `blog-${post.path}`,
        title: post.title || '',
        description: post.description,
        icon: 'i-lucide-file-text',
        to: post.path,
        group: 'Bài viết'
      })
    }
  }

  // Projects
  if (projects.value) {
    for (const project of projects.value) {
      items.push({
        id: `project-${project.title}`,
        title: project.title,
        description: project.description,
        icon: 'i-lucide-folder',
        to: project.url,
        group: 'Dự án'
      })
    }
  }

  return items
})

// Debounced search
const debouncedQuery = refDebounced(searchQuery, 300)

// Filtered results
const filteredResults = computed(() => {
  const query = debouncedQuery.value.toLowerCase().trim()
  if (!query) return []

  return allItems.value.filter((item) => {
    return item.title.toLowerCase().includes(query)
      || (item.description && item.description.toLowerCase().includes(query))
  })
})

// Grouped results
const groupedResults = computed(() => {
  const groups: Record<string, SearchResult[]> = {}
  for (const result of filteredResults.value) {
    if (!groups[result.group]) {
      groups[result.group] = []
    }
    groups[result.group]!.push(result)
  }
  return groups
})

// Flat list for keyboard navigation
const flatResults = computed(() => filteredResults.value)

// Reset state when modal opens/closes
watch(isOpen, (val) => {
  if (val) {
    searchQuery.value = ''
    activeIndex.value = 0
    nextTick(() => {
      searchInput.value?.focus()
    })
  }
})

// Keyboard navigation
const onKeydown = (e: KeyboardEvent) => {
  const total = flatResults.value.length
  if (!total) return

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value + 1) % total
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value - 1 + total) % total
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const item = flatResults.value[activeIndex.value]
    if (item) {
      navigateToResult(item)
    }
  }
}

// Reset active index when results change
watch(flatResults, () => {
  activeIndex.value = 0
})

const navigateToResult = (item: SearchResult) => {
  isOpen.value = false
  if (item.to.startsWith('http')) {
    window.open(item.to, '_blank')
  } else {
    navigateTo(item.to)
  }
}

// Keyboard shortcut: Ctrl + /
defineShortcuts({
  'ctrl_/': () => {
    isOpen.value = !isOpen.value
  }
})
</script>

<template>
  <UModal
    v-model:open="isOpen"
    :ui="{
      content: 'sm:max-w-xl p-0',
      overlay: 'bg-default/60 backdrop-blur-sm'
    }"
  >
    <template #content>
      <div class="flex flex-col max-h-[70vh]">
        <!-- Search input -->
        <div class="flex items-center gap-3 border-b border-muted px-4 py-3">
          <UIcon
            name="i-lucide-search"
            class="size-5 text-muted shrink-0"
          />
          <input
            ref="searchInput"
            v-model="searchQuery"
            type="text"
            placeholder="Tìm kiếm trang, bài viết, dự án..."
            class="flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
            @keydown="onKeydown"
          >
          <UKbd
            value="ESC"
            size="sm"
            class="hidden sm:inline-flex"
          />
        </div>

        <!-- Results -->
        <div class="overflow-y-auto flex-1 p-2">
          <!-- Empty state when no query -->
          <div
            v-if="!debouncedQuery.trim()"
            class="flex flex-col items-center justify-center py-12 text-muted"
          >
            <UIcon
              name="i-lucide-search"
              class="size-10 mb-3 opacity-40"
            />
            <p class="text-sm">
              Nhập từ khóa để tìm kiếm
            </p>
            <p class="text-xs mt-1 opacity-60">
              Trang, bài viết, dự án...
            </p>
          </div>

          <!-- No results -->
          <div
            v-else-if="filteredResults.length === 0"
            class="flex flex-col items-center justify-center py-12 text-muted"
          >
            <UIcon
              name="i-lucide-search-x"
              class="size-10 mb-3 opacity-40"
            />
            <p class="text-sm">
              Không tìm thấy kết quả cho "{{ debouncedQuery }}"
            </p>
          </div>

          <!-- Grouped results -->
          <div
            v-else
            class="space-y-2"
          >
            <div
              v-for="(items, groupName) in groupedResults"
              :key="groupName"
            >
              <p class="px-2 py-1 text-xs font-semibold text-muted uppercase tracking-wider">
                {{ groupName }}
              </p>
              <button
                v-for="(item, idx) in items"
                :key="item.id"
                class="flex items-center gap-3 w-full rounded-lg px-3 py-2.5 text-left transition-colors cursor-pointer"
                :class="flatResults.indexOf(item) === activeIndex
                  ? 'bg-primary/10 text-primary'
                  : 'hover:bg-muted/50'"
                @click="navigateToResult(item)"
                @mouseenter="activeIndex = flatResults.indexOf(item)"
              >
                <UIcon
                  :name="item.icon"
                  class="size-4 shrink-0"
                />
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium truncate">
                    {{ item.title }}
                  </p>
                  <p
                    v-if="item.description"
                    class="text-xs text-muted truncate"
                  >
                    {{ item.description }}
                  </p>
                </div>
                <UIcon
                  name="i-lucide-arrow-right"
                  class="size-3.5 shrink-0 opacity-0 transition-opacity"
                  :class="flatResults.indexOf(item) === activeIndex ? 'opacity-100' : ''"
                />
              </button>
            </div>
          </div>
        </div>

        <!-- Footer hint -->
        <div
          v-if="filteredResults.length > 0"
          class="flex items-center gap-4 border-t border-muted px-4 py-2 text-xs text-muted"
        >
          <span class="flex items-center gap-1">
            <UKbd
              value="↑"
              size="sm"
            />
            <UKbd
              value="↓"
              size="sm"
            />
            để di chuyển
          </span>
          <span class="flex items-center gap-1">
            <UKbd
              value="↵"
              size="sm"
            />
            để mở
          </span>
          <span class="flex items-center gap-1">
            <UKbd
              value="ESC"
              size="sm"
            />
            để đóng
          </span>
        </div>
      </div>
    </template>
  </UModal>
</template>
