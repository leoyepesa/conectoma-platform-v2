import type { AgendaSession } from '../types';

// Datos extraídos de la infografía oficial IngenIA 2026.
// Estos son el "fallback" que se muestra si aún no hay datos cargados en Supabase.
// Una vez actives el panel admin, puedes editar todo esto desde /admin/agenda.

export const seedAgenda: AgendaSession[] = [
  // ── DÍA 1 · MAÑANA PRESENCIAL ──
  { id: 'd1-apertura', day: 1, modality: 'presencial', start_time: '08:00', end_time: '08:20', title: 'Acto de apertura presencial', subtitle: 'Palabras del Decano', location: 'Auditorio (400 p.)', track: 'general', kind: 'plenaria', order_index: 1 },
  { id: 'd1-gen1', day: 1, modality: 'presencial', start_time: '08:20', end_time: '09:20', title: 'Conferencia — Conferencista General 1', subtitle: 'Charla transversal a todas las ingenierías', location: 'Auditorio', track: 'general', kind: 'plenaria', order_index: 2 },
  { id: 'd1-break1', day: 1, modality: 'presencial', start_time: '09:20', end_time: '09:40', title: 'Refrigerio — traslado a aulas', subtitle: null, location: null, track: 'general', kind: 'break', order_index: 3 },
  { id: 'd1-l2', day: 1, modality: 'presencial', start_time: '09:40', end_time: '10:40', title: 'Conferencia Línea 2 — Infraestructura Sostenible y Territorio Inteligente', subtitle: null, location: 'Auditorio', track: 'l2', kind: 'plenaria', order_index: 4 },
  { id: 'd1-l3', day: 1, modality: 'presencial', start_time: '09:40', end_time: '10:40', title: 'Conferencia Línea 3 — Manufactura Inteligente y Eficiencia Operacional', subtitle: null, location: 'Aulas 1 + 2', track: 'l3', kind: 'plenaria', order_index: 5 },
  { id: 'd1-l1', day: 1, modality: 'presencial', start_time: '09:40', end_time: '10:40', title: 'Conferencia Línea 1 — Sistemas Inteligentes y Transformación Digital', subtitle: null, location: 'Aulas 3 + 4', track: 'l1', kind: 'plenaria', order_index: 6 },
  { id: 'd1-panel', day: 1, modality: 'presencial', start_time: '10:50', end_time: '12:00', title: 'Panel conjunto — 3 conferencistas de línea + preguntas abiertas', subtitle: 'Conversatorio transversal', location: 'Auditorio', track: 'general', kind: 'panel', order_index: 7 },
  // ── DÍA 1 · TARDE ──
  { id: 'd1-almuerzo', day: 1, modality: 'presencial', start_time: '12:00', end_time: '14:00', title: 'Almuerzo libre', subtitle: null, location: null, track: 'general', kind: 'break', order_index: 8 },
  { id: 'd1-reagrupa', day: 1, modality: 'presencial', start_time: '14:00', end_time: '14:30', title: 'Reagrupamiento · Instrucciones · Refrigerio', subtitle: null, location: 'Auditorio', track: 'general', kind: 'break', order_index: 9 },
  { id: 'd1-posters', day: 1, modality: 'presencial', start_time: '14:30', end_time: '15:30', title: 'Jornada de pósters con jurado', subtitle: null, location: 'Hall principal', track: 'general', kind: 'student', order_index: 10 },
  { id: 'd1-feria', day: 1, modality: 'presencial', start_time: '15:30', end_time: '16:30', title: 'Feria empresarial + Bolsa de empleo', subtitle: 'Stands de empresas', location: 'Hall principal', track: 'general', kind: 'net', order_index: 11 },
  // ── DÍA 1 · NOCHE VIRTUAL ──
  { id: 'd1n-apertura', day: 1, modality: 'virtual', start_time: '18:00', end_time: '18:15', title: 'Apertura virtual Noche 1', subtitle: null, location: null, track: 'general', kind: 'plenaria', order_index: 12 },
  { id: 'd1n-gen1', day: 1, modality: 'virtual', start_time: '18:15', end_time: '19:15', title: 'Conferencia — Conferencista General 1', subtitle: null, location: 'Sala Zoom principal', track: 'general', kind: 'plenaria', order_index: 13 },
  { id: 'd1n-l2', day: 1, modality: 'virtual', start_time: '19:25', end_time: '20:25', title: 'Conferencia Línea 2', subtitle: null, location: 'Sala Zoom A', track: 'l2', kind: 'plenaria', order_index: 14 },
  { id: 'd1n-l3', day: 1, modality: 'virtual', start_time: '19:25', end_time: '20:25', title: 'Conferencia Línea 3', subtitle: null, location: 'Sala Zoom B', track: 'l3', kind: 'plenaria', order_index: 15 },
  { id: 'd1n-l1', day: 1, modality: 'virtual', start_time: '19:25', end_time: '20:25', title: 'Conferencia Línea 1', subtitle: null, location: 'Sala Zoom C', track: 'l1', kind: 'plenaria', order_index: 16 },
  { id: 'd1n-panel', day: 1, modality: 'virtual', start_time: '20:35', end_time: '21:30', title: 'Panel conjunto virtual — 3 conferencistas de línea + preguntas', subtitle: null, location: null, track: 'general', kind: 'panel', order_index: 17 },
  // ── DÍA 2 · JORNADA ÚNICA PRESENCIAL ──
  { id: 'd2-gen2', day: 2, modality: 'presencial', start_time: '08:00', end_time: '09:20', title: 'Apertura + Conferencia — Conferencista General 2', subtitle: 'Todas las facultades', location: 'Auditorio', track: 'general', kind: 'plenaria', order_index: 18 },
  { id: 'd2-ponencias', day: 2, modality: 'presencial', start_time: '09:20', end_time: '11:00', title: 'Ponencias estudiantiles', subtitle: 'Sesiones simultáneas · Jurado presente', location: 'Aulas magistrales 1, 2, 3 y 4', track: 'general', kind: 'student', order_index: 19 },
  { id: 'd2-break', day: 2, modality: 'presencial', start_time: '11:00', end_time: '11:20', title: 'Refrigerio · Deliberación de jurados', subtitle: null, location: 'Auditorio', track: 'general', kind: 'break', order_index: 20 },
  { id: 'd2-premiacion', day: 2, modality: 'presencial', start_time: '11:20', end_time: '12:10', title: 'Premiación — Mejores pósters y ponencias', subtitle: 'Mejor póster · Mejor ponencia · Mención de honor', location: 'Auditorio', track: 'general', kind: 'award', order_index: 21 },
  { id: 'd2-cierre', day: 2, modality: 'presencial', start_time: '12:10', end_time: '13:00', title: 'Acto artístico de cierre · Foto oficial', subtitle: 'Invitado especial · Solo jornada presencial', location: 'Auditorio', track: 'cierre', kind: 'show', order_index: 22 },
  // ── DÍA 2 · NOCHE VIRTUAL ──
  { id: 'd2n-apertura', day: 2, modality: 'virtual', start_time: '18:00', end_time: '18:15', title: 'Apertura virtual Noche 2', subtitle: null, location: null, track: 'general', kind: 'plenaria', order_index: 23 },
  { id: 'd2n-gen2', day: 2, modality: 'virtual', start_time: '18:15', end_time: '19:15', title: 'Conferencia — Conferencista General 2', subtitle: null, location: 'Sala Zoom principal', track: 'general', kind: 'plenaria', order_index: 24 },
  { id: 'd2n-ponencias', day: 2, modality: 'virtual', start_time: '19:25', end_time: '21:10', title: 'Ponencias estudiantiles · Mezcla presencial + distancia', subtitle: null, location: 'Salas Zoom A, B y C simultáneas', track: 'general', kind: 'student', order_index: 25 },
  { id: 'd2n-clausura', day: 2, modality: 'virtual', start_time: '21:10', end_time: '21:30', title: 'Clausura virtual · Certificados digitales', subtitle: null, location: null, track: 'general', kind: 'plenaria', order_index: 26 },
];

