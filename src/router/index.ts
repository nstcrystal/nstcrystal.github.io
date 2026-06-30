import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/index.vue'
import About from '../pages/AboutPage.vue'
import Article from '../pages/Article.vue'
import Contact from '../pages/Contact.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/article',
      name: 'article',
      component: Article,
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
  ],
})

export default router
