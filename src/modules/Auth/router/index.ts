import { RouteRecordRaw } from 'vue-router';

const clienteRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    redirect: '/Auth/login',
    children: [
      // Ruta Clases y Modelos
      {
        path: 'AuthComponent',
        name: 'auth-LoginPage',
        component: () => import('@/modules/Auth/pages/LoginPage.vue'),
      },
    ],
  },
];

export default clienteRoutes;

