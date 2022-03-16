export interface  InvoiceInterface{
    detalleFacturaId: number;
    codigo: string;
    codigoContrato: string;
    descripcion: string;
    fechaLectura: string;
    fechaVencimiento: string;
    fechaInicio: string;
    fechaFin: string;
    fechaEmision: string;
    tipoConsumo: number;
    observacion: string;
    cargoFacturaId: number;
    facturaId: number;
    contratoMedidorId: number;
    actorId: number;
    actorNombre: string;
    energiaConsumida: number;
    total: number;
    parametroTarifaId: number;
    estado: number;
    medidorId: number;
}