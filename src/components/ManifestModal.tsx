import React from 'react';
import { Appointment } from '../types';

interface ManifestModalProps {
  isOpen: boolean;
  onClose: () => void;
  appointments: Appointment[];
}

export const ManifestModal: React.FC<ManifestModalProps> = ({
  isOpen,
  onClose,
  appointments,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-[#000922]/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-white text-[#181c1f] rounded-xl shadow-2xl overflow-hidden border border-gray-200 flex flex-col max-h-[92vh]">
        {/* Top Control Bar */}
        <div className="p-4 bg-[#f1f4f8] border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0051d5]">picture_as_pdf</span>
            <span className="font-semibold text-xs text-[#000922]">
              Manifiesto Clínico Oficial · Folio № 140
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="px-3 py-1.5 bg-[#0f2042] text-white hover:bg-[#0051d5] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">print</span>
              <span>Imprimir Documento</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-500 hover:text-[#000922] transition-colors rounded-lg hover:bg-gray-200"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>
        </div>

        {/* Paper Document Preview */}
        <div className="p-8 md:p-12 overflow-y-auto bg-[#faf8f5] space-y-8 font-serif">
          {/* Masthead */}
          <div className="border-b-2 border-[#000922] pb-6 flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
            <div>
              <span className="text-[10px] font-sans font-bold tracking-widest text-[#0051d5] uppercase block mb-1">
                RÉPUBLIQUE FRANÇAISE · ORDRE DES MÉDECINS VÉTÉRINAIRES
              </span>
              <h1 className="text-3xl font-serif text-[#000922] font-bold tracking-tight">
                VÉTERINAIRE CLINICAL DISPATCH
              </h1>
              <span className="text-xs text-gray-600 italic">
                Dispensaire Central de Chirurgie Majeure &amp; Médecine Interne — Paris VIII
              </span>
            </div>
            <div className="text-right text-xs font-sans">
              <span className="font-bold text-[#000922] block">FASCÍCULO 42 // MATIN</span>
              <span className="text-gray-500">24 Octobre 2024 · 08:00 - 19:30</span>
              <span className="text-[#0051d5] font-semibold block">FOLIO № 140 / S-GERMAIN</span>
            </div>
          </div>

          {/* Editorial Circular Protocol */}
          <div className="p-4 bg-white border border-[#0f2042]/20 rounded shadow-sm">
            <span className="font-sans font-bold text-[10px] uppercase text-[#0051d5] tracking-widest block mb-1">
              DIRECTRICES DEL DÍA · PROTOCOLO ÉDITORIAL № 44
            </span>
            <p className="italic text-sm text-[#000922] leading-relaxed">
              «Todo paciente programado para anestesia inhalatoria general debe contar con hemograma completo de menos de 48 horas y pre-oxigenación verificada en bitácora antes de la inducción.»
            </p>
          </div>

          {/* Table of Scheduled Patients */}
          <div>
            <h3 className="text-sm font-sans font-bold text-[#000922] uppercase tracking-wider mb-3">
              I. Matrícula Oficial de Pacientes Programados para la Jornada
            </h3>
            <div className="overflow-x-auto border border-gray-300 rounded bg-white">
              <table className="w-full text-left text-xs font-sans border-collapse">
                <thead>
                  <tr className="bg-[#f1f4f8] text-[#000922] border-b border-gray-300">
                    <th className="p-3 font-semibold">Horario</th>
                    <th className="p-3 font-semibold">Expediente</th>
                    <th className="p-3 font-semibold">Paciente &amp; Especie</th>
                    <th className="p-3 font-semibold">Procedimiento</th>
                    <th className="p-3 font-semibold">Especialista</th>
                    <th className="p-3 font-semibold">Tutor / Teléfono</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-gray-50">
                      <td className="p-3 font-mono font-medium text-gray-700 whitespace-nowrap">
                        {apt.timeSlot.split(' ')[0]}
                      </td>
                      <td className="p-3 font-mono text-[11px] text-[#0051d5] whitespace-nowrap">
                        {apt.expedienteNumber.replace('EXPEDIENTE ', '')}
                      </td>
                      <td className="p-3">
                        <strong className="block text-[#000922]">{apt.patientName}</strong>
                        <span className="text-[11px] text-gray-500 italic">{apt.breed.split('·')[0]}</span>
                      </td>
                      <td className="p-3">
                        <span className="font-semibold text-gray-800">{apt.procedureTag}</span>
                      </td>
                      <td className="p-3 text-gray-700">{apt.attendingName}</td>
                      <td className="p-3 text-gray-600 text-[11px]">
                        <div>{apt.ownerName}</div>
                        <span className="text-gray-400 font-mono">{apt.ownerPhone}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Validation & Signatures */}
          <div className="pt-6 border-t border-gray-300 grid grid-cols-2 md:grid-cols-3 gap-6 font-sans text-xs">
            <div>
              <span className="text-gray-500 block mb-8">Cirujana Jefe de Quirófano:</span>
              <div className="font-serif italic font-bold text-[#000922] text-sm">
                Dra. Élise Moreau, ECVS
              </div>
              <span className="text-[10px] text-gray-400">Signature Numérique Certifiée</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-8">Coordinación de Urgencias &amp; UCI:</span>
              <div className="font-serif italic font-bold text-[#000922] text-sm">
                Dra. Camille Sauvage, ECVECC
              </div>
              <span className="text-[10px] text-gray-400">Signature Numérique Certifiée</span>
            </div>
            <div>
              <span className="text-gray-500 block mb-8">Dirección Médica Dispensario:</span>
              <div className="font-serif italic font-bold text-[#000922] text-sm">
                Dr. Alexandre Laurent, PhD
              </div>
              <span className="text-[10px] text-gray-400">Paris VIII · Octobre 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
