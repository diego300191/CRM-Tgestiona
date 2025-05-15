import { ref, Ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import router from "@/router";
import { storeToRefs } from "pinia";
import { useOportunidaStore } from "@/modules/Oportunidades/store/useOportunidadStore";
import { InfoobjOportunidad, InfoFiltro } from "../interfaces/index";
//import { useAuthStore } from "@/modules/Auth/store/useAuthStore";
//import Swal from "sweetalert2";
import api from "@/api/Api";
import type { AxiosResponse } from "axios";

// Interfaces para tipos de datos
interface Empresa {
  id: number;
  [key: string]: any;
}

interface Cliente {
  id: number;
  idEmpresa: number;
  idTipoSucursal: number;
  nombre: string;
  telefono: string;
  direccion: string;
  codigoEstablecimiento: string;
  activo: boolean;
  [key: string]: any;
}

interface ApiResponse {
  tipoResultado: boolean;
  mensaje: string;
  [key: string]: any;
}

interface PaginationResponse {
  data: Cliente[];
  totalPages: number;
  totalRecords: number;
  [key: string]: any;
}

// Configuración de SweetAlert2
// const toast = Swal.mixin({
//   buttonsStyling: false,
//   target: "#page-container",
//   customClass: {
//     confirmButton: "btn btn-success m-1",
//     cancelButton: "btn btn-danger m-1",
//     input: "form-control",
//   },
// });

// const swalSuccess = (message: string): void => {
//   toast.fire({
//     title: "Guardado",
//     text: message,
//     icon: "success",
//     showConfirmButton: false,
//     timer: 1500,
//   });
// };

interface FrontOption {
  value: number;
  label: string;
}

// Stores
const store = useOportunidaStore();
//const storeAuth = useAuthStore();
//const listaEmpresas: Ref<Empresa[]> = ref(storeAuth.listaEmpresas);
const nombreComboDinamico = ref<string>("Tipo Sucursal");
const nombreBusqueda = ref<string | null>("");
const placeholder = ref<string>("Seleccionar...");
const selectedEmpresas = ref<Empresa[]>();
//const idEmpresaSession = localStorage.getItem("IdEmpresa");

// Filtro inicial de empresas
// const idempresadefault = listaEmpresas.value.filter(
//   (option: Empresa) => option.id === parseInt(idEmpresaSession || "0")
// );
// selectedEmpresas.value = idempresadefault;

// Función para obtener Clientees paginados
const getOportunidad = async (page: number): Promise<Cliente[]> => {
  await new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000);
  });

  const size = 10;
  const { totalPages, totalRegister } = storeToRefs(store);

  const filters: InfoFiltro = {
    id: 1,
    nombre: nombreBusqueda.value || "",
    activo: true,
    idSector: -1,
    idTipoCliente: -1,
    pagina: {
      page: 1,
      pageSize: size,
    },
  };

  const { data }: AxiosResponse<PaginationResponse> = await api.post(
    "/Common/ListaCliente",
    filters
  );

  totalPages.value = 10;
  totalRegister.value = data.totalRecord;
  return data.body;
};

