export interface EEHSchema{
    id: number,
    contratoId: number,
    tipoFacturaId: number,
    codigo: string,
    fechaEmision: string,
    fechaVencimiento: string,
    fechaInicial: string,
    fechaFinal: string,
    cargoReactivo: number,
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


export interface LecturasPorContrato {
    factura?: {
      fechaInicial: string,
      fechaFinal: string,
      fechaGeneracion?: string,
      fechaVencimiento: string,
      fechaEmision?: string,
    },
    contrato: {
      contratoId: number,
      contratoMedId: number,
      contratoCodigo: string,
      fechaInicial: string,
      fechaFinal: string,
      cliente: string,
      diasDisponibles: number,
      diaGeneracion: number,
      direccion: string,
      telefono: string
    },
    cargo:
    [
      {
        nombre: string,
        valorAjustado: number
      }
    ],
    medidor: [
      {
        sourceID: number,
        sourceName: string,
        descripcion?: string,
        LecturaActiva: number,
        LecturaReactiva: number,
        CEF: number,
        PCF: number,
        FP: number,
        PCFR: number,
        historico: {
          lecturaActivaActual: number,
          lecturaActivaAnterior: number,
          lecturaReactivaActual: number,
          lecturaReactivaAnterior: number,
          fechaActual: string,
          fechaAnterior: string,
          multiplicador: number,
        }
  
      }
    ],
    vmedidor?: [
      {
        descripcion: string,
        LecturaActiva: number,
        LecturaReactiva: number,
        porcentaje: number,
      }
    ],
    totalLecturaActivaAjustada: number,
    totalLecturaReactivaAjustada: number,
    CEFTotal: number,
    PCFTotal: number,
    PCFRTotal: number,
    FPTotal: number,
  
  
  }