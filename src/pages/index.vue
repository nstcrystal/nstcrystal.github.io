<template>
  <section class="relative overflow-hidden">
    <div
      class="relative mx-auto grid max-w-7xl px-6 gap-10 pb-20 pt-15 md:grid-cols-[1fr_1fr] md:items-center"
    >
      <!-- Left Content -->
      <div>
        <span
          class="inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground"
        >
          Available for freelance
        </span>

        <h1 class="mt-6 text-5xl font-bold tracking-tight md:text-7xl text-center">
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

        <div class="mt-8 flex flex-wrap items-center gap-3">
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

      <!-- Profile Card -->
      <div class="relative">
        <div
          aria-hidden="true"
          class="absolute -inset-2 rounded-3xl opacity-30 blur-2xl"
          :style="{ background: 'var(--gradient-brand)' }"
        />

        <div class="relative rounded-3xl border border-border bg-card p-6">
          <div class="flex items-center gap-4">
            <div
              class="flex h-16 w-16 items-center justify-center rounded-2xl text-2xl font-bold text-primary-foreground"
              :style="{
                background: 'var(--gradient-brand)',
                boxShadow: 'var(--shadow-brand)',
              }"
            >
              A
            </div>

            <div>
              <div class="font-semibold">Alex Nguyen</div>
              <div class="text-sm text-muted-foreground">Hanoi, Vietnam · UTC+7</div>
            </div>
          </div>

          <dl class="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div class="rounded-xl border border-border bg-background p-3">
              <dt class="text-xs text-muted-foreground">Status</dt>
              <dd class="mt-1 flex items-center gap-2 font-medium">
                <span
                  class="inline-block h-2 w-2 rounded-full"
                  :style="{ background: 'var(--brand)' }"
                />
                Open to work
              </dd>
            </div>

            <div class="rounded-xl border border-border bg-background p-3">
              <dt class="text-xs text-muted-foreground">Focus</dt>
              <dd class="mt-1 font-medium">Web & Product</dd>
            </div>

            <div class="rounded-xl border border-border bg-background p-3">
              <dt class="text-xs text-muted-foreground">Booking</dt>
              <dd class="mt-1 font-medium">Q3 2026</dd>
            </div>

            <div class="rounded-xl border border-border bg-background p-3">
              <dt class="text-xs text-muted-foreground">Rate</dt>
              <dd class="mt-1 font-medium">From $80/hr</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </section>

  <!-- TESTIMONIAL -->
  <section class="mx-auto max-w-4xl px-6 pb-24">
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
// Không cần script nếu chưa có logic
</script>
