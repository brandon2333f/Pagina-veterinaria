import React, { useState } from 'react';
import { PatientDossier } from '../types';

interface PatientsViewProps {
  patients: PatientDossier[];
  onSelectPatient: (patient: PatientDossier) => void;
  onOpenBooking: () => void;
  searchTerm?: string;
}

export const PatientsView: React.FC<PatientsViewProps> = ({
  patients,
  onSelectPatient,
  onOpenBooking,
  searchTerm = '',
}) => {
  const [speciesFilter, setSpeciesFilter] = useState<'all' | 'Canino' | 'Felino' | 'Equino'>('all');

  const filtered = patients.filter((pat) => {
    if (speciesFilter !== 'all' && pat.species !== speciesFilter) return false;
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      pat.name.toLowerCase().includes(q) ||
      pat.breed.toLowerCase().includes(q) ||
      pat.owner.name.toLowerCase().includes(q) ||
      pat.microchip.toLowerCase().includes(q) ||
      pat.expedienteNumber.toLowerCase().includes(q) ||
      pat.assignedVet.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col w-full px-6 lg:px-10 py-8">
      {/* Editorial Header for Patient Archives */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-3 text-xs mb-2">
            <span className="px-2.5 py-1 bg-[#0f2042] text-white font-bold tracking-widest text-[10px] rounded uppercase">
              ARCHIVOS MÉDICOS CENTRALES
            </span>
            <span className="text-gray-400">•</span>
            <span className="italic font-serif text-gray-500">
              Registres Biologiques &amp; Antécédents Hospitaliers
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#000922] font-semibold tracking-tight">
            Expedientes de <span className="italic text-[#0051d5]">Pacientes</span> &amp; Dossiers Clínicos
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-600 max-w-2xl font-serif italic">
            Fichas biomédicas estandarizadas, trazabilidad genética, perfiles inmunes y analítica avanzada de alta resolución.
          </p>
        </div>

        {/* Species Filter Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1">
            Especie:
          </span>
          <button
            onClick={() => setSpeciesFilter('all')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              speciesFilter === 'all'
                ? 'bg-[#000922] text-white shadow-sm'
                : 'bg-[#f1f4f8] text-gray-600 hover:bg-[#e5e8ec]'
            }`}
          >
            Todos ({patients.length})
          </button>
          <button
            onClick={() => setSpeciesFilter('Canino')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              speciesFilter === 'Canino'
                ? 'bg-[#000922] text-white shadow-sm'
                : 'bg-[#f1f4f8] text-gray-600 hover:bg-[#e5e8ec]'
            }`}
          >
            Caninos ({patients.filter((p) => p.species === 'Canino').length})
          </button>
          <button
            onClick={() => setSpeciesFilter('Felino')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              speciesFilter === 'Felino'
                ? 'bg-[#000922] text-white shadow-sm'
                : 'bg-[#f1f4f8] text-gray-600 hover:bg-[#e5e8ec]'
            }`}
          >
            Felinos ({patients.filter((p) => p.species === 'Felino').length})
          </button>
        </div>
      </div>

      {/* Grid of Dossier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {filtered.map((patient) => (
          <article
            key={patient.id}
            onClick={() => onSelectPatient(patient)}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              {/* Top row */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <img
                    src={patient.photoUrl}
                    alt={patient.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover border border-gray-200 shadow-sm group-hover:scale-105 transition-transform"
                  />
                  <div>
                    <span className="font-mono text-xs font-bold text-[#0051d5]">
                      {patient.expedienteNumber}
                    </span>
                    <h3 className="font-serif text-xl text-[#000922] font-semibold group-hover:text-[#0051d5] transition-colors">
                      {patient.name}
                    </h3>
                    <span className="text-xs text-gray-500">{patient.breed}</span>
                  </div>
                </div>

                <span className="px-2.5 py-1 text-[10px] font-bold uppercase rounded bg-[#f1f4f8] text-gray-700">
                  {patient.species}
                </span>
              </div>

              {/* Diagnosis & Critical Info */}
              <div className="py-4 space-y-3">
                <div className="p-3 bg-[#f7fafe] rounded-lg border border-gray-200/80">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                    DIAGNÓSTICO PRINCIPAL
                  </span>
                  <p className="text-xs text-[#181c1f] leading-relaxed">
                    {patient.currentDiagnosis}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>
                    <span className="text-gray-400 text-[10px] block">ESPECIALISTA A CARGO</span>
                    <strong className="text-[#000922]">{patient.assignedVet}</strong>
                  </div>
                  <div>
                    <span className="text-gray-400 text-[10px] block">GRUPO SANGUÍNEO</span>
                    <strong className="text-[#000922]">{patient.bloodType}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span className="material-symbols-outlined text-sm text-gray-400">badge</span>
                  <span>Microchip:</span>
                  <span className="font-mono font-medium text-gray-700">{patient.microchip}</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500">
                Tutor: <strong className="text-gray-800">{patient.owner.name}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="px-3 py-1.5 bg-[#f1f4f8] text-[#000922] group-hover:bg-[#000922] group-hover:text-white font-semibold rounded-lg transition-colors flex items-center gap-1"
                >
                  <span>Abrir Expediente</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
