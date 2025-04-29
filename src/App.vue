<template>
  <router-view />
</template>

<script lang="ts">
import { defineComponent, watchEffect } from "vue";
import stateStore from "./utils/store";

export default defineComponent({
  name: "App",
  mounted() {
    document.body.classList.add("bg-body-secondary");
  },
  setup() {
    const stateStoreInstance = stateStore;
    watchEffect(() => {
      if (stateStoreInstance.open) {
        document.body.classList.remove("sidebar-show");
        document.body.classList.add("sidebar-hide");
      } else {
        document.body.classList.remove("sidebar-hide");
        document.body.classList.add("sidebar-show");
      }
    });
    return {};
  },
});
</script>
