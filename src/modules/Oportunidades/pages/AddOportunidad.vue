<script lang="ts" setup>
import BreadCrumb from "@/components/Common/BreadCrumb.vue";
import ModalBuscarCliente from "@/modules/Oportunidades/pages/ModalBuscarCliente.vue";
import ComboDinamico from "@/components/Personalizados/ComboDinamico.vue";
import useOportunidad from "@/modules/Oportunidades/composables/useOportunidad";
import stateStore from "@/utils/store";
import useCliente from "@/modules/Clientes/composables/useCliente";
import { computed, onMounted, watch } from "vue";

const { nombrecliente, selectedClientId } = useCliente();

const stateStoreInstance = stateStore;

const {
  IdMaestraFUENTEORIGEN,
  IdMaestraPROSPECCION,
  IdMaestraMEDIO,
  IdMaestraUNIDAD,
  IdMaestraBACK,
  IdMaestraPERSONAENCARGADA,
  IdMaestraSOLUCIONFM,
  IdMaestraSUBTIPOSOLUCIONFM,
  nombreMaestraFUENTEORIGEN,
  nombreMaestraPROSPECCION,
  nombreMaestraMEDIO,
  nombreMaestraUNIDAD,
  nombreMaestraBACK,
  nombreMaestraPERSONAENCARGADA,
  nombreMaestraSOLUCIONFM,
  nombreMaestraSUBTIPOSOLUCIONFM,
  selectFUENTEORIGEN,
  selectPROSPECCION,
  selectMEDIO,
  selectUNIDAD,
  selectBACK,
  selectPERSONAENCARGADA,
  selectSOLUCIONFM,
  selectSUBTIPOSOLUCIONFM,
  placeholder,
  importe,
  margen,
  detalle,
  servicio,
  opcionesSubTipo,
  addOportinidad,
} = useOportunidad();

onMounted(() => {
  nombrecliente.value = "";
  selectedClientId.value = 0;
});

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
          @click="addOportinidad(0,1)"
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
                v-model="nombrecliente"
                :disabled="true"
              />
              <span class="input-group-text" id="inputGroupPrepend">
                <i
                  class="flaticon-search-interface-symbol position-relative"
                  @click="stateStoreInstance.createNewModal"
                ></i>
              </span>
            </div>
          </div>

          <div class="col-md-4">
            <ComboDinamico
              :idMaestra="IdMaestraFUENTEORIGEN"
              :nombreMaestra="nombreMaestraFUENTEORIGEN"
              v-model:seleccionado="selectFUENTEORIGEN"
              :disabled="false"
              :placeholder="placeholder"
              :required="true"
            >
            </ComboDinamico>
          </div>

          <div class="col-md-4">
            <ComboDinamico
              :idMaestra="IdMaestraPROSPECCION"
              :nombreMaestra="nombreMaestraPROSPECCION"
              v-model:seleccionado="selectPROSPECCION"
              :disabled="false"
              :placeholder="placeholder"
              :required="true"
            >
            </ComboDinamico>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-md-4">
            <ComboDinamico
              :idMaestra="IdMaestraMEDIO"
              :nombreMaestra="nombreMaestraMEDIO"
              v-model:seleccionado="selectMEDIO"
              :disabled="false"
              :placeholder="placeholder"
              :required="true"
            >
            </ComboDinamico>
          </div>

          <div class="col-md-4">
            <ComboDinamico
              :idMaestra="IdMaestraUNIDAD"
              :nombreMaestra="nombreMaestraUNIDAD"
              v-model:seleccionado="selectUNIDAD"
              :disabled="false"
              :placeholder="placeholder"
              :required="true"
            >
            </ComboDinamico>
          </div>

          <div class="col-md-4">
            <ComboDinamico
              :idMaestra="IdMaestraBACK"
              :nombreMaestra="nombreMaestraBACK"
              v-model:seleccionado="selectBACK"
              :disabled="false"
              :placeholder="placeholder"
              :required="true"
            >
            </ComboDinamico>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-md-4">
            <ComboDinamico
              :idMaestra="IdMaestraPERSONAENCARGADA"
              :nombreMaestra="nombreMaestraPERSONAENCARGADA"
              v-model:seleccionado="selectPERSONAENCARGADA"
              :disabled="false"
              :placeholder="placeholder"
              :required="true"
            >
            </ComboDinamico>
          </div>

          <div class="col-md-4">
            <ComboDinamico
              :idMaestra="IdMaestraSOLUCIONFM"
              :nombreMaestra="nombreMaestraSOLUCIONFM"
              v-model:seleccionado="selectSOLUCIONFM"
              :disabled="false"
              :placeholder="placeholder"
              :required="true"
              :tieneIdPadre="'SI'"
            />
          </div>
          <div class="col-md-4">
            <div class="mb-3">
              <label
                :for="`select-maestra-${IdMaestraSUBTIPOSOLUCIONFM}`"
                class="form-label fw-medium"
              >
                {{ nombreMaestraSUBTIPOSOLUCIONFM }}
                <span v-if="true" class="text-danger">*</span>
              </label>

              <select
                :id="`select-maestra-${IdMaestraSUBTIPOSOLUCIONFM}`"
                class="form-select shadow-none fs-md-15"
                :class="{
                  'text-muted': selectSUBTIPOSOLUCIONFM === 0,
                }"
                v-model="selectSUBTIPOSOLUCIONFM"
                :disabled="false"
                :required="true"
              >
                <option :value="0" disabled class="text-muted">
                  {{
                    selectSOLUCIONFM
                      ? placeholder
                      : "Seleccione una solución primero"
                  }}
                </option>

                <option
                  v-for="opcion in opcionesSubTipo"
                  :key="`option-${opcion.id}`"
                  :value="opcion.id"
                >
                  {{ opcion.nombre }}
                </option>
              </select>

              <div class="invalid-feedback">
                Por favor selecciona una opción válida.
              </div>
            </div>
          </div>
        </div>

        <div class="row g-3">
          <div class="col-md-4">
            <label for="buscarCliente" class="form-label fw-medium"
              >IMPORTE</label
            >
            <div class="input-group">
              <input
                type="text"
                class="form-control shadow-none fs-md-15 text-black"
                id="buscarCliente"
                v-model="importe"
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
                v-model="margen"
              />
            </div>
          </div>
          <div class="col-md-4">
            <div>
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
                v-model="detalle"
              ></textarea>
            </div>
          </div>
        </div>
        <div class="row g-3">
          <div class="col-md-4">
            <div>
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
                v-model="servicio"
              ></textarea>
            </div>
          </div>
        </div>
      </form>
      <ModalBuscarCliente />
    </div>
  </div>
</template>