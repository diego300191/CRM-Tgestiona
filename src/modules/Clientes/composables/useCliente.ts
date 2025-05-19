import { ref, Ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import router from "@/router";
import { storeToRefs } from "pinia";
import { useClienteStore } from "@/modules/Clientes/store/useClienteStore";
import { InfoCliente, InfoFiltro } from "../interfaces/index";
//import { useAuthStore } from "@/modules/Auth/store/useAuthStore";
import Swal from "sweetalert2";
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
const store = useClienteStore();
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
// const getClientes = async (page: number): Promise<void> => {
//   await new Promise((resolve) => {
//     setTimeout(() => resolve(true), 1000);
//   });

//   console.log(page);

//   const size = 10;
//   const { totalPages, totalRegister } = storeToRefs(store);

//   const filters: InfoFiltro = {
//     id: 1,
//     nombre: nombreBusqueda.value || "",
//     activo: true,
//     idSector: -1,
//     idTipoCliente: -1,
//     pagina: {
//       page: page -1,
//       pageSize: size,
//     },
//   };

//   const { data }: AxiosResponse<PaginationResponse> = await api.post(
//     "/Common/ListaCliente",
//     filters
//   );

//   totalPages.value = data.totalPage;
//   totalRegister.value = data.totalRecord;
//   return data.body;
// };

const getClientes = async (page: number) => {
  const { totalPages, totalRegister } = storeToRefs(store);
  try {
    const size = 10;
    const filters: InfoFiltro = {
      id: 1,
      nombre: nombreBusqueda.value || "",
      activo: true,
      idSector: -1,
      idTipoCliente: -1,
      pagina: {
        page: page - 1,
        pageSize: size,
      },
    };

    const { data } = await api.post<PaginationResponse>(
      "/Common/ListaCliente",
      filters
    );

    // Actualizar el store
    store.setClientes(data.body || []);
    totalPages.value = data.totalPage;
    totalRegister.value = data.totalRecord;
    return data.body;
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    throw error;
  }
};

export const useCliente = () => {
  const { selectedClientId, nombrecliente } = storeToRefs(store);
  // State
  const disabled = ref<boolean>(true);
  const nombres = ref<string>("");
  const empresa = ref<string>("");
  const cargos = ref<string>("");
  const email = ref<string>("");
  const telefonos = ref<string>("");
  const selectedFront = ref<number>(0);
  const IdMaestraSECTOR = ref<number>(4);
  const nombreMaestraSECTOR = ref<string>("SECTOR");
  const selectSECTOR = ref<number>(0);
  const showmodal = ref<boolean>(false);
  type ClienteType = "actual" | "nuevo";

  // Variable reactiva con valor inicial
  const tipoCliente = ref<ClienteType>("actual");
  // Métodos

  // En tu composable useCliente.ts
  const BuscarFiltros = async (sortField = "nombre", sortDirection = "asc") => {
    isLoading.value = true;
    try {
      // Añade los parámetros de ordenamiento a tu llamada API
      const filters: InfoFiltro = {
        id: 0,
        nombre: nombreBusqueda.value || "",
        activo: true,
        idSector: -1,
        idTipoCliente: -1,
        pagina: {
          page: 0,
          pageSize: 10,
        },
      };

      const response = await store.BusquedaPaginado(filters);
    } catch (error) {
      console.error(error);
    } finally {
      isLoading.value = false;
    }
  };

  const addCliente = async (IdCliente: number): Promise<void> => {
    const infoCliente: InfoCliente = {
      Id: IdCliente == null ? 0 : IdCliente,
      IdSector: selectSECTOR.value,
      IdTipoCliente: tipoCliente.value === "actual" ? 1 : 2,
      Codigo: "",
      NombreCorto: nombres.value,
      Nombre: nombres.value,
      Contacto: empresa.value,
      TelefonoContacto: telefonos.value,
      EmailContacto: email.value,
      Cargo: cargos.value,
      IdUserFront: selectedFront.value,
      Activo: true,
      IdUsuarioRegistro: 12,
    };

    const res: ApiResponse = await store.saveCliente(infoCliente);
    if (res.code === 200) {
      swalSuccess("Se Guardo Correctamente");
      router.push({ name: "administracion-listClientees" });
    } else {
      console.log("Error al guardar", res.mensaje);
    }
  };

  const getCliente = async (IdCliente: number): Promise<void> => {
    const res: ApiResponse = await store.getClienteStore(IdCliente);
    if (res.code === 200) {
      selectSECTOR.value = res.body.idSector;
      tipoCliente.value = res.body.idTipoCliente == 1 ? "actual" : "nuevo";
      nombres.value = res.body.nombre;
      empresa.value = res.body.contacto;
      telefonos.value = res.body.telefonoContacto;
      email.value = res.body.emailContacto;
      cargos.value = res.body.cargo;
      selectedFront.value = res.body.idUserFront;
    } else {
      console.log("Error al guardar", res.mensaje);
    }
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
  const { currentPages, totalPages, totalRegister, clienteslist } =
    storeToRefs(store);

 // Configuración de la query
  const {isLoading ,data: clientes } = useQuery({
    queryKey: ['clientes', currentPages, nombreBusqueda],
    queryFn: () => getClientes(currentPages.value),
  });

  // Observar cambios en los datos
  watch(clientes, (newClientes) => {
    if (newClientes) {
      store.setClientes(newClientes);
    }
  });

  return {
    // State
    isLoading,
    clienteslist,
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
    selectedFront,
    IdMaestraSECTOR,
    nombreMaestraSECTOR,
    selectSECTOR,
    nombreBusqueda,
    disabled,
    showmodal,
    frontOptions,
    tipoCliente,
    placeholder,
    selectedClientId,
    nombrecliente,
    // Métodos
    ListClientees,
    routerAddCliente,
    routerUpdateClientees,
    BuscarFiltros,
    LogAcciones,
    addCliente,
    getCliente,
    getPage: (page: number) => {
      store.setPage(page);
    },
  };
};

export default useCliente;
