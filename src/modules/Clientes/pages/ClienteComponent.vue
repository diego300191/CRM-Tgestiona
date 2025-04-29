<template>
    <BreadCrumb PageTitle="Bandeja de Clientes" />
    <BandejaClientes />
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  import BreadCrumb from "@/components/Common/BreadCrumb.vue"
  import BandejaClientes from "./BandejaClientes.vue"
  
  export default defineComponent({
    name: "ClienteComponent",
    components: {
      BreadCrumb,
      BandejaClientes,
    },
  });
  </script>