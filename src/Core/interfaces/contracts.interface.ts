export interface ContractInterface{
    id: number;
    codigo: string;
    clasificacion: string;
    clienteId: number;
    cliente: string; 
    exportacion: boolean;
    diaGeneracion: number;
    diasDisponibles: number;
    descripcion: string;
    fechaCreacion: string;
    fechaVencimiento: string;
    observacion: string;
}