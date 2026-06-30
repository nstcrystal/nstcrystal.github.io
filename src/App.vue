<script setup lang="ts">
import { RouterView } from 'vue-router';
// @ts-ignore
import AppHeader from './components/AppHeader.vue';
// @ts-ignore
import AppFooter from './components/AppFooter.vue';
</script>

<template>
    <div class="min-h-screen bg-background text-foreground">
        <AppHeader/>
      
        <main class="min-h-screen bg-background">
           <RouterView />
        </main>

        <AppFooter/>
    </div>
</template>

