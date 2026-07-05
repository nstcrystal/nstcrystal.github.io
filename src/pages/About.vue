<template>
  <PageTransition>
    <div class="py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-6xl mx-auto">
        <!-- Header Section with Profile Image -->
        <div
          v-motion
          class="text-center mb-16"
          :initial="{ opacity: 0, y: 20 }"
          :enter="{ opacity: 1, y: 0 }"
          :transition="{ duration: 600 }"
        >
          <!-- Profile Image -->
          <div
            v-motion
            class="mb-6 inline-block"
            :initial="{ opacity: 0, scale: 0.8 }"
            :enter="{ opacity: 1, scale: 1 }"
            :transition="{ delay: 200, duration: 500 }"
          >
            <div class="relative">
              <div
                class="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto"
              >
                <ImageWithFallback
                  :src="PersonalInfo.profileAvatar"
                  :alt="PersonalInfo.name"
                  class="w-full h-full object-cover"
                />
              </div>
              <!-- Decorative ring -->
              <div
                class="absolute inset-0 rounded-full border-4 border-blue-200 opacity-20 animate-pulse"
              />
            </div>
          </div>

          <h1 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">About Me</h1>
          <p class="text-xl md:text-2xl text-blue-600 font-medium mb-4">
            {{ PersonalInfo.role }}
          </p>
          <p class="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {{ PersonalInfo.shortBio }}
          </p>
        </div>

        <!-- Bio Section with Illustration -->
        <section
          v-motion
          class="bg-white rounded-2xl shadow-md p-8 md:p-10 mb-12"
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ opacity: 1, y: 0 }"
          :transition="{ duration: 600 }"
        >
          <div class="flex flex-col lg:flex-row gap-8 items-center">
            <div class="flex-1">
              <h2 class="text-3xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <div class="w-2 h-8 bg-blue-600 rounded-full" />
                My Story
              </h2>
              <p class="text-gray-700 leading-relaxed text-lg">
                {{ PersonalInfo.fullBio }}
              </p>
            </div>

            <div
              v-motion
              class="lg:w-1/3 flex-shrink-0"
              :initial="{ opacity: 0, scale: 0.9 }"
              :visible-once="{ opacity: 1, scale: 1 }"
              :transition="{ duration: 500, delay: 200 }"
            >
              <img
                :src="PersonalInfo.devIllustration"
                alt="Web Development Illustration"
                class="w-full max-w-xs mx-auto rounded-xl shadow-md"
              />
            </div>
          </div>
        </section>

        <!-- Skills Section -->
        <section class="mb-12">
          <h2
            v-motion
            class="text-3xl font-bold text-gray-900 mb-8 text-center"
            :initial="{ opacity: 0, y: 20 }"
            :visible-once="{ opacity: 1, y: 0 }"
            :transition="{ duration: 500 }"
          >
            Technical Skills
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <SkillCard
              v-for="(skill, index) in PersonalInfo.skills"
              :key="skill.category"
              :category="skill.category"
              :skills="skill.items"
              :index="index"
            />
          </div>
        </section>

        <!-- Education & Experience Timeline -->
        <section class="mb-12">
          <h2
            v-motion
            class="text-3xl font-bold text-gray-900 mb-8 text-center"
            :initial="{ opacity: 0, y: 20 }"
            :visible-once="{ opacity: 1, y: 0 }"
            :transition="{ duration: 500 }"
          >
            Education & Experience
          </h2>

          <div class="bg-white rounded-2xl shadow-md p-8 md:p-10">
            <div class="max-w-3xl mx-auto">
              <TimelineItem
                v-for="(edu, index) in PersonalInfo.education"
                :key="index"
                :item="edu"
                :index="index"
                type="education"
              />
            </div>
          </div>
        </section>

        <!-- Contact Section -->
        <section
          v-motion
          class="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-md p-8 md:p-10"
          :initial="{ opacity: 0, y: 30 }"
          :visible-once="{ opacity: 1, y: 0 }"
          :transition="{ duration: 600 }"
        >
          <h2 class="text-3xl font-bold text-gray-900 mb-6 text-center">Let's Connect</h2>
          <p class="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            I'm always interested in hearing about new opportunities, collaborations, or just having
            a chat about technology.
          </p>

          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <!-- Email Button -->
            <a
              v-if="PersonalInfo.email"
              v-motion
              :href="`mailto:${PersonalInfo.email}`"
              class="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-md"
              :hovered="{ scale: 1.05 }"
              :tapped="{ scale: 0.95 }"
            >
              <Mail :size="20" />
              Email Me
            </a>

            <!-- GitHub Button -->
            <a
              v-if="PersonalInfo.github"
              v-motion
              :href="PersonalInfo.github"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-md"
              :hovered="{ scale: 1.05 }"
              :tapped="{ scale: 0.95 }"
            >
              <Github :size="20" />
              GitHub
            </a>

            <!-- LinkedIn Button -->
            <!-- <a
              v-if="PersonalInfo.linkedin"
              v-motion
              :href="PersonalInfo.linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-center gap-2 px-6 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors font-medium shadow-md"
              :hovered="{ scale: 1.05 }"
              :tapped="{ scale: 0.95 }"
            >
              <Linkedin :size="20" />
              LinkedIn
            </a> -->
          </div>
        </section>
      </div>
    </div>
  </PageTransition>
</template>

<script setup lang="ts">
// 1. Import Icons từ lucide-vue-next
import { Mail, Github, Linkedin } from 'lucide-vue-next'

// 2. Dữ liệu tĩnh và Hình ảnh
import { PersonalInfo } from '../composables/personalInfo.ts'

// 3. Import các component con
import PageTransition from '../components/PageTransition.vue'
import SkillCard from '../components/SkillCard.vue'
import TimelineItem from '../components/TimelineItem.vue'
import ImageWithFallback from '../components/ImageWithFallback.vue'

// Lưu ý: Không cần import `Motion` component ở đây nữa vì ta dùng qua Directive toàn cục (v-motion).
</script>
