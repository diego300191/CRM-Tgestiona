import { RouteRecordRaw } from 'vue-router';

const clienteRoutes: RouteRecordRaw[] = [
  {
    path: '/Cliente',
    redirect: '/cliente/ClienteComponent',
    children: [
      // Ruta Clases y Modelos
      {
        path: 'ClienteComponent',
        name: 'cliente-ClienteComponent',
        component: () => import('@/modules/Clientes/pages/ClienteComponent.vue'),
      },
      {
        path: 'listCliente',
        name: 'cliente-listCliente',
        component: () => import('@/modules/Clientes/pages/BandejaClientes.vue'),
      },
      {
        path: 'addCliente',
        name: 'cliente-addCliente',
        component: () => import('@/modules/Clientes/pages/AddClienteModal.vue'),
      },
      {
        path: 'updateCliente/:id',
        name: 'cliente-updateCliente',
        component: () => import('@/modules/Clientes/pages/UpdateClienteModal.vue'),
        props: true
      },
      
    ],
  },
];

export default clienteRoutes;

