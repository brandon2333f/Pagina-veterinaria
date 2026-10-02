import React, { useState } from 'react';
import { Appointment, AppointmentCategory, WaitingPatient, Specialist } from '../types';

interface AgendaViewProps {
  appointments: Appointment[];
  waitingPatients: WaitingPatient[];
  specialists: Specialist[];
  onOpenBooking: () => void;
  onOpenManifest: () => void;
  onOpenLiveMonitor: (apt: Appointment) => void;
  onOpenPatientDossier: (patientName: string) => void;
  onShowToast: (msg: string) => void;
  searchTerm?: string;
}

export const AgendaView: React.FC<AgendaViewProps> = ({
  appointments,
  waitingPatients,
  specialists,
  onOpenBooking,
  onOpenManifest,
  onOpenLiveMonitor,
  onOpenPatientDossier,
  onShowToast,
  searchTerm = '',
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | AppointmentCategory>('all');
  const [viewMode, setViewMode] = useState<'diario' | 'semanal' | 'mensual'>('diario');

  // Filter appointments
  const filteredAppointments = appointments.filter((apt) => {
    const matchesFilter = activeFilter === 'all' || apt.category === activeFilter;
    if (!matchesFilter) return false;
    if (!searchTerm.trim()) return true;
    const query = searchTerm.toLowerCase();
    return (
      apt.patientName.toLowerCase().includes(query) ||
      apt.breed.toLowerCase().includes(query) ||
      apt.ownerName.toLowerCase().includes(query) ||
      apt.chip.toLowerCase().includes(query) ||
      apt.attendingName.toLowerCase().includes(query)
    );
  });

  const totalCount = appointments.length;
  const surgeryCount = appointments.filter((a) => a.category === 'cirugia').length;
  const urgencyCount = appointments.filter((a) => a.category === 'urgencia').length;
  const consultCount = appointments.filter((a) => a.category === 'consulta').length;

  return (
    <div className="flex flex-col w-full">
      {/* Top Editorial Header & Chronicle Masthead */}
      <section className="w-full px-6 lg:px-10 py-8 md:py-10">
        <div className="flex flex-col gap-6">
          {/* Volume Marker & Utility Actions */}
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap text-xs">
              <span className="px-2.5 py-1 bg-[#0f2042] text-white font-bold tracking-widest text-[10px] rounded uppercase">
                VOL. XXIV — FASCÍCULO 42
              </span>
              <span className="text-gray-500 font-bold tracking-widest uppercase text-[10px]">
                EDICIÓN MATUTINA — JEUDI 24 OCTOBRE 2024
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#0051d5]" />
              <span className="italic font-serif text-gray-600 text-xs">
                Registre Officiel de Soins &amp; Chirurgie
              </span>
            </div>

            {/* Controls: View Mode & Primary Action */}
            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="inline-flex p-1 bg-[#ebeef2] rounded-lg shadow-inner text-xs">
                <button
                  onClick={() => {
                    setViewMode('diario');
                    onShowToast('Vista diaria de consultas activada.');
                  }}
                  className={`px-3 py-1 font-semibold rounded transition-all ${
                    viewMode === 'diario'
                      ? 'bg-[#0f2042] text-white shadow-sm'
                      : 'text-gray-600 hover:text-[#000922]'
                  }`}
                  type="button"
                >
                  Diario
                </button>
                <button
                  onClick={() => {
                    setViewMode('semanal');
                    onShowToast('Vista semanal sinóptica cargada.');
                  }}
                  className={`px-3 py-1 font-semibold rounded transition-all ${
                    viewMode === 'semanal'
                      ? 'bg-[#0f2042] text-white shadow-sm'
                      : 'text-gray-600 hover:text-[#000922]'
                  }`}
                  type="button"
                >
                  Semanal
                </button>
                <button
                  onClick={() => {
                    setViewMode('mensual');
                    onShowToast('Planificación mensual en revisión.');
                  }}
                  className={`px-3 py-1 font-semibold rounded transition-all ${
                    viewMode === 'mensual'
                      ? 'bg-[#0f2042] text-white shadow-sm'
                      : 'text-gray-600 hover:text-[#000922]'
                  }`}
                  type="button"
                >
                  Mensual
                </button>
              </div>

              <button
                onClick={onOpenManifest}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#000922] font-semibold text-xs rounded-lg shadow-sm hover:bg-[#e5e8ec] border border-gray-200 transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-base text-[#0051d5]">picture_as_pdf</span>
                <span>Descargar Manifiesto (PDF)</span>
              </button>

              <button
                onClick={onOpenBooking}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#000922] text-white font-semibold text-xs rounded-lg shadow-md hover:bg-[#0051d5] transition-all active:scale-95"
                type="button"
              >
                <span className="material-symbols-outlined text-base">calendar_add_on</span>
                <span>+ Agendar Cita</span>
              </button>
            </div>
          </div>

          {/* Hero Typographic Title */}
          <div className="flex flex-col xl:flex-row items-baseline justify-between gap-6">
            <div className="max-w-4xl">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#000922] tracking-tight leading-tight">
                Crónica Diaria de <span className="italic font-serif font-normal text-[#0051d5]">Consultas</span> &amp; Procedimientos
              </h1>
              <p className="mt-2 text-sm md:text-base text-gray-600 max-w-2xl font-serif italic">
                Coordinación sinóptica de pacientes internados, diagnósticos de imagen avanzada y bloques de quirófano mayor en Saint-Germain / Paris VIII.
              </p>
            </div>

            {/* Quick Filter Selector */}
            <div className="flex items-center gap-1.5 flex-wrap self-start xl:self-auto">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-1">
                Filtro Rápido:
              </span>
              <button
                onClick={() => setActiveFilter('all')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === 'all'
                    ? 'bg-[#000922] text-white shadow-sm'
                    : 'bg-[#f1f4f8] text-gray-600 hover:bg-[#e5e8ec]'
                }`}
              >
                Todas ({totalCount})
              </button>
              <button
                onClick={() => setActiveFilter('cirugia')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === 'cirugia'
                    ? 'bg-[#000922] text-white shadow-sm'
                    : 'bg-[#f1f4f8] text-gray-600 hover:bg-[#e5e8ec]'
                }`}
              >
                Cirugías ({surgeryCount})
              </button>
              <button
                onClick={() => setActiveFilter('urgencia')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === 'urgencia'
                    ? 'bg-[#ba1a1a] text-white shadow-sm'
                    : 'bg-[#f1f4f8] text-gray-600 hover:bg-[#e5e8ec]'
                }`}
              >
                Urgencias ({urgencyCount})
              </button>
              <button
                onClick={() => setActiveFilter('consulta')}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  activeFilter === 'consulta'
                    ? 'bg-[#000922] text-white shadow-sm'
                    : 'bg-[#f1f4f8] text-gray-600 hover:bg-[#e5e8ec]'
                }`}
              >
                Consultas ({consultCount})
              </button>
            </div>
          </div>

          {/* High-Fashion Editorial Stat Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Stat Card 1 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between text-gray-500">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#0051d5]">
                  CITAS MATRICULADAS
                </span>
                <span className="material-symbols-outlined text-[#0051d5] text-xl">event_available</span>
              </div>
              <div className="my-3 flex items-baseline gap-2">
                <span className="font-serif text-5xl text-[#000922] font-normal tracking-tight">
                  {totalCount}
                </span>
                <span className="text-[10px] font-bold uppercase bg-[#dbe1ff]/60 text-[#00174b] px-2 py-0.5 rounded">
                  +{urgencyCount} urgentes
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Capacidad de quirófanos al 85%</span>
                <span className="font-serif italic text-[#000922]">Dossier #08</span>
              </div>
            </div>

            {/* Stat Card 2 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between text-gray-500">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#000922]">
                  EN SALA &amp; CONSULTA
                </span>
                <span className="material-symbols-outlined text-[#000922] text-xl">vital_signs</span>
              </div>
              <div className="my-3 flex items-baseline gap-2">
                <span className="font-serif text-5xl text-[#000922] font-normal tracking-tight">
                  04
                </span>
                <span className="text-xs text-gray-500">
                  Boxes 1, 2, Ecografía &amp; Quirófano B
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0051d5] animate-ping" />
                  <span>En atención continua</span>
                </span>
                <span className="font-serif italic text-[#000922]">Live</span>
              </div>
            </div>

            {/* Stat Card 3 */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between text-gray-500">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  ÍNDICE DE PUNTUALIDAD
                </span>
                <span className="material-symbols-outlined text-gray-400 text-xl">history_toggle_off</span>
              </div>
              <div className="my-3 flex items-baseline gap-1">
                <span className="font-serif text-5xl text-[#000922] font-normal tracking-tight">
                  98.2<span className="text-2xl font-serif text-[#0051d5]">%</span>
                </span>
                <span className="text-xs text-gray-500 font-serif italic ml-2">
                  +1.4% vs. semana ant.
                </span>
              </div>
              <div className="w-full bg-[#ebeef2] h-1.5 rounded-full overflow-hidden">
                <div className="bg-[#0051d5] h-full rounded-full" style={{ width: '98.2%' }} />
              </div>
            </div>

            {/* Stat Card 4 */}
            <div className="bg-[#0f2042] text-white p-5 rounded-xl shadow-md flex flex-col justify-between relative overflow-hidden">
              <div className="flex items-center justify-between text-[#d9e2ff]">
                <span className="text-[10px] font-bold uppercase tracking-wider">
                  TIEMPO QUIRÚRGICO
                </span>
                <span className="material-symbols-outlined text-[#dbe1ff] text-xl">medical_services</span>
              </div>
              <div className="my-3 flex items-baseline gap-1">
                <span className="font-serif text-5xl text-white font-normal tracking-tight">
                  320
                </span>
                <span className="text-xl text-[#d9e2ff] font-serif italic ml-1">minutos</span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#7988b0]">
                <span>3 intervenciones complejas</span>
                <span className="text-[10px] font-bold tracking-wider uppercase text-[#dbe1ff]">
                  BLOC OP-1
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Editorial Content Grid: Timeline + Right Intelligence Rail */}
      <section className="w-full px-6 lg:px-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Master Timeline (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {/* Timeline Section Masthead */}
            <div className="flex items-center justify-between bg-[#f1f4f8] px-5 py-3 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm text-[#000922]">
                  Cronología Diaria de Consultas
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#e0e3e7] text-gray-600">
                  14 OCT
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-600 font-serif italic">
                <span>
                  Hora Actual: <strong className="text-[#000922] font-sans font-semibold">10:45 AM CEST</strong>
                </span>
              </div>
            </div>

            {/* Empty state if search yields nothing */}
            {filteredAppointments.length === 0 && (
              <div className="bg-white p-12 rounded-xl text-center border border-gray-200">
                <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">search_off</span>
                <h3 className="font-serif text-lg text-[#000922] font-semibold">No se hallaron registros clínicos</h3>
                <p className="text-xs text-gray-500 mt-1">Intente cambiar el filtro rápido o término de búsqueda.</p>
                <button
                  onClick={() => setActiveFilter('all')}
                  className="mt-4 px-4 py-2 bg-[#000922] text-white text-xs font-semibold rounded-lg"
                >
                  Restablecer Filtros
                </button>
              </div>
            )}

            {/* Appointment Cards */}
            {filteredAppointments.map((apt) => (
              <article
                key={apt.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col border border-gray-200 group"
              >
                {/* Header bar of the card */}
                <div
                  className={`px-5 py-2 flex items-center justify-between text-xs ${
                    apt.category === 'urgencia'
                      ? 'bg-[#ffdad6] text-[#93000a] font-bold'
                      : apt.category === 'cirugia'
                      ? 'bg-[#000922] text-white'
                      : 'bg-[#e5e8ec] text-[#000922]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-bold tracking-widest uppercase text-[10px]">
                      {apt.roomBadge}
                    </span>
                    {apt.status === 'en-curso' && (
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    )}
                    {apt.category === 'urgencia' && (
                      <span className="material-symbols-outlined text-sm">warning</span>
                    )}
                  </div>
                  <span className="text-[10px] tracking-wider uppercase opacity-80">
                    {apt.expedienteNumber}
                  </span>
                </div>

                {/* Body dossier */}
                <div className="p-5 flex flex-col sm:flex-row gap-5 items-start">
                  {/* Patient Photo & specs */}
                  <div className="flex flex-col items-center flex-shrink-0 text-center w-full sm:w-auto">
                    <img
                      src={apt.photoUrl}
                      alt={apt.patientName}
                      referrerPolicy="no-referrer"
                      className="w-24 h-24 rounded-lg object-cover shadow-sm border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => onOpenPatientDossier(apt.patientName)}
                      title="Ver expediente clínico completo"
                    />
                    <span className="mt-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      {apt.patientType} · {apt.weight}
                    </span>
                    <span className="text-[11px] text-gray-500 font-serif italic">
                      {apt.age} · {apt.chip}
                    </span>
                  </div>

                  {/* Detail Dossier Content */}
                  <div className="flex-1 flex flex-col justify-between w-full">
                    <div>
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <div>
                          <h2
                            onClick={() => onOpenPatientDossier(apt.patientName)}
                            className="font-serif text-xl text-[#000922] font-semibold tracking-tight hover:text-[#0051d5] cursor-pointer transition-colors"
                          >
                            {apt.patientName}
                          </h2>
                          <span className="text-xs text-gray-500">{apt.breed}</span>
                        </div>
                        <span
                          className={`px-2.5 py-1 text-[10px] rounded uppercase font-bold tracking-wider ${
                            apt.category === 'cirugia'
                              ? 'bg-[#ffdad6] text-[#93000a]'
                              : apt.category === 'urgencia'
                              ? 'bg-[#ba1a1a] text-white'
                              : 'bg-[#dbe1ff] text-[#00174b]'
                          }`}
                        >
                          {apt.procedureTag}
                        </span>
                      </div>

                      <div className="mt-3 p-3 bg-[#f1f4f8] rounded-lg text-xs leading-relaxed text-[#181c1f]">
                        <strong className="font-semibold text-[#000922]">{apt.diagnosisHeadline} </strong>
                        {apt.diagnosisText}
                      </div>
                    </div>

                    {/* Attending Surgeon & Action Buttons */}
                    <div className="mt-4 pt-3 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        {apt.attendingAvatar ? (
                          <img
                            src={apt.attendingAvatar}
                            alt={apt.attendingName}
                            referrerPolicy="no-referrer"
                            className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#0f2042] text-white flex items-center justify-center font-serif text-xs font-bold">
                            {apt.attendingInitials || 'DR'}
                          </div>
                        )}
                        <div>
                          <div className="text-xs font-semibold text-[#000922] leading-tight">
                            {apt.attendingName}
                          </div>
                          <span className="text-[11px] text-gray-500">{apt.attendingRole}</span>
                        </div>
                      </div>

                      {/* Contextual Action Buttons */}
                      <div className="flex items-center gap-2 flex-wrap">
                        {apt.category === 'cirugia' && (
                          <>
                            <button
                              onClick={() => onOpenLiveMonitor(apt)}
                              className="px-3 py-1.5 bg-[#e5e8ec] hover:bg-gray-300 text-[#000922] text-xs font-semibold rounded transition-all flex items-center gap-1"
                              type="button"
                            >
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              <span>Ver Monitor en Vivo</span>
                            </button>
                            <button
                              onClick={() => onOpenPatientDossier(apt.patientName)}
                              className="px-3 py-1.5 bg-[#000922] hover:bg-[#0051d5] text-white text-xs font-semibold rounded transition-all"
                              type="button"
                            >
                              Ficha Quirúrgica
                            </button>
                          </>
                        )}

                        {apt.category === 'consulta' && (
                          <>
                            <button
                              onClick={() => onOpenPatientDossier(apt.patientName)}
                              className="px-3 py-1.5 bg-[#e5e8ec] hover:bg-gray-300 text-[#000922] text-xs font-semibold rounded transition-all"
                              type="button"
                            >
                              Historial Previo
                            </button>
                            <button
                              onClick={() => {
                                onShowToast(`Informe clínico para ${apt.patientName} iniciado en el despacho.`);
                              }}
                              className="px-3 py-1.5 bg-[#0051d5] hover:bg-[#000922] text-white text-xs font-semibold rounded transition-all"
                              type="button"
                            >
                              Iniciar Informe
                            </button>
                          </>
                        )}

                        {apt.category === 'urgencia' && (
                          <>
                            <button
                              onClick={() => {
                                alert(`Gasometría de ${apt.patientName}:\npH: 7.29\nLactato: 3.8 mmol/L\nHCO3-: 17.2\nEstado: Acidosis metabólica compensada.`);
                              }}
                              className="px-3 py-1.5 bg-[#e5e8ec] hover:bg-gray-300 text-[#000922] text-xs font-semibold rounded transition-all"
                              type="button"
                            >
                              Resultados Gasometría
                            </button>
                            <button
                              onClick={() => {
                                onShowToast(`Quirófano prioritario autorizado para ${apt.patientName}. Alerta enviada a Bloc OP-2.`);
                              }}
                              className="px-3 py-1.5 bg-[#ba1a1a] hover:bg-[#93000a] text-white text-xs font-semibold rounded transition-all shadow-sm"
                              type="button"
                            >
                              Autorizar Quirófano
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Micro Footer */}
                <div className="bg-[#ebeef2] px-5 py-2 flex items-center justify-between text-xs text-gray-600 border-t border-gray-200">
                  <span className="font-bold uppercase tracking-wider text-[#0051d5] text-[10px]">
                    {apt.timeSlot}
                  </span>
                  <span>
                    Tutor: <strong className="text-[#000922] font-medium">{apt.ownerName}</strong> ·{' '}
                    <span className="font-mono text-gray-500">{apt.ownerPhone}</span>
                  </span>
                </div>
              </article>
            ))}

            {/* Folio Marker Footer */}
            <div className="flex items-center justify-between py-4 text-gray-400 font-bold uppercase tracking-widest text-[10px] border-t border-gray-200">
              <span>PARIS VIII · DISPENSARIO CENTRAL</span>
              <span>DOCUMENTO OFICIAL FOLIO № 140 / SECCIÓN MATIN</span>
              <span>FIN DE JORNADA PREVISTA: 19:30</span>
            </div>
          </div>

          {/* Right Column: Editorial Intelligence Rail & Waiting Room (5 Cols) */}
          <aside className="lg:col-span-5 flex flex-col gap-6">
            {/* En Sala de Espera */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-100">
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#0051d5] tracking-widest">
                    EN TIEMPO REAL
                  </span>
                  <h3 className="font-serif text-xl text-[#000922] font-semibold">
                    Sala de Espera de Pacientes
                  </h3>
                </div>
                <span className="px-2.5 py-1 bg-[#dbe1ff] text-[#00174b] font-bold text-[10px] rounded uppercase">
                  {waitingPatients.length} en Recepción
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {waitingPatients.map((wait) => (
                  <div
                    key={wait.id}
                    onClick={() => {
                      onShowToast(`Llamando a ${wait.name} al consultorio médico.`);
                    }}
                    className="p-3 bg-[#f1f4f8] rounded-lg flex items-center justify-between gap-3 hover:bg-[#e5e8ec] transition-all cursor-pointer group"
                    title="Click para llamar al consultorio"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded flex items-center justify-center font-bold font-serif text-sm ${wait.colorClass}`}
                      >
                        {wait.initial}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-[#000922] group-hover:text-[#0051d5] transition-colors">
                          {wait.name}
                        </span>
                        <span className="text-[11px] text-gray-500">{wait.owner}</span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <span className="text-[10px] font-bold text-[#0051d5] block">
                        {wait.statusText}
                      </span>
                      <span className="text-[11px] text-gray-500">{wait.subText}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Roster of Active Specialists */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-gray-100">
                <div>
                  <span className="text-[10px] font-bold uppercase text-gray-400 tracking-widest">
                    CUADRO MÉDICO
                  </span>
                  <h3 className="font-serif text-xl text-[#000922] font-semibold">
                    Especialistas de Guardia
                  </h3>
                </div>
                <span className="text-xs font-serif italic text-gray-500">
                  {specialists.length} Médicos en Turno
                </span>
              </div>

              <div className="space-y-3.5">
                {specialists.map((spec) => (
                  <div key={spec.id} className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      {spec.avatar ? (
                        <img
                          src={spec.avatar}
                          alt={spec.name}
                          referrerPolicy="no-referrer"
                          className="w-9 h-9 rounded-full object-cover ring-1 ring-gray-200"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-[#dbe1ff] text-[#00174b] flex items-center justify-center font-serif font-bold text-xs">
                          {spec.initials || 'DR'}
                        </div>
                      )}
                      <div>
                        <h4 className="text-xs font-semibold text-[#000922] leading-tight">
                          {spec.name}
                        </h4>
                        <span className="text-[11px] text-gray-500">{spec.specialty}</span>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${spec.statusColor}`}
                    >
                      {spec.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Editorial Clinical Protocol Callout / Pull Quote */}
            <div className="bg-[#0f2042] text-white rounded-xl p-6 shadow-md relative overflow-hidden">
              <div className="relative z-10 flex flex-col gap-2.5">
                <span className="text-[10px] font-bold uppercase text-[#dbe1ff] tracking-widest">
                  DIRECTRICES DEL DÍA · PROTOCOLO ÉDITORIAL
                </span>
                <blockquote className="font-serif text-base italic leading-snug text-white">
                  «Todo paciente programado para anestesia inhalatoria general debe contar con hemograma completo de menos de 48 horas y pre-oxigenación verificada en bitácora.»
                </blockquote>
                <div className="flex items-center justify-between pt-1 text-[#7988b0] text-xs">
                  <span>Firma: Comité Quirúrgico Saint-Germain</span>
                  <span className="text-[10px] font-bold uppercase text-[#dbe1ff]">CIRCULAR NO. 44</span>
                </div>
              </div>
            </div>

            {/* Weekly Clinical Volume Mini Visualization */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] font-bold uppercase text-gray-400">
                    DISTRIBUCIÓN DE CASOS
                  </span>
                  <h4 className="text-sm font-semibold text-[#000922]">
                    Carga Asistencial de la Semana
                  </h4>
                </div>
                <span className="text-sm font-bold text-[#0051d5]">114 Pacientes</span>
              </div>

              {/* Minimal Interactive SVG Bar Chart */}
              <div className="w-full h-32 flex items-end justify-between gap-2 pt-2">
                {[
                  { day: 'LUN', count: 18, height: 60, current: false },
                  { day: 'MAR', count: 22, height: 78, current: false },
                  { day: 'MIÉ', count: 26, height: 94, current: false },
                  { day: 'HOY', count: 18, height: 65, current: true },
                  { day: 'VIE', count: 19, height: 68, current: false },
                  { day: 'SÁB', count: 11, height: 40, current: false },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center gap-1 group cursor-pointer"
                    onClick={() => onShowToast(`Carga asistencial ${item.day}: ${item.count} pacientes atendidos.`)}
                  >
                    <span
                      className={`text-[11px] tabular-nums transition-transform group-hover:-translate-y-1 ${
                        item.current ? 'text-[#0051d5] font-bold' : 'text-gray-400'
                      }`}
                    >
                      {item.count}
                    </span>
                    <div
                      className={`w-full rounded-t transition-all ${
                        item.current
                          ? 'bg-[#0051d5] shadow-sm'
                          : 'bg-[#e5e8ec] group-hover:bg-gray-400'
                      }`}
                      style={{ height: `${item.height}px` }}
                    />
                    <span
                      className={`text-[10px] uppercase font-bold tracking-wider ${
                        item.current ? 'text-[#000922]' : 'text-gray-400'
                      }`}
                    >
                      {item.day}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
};
