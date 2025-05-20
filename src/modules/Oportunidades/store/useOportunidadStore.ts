import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/Api";
import type { AxiosResponse } from "axios";
import { InfoobjOportunidad, PaginationData,InfoFiltro,InfoOportunidadPaginado,MaestraItem } from '../interfaces/index';


export const useOportunidaStore = defineStore(
  "useOportunidad",
  () => {
    // Estado tipado
    const currentPages = ref<number>(0);
    const totalPages = ref<number>(0);
    const oportunidadlist = ref<InfoOportunidadPaginado[]>([]);
    const totalRegister = ref<number>(0);
    const changeSolucionFM = ref<number>(0);
    const opcionesSubTipo = ref<MaestraItem[]>([]);

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

const cargarSubTipos = async (IdMaestraSUBTIPOSOLUCIONFM : number,idchangesolucionFM:number) => {
  try {
    opcionesSubTipo.value = [];
    // Obtener datos de la API
    const { data } = await api.get<{ body: MaestraItem[] }>(
      `/Common/ObtenerMaestraDetalle/${IdMaestraSUBTIPOSOLUCIONFM}`
    );
    
    // Filtrar opciones por el valorNumerico1 (que debe coincidir con idSolucion)
    opcionesSubTipo.value = (data.body || []).filter(
      item => item.valorNumerico1 === idchangesolucionFM
    );
    
console.log(opcionesSubTipo.value);

  } catch (error) {
    console.error('Error al cargar subtipos:', error);
    opcionesSubTipo.value = [];
  }
};

  const getIdOportunidadStore = async (IdOportunidad: number): Promise<any> => {
    try {
      const { data }: AxiosResponse = await api.get(
        `/Oportunidad/ObtenerOportunidad/${IdOportunidad}`
      );
      return data;
    } catch (error) {
      console.error("Error al obtener el Cliente:", error);
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
      changeSolucionFM,
      opcionesSubTipo,

      // Actions
      setOportunidades,
      setPage,
      saveOportunidad,
      BusquedaPaginado,
      getIdOportunidadStore,
      cargarSubTipos,
      
    };
  }
);