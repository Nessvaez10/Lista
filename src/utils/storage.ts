import { AttendanceConfig, Municipality } from '../types';
import { DEFAULT_HIDALGO_CONFIG } from '../data/defaultHidalgoConfig';

const STORAGE_KEY = 'hidalgo_asistencia_config_v1';

export function loadSavedConfig(): AttendanceConfig {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_HIDALGO_CONFIG;
    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.municipios) && parsed.municipios.length > 0) {
      return parsed;
    }
  } catch (e) {
    console.error('Error loading config from localStorage:', e);
  }
  return DEFAULT_HIDALGO_CONFIG;
}

export function saveConfigToStorage(config: AttendanceConfig): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch (e) {
    console.error('Error saving config to localStorage:', e);
  }
}

export function resetToDefaultConfig(): AttendanceConfig {
  localStorage.removeItem(STORAGE_KEY);
  return JSON.parse(JSON.stringify(DEFAULT_HIDALGO_CONFIG));
}

export function downloadJsonFile(data: unknown, filename: string): void {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
  config?: AttendanceConfig;
}

export function validateAndParseJson(rawText: string): ValidationResult {
  try {
    const parsed = JSON.parse(rawText);
    
    // Check if it's an AttendanceConfig object or an array of municipalities
    if (Array.isArray(parsed)) {
      // It's a plain array of municipalities
      const isValidArray = parsed.every((m, idx) => 
        m && typeof m.nombre === 'string'
      );
      if (!isValidArray) {
        return { valid: false, error: 'El arreglo contiene elementos sin nombre válido de municipio.' };
      }
      
      const normalizedMunicipalities: Municipality[] = parsed.map((m, idx) => ({
        id: m.id ?? (idx + 1),
        clave: m.clave ?? `13${String(idx + 1).padStart(3, '0')}`,
        nombre: m.nombre,
        presidente: m.presidente ?? 'Por designar',
        region: m.region ?? 'Sin región asignada',
        cabecera: m.cabecera ?? m.nombre,
        cargo: m.cargo ?? 'Presidente/a Municipal Constitucional',
        status: m.status === 'presente' || m.status === 'representacion' || m.status === 'ausente' ? m.status : 'ausente',
        representanteNombre: m.representanteNombre,
        representanteCargo: m.representanteCargo,
        horaRegistro: m.horaRegistro,
        observaciones: m.observaciones
      }));

      const newConfig: AttendanceConfig = {
        ...DEFAULT_HIDALGO_CONFIG,
        ultimaActualizacion: new Date().toISOString(),
        municipios: normalizedMunicipalities
      };
      return { valid: true, config: newConfig };
    }

    if (typeof parsed === 'object' && parsed !== null) {
      if (!Array.isArray(parsed.municipios)) {
        return { valid: false, error: 'El archivo JSON debe contener una propiedad "municipios" como arreglo.' };
      }

      const normalizedMunicipalities: Municipality[] = parsed.municipios.map((m: any, idx: number) => ({
        id: m.id ?? (idx + 1),
        clave: m.clave ?? `13${String(idx + 1).padStart(3, '0')}`,
        nombre: m.nombre || `Municipio ${idx + 1}`,
        presidente: m.presidente || 'Por designar',
        region: m.region || 'General',
        cabecera: m.cabecera || m.nombre || '',
        cargo: m.cargo || 'Presidente/a Municipal Constitucional',
        status: m.status === 'presente' || m.status === 'representacion' || m.status === 'ausente' ? m.status : 'ausente',
        representanteNombre: m.representanteNombre || '',
        representanteCargo: m.representanteCargo || '',
        horaRegistro: m.horaRegistro,
        observaciones: m.observaciones
      }));

      const newConfig: AttendanceConfig = {
        version: parsed.version || '1.0.0',
        ultimaActualizacion: new Date().toISOString(),
        sesion: {
          ...DEFAULT_HIDALGO_CONFIG.sesion,
          ...(parsed.sesion || {})
        },
        municipios: normalizedMunicipalities
      };

      return { valid: true, config: newConfig };
    }

    return { valid: false, error: 'Formato JSON inválido.' };
  } catch (err: any) {
    return { valid: false, error: `Error de sintaxis JSON: ${err.message}` };
  }
}

