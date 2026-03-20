import { createMemoryHistory, createRouter } from 'vue-router'

import Registration from '@/components/Pages/Registration.vue'
import Home from '@/components/Pages/Home.vue'
import SignIn from '@/components/Pages/SignIn.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/registration', component: Registration },
  { path: '/login', component: SignIn}
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})