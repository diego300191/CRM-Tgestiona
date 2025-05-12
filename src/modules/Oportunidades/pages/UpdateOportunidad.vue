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
const listbandejaOportunidades = () => {
  router.push({
    name: "Oportunidad-OportunidadComponent",
  });
};
</script>

<template>
  <BreadCrumb PageTitle="Oportunidad" />

  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <div
        class="d-flex justify-content-between align-items-center mb-15 mb-lg-20"
      >
        <h5 class="card-title fw-bold mb-0">VIGENTE - ESTADO</h5>
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
            @click="listbandejaOportunidades()"
          >
            CANCELAR
          </button>
        </div>
      </div>

      <!-- Botones de estado -->
      <div class="mb-3 d-flex flex-wrap gap-2">
        <button
          v-for="(estado, index) in [
            'EN ELABORACIÓN DE PROPUESTA',
            'COTIZADO - ADJUDICADO',
            'COTIZADO - EN EVALUACIÓN',
            'COTIZADO - EN NEGOCIACIÓN',
            'COTIZADO - NO ADJUDICADO',
            'DESESTIMADO',
            'NO PRESENTADO',
            'OPORTUNIDAD DETECTADA',
            'SUSPENDIDO',
          ]"
          :key="index"
          class="default-btn transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16"
          type="button"
          @click="UpdateOportunidades(1)"
        >
          {{ estado }}
        </button>
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
        <div class="tab-pane fade show active" id="datos-content" role="tabpanel" aria-labelledby="datos-tab">
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
                      <label for="buscarCliente" class="form-label fw-medium"
                        >CLIENTE</label
                      >
                      <div class="input-group">
                        <input
                          type="text"
                          class="form-control shadow-none fs-md-15 text-black"
                          id="buscarCliente"
                          disabled
                        />
                      </div>
                    </div>

                    <div class="col-md-4">
                      <label for="fuenteOrigen" class="form-label fw-medium"
                        >FUENTE / ORIGEN</label
                      >
                      <select
                        class="form-select shadow-none fs-md-15 text-black"
                        id="fuenteOrigen"
                        disabled
                      >
                        <option selected disabled value="">
                          Seleccionar...
                        </option>
                        <option>Opción 1</option>
                        <option>Opción 2</option>
                      </select>
                    </div>

                    <div class="col-md-4">
                      <label for="prospeccion" class="form-label fw-medium"
                        >PROSPECCIÓN</label
                      >
                      <select
                        class="form-select shadow-none fs-md-15 text-black"
                        id="prospeccion"
                        disabled
                      >
                        <option selected disabled value="">
                          Seleccionar...
                        </option>
                        <option>Opción 1</option>
                        <option>Opción 2</option>
                      </select>
                    </div>
                  </div>

                  <!-- Segunda fila -->
                  <div class="row g-3 mb-3">
                    <div class="col-md-4">
                      <label for="medio" class="form-label fw-medium"
                        >MEDIO</label
                      >
                      <select
                        class="form-select shadow-none fs-md-15 text-black"
                        id="medio"
                        disabled
                      >
                        <option selected disabled value="">
                          Seleccionar...
                        </option>
                        <option>Opción 1</option>
                        <option>Opción 2</option>
                      </select>
                    </div>

                    <div class="col-md-4">
                      <label for="unidad" class="form-label fw-medium"
                        >UNIDAD</label
                      >
                      <select
                        class="form-select shadow-none fs-md-15 text-black"
                        id="unidad"
                        disabled
                      >
                        <option selected disabled value="">
                          Seleccionar...
                        </option>
                        <option>Opción 1</option>
                        <option>Opción 2</option>
                      </select>
                    </div>

                    <div class="col-md-4">
                      <label for="back" class="form-label fw-medium"
                        >BACK</label
                      >
                      <select
                        class="form-select shadow-none fs-md-15 text-black"
                        id="back"
                        disabled
                      >
                        <option selected disabled value="">
                          Seleccionar...
                        </option>
                        <option>Opción 1</option>
                        <option>Opción 2</option>
                      </select>
                    </div>
                  </div>

                  <!-- Tercera fila -->
                  <div class="row g-3 mb-3">
                    <div class="col-md-4">
                      <label for="personaEncargada" class="form-label fw-medium"
                        >PERSONA ENCARGADA</label
                      >
                      <select
                        class="form-select shadow-none fs-md-15 text-black"
                        id="personaEncargada"
                        disabled
                      >
                        <option selected disabled value="">
                          Seleccionar...
                        </option>
                        <option>Opción 1</option>
                        <option>Opción 2</option>
                      </select>
                    </div>

                    <div class="col-md-4">
                      <label for="solucionFM" class="form-label fw-medium"
                        >SOLUCIÓN FM</label
                      >
                      <select
                        class="form-select shadow-none fs-md-15 text-black"
                        id="solucionFM"
                        disabled
                      >
                        <option selected disabled value="">
                          Seleccionar...
                        </option>
                        <option>Opción 1</option>
                        <option>Opción 2</option>
                      </select>
                    </div>
                  </div>

                  <!-- Cuarta fila -->
                  <div class="row g-3">
                    <div class="col-md-4">
                      <label
                        for="validationCustomFront"
                        class="form-label fw-medium"
                        >SUBTIPO SOLUCIÓN FM</label
                      >
                      <select
                        class="form-select shadow-none fs-md-15 text-black"
                        id="validationCustomFront"
                        disabled
                      >
                        <option selected disabled value="">
                          Seleccionar...
                        </option>
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
                          disabled
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
                          disabled
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
                          disabled
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
                          disabled
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
                            <span class="d-block fs-13 mt-1">35 mins ago</span>
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
                            <span class="text-black fw-bold">Walter White</span>
                            completed the project
                            <span class="text-black fw-bold"
                              >“The Dashboard”</span
                            >
                            <span class="d-block fs-13 mt-1">2 hrs ago</span>
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
                            <span class="text-black fw-bold">Micheal</span> in
                            the project
                            <span class="text-black fw-bold"
                              >“The Adlash Design”</span
                            >
                            <span class="d-block fs-13 mt-1">3 hrs ago</span>
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
                            <span class="d-block fs-13 mt-1">1 day ago</span>
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
        <div class="tab-pane fade" id="horas-content" role="tabpanel" aria-labelledby="horas-tab">
          <div class="card border-0 rounded-0 bg-white">
            <div class="card-body p-20 p-md-25">
              <h5 class="card-title fw-bold mb-15 mb-md-20">Registro de Horas</h5>
              
              <!-- Formulario para agregar horas -->
              <div class="row g-3 mb-4">
                <div class="col-md-3">
                  <label class="form-label fw-medium">Fecha</label>
                  <input type="date" class="form-control shadow-none">
                </div>
                <div class="col-md-3">
                  <label class="form-label fw-medium">Horas</label>
                  <input type="number" class="form-control shadow-none" placeholder="0.00">
                </div>
                <div class="col-md-4">
                  <label class="form-label fw-medium">Descripción</label>
                  <input type="text" class="form-control shadow-none" placeholder="Descripción de la actividad">
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
                        <button class="btn btn-sm btn-outline-primary me-2">Editar</button>
                        <button class="btn btn-sm btn-outline-danger">Eliminar</button>
                      </td>
                    </tr>
                    <tr>
                      <td>14/05/2023</td>
                      <td>4.00</td>
                      <td>Elaboración de propuesta</td>
                      <td>María Gómez</td>
                      <td>
                        <button class="btn btn-sm btn-outline-primary me-2">Editar</button>
                        <button class="btn btn-sm btn-outline-danger">Eliminar</button>
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