import React, { useState } from 'react';
import { SurgerySuite } from '../types';

interface SurgeriesViewProps {
  suites: SurgerySuite[];
  onOpenLiveMonitor: (suiteName: string) => void;
  onShowToast: (msg: string) => void;
}

export const SurgeriesView: React.FC<SurgeriesViewProps> = ({
  suites,
  onOpenLiveMonitor,
  onShowToast,
}) => {
  const [checklist, setChecklist] = useState({
    hemograma: true,
    preoxigenacion: true,
    consentimiento: true,
    analgesia: true,
    esterilizacion: true,
    antibiotico: false,
  });

  const toggleCheck = (key: keyof typeof checklist) => {
    setChecklist((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      onShowToast(`Checklist quirúrgico actualizado.`);
      return next;
    });
  };

  return (
    <div className="flex flex-col w-full px-6 lg:px-10 py-8">
      {/* Editorial Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-3 text-xs mb-2">
            <span className="px-2.5 py-1 bg-[#0f2042] text-white font-bold tracking-widest text-[10px] rounded uppercase">
              BLOQUE QUIRÚRGICO DE ALTA COMPLEJIDAD
            </span>
            <span className="text-gray-400">•</span>
            <span className="italic font-serif text-gray-500">
              Quirófanos Estériles &amp; UCI Postoperatoria
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#000922] font-semibold tracking-tight">
            Cirugías, Bloques OP &amp; <span className="italic text-[#0051d5]">Cuidados Críticos</span>
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-600 max-w-2xl font-serif italic">
            Monitorización invasiva, trazabilidad de anestesia inhalatoria continua y protocolos de esterilidad según Circular No. 44.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-white border border-gray-200 rounded-xl shadow-sm flex items-center gap-3 text-xs">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <div>
              <span className="text-gray-400 text-[10px] uppercase font-bold block">
                FILTRACIÓN HEPA SALA 1 &amp; 2
              </span>
              <strong className="text-[#000922]">Presión Positiva Activa · ISO 5</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid: Suites on Left, Protocol & ICU on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
        {/* Operating Suites (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">
            SITUACIÓN EN TIEMPO REAL DE LAS SALAS QUIRÚRGICAS
          </h3>

          {suites.map((suite) => (
            <div
              key={suite.id}
              className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg font-semibold text-[#000922]">
                      {suite.name}
                    </span>
                    {suite.status === 'En Intervención' && (
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                    )}
                  </div>
                  <span
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full ${
                      suite.status === 'En Intervención'
                        ? 'bg-[#ffdad6] text-[#93000a]'
                        : suite.status === 'Preparación'
                        ? 'bg-amber-100 text-amber-900'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {suite.status}
                  </span>
                </div>

                {suite.activeCase ? (
                  <div className="mt-4 space-y-4">
                    <div className="p-4 bg-[#f7fafe] rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between">
                        <div>
                          <span className="text-[10px] font-bold text-[#0051d5] tracking-widest uppercase">
                            {suite.activeCase.expediente}
                          </span>
                          <h4 className="font-serif text-xl font-bold text-[#000922]">
                            {suite.activeCase.patientName}
                          </h4>
                        </div>
                        <span className="text-xs font-mono text-gray-500">
                          {suite.activeCase.elapsedMinutes} / {suite.activeCase.totalExpectedMinutes} min
                        </span>
                      </div>

                      <p className="text-xs text-gray-700 font-semibold mt-1">
                        {suite.activeCase.procedure}
                      </p>

                      {/* Progress bar */}
                      <div className="w-full bg-gray-200 h-2 rounded-full mt-3 overflow-hidden">
                        <div
                          className="bg-[#0051d5] h-full rounded-full transition-all"
                          style={{
                            width: `${Math.min(
                              100,
                              (suite.activeCase.elapsedMinutes /
                                suite.activeCase.totalExpectedMinutes) *
                                100
                            )}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Vitals preview */}
                    <div className="grid grid-cols-4 gap-2 text-center text-xs">
                      <div className="p-2 bg-[#f1f4f8] rounded">
                        <span className="text-[10px] text-gray-400 block">FC</span>
                        <strong className="text-emerald-700 text-sm font-mono">
                          {suite.activeCase.vitals.fc} lpm
                        </strong>
                      </div>
                      <div className="p-2 bg-[#f1f4f8] rounded">
                        <span className="text-[10px] text-gray-400 block">SpO2</span>
                        <strong className="text-cyan-700 text-sm font-mono">
                          {suite.activeCase.vitals.spo2}%
                        </strong>
                      </div>
                      <div className="p-2 bg-[#f1f4f8] rounded">
                        <span className="text-[10px] text-gray-400 block">EtCO2</span>
                        <strong className="text-purple-700 text-sm font-mono">
                          {suite.activeCase.vitals.etco2}
                        </strong>
                      </div>
                      <div className="p-2 bg-[#f1f4f8] rounded">
                        <span className="text-[10px] text-gray-400 block">PANI</span>
                        <strong className="text-yellow-700 text-xs font-mono">
                          {suite.activeCase.vitals.pa.split(' ')[0]}
                        </strong>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500 pt-2">
                      <span>Cirugía: <strong className="text-gray-800">{suite.activeCase.surgeon}</strong></span>
                      <span>Anestesia: <strong className="text-gray-800">{suite.activeCase.anesthesiologist}</strong></span>
                    </div>
                  </div>
                ) : (
                  <div className="py-8 text-center text-xs text-gray-400">
                    <span className="material-symbols-outlined text-3xl mb-1 text-emerald-600">
                      check_circle
                    </span>
                    <p>Quirófano estéril y disponible para cirugías programadas o de urgencia.</p>
                  </div>
                )}
              </div>

              {suite.activeCase && (
                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => onOpenLiveMonitor(suite.name)}
                    className="px-4 py-2 bg-[#000922] hover:bg-[#0051d5] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
                  >
                    <span className="material-symbols-outlined text-sm text-cyan-400">vital_signs</span>
                    <span>Abrir Monitor en Vivo</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Protocol Checklist & Post-Op Ward (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Checklist circular 44 */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#0051d5] block mb-1">
              LISTA DE VERIFICACIÓN QUIRÚRGICA OBLIGATORIA
            </span>
            <h3 className="font-serif text-lg font-semibold text-[#000922] mb-3">
              Protocolo Editorial de Seguridad
            </h3>

            <div className="space-y-3 text-xs">
              <label className="flex items-center gap-3 p-2 bg-[#f7fafe] rounded cursor-pointer hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={checklist.hemograma}
                  onChange={() => toggleCheck('hemograma')}
                  className="w-4 h-4 text-[#0051d5] rounded"
                />
                <span className="text-gray-800">
                  1. Hemograma completo verificado en menos de 48h
                </span>
              </label>

              <label className="flex items-center gap-3 p-2 bg-[#f7fafe] rounded cursor-pointer hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={checklist.preoxigenacion}
                  onChange={() => toggleCheck('preoxigenacion')}
                  className="w-4 h-4 text-[#0051d5] rounded"
                />
                <span className="text-gray-800">
                  2. Pre-oxigenación al 100% durante 5 min antes de inducción
                </span>
              </label>

              <label className="flex items-center gap-3 p-2 bg-[#f7fafe] rounded cursor-pointer hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={checklist.consentimiento}
                  onChange={() => toggleCheck('consentimiento')}
                  className="w-4 h-4 text-[#0051d5] rounded"
                />
                <span className="text-gray-800">
                  3. Consentimiento informado de anestesia firmado por tutor
                </span>
              </label>

              <label className="flex items-center gap-3 p-2 bg-[#f7fafe] rounded cursor-pointer hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={checklist.analgesia}
                  onChange={() => toggleCheck('analgesia')}
                  className="w-4 h-4 text-[#0051d5] rounded"
                />
                <span className="text-gray-800">
                  4. Protocolo de analgesia preventiva multimodal cargado
                </span>
              </label>

              <label className="flex items-center gap-3 p-2 bg-[#f7fafe] rounded cursor-pointer hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={checklist.esterilizacion}
                  onChange={() => toggleCheck('esterilizacion')}
                  className="w-4 h-4 text-[#0051d5] rounded"
                />
                <span className="text-gray-800">
                  5. Test biológico de autoclave y virador estéril conforme
                </span>
              </label>

              <label className="flex items-center gap-3 p-2 bg-[#f7fafe] rounded cursor-pointer hover:bg-gray-100 transition-colors">
                <input
                  type="checkbox"
                  checked={checklist.antibiotico}
                  onChange={() => toggleCheck('antibiotico')}
                  className="w-4 h-4 text-[#0051d5] rounded"
                />
                <span className="text-gray-800">
                  6. Antibioprofilaxis administrada 30 min antes de incisión
                </span>
              </label>
            </div>
          </div>

          {/* UCI Post-op ward */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block mb-1">
              HOSPITALIZACIÓN CONTINUA
            </span>
            <h3 className="font-serif text-lg font-semibold text-[#000922] mb-3">
              Boxes de Cuidados Críticos &amp; UCI
            </h3>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-[#f1f4f8] rounded-lg border-l-4 border-[#0051d5]">
                <div className="flex items-center justify-between">
                  <strong className="text-[#000922]">Box UCI 1 · Reservado Post-TPLO</strong>
                  <span className="text-[10px] bg-blue-100 text-blue-900 font-bold px-1.5 py-0.5 rounded">
                    Preparado
                  </span>
                </div>
                <p className="text-gray-600 mt-1">
                  Manta térmica regulada a 38.5°C, infusor de fluidos isotónicos y bomba de analgesia continua (MLK).
                </p>
              </div>

              <div className="p-3 bg-[#f1f4f8] rounded-lg border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                  <strong className="text-[#000922]">Box UCI 3 · Milo de Beauharnais</strong>
                  <span className="text-[10px] bg-red-100 text-red-900 font-bold px-1.5 py-0.5 rounded">
                    Triaje Activo
                  </span>
                </div>
                <p className="text-gray-600 mt-1">
                  Fluidoterapia de rescate con Ringer Lactato. Monitorización de lactato sérico seriado cada 60 min.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
