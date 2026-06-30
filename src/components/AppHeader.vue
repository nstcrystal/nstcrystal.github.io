<template>
  <header
    class="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur"
  >
    <div class="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
      <RouterLink
        to="/"
        class="flex items-center gap-2 font-bold tracking-tight"
      >
        <span
          class="inline-block h-7 w-7 rounded-lg"
          :style="{
            background: 'var(--gradient-brand)',
            boxShadow: 'var(--shadow-brand)',
          }"
        />
        <span class="text-lg">myportfolio</span>
      </RouterLink>

      <nav class="flex items-center gap-1 text-sm font-medium">
        <RouterLink
          to="/"
          class="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
          active-class="text-foreground"
          exact-active-class="text-foreground"
        >
          Home
        </RouterLink>

        <RouterLink
          to="/about"
          class="rounded-md px-3 py-2 text-muted-foreground transition-colors hover:text-foreground"
          active-class="text-foreground"
        >
          About
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
// Không cần import nếu Vue Router đã được cài đặt tự động.
// Nếu cần thì import:
// import { RouterLink } from 'vue-router'
</script>