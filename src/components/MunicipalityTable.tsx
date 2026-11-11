import React from 'react';
import { Check, X, Users, Edit2, ShieldAlert } from 'lucide-react';
import { Municipality, AttendanceStatus } from '../types';

interface MunicipalityTableProps {
  municipios: Municipality[];
  onStatusChange: (id: number, status: AttendanceStatus) => void;
  onRequestRepresentation: (municipality: Municipality) => void;
  onEditMunicipality: (municipality: Municipality) => void;
}

export const MunicipalityTable: React.FC<MunicipalityTableProps> = ({
  municipios,
  onStatusChange,
  onRequestRepresentation,
  onEditMunicipality
}) => {
  return (
    <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden bg-white dark:bg-neutral-900 shadow-xs">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/60 text-neutral-600 dark:text-neutral-300 font-semibold uppercase tracking-wider">
              <th className="py-3 px-3.5 w-12 text-center">#</th>
              <th className="py-3 px-4">Municipio</th>
              <th className="py-3 px-4">Presidente(a) Titular</th>
              <th className="py-3 px-4">Región</th>
              <th className="py-3 px-4 text-center">Pase de Lista</th>
              <th className="py-3 px-4">Acreditación / Representación</th>
              <th className="py-3 px-3 text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/80">
            {municipios.map((m) => {
              const isPresent = m.status === 'presente';
              const isRep = m.status === 'representacion';
              const isAbsent = m.status === 'ausente';

              return (
                <tr
                  key={m.id}
                  className={`hover:bg-neutral-50/70 dark:hover:bg-neutral-800/40 transition-colors ${
                    isPresent
                      ? 'bg-emerald-50/15 dark:bg-emerald-950/10'
                      : isRep
                      ? 'bg-amber-50/15 dark:bg-amber-950/10'
                      : ''
                  }`}
                >
                  {/* ID */}
                  <td className="py-2.5 px-3.5 text-center font-mono font-medium text-neutral-500 dark:text-neutral-400">
                    {m.id}
                  </td>

                  {/* Nombre */}
                  <td className="py-2.5 px-4 font-bold text-neutral-900 dark:text-neutral-100">
                    {m.nombre}
                    <span className="block text-[10px] font-normal text-neutral-400 font-mono">
                      {m.clave}
                    </span>
                  </td>

                  {/* Presidente */}
                  <td className="py-2.5 px-4 text-neutral-700 dark:text-neutral-300 font-medium">
                    {m.presidente}
                  </td>

                  {/* Región */}
                  <td className="py-2.5 px-4 text-neutral-500 dark:text-neutral-400">
                    {m.region}
                  </td>

                  {/* Color buttons */}
                  <td className="py-2.5 px-4">
                    <div className="flex items-center justify-center gap-1">
                      {/* Green */}
                      <button
                        type="button"
                        onClick={() => onStatusChange(m.id, 'presente')}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-all ${
                          isPresent
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100'
                        }`}
                        title="Presente"
                      >
                        <Check className="w-3 h-3" />
                        <span className="hidden sm:inline">Presente</span>
                      </button>

                      {/* Yellow */}
                      <button
                        type="button"
                        onClick={() => {
                          if (!m.representanteNombre) {
                            onRequestRepresentation(m);
                          } else {
                            onStatusChange(m.id, 'representacion');
                          }
                        }}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-all ${
                          isRep
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100'
                        }`}
                        title="En Representación"
                      >
                        <Users className="w-3 h-3" />
                        <span className="hidden sm:inline">Suplente</span>
                      </button>

                      {/* Red */}
                      <button
                        type="button"
                        onClick={() => onStatusChange(m.id, 'ausente')}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1 transition-all ${
                          isAbsent
                            ? 'bg-rose-600 text-white shadow-xs'
                            : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-rose-50 hover:text-rose-700'
                        }`}
                        title="Ausente"
                      >
                        <X className="w-3 h-3" />
                        <span className="hidden sm:inline">Ausente</span>
                      </button>
                    </div>
                  </td>

                  {/* Representative Column */}
                  <td className="py-2.5 px-4 text-neutral-600 dark:text-neutral-300">
                    {isRep ? (
                      <div className="flex items-center justify-between gap-1">
                        <div>
                          <span className="font-semibold text-amber-900 dark:text-amber-200 block">
                            {m.representanteNombre || 'Sin nombre asignado'}
                          </span>
                          <span className="text-[11px] text-neutral-500">
                            {m.representanteCargo || 'Representante'}
                          </span>
                        </div>
                        <button
                          onClick={() => onRequestRepresentation(m)}
                          className="text-[10px] underline text-amber-700 hover:text-amber-900 ml-1"
                        >
                          Editar
                        </button>
                      </div>
                    ) : (
                      <span className="text-neutral-400 italic text-[11px]">
                        {isPresent ? 'Titular en sala' : 'Sin asistencia'}
                      </span>
                    )}
                  </td>

                  {/* Edit */}
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => onEditMunicipality(m)}
                      title="Editar datos del municipio"
                      className="p-1 rounded text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
