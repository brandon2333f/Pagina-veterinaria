import React from 'react';
import { ScreenTab } from '../types';

interface FooterProps {
  onNavigate: (tab: ScreenTab) => void;
  onOpenManifest: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenManifest }) => {
  return (
    <footer className="w-full bg-white mt-16 border-t border-[#0f2042]/10 shadow-[0_-1px_8px_rgba(0,0,0,0.02)]">
      <div className="w-full px-6 lg:px-10 py-8 flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-gray-600">
        <div className="flex items-center gap-3">
          <span className="font-serif text-lg text-[#000922] font-semibold tracking-tight">
            VÉTERINAIRE
          </span>
          <span className="text-gray-300">|</span>
          <span className="italic font-serif text-gray-500">
            Cabinet Médical &amp; Chirurgie d'Excellence
          </span>
        </div>

        <div className="flex items-center gap-6 flex-wrap justify-center">
          <button
            onClick={() => onNavigate('cirugias-cuidados')}
            className="hover:text-[#000922] transition-colors"
          >
            Protocole Clinique
          </button>
          <button
            onClick={() => onNavigate('expedientes-pacientes')}
            className="hover:text-[#000922] transition-colors"
          >
            Pharmacopée
          </button>
          <button
            onClick={() => onNavigate('agenda-citas')}
            className="hover:text-[#000922] transition-colors"
          >
            Téléconsultation
          </button>
          <button
            onClick={onOpenManifest}
            className="hover:text-[#0051d5] font-semibold text-[#0051d5] transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">description</span>
            <span>Archives &amp; Manifiesto Folio #140</span>
          </button>
        </div>

        <div className="font-bold tracking-widest text-gray-400 uppercase text-[10px]">
          FOLIO NO. 2024 · PARIS VIII // CLINICAL EDITORIAL
        </div>
      </div>
    </footer>
  );
};
