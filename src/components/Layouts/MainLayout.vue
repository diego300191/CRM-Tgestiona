<template>
    <div class="app-layout">
      <MainHeader />
      <MainSidebar />
      <div class="main-content d-flex flex-column transition overflow-hidden">
        <router-view />
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import MainHeader from "@/components/Layouts/MainHeader.vue";
  import MainSidebar from "@/components/Layouts/MainSidebar.vue";
  
  export default defineComponent({
    name: "MainLayout",
    components: {
      MainHeader,
      MainSidebar
    }
  });
  </script>