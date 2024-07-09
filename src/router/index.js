import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Top from '../views/Top.vue'
import Form from '../views/TimeSchedule/Form.vue'
import TimeScheduleIndex from '../views/TimeSchedule/index.vue'
import Confirm from '../views/TimeSchedule/Confirm.vue'

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
    path: '/form/:id/:type',
    name: 'Form',
    component: Form
  },
  {
    path: '/operation-rule/:id/',
    name: 'TimeScheduleIndex',
    component: TimeScheduleIndex
  },
  {
    path: '/confirm/:id',
    name: 'Confirm',
    component: Confirm
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
