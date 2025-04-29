import { createApp } from "vue";
import { createPinia } from "pinia";
import piniapluginpersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import { createBootstrap } from "bootstrap-vue-next";
import VueApexCharts from "vue3-apexcharts";
import { QuillEditor } from "@vueup/vue-quill";
import Vue3Prism from "vue3-prism/lib/Vue3Prism.common.js";

import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue-next/dist/bootstrap-vue-next.css";
import "swiper/css";
import "swiper/css/bundle";
import "flatpickr/dist/flatpickr.css";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import "@vueup/vue-quill/dist/vue-quill.bubble.css";
import "vue3-prism/lib/Vue3Prism.css";

import "./assets/custom.scss";
const pinia = createPinia();
pinia.use(piniapluginpersistedstate);

const app = createApp(App).use(Vue3Prism).use(pinia).use(router);
app.use(VueApexCharts);
app.use(createBootstrap());
app.component("QuillEditor", QuillEditor);
app.mount("#app");
