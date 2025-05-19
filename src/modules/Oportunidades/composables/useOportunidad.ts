import { ref, Ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import router from "@/router";
import { storeToRefs } from "pinia";
import { useOportunidaStore } from "@/modules/Oportunidades/store/useOportunidadStore";
import { useClienteStore } from "@/modules/Clientes/store/useClienteStore";
import {
  InfoobjOportunidad,
  InfoFiltro,
  PaginationResponse,
  MaestraItem,
} from "../interfaces/index";
import Swal from "sweetalert2";
//import { useAuthStore } from "@/modules/Auth/store/useAuthStore";
//import Swal from "sweetalert2";
import api from "@/api/Api";
import type { AxiosResponse } from "axios";

// Interfaces para tipos de datos
interface Empresa {
  id: number;
  [key: string]: any;
}

interface ApiResponse {
  tipoResultado: boolean;
  mensaje: string;
  [key: string]: any;
}

//Configuración de SweetAlert2
const toast = Swal.mixin({
  buttonsStyling: false,
  target: "#page-container",
  customClass: {
    confirmButton: "btn btn-success m-1",
    cancelButton: "btn btn-danger m-1",
    input: "form-control",
  },
});

const swalSuccess = (message: string): void => {
  toast.fire({
    title: "Guardado",
    text: message,
    icon: "success",
    showConfirmButton: false,
    timer: 1500,
  });
};

interface FrontOption {
  value: number;
  label: string;
}

// Stores
const store = useOportunidaStore();
const storeCliente = useClienteStore();

const nombreComboDinamico = ref<string>("Tipo Sucursal");
const nombreBusqueda = ref<string | null>("");
const placeholder = ref<string>("Seleccionar...");

const getOportunidad = async (page: number) => {
  const { totalPages, totalRegister } = storeToRefs(store);
  try {
    const size = 10;
    const filters: InfoFiltro = {
    IdEstadoOportunidad: -1,
    IdCliente: -1,
    IdSubTipoSolucionFm: -1,
    Activo: true,
    pagina: {
      page: 0,
      pageSize: size,
    },
  };

    const { data } = await api.post<PaginationResponse>(
      "/Oportunidad/ListaOportunidad",
      filters
    );

    // Actualizar el store
    store.setOportunidades(data.body || []);
    totalPages.value = data.totalPage;
    totalRegister.value = data.totalRecord;
    return data.body;
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    throw error;
  }
};


export const useOportunidad = () => {
  // State

const { selectedClientId,    nombrecliente, } =    storeToRefs(storeCliente);
const { opcionesSubTipo } =    storeToRefs(store);

  const disabled = ref<boolean>(true);
  const importe = ref<number>(0);
  const margen = ref<number>(0);
  const detalle = ref<string>("");
  const servicio = ref<string>("");

  //Llenado de los combos
  const IdMaestraFUENTEORIGEN = ref<number>(5);
  const IdMaestraPROSPECCION = ref<number>(2);
  const IdMaestraMEDIO = ref<number>(3);
  const IdMaestraUNIDAD = ref<number>(1);
  const IdMaestraBACK = ref<number>(1);
  const IdMaestraPERSONAENCARGADA = ref<number>(1);
  const IdMaestraSOLUCIONFM = ref<number>(6);
  const IdMaestraSUBTIPOSOLUCIONFM = ref<number>(7);

  const nombreMaestraFUENTEORIGEN = ref<string>("FUENTE / ORIGEN");
  const nombreMaestraPROSPECCION = ref<string>("PROSPECCIÓN ");
  const nombreMaestraMEDIO = ref<string>("MEDIO");
  const nombreMaestraUNIDAD = ref<string>("UNIDAD");
  const nombreMaestraBACK = ref<string>("BACK");
  const nombreMaestraPERSONAENCARGADA = ref<string>("PERSONA ENCARGADA");
  const nombreMaestraSOLUCIONFM = ref<string>("SOLUCIÓN FM");
  const nombreMaestraSUBTIPOSOLUCIONFM = ref<string>("SUBTIPO SOLUCIÓN FM");

  const selectFUENTEORIGEN = ref<number>(0);
  const selectPROSPECCION = ref<number>(0);
  const selectMEDIO = ref<number>(0);
  const selectUNIDAD = ref<number>(0);
  const selectBACK = ref<number>(0);
  const selectPERSONAENCARGADA = ref<number>(0);
  const selectSOLUCIONFM = ref<number>(0);
  const selectSUBTIPOSOLUCIONFM = ref<number>(0);

  const IdEstadoOportunidad = ref<number>(0);
  const NombreEstadoOportunidad = ref<string>("");
  
  
  

  // Métodos
  const BuscarFiltros = (): void => {
    const filters: InfoFiltro = {
      IdEstadoOportunidad: -1,
      IdCliente: -1,
      IdSubTipoSolucionFm: -1,
      Activo: true,
      pagina: {
        page: 0,
        pageSize: 10,
      },
    };

    store.BusquedaPaginado(filters);
  };

  const addOportinidad = async (): Promise<void> => {
    const infoOportunidad: InfoobjOportunidad = {
      id: 0,
      codigo: "",
      idCliente: selectedClientId.value,
      idEstadoOportunidad: 1,
      idFuenteOrigen: selectFUENTEORIGEN.value,
      idTipoProspeccion: selectPROSPECCION.value,
      idTipoMedio: selectMEDIO.value,
      idUnidad: selectUNIDAD.value,
      idTipoSolucionFM: selectSOLUCIONFM.value,
      idSubTipoSolucionFM: selectSUBTIPOSOLUCIONFM.value,
      idUsuarioBack: selectBACK.value,
      idUsuarioFront: 0,
      idUsuarioEntrega: 0,
      importe: importe.value,
      marge: margen.value,
      detalle: detalle.value,
      servicio: servicio.value,
      activo: true,
      idUsuarioRegistro: 12,
    };

    console.log(infoOportunidad);

    // const res: ApiResponse = await store.saveOportunidad(infoOportunidad);
    // if (res.code === 200) {
    //   swalSuccess("Se Guardo Correctamente");
    //   routerUpdateOportunidades(res.body);
    // } else {
    //   console.log("Error al guardar", res.mensaje);
    // }
  };

  const frontOptions = ref<FrontOption[]>([
    { value: 1, label: "Opción 1" },
    { value: 2, label: "Opción 2" },
    { value: 3, label: "Opción 3" },
  ]);

  const getIdOportunidad = async (value: number): Promise<void> => {
    const res: ApiResponse = await store.getIdOportunidadStore(value);
    if (res.code === 200) {
      selectFUENTEORIGEN.value = res.body.idFuenteOrigen;
      selectPROSPECCION.value = res.body.idTipoProspeccion;
      selectMEDIO.value = res.body.idTipoMedio;
      selectUNIDAD.value = res.body.idUnidad;
      selectBACK.value = res.body.idUsuarioBack;
      selectPERSONAENCARGADA.value = res.body.idusuarioentrega;
      selectSOLUCIONFM.value = res.body.idTipoSolucionFm;
      selectSUBTIPOSOLUCIONFM.value = res.body.idSubTipoSolucionFm;
      importe.value = res.body.importe;
      margen.value = res.body.marge;
      detalle.value = res.body.detalle;
      servicio.value = res.body.servicio;
      IdEstadoOportunidad.value = 4//res.body.idEstadoOportunidad;
      NombreEstadoOportunidad.value = res.body.estadoOportunidad;
      nombrecliente.value = res.body.cliente;
      selectedClientId.value = res.body.idcliente;
    } else {
      console.log("Error al guardar", res.mensaje);
    }
  };

  const ListOportunidades = (): void => {
    router.push({ name: "Oportunidad-listOportunidad" });
  };

  const Editar = (): void => {
    disabled.value = false;
  };

  // Rutas
  const routerAddOportunidad = (): void => {
    router.push({ name: "Oportunidad-addOportunidad" });
  };

  const routerUpdateOportunidades = (val: number): void => {
    router.push({
      name: "Oportunidad-updateOportunidad",
      params: { id: val.toString() },
    });
  };

  // Paginación y query
  const { currentPages, totalPages, totalRegister, oportunidadlist } =
    storeToRefs(store);

  // Configuración de la query
    const {isLoading ,data: oportunidades } = useQuery({
      queryKey: ['oportunidades', currentPages, nombreBusqueda],
      queryFn: () => getOportunidad(currentPages.value),
    });
  
    // Observar cambios en los datos
    watch(oportunidades, (newOportunidades) => {
      if (newOportunidades) {
        store.setOportunidades(newOportunidades);
      }
    });

  return {
    // State
    isLoading,
    oportunidadlist,
    currentPages,
    totalPages,
    totalRegister,
    //listaEmpresas,
    nombreComboDinamico,
    nombreBusqueda,
    disabled,
    frontOptions,
    placeholder,
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
    importe,
    margen,
    detalle,
    servicio,
    IdEstadoOportunidad,
    NombreEstadoOportunidad,
    nombrecliente,
    selectedClientId,
    opcionesSubTipo,
    // Métodos
    ListOportunidades,
    routerAddOportunidad,
    routerUpdateOportunidades,
    Editar,
    BuscarFiltros,
    addOportinidad,
    getIdOportunidad,
    
    getPage: (page: number) => {
      store.setPage(page);
    },
  };
};

export default useOportunidad;
