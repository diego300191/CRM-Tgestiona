
<script lang="ts" setup >
import PaginationNumbers from "@/components/Personalizados/PaginationNumbers.vue";
import LoadingModal from "@/components/Personalizados/LoadingModal.vue";
import useOportunidad from "@/modules/Oportunidades/composables/useOportunidad";


const {
routerAddOportunidad,
routerUpdateOportunidades,
isLoading,
  oportunidadlist,
  currentPages,
  totalPages,
  totalRegister,
  nombreBusqueda,
  getPage,
  BuscarFiltros,
} = useOportunidad();


// Función para manejar el enter en el buscador
const handleSearch = (e: Event) => {
  e.preventDefault(); // Previene el submit/refresh
  BuscarFiltros();
};

</script>


<template>
    <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
      <div class="card-body p-15 p-sm-20 p-md-25 p-lg-30">
        <div class="card mb-25 border-0 rounded-0 bg-white letter-spacing">
            <div
              class="card-head box-shadow bg-white d-lg-flex align-items-center justify-content-between p-15 p-sm-20 p-md-25"
            >
            <div class="d-flex align-items-center">
                <form class="search-box position-relative me-15">
                  <input
                    type="text"
                    class="form-control shadow-none text-black rounded-0 border-0"
                    placeholder="Buscar Oportunidad"
                    v-model="nombreBusqueda"
                    @keyup.enter="handleSearch"
                  />
                  <button
                    class="bg-transparent text-primary transition p-0 border-0"
                  >
                    <i class="flaticon-search-interface-symbol"></i>
                  </button>
                </form>
              
              </div>
              <div class="d-sm-flex align-items-center">
                <button
                  class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0"
                  type="button"
                @click="routerAddOportunidad()"
                >
                  Nuevo Oportunidad
                  <i class="flaticon-plus position-relative ms-5 fs-12"></i>
                </button>
                <!-- <button
                  class="default-outline-btn position-relative transition fw-medium text-black pt-10 pb-10 ps-25 pe-25 pt-md-11 pb-md-11 ps-md-30 pe-md-30 rounded-1 bg-transparent fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0"
                  type="button"
                >
                  Exportar
                  <i class="flaticon-file-1 position-relative ms-5 top-2 fs-15"></i>
                </button> -->
              </div>
              
            </div>
            <div class="card-body p-15 p-sm-20 p-md-25">
              <div class="table-responsive">
                <table class="table text-nowrap align-middle mb-0">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0"
                      >
                        EMPRESA 
                      </th>
                      <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                      >
                        ESTADO
                      </th>
                      <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                      >
                        SUBESTADO
                      </th>
                      <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                      >
                        BACK
                      </th>
                      <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                      >
                        FRONT
                      </th>
                      <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                      >
                        TELEFONO
                      </th>
                      <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                      >
                        TIPO CLIENTE
                      </th>
                      <th
                        scope="col"
                        class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"
                      ></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="oportunidad in oportunidadlist" :key="oportunidad.id">
                  <th class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0">
                    <div class="d-flex align-items-center">
                      <div class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16">
                        {{ oportunidad.cliente }}
                      </div>
                    </div>
                  </th>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">Vigente</td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">{{ oportunidad.estadoOportunidad }}</td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">back</td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">front</td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">{{ oportunidad.telefonoContacto }}</td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">CLIENTE {{ oportunidad.tipoCliente }}</td>
                  <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                    <button
                      class="btn btn-primary btn-sm"
                      @click="routerUpdateOportunidades(oportunidad.id)"
                    >
                      Editar
                    </button>
                  </td>
                </tr>
                  </tbody>
                </table>
              </div>
              <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-3 mt-2">
            <PaginationNumbers
              :currentPages="currentPages"
              :totalPages="totalPages"
              :totalRegister="totalRegister"
              @page-Changed="getPage"
            />
          </div>
            </div>
          </div>
      </div>
      <LoadingModal v-if="isLoading" />
    </div>
  </template>
  