import React, { useState, useEffect } from 'react';

interface LiveMonitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  patientName?: string;
  surgeonName?: string;
  procedure?: string;
}

export const LiveMonitorModal: React.FC<LiveMonitorModalProps> = ({
  isOpen,
  onClose,
  patientName = 'Lord Byron de Valois',
  surgeonName = 'Dra. Élise Moreau',
  procedure = 'Resolución TPLO (Osteotomía Niveladora Meseta Tibial)',
}) => {
  const [heartRate, setHeartRate] = useState(138);
  const [spo2, setSpo2] = useState(99);
  const [etco2, setEtco2] = useState(36);
  const [temp, setTemp] = useState(37.9);
  const [elapsed, setElapsed] = useState(5420); // in seconds (~90 mins)
  const [logNotes, setLogNotes] = useState('');
  const [logHistory, setLogHistory] = useState<string[]>([
    '09:00 - Inducción con Propofol + Fentanilo completada sin incidencias.',
    '09:15 - Intubación orotraqueal #4.5 con balón sellado.',
    '09:35 - Incisión cutánea y exposición de articulación femorotibial.',
    '10:10 - Corte oscilante con sierra radial e inserción de placa TPLO de titanio 2.7mm.',
  ]);

  // Subtle live vital fluctuation
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setHeartRate((prev) => Math.min(150, Math.max(128, prev + Math.floor(Math.random() * 5) - 2)));
      setSpo2((prev) => (Math.random() > 0.85 ? (prev === 99 ? 98 : 99) : prev));
      setEtco2((prev) => Math.min(40, Math.max(34, prev + (Math.random() > 0.6 ? (Math.random() > 0.5 ? 1 : -1) : 0))));
      setElapsed((prev) => prev + 1);
    }, 1500);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen) return null;

  const formatTime = (secs: number) => {
    const h = Math.floor(secs / 3600).toString().padStart(2, '0');
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!logNotes.trim()) return;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    setLogHistory((prev) => [...prev, `${timeStr} - ${logNotes.trim()}`]);
    setLogNotes('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-[#000922]/70 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-5xl bg-[#000922] text-white rounded-2xl shadow-2xl overflow-hidden border border-cyan-900/50 flex flex-col max-h-[92vh]">
        {/* Terminal Header */}
        <div className="px-6 py-4 bg-[#08142c] border-b border-cyan-800/40 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping" />
            <div>
              <span className="text-[10px] font-bold tracking-widest uppercase text-cyan-400">
                MONITOR VITAL QUIRÚRGICO EN TIEMPO REAL · SALA 1
              </span>
              <h3 className="font-serif text-lg text-white font-semibold flex items-center gap-2">
                <span>{patientName}</span>
                <span className="text-xs text-gray-400 font-sans font-normal">
                  (Felino · Maine Coon · 6.8 kg)
                </span>
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="bg-[#0f2042] px-3 py-1.5 rounded-lg border border-cyan-800/30">
              <span className="text-gray-400 text-[10px] uppercase block">Cirujana</span>
              <span className="font-semibold text-cyan-200">{surgeonName}</span>
            </div>
            <div className="bg-[#0f2042] px-3 py-1.5 rounded-lg border border-cyan-800/30">
              <span className="text-gray-400 text-[10px] uppercase block">Tiempo en Bloque</span>
              <span className="font-mono text-emerald-400 font-bold text-sm tracking-wider">
                {formatTime(elapsed)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
        </div>

        {/* Vital Gauges & Waveform Display */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 overflow-y-auto">
          {/* Left Column: Waveforms (ECG & Plethysmography) */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="bg-[#050f20] p-4 rounded-xl border border-cyan-900/60 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-emerald-400 tracking-wider">
                  ECG DERIVACIÓN II · VEL: 25mm/s · GAN: 10mm/mV
                </span>
                <span className="text-xs font-mono text-emerald-300">QRS Rítmico</span>
              </div>
              {/* Synthetic SVG ECG wave */}
              <div className="w-full h-24 overflow-hidden relative flex items-center bg-[#020713] rounded border border-emerald-950">
                <svg className="w-full h-full text-emerald-400" preserveAspectRatio="none" viewBox="0 0 500 100">
                  <path
                    d="M 0 50 L 30 50 L 35 48 L 40 50 L 50 50 L 55 58 L 60 10 L 68 85 L 74 50 L 85 50 L 95 42 L 105 50 L 140 50 L 145 48 L 150 50 L 160 50 L 165 58 L 170 10 L 178 85 L 184 50 L 195 50 L 205 42 L 215 50 L 250 50 L 255 48 L 260 50 L 270 50 L 275 58 L 280 10 L 288 85 L 294 50 L 305 50 L 315 42 L 325 50 L 360 50 L 365 48 L 370 50 L 380 50 L 385 58 L 390 10 L 398 85 L 404 50 L 415 50 L 425 42 L 435 50 L 500 50"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                </svg>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#020713] to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Plethysmography (SpO2) wave */}
            <div className="bg-[#050f20] p-4 rounded-xl border border-cyan-900/60 relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-cyan-400 tracking-wider">
                  CURVA PLETISMOGRÁFICA SpO2 &amp; PULSO PERIFÉRICO
                </span>
                <span className="text-xs font-mono text-cyan-300">Índice Perfusión: 3.4</span>
              </div>
              <div className="w-full h-20 overflow-hidden relative flex items-center bg-[#020713] rounded border border-cyan-950">
                <svg className="w-full h-full text-cyan-400" preserveAspectRatio="none" viewBox="0 0 500 80">
                  <path
                    d="M 0 60 C 20 60 30 15 45 15 C 55 15 60 35 65 30 C 70 25 80 60 90 60 C 110 60 120 15 135 15 C 145 15 150 35 155 30 C 160 25 170 60 180 60 C 200 60 210 15 225 15 C 235 15 240 35 245 30 C 250 25 260 60 270 60 C 290 60 300 15 315 15 C 325 15 330 35 335 30 C 340 25 350 60 360 60 C 380 60 390 15 405 15 C 415 15 420 35 425 30 C 430 25 440 60 500 60"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                </svg>
              </div>
            </div>

            {/* Anesthesia Log Register */}
            <div className="bg-[#050f20] p-4 rounded-xl border border-cyan-900/60 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400 block mb-2">
                  Bitácora de Eventos Quirúrgicos
                </span>
                <div className="space-y-1.5 max-h-36 overflow-y-auto text-xs font-mono text-gray-300 pr-1">
                  {logHistory.map((item, i) => (
                    <div key={i} className="py-1 border-b border-white/5 flex items-start gap-2">
                      <span className="text-cyan-400">›</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleAddLog} className="mt-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Añadir nota anestésica (p. ej. Bolo analgesia, inicio sutura...)"
                  className="flex-1 bg-[#020713] border border-cyan-900/80 rounded px-3 py-1.5 text-xs text-white placeholder:text-gray-500 outline-none focus:border-cyan-400"
                  value={logNotes}
                  onChange={(e) => setLogNotes(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-[#0051d5] hover:bg-[#316bf3] text-white text-xs font-semibold rounded transition-colors whitespace-nowrap"
                >
                  Registrar
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: High-Impact Clinical Number Displays */}
          <div className="flex flex-col gap-4">
            {/* Heart Rate Box */}
            <div className="bg-[#050f20] p-4 rounded-xl border border-emerald-500/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-emerald-400 block">
                  FRECUENCIA CARDÍACA (FC)
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-mono text-4xl text-emerald-400 font-bold tabular-nums">
                    {heartRate}
                  </span>
                  <span className="text-xs font-mono text-emerald-300">lpm</span>
                </div>
                <span className="text-[10px] text-gray-400">Rango Seguro: 110 - 160</span>
              </div>
              <span className="material-symbols-outlined text-4xl text-emerald-400 animate-pulse">
                favorite
              </span>
            </div>

            {/* SpO2 Saturation Box */}
            <div className="bg-[#050f20] p-4 rounded-xl border border-cyan-500/40 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400 block">
                  SATURACIÓN OXÍGENO (SpO2)
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="font-mono text-4xl text-cyan-400 font-bold tabular-nums">
                    {spo2}
                  </span>
                  <span className="text-xs font-mono text-cyan-300">%</span>
                </div>
                <span className="text-[10px] text-gray-400">FiO2: 100% O2 Medical</span>
              </div>
              <span className="material-symbols-outlined text-4xl text-cyan-400">air</span>
            </div>

            {/* Blood Pressure & Capnography */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#050f20] p-3 rounded-xl border border-yellow-500/40">
                <span className="text-[9px] font-mono uppercase text-yellow-400 block">
                  PANI (mmHg)
                </span>
                <span className="font-mono text-xl text-yellow-400 font-bold block mt-1">
                  112/68
                </span>
                <span className="text-[10px] text-gray-400 font-mono">PAM: 82 mmHg</span>
              </div>

              <div className="bg-[#050f20] p-3 rounded-xl border border-purple-500/40">
                <span className="text-[9px] font-mono uppercase text-purple-400 block">
                  EtCO2 (mmHg)
                </span>
                <span className="font-mono text-xl text-purple-400 font-bold block mt-1 tabular-nums">
                  {etco2}
                </span>
                <span className="text-[10px] text-gray-400 font-mono">Vent. Mecánica</span>
              </div>
            </div>

            {/* Temperature & Gas Delivery */}
            <div className="bg-[#050f20] p-4 rounded-xl border border-cyan-900/60 space-y-2 text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-gray-400">Temperatura Esofágica:</span>
                <span className="font-mono font-bold text-white">{temp} °C</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-gray-400">Agente Inhalatorio:</span>
                <span className="font-mono font-bold text-cyan-300">Isoflurano 1.8%</span>
              </div>
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-gray-400">Manta Térmica Convectiva:</span>
                <span className="text-emerald-400 font-medium">Activa (Nivel 38°C)</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Protección Corneal:</span>
                <span className="text-emerald-400 font-medium">Gel Lubricante OK</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-[#08142c] border-t border-cyan-800/40 flex items-center justify-between">
          <span className="text-xs text-gray-400 font-serif italic">
            Procedimiento en curso: {procedure}
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => alert('Parámetros de monitor sincronizados en el servidor clínico central.')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Exportar Curva ECG
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#0051d5] hover:bg-[#316bf3] text-white text-xs font-semibold rounded-lg transition-colors"
            >
              Cerrar Monitor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
