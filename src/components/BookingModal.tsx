import React, { useState } from 'react';
import { Appointment, AppointmentCategory } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAppointment: (appointment: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onAddAppointment,
}) => {
  const [patientName, setPatientName] = useState('');
  const [species, setSpecies] = useState<'CANINO' | 'FELINO' | 'EQUINO'>('CANINO');
  const [breed, setBreed] = useState('');
  const [weight, setWeight] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [procedureType, setProcedureType] = useState<AppointmentCategory>('consulta');
  const [vetAssigned, setVetAssigned] = useState('Dra. Élise Moreau');
  const [timeSlot, setTimeSlot] = useState('14:00 — 14:45');
  const [diagnosisHeadline, setDiagnosisHeadline] = useState('Motivo de Consulta:');
  const [diagnosisText, setDiagnosisText] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !ownerName.trim()) return;

    const newApt: Appointment = {
      id: `apt-${Date.now()}`,
      expedienteNumber: `EXPEDIENTE № 2024-${Math.floor(1000 + Math.random() * 9000)}`,
      roomBadge:
        procedureType === 'cirugia'
          ? 'BLOQUE DE QUIRÓFANO SATÉLITE · SALA 2'
          : procedureType === 'urgencia'
          ? 'UNIDAD DE TRIAJE & EMERGENCIAS · BOX 2'
          : 'CONSULTORIO MÉDICO GENERAL · BOX 1',
      patientName: patientName.trim(),
      patientType: species,
      breed: breed.trim() || `${species === 'CANINO' ? 'Canino' : species === 'FELINO' ? 'Felino' : 'Equino'} Sin Especificar`,
      weight: weight.trim() ? `${weight.trim()} KG` : '12.0 KG',
      age: '2 años',
      chip: `Chip ${Math.floor(10000 + Math.random() * 90000)}`,
      photoUrl:
        species === 'FELINO'
          ? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAFQrqrla1sKuOwp-1nt3YJ48VUIJQUX1r4Itdp50MH2OcPubgVZZNjMz_L55S1DK-pqn_BJ9OkPNnyqDLk0xhPIHzQTenCN8IgcrvM5QceldBPxv2egVjB4SxkVW1hRKLmjpMcgmQmCnpUny51vlOOeqPFNoaq95sEMrZomUs-GUCid6eopPJDkblI4rhTR5LgDbKuksmSdem2392BgWk_fKJXtBV9WMXvxzC_zSDFQ177zaoVcBP0'
          : 'https://lh3.googleusercontent.com/aida-public/AB6AXuAkM7eyyb8WOEC6mk1M5fK_SPFJs87iW-pZd8wst9EYRMYZtQjYz0kUktGm_ID6pixWVDhkYvMyY1-vbo48bCufIpvRraDlXtVH0Pe9t51bJ1WJ9PgyhNVwdkK_NGTFs8eTX9s2pwSTRvJrAe6jsK_BbLNrfvs7ZwVLexOudetGLi8W3bH7Mx5MAFgIgETBMdltf5yE_0WOcIXtqF-4itTfXiYAbdbD4s_jMMeRZNJaWlX9bAwgdBzC',
      procedureTag:
        procedureType === 'cirugia'
          ? 'Cirugía Especializada'
          : procedureType === 'urgencia'
          ? 'Evaluación Crítica Inmediata'
          : 'Consulta de Especialidad',
      category: procedureType,
      urgencyLevel: procedureType === 'urgencia' ? 'critica' : procedureType === 'cirugia' ? 'alta' : 'normal',
      diagnosisHeadline: diagnosisHeadline || 'Motivo de Consulta:',
      diagnosisText:
        diagnosisText.trim() ||
        'Ingreso registrado para valoración protocolaria y control asistencial en dispensario.',
      attendingName: vetAssigned,
      attendingRole:
        vetAssigned.includes('Moreau')
          ? 'Cirujana Especialista · ECVS'
          : vetAssigned.includes('Mercier')
          ? 'Especialista en Cardiología'
          : vetAssigned.includes('Sauvage')
          ? 'Especialista en Urgencias & UCI'
          : 'Dermatología Veterinaria Avanzada',
      attendingInitials: vetAssigned.split(' ').map((n) => n[0]).join('').slice(0, 2),
      timeSlot: `${timeSlot} (45 MIN)`,
      ownerName: ownerName.trim(),
      ownerPhone: ownerPhone.trim() || '+33 6 12 34 56 78',
      status: 'programada',
    };

    onAddAppointment(newApt);
    onClose();
    // Reset form
    setPatientName('');
    setBreed('');
    setWeight('');
    setOwnerName('');
    setOwnerPhone('');
    setDiagnosisText('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#000922]/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Right Drawer */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-white shadow-2xl flex flex-col justify-between overflow-y-auto">
          {/* Header */}
          <div className="p-8 bg-[#f1f4f8] border-b border-gray-200 flex items-start justify-between">
            <div>
              <span className="font-bold tracking-widest text-[#0051d5] uppercase text-[10px] block mb-1">
                PROTOCOLO DE ADMISIÓN HOSPITALARIA
              </span>
              <h2 className="font-serif text-2xl text-[#000922] font-semibold">
                Agendar Nueva Consulta o Intervención
              </h2>
              <p className="text-xs text-gray-600 font-serif italic mt-1">
                Asignación de recursos de quirófano, diagnóstico de alta resolución y especialista en planta.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-500 hover:text-[#000922] transition-colors rounded-lg hover:bg-gray-200"
              type="button"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-8 flex-1 flex flex-col gap-6">
            {/* Fieldset: Patient */}
            <div className="flex flex-col gap-4">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                1. IDENTIFICACIÓN DEL PACIENTE
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#000922] mb-1">
                    Nombre del Paciente *
                  </label>
                  <input
                    className="w-full bg-[#f7fafe] border border-gray-200 px-3 py-2 rounded-lg text-xs text-[#181c1f] outline-none focus:ring-1 focus:ring-[#0051d5] focus:border-[#0051d5]"
                    placeholder="p. ej. Archibald, Luna, Bella..."
                    required
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#000922] mb-1">
                    Especie *
                  </label>
                  <select
                    className="w-full bg-[#f7fafe] border border-gray-200 px-3 py-2 rounded-lg text-xs text-[#181c1f] outline-none focus:ring-1 focus:ring-[#0051d5]"
                    value={species}
                    onChange={(e) => setSpecies(e.target.value as any)}
                  >
                    <option value="CANINO">Canino</option>
                    <option value="FELINO">Felino</option>
                    <option value="EQUINO">Equino</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#000922] mb-1">
                    Raza / Variedad
                  </label>
                  <input
                    className="w-full bg-[#f7fafe] border border-gray-200 px-3 py-2 rounded-lg text-xs text-[#181c1f] outline-none focus:ring-1 focus:ring-[#0051d5]"
                    placeholder="p. ej. Golden Retriever, Maine Coon..."
                    type="text"
                    value={breed}
                    onChange={(e) => setBreed(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#000922] mb-1">
                    Peso Estimado (KG)
                  </label>
                  <input
                    className="w-full bg-[#f7fafe] border border-gray-200 px-3 py-2 rounded-lg text-xs text-[#181c1f] outline-none focus:ring-1 focus:ring-[#0051d5]"
                    placeholder="p. ej. 6.8 o 32.4"
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#000922] mb-1">
                    Tutor / Titular Legal *
                  </label>
                  <input
                    className="w-full bg-[#f7fafe] border border-gray-200 px-3 py-2 rounded-lg text-xs text-[#181c1f] outline-none focus:ring-1 focus:ring-[#0051d5]"
                    placeholder="Nombre completo del propietario"
                    required
                    type="text"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#000922] mb-1">
                    Teléfono Móvil Concierge *
                  </label>
                  <input
                    className="w-full bg-[#f7fafe] border border-gray-200 px-3 py-2 rounded-lg text-xs text-[#181c1f] outline-none focus:ring-1 focus:ring-[#0051d5]"
                    placeholder="+33 6 12 34 56 78"
                    type="tel"
                    value={ownerPhone}
                    onChange={(e) => setOwnerPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Fieldset: Clinical Reason */}
            <div className="flex flex-col gap-4 pt-4 border-t border-gray-100">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                2. MOTIVO CLÍNICO &amp; PROGRAMACIÓN
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#000922] mb-1">
                    Tipo de Procedimiento *
                  </label>
                  <select
                    className="w-full bg-[#f7fafe] border border-gray-200 px-3 py-2 rounded-lg text-xs text-[#181c1f] outline-none focus:ring-1 focus:ring-[#0051d5]"
                    value={procedureType}
                    onChange={(e) => setProcedureType(e.target.value as AppointmentCategory)}
                  >
                    <option value="consulta">Consulta de Especialidad</option>
                    <option value="cirugia">Cirugía Mayor / Quirófano</option>
                    <option value="urgencia">Ingreso de Urgencia Crítico</option>
                    <option value="diagnostico">Ecografía / Imagenología</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#000922] mb-1">
                    Especialista Asignado *
                  </label>
                  <select
                    className="w-full bg-[#f7fafe] border border-gray-200 px-3 py-2 rounded-lg text-xs text-[#181c1f] outline-none focus:ring-1 focus:ring-[#0051d5]"
                    value={vetAssigned}
                    onChange={(e) => setVetAssigned(e.target.value)}
                  >
                    <option value="Dra. Élise Moreau">Dra. Élise Moreau (Cirugía &amp; Ortopedia)</option>
                    <option value="Dr. Jean-Luc Mercier">Dr. Jean-Luc Mercier (Cardiología)</option>
                    <option value="Dra. Camille Sauvage">Dra. Camille Sauvage (Urgencias &amp; UCI)</option>
                    <option value="Dr. Antoine Blanchard">Dr. Antoine Blanchard (Dermatología)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#000922] mb-1">
                    Encabezado Clínico
                  </label>
                  <input
                    className="w-full bg-[#f7fafe] border border-gray-200 px-3 py-2 rounded-lg text-xs text-[#181c1f] outline-none focus:ring-1 focus:ring-[#0051d5]"
                    type="text"
                    value={diagnosisHeadline}
                    onChange={(e) => setDiagnosisHeadline(e.target.value)}
                    placeholder="Diagnóstico / Indicación / Motivo"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#000922] mb-1">
                    Horario Estimado
                  </label>
                  <select
                    className="w-full bg-[#f7fafe] border border-gray-200 px-3 py-2 rounded-lg text-xs text-[#181c1f] outline-none focus:ring-1 focus:ring-[#0051d5]"
                    value={timeSlot}
                    onChange={(e) => setTimeSlot(e.target.value)}
                  >
                    <option value="14:00 — 14:45">14:00 — 14:45 CEST</option>
                    <option value="15:00 — 15:45">15:00 — 15:45 CEST</option>
                    <option value="16:00 — 16:45">16:00 — 16:45 CEST</option>
                    <option value="17:00 — 17:45">17:00 — 17:45 CEST</option>
                    <option value="18:00 — 18:45">18:00 — 18:45 CEST</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#000922] mb-1">
                  Notas Pre-Clínicas / Anamnesis
                </label>
                <textarea
                  className="w-full bg-[#f7fafe] border border-gray-200 p-3 rounded-lg text-xs text-[#181c1f] outline-none focus:ring-1 focus:ring-[#0051d5]"
                  placeholder="Antecedentes médicos relevantes, sintomatología actual, medicación en curso..."
                  rows={3}
                  value={diagnosisText}
                  onChange={(e) => setDiagnosisText(e.target.value)}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 flex items-center justify-end gap-3 mt-auto border-t border-gray-100">
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-gray-100 text-[#000922] text-xs font-semibold rounded-lg hover:bg-gray-200 transition-all"
                type="button"
              >
                Cancelar
              </button>
              <button
                className="px-6 py-2.5 bg-[#000922] text-white text-xs font-semibold rounded-lg hover:bg-[#0051d5] transition-all shadow-md active:scale-95 flex items-center gap-1.5"
                type="submit"
              >
                <span className="material-symbols-outlined text-sm">check</span>
                <span>Confirmar y Expedir Ficha</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