export function exportAttendanceCsv(config: AttendanceConfig): void {
  const { sesion, municipios } = config;
  const headers = [
    'No.',
    'Clave INEGI',
    'Municipio',
    'Región',
    'Presidente(a) Titular',
    'Estado Asistencia',
    'Representante / Suplente',
    'Cargo del Representante',
    'Hora de Registro',
    'Observaciones'
  ];

  const rows = municipios.map((m, index) => {
    let estado = 'AUSENTE';
    if (m.status === 'presente') estado = 'PRESENTE (TITULAR)';
    if (m.status === 'representacion') estado = 'EN REPRESENTACIÓN';

    return [
      m.id || index + 1,
      `"${m.clave || ''}"`,
      `"${m.nombre || ''}"`,
      `"${m.region || ''}"`,
      `"${m.presidente || ''}"`,
      `"${estado}"`,
      `"${m.representanteNombre || ''}"`,
      `"${m.representanteCargo || ''}"`,
      `"${m.horaRegistro || ''}"`,
      `"${m.observaciones || ''}"`
    ].join(',');
  });

  const metadataRows = [
    `"REPORTE OFICIAL DE ASISTENCIA - 84 MUNICIPIOS DE HIDALGO"`,
    `"Sesión: ${sesion.titulo}"`,
    `"Convocante: ${sesion.organoConvocante}"`,
    `"Fecha: ${sesion.fecha} - Hora: ${sesion.horaInicio}"`,
    `"Lugar: ${sesion.lugar}"`,
    `""`
  ];

  const csvContent = '\uFEFF' + [...metadataRows, headers.join(','), ...rows].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const dateStr = sesion.fecha || new Date().toISOString().split('T')[0];
  link.download = `Asistencia_Hidalgo_84_Municipios_${dateStr}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export interface QuorumStats {
  total: number;
  presentes: number;
  representados: number;
  ausentes: number;
  totalEfectivo: number;
  porcentajePresentes: number;
  porcentajeRepresentados: number;
  porcentajeAusentes: number;
  porcentajeEfectivo: number;
  quorumRequerido: number;
  tieneQuorum: boolean;
  faltantesParaQuorum: number;
  reglaQuorumLabel: string;
}

export function calculateQuorumStats(config: AttendanceConfig): QuorumStats {
  const { sesion, municipios } = config;
  const total = municipios.length;

  let presentes = 0;
  let representados = 0;
  let ausentes = 0;

  municipios.forEach(m => {
    if (m.status === 'presente') presentes++;
    else if (m.status === 'representacion') representados++;
    else ausentes++;
  });

  const totalEfectivo = sesion.incluirRepresentantesEnQuorum
    ? presentes + representados
    : presentes;

  // Mayoria Simple: mitad + 1 (para 84 municipios = 43)
  // Mayoria Calificada: dos terceras partes (para 84 = 56)
  const isCalificada = sesion.tipoQuorum === 'mayoria_calificada';
  const quorumRequerido = isCalificada ? Math.ceil((total * 2) / 3) : Math.floor(total / 2) + 1;
  const tieneQuorum = totalEfectivo >= quorumRequerido;
  const faltantesParaQuorum = Math.max(0, quorumRequerido - totalEfectivo);

  const porcentajePresentes = total > 0 ? (presentes / total) * 100 : 0;
  const porcentajeRepresentados = total > 0 ? (representados / total) * 100 : 0;
  const porcentajeAusentes = total > 0 ? (ausentes / total) * 100 : 0;
  const porcentajeEfectivo = total > 0 ? (totalEfectivo / total) * 100 : 0;

  return {
    total,
    presentes,
    representados,
    ausentes,
    totalEfectivo,
    porcentajePresentes,
    porcentajeRepresentados,
    porcentajeAusentes,
    porcentajeEfectivo,
    quorumRequerido,
    tieneQuorum,
    faltantesParaQuorum,
    reglaQuorumLabel: isCalificada ? 'Mayoría Calificada (2/3 partes = 56)' : 'Mayoría Simple (50% + 1 = 43)'
  };
}
