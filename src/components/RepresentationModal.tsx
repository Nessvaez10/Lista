import React, { useState, useEffect } from 'react';
import { X, UserCheck, Shield, FileText } from 'lucide-react';
import { Municipality } from '../types';

interface RepresentationModalProps {
  isOpen: boolean;
  municipality: Municipality | null;
  onClose: () => void;
  onSave: (municipalityId: number, repNombre: string, repCargo: string, observaciones?: string) => void;
}

const COMMON_ROLES = [
  'Síndico(a) Procurador(a)',
  'Síndico(a) Hacendario(a)',
  'Secretario(a) General Municipal',
  'Regidor(a) de Gobernación',
  'Regidor(a) de la Comisión de Hacienda',
  'Director(a) de Gobierno',
  'Representante Acreditado por Oficio'
];

export const RepresentationModal: React.FC<RepresentationModalProps> = ({
  isOpen,
  municipality,
  onClose,
  onSave
}) => {
  const [nombre, setNombre] = useState('');
  const [cargo, setCargo] = useState('Síndico(a) Procurador(a)');
  const [observaciones, setObservaciones] = useState('');

  useEffect(() => {
    if (municipality) {
      setNombre(municipality.representanteNombre || '');
      setCargo(municipality.representanteCargo || 'Síndico(a) Procurador(a)');
      setObservaciones(municipality.observaciones || '');
    }
  }, [municipality]);

  if (!isOpen || !municipality) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(municipality.id, nombre.trim(), cargo.trim(), observaciones.trim());
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-900/60 backdrop-blur-xs">
      <div 
        className="bg-white dark:bg-neutral-900 rounded-2xl max-w-lg w-full shadow-2xl border border-neutral-200 dark:border-neutral-800 overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rep-modal-title"
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-amber-50/50 dark:bg-amber-950/20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 id="rep-modal-title" className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Acreditar Representación
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Municipio de <span className="font-semibold text-neutral-800 dark:text-neutral-200">{municipality.nombre}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar ventana"
            className="text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200 p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="text-xs p-3 rounded-lg bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 text-neutral-600 dark:text-neutral-300">
            <div className="flex justify-between items-center">
              <span>Presidente(a) Titular:</span>
              <span className="font-semibold text-neutral-900 dark:text-neutral-100">{municipality.presidente}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Nombre de la persona comisionada / suplente *
            </label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ej. Lic. Roberto Gómez Sánchez"
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Cargo de quien asiste en representación
            </label>
            <input
              type="text"
              value={cargo}
              onChange={(e) => setCargo(e.target.value)}
              placeholder="Ej. Síndico Municipal"
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50 mb-2"
            />
            {/* Quick role suggestions */}
            <div className="flex flex-wrap gap-1.5">
              {COMMON_ROLES.map((role) => (
                <button
                  type="button"
                  key={role}
                  onClick={() => setCargo(role)}
                  className={`text-[11px] px-2 py-1 rounded-md transition-colors ${
                    cargo === role
                      ? 'bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-semibold'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
              Oficio de Acreditación / Observaciones (Opcional)
            </label>
            <input
              type="text"
              value={observaciones}
              onChange={(e) => setObservaciones(e.target.value)}
              placeholder="Ej. Oficio PM/089/2026 presentado ante Secretaría"
              className="w-full px-3.5 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 focus:outline-hidden focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs transition-colors"
            >
              Guardar Representación
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
