<template>
  <div
    :class="['modal fade createNewModal', { show: stateStoreInstance.filter }]"
    id="filterContactModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">Filter</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <form>
            <div class="form-group mb-15 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10"
                >Join Date</label
              >
              <select class="form-select shadow-none fw-semibold rounded-0">
                <option selected>Today</option>
                <option value="1">Last Week</option>
                <option value="2">Last Month</option>
                <option value="3">Last Year</option>
              </select>
            </div>
            <div class="form-group mb-15 mb-md-25">
              <label class="d-block text-black fw-semibold mb-10"
                >Designation</label
              >
              <select class="form-select shadow-none fw-semibold rounded-0">
                <option selected>Chief Executive Officer</option>
                <option value="1">Director</option>
                <option value="2">Chief Financial Officer</option>
                <option value="3">Web Developer</option>
              </select>
            </div>
            <div class="d-flex align-items-center justify-content-between">
              <button
                class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 bg-danger"
                type="submit"
              >
                Reset
              </button>
              <button
                class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
                type="submit"
              >
                Done
              </button>
            </div>
          </form>
        </div>
        <button
          type="button"
          class="btn-close shadow-none"
          @click="stateStoreInstance.filterContactModal"
        ></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import stateStore from "../../../utils/store";

export default {
  name: "FilterLeadModal",
  setup() {
    const stateStoreInstance = stateStore;

    return {
      stateStoreInstance,
    };
  },
};
</script>
