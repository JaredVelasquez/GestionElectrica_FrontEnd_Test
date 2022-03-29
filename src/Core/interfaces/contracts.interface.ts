export interface ContractInterface{
    id: number;
    codigo: string;
    clasificacion: string;
    cliente: string; 
    actorId:number;
    exportacion: boolean;
    diaGeneracion: number;
    diasDisponibles: number;
    descripcion: string;
    fechaCreacion: string;
    fechaVenc: string;
    observacion: string;
    estado: boolean;
}

export interface ContractSchema{
  codigo: string;
  Clasificacion: string;
  descripcion: string;
  actorId: number;
  fechaCreacion: string;
  fechaVenc: string;
  diaGeneracion: number;
  diasDisponibles: number;
  exportacion: boolean;
  observacion: string;
  estado: boolean;
}