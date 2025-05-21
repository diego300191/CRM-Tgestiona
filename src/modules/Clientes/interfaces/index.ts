export interface InfoCliente {
  Id: number;
  IdSector: number;
  IdTipoCliente: number;
  Codigo:string;
  NombreCorto:string;
  Nombre: string;
  Contacto: string;
  Cargo: string;
  EmailContacto: string;
  TelefonoContacto: string;
  IdUserFront: number;
  Activo: boolean;
  IdUsuarioRegistro: number;
}

export interface InfoClientePaginado {
activo : boolean;
codigo: string;
contacto : string;
emailContacto : string;
id : number;
idSector:number;
sector:string;
idTipoCliente : number;
tipoCliente:string;
nombre:string;
nombreCorto : string;
telefonoContacto:string;
cargo:string;
}


export interface PaginationData {
  body: InfoClientePaginado[];
  totalPage: number;
  totalRecord: number;
}

interface Pagina {
  page: number;
  pageSize: number;
}

export interface InfoFiltro {
  id?: number;
  nombre?: string;
  activo?: boolean;
  idSector?: number;
  idTipoCliente?: number;
  pagina?: Pagina;
}