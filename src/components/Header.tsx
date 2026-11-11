import React from 'react';
import { Landmark, FileText, Settings, Moon, Sun, Download, RefreshCw } from 'lucide-react';

interface HeaderProps {
  currentTab: 'lista' | 'reporte' | 'config';
  onTabChange: (tab: 'lista' | 'reporte' | 'config') => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenReport: () => void;
  onOpenConfig: () => void;
  totalPresentes: number;
  totalMunicipios: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  darkMode,
  onToggleDarkMode,
  onOpenReport,
  onOpenConfig,
  totalPresentes,
  totalMunicipios
}) => {
  return (
    <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md sticky top-0 z-30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-16">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold shadow-xs">
              <Landmark className="w-5 h-5 text-emerald-100" />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold tracking-tight text-neutral-900 dark:text-neutral-100 whitespace-nowrap">
                Estado de Hidalgo
              </span>
              <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                Pase de Lista · 84 Presidentes Municipales
              </span>
            </div>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => onTabChange('lista')}
              className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 ${
                currentTab === 'lista'
                  ? 'bg-neutral-100 dark:bg-neutral-800 text-emerald-700 dark:text-emerald-400 font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
              }`}
            >
              <span>Pase de Asistencia</span>
              <span className="text-xs font-mono tabular-nums px-1.5 py-0.5 rounded bg-emerald-100/70 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300">
                {totalPresentes}/{totalMunicipios}
              </span>
            </button>

            <button
              onClick={onOpenReport}
              className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentTab === 'reporte'
                  ? 'bg-neutral-100 dark:bg-neutral-800 text-emerald-700 dark:text-emerald-400 font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Acta & Quórum</span>
            </button>

            <button
              onClick={onOpenConfig}
              className={`px-3.5 py-2 rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                currentTab === 'config'
                  ? 'bg-neutral-100 dark:bg-neutral-800 text-emerald-700 dark:text-emerald-400 font-semibold'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800/50'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Configuración JSON</span>
            </button>
          </nav>

          {/* Zone 3: Actions & Theme toggle */}
          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={onToggleDarkMode}
              aria-label="Alternar tema claro y oscuro"
              className="p-2 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              title={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <button
              onClick={onOpenConfig}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-neutral-700 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Cargar o descargar archivo de configuración JSON"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Archivo JSON</span>
            </button>

            <button
              onClick={onOpenReport}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 rounded-lg shadow-xs transition-colors whitespace-nowrap shrink-0"
            >
              <FileText className="w-4 h-4" />
              <span>Generar Reporte</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
