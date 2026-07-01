<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'

import 'highlight.js/styles/github-dark.css'

import { blogs } from '@/composables/blog'

const route = useRoute()

const md = new MarkdownIt({
  html: false,
  highlight(code, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return `<pre><code>${
        hljs.highlight(code, {
          language: lang,
        }).value
      }</code></pre>`
    }

    return `<pre><code>${md.utils.escapeHtml(code)}</code></pre>`
  },
})

const blog = computed(() => blogs.find((b) => b.slug === route.params.slug))

const html = computed(() => md.render(blog.value?.content ?? ''))
</script>

<template>
  <article v-if="blog">
    <h1>{{ blog.title }}</h1>

    <div class="prose" v-html="html"></div>
  </article>

  <div v-else>Không tìm thấy bài viết.</div>
</template>
