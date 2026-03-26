import { createWebHashHistory, createRouter } from 'vue-router'

import Home from '@/components/Pages/Home.vue'
import Registration from '@/components/Pages/RegistrPages/Registration.vue'
import Login from '@/components/Pages/RegistrPages/Login.vue'
import Tasks from '@/components/Pages/TasksPages/Tasks.vue'
import TasksCompleted from '@/components/Pages/TasksPages/TasksCompleted.vue'
import TasksInProgress from '@/components/Pages/TasksPages/TasksInProgress.vue'
import Profile from '@/components/Pages/ProfilePages/Profile.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/registration', component: Registration },
  { path: '/login', component: Login },
  { path: '/tasks', component: Tasks },
  { path: '/completed/tasks', component: TasksCompleted },
  { path: '/in/progress/tasks', component: TasksInProgress },
  { path: '/profile', component: Profile },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})