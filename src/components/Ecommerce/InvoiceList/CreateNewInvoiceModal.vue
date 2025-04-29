<template>
  <div
    :class="['modal fade createNewModal', { show: stateStoreInstance.invoice }]"
    id="createNewInvoiceModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">Create New Invoice</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <form>
            <div class="row">
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Name
                  </label>
                  <input
                    type="text"
                    class="form-control shadow-none rounded-0 text-black"
                    placeholder="e.g. Johny Vino"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Email
                  </label>
                  <input
                    type="email"
                    class="form-control shadow-none rounded-0 text-black"
                    placeholder="e.g. johny12345@gmail.com"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Total
                  </label>
                  <input
                    type="text"
                    class="form-control shadow-none rounded-0 text-black"
                    placeholder="e.g. $ 100.00"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Issued Date
                  </label>
                  <input
                    type="date"
                    class="form-control shadow-none rounded-0 text-black"
                  />
                </div>
              </div>
            </div>
            <button
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16"
              type="submit"
            >
              Add Invoice
            </button>
          </form>
        </div>
        <button
          type="button"
          class="btn-close shadow-none"
          @click="stateStoreInstance.createNewInvoiceModal"
        ></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import stateStore from "../../../utils/store";

export default {
  name: "CreateNewInvoiceModal",
  setup() {
    const stateStoreInstance = stateStore;

    return {
      stateStoreInstance,
    };
  },
};
</script>
