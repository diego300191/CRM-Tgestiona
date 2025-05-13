import { ref, Ref, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import router from "@/router";
import { storeToRefs } from "pinia";
import { useClienteStore } from "@/modules/Clientes/store/useClienteStore";
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

interface InfoCliente {
  id: number;
  nombres: string;
  empresa: string;
  cargos: string;
  email: string;
  telefonos: string;
  selectedsector: number;
  selectedFront: number;
  tipoCliente: string;
  activo: boolean;
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

interface InfoFiltro {
  page: number;
  size: number;
  nombre: string | null;
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
const store = useClienteStore();
//const storeAuth = useAuthStore();
//const listaEmpresas: Ref<Empresa[]> = ref(storeAuth.listaEmpresas);
const nombreComboDinamico = ref<string>("Tipo Sucursal");
const nombreBusqueda = ref<string | null>(null);
const placeholder = ref<string>("Tipo Almacén");
const selectedEmpresas = ref<Empresa[]>();
//const idEmpresaSession = localStorage.getItem("IdEmpresa");

// Filtro inicial de empresas
// const idempresadefault = listaEmpresas.value.filter(
//   (option: Empresa) => option.id === parseInt(idEmpresaSession || "0")
// );
// selectedEmpresas.value = idempresadefault;

// Función para obtener Clientees paginados
const getClientes = async (page: number): Promise<Cliente[]> => {
  await new Promise((resolve) => {
    setTimeout(() => resolve(true), 1000);
  });

  const size = 10;
  const { totalPages, totalRegister } = storeToRefs(store);

  const { data }: AxiosResponse<PaginationResponse> = await api.post(
    "/api/admin/Cliente/Paginado",
    {
      page,
      size,
      nombre: nombreBusqueda.value,
    } as InfoFiltro
  );

  totalPages.value = data.totalPages;
  totalRegister.value = data.totalRecords;
  return data.data;
};

export const useCliente = () => {
  // State
  const disabled = ref<boolean>(true);
  const nombres = ref<string>("");
  const empresa = ref<string>("");
  const cargos = ref<string>("");
  const email = ref<string>("");
  const telefonos = ref<string>("");
  const selectedsector = ref<number>(0);
  const selectedFront = ref<number>(0);
  const clienteActual = ref<string>("Almacén");
  const showmodal = ref<boolean>(false);
  type ClienteType = "actual" | "nuevo";

  // Variable reactiva con valor inicial
  const tipoCliente = ref<ClienteType>("actual");
  // Métodos
  const BuscarFiltros = (): void => {
    const infoClientelist: InfoFiltro = {
      page: 1,
      size: 10,
      nombre: nombreBusqueda.value || "",
    };
    store.BusquedaPaginado(infoClientelist);
  };

  const addCliente = async (): Promise<void> => {
    debugger;
    const infoCliente: InfoCliente = {
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
  const { currentPages, totalPages, totalRegister, clienteslist } =
    storeToRefs(store);

  // Configuración de la query
  const { isLoading, data: clientes } = useQuery({
    queryKey: ["clientes", currentPages.value],
    queryFn: () => getClientes(currentPages.value),
    // Opciones disponibles en Vue Query
    staleTime: 1000 * 60 * 5, // 5 minutos hasta considerar stale
    gcTime: 1000 * 60 * 10, // 10 minutos en caché
  });

  // Observar cambios en los datos y actualizar el store
  watch(
    clientes,
    (newClientes) => {
      if (newClientes) {
        store.setClientes(newClientes);
      }
    },
    { immediate: true }
  );

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
    selectedsector,
    selectedFront,
    clienteActual,
    nombreBusqueda,
    disabled,
    showmodal,
    frontOptions,
    tipoCliente,
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

export default useCliente;
