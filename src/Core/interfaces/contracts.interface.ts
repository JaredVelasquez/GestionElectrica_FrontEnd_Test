export interface ContractInterface{
    id: number;
    codigo: string;
    clasificacion: string;
    cliente: string; 
    clienteId:number;
    exportacion: boolean;
    diaGeneracion: number;
    diasDisponibles: number;
    descripcion: string;
    fechaCreacion: string;
    fechaVencimiento: string;
    observacion: string;
    estado: boolean;
}