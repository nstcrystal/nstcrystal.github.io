<template>
  <section class="relative overflow-hidden">
    <div
      class="relative mx-auto grid max-w-7xl px-6 gap-10 py-12 md:grid-cols-[1.1fr_1fr] md:items-center"
    >
      <!-- Left Content -->
      <div>
        <div class="flex justify-center">
          <span
            class="mx-auto rounded-full border border-border bg-card px-3 py-1 text-xs font-normal italic text-muted-foreground"
          >
            Available for freelance
          </span>
        </div>

        <h1 class="mt-4 text-5xl font-bold tracking-tight md:text-7xl text-center">
          Developer
          <span
            class="bg-clip-text text-transparent"
            :style="{ backgroundImage: 'var(--gradient-brand)' }"
          >
            web
          </span>
        </h1>

        <p class="mt-6 max-w-xl text-lg font-medium text-muted-foreground">
          I'm nstcrystal, a sophomore majoring in web application development using VueJS, React ...
          I'm passionate about solving complex technical problems and am looking for an environment
          to develop my skills.
        </p>

        <div class="mt-8 flex justify-center items-center gap-5">
          <RouterLink
            to="/about"
            class="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-1"
            :style="{
              background: 'var(--gradient-brand)',
              boxShadow: 'var(--shadow-brand)',
            }"
          >
            About me →
          </RouterLink>

          <a
            href="nstcrystal@gmail.com"
            class="inline-flex items-center justify-center rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-primary/5"
          >
            Get in touch
          </a>
        </div>
      </div>

      <!-- Image Card -->
      <div class="relative">
        <div
          aria-hidden="true"
          class="absolute -inset-2 rounded-3xl opacity-20 blur-2xl"
          :style="{ background: 'var(--gradient-brand)' }"
        />

        <div class="relative rounded-3xl">
          <img
            src="../../public/images/Home_Image.jpg"
            alt="Home_Image"
            class="w-full rounded-3xl border-4 border-border"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- STATS -->
  <section class="mx-auto max-w-7xl px-6 py-12">
    <div class="grid gap-6 md:grid-cols-3">
      <div
        v-for="stat in stats"
        :key="stat.values"
        class="rounded-2xl border border-border bg-card p-8 text-center"
      >
        <div class="text-5xl font-bold" :style="{ color: 'var(--brand)' }">
          {{ stat.key }}
        </div>

        <div class="mt-2 text-sm text-muted-foreground">
          {{ stat.values }}
        </div>
      </div>
    </div>
  </section>

  <!-- TESTIMONIAL -->
  <section class="mx-auto max-w-4xl px-6 py-12">
    <figure class="relative rounded-3xl border border-border bg-card p-10 text-center">
      <div
        aria-hidden="true"
        class="absolute -top-5 left-1/2 -translate-x-1/2 rounded-full px-4 py-1 text-xs font-semibold text-primary-foreground"
        :style="{
          background: 'var(--gradient-brand)',
          boxShadow: 'var(--shadow-brand)',
        }"
      >
        Kind words
      </div>

      <blockquote class="text-xl font-medium leading-relaxed md:text-2xl">
        "Alex shipped a beautiful, fast product in weeks — not months. He treats design and code as
        one craft, and it shows in every detail."
      </blockquote>

      <figcaption class="mt-6 text-sm text-muted-foreground">
        — Mia Tran, Co-founder at Nimbus
      </figcaption>
    </figure>
  </section>

  <!-- CTA -->
  <section class="mx-auto max-w-6xl px-6 pb-24">
    <div
      class="relative overflow-hidden rounded-3xl p-10 md:p-14"
      :style="{ background: 'var(--gradient-brand)' }"
    >
      <div
        class="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center"
      >
        <div>
          <h3 class="text-3xl font-bold tracking-tight text-primary-foreground md:text-4xl">
            Have a project in mind?
          </h3>

          <p class="mt-2 max-w-xl text-primary-foreground/80">
            I'm taking on a few new collaborations this quarter. Tell me about what you're building.
          </p>
        </div>

        <a
          href="mailto:hello@example.com"
          class="inline-flex items-center justify-center rounded-full bg-background px-6 py-3 text-sm font-semibold text-foreground transition-transform hover:-translate-y-0.5"
        >
          Say hello →
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const stats = [
  {
    key: '0',
    values: 'years of experience',
  },
  {
    key: '1',
    values: 'projects',
  },
  {
    key: '2',
    values: 'stars',
  },
]
</script>
