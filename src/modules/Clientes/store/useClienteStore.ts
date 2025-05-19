import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/Api";
import type { AxiosResponse } from "axios";
import { InfoCliente, PaginationData, InfoFiltro,InfoClientePaginado } from "../interfaces/index";


export const useClienteStore = defineStore("useCliente", () => {
  // Estado tipado
  const currentPages = ref<number>(1);
  const totalPages = ref<number>(0);
  const clienteslist = ref<InfoClientePaginado[]>([]);
  const totalRegister = ref<number>(0);
  const selectedClientId = ref<number>(0);
  const nombrecliente = ref<string | null>(null);

  // Acciones
  const setClientes = (newClientes: InfoClientePaginado[]): void => {
    clienteslist.value = newClientes;
  };

  const setPage = (page: number): void => {
    if (currentPages.value === page) return;
    if (page <= -1) return;
    currentPages.value = page;
  };

  const saveCliente = async (objCliente: InfoCliente): Promise<any> => {
    try {
      const { data }: AxiosResponse = await api.post(
        "/Common/RegistrarCliente",
        { ...objCliente }
      );
      return data;
    } catch (error) {
      console.error("Error al guardar Cliente:", error);
      throw error;
    }
  };

  const getClienteStore = async (IdCliente: number): Promise<any> => {
    try {
      const { data }: AxiosResponse = await api.get(
        `/Common/ObtenerCliente/${IdCliente}`
      );
      return data;
    } catch (error) {
      console.error("Error al obtener el Cliente:", error);
      throw error;
    }
  };

  const BusquedaPaginado = async (
    infoFiltroBusqueda: InfoFiltro
  ): Promise<void> => {
    try {
      clienteslist.value = [];
      const { data }: AxiosResponse<PaginationData> = await api.post(
        "/Common/ListaCliente",
        {
          ...infoFiltroBusqueda,
        }
      );

      clienteslist.value = data.body;
      totalPages.value = data.totalPage + 1;
      totalRegister.value = data.totalRecord;
    } catch (error) {
      console.error("Error en búsqueda paginada:", error);
      throw error;
    }
  };

  return {
    // State
    currentPages,
    totalPages,
    clienteslist,
    totalRegister,
    selectedClientId,
    nombrecliente,
    // Actions
    setClientes,
    setPage,
    saveCliente,
    BusquedaPaginado,
    getClienteStore,
  };
});
