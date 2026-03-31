import { createWebHistory, createRouter } from 'vue-router'

import Home from '@/Pages/Home.vue'
import Registration from '@/Pages/RegistrPages/Registration.vue'
import Login from '@/Pages/RegistrPages/Login.vue'
import Profile from '@/Pages/ProfilePages/Profile.vue'
import Tasks from '@/Pages/TasksPages/Tasks.vue'
import CompletedTasks from '@/Pages/TasksPages/CompletedTasks.vue'
import UnCompletedTasks from '@/Pages/TasksPages/UnCompletedTasks.vue'
import TasksInProgress from '@/Pages/TasksPages/TasksInProgress.vue'
import CalendarPage from '@/Pages/CalendarPages/CalendarPage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/registration', component: Registration },
  { path: '/login', component: Login },
  { path: '/profile', component: Profile },
  { path: '/tasks', component: Tasks },
  { path: '/completed/tasks', component: CompletedTasks },
  { path: '/in/progress/tasks', component: TasksInProgress },
  { path: '/un/completed/tasks', component: UnCompletedTasks },
  { path: '/calendar', component: CalendarPage },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})