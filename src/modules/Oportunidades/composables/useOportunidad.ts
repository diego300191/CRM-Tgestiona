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
  infoActividadesOportunidad,
  responseActividadOportunidad,
  infoHistorialHorasOportunidad,
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
      idEtapaOportunidad: -1,
      idCliente: -1,
      idTipoCliente: -1,
      idSector: -1,
      idUsuarioBack: -1,
      idUsuarioFront: -1,
      idSubTipoSolucionFm: -1,
      activo: true,
      pagina: {
        page: page,
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

  const { selectedClientId, nombrecliente } = storeToRefs(storeCliente);
  const { opcionesSubTipo, IdEstadoOportunidad } = storeToRefs(store);

  const disabled = ref<boolean>(true);
  const importe = ref<number>(0);
  const margen = ref<number>(0);
  const detalle = ref<string>("");
  const servicio = ref<string>("");

  //Llenado de los combos
  const IdMaestraFUENTEORIGEN = ref<number>(5);
  const IdMaestraPROSPECCION = ref<number>(2);
  const IdMaestraMEDIO = ref<number>(3);
  const IdMaestraUNIDAD = ref<number>(9);
  const IdMaestraBACK = ref<number>(1);
  const IdMaestraSubestado = ref<number>(1);
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
  const nombreMaestraSUBESTADO = ref<string>("SUB ESTADOS");

  const selectFUENTEORIGEN = ref<number>(0);
  const selectPROSPECCION = ref<number>(0);
  const selectMEDIO = ref<number>(0);
  const selectUNIDAD = ref<number>(0);
  const selectBACK = ref<number>(0);
  const selectPERSONAENCARGADA = ref<number>(0);
  const selectSOLUCIONFM = ref<number>(0);
  const selectSUBTIPOSOLUCIONFM = ref<number>(0);

  const NombreEstadoOportunidad = ref<string>("");
  const configuracionEtapaVal = ref<[]>([]);

  const descripcionActividad = ref<string>("");
  const tipoActividad = ref<string>("");
  const fechaActividad = ref<null>(null);
  const listaActividadesOportunidad = ref<responseActividadOportunidad>();
  const listaHistorialHorasOportunidad = ref<infoHistorialHorasOportunidad>();

  const descripcionHistorialHoras = ref<string>("");
  const horas = ref<number>(0);
  const fechaHistorialHoras = ref<null>(null);
  const IdUsuarioRegistroHistorial = ref<number>(1);

  const selectIdEtapaOportunidad = ref<number>(-1);
  const selectIdCliente = ref<number>(-1);
  const selectIdTipoCliente = ref<number>(-1);
  const selectIdSector = ref<number>(-1);
  const selectIdBack = ref<number>(-1);
  const selectIdFront = ref<number>(-1);
  const selectIdTipoSolucionFM = ref<number>(-1);
  const IdMaestraSECTOR = ref<number>(4);
  const nombreMaestraSECTOR = ref<string>("SECTOR");
  const IdVigencia = ref<number>(1);
  const NombreVigencia = ref<string>("");

  // Métodos
  const BuscarFiltros = (): void => {
    const filters: InfoFiltro = {
      idEtapaOportunidad: selectIdEtapaOportunidad.value == 0 ? -1 : selectIdEtapaOportunidad.value,
      idCliente: selectIdCliente.value,
      idTipoCliente: selectIdTipoCliente.value,
      idSector: selectIdSector.value == 0 ? -1 : selectIdSector.value,
      idUsuarioBack: selectIdBack.value,
      idUsuarioFront: selectIdFront.value,
      idSubTipoSolucionFm: selectIdTipoSolucionFM.value,
      activo: true,
      pagina: {
        page: 0,
        pageSize: 10,
      },
    };

    store.BusquedaPaginado(filters);
  };

  const addOportinidad = async (
    valorId: number,
    IdEstadoOportunidaval: number,
    IdVigencia: number,
  ): Promise<void> => {
    const infoOportunidad: InfoobjOportunidad = {
      id: valorId,
      codigo: "",
      idCliente: selectedClientId.value,
      idEtapaOportunidad: IdEstadoOportunidaval,
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
      idVigencia : IdVigencia,
    };
    
    const res: ApiResponse = await store.saveOportunidad(infoOportunidad);
    if (res.code === 200) {
      if (valorId == 0) {
        swalSuccess("Se Guardo Correctamente");
        routerUpdateOportunidades(res.body);
      } else {
        swalSuccess("Se Actualizo Correctamente");
        await getIdOportunidad(valorId);
      }
    } else {
      console.log("Error al guardar", res.mensaje);
    }
  };

  const addActividadesOportunidad = async (ValId: number): Promise<void> => {
    const objActividadOportunidad: infoActividadesOportunidad = {
      id: 0,
      tipoGestion: tipoActividad.value,
      comentario: descripcionActividad.value,
      idOportunidad: ValId,
      IdEtapaOportunidad: IdEstadoOportunidad.value,
      idUsuarioRegistro: 1,
      FechaActividad: fechaActividad.value,
      activo: true,
    };
    const res: ApiResponse = await store.saveActividadOportunidades(
      objActividadOportunidad
    );
    if (res.code === 200) {
      swalSuccess("Se Guardo Correctamente");
      await getActividadIdOportunidad(ValId);
      await getHistorialHorasIdOportunidad(ValId);
      tipoActividad.value = "";
      descripcionActividad.value = "";
      fechaActividad.value = null;
    } else {
      console.log("Error al guardar", res.mensaje);
    }
  };

  const addHistorialHorasOportunidad = async (ValId: number): Promise<void> => {
    const objHistorialHorasOportunidad: infoHistorialHorasOportunidad = {
      id: 0,
      descripcion: descripcionHistorialHoras.value,
      idOportunidad: ValId,
      fecha: fechaHistorialHoras.value,
      hora: horas.value,
      usuarioRegistro: 1,
      IdUsuarioHoras: IdUsuarioRegistroHistorial.value,
      activo: true,
    };

    const res: ApiResponse = await store.saveHistorialHorasOportunidadStore(
      objHistorialHorasOportunidad
    );
    if (res.code === 200) {
      swalSuccess("Se Guardo Correctamente");
      await getHistorialHorasIdOportunidad(ValId);
      tipoActividad.value = "";
      descripcionActividad.value = "";
      fechaActividad.value = null;
    } else {
      console.log("Error al guardar", res.mensaje);
    }
  };

  const frontOptions = ref<FrontOption[]>([
    { value: 1, label: "Opción 1" },
    { value: 2, label: "Opción 2" },
    { value: 3, label: "Opción 3" },
  ]);

  const getIdOportunidad = async (value: number): Promise<void> => {
    const res: ApiResponse = await store.getIdOportunidadStore(value);
    await getActividadIdOportunidad(value);
    await getHistorialHorasIdOportunidad(value);
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
      IdEstadoOportunidad.value = res.body.idEtapaOportunidad;
      NombreEstadoOportunidad.value = res.body.etapaOportunidad;
      nombrecliente.value = res.body.cliente;
      selectedClientId.value = res.body.idcliente;
      configuracionEtapaVal.value = res.body.configuracionEtapa;
      IdVigencia.value = res.body.idVigencia;
      NombreVigencia.value = res.body.vigencia;
    } else {
      console.log("Error al guardar", res.mensaje);
    }
  };

  const getActividadIdOportunidad = async (
    ValIdOportunidad: number
  ): Promise<void> => {
    const res: ApiResponse = await store.getActividadIdOportunidadStore(
      ValIdOportunidad
    );
    if (res.code === 200) {
      listaActividadesOportunidad.value = res.body;
    } else {
      console.log("Error al guardar", res.mensaje);
    }
  };
  const getHistorialHorasIdOportunidad = async (
    ValIdOportunidad: number
  ): Promise<void> => {
    const res: ApiResponse = await store.getHistorialHorasIdOportunidadStore(
      ValIdOportunidad
    );
    if (res.code === 200) {
      listaHistorialHorasOportunidad.value = res.body;
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
  const { isLoading, data: oportunidades } = useQuery({
    queryKey: ["oportunidades", currentPages, nombreBusqueda],
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
    configuracionEtapaVal,
    descripcionActividad,
    tipoActividad,
    fechaActividad,
    listaActividadesOportunidad,
    descripcionHistorialHoras,
    horas,
    fechaHistorialHoras,
    IdUsuarioRegistroHistorial,
    listaHistorialHorasOportunidad,
    selectIdEtapaOportunidad,
    selectIdCliente,
    selectIdTipoCliente,
    selectIdSector,
    selectIdBack,
    selectIdFront,
    selectIdTipoSolucionFM,
    IdMaestraSECTOR,
    nombreMaestraSECTOR,
    IdMaestraSubestado,
    nombreMaestraSUBESTADO,
    IdVigencia,
    NombreVigencia,
    // Métodos
    ListOportunidades,
    routerAddOportunidad,
    routerUpdateOportunidades,
    Editar,
    BuscarFiltros,
    addOportinidad,
    getIdOportunidad,
    addActividadesOportunidad,
    addHistorialHorasOportunidad,
    getHistorialHorasIdOportunidad,
    getPage: (page: number) => {
      store.setPage(page);
    },
  };
};

export default useOportunidad;
