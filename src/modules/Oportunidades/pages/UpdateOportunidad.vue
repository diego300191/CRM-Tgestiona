<script lang="ts" setup>
import BreadCrumb from "@/components/Common/BreadCrumb.vue";
import { useRouter, useRoute } from "vue-router";
import ComboDinamico from "@/components/Personalizados/ComboDinamico.vue";
import useOportunidad from "@/modules/Oportunidades/composables/useOportunidad";
import { onMounted, ref, computed } from "vue";

const router = useRouter();

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
  disabled,
  IdEstadoOportunidad,
  NombreEstadoOportunidad,
  nombrecliente,
  ListOportunidades,
  getIdOportunidad,
} = useOportunidad();

const UpdateOportunidades = (val: number) => {
  console.log(val);
};

onMounted(async () => {
  await getIdOportunidad(
    parseInt(router.currentRoute.value.params.id.toString())
  );
});

const estadosOrdenados = [
  { id: 1, nombre: 'OPORTUNIDAD DETECTADA' }, 
  { id: 2, nombre: 'EN ELABORACIÓN DE PROPUESTA' },
  { id: 3, nombre: 'COTIZADO - PRESENTADO' },
  { id: 4, nombre: 'COTIZADO - EN NEGOCIACIÓN' },
  { id: 5, nombre: 'COTIZADO - ADJUDICADO' },
  { id: 6, nombre: 'COTIZADO - NO ADJUDICADO' },
  { id: 7, nombre: 'NO PRESENTADO' },
  { id: 8, nombre: 'SUSPENDIDO' },
  { id: 9, nombre: 'DESESTIMADO' }
];

// Estado siguiente (botón principal)
const estadoSiguiente = computed(() => {
  const indexActual = estadosOrdenados.findIndex(
    (e) => e.id === IdEstadoOportunidad.value
  );
  return indexActual < estadosOrdenados.length - 1
    ? estadosOrdenados[indexActual + 1]
    : null;
});

// Estado anterior (botón "Regresar")
const estadoAnterior = computed(() => {
  const indexActual = estadosOrdenados.findIndex(
    (e) => e.id === IdEstadoOportunidad.value
  );
  return indexActual > 0 ? estadosOrdenados[indexActual - 1] : null;
});

const avanzarEstado = () => {
  if (estadoSiguiente.value) {
    IdEstadoOportunidad.value = estadoSiguiente.value.id;
    //Llamar cambio de estado
  }
};

const retrocederEstado = () => {
  if (estadoAnterior.value) {
    IdEstadoOportunidad.value = estadoAnterior.value.id;
    //Llamar cambio de estado
  }
};
</script>

