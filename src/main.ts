import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import { createBootstrap } from "bootstrap-vue-next";
import VueApexCharts from "vue3-apexcharts";
import { QuillEditor } from "@vueup/vue-quill";
import Vue3Prism from "vue3-prism/lib/Vue3Prism.common.js";
import { VueQueryPlugin, QueryClient } from "@tanstack/vue-query";

// Importación de estilos (orden alfabético recomendado)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "flatpickr/dist/flatpickr.css";
import "swiper/css";
import "swiper/css/bundle";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import "vue3-prism/lib/Vue3Prism.css";
import "./assets/custom.scss";

// Configuración de Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

// Configuración de Vue Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      retry: false, // Opcional: desactiva reintentos automáticos
      refetchOnWindowFocus: false, // Opcional: evita recarga al cambiar de pestaña
    }
  }
});

// Creación de la aplicación
const app = createApp(App);

// Registro de plugins (orden recomendado: core primero, luego extras)
app.use(pinia);
app.use(router);
app.use(createBootstrap());
app.use(VueQueryPlugin, { queryClient }); // Forma recomendada de instalar Vue Query
app.use(VueApexCharts);
app.use(Vue3Prism);

// Componentes globales
app.component("QuillEditor", QuillEditor);

// Montaje de la aplicación
app.mount("#app");