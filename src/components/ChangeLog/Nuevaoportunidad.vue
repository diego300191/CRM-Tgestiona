<template>
    <BreadCrumb PageTitle="Registro de Oportunidades" />
    <AddNuevaOportunidad />
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  import BreadCrumb from "../components/Common/BreadCrumb.vue";
  import AddNuevaOportunidad from "../ChangeLog/AddNuevaOportunidad.vue";
  
  export default defineComponent({
    name: "NuevaOportunidadPage",
    components: {
      BreadCrumb,
      AddNuevaOportunidad,
    },
  });
  </script>