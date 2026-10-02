import React, { useState, useEffect } from 'react';
import { ScreenTab, Appointment, PatientDossier } from './types';
import {
  INITIAL_APPOINTMENTS,
  WAITING_PATIENTS,
  SPECIALISTS,
  PATIENTS_DOSSIERS,
  SURGERY_SUITES,
} from './data/mockData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { AgendaView } from './components/AgendaView';
import { PatientsView } from './components/PatientsView';
import { SpecialistsView } from './components/SpecialistsView';
import { SurgeriesView } from './components/SurgeriesView';
import { MetricsView } from './components/MetricsView';
import { BookingModal } from './components/BookingModal';
import { LiveMonitorModal } from './components/LiveMonitorModal';
import { ManifestModal } from './components/ManifestModal';
import { PatientDetailsModal } from './components/PatientDetailsModal';

export default function App() {
  // Navigation state (5 screens/windows)
  const [currentTab, setCurrentTab] = useState<ScreenTab>('agenda-citas');
  const [searchTerm, setSearchTerm] = useState('');

  // Core application data
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);
  const [waitingPatients] = useState(WAITING_PATIENTS);
  const [specialists] = useState(SPECIALISTS);
  const [patientsDossiers] = useState<PatientDossier[]>(PATIENTS_DOSSIERS);
  const [suites] = useState(SURGERY_SUITES);

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [isMonitorOpen, setIsMonitorOpen] = useState(false);
  const [isManifestOpen, setIsManifestOpen] = useState(false);
  const [selectedPatientDossier, setSelectedPatientDossier] = useState<PatientDossier | null>(null);
  const [monitorCase, setMonitorCase] = useState<{
    patientName: string;
    surgeonName: string;
    procedure: string;
  }>({
    patientName: 'Lord Byron de Valois',
    surgeonName: 'Dra. Élise Moreau',
    procedure: 'Resolución TPLO (Osteotomía Niveladora Meseta Tibial)',
  });

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Sync tab with URL hash for proper multi-window navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as ScreenTab;
      if (
        [
          'agenda-citas',
          'expedientes-pacientes',
          'especialistas',
          'cirugias-cuidados',
          'reportes-metricas',
        ].includes(hash)
      ) {
        setCurrentTab(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleTabChange = (tab: ScreenTab) => {
    setCurrentTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle adding an appointment
  const handleAddAppointment = (newApt: Appointment) => {
    setAppointments((prev) => [newApt, ...prev]);
    showToast(`Cita registrada con éxito para ${newApt.patientName} (${newApt.attendingName}).`);
  };

  // Handle opening live monitor for a specific appointment
  const handleOpenLiveMonitor = (apt: Appointment) => {
    setMonitorCase({
      patientName: apt.patientName,
      surgeonName: apt.attendingName,
      procedure: apt.procedureTag,
    });
    setIsMonitorOpen(true);
  };

  // Handle opening live monitor from surgical suite
  const handleOpenSuiteMonitor = (suiteName: string) => {
    setMonitorCase({
      patientName: suiteName.includes('Sala 1') ? 'Lord Byron de Valois' : 'Milo de Beauharnais',
      surgeonName: 'Dra. Élise Moreau',
      procedure: suiteName.includes('Sala 1') ? 'Resolución TPLO' : 'Laparotomía de Urgencia',
    });
    setIsMonitorOpen(true);
  };

  // Handle opening full patient dossier by name
  const handleOpenPatientByName = (name: string) => {
    const found = patientsDossiers.find(
      (p) => p.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(p.name.toLowerCase())
    );
    if (found) {
      setSelectedPatientDossier(found);
    } else {
      // Default to first patient
      setSelectedPatientDossier(patientsDossiers[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7fafe] text-[#181c1f] flex flex-col font-sans">
      {/* Top Header with Brand & Navigation */}
      <Header
        currentTab={currentTab}
        onTabChange={handleTabChange}
        onOpenBooking={() => setIsBookingOpen(true)}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-32">
        {currentTab === 'agenda-citas' && (
          <AgendaView
            appointments={appointments}
            waitingPatients={waitingPatients}
            specialists={specialists}
            onOpenBooking={() => setIsBookingOpen(true)}
            onOpenManifest={() => setIsManifestOpen(true)}
            onOpenLiveMonitor={handleOpenLiveMonitor}
            onOpenPatientDossier={handleOpenPatientByName}
            onShowToast={showToast}
            searchTerm={searchTerm}
          />
        )}

        {currentTab === 'expedientes-pacientes' && (
          <PatientsView
            patients={patientsDossiers}
            onSelectPatient={(p) => setSelectedPatientDossier(p)}
            onOpenBooking={() => setIsBookingOpen(true)}
            searchTerm={searchTerm}
          />
        )}

        {currentTab === 'especialistas' && (
          <SpecialistsView
            specialists={specialists}
            onBookWithSpecialist={(doctorName) => {
              setIsBookingOpen(true);
              showToast(`Formulario abierto con especialista ${doctorName} asignado.`);
            }}
            onShowToast={showToast}
            searchTerm={searchTerm}
          />
        )}

        {currentTab === 'cirugias-cuidados' && (
          <SurgeriesView
            suites={suites}
            onOpenLiveMonitor={handleOpenSuiteMonitor}
            onShowToast={showToast}
          />
        )}

        {currentTab === 'reportes-metricas' && (
          <MetricsView
            onOpenManifest={() => setIsManifestOpen(true)}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Editorial Footer */}
      <Footer
        onNavigate={handleTabChange}
        onOpenManifest={() => setIsManifestOpen(true)}
      />

      {/* Booking Drawer Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        onAddAppointment={handleAddAppointment}
      />

      {/* Operating Room Live Monitor Modal */}
      <LiveMonitorModal
        isOpen={isMonitorOpen}
        onClose={() => setIsMonitorOpen(false)}
        patientName={monitorCase.patientName}
        surgeonName={monitorCase.surgeonName}
        procedure={monitorCase.procedure}
      />

      {/* Clinical Manifest Modal */}
      <ManifestModal
        isOpen={isManifestOpen}
        onClose={() => setIsManifestOpen(false)}
        appointments={appointments}
      />

      {/* Patient Dossier Detail Modal */}
      <PatientDetailsModal
        isOpen={!!selectedPatientDossier}
        patient={selectedPatientDossier}
        onClose={() => setSelectedPatientDossier(null)}
        onBookNext={(patientName) => {
          setIsBookingOpen(true);
          showToast(`Preparando nueva cita para ${patientName}.`);
        }}
      />

      {/* Global Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-300">
          <div className="bg-[#000922] text-white px-5 py-3 rounded-xl shadow-2xl flex items-center gap-3 border border-gray-700">
            <span className="material-symbols-outlined text-emerald-400 text-2xl">
              check_circle
            </span>
            <div className="flex flex-col">
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Despacho Clínico Sincronizado
              </span>
              <span className="text-xs text-gray-300">{toastMessage}</span>
            </div>
            <button
              onClick={() => setToastMessage(null)}
              className="text-gray-400 hover:text-white text-xs ml-2"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
