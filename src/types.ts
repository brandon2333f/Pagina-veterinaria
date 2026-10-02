export type ScreenTab = 'agenda-citas' | 'expedientes-pacientes' | 'especialistas' | 'cirugias-cuidados' | 'reportes-metricas';

export type AppointmentCategory = 'cirugia' | 'consulta' | 'urgencia' | 'diagnostico';

export interface Appointment {
  id: string;
  expedienteNumber: string;
  roomBadge: string;
  patientName: string;
  patientType: 'CANINO' | 'FELINO' | 'EQUINO';
  breed: string;
  weight: string;
  age: string;
  chip: string;
  photoUrl: string;
  procedureTag: string;
  category: AppointmentCategory;
  urgencyLevel?: 'normal' | 'alta' | 'critica';
  diagnosisHeadline: string;
  diagnosisText: string;
  attendingName: string;
  attendingRole: string;
  attendingAvatar?: string;
  attendingInitials?: string;
  timeSlot: string;
  ownerName: string;
  ownerPhone: string;
  status: 'en-curso' | 'programada' | 'completada' | 'triaje';
}

export interface WaitingPatient {
  id: string;
  name: string;
  category: string;
  owner: string;
  location?: string;
  statusText: string;
  subText: string;
  initial: string;
  colorClass: string;
}

export interface Specialist {
  id: string;
  name: string;
  specialty: string;
  subspecialty: string;
  degrees: string;
  status: 'En Quirófano' | 'En Consulta' | 'Triaje Activo' | 'Disponible';
  statusColor: string;
  avatar?: string;
  initials?: string;
  assignedRoom: string;
  activePatientsToday: number;
  phone: string;
  email: string;
  bio: string;
}

export interface PatientDossier {
  id: string;
  expedienteNumber: string;
  name: string;
  species: 'Canino' | 'Felino' | 'Equino';
  breed: string;
  age: string;
  gender: 'Macho' | 'Hembra' | 'Castrado';
  weight: string;
  microchip: string;
  photoUrl: string;
  owner: {
    name: string;
    phone: string;
    email: string;
    address: string;
  };
  bloodType: string;
  allergies: string[];
  currentDiagnosis: string;
  anamnesis: string;
  lastVisit: string;
  nextAppointment?: string;
  assignedVet: string;
  vitalHistory: {
    temp: string;
    heartRate: string;
    respRate: string;
    bp: string;
  };
  labResults: {
    date: string;
    test: string;
    result: string;
    status: 'Normal' | 'Alerta' | 'Óptimo';
  }[];
  prescriptions: {
    medication: string;
    dosage: string;
    frequency: string;
    duration: string;
  }[];
}

export interface SurgerySuite {
  id: string;
  name: string;
  status: 'En Intervención' | 'Esterilización' | 'Preparación' | 'Libre';
  activeCase?: {
    patientName: string;
    expediente: string;
    procedure: string;
    surgeon: string;
    anesthesiologist: string;
    elapsedMinutes: number;
    totalExpectedMinutes: number;
    vitals: {
      fc: number;
      spo2: number;
      etco2: number;
      temp: number;
      pa: string;
    };
  };
}
