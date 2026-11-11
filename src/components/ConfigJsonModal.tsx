import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Download, 
  Code, 
  RotateCcw, 
  Check, 
  AlertCircle, 
  FileJson, 
  Settings2, 
  Plus, 
  Trash2,
  FileSpreadsheet
} from 'lucide-react';
import { AttendanceConfig, Municipality, SessionInfo } from '../types';
import { 
  downloadJsonFile, 
  validateAndParseJson, 
  resetToDefaultConfig 
} from '../utils/storage';
import { DEFAULT_HIDALGO_CONFIG } from '../data/defaultHidalgoConfig';

interface ConfigJsonModalProps {
  isOpen: boolean;
  onClose: () => void;
  config: AttendanceConfig;
  onUpdateConfig: (newConfig: AttendanceConfig) => void;
}

export const ConfigJsonModal: React.FC<ConfigJsonModalProps> = ({
  isOpen,
  onClose,
  config,
  onUpdateConfig
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'editor' | 'session' | 'directory'>('upload');
  const [jsonText, setJsonText] = useState(() => JSON.stringify(config, null, 2));
  const [editorError, setEditorError] = useState<string | null>(null);
  const [editorSuccess, setEditorSuccess] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Editable session state
  const [sessionForm, setSessionForm] = useState<SessionInfo>({ ...config.sesion });

  // Quick state for adding a new municipality
  const [newMuniName, setNewMuniName] = useState('');
  const [newMuniPres, setNewMuniPres] = useState('');
  const [newMuniRegion, setNewMuniRegion] = useState('');

  if (!isOpen) return null;

  // Handler for uploading JSON via file input or drag-and-drop
  const handleFileProcess = (file: File) => {
    setEditorError(null);
    setEditorSuccess(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      if (!content) {
        setEditorError('El archivo seleccionado está vacío.');
        return;
      }

      const result = validateAndParseJson(content);
      if (result.valid && result.config) {
        onUpdateConfig(result.config);
        setJsonText(JSON.stringify(result.config, null, 2));
        setSessionForm({ ...result.config.sesion });
        setEditorSuccess(`¡Configuración cargada con éxito! Se cargaron ${result.config.municipios.length} municipios.`);
      } else {
        setEditorError(result.error || 'Formato de archivo inválido.');
      }
    };
    reader.onerror = () => {
      setEditorError('Error al leer el archivo desde el disco.');
    };
    reader.readAsText(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileProcess(e.target.files[0]);
    }
  };

  // Handler for live JSON editor save
  const handleApplyJsonEditor = () => {
    setEditorError(null);
    setEditorSuccess(null);

    const result = validateAndParseJson(jsonText);
    if (result.valid && result.config) {
      onUpdateConfig(result.config);
      setSessionForm({ ...result.config.sesion });
      setEditorSuccess(`Cambios aplicados correctamente. Total de municipios: ${result.config.municipios.length}`);
      setTimeout(() => setEditorSuccess(null), 3000);
    } else {
      setEditorError(result.error || 'Error al validar el JSON.');
    }
  };

  const handleBeautifyJson = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
      setEditorError(null);
    } catch (e: any) {
      setEditorError(`No se puede formatear: error de sintaxis en el JSON (${e.message})`);
    }
  };

  // Save Session metadata changes
  const handleSaveSession = (e: React.FormEvent) => {
    e.preventDefault();
    const updated: AttendanceConfig = {
      ...config,
      ultimaActualizacion: new Date().toISOString(),
      sesion: sessionForm
    };
    onUpdateConfig(updated);
    setJsonText(JSON.stringify(updated, null, 2));
    setEditorSuccess('Datos de la sesión guardados correctamente.');
    setTimeout(() => setEditorSuccess(null), 2500);
  };

  // Reset to default Hidalgo 84 municipalities
  const handleResetToDefault = () => {
    if (window.confirm('¿Deseas restaurar la lista oficial original de los 84 municipios de Hidalgo? Se restablecerán todos los nombres y el estado de asistencia.')) {
      const def = resetToDefaultConfig();
      onUpdateConfig(def);
      setJsonText(JSON.stringify(def, null, 2));
      setSessionForm({ ...def.sesion });
      setEditorSuccess('Se restableció la configuración predeterminada de los 84 municipios de Hidalgo.');
    }
  };

  // Download Current JSON
  const handleDownloadCurrent = () => {
    downloadJsonFile(config, `configuracion_asistencia_hidalgo_${new Date().toISOString().split('T')[0]}.json`);
  };

  // Download Clean Template
  const handleDownloadTemplate = () => {
    downloadJsonFile(DEFAULT_HIDALGO_CONFIG, 'plantilla_84_municipios_hidalgo.json');
  };

  // Add new municipality to directory
  const handleAddMunicipality = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMuniName.trim()) return;

    const newId = config.municipios.length > 0 
      ? Math.max(...config.municipios.map(m => m.id)) + 1 
      : 1;

    const newMuni: Municipality = {
      id: newId,
      clave: `13${String(newId).padStart(3, '0')}`,
      nombre: newMuniName.trim(),
      presidente: newMuniPres.trim() || 'Presidente(a) por designar',
      region: newMuniRegion.trim() || 'Región General',
      cargo: 'Presidente(a) Municipal Constitucional',
      status: 'ausente'
    };

    const updatedConfig: AttendanceConfig = {
      ...config,
      municipios: [...config.municipios, newMuni]
    };

    onUpdateConfig(updatedConfig);
    setJsonText(JSON.stringify(updatedConfig, null, 2));
    setNewMuniName('');
    setNewMuniPres('');
    setNewMuniRegion('');
    setEditorSuccess(`Municipio "${newMuni.nombre}" agregado con éxito.`);
    setTimeout(() => setEditorSuccess(null), 2500);
  };

  // Delete municipality
  const handleDeleteMunicipality = (id: number, name: string) => {
    if (window.confirm(`¿Seguro que deseas eliminar el municipio "${name}" de la lista?`)) {
      const updatedConfig: AttendanceConfig = {
        ...config,
        municipios: config.municipios.filter(m => m.id !== id)
      };
      onUpdateConfig(updatedConfig);
      setJsonText(JSON.stringify(updatedConfig, null, 2));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-neutral-900/70 backdrop-blur-xs overflow-y-auto">
      <div 
        className="bg-white dark:bg-neutral-900 rounded-2xl max-w-4xl w-full shadow-2xl border border-neutral-200 dark:border-neutral-800 my-6 overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="config-modal-title"
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between bg-neutral-50 dark:bg-neutral-800/60 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900 flex items-center justify-center font-bold">
              <FileJson className="w-5 h-5" />
            </div>
            <div>
              <h2 id="config-modal-title" className="text-base font-bold text-neutral-900 dark:text-neutral-100">
                Gestión de Archivo de Configuración JSON
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Carga, descarga y personaliza los municipios o funcionarios reutilizables
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Cerrar modal de configuración"
            className="p-1.5 rounded-lg text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-neutral-200 dark:border-neutral-800 px-6 gap-2 bg-white dark:bg-neutral-900 shrink-0 overflow-x-auto text-xs font-medium">
          <button
            onClick={() => setActiveTab('upload')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'upload'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-semibold'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Cargar y Descargar</span>
          </button>

          <button
            onClick={() => {
              setJsonText(JSON.stringify(config, null, 2));
              setActiveTab('editor');
            }}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'editor'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-semibold'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Editor JSON en Vivo</span>
          </button>

          <button
            onClick={() => setActiveTab('session')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'session'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-semibold'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Settings2 className="w-4 h-4" />
            <span>Datos de la Sesión</span>
          </button>

          <button
            onClick={() => setActiveTab('directory')}
            className={`py-3 px-3 border-b-2 transition-colors whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'directory'
                ? 'border-emerald-600 text-emerald-700 dark:text-emerald-400 font-semibold'
                : 'border-transparent text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Plus className="w-4 h-4" />
            <span>Directorio de Municipios ({config.municipios.length})</span>
          </button>
        </div>

        {/* Status Alerts */}
        {editorError && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-xs text-rose-800 dark:text-rose-200 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{editorError}</span>
          </div>
        )}

        {editorSuccess && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{editorSuccess}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1">
          
          {/* TAB 1: Upload and Download */}
          {activeTab === 'upload' && (
            <div className="space-y-6">
              
              {/* Drag and Drop Box */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-2">
                  Cargar Archivo de Configuración (.json)
                </label>
                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setDragOver(true);
                  }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all ${
                    dragOver
                      ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30'
                      : 'border-neutral-300 dark:border-neutral-700 hover:border-emerald-500 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/40'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json,application/json"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 mx-auto flex items-center justify-center mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    Arrastra tu archivo JSON aquí o haz clic para explorar
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Admite archivos de configuración completos o arreglos de municipios
                  </p>
                </div>
              </div>

              {/* Current Active Configuration Summary */}
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 text-xs">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-neutral-900 dark:text-neutral-100">
                    Configuración activa en el sistema
                  </span>
                  <span className="font-mono text-emerald-700 dark:text-emerald-400 font-semibold">
                    {config.municipios.length} municipios cargados
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-neutral-600 dark:text-neutral-300">
                  <div>Sesión: <span className="font-medium text-neutral-800 dark:text-neutral-200">{config.sesion.titulo}</span></div>
                  <div>Fecha: <span className="font-mono">{config.sesion.fecha} ({config.sesion.horaInicio} hrs)</span></div>
                  <div>Convocante: <span>{config.sesion.organoConvocante}</span></div>
                  <div>Sede: <span>{config.sesion.lugar}</span></div>
                </div>
              </div>

              {/* Download Buttons Section */}
              <div className="border-t border-neutral-200 dark:border-neutral-800 pt-5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-3">
                  Opciones de Exportación y Plantillas
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  
                  <button
                    onClick={handleDownloadCurrent}
                    className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500 bg-white dark:bg-neutral-800 text-left transition-all group"
                  >
                    <Download className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform mb-1.5" />
                    <span className="text-xs font-bold block text-neutral-900 dark:text-neutral-100">
                      Descargar JSON Actual
                    </span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 block">
                      Guarda los 84 municipios y el estado de asistencia actual
                    </span>
                  </button>

                  <button
                    onClick={handleDownloadTemplate}
                    className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-emerald-500 bg-white dark:bg-neutral-800 text-left transition-all group"
                  >
                    <FileJson className="w-5 h-5 text-neutral-600 dark:text-neutral-400 group-hover:scale-110 transition-transform mb-1.5" />
                    <span className="text-xs font-bold block text-neutral-900 dark:text-neutral-100">
                      Descargar Plantilla Base
                    </span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 block">
                      Plantilla oficial limpia con los 84 municipios de Hidalgo
                    </span>
                  </button>

                  <button
                    onClick={handleResetToDefault}
                    className="p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 hover:border-rose-500 bg-white dark:bg-neutral-800 text-left transition-all group"
                  >
                    <RotateCcw className="w-5 h-5 text-rose-600 group-hover:-rotate-90 transition-transform mb-1.5" />
                    <span className="text-xs font-bold block text-neutral-900 dark:text-neutral-100">
                      Restablecer Hidalgo (84)
                    </span>
                    <span className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5 block">
                      Restaura la lista original de municipios predeterminada
                    </span>
                  </button>

                </div>
              </div>

            </div>
          )}

          {/* TAB 2: Live JSON Code Editor */}
          {activeTab === 'editor' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
                  Modifica directamente el JSON para actualizar municipios, nombres o parámetros:
                </span>
                <button
                  type="button"
                  onClick={handleBeautifyJson}
                  className="px-2.5 py-1 text-xs font-medium rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
                >
                  Formatear / Dar formato
                </button>
              </div>

              <textarea
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
                rows={16}
                spellCheck={false}
                className="w-full font-mono text-xs p-4 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-neutral-950 text-emerald-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 leading-relaxed"
              />

              <div className="flex items-center justify-between pt-2">
                <span className="text-[11px] text-neutral-500">
                  Sugerencia: puedes copiar y pegar listas de cualquier hoja de cálculo convertida a JSON.
                </span>
                <button
                  type="button"
                  onClick={handleApplyJsonEditor}
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
                >
                  Validar y Aplicar Cambios
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: Session Configuration Form */}
          {activeTab === 'session' && (
            <form onSubmit={handleSaveSession} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                  Título de la Sesión o Asamblea *
                </label>
                <input
                  type="text"
                  required
                  value={sessionForm.titulo}
                  onChange={(e) => setSessionForm({ ...sessionForm, titulo: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                    Órgano Convocante *
                  </label>
                  <input
                    type="text"
                    required
                    value={sessionForm.organoConvocante}
                    onChange={(e) => setSessionForm({ ...sessionForm, organoConvocante: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                    Folio de Sesión
                  </label>
                  <input
                    type="text"
                    value={sessionForm.folioSesion || ''}
                    onChange={(e) => setSessionForm({ ...sessionForm, folioSesion: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                    Fecha *
                  </label>
                  <input
                    type="date"
                    required
                    value={sessionForm.fecha}
                    onChange={(e) => setSessionForm({ ...sessionForm, fecha: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                    Hora de Inicio *
                  </label>
                  <input
                    type="time"
                    required
                    value={sessionForm.horaInicio}
                    onChange={(e) => setSessionForm({ ...sessionForm, horaInicio: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                    Sede / Lugar *
                  </label>
                  <input
                    type="text"
                    required
                    value={sessionForm.lugar}
                    onChange={(e) => setSessionForm({ ...sessionForm, lugar: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                    Presidente(a) de la Mesa Directiva
                  </label>
                  <input
                    type="text"
                    value={sessionForm.presidenteMesa}
                    onChange={(e) => setSessionForm({ ...sessionForm, presidenteMesa: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  />
                </div>

                <div>
                  <label className="block font-semibold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                    Secretario(a) de Actas
                  </label>
                  <input
                    type="text"
                    value={sessionForm.secretarioActas}
                    onChange={(e) => setSessionForm({ ...sessionForm, secretarioActas: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
              </div>

              {/* Quorum configuration parameters */}
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/40 border border-neutral-200 dark:border-neutral-800 space-y-3">
                <span className="font-bold text-neutral-900 dark:text-neutral-100 block">
                  Reglas de Cómputo de Quórum Legal
                </span>

                <div className="flex flex-col sm:flex-row gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="tipoQuorum"
                      value="mayoria_simple"
                      checked={sessionForm.tipoQuorum === 'mayoria_simple'}
                      onChange={() => setSessionForm({ ...sessionForm, tipoQuorum: 'mayoria_simple' })}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Mayoría Simple (50% + 1 = 43 municipios)</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="tipoQuorum"
                      value="mayoria_calificada"
                      checked={sessionForm.tipoQuorum === 'mayoria_calificada'}
                      onChange={() => setSessionForm({ ...sessionForm, tipoQuorum: 'mayoria_calificada' })}
                      className="text-emerald-600 focus:ring-emerald-500"
                    />
                    <span>Mayoría Calificada (2/3 partes = 56 municipios)</span>
                  </label>
                </div>

                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-700">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={sessionForm.incluirRepresentantesEnQuorum}
                      onChange={(e) => setSessionForm({ ...sessionForm, incluirRepresentantesEnQuorum: e.target.checked })}
                      className="rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500"
                    />
                    <span className="text-neutral-700 dark:text-neutral-300">
                      Contabilizar a los comisionados / suplentes en representación para alcanzar el quórum legal
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg shadow-xs transition-colors"
                >
                  Guardar Datos de la Sesión
                </button>
              </div>
            </form>
          )}

          {/* TAB 4: Directory List & Add municipality */}
          {activeTab === 'directory' && (
            <div className="space-y-5">
              {/* Add new municipality form */}
              <form onSubmit={handleAddMunicipality} className="p-4 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-800/40 text-xs space-y-3">
                <h4 className="font-bold text-neutral-900 dark:text-neutral-100">
                  Añadir Nuevo Municipio a la Lista
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Nombre del Municipio *"
                    value={newMuniName}
                    onChange={(e) => setNewMuniName(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                  />
                  <input
                    type="text"
                    placeholder="Presidente(a) Municipal"
                    value={newMuniPres}
                    onChange={(e) => setNewMuniPres(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                  />
                  <input
                    type="text"
                    placeholder="Región Geográfica"
                    value={newMuniRegion}
                    onChange={(e) => setNewMuniRegion(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800"
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 rounded-lg transition-colors flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Agregar a la lista</span>
                  </button>
                </div>
              </form>

              {/* Existing municipalities list */}
              <div className="border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden max-h-80 overflow-y-auto">
                <table className="w-full text-left text-xs border-collapse">
                  <thead className="bg-neutral-100 dark:bg-neutral-800 sticky top-0 font-semibold text-neutral-600 dark:text-neutral-300">
                    <tr>
                      <th className="py-2 px-3 w-10 text-center">#</th>
                      <th className="py-2 px-3">Municipio</th>
                      <th className="py-2 px-3">Presidente(a)</th>
                      <th className="py-2 px-3">Región</th>
                      <th className="py-2 px-2 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                    {config.municipios.map((m) => (
                      <tr key={m.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                        <td className="py-2 px-3 text-center font-mono text-neutral-400">{m.id}</td>
                        <td className="py-2 px-3 font-semibold text-neutral-900 dark:text-neutral-100">{m.nombre}</td>
                        <td className="py-2 px-3 text-neutral-600 dark:text-neutral-300">{m.presidente}</td>
                        <td className="py-2 px-3 text-neutral-500">{m.region}</td>
                        <td className="py-2 px-2 text-right">
                          <button
                            type="button"
                            onClick={() => handleDeleteMunicipality(m.id, m.nombre)}
                            className="p-1 text-rose-500 hover:text-rose-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded"
                            title="Eliminar de la lista"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
