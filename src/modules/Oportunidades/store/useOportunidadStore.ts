import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/Api";
import type { AxiosResponse } from "axios";
import { InfoobjOportunidad, PaginationData,InfoFiltro,InfoOportunidadPaginado } from '../interfaces/index';


export const useOportunidaStore = defineStore(
  "useOportunidad",
  () => {
    // Estado tipado
    const currentPages = ref<number>(1);
    const totalPages = ref<number>(0);
    const oportunidadlist = ref<InfoOportunidadPaginado[]>([]);
    const totalRegister = ref<number>(0);

    // Acciones
    const setOportunidades = (newOportunidades: InfoOportunidadPaginado[]): void => {
      oportunidadlist.value = newOportunidades;
    };

    const setPage = (page: number): void => {
      if (currentPages.value === page) return;
      if (page <= 0) return;
      currentPages.value = page;
    };

  const saveOportunidad = async (objOportunidad: InfoobjOportunidad): Promise<any> => {
  try {
    const { data }: AxiosResponse = await api.post("/Oportunidad/RegistrarOportunidad", { ...objOportunidad });
    return data;
  } catch (error) {
    console.error("Error al guardar Paciente:", error);
    throw error;
  }
};

    const BusquedaPaginado = async (infoFiltroBusqueda: InfoFiltro): Promise<void> => {
      try {
        oportunidadlist.value = [];
        const { data }: AxiosResponse<PaginationData> = await api.post("/Oportunidad/ListaOportunidad", {
          ...infoFiltroBusqueda,
        });

        oportunidadlist.value = data.body;
        totalPages.value = 10;
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
      oportunidadlist,
      totalRegister,

      // Actions
      setOportunidades,
      setPage,
      saveOportunidad,
      BusquedaPaginado,
      
    };
  }
);