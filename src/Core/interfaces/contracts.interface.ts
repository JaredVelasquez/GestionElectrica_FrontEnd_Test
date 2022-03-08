export interface ContractInterface{
    id: number;
    codigo: string;
    clasificacion: string;
    actorId: number;
    cliente: string; 
    exportacion: boolean;
    diaGeneracion: number;
    diasDisponibles: number;
    descripcion: string;
    fechaCreacion: string;
    fechaVenc: string;
    observacion: string;
    estado: boolean;
}