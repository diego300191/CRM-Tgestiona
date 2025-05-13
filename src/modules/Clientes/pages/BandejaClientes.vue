
<script lang="ts" setup >
import { ref } from "vue";
import AddClienteModal from "@/modules/Clientes/pages/AddClienteModal.vue";
import PaginationNumbers from "@/components/Personalizados/PaginationNumbers.vue";
import LoadingModal from "@/components/Personalizados/LoadingModal.vue";
import useCliente from "@/modules/Clientes/composables/useCliente";

import stateStore from "@/utils/store";

const stateStoreInstance = stateStore;

const {
  isLoading,
  clienteslist,
  currentPages,
  totalPages,
  totalRegister,
  nombreBusqueda,
  getPage,
  BuscarFiltros,
} = useCliente();
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
                placeholder="Buscar Cliente"
                 @keypress.enter="BuscarFiltros()"
                  v-model="nombreBusqueda"
              />
              <button
                type="submit"
                class="bg-transparent text-primary transition p-0 border-0"
                @click="BuscarFiltros()"
              >
                <i class="flaticon-search-interface-symbol"></i>
              </button>
            </form>
          </div>
          <div class="d-sm-flex align-items-center">
            <button
              class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block me-10 mb-10 mb-lg-0"
              type="button"
              @click="stateStoreInstance.createNewModal"
            >
              Nuevo Cliente
              <i class="flaticon-plus position-relative ms-5 fs-12"></i>
            </button>
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
                    NOMBRES
                  </th>
                  <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                  >
                    EMPRESA
                  </th>
                  <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                  >
                    CARGOS
                  </th>
                  <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                  >
                    EMAIL
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
                    SECTOR
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
                <tr v-for="cliente in clienteslist" :key="cliente.Id">
                  <th
                    class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0"
                  >
                    <div class="d-flex align-items-center">
                      <div
                        class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16"
                      >
                        {{cliente.Nombre}}
                      </div>
                    </div>
                  </th>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                   {{cliente.Nombre}}
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                    {{cliente.Nombre}}
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                    {{cliente.Nombre}}
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                    {{cliente.Nombre}}
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                    {{cliente.Nombre}}
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                    {{cliente.Nombre}}
                  </td>
                  <td
                    class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0"
                  >
                    <button
                      class="dropdown-toggle lh-1 bg-transparent border-0 shadow-none p-0 transition"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      @click="stateStoreInstance.createNewModal"
                    >
                      <i class="flaticon-dots"></i>
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
      <AddClienteModal />
    </div>
    <LoadingModal v-if="isLoading" />
  </div>
</template>
  