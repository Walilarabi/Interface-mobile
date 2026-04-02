export type UserRole = 
  | 'femme_chambre' 
  | 'gouvernante' 
  | 'maintenance' 
  | 'petit_dejeuner' 
  | 'spa' 
  | 'reception' 
  | 'serveur' 
  | 'direction';

export interface Hotel {
  id: string;
  name: string;
  address: string;
  color: string;
  logo?: string;
  qr_code?: string;
  latitude?: number;
  longitude?: number;
}

export interface User {
  id: string;
  hotel_id: string; // Current/Active hotel ID
  hotel_ids: string[]; // All hotels the user is assigned to
  primary_hotel_id: string;
  email: string;
  role: UserRole;
  first_name: string;
  last_name: string;
  is_active: boolean;
  profile_photo?: string;
  off_days?: number[]; // 0 for Sunday, 1 for Monday, etc.
}

export interface Pointage {
  id: string;
  user_id: string;
  hotel_id: string;
  date: string;
  start: string;
  end: string | null;
  heures_supplementaires: number;
  status: 'started' | 'ended' | 'validated';
}

export interface PlanningEntry {
  id: string;
  hotel_id: string;
  date: string;
  service_start: string;
  service_end: string;
  is_working: boolean;
  is_holiday: boolean;
  tasks?: string[];
}

export interface Document {
  id: string;
  user_id: string;
  type: 'pay_slip' | 'contract' | 'attestation';
  name: string;
  date: string;
  url: string;
  signed: boolean;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  body: string;
  read: boolean;
  type: 'pointage' | 'rh' | 'housekeeping' | 'performance' | 'broadcast';
  created_at: string;
}

export interface RHRequest {
  id: string;
  user_id: string;
  type: 'cp' | 'off' | 'retard' | 'maladie' | 'rdv';
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  data: any;
}
