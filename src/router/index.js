import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Top from '../views/Top.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/top',
    name: 'Top',
    component: Top
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
