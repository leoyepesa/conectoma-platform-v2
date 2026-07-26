export type Track = 'l1' | 'l2' | 'l3' | 'general' | 'cierre';

export type SessionModality = 'presencial' | 'virtual';

export interface AgendaSession {
  id: string;
  day: 1 | 2;
  modality: SessionModality;
  start_time: string; // "08:00"
  end_time: string; // "08:20"
  title: string;
  subtitle?: string | null;
  location?: string | null;
  track: Track;
  kind: 'plenaria' | 'panel' | 'break' | 'student' | 'award' | 'show' | 'net';
  order_index: number;
}

export interface Speaker {
  id: string;
  role: string; // e.g. "Conferencista Línea 1"
  name: string;
  bio?: string | null;
  photo_url?: string | null;
  track: Track;
  day: 1 | 2 | null;
  linkedin_url?: string | null;
  order_index: number;
}

export interface Sponsor {
  id: string;
  name: string;
  logo_url?: string | null;
  website_url?: string | null;
  tier: 'platino' | 'oro' | 'plata' | 'aliado';
  order_index: number;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  content?: string | null;
  cover_image_url?: string | null;
  published_at: string;
  published: boolean;
}

export type SubmissionType = 'articulo' | 'poster';
export type SubmissionStatus = 'recibido' | 'en_revision' | 'aceptado' | 'rechazado';

export interface Submission {
  id: string;
  type: SubmissionType;
  title: string;
  authors: string;
  faculty: string;
  track: Track;
  abstract: string;
  file_url?: string | null;
  contact_email: string;
  contact_phone?: string | null;
  status: SubmissionStatus;
  created_at: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name?: string | null;
  role: 'admin' | 'editor' | 'viewer';
}
