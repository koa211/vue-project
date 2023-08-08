import { createRouter, createWebHistory } from 'vue-router'
import Day1View from '../views/Day1View.vue'
import Day2View from '../views/Day2View.vue'
import Login from '../views/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'day-1',
      component: Day1View
    },
    {
      path: '/day-1',
      name: 'day-1',
      component: Day1View
    },
    {
      path: '/day-2',
      name: 'day-2',
      component: Day2View
    },
  ]
})

export default router
