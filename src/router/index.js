import { createRouter, createWebHistory } from "vue-router";
import AppLanding from "@/pages/AppLanding.vue";
import Login from "@/pages/Auth/Login.vue";
import Signup from "@/pages/Auth/Signup.vue";
import Dashboard from "@/pages/Dashboard.vue";
import TicketsPage from "@/pages/Tickets/TicketsPage.vue";
import { isAuthenticated } from "@/utils/auth";

const routes = [
  { path: "/", component: AppLanding },
  { path: "/auth/login", component: Login },
  { path: "/auth/signup", component: Signup },
  {
    path: "/dashboard",
    component: Dashboard,
    meta: { requiresAuth: true },
  },
  {
    path: "/tickets",
    component: TicketsPage,
    meta: { requiresAuth: true },
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// ✅ Navigation guard (like <Protected> in React)
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    next("/auth/login");
  } else {
    next();
  }
});

export default router;
