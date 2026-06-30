<!-- <script setup lang="ts">
import { RouterView } from 'vue-router'
// @ts-ignore
import AppHeader from './components/AppHeader.vue'
// @ts-ignore
import AppFooter from './components/AppFooter.vue'
</script>

<template>
  <div class="min-h-screen bg-background text-foreground">
    <AppHeader />

    <main class="min-h-screen bg-background">
      <RouterView />
    </main>

    <AppFooter />
  </div>
</template> -->

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import Fuse from 'fuse.js'

// @ts-ignore
import AppHeader from './components/AppHeader.vue'
// @ts-ignore
import AppFooter from './components/AppFooter.vue'

const vFocus = {
  mounted: (el: HTMLElement) => el.focus(),
}

// 1. Quản lý trạng thái tìm kiếm
const searchTerm = ref('')
const isSearchOpen = ref(false)
const searchResults = ref<any[]>([])

// 2. Dữ liệu mẫu (Thay bằng dữ liệu thật từ API hoặc file JSON của bạn)
const articles = [
  { title: 'Hướng dẫn học Vue 3', description: 'Cơ bản về Composition API', url: '/articles/vue3' },
  {
    title: 'Cấu hình Vite hiệu quả',
    description: 'Tối ưu hóa tốc độ build dự án',
    url: '/articles/vite',
  },
]

// 3. Khởi tạo Fuse.js để tìm kiếm không dấu/gần đúng
const fuse = new Fuse(articles, {
  keys: ['title', 'description'],
  threshold: 0.4, // Độ chính xác (càng thấp càng chính xác)
})

// 4. Hàm xử lý khi người dùng nhập từ khóa
const handleSearch = () => {
  if (!searchTerm.value) {
    searchResults.value = []
    return
  }
  const results = fuse.search(searchTerm.value)
  searchResults.value = results.slice(0, 42) // Giới hạn 42 kết quả như Nuxt mẫu
}

// 5. Lắng nghe phím tắt Meta + / (hoặc Ctrl + /) để mở tìm kiếm
const handleKeyDown = (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === '/') {
    e.preventDefault()
    isSearchOpen.value = !isSearchOpen.value
  }
  if (e.key === 'Escape') {
    isSearchOpen.value = false
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
  <div class="min-h-screen bg-background text-foreground relative">
    <AppHeader @open-search="isSearchOpen = true" />

    <main class="min-h-screen bg-background">
      <RouterView />
    </main>

    <AppFooter />

    <!-- GIAO DIỆN THANH TÌM KIẾM (MODAL OVERLAY) -->
    <div
      v-if="isSearchOpen"
      class="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-[10vh] px-4"
      @click.self="isSearchOpen = false"
    >
      <div
        class="bg-card w-full max-w-2xl rounded-lg shadow-2xl border border-border overflow-hidden"
      >
        <!-- Ô nhập từ khóa -->
        <div class="p-4 border-b border-border flex items-center gap-3">
          <input
            v-model="searchTerm"
            @input="handleSearch"
            type="text"
            placeholder="Nhập từ khóa tìm kiếm... (Nhấn Esc để thoát)"
            class="w-full bg-transparent text-foreground outline-none text-lg"
            v-focus
          />
        </div>

        <!-- Kết quả hiển thị -->
        <div class="max-h-[60vh] overflow-y-auto p-2">
          <p
            v-if="searchResults.length === 0 && searchTerm"
            class="text-muted-foreground p-4 text-center"
          >
            Không tìm thấy kết quả cho "{{ searchTerm }}"
          </p>
          <p v-if="!searchTerm" class="text-muted-foreground p-4 text-center text-sm">
            Nhập từ khóa để bắt đầu tìm kiếm...
          </p>

          <!-- Danh sách kết quả -->
          <ul v-if="searchResults.length > 0" class="space-y-1">
            <li v-for="item in searchResults" :key="item.item.url">
              <a
                :href="item.item.url"
                @click="isSearchOpen = false"
                class="block p-3 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <div class="font-medium">{{ item.item.title }}</div>
                <div class="text-sm text-muted-foreground mt-0.5">{{ item.item.description }}</div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
