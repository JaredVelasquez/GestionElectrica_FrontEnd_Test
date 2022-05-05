export interface EEHSchema{
    id: number,
    contratoId: number,
    tipoFacturaId: number,
    codigo: string,
    fechaEmision: string,
    fechaVencimiento: string,
    fechaInicial: string,
    fechaFinal: string,
    estado: boolean
}

export interface datosFacturacion {
    facturaId: number,
    estado: boolean,
    facturaManualId: number,
    codigo: string,
    contratoId: number,
    fechaEmision: string,
    fechaVencimiento: string,
    fechaInicial: string,
    fechaFinal: string,
    tipoFacturaId: number,
    detalleId: number,
    
}