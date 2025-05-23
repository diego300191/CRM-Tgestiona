<script lang="ts" setup>
import { ref } from "vue";
import AddClienteModal from "@/modules/Clientes/pages/AddClienteModal.vue";
import PaginationNumbers from "@/components/Personalizados/PaginationNumbers.vue";
import LoadingModal from "@/components/Personalizados/LoadingModal.vue";
import useCliente from "@/modules/Clientes/composables/useCliente";
import stateStore from "@/utils/store";
import ComboDinamico from "@/components/Personalizados/ComboDinamico.vue";

const stateStoreInstance = stateStore;

const {
  isLoading,
  clienteslist,
  currentPages,
  totalPages,
  totalRegister,
  nombreBusqueda,
  IdMaestraSECTOR,
  nombreMaestraSECTOR,
  selectSECTOR,
  placeholder,
  selectTipoCliente,
  getPage,
  BuscarFiltros,
} = useCliente();

// Variables para el ordenamiento
const sortField = ref("nombre");
const sortDirection = ref("asc");

const sortBy = (field: string) => {
  //console.log('Sorting by:', field, 'Direction:', sortDirection.value);
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  }

  //console.log('Before sorting:', clienteslist.value);
  const sortedList = [...clienteslist.value].sort((a: any, b: any) => {
    const valueA = a[sortField.value]?.toString().toLowerCase() || "";
    const valueB = b[sortField.value]?.toString().toLowerCase() || "";
    //console.log('Comparing:', valueA, valueB);

    if (sortDirection.value === "asc") {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    }
  });
  clienteslist.value = sortedList; // Forzar reactividad
  //console.log('After sorting:', clienteslist.value);
};

const handleSearch = (e: Event) => {
  e.preventDefault();
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
          <div class="d-flex align-items-center flex-grow-1">
            <form
              class="search-box d-flex align-items-center w-100"
              @submit.prevent="handleSearch"
            >
              <div class="form-group me-3 flex-grow-1">
                <div class="position-relative">
                  <input
                    type="text"
                    class="form-control shadow-none text-black rounded-0 border-0"
                    placeholder="Buscar Nombre"
                    v-model="nombreBusqueda"
                    @keyup.enter="BuscarFiltros()"
                  />
                  <button
                    class="bg-transparent text-primary transition p-0 border-0 position-absolute top-50 translate-middle-y end-0 me-2"
                    @click="BuscarFiltros()"
                  >
                    <i class="flaticon-search-interface-symbol"></i>
                  </button>
                </div>
              </div>
              <div class="form-group me-3 flex-grow-1">
                <ComboDinamico
                  :idMaestra="IdMaestraSECTOR"
                  :nombreMaestra="nombreMaestraSECTOR"
                  v-model:seleccionado="selectSECTOR"
                  :disabled="false"
                  :placeholder="placeholder"
                  :required="false"
                />
              </div>
              <div class="form-group flex-grow-1">
                <label for="select-maestra" class="form-label fw-medium">
                  Tipo Cliente
                </label>
                <select
                  id="select-maestra"
                  class="form-select shadow-none fs-md-15 rounded-1 border-1"
                  v-model="selectTipoCliente"
                  :disabled="false"
                >
                  <option :value="-1" class="text-muted">Seleccionar....</option>
                  <option :value="1" class="text-muted">Cliente Actual</option>
                  <option :value="2" class="text-muted">Cliente Nuevo</option>
                </select>
                <div class="invalid-feedback">
                  Por favor selecciona una opción válida.
                </div>
              </div>
            </form>
          </div>
          <div class="d-sm-flex align-items-center ms-3">
            
            <button
              class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0 me-2"
              type="button"
              @click="BuscarFiltros()"
            >
              Buscar
              <i class="flaticon-search-interface-symbol"></i>
            </button>
            <button
              class="default-btn position-relative transition border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success fs-md-15 fs-lg-16 d-inline-block mb-10 mb-lg-0"
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
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 ps-0 cursor-pointer"
                    @click="sortBy('nombre')"
                  >
                    NOMBRES
                    <i
                      v-if="sortField === 'nombre'"
                      :class="[
                        'ms-1',
                        sortDirection === 'asc'
                          ? 'flaticon-up-arrow'
                          : 'flaticon-down-arrow',
                      ]"
                    ></i>
                  </th>
                  <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 cursor-pointer"
                    @click="sortBy('contacto')"
                  >
                    EMPRESA
                    <i
                      v-if="sortField === 'contacto'"
                      :class="[
                        'ms-1',
                        sortDirection === 'asc'
                          ? 'flaticon-up-arrow'
                          : 'flaticon-down-arrow',
                      ]"
                    ></i>
                  </th>
                  <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 cursor-pointer"
                    @click="sortBy('cargo')"
                  >
                    CARGOS
                    <i
                      v-if="sortField === 'cargo'"
                      :class="[
                        'ms-1',
                        sortDirection === 'asc'
                          ? 'flaticon-up-arrow'
                          : 'flaticon-down-arrow',
                      ]"
                    ></i>
                  </th>
                  <th
                    scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0"
                    @click="sortBy('emailContacto')"
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
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 cursor-pointer"
                    @click="sortBy('sector')"
                  >
                    SECTOR
                    <i
                      v-if="sortField === 'sector'"
                      :class="[
                        'ms-1',
                        sortDirection === 'asc'
                          ? 'flaticon-up-arrow'
                          : 'flaticon-down-arrow',
                      ]"
                    ></i>
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
                <tr v-for="cliente in clienteslist" :key="cliente.id">
                  <th
                    class="shadow-none lh-1 fw-medium text-black-emphasis title ps-0"
                  >
                    <div class="d-flex align-items-center">
                      <div
                        class="d-flex align-items-center ms-5 fs-md-15 fs-lg-16"
                      >
                        {{ cliente.nombre }}
                      </div>
                    </div>
                  </th>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                    {{ cliente.contacto }}
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                    {{ cliente.cargo }}
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                    {{ cliente.emailContacto }}
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                    {{ cliente.telefonoContacto }}
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                    {{ cliente.sector }}
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                    {{ "CLIENTE - " + cliente.tipoCliente }}
                  </td>
                  <td
                    class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0"
                  >
                    <button
                      class="btn btn-primary btn-sm"
                      @click="stateStoreInstance.updateClientModal(cliente.id)"
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
      <AddClienteModal />
    </div>
    <LoadingModal v-if="isLoading" />
  </div>
</template>

<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.cursor-pointer:hover {
  background-color: #f5f5f5;
}
.search-box {
  gap: 1rem;
}
.form-group {
  position: relative;
}

</style>