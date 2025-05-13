// import { ref, Ref } from "vue";
// //import { useQuery } from "@tanstack/vue-query";
// import router from "@/router";
// import { storeToRefs } from "pinia";
// import { useClienteStore } from "@/modules/Clientes/store/useClienteStore";
// //import { useAuthStore } from "@/modules/Auth/store/useAuthStore";
// //import Swal from "sweetalert2";
// import api from "@/api/Api";
// import type { AxiosResponse } from "axios";

// // Interfaces para tipos de datos
// interface Empresa {
//   id: number;
//   [key: string]: any;
// }

// interface Almacen {
//   id: number;
//   idEmpresa: number;
//   idTipoSucursal: number;
//   nombre: string;
//   telefono: string;
//   direccion: string;
//   codigoEstablecimiento: string;
//   activo: boolean;
//   [key: string]: any;
// }

// interface InfoAlmacen {
//   id: number;
//   activo: boolean;
//   idEmpresa: number;
//   idTipoSucursal: number;
//   nombre: string;
//   telefono: string;
//   direccion: string;
//   codigoEstablecimiento: string;
// }

// interface ApiResponse {
//   tipoResultado: boolean;
//   mensaje: string;
//   [key: string]: any;
// }

// interface PaginationResponse {
//   data: Almacen[];
//   totalPages: number;
//   totalRecords: number;
//   [key: string]: any;
// }

// interface InfoFiltro {
//   page: number;
//   size: number;
//   idsEmpresa: string;
//   nombre: string | null;
// }

// // Configuración de SweetAlert2
// // const toast = Swal.mixin({
// //   buttonsStyling: false,
// //   target: "#page-container",
// //   customClass: {
// //     confirmButton: "btn btn-success m-1",
// //     cancelButton: "btn btn-danger m-1",
// //     input: "form-control",
// //   },
// // });

// // const swalSuccess = (message: string): void => {
// //   toast.fire({
// //     title: "Guardado",
// //     text: message,
// //     icon: "success",
// //     showConfirmButton: false,
// //     timer: 1500,
// //   });
// // };

// // Stores
// const store = useClienteStore();
// //const storeAuth = useAuthStore();
// //const listaEmpresas: Ref<Empresa[]> = ref(storeAuth.listaEmpresas);
// const nombreComboDinamico = ref<string>("Tipo Sucursal");
// const nombreAlmacen = ref<string | null>(null);
// const placeholder = ref<string>("Tipo Almacén");
// const selectedEmpresas = ref<Empresa[]>();
// //const idEmpresaSession = localStorage.getItem("IdEmpresa");

// // Filtro inicial de empresas
// // const idempresadefault = listaEmpresas.value.filter(
// //   (option: Empresa) => option.id === parseInt(idEmpresaSession || "0")
// // );
// // selectedEmpresas.value = idempresadefault;

// // Función para obtener almacenes paginados
// const getAlmacenes = async (page: number): Promise<Almacen[]> => {
//   await new Promise((resolve) => {
//     setTimeout(() => resolve(true), 1000);
//   });

//   const size = 10;
//   const { totalPages, totalRegister } = storeToRefs(store);

//   const { data }: AxiosResponse<PaginationResponse> = await api.post("/api/admin/Almacen/Paginado", {
//     page,
//     size,
//     idsEmpresa: selectedEmpresas.value
//       ?.map((x: Empresa) => x.id)
//       .join(","),
//     nombre: nombreAlmacen.value,
//   } as InfoFiltro);

//   totalPages.value = data.totalPages;
//   totalRegister.value = data.totalRecords;
//   return data.data;
// };

// export const useCliente = () => {
//   // State
//   const disabled = ref<boolean>(true);
//   const activo = ref<boolean>(true);
//   const nombre = ref<string>("");
//   const telefono = ref<string>("");
//   const direccion = ref<string>("");
//   const codigoEstablecimiento = ref<string>("");
//   const idEmpresa = ref<number[]>([]);
//   const selected = ref<number | null>(null);
//   const idTipoSucursal = ref<number>(0);
//   const showmodal = ref<boolean>(false);
//   const nombreTabla = ref<string>("Almacén");

//   // Métodos
//   const BuscarFiltros = (): void => {
//     const infoAlmacenlist: InfoFiltro = {
//       page: 1,
//       size: 10,
//       idsEmpresa: selectedEmpresas.value
//         ?.map((x: Empresa) => x.id)
//         .join(",") || "",
//       nombre: nombreAlmacen.value || "",
//     };
//     store.BusquedaPaginado(infoAlmacenlist);
//   };

