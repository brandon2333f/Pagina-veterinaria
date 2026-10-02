import React from 'react';

interface MetricsViewProps {
  onOpenManifest: () => void;
  onShowToast: (msg: string) => void;
}

export const MetricsView: React.FC<MetricsViewProps> = ({
  onOpenManifest,
  onShowToast,
}) => {
  return (
    <div className="flex flex-col w-full px-6 lg:px-10 py-8">
      {/* Masthead */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-6 pb-6 border-b border-gray-200">
        <div>
          <div className="flex items-center gap-3 text-xs mb-2">
            <span className="px-2.5 py-1 bg-[#0f2042] text-white font-bold tracking-widest text-[10px] rounded uppercase">
              DESPACHO ESTADÍSTICO &amp; AUDITORÍA CLÍNICA
            </span>
            <span className="text-gray-400">•</span>
            <span className="italic font-serif text-gray-500">
              Rapports Épidémiologiques &amp; Performance Paris VIII
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#000922] font-semibold tracking-tight">
            Reportes, <span className="italic text-[#0051d5]">Métricas</span> &amp; Rendimiento
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-600 max-w-2xl font-serif italic">
            Cuadro de mando asistencial de precisión, tasa de resolución quirúrgica, estancias hospitalarias y control de calidad.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => onShowToast('Informe mensual consolidado enviado al correo de la dirección médica.')}
            className="px-4 py-2 bg-white border border-gray-200 text-[#000922] hover:bg-[#e5e8ec] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">mail</span>
            <span>Enviar a Dirección Médica</span>
          </button>
          <button
            onClick={onOpenManifest}
            className="px-4 py-2 bg-[#000922] hover:bg-[#0051d5] text-white text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">picture_as_pdf</span>
            <span>Generar Manifiesto Oficial (PDF)</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
        <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
            CASOS ATENDIDOS (MES EN CURSO)
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-4xl text-[#000922] font-bold">342</span>
            <span className="text-xs text-emerald-700 font-semibold">+8.4% vs sept</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">
            Promedio: 14.8 pacientes / día
          </span>
        </div>

        <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#0051d5] block mb-1">
            ÉXITO QUIRÚRGICO PRIMARIO
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-4xl text-[#000922] font-bold">99.8%</span>
            <span className="text-xs text-gray-500 font-serif italic">Cero infecciones</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">
            Auditoría de apósitos estériles
          </span>
        </div>

        <div className="p-5 bg-white rounded-xl border border-gray-200 shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 block mb-1">
            ÍNDICE DE PUNTUALIDAD
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-4xl text-[#000922] font-bold">98.2%</span>
            <span className="text-xs text-emerald-700 font-semibold">+1.4%</span>
          </div>
          <span className="text-[11px] text-gray-500 mt-2 block">
            Retraso medio: 2.1 minutos
          </span>
        </div>

        <div className="p-5 bg-[#0f2042] text-white rounded-xl shadow-md">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[#dbe1ff] block mb-1">
            TIEMPO MEDIO DE TRIAJE UCI
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-4xl text-white font-bold">4.8</span>
            <span className="text-xs text-[#dbe1ff] font-serif italic">minutos</span>
          </div>
          <span className="text-[11px] text-[#7988b0] mt-2 block">
            Protocolo shock de acceso prioritario
          </span>
        </div>
      </div>

      {/* Specialty Breakdown & Volume Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        {/* Surgical Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                DISTRIBUCIÓN QUIRÚRGICA
              </span>
              <h3 className="font-serif text-lg font-semibold text-[#000922]">
                Especialidades Más Demandadas
              </h3>
            </div>
            <span className="text-xs text-[#0051d5] font-semibold">Total: 78 Cirugías / Mes</span>
          </div>

          <div className="space-y-4 text-xs">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-800">Cirugía Ortopédica &amp; Traumatología (TPLO)</span>
                <span className="font-mono font-bold text-[#000922]">42% (33 casos)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#000922] h-full rounded-full" style={{ width: '42%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-800">Cirugía de Tejidos Blandos &amp; Abdominal</span>
                <span className="font-mono font-bold text-[#000922]">28% (22 casos)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#0051d5] h-full rounded-full" style={{ width: '28%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-800">Cardiología Intervencionista &amp; Cateterismo</span>
                <span className="font-mono font-bold text-[#000922]">18% (14 casos)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#316bf3] h-full rounded-full" style={{ width: '18%' }} />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-800">Dermatología Quirúrgica &amp; Biopsias</span>
                <span className="font-mono font-bold text-[#000922]">12% (9 casos)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-[#7988b0] h-full rounded-full" style={{ width: '12%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Species Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                DISTRIBUCIÓN POR ESPECIE
              </span>
              <h3 className="font-serif text-lg font-semibold text-[#000922]">
                Pacientes Registrados en Clínica
              </h3>
            </div>
            <span className="text-xs text-gray-500 font-serif italic">Registro Oficial 2024</span>
          </div>

          <div className="grid grid-cols-3 gap-4 text-center py-4">
            <div className="p-4 bg-[#f1f4f8] rounded-xl">
              <span className="material-symbols-outlined text-3xl text-[#000922] mb-1">pets</span>
              <div className="font-serif text-3xl font-bold text-[#000922]">62%</div>
              <span className="text-xs font-semibold text-gray-600">Caninos</span>
              <span className="text-[10px] text-gray-400 block mt-1">212 pacientes</span>
            </div>

            <div className="p-4 bg-[#f1f4f8] rounded-xl">
              <span className="material-symbols-outlined text-3xl text-[#0051d5] mb-1">cruelty_free</span>
              <div className="font-serif text-3xl font-bold text-[#0051d5]">35%</div>
              <span className="text-xs font-semibold text-gray-600">Felinos</span>
              <span className="text-[10px] text-gray-400 block mt-1">120 pacientes</span>
            </div>

            <div className="p-4 bg-[#f1f4f8] rounded-xl">
              <span className="material-symbols-outlined text-3xl text-gray-600 mb-1">agriculture</span>
              <div className="font-serif text-3xl font-bold text-gray-700">3%</div>
              <span className="text-xs font-semibold text-gray-600">Equinos</span>
              <span className="text-[10px] text-gray-400 block mt-1">10 pacientes</span>
            </div>
          </div>

          <div className="p-4 bg-[#f7fafe] rounded-lg border border-gray-200 text-xs text-gray-600 mt-2">
            <strong className="text-[#000922] block mb-1">Certificación Editorial de Calidad:</strong>
            Dispensario acreditado según estándares de la Federación de Veterinarios Europeos (FVE) y Société Française d'Études Médicales Vétérinaires.
          </div>
        </div>
      </div>
    </div>
  );
};
