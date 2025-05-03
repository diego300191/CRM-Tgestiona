import { createWebHistory, createRouter, RouteRecordRaw } from "vue-router";

import FileManagerPage from "../pages/FileManagerPage.vue";
import ChangelogPage from "../pages/ChangelogPage.vue";
import LoginPage from "@/modules/Auth/pages/LoginPage.vue";
import ErrorPage from "../pages/ErrorPage.vue";
import BlankPage from "../pages/BlankPage.vue";
import LogoutPage from "../pages/LogoutPage.vue";
import clienteRoutes from "@/modules/Clientes/router";
import oportunidadRoutes from "@/modules/Oportunidades/router";
import MainLayout from "@/components/Layouts/MainLayout.vue"; 


const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    name: "LoginPage",
    component: LoginPage,
    meta: { requiresAuth: false, hideLayout: true } 
  },
  {
    path: "/",
    component: MainLayout, 
    meta: { requiresAuth: true }, 
    children: [
      {
        path: "/changelog",
        name: "ChangelogPage",
        component: ChangelogPage
      },
      {
        path: "/file-manager",
        name: "FileManagerPage",
        component: FileManagerPage
      },
      ...clienteRoutes, // Rutas de cliente anidadas
      ...oportunidadRoutes,
      {
        path: "/blank-page",
        name: "BlankPage",
        component: BlankPage
      },
      {
        path: "/logout",
        name: "LogoutPage",
        component: LogoutPage
      }
    ]
  },
  { 
    path: "/:pathMatch(.*)*", 
    name: "ErrorPage", 
    component: ErrorPage,
    meta: { hideLayout: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  linkExactActiveClass: "active",
  routes,
  scrollBehavior() {
    return { top: 0, behavior: "smooth" };
  }
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = /* lógica de autenticación */ true;
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;