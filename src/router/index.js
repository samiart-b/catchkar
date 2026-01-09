import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import NotFoundView from '../views/NotFound.vue'

// These are currently built as components, but they can also be used as full pages
import Tools from '../components/Tools.vue'
import SuccessStories from '../components/SuccessStories.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/register', name: 'register', component: RegisterView },
  { path: '/dashboard', name: 'dashboard', component: DashboardView },
  { path: '/tools', name: 'tools', component: Tools },
  { path: '/success-stories', name: 'successStories', component: SuccessStories },
  {
    path: '/tools/auto-send',
    name: 'autoSend',
    component: () => import('../views/tools/AutoSend.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: NotFoundView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

export default router
