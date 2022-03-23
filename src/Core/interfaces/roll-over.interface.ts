export interface RollOverSchema { 
    id: number;
    medidorId: number;
    fechaInicial: string;
    fechaFinal: string;
    energia: boolean;
    lecturaAnterior: number;
    lecturaNueva: number;
    observacion: string;
    estado: boolean;
}