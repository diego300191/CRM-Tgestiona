export interface InfoobjOportunidad {
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


interface InfoClientePaginado {
activo : boolean;
codigo: string;
contacto : string;
emailContacto : string;
id : number;
idSector:number;
idTipoCliente : number;
nombre:string;
nombreCorto : string;
telefonoContacto:string;
}


export interface PaginationData {
  body: InfoClientePaginado[];
  totalPages: number;
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