export interface MeterSchema{
    id: number;
    codigo: string;
    sourceId: string;
    descripcion: string;
    modelo: string;
    serie: string;
    lecturaMax: number;
    multiplicador: number;
    puntoMedicionId: number;
    observacion: string;
    puntoConexion: number;
    tipo: boolean;
    registroDatos: boolean,
    almacenamientoLocal: boolean,
    funcionalidad: boolean,
    estado: boolean;
  }
  