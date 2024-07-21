import { createRouter, createWebHistory } from 'vue-router'
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
    path: '/operation-rule/:operation_rule_id/form/:type',
    name: 'Form',
    component: Form
  },
  {
    path: '/operation-rule/:operation_rule_id/form/:time_schedule_id/:type',
    name: 'UpdateForm',
    component: Form
  },
  {
    path: '/operation-rule/:operation_rule_id/',
    name: 'TimeScheduleIndex',
    component: TimeScheduleIndex
  },
  {
    path: '/operation-rule/:operation_rule_id/confirm/:time_schedule_id',
    name: 'Confirm',
    component: Confirm
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
