import { RouteRecordRaw } from 'vue-router';

const oportunidadRoutes: RouteRecordRaw[] = [
  {
    path: '/Oportunidad',
    redirect: '/Oportunidad/OportunidadComponent',
    children: [
      // Ruta Oportunidades
      {
        path: 'OportunidadComponent',
        name: 'Oportunidad-OportunidadComponent',
        component: () => import('@/modules/Oportunidades/pages/OportunidadComponent.vue'),
      },
      {
        path: 'listOportunidad',
        name: 'Oportunidad-listOportunidad',
        component: () => import('@/modules/Oportunidades/pages/BandejaOportunidad.vue'),
      },
      {
        path: 'addOportunidad',
        name: 'Oportunidad-addOportunidad',
        component: () => import('@/modules/Oportunidades/pages/AddOportunidad.vue'),
      },
      {
        path: 'updateOportunidad/:id',
        name: 'Oportunidad-updateOportunidad',
        component: () => import('@/modules/Oportunidades/pages/UpdateOportunidad.vue'),
        props: true
      },
      
    ],
  },
];

export default oportunidadRoutes;

