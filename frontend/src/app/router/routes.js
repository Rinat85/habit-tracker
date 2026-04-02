const routes = [
  // --- Auth Layout (public) ---
  {
    path: '/',
    component: () => import('@/app/layouts/AuthLayout.vue'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/pages/home/HomePage.vue'),
      },
      {
        path: 'login',
        name: 'login',
        component: () => import('@/pages/auth/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import('@/pages/auth/RegisterPage.vue'),
      },
    ],
  },

  // --- Main Layout (authenticated) ---
  {
    path: '/',
    component: () => import('@/app/layouts/MainLayout.vue'),
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('@/pages/profile/ProfilePage.vue'),
      },
      {
        path: 'tasks',
        name: 'tasks',
        component: () => import('@/pages/tasks/AllTasksPage.vue'),
      },
      {
        path: 'tasks/completed',
        name: 'tasks-completed',
        component: () => import('@/pages/tasks/FilteredTasksPage.vue'),
        props: { filter: 'completed' },
      },
      {
        path: 'tasks/in-progress',
        name: 'tasks-in-progress',
        component: () => import('@/pages/tasks/FilteredTasksPage.vue'),
        props: { filter: 'in-progress' },
      },
      {
        path: 'tasks/uncompleted',
        name: 'tasks-uncompleted',
        component: () => import('@/pages/tasks/FilteredTasksPage.vue'),
        props: { filter: 'uncompleted' },
      },
      {
        path: 'calendar',
        name: 'calendar',
        component: () => import('@/pages/calendar/CalendarPage.vue'),
      },
    ],
  },
];

export default routes;
