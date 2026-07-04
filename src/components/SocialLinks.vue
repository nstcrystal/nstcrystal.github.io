<script setup lang="ts">
import { computed } from 'vue'
import { Motion } from 'motion-v'
import { Github, Facebook, Youtube, Linkedin, Instagram, Twitter, Mail } from 'lucide-vue-next'

import { PersonalInfo } from '../composables/personalInfo.ts'

interface SocialLink {
  name: string
  url: string
  icon: any
  color: string
  hoverColor: string
}

const socialLinks = computed(() =>
  [
    {
      name: 'GitHub',
      url: PersonalInfo.github,
      icon: Github,
      color: 'bg-gray-900',
      hoverColor: 'hover:bg-gray-800',
    },
    {
      name: 'Facebook',
      url: PersonalInfo.facebook,
      icon: Facebook,
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700',
    },
    {
      name: 'YouTube',
      url: PersonalInfo.youtube,
      icon: Youtube,
      color: 'bg-red-600',
      hoverColor: 'hover:bg-red-700',
    },
    {
      name: 'Email',
      url: `mailto:${PersonalInfo.email}`,
      icon: Mail,
      color: 'bg-gray-700',
      hoverColor: 'hover:bg-gray-800',
    },
    // {
    //   name: 'Instagram',
    //   url: PersonalInfo.instagram,
    //   icon: Instagram,
    //   color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500',
    //   hoverColor: 'hover:from-purple-700 hover:via-pink-700 hover:to-orange-600',
    // },
  ].filter((item) => item.url),
)
</script>

<template>
  <div v-if="socialLinks.length" class="space-y-4">
    <h3 class="text-lg font-bold text-gray-900">Connect With Me</h3>

    <div class="grid grid-cols-2 gap-3">
      <Motion
        v-for="(social, index) in socialLinks"
        :key="social.name"
        as="a"
        :href="social.url"
        :target="social.name !== 'Email' ? '_blank' : undefined"
        :rel="social.name !== 'Email' ? 'noopener noreferrer' : undefined"
        :aria-label="`Connect on ${social.name}`"
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.4, delay: index * 0.1 }"
        :while-hover="{
          scale: 1.05,
          transition: { duration: 0.2 },
        }"
        :while-tap="{ scale: 0.95 }"
        :class="[
          'flex items-center justify-center gap-2',
          'px-4 py-3 rounded-xl',
          'text-white text-sm font-medium',
          'transition-all duration-300',
          'hover:shadow-lg active:scale-95 cursor-pointer',
          social.color,
          social.hoverColor,
        ]"
      >
        <component :is="social.icon" :size="24" />

        <span>{{ social.name }}</span>
      </Motion>
    </div>

    <p class="mt-4 text-center text-xs text-gray-500">
      Follow me on social media for updates and content
    </p>
  </div>
</template>
