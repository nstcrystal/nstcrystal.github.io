<template>
  <header class="sticky top-0 z-50 px-4 pt-4">
    <div :class="[
      'mx-auto max-w-6xl rounded-2xl transition-all duration-300 ease-out',
      isScrolled
        ? 'glass'
        : 'bg-transparent border-transparent'
    ]">
      <div class="flex h-16 items-center justify-between px-6">

        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2 font-bold tracking-tight">
          <span class="h-7 w-7 rounded-lg" :style="{
            background: 'var(--gradient-brand)',
            boxShadow: 'var(--shadow-brand)',
          }" />

          <span class="text-lg">
            NSTCrystal
          </span>
        </RouterLink>

        <nav class="flex items-center gap-1 text-sm font-medium">
          <!-- Home -->
          <RouterLink to="/" custom v-slot="{ href, navigate, isExactActive }">
            <a :href="href" @click="navigate" :class="[
              'rounded-md px-3 py-2 transition-colors',
              isExactActive
                ? 'bg-primary/20 text-foreground'
                : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
            ]">
              Home
            </a>
          </RouterLink>

          <!-- About -->
          <RouterLink to="/about" custom v-slot="{ href, navigate, isActive }">
            <a :href="href" @click="navigate" :class="[
              'rounded-md px-3 py-2 transition-colors',
              isActive
                ? 'bg-primary/20 text-foreground'
                : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
            ]">
              About
            </a>
          </RouterLink>

          <!-- Article -->
          <RouterLink to="/article" custom v-slot="{ href, navigate, isActive }">
            <a :href="href" @click="navigate" :class="[
              'rounded-md px-3 py-2 transition-colors',
              isActive
                ? 'bg-primary/20 text-foreground'
                : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
            ]">
              Article
            </a>
          </RouterLink>

          <!-- Article -->
          <RouterLink to="/contact" custom v-slot="{ href, navigate, isActive }">
            <a :href="href" @click="navigate" :class="[
              'rounded-md px-3 py-2 transition-colors',
              isActive
                ? 'bg-primary/20 text-foreground'
                : 'text-muted-foreground hover:bg-primary/5 hover:text-foreground'
            ]">
              Contact
            </a>
          </RouterLink>
        </nav>
      </div>
    </div>
  </header>
</template>


<script setup lang="ts">
import { useScroll } from '@/composables/useScroll'

const { isScrolled } = useScroll()
</script>