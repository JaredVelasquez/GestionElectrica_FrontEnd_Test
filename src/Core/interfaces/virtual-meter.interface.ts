export interface VirtualMeterInterface{
    id: number;
    medidorId: number;
    vmedidorId: number;
    operacion: number;
    porcentaje: number;
    observacion: string;
    estado: boolean;
}

export interface VirtualMeterShema{
    id: number;
    medidorId: number;
    porcentaje: number;
    operacion: boolean;
    observacion: string;
    estado: boolean;
}