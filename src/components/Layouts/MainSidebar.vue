<template>
  <div
    :class="[
      'sidebar-area position-fixed start-0 top-0 bg-black h-100vh transition',
      { active: stateStoreInstance.open },
    ]"
    id="sidebar-area"
  >
    <div class="logo position-absolute start-0 end-0 top-0 bg-black">
      <router-link
        to="/"
        class="d-flex align-items-center text-white text-decoration-none"
      >
        <img src="../../assets/images/tgestiona_blanco.png" alt="logo-icon" />
        
      </router-link>
      <div class="border-bottom"></div>
      <button
        class="sidebar-burger-menu position-absolute lh-1 bg-transparent p-0 border-0"
        @click="stateStoreInstance.onChange"
      >
        <i class="ph-duotone ph-caret-double-right" style="color: white;"></i>
      </button>
    </div>
    <div class="sidebar-menu" >
      <ul
        class="sidebar-navbar-nav ps-0 mb-0 list-unstyled accordion"
        id="sidebarNavAccordion"
      >
      
        <li class="sub-title sidebar-nav-item">
          <span class="d-block text-uppercase fw-medium">Módulos</span>
        </li>
        <li class="sidebar-nav-item">
          <router-link to="/cliente/ClienteComponent" class="sidebar-nav-link d-block">
            <i class="flaticon-user-1"></i>
            <span class="title">Registro Cliente</span>
          </router-link>
        </li>
        <li class="sidebar-nav-item">
          <router-link to="/Oportunidad/OportunidadComponent" class="sidebar-nav-link d-block">
            <i class="flaticon-support"></i>
            <span class="title">Seguimiento de Oportunidad</span>
          </router-link>
        </li>

      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import stateStore from "../../utils/store";

export default defineComponent({
  name: "MainSidebar",
  setup() {
    const stateStoreInstance = stateStore;
    return {
      stateStoreInstance,
    };
  },
});
</script>
