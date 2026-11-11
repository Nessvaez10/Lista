import React from 'react';
import { Check, X, Users, Edit2, Clock, AlertCircle } from 'lucide-react';
import { Municipality, AttendanceStatus } from '../types';

interface MunicipalityCardProps {
  municipality: Municipality;
  onStatusChange: (id: number, status: AttendanceStatus) => void;
  onRequestRepresentation: (municipality: Municipality) => void;
  onEditMunicipality: (municipality: Municipality) => void;
}

export const MunicipalityCard: React.FC<MunicipalityCardProps> = ({
  municipality,
  onStatusChange,
  onRequestRepresentation,
  onEditMunicipality
}) => {
  const isPresent = municipality.status === 'presente';
  const isRep = municipality.status === 'representacion';
  const isAbsent = municipality.status === 'ausente';

  const handleGreenClick = () => {
    onStatusChange(municipality.id, 'presente');
  };

  const handleYellowClick = () => {
    // If not already set with representative details, open representation modal
    if (!municipality.representanteNombre) {
      onRequestRepresentation(municipality);
    } else {
      onStatusChange(municipality.id, 'representacion');
    }
  };

  const handleRedClick = () => {
    onStatusChange(municipality.id, 'ausente');
  };

  // Card background and border depending on status
  let cardBorderClass = 'border-neutral-200 dark:border-neutral-800';
  let cardBgClass = 'bg-white dark:bg-neutral-900';

  if (isPresent) {
    cardBorderClass = 'border-emerald-300 dark:border-emerald-800/80 shadow-xs ring-1 ring-emerald-500/10';
    cardBgClass = 'bg-emerald-50/20 dark:bg-emerald-950/15';
  } else if (isRep) {
    cardBorderClass = 'border-amber-300 dark:border-amber-800/80 shadow-xs ring-1 ring-amber-500/10';
    cardBgClass = 'bg-amber-50/20 dark:bg-amber-950/15';
  } else if (isAbsent) {
    cardBorderClass = 'border-neutral-200/90 dark:border-neutral-800';
    cardBgClass = 'bg-white dark:bg-neutral-900';
  }

  return (
    <div className={`rounded-xl border ${cardBorderClass} ${cardBgClass} p-4 transition-all duration-150 flex flex-col justify-between`}>
      {/* Top Header: ID, Region, and Edit button */}
      <div>
        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-[11px] font-semibold px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              #{municipality.id}
            </span>
            <span className="truncate max-w-[150px]">{municipality.region}</span>
          </div>
          <button
            onClick={() => onEditMunicipality(municipality)}
            title="Editar nombre de municipio o presidente"
            className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200 p-1 rounded transition-colors"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Municipality Title and Mayor */}
        <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100 leading-snug">
          {municipality.nombre}
        </h3>
        
        <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-1 font-medium line-clamp-1" title={municipality.presidente}>
          {municipality.presidente}
        </p>

        {/* Representative details if yellow */}
        {isRep && (
          <div className="mt-2.5 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-start justify-between gap-2">
            <div className="flex items-start gap-1.5 truncate">
              <Users className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
              <div className="truncate">
                <span className="font-semibold block truncate">
                  {municipality.representanteNombre || 'Representante por asignar'}
                </span>
                <span className="text-[11px] text-amber-800/80 dark:text-amber-300/80 block truncate">
                  {municipality.representanteCargo || 'Cargo no especificado'}
                </span>
              </div>
            </div>
            <button
              onClick={() => onRequestRepresentation(municipality)}
              className="text-[10px] font-semibold underline text-amber-800 hover:text-amber-950 dark:text-amber-300 shrink-0"
            >
              Editar
            </button>
          </div>
        )}

        {/* Observations if any */}
        {municipality.observaciones && !isRep && (
          <p className="mt-1.5 text-[11px] text-neutral-500 italic truncate">
            Nota: {municipality.observaciones}
          </p>
        )}
      </div>

      {/* Primary 3 Attendance Action Buttons: Green, Yellow, Red */}
      <div className="mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/60">
        <div className="grid grid-cols-3 gap-1.5">
          
          {/* Green Button: PRESENTE */}
          <button
            type="button"
            onClick={handleGreenClick}
            className={`py-2 px-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
              isPresent
                ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-600/30'
                : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:hover:bg-emerald-900/60 dark:text-emerald-300'
            }`}
            title="Marcar como Presente (Titular)"
          >
            <Check className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Presente</span>
          </button>

          {/* Yellow Button: EN REPRESENTACIÓN */}
          <button
            type="button"
            onClick={handleYellowClick}
            className={`py-2 px-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
              isRep
                ? 'bg-amber-500 text-white shadow-sm ring-2 ring-amber-500/30'
                : 'bg-amber-50 hover:bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:hover:bg-amber-900/60 dark:text-amber-300'
            }`}
            title="Marcar En Representación (Suplente o Comisionado)"
          >
            <Users className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Suplente</span>
          </button>

          {/* Red Button: AUSENTE */}
          <button
            type="button"
            onClick={handleRedClick}
            className={`py-2 px-1 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-all ${
              isAbsent
                ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-600/30'
                : 'bg-neutral-100 hover:bg-rose-50 text-neutral-600 hover:text-rose-700 dark:bg-neutral-800 dark:hover:bg-rose-950/40 dark:text-neutral-400 dark:hover:text-rose-300'
            }`}
            title="Marcar como Ausente"
          >
            <X className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">Ausente</span>
          </button>

        </div>
      </div>
    </div>
  );
};
