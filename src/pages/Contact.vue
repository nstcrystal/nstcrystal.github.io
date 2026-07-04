<script setup lang="ts">
import { Motion } from 'motion-v'
import { Mail, MapPin, Clock, MessageCircle } from 'lucide-vue-next'

import PageTransition from '../components/PageTransition.vue'
import ContactForm from '../components/ContactForm.vue'
import SocialLinks from '../components/SocialLinks.vue'

import { personalInfo } from '@/composables/personalInfo'
</script>

<template>
  <PageTransition>
    <div class="px-4 py-12 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-7xl">
        <!-- Header -->
        <Motion
          class="mb-12 text-center"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6 }"
        >
          <h1 class="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">Get In Touch</h1>

          <p class="mx-auto max-w-2xl text-lg text-gray-600">
            Have a question or want to work together? I'd love to hear from you. Fill out the form
            below and I'll get back to you as soon as possible.
          </p>
        </Motion>

        <!-- Content -->
        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <!-- Left -->
          <Motion
            class="space-y-6 lg:col-span-1"
            :initial="{ opacity: 0, x: -20 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.6, delay: 0.2 }"
          >
            <!-- Contact Info -->
            <div class="rounded-2xl bg-white p-6 shadow-md">
              <h2 class="mb-6 flex items-center gap-2 text-2xl font-bold text-gray-900">
                <MessageCircle class="text-blue-600" :size="24" />
                Contact Info
              </h2>

              <div class="space-y-4">
                <!-- Email -->
                <div v-if="personalInfo.email" class="flex items-start gap-3">
                  <div class="mt-1 rounded-lg bg-blue-50 p-2">
                    <Mail class="text-blue-600" :size="18" />
                  </div>

                  <div>
                    <p class="text-sm font-medium text-gray-500">Email</p>

                    <a
                      :href="`mailto:${personalInfo.email}`"
                      class="text-gray-900 transition-colors hover:text-blue-600"
                    >
                      {{ personalInfo.email }}
                    </a>
                  </div>
                </div>

                <!-- Location -->
                <div class="flex items-start gap-3">
                  <div class="mt-1 rounded-lg bg-blue-50 p-2">
                    <MapPin class="text-blue-600" :size="18" />
                  </div>

                  <div>
                    <p class="text-sm font-medium text-gray-500">Location</p>

                    <p class="text-gray-900">Hue / VietNam</p>
                  </div>
                </div>

                <!-- Response -->
                <div class="flex items-start gap-3">
                  <div class="mt-1 rounded-lg bg-blue-50 p-2">
                    <Clock class="text-blue-600" :size="18" />
                  </div>

                  <div>
                    <p class="text-sm font-medium text-gray-500">Response Time</p>

                    <p class="text-gray-900">Usually within 2 - 3 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- Why Contact -->
            <div class="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-6 shadow-md">
              <h3 class="mb-3 text-lg font-bold text-gray-900">Let's Collaborate</h3>

              <p class="mb-4 text-sm leading-relaxed text-gray-600">
                I'm always interested in hearing about:
              </p>

              <ul class="space-y-2 text-sm text-gray-700">
                <li class="flex items-center gap-2">
                  <span class="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  Freelance opportunities
                </li>

                <li class="flex items-center gap-2">
                  <span class="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  Collaboration on projects
                </li>

                <li class="flex items-center gap-2">
                  <span class="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  Technical discussions
                </li>

                <li class="flex items-center gap-2">
                  <span class="h-1.5 w-1.5 rounded-full bg-blue-600" />
                  Job opportunities
                </li>
              </ul>
            </div>

            <!-- Social -->
            <div class="rounded-2xl bg-white p-6 shadow-md">
              <SocialLinks />
            </div>
          </Motion>

          <!-- Right -->
          <Motion
            class="lg:col-span-2"
            :initial="{ opacity: 0, x: 20 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.6, delay: 0.4 }"
          >
            <div class="rounded-2xl bg-white p-8 shadow-md md:p-10">
              <h2 class="mb-6 text-2xl font-bold text-gray-900">Send a Message</h2>

              <ContactForm />
            </div>
          </Motion>
        </div>
      </div>
    </div>
  </PageTransition>
</template>
