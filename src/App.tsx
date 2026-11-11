import React, { useState, useEffect, useMemo } from 'react';
import { 
  AttendanceConfig, 
  Municipality, 
  AttendanceStatus 
} from './types';
import { 
  loadSavedConfig, 
  saveConfigToStorage, 
  calculateQuorumStats, 
  resetToDefaultConfig 
} from './utils/storage';
import { Header } from './components/Header';
import { QuorumBar } from './components/QuorumBar';
import { RollCallControls } from './components/RollCallControls';
import { MunicipalityCard } from './components/MunicipalityCard';
import { MunicipalityTable } from './components/MunicipalityTable';
import { RepresentationModal } from './components/RepresentationModal';
import { EditMunicipalityModal } from './components/EditMunicipalityModal';
import { ReportModal } from './components/ReportModal';
import { ConfigJsonModal } from './components/ConfigJsonModal';
import { Building2, Search, FileText, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<AttendanceConfig>(loadSavedConfig);
  const [currentNavTab, setCurrentNavTab] = useState<'lista' | 'reporte' | 'config'>('lista');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'todos' | AttendanceStatus>('todos');
  const [regionFilter, setRegionFilter] = useState('todas');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Modals state
  const [repModalOpen, setRepModalOpen] = useState(false);
  const [selectedMuniForRep, setSelectedMuniForRep] = useState<Municipality | null>(null);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedMuniForEdit, setSelectedMuniForEdit] = useState<Municipality | null>(null);

  const [isReportOpen, setIsReportOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);

  // Sync dark class on documentElement
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Persist configuration whenever it changes
  useEffect(() => {
    saveConfigToStorage(config);
  }, [config]);

  // Calculate live statistics
  const stats = useMemo(() => calculateQuorumStats(config), [config]);

  // Distinct regions available
  const regions = useMemo(() => {
    const set = new Set<string>();
    config.municipios.forEach((m) => {
      if (m.region) set.add(m.region);
    });
    return Array.from(set).sort();
  }, [config.municipios]);

  // Filtered municipalities
  const filteredMunicipios = useMemo(() => {
    return config.municipios.filter((m) => {
      // Status filter
      if (statusFilter !== 'todos' && m.status !== statusFilter) {
        return false;
      }
      // Region filter
      if (regionFilter !== 'todas' && m.region !== regionFilter) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = m.nombre.toLowerCase().includes(query);
        const matchPres = m.presidente.toLowerCase().includes(query);
        const matchClave = m.clave.toLowerCase().includes(query);
        const matchRep = m.representanteNombre?.toLowerCase().includes(query);
        if (!matchName && !matchPres && !matchClave && !matchRep) {
          return false;
        }
      }
      return true;
    });
  }, [config.municipios, statusFilter, regionFilter, searchQuery]);

  // Update a single municipality status
  const handleStatusChange = (id: number, newStatus: AttendanceStatus) => {
    const now = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    setConfig((prev) => ({
      ...prev,
      ultimaActualizacion: new Date().toISOString(),
      municipios: prev.municipios.map((m) => {
        if (m.id === id) {
          return {
            ...m,
            status: newStatus,
            horaRegistro: newStatus !== 'ausente' ? now : undefined
          };
        }
        return m;
      })
    }));
  };

  // Open representation modal
  const handleRequestRepresentation = (municipality: Municipality) => {
    setSelectedMuniForRep(municipality);
    setRepModalOpen(true);
  };

  // Save representation details
  const handleSaveRepresentation = (
    id: number,
    repNombre: string,
    repCargo: string,
    observaciones?: string
  ) => {
    const now = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    setConfig((prev) => ({
      ...prev,
      ultimaActualizacion: new Date().toISOString(),
      municipios: prev.municipios.map((m) => {
        if (m.id === id) {
          return {
            ...m,
            status: 'representacion',
            representanteNombre: repNombre,
            representanteCargo: repCargo,
            observaciones: observaciones || m.observaciones,
            horaRegistro: now
          };
        }
        return m;
      })
    }));
  };

  // Open edit municipality modal
  const handleOpenEdit = (municipality: Municipality) => {
    setSelectedMuniForEdit(municipality);
    setEditModalOpen(true);
  };

  // Save edited municipality
  const handleSaveEditedMunicipality = (updated: Municipality) => {
    setConfig((prev) => ({
      ...prev,
      ultimaActualizacion: new Date().toISOString(),
      municipios: prev.municipios.map((m) => (m.id === updated.id ? updated : m))
    }));
  };

  // Batch mark all
  const handleMarkAll = (status: 'presente' | 'ausente') => {
    const now = new Date().toLocaleTimeString('es-MX', { hour: '2-digit', minute: '2-digit' });
    setConfig((prev) => ({
      ...prev,
      ultimaActualizacion: new Date().toISOString(),
      municipios: prev.municipios.map((m) => ({
        ...m,
        status,
        horaRegistro: status === 'presente' ? now : undefined
      }))
    }));
  };

  // Reset entire attendance
  const handleResetSession = () => {
    if (window.confirm('¿Reiniciar la lista de asistencia? Todos los 84 municipios volverán al estado "Ausente".')) {
      setConfig((prev) => ({
        ...prev,
        ultimaActualizacion: new Date().toISOString(),
        municipios: prev.municipios.map((m) => ({
          ...m,
          status: 'ausente',
          representanteNombre: undefined,
          representanteCargo: undefined,
          horaRegistro: undefined
        }))
      }));
    }
  };

  // Update whole config from JSON import
  const handleUpdateConfig = (newConfig: AttendanceConfig) => {
    setConfig(newConfig);
  };

  return (
    <div className="min-h-screen bg-neutral-100/60 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col font-sans transition-colors">
      
      {/* Header Top Bar */}
      <Header
        currentTab={currentNavTab}
        onTabChange={(tab) => {
          setCurrentNavTab(tab);
          if (tab === 'reporte') setIsReportOpen(true);
          if (tab === 'config') setIsConfigOpen(true);
        }}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((prev) => !prev)}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenConfig={() => setIsConfigOpen(true)}
        totalPresentes={stats.totalEfectivo}
        totalMunicipios={stats.total}
      />

      {/* Quorum and Metrics Live Banner */}
      <QuorumBar
        stats={stats}
        session={config.sesion}
        onOpenReport={() => setIsReportOpen(true)}
        onOpenConfig={() => setIsConfigOpen(true)}
        onMarkAll={handleMarkAll}
        onResetSession={handleResetSession}
      />

      {/* Main Roll-Call Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Search, Filter Tabs and View mode switcher */}
        <RollCallControls
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          regionFilter={regionFilter}
          onRegionFilterChange={setRegionFilter}
          regions={regions}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          counts={{
            total: config.municipios.length,
            presentes: stats.presentes,
            representados: stats.representados,
            ausentes: stats.ausentes
          }}
        />

        {/* Results Counter / Filter Indicator */}
        <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 px-1">
          <div>
            Mostrando <span className="font-mono font-semibold text-neutral-800 dark:text-neutral-200">{filteredMunicipios.length}</span> de {config.municipios.length} municipios
            {searchQuery && (
              <span> · Coincidentes con "<strong className="text-neutral-800 dark:text-neutral-200">{searchQuery}</strong>"</span>
            )}
            {regionFilter !== 'todas' && (
              <span> · Región: <strong className="text-neutral-800 dark:text-neutral-200">{regionFilter}</strong></span>
            )}
          </div>
          {(searchQuery || regionFilter !== 'todas' || statusFilter !== 'todos') && (
            <button
              onClick={() => {
                setSearchQuery('');
                setRegionFilter('todas');
                setStatusFilter('todos');
              }}
              className="text-emerald-700 dark:text-emerald-400 hover:underline font-medium"
            >
              Limpiar filtros
            </button>
          )}
        </div>

        {/* Empty state when no matches */}
        {filteredMunicipios.length === 0 ? (
          <div className="text-center py-16 px-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
            <Building2 className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
            <h3 className="text-base font-bold text-neutral-900 dark:text-neutral-100">
              No se encontraron municipios
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm mx-auto">
              No hay municipios que coincidan con los criterios de búsqueda o filtro seleccionados.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setRegionFilter('todas');
                setStatusFilter('todos');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg hover:bg-emerald-100 dark:hover:bg-emerald-900/40 transition-colors"
            >
              Restablecer filtros
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          /* Cards Grid View (Tactile Big Buttons) */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3.5">
            {filteredMunicipios.map((municipality) => (
              <MunicipalityCard
                key={municipality.id}
                municipality={municipality}
                onStatusChange={handleStatusChange}
                onRequestRepresentation={handleRequestRepresentation}
                onEditMunicipality={handleOpenEdit}
              />
            ))}
          </div>
        ) : (
          /* Executive Table View */
          <MunicipalityTable
            municipios={filteredMunicipios}
            onStatusChange={handleStatusChange}
            onRequestRepresentation={handleRequestRepresentation}
            onEditMunicipality={handleOpenEdit}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 py-6 text-xs text-neutral-500 dark:text-neutral-400 mt-auto transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              Sistema de Asistencia de Presidentes Municipales
            </span>
            <span aria-hidden="true">·</span>
            <span>84 Municipios de Hidalgo</span>
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setIsConfigOpen(true)}
              className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
            >
              Cargar / Descargar JSON
            </button>
            <button
              onClick={() => setIsReportOpen(true)}
              className="hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors"
            >
              Acta de Sesión
            </button>
            <span>Periodo Constitucional Hidalguense</span>
          </div>
        </div>
      </footer>

      {/* Representation Modal */}
      <RepresentationModal
        isOpen={repModalOpen}
        municipality={selectedMuniForRep}
        onClose={() => {
          setRepModalOpen(false);
          setSelectedMuniForRep(null);
        }}
        onSave={handleSaveRepresentation}
      />

      {/* Edit Municipality Modal */}
      <EditMunicipalityModal
        isOpen={editModalOpen}
        municipality={selectedMuniForEdit}
        onClose={() => {
          setEditModalOpen(false);
          setSelectedMuniForEdit(null);
        }}
        onSave={handleSaveEditedMunicipality}
      />

      {/* Official Printable Report & Quorum Certificate Modal */}
      <ReportModal
        isOpen={isReportOpen}
        onClose={() => {
          setIsReportOpen(false);
          if (currentNavTab === 'reporte') setCurrentNavTab('lista');
        }}
        config={config}
      />

      {/* JSON File Manager & Session Settings Modal */}
      <ConfigJsonModal
        isOpen={isConfigOpen}
        onClose={() => {
          setIsConfigOpen(false);
          if (currentNavTab === 'config') setCurrentNavTab('lista');
        }}
        config={config}
        onUpdateConfig={handleUpdateConfig}
      />

    </div>
  );
}