<template>
  <BreadCrumb PageTitle="Oportunidad" />

  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <div
        class="d-flex justify-content-between align-items-center mb-15 mb-lg-20"
      >
        <h5 class="card-title fw-bold mb-0">
          VIGENTE - {{ NombreEstadoOportunidad }}
        </h5>
        <div class="d-flex gap-2">
          <!-- gap-1, gap-2 o gap-3 para diferentes espacios -->
          <button
            class="default-btn transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16"
            type="button"
            @click="UpdateOportunidades(1)"
          >
            CONCLUIDO
          </button>
          <button
            class="default-btn transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-secondary fs-md-15 fs-lg-16"
            type="button"
            @click="ListOportunidades()"
          >
            CANCELAR
          </button>
        </div>
      </div>

      <!-- Botones de estado -->
      <div class="mb-3 d-flex flex-wrap gap-2">
        <!-- Botón de siguiente estado (solo si no es el último estado) -->
        <div v-if="estadoSiguiente">
          <button
            class="default-btn transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 rounded-1 bg-success"
            @click="avanzarEstado"
          >
            {{ estadoSiguiente.nombre }}
          </button>
        </div>

        <!-- Botón de estado anterior (solo si no es el estado inicial) -->
        <div v-if="estadoAnterior && IdEstadoOportunidad > 2">
          <button
            class="default-btn transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 rounded-1 bg-secondary ms-2"
            @click="retrocederEstado"
          >
            Regresar a {{ estadoAnterior.nombre }}
          </button>
        </div>
      </div>

      <!-- Sistema de pestañas -->
      <ul class="nav nav-tabs mb-4" id="oportunidadTabs" role="tablist">
        <li class="nav-item" role="presentation">
          <button
            class="nav-link active"
            id="datos-tab"
            data-bs-toggle="tab"
            data-bs-target="#datos-content"
            type="button"
            role="tab"
            aria-controls="datos-content"
            aria-selected="true"
          >
            Datos - Seguimiento
          </button>
        </li>
        <li class="nav-item" role="presentation">
          <button
            class="nav-link"
            id="horas-tab"
            data-bs-toggle="tab"
            data-bs-target="#horas-content"
            type="button"
            role="tab"
            aria-controls="horas-content"
            aria-selected="false"
          >
            Historial de Horas
          </button>
        </li>
      </ul>

      <div class="tab-content" id="oportunidadTabsContent">
        <!-- Pestaña Datos - Seguimiento -->
        <div
          class="tab-pane fade show active"
          id="datos-content"
          role="tabpanel"
          aria-labelledby="datos-tab"
        >
          <div class="content">
            <div class="accordion accordion-flush" id="accordionFlushExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseOne"
                    aria-expanded="false"
                    aria-controls="flush-collapseOne"
                  >
                    DATOS GENERALES
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  class="accordion-collapse collapse"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="accordion-body">
                    <form class="row g-3 needs-validation" novalidate>
                      <div class="row mt-3">
                        <div class="col-12 text-end">
                          <button
                            class="default-btn transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16"
                            type="button"
                          >
                            EDITAR
                          </button>
                        </div>
                      </div>
                      <div class="row g-3 mb-3">
                        <div class="col-md-4">
                          <label
                            for="buscarCliente"
                            class="form-label fw-medium"
                            >CLIENTE</label
                          >
                          <div class="input-group">
                            <input
                              type="text"
                              class="form-control shadow-none fs-md-15 text-black"
                              id="buscarCliente"
                              v-model="nombrecliente"
                              disabled
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <ComboDinamico
                            :idMaestra="IdMaestraFUENTEORIGEN"
                            :nombreMaestra="nombreMaestraFUENTEORIGEN"
                            v-model:seleccionado="selectFUENTEORIGEN"
                            :disabled="disabled"
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
                            :disabled="disabled"
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
                            :disabled="disabled"
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
                            :disabled="disabled"
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
                            :disabled="disabled"
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
                            :disabled="disabled"
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
                            :disabled="disabled"
                            :placeholder="placeholder"
                            :required="true"
                          >
                          </ComboDinamico>
                        </div>
                        <div class="col-md-4">
                          <ComboDinamico
                            :idMaestra="IdMaestraSUBTIPOSOLUCIONFM"
                            :nombreMaestra="nombreMaestraSUBTIPOSOLUCIONFM"
                            v-model:seleccionado="selectSUBTIPOSOLUCIONFM"
                            :disabled="disabled"
                            :placeholder="placeholder"
                            :required="true"
                          >
                          </ComboDinamico>
                        </div>
                      </div>

                      <div class="row g-3">
                        <div class="col-md-4">
                          <label
                            for="buscarCliente"
                            class="form-label fw-medium"
                            >IMPORTE</label
                          >
                          <div class="input-group">
                            <input
                              type="text"
                              class="form-control shadow-none fs-md-15 text-black"
                              id="buscarCliente"
                              v-model="importe"
                              :disabled="disabled"
                            />
                          </div>
                        </div>
                        <div class="col-md-4">
                          <label
                            for="buscarCliente"
                            class="form-label fw-medium"
                            >MARGEN %</label
                          >
                          <div class="input-group">
                            <input
                              type="text"
                              class="form-control shadow-none fs-md-15 text-black"
                              id="buscarCliente"
                              v-model="margen"
                              :disabled="disabled"
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
                              :disabled="disabled"
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
                              :disabled="disabled"
                            ></textarea>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#flush-collapseTwo"
                    aria-expanded="true"
                    aria-controls="flush-collapseTwo"
                  >
                    SEGUIMIENTO
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  class="accordion-collapse collapse show"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div class="accordion-body">
                    <form class="row g-3 needs-validation" novalidate>
                      <div class="row g-3 mb-3">
                        <div class="col-md-4">
                          <div class="mb-3">
                            <label for="servicio" class="form-label fw-medium"
                              >DESCRIPCIÓN</label
                            >
                            <textarea
                              class="form-control shadow-none fs-md-15 text-black"
                              id="servicio"
                              rows="3"
                            ></textarea>
                          </div>
                        </div>

                        <div class="col-md-4">
                          <label for="fuenteOrigen" class="form-label fw-medium"
                            >TIPO</label
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
                          <label for="prospeccion" class="form-label fw-medium"
                            >FECHA</label
                          >
                          <input
                            type="date"
                            class="form-control shadow-none text-black fs-md-15"
                          />
                        </div>
                        <div class="col-md-4">
                          <button
                            class="default-btn transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16"
                            type="button"
                            @click="UpdateOportunidades(1)"
                          >
                            AGREGAR
                          </button>
                        </div>
                      </div>
                      <div class="row g-3">
                        <div class="col-md-12">
                          <div
                            class="card mb-25 border-0 rounded-0 bg-white recent-activity-box"
                          >
                            <div
                              class="mb-15 mb-md-20 mb-xxxl-25 d-flex align-items-center justify-content-between"
                            >
                              <h5 class="card-title fw-bold mb-0">
                                ACTIVIDAD RECIENTE
                              </h5>
                            </div>
                            <ul class="list ps-0 mb-0 list-unstyled">
                              <li
                                class="position-relative fw-medium text-dark-emphasis"
                              >
                                <div
                                  class="icon position-absolute start-0 rounded-circle text-center"
                                >
                                  <i class="ph-duotone ph-envelope-simple"></i>
                                </div>
                                <span class="text-black fw-bold">J. Ronan</span>
                                sent an Email
                                <span class="d-block fs-13 mt-1"
                                  >35 mins ago</span
                                >
                              </li>
                              <li
                                class="position-relative fw-medium text-dark-emphasis"
                              >
                                <div
                                  class="icon position-absolute start-0 rounded-circle text-center"
                                >
                                  <i class="ph-duotone ph-first-aid-kit"></i>
                                </div>
                                <span class="text-black fw-bold">Victoria</span>
                                archived a
                                <span class="text-black fw-bold"
                                  >Board for Project</span
                                >
                                in team
                                <span class="d-block fs-13 mt-1">1 hr ago</span>
                              </li>
                              <li
                                class="position-relative fw-medium text-dark-emphasis"
                              >
                                <div
                                  class="icon position-absolute start-0 rounded-circle text-center"
                                >
                                  <i class="ph-duotone ph-check-circle"></i>
                                </div>
                                <span class="text-black fw-bold"
                                  >Walter White</span
                                >
                                completed the project
                                <span class="text-black fw-bold"
                                  >“The Dashboard”</span
                                >
                                <span class="d-block fs-13 mt-1"
                                  >2 hrs ago</span
                                >
                              </li>
                              <li
                                class="position-relative fw-medium text-dark-emphasis"
                              >
                                <div
                                  class="icon position-absolute start-0 rounded-circle text-center"
                                >
                                  <i class="ph-duotone ph-shield-plus"></i>
                                </div>
                                <span class="text-black fw-bold">Jennifer</span>
                                added
                                <span class="text-black fw-bold">Micheal</span>
                                in the project
                                <span class="text-black fw-bold"
                                  >“The Adlash Design”</span
                                >
                                <span class="d-block fs-13 mt-1"
                                  >3 hrs ago</span
                                >
                              </li>
                              <li
                                class="position-relative fw-medium text-dark-emphasis"
                              >
                                <div
                                  class="icon position-absolute start-0 rounded-circle text-center"
                                >
                                  <i class="ph-duotone ph-envelope-simple"></i>
                                </div>
                                <span class="text-black fw-bold">S. Smith</span>
                                sent an Email
                                <span class="d-block fs-13 mt-1"
                                  >1 day ago</span
                                >
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pestaña Historial de Horas -->
        <div
          class="tab-pane fade"
          id="horas-content"
          role="tabpanel"
          aria-labelledby="horas-tab"
        >
          <div class="card border-0 rounded-0 bg-white">
            <div class="card-body p-20 p-md-25">
              <h5 class="card-title fw-bold mb-15 mb-md-20">
                Registro de Horas
              </h5>

              <!-- Formulario para agregar horas -->
              <div class="row g-3 mb-4">
                <div class="col-md-3">
                  <label class="form-label fw-medium">Fecha</label>
                  <input type="date" class="form-control shadow-none" />
                </div>
                <div class="col-md-3">
                  <label class="form-label fw-medium">Horas</label>
                  <input
                    type="number"
                    class="form-control shadow-none"
                    placeholder="0.00"
                  />
                </div>
                <div class="col-md-4">
                  <label class="form-label fw-medium">Descripción</label>
                  <input
                    type="text"
                    class="form-control shadow-none"
                    placeholder="Descripción de la actividad"
                  />
                </div>
                <div class="col-md-2 d-flex align-items-end">
                  <button class="btn btn-success">Agregar</button>
                </div>
              </div>

              <!-- Tabla de historial -->
              <div class="table-responsive">
                <table class="table align-middle mb-0">
                  <thead>
                    <tr>
                      <th>Fecha</th>
                      <th>Horas</th>
                      <th>Descripción</th>
                      <th>Usuario</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>15/05/2023</td>
                      <td>2.50</td>
                      <td>Reunión con cliente</td>
                      <td>Juan Pérez</td>
                      <td>
                        <button class="btn btn-sm btn-outline-primary me-2">
                          Editar
                        </button>
                        <button class="btn btn-sm btn-outline-danger">
                          Eliminar
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>14/05/2023</td>
                      <td>4.00</td>
                      <td>Elaboración de propuesta</td>
                      <td>María Gómez</td>
                      <td>
                        <button class="btn btn-sm btn-outline-primary me-2">
                          Editar
                        </button>
                        <button class="btn btn-sm btn-outline-danger">
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Resumen total -->
              <div class="mt-4 text-end">
                <h5>Total de horas registradas: <strong>6.50</strong></h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>