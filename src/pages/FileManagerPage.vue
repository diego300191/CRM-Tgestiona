<template>
  <BreadCrumb PageTitle="Bandeja de Clientes" />
  <RecentFiles />
  <DocumentsFiles />
  <AssetsFiles />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import BreadCrumb from "../components/Common/BreadCrumb.vue";
import RecentFiles from "../components/FileManager/RecentFiles.vue";

export default defineComponent({
  name: "FileManagerPage",
  components: {
    BreadCrumb,
    RecentFiles,
  },
});
</script>