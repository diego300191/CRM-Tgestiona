
<script lang="ts" setup>
import { ref } from "vue";
import stateStore from "@/utils/store";
import useCliente from "@/modules/Clientes/composables/useCliente";

const stateStoreInstance = stateStore;



const {
  clienteslist,
  nombreBusqueda,
  selectedClientId,
  nombrecliente,
  BuscarFiltros,
} = useCliente();

const searched = ref<boolean>(false);


const selectClient = (clientId: number,nombreCliente: string): void => {
  selectedClientId.value = clientId;
  nombrecliente.value = nombreCliente;
  console.log("Cliente seleccionado:", clientId);
};
</script>

<template>
  <div
    :class="['modal fade createNewModal', { show: stateStoreInstance.show }]"
    id="createNewCustomerModal"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content p-15 p-md-40">
        <div class="modal-header d-block ps-0 pe-0 pt-0 pb-15 pb-md-25">
          <h5 class="modal-title fw-bold text-black">
            {{ "BUSCAR CLIENTE" }}
          </h5>
        </div>
        <div class="modal-body ps-0 pe-0 pb-0 pt-15 pt-md-25">
          <div class="client-search-container">
            <!-- Formulario de búsqueda -->
            <div class="search-section mb-4">
              <div class="input-group">
                <input
                  v-model="nombreBusqueda"
                  type="text"
                  class="form-control"
                  placeholder="Ingrese nombre del cliente"
                  @keyup.enter="BuscarFiltros()"
                />
                <button
                  class="btn btn-primary"
                  type="button"
                  @click="BuscarFiltros()"
                >
                  <i class="bi bi-search"></i> Buscar
                </button>
              </div>
            </div>

            <!-- Tabla de resultados -->
            <div class="table-responsive" v-if="clienteslist.length > 0">
              <table class="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Nombre Cliente</th>
                    <th>Sector</th>
                    <th>Tipo Cliente</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cliente in clienteslist" :key="cliente.id">
                    <td>{{ cliente.nombre }}</td>
                    <td>{{ cliente.sector }}</td>
                    <td>{{ cliente.tipoCliente }}</td>
                    <td>
                      <button
                        class="btn btn-sm btn-success"
                        @click="selectClient(cliente.id,cliente.nombre)"
                      >
                        <i class="bi bi-plus-circle"></i> Agregar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Mensaje cuando no hay resultados -->
            <div
              v-if="searched && clienteslist.length === 0"
              class="alert alert-info"
            >
              No se encontraron clientes con ese nombre.
            </div>

            <!-- Cliente seleccionado (opcional) -->
            <div v-if="selectedClientId" class="mt-3 alert alert-success">
              Cliente seleccionado: ID {{ selectedClientId }}
            </div>
          </div>
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

<style scoped>
.client-search-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.search-section {
  max-width: 600px;
  margin: 0 auto;
}

.table {
  margin-top: 20px;
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}
</style>
