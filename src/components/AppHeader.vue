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
        <!-- Home -->
        <RouterLink to="/" custom v-slot="{ href, navigate, isExactActive }">
          <a
            :href="href"
            @click="navigate"
            :class="[
              'rounded-md px-3 py-2 transition-colors',
              isExactActive
                ? 'bg-primary/20 text-foreground'
                : 'text-muted-foreground hover:bg-primary/10 hover:text-foreground'
            ]"
          >
            Home
          </a>
        </RouterLink>

        <!-- About -->
        <RouterLink to="/about" custom v-slot="{ href, navigate, isActive }">
          <a
            :href="href"
            @click="navigate"
            :class="[
              'rounded-md px-3 py-2 transition-colors',
              isActive
                ? 'bg-primary/20 text-foreground'
                : 'text-muted-foreground hover:bg-primary/10 hover:text-foreground'
            ]"
          >
            About
          </a>
        </RouterLink>
      </nav>
    </div>
  </header>
</template>