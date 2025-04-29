<template>
  <div
    id="videoModal"
    :class="['modal fade videoModal', { show: stateStoreInstance.video }]"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-body p-15 p-sm-20 p-md-25 p-lg-30">
          <iframe
            src="https://www.youtube.com/embed/r7vdoYwiGIc"
            title="How to Create Metal Textures in Photoshop"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
        <button
          type="button"
          class="btn-close bg-transparent text-white shadow-none"
          @click="stateStoreInstance.videoModal"
        >
          <i class="flaticon-close"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import stateStore from "../../../utils/store";

export default {
  name: "VideoModal",
  setup() {
    const stateStoreInstance = stateStore;

    return {
      stateStoreInstance,
    };
  },
};
</script>