//   const addAlmacen = async (): Promise<void> => {
//     const infoAlmacen: InfoAlmacen = {
//       id: 0,
//       activo: activo.value,
//       idEmpresa: idEmpresa.value[0] || 0,
//       idTipoSucursal: idTipoSucursal.value,
//       nombre: nombre.value,
//       telefono: telefono.value,
//       direccion: direccion.value,
//       codigoEstablecimiento: codigoEstablecimiento.value,
//     };

//     const res: ApiResponse = await store.saveAlmacen(infoAlmacen, 1);

//     if (res.tipoResultado) {
//       //swalSuccess(res.mensaje);
//       router.push({ name: "administracion-listalmacenes" });
//     } else {
//       console.log("Error al guardar", res.mensaje);
//     }
//   };

//   const LogAcciones = (): void => {
//     showmodal.value = true;
//   };

// //   const getIdAlmacen = (value: string): void => {
// //     store.getAlmacen(parseInt(value)).then((data: Almacen) => {
// //       idEmpresa.value = [data.idEmpresa];
// //       idTipoSucursal.value = data.idTipoSucursal;
// //       selected.value = data.idTipoSucursal;
// //       nombre.value = data.nombre;
// //       telefono.value = data.telefono;
// //       direccion.value = data.direccion;
// //       codigoEstablecimiento.value = data.codigoEstablecimiento;
// //       activo.value = data.activo;
// //     });
// //   };

//   const ListAlmacenes = (): void => {
//     router.push({ name: "administracion-listalmacenes" });
//   };

//   const updateAlmacen = async (id: number): Promise<void> => {
//     const infoAlmacen: InfoAlmacen = {
//       id: id,
//       activo: activo.value,
//       idEmpresa: idEmpresa.value[0] || 0,
//       idTipoSucursal: idTipoSucursal.value,
//       nombre: nombre.value,
//       telefono: telefono.value,
//       direccion: direccion.value,
//       codigoEstablecimiento: codigoEstablecimiento.value,
//     };

//     const res: ApiResponse = await store.saveAlmacen(infoAlmacen, 2);

//     if (res.tipoResultado) {
//       //swalSuccess(res.mensaje);
//       router.push({ name: "administracion-listalmacenes" });
//     } else {
//       console.log("Error al guardar", res.mensaje);
//     }
//   };

//   const Editar = (): void => {
//     disabled.value = false;
//   };

//   const changeValorEmpresa = (val: Event): void => {
//     const target = val.target as HTMLSelectElement;
//     idEmpresa.value = [parseInt(target.value)];
//   };

//   const getIdValor = (val: number): void => {
//     idTipoSucursal.value = val;
//   };

//   // Rutas
//   const routerAddAlmacen = (): void => {
//     router.push({ name: "administracion-addalmacenes" });
//   };

//   const routerUpdateAlmacenes = (val: number): void => {
//     router.push({
//       name: "administracion-updatealmacenes",
//       params: { id: val.toString() },
//     });
//   };

//   // Paginación y query
//   const { currentPages, totalPages, totalRegister, almaceneslist } = storeToRefs(store);

// //   const { isLoading } = useQuery(
// //     ["almacenes?page=", currentPages],
// //     () => getAlmacenes(currentPages.value),
// //     {
// //       onSuccess: (response: Almacen[]) => {
// //         store.setAlmacenes(response);
// //       },
// //     }
// //   );

//   return {
//     // State
//     //isLoading,
//     almaceneslist,
//     currentPages,
//     totalPages,
//     totalRegister,
//     //listaEmpresas,
//     nombreComboDinamico,
//     selectedEmpresas,
//     activo,
//     nombre,
//     telefono,
//     direccion,
//     codigoEstablecimiento,
//     idEmpresa,
//     selected,
//     placeholder,
//     nombreAlmacen,
//     disabled,
//     nombreTabla,
//     showmodal,

//     // Métodos
//     ListAlmacenes,
//     routerAddAlmacen,
//     routerUpdateAlmacenes,
//     Editar,
//     BuscarFiltros,
//     LogAcciones,
//     addAlmacen,
//     updateAlmacen,
//     //getIdAlmacen,
//     changeValorEmpresa,
//     getIdValor,
//     getPage: (page: number) => {
//       store.setPage(page);
//     },
//   };
// };

// export default useCliente;