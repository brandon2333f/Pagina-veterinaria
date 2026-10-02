import React, { useState } from 'react';
import { PatientDossier } from '../types';

interface PatientDetailsModalProps {
  patient: PatientDossier | null;
  isOpen: boolean;
  onClose: () => void;
  onBookNext?: (patientName: string) => void;
}

export const PatientDetailsModal: React.FC<PatientDetailsModalProps> = ({
  patient,
  isOpen,
  onClose,
  onBookNext,
}) => {
  const [activeTab, setActiveTab] = useState<'resumen' | 'laboratorio' | 'tratamientos' | 'anamnesis'>('resumen');
  const [newNote, setNewNote] = useState('');
  const [notesList, setNotesList] = useState<string[]>([
    'Control post-ingreso: Animal alerta y cooperativo. Constantes estables.',
    'Se confirma ayuno previo de 8 horas para procedimiento anestésico.',
  ]);

  if (!isOpen || !patient) return null;

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    setNotesList((prev) => [newNote.trim(), ...prev]);
    setNewNote('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-[#000922]/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white text-[#181c1f] rounded-2xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col max-h-[92vh]">
        {/* Header dossier */}
        <div className="p-6 bg-[#f1f4f8] border-b border-gray-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img
              src={patient.photoUrl}
              alt={patient.name}
              referrerPolicy="no-referrer"
              className="w-16 h-16 rounded-xl object-cover border border-gray-300 shadow-sm"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-widest text-[#0051d5] uppercase text-[10px]">
                  {patient.expedienteNumber}
                </span>
                <span className="text-gray-300">•</span>
                <span className="text-xs text-gray-500 font-mono">Chip: {patient.microchip}</span>
              </div>
              <h2 className="font-serif text-2xl text-[#000922] font-semibold">{patient.name}</h2>
              <span className="text-xs text-gray-600">
                {patient.breed} · {patient.age} · {patient.weight} · {patient.gender}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto">
            {onBookNext && (
              <button
                onClick={() => {
                  onClose();
                  onBookNext(patient.name);
                }}
                className="px-3 py-1.5 bg-[#0051d5] text-white text-xs font-semibold rounded-lg hover:bg-[#316bf3] transition-colors flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">calendar_add_on</span>
                <span>Programar Cita</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-gray-500 hover:text-[#000922] transition-colors rounded-lg hover:bg-gray-200"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="flex items-center gap-4 px-6 border-b border-gray-200 bg-white text-xs">
          <button
            onClick={() => setActiveTab('resumen')}
            className={`py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'resumen'
                ? 'text-[#0051d5] border-[#0051d5]'
                : 'text-gray-500 border-transparent hover:text-[#000922]'
            }`}
          >
            Resumen General &amp; Vitals
          </button>
          <button
            onClick={() => setActiveTab('laboratorio')}
            className={`py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'laboratorio'
                ? 'text-[#0051d5] border-[#0051d5]'
                : 'text-gray-500 border-transparent hover:text-[#000922]'
            }`}
          >
            Laboratorio &amp; Diagnóstico ({patient.labResults.length})
          </button>
          <button
            onClick={() => setActiveTab('tratamientos')}
            className={`py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'tratamientos'
                ? 'text-[#0051d5] border-[#0051d5]'
                : 'text-gray-500 border-transparent hover:text-[#000922]'
            }`}
          >
            Farmacología &amp; Recetas ({patient.prescriptions.length})
          </button>
          <button
            onClick={() => setActiveTab('anamnesis')}
            className={`py-3 font-semibold transition-colors border-b-2 ${
              activeTab === 'anamnesis'
                ? 'text-[#0051d5] border-[#0051d5]'
                : 'text-gray-500 border-transparent hover:text-[#000922]'
            }`}
          >
            Evolución &amp; Notas ({notesList.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
          {activeTab === 'resumen' && (
            <div className="space-y-6">
              {/* Critical Highlights */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-[#f7fafe] rounded-xl border border-gray-200">
                  <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider block mb-1">
                    DIAGNÓSTICO VIGENTE
                  </span>
                  <p className="font-semibold text-sm text-[#000922]">{patient.currentDiagnosis}</p>
                  <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between text-gray-600">
                    <span>Especialista Asignado:</span>
                    <strong className="text-[#0051d5]">{patient.assignedVet}</strong>
                  </div>
                </div>

                <div className="p-4 bg-[#f7fafe] rounded-xl border border-gray-200">
                  <span className="text-[10px] font-bold uppercase text-gray-500 tracking-wider block mb-1">
                    CONTACTO DEL TUTOR
                  </span>
                  <div className="font-semibold text-sm text-[#000922]">{patient.owner.name}</div>
                  <div className="text-gray-600 mt-1">{patient.owner.phone}</div>
                  <div className="text-gray-500 text-[11px]">{patient.owner.address}</div>
                </div>
              </div>

              {/* Vitals Grid */}
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-gray-500 block mb-2">
                  ÚLTIMAS CONSTANTES VITALES EN EXPEDIENTE
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-white border border-gray-200 rounded-lg">
                    <span className="text-gray-400 block text-[10px]">TEMPERATURA</span>
                    <span className="text-base font-bold text-[#000922]">{patient.vitalHistory.temp}</span>
                  </div>
                  <div className="p-3 bg-white border border-gray-200 rounded-lg">
                    <span className="text-gray-400 block text-[10px]">FREC. CARDÍACA</span>
                    <span className="text-base font-bold text-[#000922]">{patient.vitalHistory.heartRate}</span>
                  </div>
                  <div className="p-3 bg-white border border-gray-200 rounded-lg">
                    <span className="text-gray-400 block text-[10px]">FREC. RESPIRATORIA</span>
                    <span className="text-base font-bold text-[#000922]">{patient.vitalHistory.respRate}</span>
                  </div>
                  <div className="p-3 bg-white border border-gray-200 rounded-lg">
                    <span className="text-gray-400 block text-[10px]">PRESIÓN ARTERIAL</span>
                    <span className="text-base font-bold text-[#000922]">{patient.vitalHistory.bp}</span>
                  </div>
                </div>
              </div>

              {/* Anamnesis quote */}
              <div className="p-4 bg-[#f1f4f8] rounded-xl border-l-4 border-[#0051d5]">
                <span className="text-[10px] font-bold uppercase text-[#0051d5] tracking-widest block mb-1">
                  HISTORIAL &amp; MOTIVO DE INGRESO
                </span>
                <p className="font-serif italic text-gray-700 leading-relaxed text-sm">
                  «{patient.anamnesis}»
                </p>
              </div>

              {/* Allergies & Blood type */}
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div>
                  <span className="text-gray-500">Grupo Sanguíneo: </span>
                  <strong className="text-[#000922]">{patient.bloodType}</strong>
                </div>
                <span className="text-gray-300">•</span>
                <div>
                  <span className="text-gray-500">Alergias Documentadas: </span>
                  <strong className="text-red-700">{patient.allergies.join(', ')}</strong>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'laboratorio' && (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                Historial de Analíticas, Hemogramas e Imagenología
              </span>
              <div className="divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden bg-white">
                {patient.labResults.map((lab, i) => (
                  <div key={i} className="p-4 flex items-center justify-between gap-4 hover:bg-gray-50">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#000922]">{lab.test}</span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            lab.status === 'Óptimo'
                              ? 'bg-emerald-100 text-emerald-800'
                              : lab.status === 'Alerta'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}
                        >
                          {lab.status}
                        </span>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">{lab.result}</p>
                    </div>
                    <div className="text-right text-xs text-gray-400 font-mono whitespace-nowrap">
                      {lab.date}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tratamientos' && (
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-500 block">
                Plan Farmacológico y Posología Activa
              </span>
              <div className="divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden bg-white">
                {patient.prescriptions.map((rx, i) => (
                  <div key={i} className="p-4 flex items-center justify-between gap-4 hover:bg-gray-50">
                    <div>
                      <div className="font-semibold text-xs text-[#000922]">{rx.medication}</div>
                      <div className="text-gray-600 text-xs mt-1">
                        Dosis: <strong className="text-gray-800">{rx.dosage}</strong> · Frecuencia: {rx.frequency}
                      </div>
                    </div>
                    <div className="text-right text-xs">
                      <span className="text-[#0051d5] font-semibold">{rx.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'anamnesis' && (
            <div className="space-y-4">
              <form onSubmit={handleAddNote} className="flex gap-2">
                <input
                  type="text"
                  placeholder="Añadir nota médica de evolución al expediente..."
                  className="flex-1 bg-[#f7fafe] border border-gray-200 rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-[#0051d5]"
                  value={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#000922] text-white text-xs font-semibold rounded-lg hover:bg-[#0051d5] transition-colors"
                >
                  Guardar Nota
                </button>
              </form>

              <div className="space-y-2">
                {notesList.map((note, i) => (
                  <div key={i} className="p-3 bg-[#f7fafe] rounded-lg border border-gray-200 text-xs text-gray-700">
                    <span className="text-[10px] text-gray-400 block mb-1">
                      Nota de guardia · Dra. Élise Moreau / Equipo Clínico
                    </span>
                    {note}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-[#f1f4f8] border-t border-gray-200 flex items-center justify-between text-xs">
          <span className="text-gray-500 font-serif italic">
            Última actualización sincronizada: {patient.lastVisit}
          </span>
          <button
            onClick={() => alert(`Informe completo del expediente ${patient.expedienteNumber} descargado.`)}
            className="px-4 py-2 bg-[#000922] hover:bg-[#0051d5] text-white font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">download</span>
            <span>Descargar Expediente Completo (PDF)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