export const seedSpeakers = [
  { id: 'spk-gen1', role: 'Conferencista General 1', name: 'Por confirmar', bio: 'Charla transversal a todas las ingenierías.', photo_url: null, track: 'general' as const, day: 1 as const, linkedin_url: null, order_index: 1 },
  { id: 'spk-gen2', role: 'Conferencista General 2', name: 'Por confirmar', bio: 'Charla transversal a todas las ingenierías.', photo_url: null, track: 'general' as const, day: 2 as const, linkedin_url: null, order_index: 2 },
  { id: 'spk-l1', role: 'Conferencista Línea 1', name: 'Por confirmar', bio: 'Sistemas Inteligentes y Transformación Digital.', photo_url: null, track: 'l1' as const, day: 1 as const, linkedin_url: null, order_index: 3 },
  { id: 'spk-l2', role: 'Conferencista Línea 2', name: 'Por confirmar', bio: 'Infraestructura Sostenible y Territorio Inteligente.', photo_url: null, track: 'l2' as const, day: 1 as const, linkedin_url: null, order_index: 4 },
  { id: 'spk-l3', role: 'Conferencista Línea 3', name: 'Por confirmar', bio: 'Manufactura Inteligente y Eficiencia Operacional.', photo_url: null, track: 'l3' as const, day: 1 as const, linkedin_url: null, order_index: 5 },
  { id: 'spk-cierre', role: 'Invitado especial de cierre', name: 'Por confirmar', bio: 'Artista / Comediante — solo jornada presencial.', photo_url: null, track: 'cierre' as const, day: 2 as const, linkedin_url: null, order_index: 6 },
];

export const lineasTematicas = [
  { id: 'l1', title: 'Sistemas Inteligentes y Transformación Digital', facultades: 'Ing. Electrónica · Ing. TIC', color: 'l1' as const },
  { id: 'l2', title: 'Infraestructura Sostenible y Territorio Inteligente', facultades: 'Ing. Civil · Ing. Ambiental', color: 'l2' as const },
  { id: 'l3', title: 'Manufactura Inteligente y Eficiencia Operacional', facultades: 'Ing. Mecánica · Ing. Industrial', color: 'l3' as const },
];

export const eventStats = {
  conferencistas: 5,
  dias: 2,
  jornadas: 4,
  estudiantesPresenciales: 435,
  estudiantesVirtuales: 450,
  facultades: 6,
  ponencias: 30,
  lineas: 3,
};
