import React, { useState } from 'react';
import { ScreenTab } from '../types';

interface HeaderProps {
  currentTab: ScreenTab;
  onTabChange: (tab: ScreenTab) => void;
  onOpenBooking: () => void;
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onOpenBooking,
  searchTerm,
  onSearchChange,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const navItems: { id: ScreenTab; label: string }[] = [
    { id: 'agenda-citas', label: 'Agenda & Citas' },
    { id: 'expedientes-pacientes', label: 'Expedientes Pacientes' },
    { id: 'especialistas', label: 'Especialistas' },
    { id: 'cirugias-cuidados', label: 'Cirugías & Cuidados' },
    { id: 'reportes-metricas', label: 'Reportes & Métricas' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      {/* Primary Navigation Row */}
      <div className="h-24 w-full px-6 lg:px-10 flex items-center justify-between gap-6 border-b border-[#0f2042]/10">
        {/* Brand & Editorial Issue Lockup */}
        <div
          onClick={() => onTabChange('agenda-citas')}
          className="flex items-center gap-4 flex-shrink-0 cursor-pointer group"
          role="button"
          tabIndex={0}
        >
          <img
            alt="Véternaire Clinical Editorial Logo"
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
            referrerPolicy="no-referrer"
            src="https://lh3.googleusercontent.com/aida/AEtjO1X7HU8EOGU036UfnTwGtDOEtAe5c1THn5vizg9C-M_tLDMbVhL3nZZKsODrE-ayj9x7xzB6mk0FydnpPcwiN5TTnR9-ccbjxZMbagcs9uT1KgM7Pf1NF_38wxt02vyzje2QHj0PP0IPg0I7XDQOiCw_kshVeT4QJ2YAuQbLfVsqkzhkIyGafHGpi9T4ADOE10W953v8sQfVFeg7w_h2BPtKYF0lt9GpVf-mFBwBM9T5CCKbqiVhKKVA-gs"
          />
          <div className="flex flex-col">
            <span className="font-serif text-xl md:text-2xl text-[#000922] tracking-tight font-semibold">
              VÉTERINAIRE
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="font-bold tracking-widest text-[#0051d5] uppercase text-[10px]">
                VOL. XXIV — CLINICAL DISPATCH
              </span>
              <span className="text-gray-400">•</span>
              <span className="italic text-gray-600 font-serif text-[11px]">
                Octobre 2024 · Paris VIII
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (5 Windows) */}
        <nav className="hidden xl:flex items-center gap-8 h-full">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`h-full flex items-center px-1 font-medium text-sm transition-all relative ${
                  isActive
                    ? 'text-[#000922] font-semibold border-b-2 border-[#000922]'
                    : 'text-gray-600 hover:text-[#000922]'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#000922]" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right Search, Actions, Profile */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="hidden md:flex items-center bg-[#f1f4f8] px-3 py-1.5 rounded-lg border border-transparent focus-within:border-[#0051d5] transition-colors">
            <span className="material-symbols-outlined text-gray-500 mr-2 text-lg">
              search
            </span>
            <input
              className="bg-transparent border-0 outline-none text-xs text-[#181c1f] placeholder:text-gray-500 w-44 lg:w-56"
              placeholder="Buscar por paciente, microchip o tutor..."
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => onSearchChange('')}
                className="text-gray-400 hover:text-gray-700 text-xs ml-1"
              >
                ✕
              </button>
            )}
          </div>

          <button
            onClick={onOpenBooking}
            className="flex items-center gap-1.5 bg-[#0f2042] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-[#0051d5] transition-all shadow-sm active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-base">add</span>
            <span>Nueva Cita</span>
          </button>

          {/* Notifications Button */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-[#000922] transition-colors rounded-lg hover:bg-gray-100"
              type="button"
              title="Notificaciones de quirófano y triaje"
            >
              <span className="material-symbols-outlined text-xl">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#0051d5] ring-2 ring-white animate-pulse" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#000922]">
                    Alertas Clínicas en Directo
                  </span>
                  <span className="text-[10px] bg-[#dbe1ff] text-[#00174b] font-bold px-1.5 py-0.5 rounded">
                    3 Nuevas
                  </span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="p-2 bg-red-50 text-red-900 rounded border-l-2 border-red-600">
                    <strong className="block text-[11px]">Urgencia Box 3:</strong> Milo de Beauharnais requiere autorización quirúrgica urgente.
                  </div>
                  <div className="p-2 bg-blue-50 text-blue-900 rounded border-l-2 border-blue-600">
                    <strong className="block text-[11px]">Quirófano 1:</strong> Lord Byron inició fase de osteotomía TPLO con Dra. Moreau.
                  </div>
                  <div className="p-2 bg-emerald-50 text-emerald-900 rounded border-l-2 border-emerald-600">
                    <strong className="block text-[11px]">Analítica Lista:</strong> Bioquímica de Ares von Humboldt sincronizada en expediente.
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
            <img
              alt="Dra. Élise Moreau"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full object-cover ring-1 ring-gray-200"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUiFwOHr0CV1-3u4oeV5wVepFhweC8ZRxaR1OKAF6J4apSsNPmE9xnHtxqdXNYh0uGGGnXvYC02RREcQ6FthYEvs1gdl4dVXuVaC9Z_HC7LBx-_fyCy6-oKH__bj93oS9IjzAFiWASTXf4KnWVOYtb4uNXNubw9-Ejp2fnaoqcEuXi2DCHTVWWbzy9b9Qh2nQNreXq5oHrasApMSM1coIpiw1mDqqN89mEL0Wo4o_LWdTbEa3eR5f7"
            />
            <div className="hidden 2xl:flex flex-col text-left">
              <span className="text-xs font-semibold text-[#000922] leading-tight">
                Dra. Élise Moreau
              </span>
              <span className="text-[11px] text-gray-500">Cirujana Jefe</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile/Tablet Sub-Navigation Bar */}
      <div className="xl:hidden flex items-center overflow-x-auto gap-2 px-4 py-2 bg-white border-b border-gray-100 text-xs">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`px-3 py-1.5 rounded whitespace-nowrap transition-all ${
              currentTab === item.id
                ? 'bg-[#000922] text-white font-semibold'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Editorial Ticker Sub-header */}
      <div className="h-9 w-full bg-[#f1f4f8]/80 px-6 lg:px-10 flex items-center justify-between text-xs text-gray-600 border-b border-[#0f2042]/5">
        <div className="flex items-center gap-4 overflow-hidden">
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0051d5] animate-pulse" />
            <span className="font-bold tracking-wider uppercase text-[#000922] text-[10px]">
              3 Quirófanos Activos
            </span>
          </div>
          <span className="text-gray-300">/</span>
          <div className="flex items-center gap-1 flex-shrink-0">
            <span>14 Citas Programadas Hoy</span>
          </div>
          <span className="text-gray-300">/</span>
          <div className="flex items-center gap-1 flex-shrink-0">
            <span>
              Tiempo Promedio: <strong className="text-[#000922] font-semibold">35 min</strong>
            </span>
          </div>
        </div>
        <div className="hidden sm:flex items-center gap-3">
          <span className="font-bold tracking-widest text-gray-500 uppercase text-[10px]">
            CLINIQUE VÉTÉRINAIRE — PARIS VIII
          </span>
          <span className="text-gray-300">•</span>
          <span className="italic text-gray-500 font-serif text-[11px]">Edition Hebdomadaire</span>
        </div>
      </div>
    </header>
  );
};
