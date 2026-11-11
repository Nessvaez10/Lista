import React from 'react';
import { Search, LayoutGrid, List, Filter, X } from 'lucide-react';
import { AttendanceStatus } from '../types';

interface RollCallControlsProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  statusFilter: 'todos' | AttendanceStatus;
  onStatusFilterChange: (status: 'todos' | AttendanceStatus) => void;
  regionFilter: string;
  onRegionFilterChange: (region: string) => void;
  regions: string[];
  viewMode: 'grid' | 'table';
  onViewModeChange: (mode: 'grid' | 'table') => void;
  counts: {
    total: number;
    presentes: number;
    representados: number;
    ausentes: number;
  };
}

export const RollCallControls: React.FC<RollCallControlsProps> = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  regionFilter,
  onRegionFilterChange,
  regions,
  viewMode,
  onViewModeChange,
  counts
}) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
        
        {/* Search bar */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar por municipio o nombre de presidente..."
            className="w-full pl-9 pr-9 py-2 text-xs sm:text-sm rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-600/40 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Region filter and View Mode switcher */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* Region selector */}
          <div className="flex items-center gap-1.5 bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-xl px-2.5 py-1.5 text-xs">
            <Filter className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <select
              value={regionFilter}
              onChange={(e) => onRegionFilterChange(e.target.value)}
              className="bg-transparent text-neutral-800 dark:text-neutral-200 focus:outline-hidden text-xs cursor-pointer"
            >
              <option value="todas">Todas las Regiones ({regions.length})</option>
              {regions.map((reg) => (
                <option key={reg} value={reg} className="dark:bg-neutral-800">
                  {reg}
                </option>
              ))}
            </select>
          </div>

          {/* View mode toggle (Grid vs Table) */}
          <div className="flex items-center p-0.5 bg-neutral-100 dark:bg-neutral-800 rounded-lg border border-neutral-200 dark:border-neutral-700">
            <button
              onClick={() => onViewModeChange('grid')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'grid'
                  ? 'bg-white dark:bg-neutral-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
              title="Vista en tarjetas cuadrícula"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('table')}
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-neutral-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
              }`}
              title="Vista en tabla ejecutiva"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* Segmented Filter Buttons (Todos, Presentes, Suplentes, Ausentes) */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => onStatusFilterChange('todos')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
            statusFilter === 'todos'
              ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 shadow-xs'
              : 'bg-neutral-100 dark:bg-neutral-800/80 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-200/70 dark:hover:bg-neutral-700'
          }`}
        >
          <span>Todos</span>
          <span className="font-mono text-[11px] tabular-nums opacity-80">({counts.total})</span>
        </button>

        <button
          onClick={() => onStatusFilterChange('presente')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
            statusFilter === 'presente'
              ? 'bg-emerald-700 text-white shadow-xs'
              : 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/40'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          <span>Presentes</span>
          <span className="font-mono text-[11px] tabular-nums font-semibold">({counts.presentes})</span>
        </button>

        <button
          onClick={() => onStatusFilterChange('representacion')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
            statusFilter === 'representacion'
              ? 'bg-amber-600 text-white shadow-xs'
              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>En Representación</span>
          <span className="font-mono text-[11px] tabular-nums font-semibold">({counts.representados})</span>
        </button>

        <button
          onClick={() => onStatusFilterChange('ausente')}
          className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 whitespace-nowrap shrink-0 ${
            statusFilter === 'ausente'
              ? 'bg-rose-700 text-white shadow-xs'
              : 'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/40'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          <span>Ausentes</span>
          <span className="font-mono text-[11px] tabular-nums font-semibold">({counts.ausentes})</span>
        </button>
      </div>
    </div>
  );
};
