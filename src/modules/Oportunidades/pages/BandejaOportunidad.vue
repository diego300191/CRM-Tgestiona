<script lang="ts" setup>
import PaginationNumbers from "@/components/Personalizados/PaginationNumbers.vue";
import ComboDinamico from "@/components/Personalizados/ComboDinamico.vue";
import LoadingModal from "@/components/Personalizados/LoadingModal.vue";
import useOportunidad from "@/modules/Oportunidades/composables/useOportunidad";
import { ref } from "vue";

const {
  routerAddOportunidad,
  routerUpdateOportunidades,
  isLoading,
  oportunidadlist,
  currentPages,
  totalPages,
  totalRegister,
  nombreBusqueda,
  selectIdEtapaOportunidad,
  selectIdCliente,
  selectIdTipoCliente,
  selectIdSector,
  selectIdBack,
  selectIdFront,
  selectIdTipoSolucionFM,
  IdMaestraSubestado,
  nombreMaestraSUBESTADO,
  IdMaestraSECTOR,
  nombreMaestraSECTOR,
  placeholder,
  getPage,
  BuscarFiltros,
} = useOportunidad();

// Variables para el ordenamiento
const sortField = ref("cliente");
const sortDirection = ref("asc");

const sortBy = (field: string) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  } else {
    sortField.value = field;
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc";
  }

  const sortedList = [...oportunidadlist.value].sort((a: any, b: any) => {
    const valueA = a[sortField.value]?.toString().toLowerCase() || "";
    const valueB = b[sortField.value]?.toString().toLowerCase() || "";

    if (sortDirection.value === "asc") {
      return valueA < valueB ? -1 : valueA > valueB ? 1 : 0;
    } else {
      return valueA > valueB ? -1 : valueA < valueB ? 1 : 0;
    }
  });
  oportunidadlist.value = sortedList;
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
        <div class="card-head box-shadow bg-white align-items-center justify-content-between p-15 p-sm-20 p-md-25">
          <form>
            <div class="row search-box align-items-center w-100 " @submit.prevent="handleSearch">
               <div class="col form-group me-2 ">
                <ComboDinamico :idMaestra="IdMaestraSECTOR" :nombreMaestra="nombreMaestraSECTOR"
                  v-model:seleccionado="selectIdSector" :disabled="false" :placeholder="placeholder"
                  :required="false" />
              </div>
             
              <div class="col form-group me-2 ">
                <label for="select-maestra" class="form-label fw-medium">
                  Tipo Cliente
                </label>
                <select id="select-maestra" class="form-select shadow-none fs-md-15 rounded-1 border-1"
                  v-model="selectIdTipoCliente" :disabled="false">
                  <option :value="-1" class="text-muted">Seleccionar....</option>
                  <option :value="1" class="text-muted">Cliente Actual</option>
                  <option :value="2" class="text-muted">Cliente Nuevo</option>
                </select>
                <div class="invalid-feedback">
                  Por favor selecciona una opción válida.
                </div>

              </div>
              <div class="col form-group me-2">
                <label for="select-maestra" class="form-label fw-medium">
                  Back
                </label>
                <select id="select-maestra" class="form-select shadow-none fs-md-15 rounded-1 border-1"
                  v-model="selectIdBack" :disabled="false">
                  <option :value="-1" class="text-muted">Seleccionar....</option>
                  <option :value="1" class="text-muted">Cliente Actual</option>
                  <option :value="2" class="text-muted">Cliente Nuevo</option>
                </select>
                <div class="invalid-feedback">
                  Por favor selecciona una opción válida.
                </div>
              </div>
            </div>

            <!-- Arreglar -->
            <div class="row search-box align-items-center w-100 ">
              <div class="col form-group me-2">
                <label for="select-maestra" class="form-label fw-medium">
                  Front
                </label>
                <select id="select-maestra" class="form-select shadow-none fs-md-15 rounded-1 border-1"
                  v-model="selectIdFront" :disabled="false">
                  <option :value="-1" class="text-muted">Seleccionar....</option>
                  <option :value="1" class="text-muted">Cliente Actual</option>
                  <option :value="2" class="text-muted">Cliente Nuevo</option>
                </select>
                <div class="invalid-feedback">
                  Por favor selecciona una opción válida.
                </div>
              </div>
              <div class="col form-group me-2">
                <label for="select-maestra" class="form-label fw-medium">
                  Estado
                </label>
                <select id="select-maestra" class="form-select shadow-none fs-md-15 rounded-1 border-1"
                  v-model="selectIdTipoSolucionFM" :disabled="false">
                  <option :value="-1" class="text-muted">Seleccionar....</option>
                  <option :value="1" class="text-muted">Vigente</option>
                  <option :value="2" class="text-muted">Concluido</option>
                </select>
                <div class="invalid-feedback">
                  Por favor selecciona una opción válida.
                </div>
              </div>
              <div class="col form-group me-2">
                <ComboDinamico :idMaestra="IdMaestraSubestado" :nombreMaestra="nombreMaestraSUBESTADO"
                  v-model:seleccionado="selectIdEtapaOportunidad" :disabled="false" :placeholder="placeholder"
                  :required="true">
                </ComboDinamico>
              </div>
            </div>
            <div class="row search-box align-items-start w-100 mt-4 mb-2">
              <div class="col-2 form-group justify-content-start">
                 <button
                    class="default-btn border-0 text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-primary fs-md-15 "
                    type="button" @click="BuscarFiltros()">
                    Buscar
                    <i class="flaticon-search-interface-symbol"></i>
                  </button>
              </div>
              <div class="col-4 form-group ">
                <div>
                  <button
                    class="btn border-0 fw-medium text-white pt-11 pb-11 ps-25 pe-25 pt-md-12 pb-md-12 ps-md-30 pe-md-30 rounded-1 bg-success "
                    type="button" @click="routerAddOportunidad()">
                    Nuevo Oportunidad
                    <i class="flaticon-plus ms-5 fs-12"></i>
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div class="card-body p-15 p-sm-20 p-md-25">
          <div class="table-responsive">
            <table class="table text-nowrap align-middle mb-0">
              <thead>
                <tr>
                  <th scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 cursor-pointer"
                    @click="sortBy('cliente')">
                    EMPRESA
                    <i v-if="sortField === 'cliente'" :class="[
                      'ms-1',
                      sortDirection === 'asc'
                        ? 'flaticon-up-arrow'
                        : 'flaticon-down-arrow',
                    ]"></i>
                  </th>

                  <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                    ESTADO
                  </th>
                  <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 cursor-pointer"
                    @click="sortBy('etapaOportunidad')">
                    SUBESTADO
                    <i v-if="sortField === 'etapaOportunidad'" :class="[
                      'ms-1',
                      sortDirection === 'asc'
                        ? 'flaticon-up-arrow'
                        : 'flaticon-down-arrow',
                    ]"></i>
                  </th>
                  <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                    BACK
                  </th>
                  <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                    FRONT
                  </th>
                  <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                    TELEFONO
                  </th>
                  <th scope="col" class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0">
                    TIPO CLIENTE
                  </th>
                  <th scope="col"
                    class="text-uppercase fw-medium shadow-none text-body-tertiary fs-13 pt-0 text-end pe-0"></th>
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
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                    Vigente
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                    {{ oportunidad.etapaOportunidad }}
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                    back
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                    front
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                    {{ oportunidad.telefonoContacto }}
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-black-emphasis">
                    CLIENTE {{ oportunidad.tipoCliente }}
                  </td>
                  <td class="shadow-none lh-1 fw-medium text-body-tertiary text-end pe-0">
                    <button class="btn btn-primary btn-sm" @click="routerUpdateOportunidades(oportunidad.id)">
                      Editar
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="d-grid gap-2 d-md-flex justify-content-md-end mb-3 mt-2">
            <PaginationNumbers :currentPages="currentPages" :totalPages="totalPages" :totalRegister="totalRegister"
              @page-Changed="getPage" />
          </div>
        </div>
      </div>
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