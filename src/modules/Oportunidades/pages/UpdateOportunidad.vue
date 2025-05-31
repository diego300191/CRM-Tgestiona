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
  addOportinidad,
  configuracionEtapaVal,
  addActividadesOportunidad,
  descripcionActividad,
  tipoActividad,
  fechaActividad,
  listaActividadesOportunidad,
  descripcionHistorialHoras,
  horas,
  fechaHistorialHoras,
  listaHistorialHorasOportunidad,
  addHistorialHorasOportunidad,
  NombreVigencia,
  IdVigencia,
  frontOptionsBack,
  getCombosBack,
  UsuarioCosteador,
  usuarioHoras,
  EditarHoras,
  InactivarHoras,
  IdHistorialHoras,
  verActualizar,
} = useOportunidad();

onMounted(async () => {
  await getIdOportunidad(
    parseInt(router.currentRoute.value.params.id.toString())
  );
  getCombosBack(1093);
});

function formatDateToDDMMYYYY(isoDate: string): string {
  const date = new Date(isoDate);

  // Extract day, month, and year
  const day = String(date.getDate()).padStart(2, "0"); // Ensures two digits (e.g., "05")
  const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() is zero-based
  const year = date.getFullYear();

  // Return formatted date
  return `${day}-${month}-${year}`;
}
// Estado siguiente (botón principal)
const estadoSiguiente = computed(() => {
  if (!configuracionEtapaVal.value) return null;

  return {
    id: configuracionEtapaVal.value.idEtapaSiguiente,
    nombre: configuracionEtapaVal.value.etapaSiguiente,
  };
});

// Estado anterior (botón "Regresar")
const estadoAnterior = computed(() => {
  if (!configuracionEtapaVal.value) return null;

  return {
    id: configuracionEtapaVal.value.idEtapaAnterior,
    nombre: configuracionEtapaVal.value.etapaAnterior,
  };
});

// Estado de rechazo (podrías añadirlo si necesitas)
const estadoRechazo = computed(() => {
  if (!configuracionEtapaVal.value) return null;

  return {
    id: configuracionEtapaVal.value.idEtapaRechaza,
    nombre: configuracionEtapaVal.value.etapaRechaza,
  };
});

const avanzarEstado = () => {
  if (estadoSiguiente.value) {
    addOportinidad(
      parseInt(router.currentRoute.value.params.id.toString()),
      estadoSiguiente.value.id,
      IdVigencia.value
    );
    // Actualizar el estado local si es necesario
    IdEstadoOportunidad.value = estadoSiguiente.value.id;
  }
};

const retrocederEstado = () => {
  if (estadoAnterior.value) {
    addOportinidad(
      parseInt(router.currentRoute.value.params.id.toString()),
      estadoAnterior.value.id,
      IdVigencia.value
    );
    // Actualizar el estado local si es necesario
    IdEstadoOportunidad.value = estadoAnterior.value.id;
  }
};
function calcularTiempo(Fecha: string | Date): string {
  const fechaCalcular: Date = Fecha instanceof Date ? Fecha : new Date(Fecha);
  const hoy: Date = new Date();

  const tiempoPasado: number = hoy.getTime() - fechaCalcular.getTime();

  const segs = 1000;
  const mins = segs * 60;
  const hours = mins * 60;
  const days = hours * 24;
  const months = days * 30.416666666666668;
  const years = months * 12;

  const anos = Math.floor(tiempoPasado / years);

  let remainingTime = tiempoPasado - anos * years;
  const meses = Math.floor(remainingTime / months);

  remainingTime = remainingTime - meses * months;
  const dias = Math.floor(remainingTime / days);

  remainingTime = remainingTime - dias * days;
  const horas = Math.floor(remainingTime / hours);

  remainingTime = remainingTime - horas * hours;
  const minutos = Math.floor(remainingTime / mins);

  remainingTime = remainingTime - minutos * mins;
  const segundos = Math.floor(remainingTime / segs);

  if (anos > 0) return `${anos} Años`;
  if (meses > 0) return `${meses} Meses`;
  if (dias > 0) return `${dias} Días`;
  if (horas > 0) return `${horas} Horas`;
  if (minutos > 0) return `${minutos} Minutos`;
  if (segundos > 0) return `${segundos} Segundos`;

  return "0 Segundos";
}

