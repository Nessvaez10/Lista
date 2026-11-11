export type AttendanceStatus = 'presente' | 'representacion' | 'ausente';

export interface Municipality {
  id: number;
  clave: string;
  nombre: string;
  presidente: string;
  region: string;
  cabecera?: string;
  cargo?: string;
  status: AttendanceStatus;
  representanteNombre?: string;
  representanteCargo?: string;
  horaRegistro?: string;
  observaciones?: string;
}

export interface SessionInfo {
  titulo: string;
  subtitulo: string;
  organoConvocante: string;
  fecha: string;
  horaInicio: string;
  lugar: string;
  presidenteMesa: string;
  secretarioActas: string;
  tipoQuorum: 'mayoria_simple' | 'mayoria_calificada';
  incluirRepresentantesEnQuorum: boolean;
  folioSesion?: string;
}

export interface AttendanceConfig {
  version: string;
  ultimaActualizacion: string;
  sesion: SessionInfo;
  municipios: Municipality[];
}
