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
  UsuarioCosteador: string;
  importe: number;
  marge: number;
  detalle: string;
  servicio: string;
  activo: boolean;
  idUsuarioRegistro: number;
  idVigencia : number;

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
  usuarioCosteador: string;
  importe: number;
  marge: number;
  detalle: string;
  servicio: string;
  activo: boolean;
  idUsuarioRegistro: number;
  fechaRegistro: Date; 
  usuarioBack: string;
  usuarioFront: string;
  idVigencia: number,
  vigencia: string
}


export interface PaginationData {
  body: InfoOportunidadPaginado[];
  Page: number;
  totalRecord: number;
}

export interface PaginationResponse {
  data: InfoOportunidadPaginado[];
  totalPages: number;
  totalRecords: number;
  [key: string]: any;
}


export interface infoActividadesOportunidad{
  id: number,
  tipoGestion:string,
  comentario: string,
  idOportunidad: number,
  IdEtapaOportunidad: number,
  idUsuarioRegistro: number,
  FechaActividad: null,
  activo: boolean
}


export interface infoHistorialHorasOportunidad{
  id: number,
  descripcion: string,
  idOportunidad: number,
  fecha: string|null,
  hora: number,
  usuarioRegistro: number,
  usuarioHoras: string,
  activo: boolean
}


export interface responseActividadOportunidad {
  id:number,
idOportunidad: number,
idEtapaOportunidad: number,
tipoGestion: string,
comentario: string,
activo: true,
idUsuarioRegistro: number,
usuarioRegistro: string,
fechaActividad: null,
fechaRegistro:Date,
}


interface Pagina {
  page: number;
  pageSize: number;
}

export interface InfoFiltro {
  idEtapaOportunidad?: number;
  idCliente?: number;
  idTipoCliente?:number;
  idSector?:number;
  idUsuarioBack?:number;
  idUsuarioFront?:number;
  idSubTipoSolucionFm?: number;
  activo?: boolean;
  pagina?: Pagina;
}

export interface MaestraItem {
  id: number;
  nombre: string;
  valorNumerico1: number | null;
}