export const useOportunidad = () => {
  // State
  const disabled = ref<boolean>(true);
  const nombres = ref<string>("");
  const empresa = ref<string>("");
  const cargos = ref<string>("");
  const email = ref<string>("");
  const telefonos = ref<string>("");
  const selectedsector = ref<number>(0);
  const selectedFront = ref<number>(0);
  const showmodal = ref<boolean>(false);
  type ClienteType = "actual" | "nuevo";
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

  // Variable reactiva con valor inicial
  const tipoCliente = ref<ClienteType>("actual");
  // Métodos
  const BuscarFiltros = (): void => {
    const filters: InfoFiltro = {
      id: 0,
      nombre: nombreBusqueda.value || "",
      activo: true,
      idSector: -1,
      idTipoCliente: -1,
      pagina: {
        page: 1,
        pageSize: 10,
      },
    };

    store.BusquedaPaginado(filters);
  };

  const addCliente = async (): Promise<void> => {
    const infoCliente: InfoobjOportunidad = {
      id: 0,
      nombres: nombres.value,
      empresa: empresa.value,
      cargos: cargos.value,
      email: email.value,
      telefonos: telefonos.value,
      selectedsector: selectedsector.value,
      selectedFront: selectedFront.value,
      tipoCliente: tipoCliente.value,
      activo: true,

      // "Id":0,
      //  "IdSector":selectedsector.value,
      //  "IdTipoCliente":tipoCliente.value,
      //  "Codigo":"",
      // "NombreCorto":empresa.value,
      // "Nombre":nombres.value,
      // "Contacto": cargos.value ,
      // "TelefonoContacto":telefonos.value,
      // "EmailContacto":email.value,
      //  "Activo":true,
      //  "IdUsuarioRegistro":12
    };

    console.log(infoCliente);

    // const res: ApiResponse = await store.saveCliente(infoCliente, 1);
    // if (res.tipoResultado) {
    //   //swalSuccess(res.mensaje);
    //   router.push({ name: "administracion-listClientees" });
    // } else {
    //   console.log("Error al guardar", res.mensaje);
    // }
  };

  const frontOptions = ref<FrontOption[]>([
    { value: 1, label: "Opción 1" },
    { value: 2, label: "Opción 2" },
    { value: 3, label: "Opción 3" },
  ]);

  const LogAcciones = (): void => {
    showmodal.value = true;
  };

  //   const getIdCliente = (value: string): void => {
  //     store.getCliente(parseInt(value)).then((data: Cliente) => {
  //       idEmpresa.value = [data.idEmpresa];
  //       idTipoSucursal.value = data.idTipoSucursal;
  //       selected.value = data.idTipoSucursal;
  //       nombre.value = data.nombre;
  //       telefono.value = data.telefono;
  //       direccion.value = data.direccion;
  //       codigoEstablecimiento.value = data.codigoEstablecimiento;
  //       activo.value = data.activo;
  //     });
  //   };

  const ListClientees = (): void => {
    router.push({ name: "administracion-listClientees" });
  };

  const Editar = (): void => {
    disabled.value = false;
  };

  // Rutas
  const routerAddCliente = (): void => {
    router.push({ name: "administracion-addClientees" });
  };

  const routerUpdateClientees = (val: number): void => {
    router.push({
      name: "administracion-updateClientees",
      params: { id: val.toString() },
    });
  };

  // Paginación y query
  const { currentPages, totalPages, totalRegister, oportunidadlist } =
    storeToRefs(store);

  // Configuración de la query
  const { isLoading, data: oportunidades } = useQuery({
    queryKey: ["oportunidades", currentPages.value],
    queryFn: () => getOportunidad(currentPages.value),
    // Opciones disponibles en Vue Query
    staleTime: 1000 * 60 * 5, // 5 minutos hasta considerar stale
    gcTime: 1000 * 60 * 10, // 10 minutos en caché
  });

  // Observar cambios en los datos y actualizar el store
  watch(
    oportunidades,
    (newOportunidades) => {
      if (newOportunidades) {
        store.setOportunidades(newOportunidades);
      }
    },
    { immediate: true }
  );

  return {
    // State
    isLoading,
    oportunidadlist,
    currentPages,
    totalPages,
    totalRegister,
    //listaEmpresas,
    nombreComboDinamico,
    selectedEmpresas,
    nombres,
    empresa,
    cargos,
    email,
    telefonos,
    selectedsector,
    selectedFront,
    nombreBusqueda,
    disabled,
    showmodal,
    frontOptions,
    tipoCliente,
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
    // Métodos
    ListClientees,
    routerAddCliente,
    routerUpdateClientees,
    Editar,
    BuscarFiltros,
    LogAcciones,
    addCliente,

    //getIdCliente,

    getPage: (page: number) => {
      store.setPage(page);
    },
  };
};

export default useOportunidad;
