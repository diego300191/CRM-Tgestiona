import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/Api";
import type { AxiosResponse } from "axios";

// Define interfaces para los tipos de datos
interface Almacen {
  id?: number;
  // Agrega aquí todas las propiedades de un almacén
  [key: string]: any;
}

interface PaginationData {
  data: Almacen[];
  totalPages: number;
  totalRecords: number;
}

interface InfoFiltroBusqueda {
  // Define la estructura de tus filtros de búsqueda
  [key: string]: any;
}

interface ValFormEmpresa {
  // Define la estructura del formulario de empresa
  [key: string]: any;
}

export const useClienteStore = defineStore(
  "useCliente",
  () => {
    // Estado tipado
    const currentPages = ref<number>(1);
    const totalPages = ref<number>(0);
    const almaceneslist = ref<Almacen[]>([]);
    const totalRegister = ref<number>(0);

    // Acciones
    const setAlmacenes = (newAlmacenes: Almacen[]): void => {
      almaceneslist.value = newAlmacenes;
    };

    const setPage = (page: number): void => {
      if (currentPages.value === page) return;
      if (page <= 0) return;
      currentPages.value = page;
    };

    const saveAlmacen = async (valFormEmpresa: ValFormEmpresa, Tipo: number): Promise<any> => {
      try {
        const endpoint = Tipo === 1 ? "/api/admin/Almacen" : "/api/admin/Almacen";
        const method = Tipo === 1 ? api.post : api.put;
        const { data }: AxiosResponse = await method(endpoint, { ...valFormEmpresa });
        return data;
      } catch (error) {
        console.error("Error al guardar almacén:", error);
        throw error;
      }
    };

    const BusquedaPaginado = async (infoFiltroBusqueda: InfoFiltroBusqueda): Promise<void> => {
      try {
        almaceneslist.value = [];
        const { data }: AxiosResponse<PaginationData> = await api.post("/api/admin/Almacen/Paginado", {
          ...infoFiltroBusqueda,
        });
        almaceneslist.value = data.data;
        totalPages.value = data.totalPages;
        totalRegister.value = data.totalRecords;
      } catch (error) {
        console.error("Error en búsqueda paginada:", error);
        throw error;
      }
    };

    const getAlmacen = async (id: number): Promise<Almacen> => {
      try {
        const { data }: AxiosResponse<Almacen> = await api.get(`/api/admin/Almacen/${id}`);
        return data;
      } catch (error) {
        console.error(`Error al obtener almacén con ID ${id}:`, error);
        throw error;
      }
    };

    return {
      // State
      currentPages,
      totalPages,
      almaceneslist,
      totalRegister,

      // Actions
      setAlmacenes,
      setPage,
      saveAlmacen,
      BusquedaPaginado,
      getAlmacen,
    };
  }
);