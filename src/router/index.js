import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/RegisterView.vue";
import DashboardView from "../views/DashboardView.vue";
import NotFoundView from "../views/NotFound.vue";
import LoginView from "../views/LoginView.vue";

import Tools from "../components/Tools.vue";
import SuccessStories from "../components/SuccessStories.vue";

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/register", name: "register", component: RegisterView },
  { path: "/login", name: "login", component: LoginView },

  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    meta: { requiresAuth: true },
  },

  { path: "/tools", name: "tools", component: Tools },
  { path: "/success-stories", name: "successStories", component: SuccessStories },

  {
    path: "/tools/auto-send",
    name: "autoSend",
    component: () => import("../views/tools/AutoSend.vue"),
    meta: { requiresAuth: true }, // اگر می‌خوای اینم فقط با لاگین باشه
  },

  { path: "/:pathMatch(.*)*", name: "notFound", component: NotFoundView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 };
  },
});

router.beforeEach((to) => {
  const token = localStorage.getItem("auth_token");
  const requiresAuth = to.matched.some((r) => r.meta?.requiresAuth);

  if (requiresAuth && !token) {
    return { name: "login", query: { redirect: to.fullPath } };
  }
});

export default router;
