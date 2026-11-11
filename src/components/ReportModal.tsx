import React, { useState } from 'react';
import { X, Printer, Download, Copy, Check, FileText, CheckCircle2, AlertTriangle, Building, Calendar, MapPin, User } from 'lucide-react';
import { AttendanceConfig } from '../types';
import { calculateQuorumStats, exportAttendanceCsv } from '../utils/storage';

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AttendanceConfig;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  isOpen,
  onClose,
  config
}) => {
  const [copied, setCopied] = useState(false);
  const stats = calculateQuorumStats(config);
  const { sesion, municipios } = config;

  if (!isOpen) return null;

  const presentesList = municipios.filter((m) => m.status === 'presente');
  const representadosList = municipios.filter((m) => m.status === 'representacion');
  const ausentesList = municipios.filter((m) => m.status === 'ausente');

  const handlePrint = () => {
    window.print();
  };

  const handleCopySummary = async () => {
    const summaryText = `*ESTADO DE HIDALGO - REPORTE OFICIAL DE ASISTENCIA MUNICIPAL*
Sesión: ${sesion.titulo}
Convocante: ${sesion.organoConvocante}
Fecha: ${sesion.fecha} | Hora: ${sesion.horaInicio} hrs
Lugar: ${sesion.lugar}

*ESTADO DE QUÓRUM LEGAL:*
${stats.tieneQuorum ? '✅ QUÓRUM LEGAL DECLARADO' : '⚠️ SIN QUÓRUM LEGAL'}
• Municipios requeridos: ${stats.quorumRequerido}
• Asistencia total efectiva: ${stats.totalEfectivo} de ${stats.total} (${stats.porcentajeEfectivo.toFixed(1)}%)

*DESGLOSE:*
• Presentes (Titulares): ${stats.presentes} (${stats.porcentajePresentes.toFixed(1)}%)
• En Representación: ${stats.representados} (${stats.porcentajeRepresentados.toFixed(1)}%)
• Ausentes: ${stats.ausentes} (${stats.porcentajeAusentes.toFixed(1)}%)

*TITULARES PRESENTES (${presentesList.length}):*
${presentesList.map((m) => `• ${m.nombre} - ${m.presidente}`).join('\n')}

*EN REPRESENTACIÓN (${representadosList.length}):*
${representadosList.map((m) => `• ${m.nombre}: ${m.representanteNombre || 'Sin nombre'} (${m.representanteCargo || 'Representante'})`).join('\n')}

*AUSENTES (${ausentesList.length}):*
${ausentesList.map((m) => `• ${m.nombre} (${m.presidente})`).join('\n')}`;

    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.error('Error al copiar:', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-neutral-900/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white dark:bg-neutral-900 rounded-2xl max-w-4xl w-full shadow-2xl border border-neutral-200 dark:border-neutral-800 my-8 overflow-hidden flex flex-col max-h-[92vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="report-modal-title"
      >
        {/* Header toolbar */}
        <div className="no-print px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-700 text-white flex items-center justify-center">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h2 id="report-modal-title" className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Acta Oficial y Cómputo de Asistencia
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                84 Municipios del Estado de Hidalgo
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopySummary}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700 rounded-lg transition-colors"
              title="Copiar texto resumen"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Copiar Resumen'}</span>
            </button>

            <button
              onClick={() => exportAttendanceCsv(config)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-200 bg-white dark:bg-neutral-800 hover:bg-neutral-100 dark:hover:bg-neutral-700 border border-neutral-300 dark:border-neutral-700 rounded-lg transition-colors"
              title="Descargar datos en CSV / Excel"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Descargar CSV</span>
            </button>

            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
              title="Imprimir documento oficial o guardar en PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>

            <button
              onClick={onClose}
              aria-label="Cerrar modal de reporte"
              className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-800 ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Report Content (Printable document) */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-6 text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-900">
          
          {/* Official Letterhead */}
          <div className="border-b-2 border-neutral-900 dark:border-neutral-100 pb-5 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 dark:text-emerald-400">
                GOBIERNO DEL ESTADO DE HIDALGO
              </span>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-neutral-900 dark:text-neutral-50 mt-1">
                ACTA DE ASISTENCIA Y DECLARATORIA DE QUÓRUM
              </h1>
              <p className="text-sm font-semibold text-neutral-600 dark:text-neutral-300 mt-0.5">
                {sesion.titulo}
              </p>
            </div>
            <div className="text-right text-xs text-neutral-500 dark:text-neutral-400 border-l border-neutral-200 dark:border-neutral-800 pl-4 hidden sm:block">
              <div>Folio: <span className="font-mono font-bold text-neutral-800 dark:text-neutral-200">{sesion.folioSesion || 'SES-HGO-2026/01'}</span></div>
              <div>Fecha: <span className="font-mono">{sesion.fecha}</span></div>
              <div>Hora: <span className="font-mono">{sesion.horaInicio} hrs</span></div>
            </div>
          </div>

          {/* Session Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 text-xs">
            <div>
              <span className="text-neutral-500 dark:text-neutral-400 block font-medium">Órgano Convocante:</span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">{sesion.organoConvocante}</span>
            </div>
            <div>
              <span className="text-neutral-500 dark:text-neutral-400 block font-medium">Sede / Recinto:</span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">{sesion.lugar}</span>
            </div>
            <div>
              <span className="text-neutral-500 dark:text-neutral-400 block font-medium">Presidente de Mesa:</span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">{sesion.presidenteMesa}</span>
            </div>
          </div>

          {/* Quorum Statement Card */}
          <div className={`p-4 rounded-xl border ${
            stats.tieneQuorum 
              ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
              : 'bg-rose-50 dark:bg-rose-950/30 border-rose-300 dark:border-rose-800 text-rose-950 dark:text-rose-100'
          }`}>
            <div className="flex items-center gap-2 mb-1.5">
              {stats.tieneQuorum ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-700 dark:text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-rose-700 dark:text-rose-400 shrink-0" />
              )}
              <h3 className="font-bold text-sm uppercase tracking-wide">
                {stats.tieneQuorum ? 'Certificación de Quórum Legal Favorable' : 'Constancia de Falta de Quórum Legal'}
              </h3>
            </div>
            <p className="text-xs leading-relaxed text-neutral-700 dark:text-neutral-300">
              {stats.tieneQuorum ? (
                <>
                  Habiéndose realizado el pase de lista reglamentario correspondiente a los <strong>84 Municipios del Estado Libre y Soberano de Hidalgo</strong>, se hace constar la asistencia efectiva de <strong>{stats.totalEfectivo} municipios</strong> ({stats.presentes} presidentes/as titulares y {stats.representados} acreditados en representación), superando el umbral de {stats.quorumRequerido} requerido por <strong>{stats.reglaQuorumLabel}</strong>. En consecuencia, se declara formalmente la existencia de <strong>QUÓRUM LEGAL</strong> para la validez de los acuerdos tomados en la presente sesión.
                </>
              ) : (
                <>
                  Habiéndose realizado el pase de lista correspondiente, se registra la asistencia de <strong>{stats.totalEfectivo} municipios</strong> de los 84 que integran la entidad. Al no alcanzarse el mínimo indispensable de {stats.quorumRequerido} municipios (faltando {stats.faltantesParaQuorum} integrantes), <strong>NO EXISTE QUÓRUM LEGAL</strong> para la instalación formal en este momento.
                </>
              )}
            </p>
          </div>

          {/* Numerical Summary Table */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              Resumen Estadístico de Asistencia
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-3 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40">
                <span className="text-neutral-500 dark:text-neutral-400 block">Total Municipios</span>
                <span className="text-xl font-bold font-mono">{stats.total}</span>
                <span className="text-[10px] text-neutral-400 block">100%</span>
              </div>
              <div className="p-3 rounded-lg border border-emerald-200 dark:border-emerald-800/60 bg-emerald-50/50 dark:bg-emerald-950/20">
                <span className="text-emerald-800 dark:text-emerald-300 block font-medium">Titulares Presentes</span>
                <span className="text-xl font-bold font-mono text-emerald-800 dark:text-emerald-200">{stats.presentes}</span>
                <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 block">{stats.porcentajePresentes.toFixed(1)}%</span>
              </div>
              <div className="p-3 rounded-lg border border-amber-200 dark:border-amber-800/60 bg-amber-50/50 dark:bg-amber-950/20">
                <span className="text-amber-800 dark:text-amber-300 block font-medium">En Representación</span>
                <span className="text-xl font-bold font-mono text-amber-800 dark:text-amber-200">{stats.representados}</span>
                <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 block">{stats.porcentajeRepresentados.toFixed(1)}%</span>
              </div>
              <div className="p-3 rounded-lg border border-rose-200 dark:border-rose-800/60 bg-rose-50/50 dark:bg-rose-950/20">
                <span className="text-rose-800 dark:text-rose-300 block font-medium">Ausentes</span>
                <span className="text-xl font-bold font-mono text-rose-800 dark:text-rose-200">{stats.ausentes}</span>
                <span className="text-[10px] font-mono text-rose-700 dark:text-rose-400 block">{stats.porcentajeAusentes.toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* Section 1: Present Mayors */}
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300">
                  1. Presidentes Municipales Titulares Presentes ({presentesList.length})
                </h4>
              </div>
            </div>
            {presentesList.length === 0 ? (
              <p className="text-xs text-neutral-400 italic py-2">No se han registrado presidentes titulares presentes.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                {presentesList.map((m) => (
                  <div key={m.id} className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-100 dark:border-neutral-800">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900 dark:text-neutral-100">{m.nombre}</span>
                      <span className="font-mono text-[10px] text-neutral-400">#{m.id}</span>
                    </div>
                    <span className="text-neutral-600 dark:text-neutral-300 block text-[11px] truncate">
                      {m.presidente}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 2: Accredited Representatives */}
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                  2. Municipios con Representación Acreditada ({representadosList.length})
                </h4>
              </div>
            </div>
            {representadosList.length === 0 ? (
              <p className="text-xs text-neutral-400 italic py-2">No hay municipios registrados en representación.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {representadosList.map((m) => (
                  <div key={m.id} className="p-2.5 rounded-lg bg-amber-50/40 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/60">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-neutral-900 dark:text-neutral-100">{m.nombre}</span>
                      <span className="text-[10px] text-amber-800 dark:text-amber-300 font-medium">#{m.id}</span>
                    </div>
                    <div className="mt-1 text-[11px]">
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">
                        {m.representanteNombre || 'Por asignar'}
                      </span>
                      <span className="text-neutral-500 dark:text-neutral-400 block text-[10px]">
                        {m.representanteCargo || 'Representante'} · Titular: {m.presidente}
                      </span>
                      {m.observaciones && (
                        <span className="text-amber-700 dark:text-amber-300 block text-[10px] mt-0.5">
                          Acreditación: {m.observaciones}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Section 3: Absentees */}
          <div className="space-y-2">
            <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-1.5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-rose-900 dark:text-rose-300">
                  3. Inasistencias Registradas ({ausentesList.length})
                </h4>
              </div>
            </div>
            {ausentesList.length === 0 ? (
              <p className="text-xs text-emerald-600 font-semibold py-2">¡Asistencia perfecta! No se registran ausencias.</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                {ausentesList.map((m) => (
                  <div key={m.id} className="p-2 rounded-lg bg-neutral-50 dark:bg-neutral-800/20 border border-neutral-100 dark:border-neutral-800/60 text-neutral-500">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-neutral-800 dark:text-neutral-200">{m.nombre}</span>
                      <span className="font-mono text-[10px]">#{m.id}</span>
                    </div>
                    <span className="text-[11px] text-neutral-400 block truncate">
                      {m.presidente}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Signatures section */}
          <div className="pt-10 border-t border-neutral-200 dark:border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center text-xs">
            <div className="space-y-1">
              <div className="w-48 mx-auto border-b border-neutral-400 dark:border-neutral-600 h-10 mb-2"></div>
              <p className="font-bold text-neutral-900 dark:text-neutral-100">{sesion.presidenteMesa}</p>
              <p className="text-neutral-500">Presidente(a) de la Mesa Directiva</p>
            </div>
            <div className="space-y-1">
              <div className="w-48 mx-auto border-b border-neutral-400 dark:border-neutral-600 h-10 mb-2"></div>
              <p className="font-bold text-neutral-900 dark:text-neutral-100">{sesion.secretarioActas}</p>
              <p className="text-neutral-500">Secretario(a) de Actas y Acuerdos</p>
            </div>
          </div>

          <div className="text-center text-[10px] text-neutral-400 pt-4">
            Generado a través del Sistema Oficial de Asistencia Municipal del Estado de Hidalgo · {new Date().toLocaleDateString('es-MX', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
          </div>

        </div>
      </div>
    </div>
  );
};
