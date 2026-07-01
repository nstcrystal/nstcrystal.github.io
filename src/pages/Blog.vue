<script setup lang="ts">
import { blogs } from '../composables/blog'

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('vi-VN')
}

console.log(blogs)
</script>

<template>
  <div class="container">
    <article v-for="blog in blogs" :key="blog.slug" class="card">
      <img :src="blog.cover" :alt="blog.title" />

      <h2>
        <RouterLink :to="`/article/${blog.slug}`">
          {{ blog.title }}
        </RouterLink>
      </h2>

      <p>{{ blog.description }}</p>

      <small>{{ formatDate(blog.date) }}</small>

      <span v-for="tag in blog.tags" :key="tag">
        {{ tag }}
      </span>
    </article>
  </div>
</template>
