
export interface MeterInterface {
    estado: boolean;
    idMedidor: number;
    sourceId: string;
    codigoPM: string;
    descripcionPM: string;
    tipoMedidor: boolean;
    modeloMedidor: string;
    lecturaMax: number;
    serieMedidor: string;
    multiplicador: number;
    puntoMedicionId: number;
    puntoConexion: string;

  }

  export interface MeterSchema{
    id: number;
    codigo: string;
    souceId: string;
    descripcion: string;
    modelo: string;
    serie: string;
    lecturaMax: number;
    multiplicador: number;
    puntoMedicionId: number;
    observacion: string;
    puntoConexion: boolean;
    tipo: number;
    estado: boolean;
  }
  