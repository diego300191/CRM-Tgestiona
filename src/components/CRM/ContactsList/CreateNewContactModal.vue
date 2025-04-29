<template>
  <div
    :class="['modal fade createNewModal', { show: stateStoreInstance.show }]"
    id="createNewCustomerModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">Add New Contact</h5>
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
                    Display Name
                  </label>
                  <input
                    type="text"
                    class="form-control shadow-none rounded-0 text-black"
                    placeholder="e.g. Johny"
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
                    Phone No
                  </label>
                  <input
                    type="text"
                    class="form-control shadow-none rounded-0 text-black"
                    placeholder="e.g. +000 4356 654"
                  />
                </div>
              </div>
              <div class="col-lg-12 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Country
                  </label>
                  <select class="form-select shadow-none fw-semibold rounded-0">
                    <option selected>Australia</option>
                    <option value="1">Canada</option>
                    <option value="2">Japan</option>
                    <option value="3">Spain</option>
                  </select>
                </div>
              </div>
              <div class="col-lg-12 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Shipping Address
                  </label>
                  <input
                    type="text"
                    class="form-control shadow-none rounded-0 text-black"
                    placeholder="e.g. 32 New Castle,UK-12765"
                  />
                </div>
              </div>
              <div class="col-lg-12 col-md-12">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    Billing Address
                  </label>
                  <input
                    type="text"
                    class="form-control shadow-none rounded-0 text-black"
                    placeholder="e.g. 32 New Castle,UK-12765"
                  />
                </div>
              </div>
              <div class="col-lg-12 col-md-12">
                <label class="d-block text-black fw-semibold mb-10">
                  Communication
                </label>
                <div
                  class="form-check fs-md-15 fs-lg-16 text-black mb-0 d-inline-block me-15 me-md-25"
                >
                  <input
                    class="form-check-input shadow-none"
                    type="radio"
                    name="communicationRadio"
                    id="emailRadio"
                    checked
                  />
                  <label class="form-check-label" for="emailRadio">
                    Email
                  </label>
                </div>
                <div
                  class="form-check fs-md-15 fs-lg-16 text-black mb-0 d-inline-block me-15 me-md-25"
                >
                  <input
                    class="form-check-input shadow-none"
                    type="radio"
                    name="communicationRadio"
                    id="smsRadio"
                  />
                  <label class="form-check-label" for="smsRadio"> SMS </label>
                </div>
                <div
                  class="form-check fs-md-15 fs-lg-16 text-black mb-0 d-inline-block me-15 me-md-25"
                >
                  <input
                    class="form-check-input shadow-none"
                    type="radio"
                    name="communicationRadio"
                    id="phoneRadio"
                  />
                  <label class="form-check-label" for="phoneRadio">
                    Phone
                  </label>
                </div>
              </div>
            </div>
            <button
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 mt-15 mt-md-25"
              type="submit"
            >
              Add Customer
            </button>
          </form>
        </div>
        <button
          type="button"
          class="btn-close shadow-none"
          @click="stateStoreInstance.createNewModal"
        ></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import stateStore from "../../../utils/store";

export default defineComponent({
  name: "CreateNewContactModal",
  setup() {
    const stateStoreInstance = stateStore;

    return {
      stateStoreInstance,
    };
  },
});
</script>
