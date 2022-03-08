export interface InputParametersInterface{
    id: number;
    tipo: boolean;
    idParametro: number;
    codigo: string;
    cargoId: number | string;
    cargoNombre: string;
    valor: number;
    fechaInicio: string;
    fechaFinal: string;
    estado: boolean;
    observacion: string;
}