import React from 'react';
import { CheckCircle2, AlertTriangle, Users, Building2, UserCheck, UserX, Clock, MapPin } from 'lucide-react';
import { QuorumStats } from '../utils/storage';
import { SessionInfo } from '../types';

interface QuorumBarProps {
  stats: QuorumStats;
  session: SessionInfo;
  onOpenReport: () => void;
  onOpenConfig: () => void;
  onMarkAll: (status: 'presente' | 'ausente') => void;
  onResetSession: () => void;
}

export const QuorumBar: React.FC<QuorumBarProps> = ({
  stats,
  session,
  onOpenReport,
  onOpenConfig,
  onMarkAll,
  onResetSession
}) => {
  return (
    <div className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        
        {/* Session Title and Meta Information */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 mb-1">
              <span>{session.organoConvocante}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {session.fecha} a las {session.horaInicio} hrs
              </span>
              <span aria-hidden="true">·</span>
              <span className="hidden sm:inline-flex items-center gap-1 truncate max-w-xs">
                <MapPin className="w-3 h-3 shrink-0" />
                {session.lugar}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
              {session.titulo}
            </h1>
          </div>

          {/* Quorum Badge Indicator */}
          <div className="flex items-center gap-3 shrink-0">
            <div className={`px-3.5 py-2 rounded-xl flex items-center gap-2.5 border ${
              stats.tieneQuorum 
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-100'
                : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800/60 text-amber-900 dark:text-amber-100'
            }`}>
              {stats.tieneQuorum ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
              )}
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    {stats.tieneQuorum ? 'Quórum Legal Declarado' : 'Sin Quórum Legal'}
                  </span>
                  <span className="font-mono text-xs font-semibold tabular-nums">
                    {stats.totalEfectivo}/{stats.quorumRequerido} requeridos
                  </span>
                </div>
                <span className="text-[11px] text-neutral-600 dark:text-neutral-300">
                  {stats.tieneQuorum 
                    ? `Sesión facultada legalmente (${stats.reglaQuorumLabel})`
                    : `Faltan ${stats.faltantesParaQuorum} asistencias para declarar quórum`}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Primary KPI Counters */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
          
          {/* Card 1: Total Municipios */}
          <div className="bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200/80 dark:border-neutral-800 rounded-xl p-3.5 flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                Total Municipios
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-bold font-mono tabular-nums text-neutral-900 dark:text-neutral-100">
                  {stats.total}
                </span>
                <span className="text-xs text-neutral-500 dark:text-neutral-400">
                  Hidalgo (100%)
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-neutral-200/60 dark:bg-neutral-700/60 text-neutral-600 dark:text-neutral-300 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
          </div>

          {/* Card 2: Presentes (Verde) */}
          <div className="bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60 rounded-xl p-3.5 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-600 dark:bg-emerald-400" />
                <span className="text-xs font-medium text-emerald-900 dark:text-emerald-300">
                  Presentes (Titulares)
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-bold font-mono tabular-nums text-emerald-900 dark:text-emerald-100">
                  {stats.presentes}
                </span>
                <span className="text-xs font-mono tabular-nums text-emerald-700 dark:text-emerald-400">
                  ({stats.porcentajePresentes.toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
          </div>

          {/* Card 3: En Representación (Amarillo) */}
          <div className="bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-800/60 rounded-xl p-3.5 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-amber-500 dark:bg-amber-400" />
                <span className="text-xs font-medium text-amber-900 dark:text-amber-300">
                  En Representación
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-bold font-mono tabular-nums text-amber-900 dark:text-amber-100">
                  {stats.representados}
                </span>
                <span className="text-xs font-mono tabular-nums text-amber-700 dark:text-amber-400">
                  ({stats.porcentajeRepresentados.toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-300 flex items-center justify-center">
              <Users className="w-5 h-5" />
            </div>
          </div>

          {/* Card 4: Ausentes (Rojo) */}
          <div className="bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-800/60 rounded-xl p-3.5 flex items-center justify-between">
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-600 dark:bg-rose-400" />
                <span className="text-xs font-medium text-rose-900 dark:text-rose-300">
                  Ausentes
                </span>
              </div>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-bold font-mono tabular-nums text-rose-900 dark:text-rose-100">
                  {stats.ausentes}
                </span>
                <span className="text-xs font-mono tabular-nums text-rose-700 dark:text-rose-400">
                  ({stats.porcentajeAusentes.toFixed(1)}%)
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 flex items-center justify-center">
              <UserX className="w-5 h-5" />
            </div>
          </div>

        </div>

        {/* Multi-segment Progress Bar */}
        <div className="mt-4 pt-2">
          <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1.5 font-medium">
            <div className="flex items-center gap-4">
              <span>Distribución en la sesión:</span>
              <span className="font-mono tabular-nums text-emerald-700 dark:text-emerald-400">
                ● {stats.presentes} Titulares
              </span>
              <span className="font-mono tabular-nums text-amber-700 dark:text-amber-400">
                ● {stats.representados} Suplentes
              </span>
              <span className="font-mono tabular-nums text-rose-700 dark:text-rose-400">
                ● {stats.ausentes} Sin registrar
              </span>
            </div>
            <div className="font-mono tabular-nums">
              Efectivo: <span className="font-bold text-neutral-900 dark:text-neutral-100">{stats.porcentajeEfectivo.toFixed(1)}%</span>
            </div>
          </div>

          <div className="w-full h-3 bg-neutral-100 dark:bg-neutral-800 rounded-full overflow-hidden flex relative">
            <div
              style={{ width: `${stats.porcentajePresentes}%` }}
              className="bg-emerald-600 transition-all duration-300 ease-out"
              title={`Presentes: ${stats.presentes} (${stats.porcentajePresentes.toFixed(1)}%)`}
            />
            <div
              style={{ width: `${stats.porcentajeRepresentados}%` }}
              className="bg-amber-500 transition-all duration-300 ease-out"
              title={`En Representación: ${stats.representados} (${stats.porcentajeRepresentados.toFixed(1)}%)`}
            />
            <div
              style={{ width: `${stats.porcentajeAusentes}%` }}
              className="bg-rose-500/80 transition-all duration-300 ease-out"
              title={`Ausentes: ${stats.ausentes} (${stats.porcentajeAusentes.toFixed(1)}%)`}
            />
            {/* Quorum Target line marker (e.g. at 51.2% for 43/84) */}
            <div 
              className="absolute top-0 bottom-0 w-0.5 bg-neutral-900 dark:bg-white z-10 shadow-xs"
              style={{ left: `${(stats.quorumRequerido / stats.total) * 100}%` }}
              title={`Límite de Quórum: ${stats.quorumRequerido} municipios (${((stats.quorumRequerido / stats.total) * 100).toFixed(1)}%)`}
            />
          </div>
          <div className="flex justify-between items-center text-[11px] text-neutral-400 dark:text-neutral-500 mt-1">
            <span>0</span>
            <span className="font-mono">Meta Quórum: {stats.quorumRequerido} municipios</span>
            <span>84</span>
          </div>
        </div>

        {/* Quick Batch Actions Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-2 border-t border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-2">
            <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
              Acciones de sesión rápida:
            </span>
            <button
              onClick={() => onMarkAll('presente')}
              className="px-2.5 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 rounded-md transition-colors"
            >
              Marcar todos Presentes
            </button>
            <button
              onClick={() => onMarkAll('ausente')}
              className="px-2.5 py-1 text-xs font-medium text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 hover:bg-rose-100 dark:hover:bg-rose-900/60 rounded-md transition-colors"
            >
              Marcar todos Ausentes
            </button>
            <button
              onClick={onResetSession}
              className="px-2.5 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-md transition-colors"
            >
              Reiniciar asistencia
            </button>
          </div>

          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            Regla: <span className="font-medium text-neutral-700 dark:text-neutral-300">{session.incluirRepresentantesEnQuorum ? 'Representantes cuentan para quórum' : 'Solo titulares cuentan para quórum'}</span>
          </div>
        </div>

      </div>
    </div>
  );
};
