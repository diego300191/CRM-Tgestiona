<template>
  <div class="row">
    <div class="col-xxl-7 col-xxxl-6">
      <WhatHappening />

   
    </div>
   
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

import WhatHappening from "../../components/Dashboard/Ecommerce/WhatHappening.vue";


export default defineComponent({
  name: "EcommercePage",
  components: {
    WhatHappening,
    
  },
});
</script>