<script lang="ts" setup>
import { ref } from "vue";
import stateStore from "@/utils/store";

const stateStoreInstance = stateStore;
</script>
<template>
  <div
    :class="['modal fade createNewModal', { show: stateStoreInstance.show }]"
    id="createNewCustomerModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">AGREGAR NUEVO CLIENTE</h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <form>
            <div class="row">
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    NOMBRES
                  </label>
                  <input
                    type="text"
                    class="form-control shadow-none rounded-0 text-black"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    EMPRESA
                  </label>
                  <input
                    type="text"
                    class="form-control shadow-none rounded-0 text-black"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    CARGOS
                  </label>
                  <input
                    type="text"
                    class="form-control shadow-none rounded-0 text-black"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    EMAIL
                  </label>
                  <input
                    type="email"
                    class="form-control shadow-none rounded-0 text-black"
                  />
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-group mb-15 mb-md-25">
                  <label class="d-block text-black fw-semibold mb-10">
                    TELEFONO
                  </label>
                  <input
                    type="text"
                    class="form-control shadow-none rounded-0 text-black"
                  />
                </div>
              </div>
              <div class="col-md-6">
                <label for="validationCustomFront" class="form-label fw-medium"
                  >SECTOR</label
                >
                <select
                  class="form-select shadow-none fs-md-15 text-black"
                  id="validationCustomFront"
                  required
                >
                  <option selected disabled value="">Seleccionar...</option>
                  <option>Opción 1</option>
                  <option>Opción 2</option>
                </select>
                <div class="invalid-feedback">
                  Por favor selecciona un front válido.
                </div>
              </div>
              <div class="col-md-6">
                <label for="validationCustomFront" class="form-label fw-medium"
                  >FRONT</label
                >
                <select
                  class="form-select shadow-none fs-md-15 text-black"
                  id="validationCustomFront"
                  required
                >
                  <option selected disabled value="">Seleccionar...</option>
                  <option>Opción 1</option>
                  <option>Opción 2</option>
                </select>
                <div class="invalid-feedback">
                  Por favor selecciona un front válido.
                </div>
              </div>
              <div class="col-lg-6 col-md-6">
                <div class="form-check">
                  <input
                    class="form-check-input shadow-none"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    checked
                  />

                  <label
                    class="form-check-label fw-medium"
                    for="flexRadioDefault1"
                    >CLIENTE ACTUAL</label
                  >
                </div>
                <div class="form-check">
                  <input
                    class="form-check-input shadow-none"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                  />
                  <label
                    class="form-check-label fw-medium"
                    for="flexRadioDefault2"
                  >
                    CLIENTE NUEVO
                  </label>
                </div>
              </div>
            </div>
            <button
              class="default-btn transition border-0 fw-medium text-white pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-35 pe-md-35 rounded-1 fs-md-15 fs-lg-16 mt-15 mt-md-25"
              type="submit"
            >
              GUARDAR
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
  
  
  