// Computed para sumar horas
const sumahoras = computed(() => {
  // Verificación de seguridad
  if (
    !listaHistorialHorasOportunidad.value ||
    listaHistorialHorasOportunidad.value.length === 0
  ) {
    return "0.00";
  }

  let totalHoras = 0;
  let totalMinutos = 0;

  listaHistorialHorasOportunidad.value.forEach((item) => {
    // Convertir el número a string y separar parte entera y decimal
    const [horasStr, minutosStr] = item.hora.toString().split(".");

    const horas = Number(horasStr) || 0;
    // Tomar solo los primeros dos dígitos de los minutos para casos como 1.5 (50 minutos)
    const minutos =
      Number((minutosStr || "0").padEnd(2, "0").substring(0, 2)) || 0;

    totalHoras += horas;
    totalMinutos += minutos;
  });

  // Convertir minutos adicionales a horas
  totalHoras += Math.floor(totalMinutos / 60);
  totalMinutos = totalMinutos % 60;

  // Formatear el resultado con dos dígitos en minutos
  return `${totalHoras}.${totalMinutos.toString().padStart(2, "0")}`;
});

// Opcional: Computed para mostrar en formato legible
const horasFormateadas = computed(() => {
  const [horas, minutos] = sumahoras.value.split(".");
  return `${horas}h ${minutos}m`;
});
</script>

