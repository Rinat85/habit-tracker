import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/components/Pages/Home.vue'
import Registration from '@/components/Pages/RegistrPages/Registration.vue'
import Login from '@/components/Pages/RegistrPages/Login.vue'
import Tasks from '@/components/Pages/TasksPages/Tasks.vue'
import TasksCompleted from '@/components/Pages/TasksPages/TasksCompleted.vue'
import TasksInProgress from '@/components/Pages/TasksPages/TasksInProgress.vue'
import Profile from '@/components/Pages/ProfilePages/Profile.vue'
import TaskUnCompleted from '@/components/Pages/TasksPages/TaskUnCompleted.vue'
import CalendarPage from '@/components/Pages/CalendarPages/CalendarPage.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/registration', component: Registration },
  { path: '/login', component: Login },
  { path: '/profile', component: Profile },
  { path: '/tasks', component: Tasks },
  { path: '/completed/tasks', component: TasksCompleted },
  { path: '/in/progress/tasks', component: TasksInProgress },
  { path: '/un/completed/tasks', component: TaskUnCompleted },
  { path: '/calendar', component: CalendarPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})