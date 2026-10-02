import React, { useState } from 'react';
import { Specialist } from '../types';

interface SpecialistsViewProps {
  specialists: Specialist[];
  onBookWithSpecialist: (doctorName: string) => void;
  onShowToast: (msg: string) => void;
  searchTerm?: string;
}

export const SpecialistsView: React.FC<SpecialistsViewProps> = ({
  specialists,
  onBookWithSpecialist,
  onShowToast,
  searchTerm = '',
}) => {
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('all');

  const filtered = specialists.filter((s) => {
    if (selectedSpecialty !== 'all' && !s.specialty.includes(selectedSpecialty)) return false;
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.specialty.toLowerCase().includes(q) ||
      s.subspecialty.toLowerCase().includes(q) ||
      s.degrees.toLowerCase().includes(q)
    );
  });

  return (
    <div className="flex flex-col w-full px-6 lg:px-10 py-8">
      {/* Masthead */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-3 text-xs mb-2">
            <span className="px-2.5 py-1 bg-[#0f2042] text-white font-bold tracking-widest text-[10px] rounded uppercase">
              FACULTAD MÉDICA &amp; COLEGIO QUIRÚRGICO
            </span>
            <span className="text-gray-400">•</span>
            <span className="italic font-serif text-gray-500">
              Corps Médical d'Élite Paris VIII
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#000922] font-semibold tracking-tight">
            Especialistas &amp; <span className="italic text-[#0051d5]">Cirujanos</span> Titulares
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-600 max-w-2xl font-serif italic">
            Diplomados europeos (EBVS), doctores investigadores y cirujanos de guardia dedicados a la máxima excelencia biomédica.
          </p>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1">
            Área:
          </span>
          {['all', 'Cirugía', 'Cardiología', 'Urgencias', 'Dermatología'].map((area) => (
            <button
              key={area}
              onClick={() => setSelectedSpecialty(area)}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                selectedSpecialty === area
                  ? 'bg-[#000922] text-white shadow-sm'
                  : 'bg-[#f1f4f8] text-gray-600 hover:bg-[#e5e8ec]'
              }`}
            >
              {area === 'all' ? 'Todos los Médicos' : area}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Specialists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        {filtered.map((spec) => (
          <article
            key={spec.id}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Doctor Head */}
              <div className="flex items-start justify-between gap-4 pb-4 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  {spec.avatar ? (
                    <img
                      src={spec.avatar}
                      alt={spec.name}
                      referrerPolicy="no-referrer"
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-gray-200 shadow-sm"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-[#0f2042] text-white flex items-center justify-center font-serif text-xl font-bold shadow-sm">
                      {spec.initials || 'DR'}
                    </div>
                  )}
                  <div>
                    <h3 className="font-serif text-xl text-[#000922] font-semibold">{spec.name}</h3>
                    <span className="text-xs font-semibold text-[#0051d5] block">{spec.specialty}</span>
                    <span className="text-[11px] text-gray-500 font-serif italic">{spec.subspecialty}</span>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full border ${spec.statusColor}`}
                >
                  {spec.status}
                </span>
              </div>

              {/* Degrees & Bio */}
              <div className="py-4 space-y-3">
                <div className="text-xs text-gray-700 font-mono bg-[#f7fafe] p-2.5 rounded border border-gray-200">
                  <span className="text-gray-400 text-[10px] block font-sans">ACREDITACIONES &amp; TÍTULOS</span>
                  {spec.degrees}
                </div>

                <p className="text-xs text-gray-600 leading-relaxed font-serif italic">
                  «{spec.bio}»
                </p>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                  <div className="p-2 bg-[#f1f4f8] rounded">
                    <span className="text-gray-400 text-[10px] block">UBICACIÓN / BOX</span>
                    <strong className="text-[#000922] text-xs">{spec.assignedRoom}</strong>
                  </div>
                  <div className="p-2 bg-[#f1f4f8] rounded">
                    <span className="text-gray-400 text-[10px] block">PACIENTES HOY</span>
                    <strong className="text-[#0051d5] text-xs">
                      {spec.activePatientsToday} consultas / cirugías
                    </strong>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs">
              <span className="text-gray-500 font-mono">{spec.phone}</span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => onShowToast(`Llamada directa iniciada con el despacho de ${spec.name}.`)}
                  className="px-3 py-1.5 bg-[#f1f4f8] text-[#000922] hover:bg-gray-200 text-xs font-semibold rounded-lg transition-colors"
                >
                  Llamar
                </button>
                <button
                  type="button"
                  onClick={() => onBookWithSpecialist(spec.name)}
                  className="px-3.5 py-1.5 bg-[#000922] hover:bg-[#0051d5] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-sm">calendar_month</span>
                  <span>Agendar Consulta</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