<template>
  <BreadCrumb PageTitle="Oportunidad" />

  <div class="card mb-25 border-0 rounded-0 bg-white add-user-card">
    <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30 letter-spacing">
      <div
        class="d-flex justify-content-between align-items-center mb-15 mb-lg-20"
      >
        <h5 class="card-title fw-bold mb-0">
          {{ NombreVigencia }} - {{ NombreEstadoOportunidad }}
        </h5>
        <div class="d-flex gap-2">
          <!-- gap-1, gap-2 o gap-3 para diferentes espacios -->
          <button
            class="default-btn transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16"
            type="button"
            @click="
              addOportinidad(
                parseInt(router.currentRoute.value.params.id.toString()),
                IdEstadoOportunidad,
                2
              )
            "
            v-if="NombreVigencia != 'Concluido'"
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
      <div
        class="mb-3 d-flex flex-wrap gap-2"
        v-if="NombreVigencia != 'Concluido'"
      >
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
        <div
          v-if="
            estadoAnterior &&
            configuracionEtapaVal?.idEtapaAnterior &&
            NombreEstadoOportunidad != 'OPORTUNIDAD DETECTADA'
          "
        >
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
                      <!-- <div class="row mt-3">
                        <div class="col-12 text-end">
                          <button
                            class="default-btn transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16"
                            type="button"
                          >
                            EDITAR
                          </button>
                        </div>
                      </div> -->
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
                          <label
                            for="select-maestra"
                            class="form-label fw-medium"
                          >
                            Back
                          </label>
                          <select
                            class="form-select shadow-none fs-md-15 text-black"
                            id="validationCustomFront"
                            v-model="selectBACK"
                            required
                            :disabled="true"
                          >
                            <option selected disabled value="0">
                              Seleccionar...
                            </option>
                            <option
                              v-for="option in frontOptionsBack"
                              :key="option.id"
                              :value="option.id"
                            >
                              {{ option.usuario }}
                            </option>
                          </select>
                          <div class="invalid-feedback">
                            Por favor selecciona una opción válida.
                          </div>
                        </div>
                      </div>

                      <div class="row g-3">
                        <div class="col-md-4">
                          <label
                            for="buscarCliente"
                            class="form-label fw-medium"
                            >Responsable de costeo</label
                          >
                          <div class="input-group">
                            <input
                              type="text"
                              class="form-control shadow-none fs-md-15 text-black"
                              id="UsuarioCosteador"
                              v-model="UsuarioCosteador"
                              :disabled="true"
                            />
                          </div>
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
                              v-model="descripcionActividad"
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
                              v-model="tipoActividad"
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
                            v-model="fechaActividad"
                          />
                        </div>
                        <div
                          class="col-md-4"
                          v-if="NombreVigencia != 'Concluido'"
                        >
                          <button
                            class="default-btn transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16"
                            type="button"
                            @click="
                              addActividadesOportunidad(
                                parseInt(
                                  router.currentRoute.value.params.id.toString()
                                )
                              )
                            "
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
                            <ul
                              class="list ps-0 mb-0 list-unstyled"
                              v-for="actividad in listaActividadesOportunidad"
                              :key="actividad.id"
                            >
                              <li
                                class="position-relative fw-medium text-dark-emphasis"
                              >
                                <div
                                  class="icon position-absolute start-0 rounded-circle text-center"
                                >
                                  <i
                                    v-if="
                                      actividad.tipoGestion
                                        ?.toLowerCase()
                                        .includes('correo')
                                    "
                                    class="ph-duotone ph-envelope-simple"
                                  ></i>
                                  <i
                                    v-else-if="
                                      actividad.tipoGestion
                                        ?.toLowerCase()
                                        .includes('reunion') ||
                                      actividad.tipoGestion
                                        ?.toLowerCase()
                                        .includes('reunión')
                                    "
                                    class="ph-duotone ph-first-aid-kit"
                                  ></i>
                                  <i
                                    v-else
                                    class="ph-duotone ph-check-circle"
                                  ></i>
                                </div>
                                <span class="text-black fw-bold">{{
                                  actividad.usuarioRegistro
                                }}</span>
                                {{ actividad.tipoGestion }}
                                <span class="d-block fs-13 mt-1">{{
                                  actividad.comentario
                                }}</span>
                                <span class="d-block fs-13 mt-1">{{
                                  formatDateToDDMMYYYY(actividad.fechaActividad)
                                }}</span>
                                <span class="d-block fs-13 mt-1">{{
                                  calcularTiempo(actividad.fechaRegistro)
                                }}</span>
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
                  <input
                    type="date"
                    class="form-control shadow-none"
                    v-model="fechaHistorialHoras"
                  />
                </div>
                <div class="col-md-3">
                  <label class="form-label fw-medium">Horas 0h.00m</label>
                  <input
                    type="number"
                    class="form-control shadow-none"
                    placeholder="0h.00m"
                    v-model="horas"
                  />
                </div>
                <div class="col-md-3">
                  <label class="form-label fw-medium">Descripción</label>
                  <input
                    type="text"
                    class="form-control shadow-none"
                    placeholder="Descripción de la actividad"
                    v-model="descripcionHistorialHoras"
                  />
                </div>
                <div class="col-md-3">
                  <label class="form-label fw-medium">Usuario</label>
                  <input
                    type="text"
                    class="form-control shadow-none"
                    placeholder="Descripción de la actividad"
                    v-model="usuarioHoras"
                  />
                </div>
                <div class="col-md-2 d-flex align-items-end">
                  <button
                  v-if="!verActualizar"
                    class="btn btn-success"
                    @click="
                      addHistorialHorasOportunidad(
                        parseInt(router.currentRoute.value.params.id.toString()),0
                      )
                    "
                  >
                    Agregar
                  </button>
                  <button
                  v-if="verActualizar"
                    class="btn btn-success"
                    @click="
                      addHistorialHorasOportunidad(
                        parseInt(router.currentRoute.value.params.id.toString()),IdHistorialHoras
                      )
                    "
                  >
                    Actualizar
                  </button>
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
                    <tr
                      v-for="historialhoras in listaHistorialHorasOportunidad"
                      :key="historialhoras.id"
                    >
                      <td>{{ formatDateToDDMMYYYY(historialhoras.fecha) }}</td>
                      <td>{{ historialhoras.hora }}</td>
                      <td>{{ historialhoras.descripcion }}</td>
                      <td>{{ historialhoras.usuarioHoras }}</td>
                      <td>
                        <button class="btn btn-sm btn-outline-primary me-2" @click="EditarHoras(historialhoras.id)">
                          Editar
                        </button>
                        <button class="btn btn-sm btn-outline-danger" @click="InactivarHoras(historialhoras.id)">
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Resumen total -->
              <div class="mt-4 text-end">
                <h5>
                  Total de horas registradas:
                  <strong>{{ horasFormateadas }}</strong>
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>