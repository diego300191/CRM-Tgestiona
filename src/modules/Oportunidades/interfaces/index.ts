export interface InfoobjOportunidad {
  id: number|null;
  codigo: string;
  idCliente: number;
  idEtapaOportunidad: number;
  idFuenteOrigen: number;
  idTipoProspeccion: number;
  idTipoMedio: number;
  idUnidad: number;
  idTipoSolucionFM: number;
  idSubTipoSolucionFM: number;
  idUsuarioBack: number;
  idUsuarioFront: number;
  idUsuarioEntrega: number;
  importe: number;
  marge: number;
  detalle: string;
  servicio: string;
  activo: boolean;
  idUsuarioRegistro: number;
}


export interface InfoOportunidadPaginado {
  id: number;
  codigo: string;
  idcliente: number;
  cliente: string;
  telefonoContacto: string;
  idTipoCliente: number;
  tipoCliente: string;
  idEstadoOportunidad: number;
  etapaOportunidad: string;
  idFuenteOrigen: number;
  idTipoProspeccion: number;
  idTipoMedio: number;
  idUnidad: number;
  idTipoSolucionFm: number;
  idSubTipoSolucionFm: number;
  idUsuarioBack: number;
  idUsuarioFrom: number;
  idusuarioentrega: number;
  importe: number;
  marge: number;
  detalle: string;
  servicio: string;
  activo: boolean;
  idUsuarioRegistro: number;
  fechaRegistro: Date; 
  usuarioBack: string;
  usuarioFront: string;
}


export interface PaginationData {
  body: InfoOportunidadPaginado[];
  totalPages: number;
  totalRecord: number;
}

export interface PaginationResponse {
  data: InfoOportunidadPaginado[];
  totalPages: number;
  totalRecords: number;
  [key: string]: any;
}


interface Pagina {
  page: number;
  pageSize: number;
}

export interface InfoFiltro {
  IdEtapaOportunidad?: number;
  IdCliente?: number;
  IdSubTipoSolucionFm?: number;
  Activo?: boolean;
  pagina?: Pagina;
}

export interface MaestraItem {
  id: number;
  nombre: string;
  valorNumerico1: number | null;
}