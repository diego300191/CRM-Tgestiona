<script lang="ts" setup>
import BreadCrumb from "@/components/Common/BreadCrumb.vue";
import { useRouter, useRoute } from "vue-router";
const router = useRouter();

const UpdateOportunidades = (val) => {
  router.push({
    name: "Oportunidad-updateOportunidad",
    params: { id: val },
  });
};
</script>

<template>
  <BreadCrumb PageTitle="Agregar de Oportunidades" />

  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <div
        class="d-flex justify-content-between align-items-center mb-15 mb-lg-20"
      >
        <h5 class="card-title fw-bold mb-0">Pendiente</h5>
        <button
          class="default-btn transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16"
          type="button"
          @click="UpdateOportunidades(1)"
        >
          GUARDAR
          <i class="flaticon-plus position-relative ms-5 fs-12"></i>
        </button>
      </div>

      <form class="row g-3 needs-validation" novalidate>
        <div class="row g-3">
          <div class="col-md-4">
            <label for="validationCustomUsername" class="form-label fw-medium"
              >BUSCAR CLIENTE</label
            >
            <div class="input-group has-validation">
              <input
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                id="validationCustomUsername"
                aria-describedby="inputGroupPrepend"
                required
              />
              <span class="input-group-text" id="inputGroupPrepend">
                <i
                  class="flaticon-search-interface-symbol position-relative"
                ></i>
              </span>
            </div>
          </div>

          <div class="col-md-4">
            <label for="validationCustomUnit" class="form-label fw-medium"
              >FUENTE / ORIGEN</label
            >
            <select
              class="form-select shadow-none fs-md-15 text-black"
              id="validationCustomUnit"
              required
            >
              <option selected disabled value="">Seleccionar...</option>
              <option>Opción 1</option>
              <option>Opción 2</option>
            </select>
            <div class="invalid-feedback">
              Por favor selecciona una unidad válida.
            </div>
          </div>

          <div class="col-md-4">
            <label for="validationCustomPerson" class="form-label fw-medium"
              >PROSPECCIÓN</label
            >
            <select
              class="form-select shadow-none fs-md-15 text-black"
              id="validationCustomPerson"
              required
            >
              <option selected disabled value="">Seleccionar...</option>
              <option>Opción 1</option>
              <option>Opción 2</option>
            </select>
            <div class="invalid-feedback">
              Por favor selecciona una persona válida.
            </div>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-md-4">
            <label for="validationCustomFront" class="form-label fw-medium"
              >MEDIO</label
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

          <div class="col-md-4">
            <label for="validationCustomBack" class="form-label fw-medium"
              >UNIDAD</label
            >
            <select
              class="form-select shadow-none fs-md-15 text-black"
              id="validationCustomBack"
              required
            >
              <option selected disabled value="">Seleccionar...</option>
              <option>Opción 1</option>
              <option>Opción 2</option>
            </select>
            <div class="invalid-feedback">
              Por favor selecciona un back válido.
            </div>
          </div>

          <div class="col-md-4">
            <label for="validationCustomAnother" class="form-label fw-medium"
              >BACK</label
            >
            <select
              class="form-select shadow-none fs-md-15 text-black"
              id="validationCustomAnother"
              required
            >
              <option selected disabled value="">Seleccionar...</option>
              <option>Opción 1</option>
              <option>Opción 2</option>
            </select>
            <div class="invalid-feedback">
              Por favor selecciona una opción válida.
            </div>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-md-4">
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

          <div class="col-md-4">
            <label for="validationCustomBack" class="form-label fw-medium"
              >PERSONA ENCARGADA</label
            >
            <select
              class="form-select shadow-none fs-md-15 text-black"
              id="validationCustomBack"
              required
            >
              <option selected disabled value="">Seleccionar...</option>
              <option>Opción 1</option>
              <option>Opción 2</option>
            </select>
            <div class="invalid-feedback">
              Por favor selecciona un back válido.
            </div>
          </div>

          <div class="col-md-4">
            <label for="validationCustomAnother" class="form-label fw-medium"
              >SOLUCIÓN FM</label
            >
            <select
              class="form-select shadow-none fs-md-15 text-black"
              id="validationCustomAnother"
              required
            >
              <option selected disabled value="">Seleccionar...</option>
              <option>Opción 1</option>
              <option>Opción 2</option>
            </select>
            <div class="invalid-feedback">
              Por favor selecciona una opción válida.
            </div>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-md-4">
            <label for="validationCustomFront" class="form-label fw-medium"
              >SUBTIPO SOLUCIÓN FM</label
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
          <div class="col-md-4">
            <label for="buscarCliente" class="form-label fw-medium"
              >IMPORTE</label
            >
            <div class="input-group">
              <input
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                id="buscarCliente"
              />
            </div>
          </div>
          <div class="col-md-4">
            <label for="buscarCliente" class="form-label fw-medium"
              >MARGEN %</label
            >
            <div class="input-group">
              <input
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                id="buscarCliente"
              />
            </div>
          </div>
        </div>
        <div class="row g-3">
          <div class="col-md-4">
            <div class="mb-15 mb-md-20">
              <label
                for="basicFormControlTextarea1"
                class="form-label fw-medium text-black"
              >
                DETALLE
              </label>
              <textarea
                class="form-control shadow-none fs-md-15 text-black"
                id="basicFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
          </div>

          <div class="col-md-4">
            <div class="mb-15 mb-md-20">
              <label
                for="basicFormControlTextarea1"
                class="form-label fw-medium text-black"
              >
                SERVICIO
              </label>
              <textarea
                class="form-control shadow-none fs-md-15 text-black"
                id="basicFormControlTextarea1"
                rows="3"
              ></textarea>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>