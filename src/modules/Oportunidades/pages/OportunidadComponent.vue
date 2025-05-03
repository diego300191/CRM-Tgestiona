<template>
    <BreadCrumb PageTitle="Bandeja de Oportunidades" />
    <BandejaOportunidad />
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  import BreadCrumb from "@/components/Common/BreadCrumb.vue"
  import BandejaOportunidad from "./BandejaOportunidad.vue"
  
  export default defineComponent({
    name: "ClienteComponent",
    components: {
      BreadCrumb,
      BandejaOportunidad,
    },
  });
  </script>