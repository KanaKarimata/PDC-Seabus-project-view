import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Top from '../views/Top.vue'
import Form from '../views/TimeSchedule/CreateForm.vue'
import TimeScheduleManagement from '../views/TimeSchedule/management.vue'

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
  },
  {
    path: '/create-form',
    name: 'CreateForm',
    component: Form
  },
  {
    path: '/operation-rule/:id/time-schedule-management',
    name: 'TimeScheduleManagement',
    component: TimeScheduleManagement
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
