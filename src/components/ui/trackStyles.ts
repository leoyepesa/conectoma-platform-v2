import type { Track } from '../../types';

export const trackLabel: Record<Track, string> = {
  l1: 'Línea 1 · Sistemas Inteligentes',
  l2: 'Línea 2 · Infraestructura Sostenible',
  l3: 'Línea 3 · Manufactura Inteligente',
  general: 'General',
  cierre: 'Cierre',
};

export const trackBg: Record<Track, string> = {
  l1: 'bg-l1/10 border-l1 text-l1',
  l2: 'bg-l2/10 border-l2 text-l2',
  l3: 'bg-l3/10 border-l3 text-l3',
  general: 'bg-accent/10 border-accent text-accent',
  cierre: 'bg-cierre/10 border-cierre text-cierre',
};

export const trackDot: Record<Track, string> = {
  l1: 'bg-l1',
  l2: 'bg-l2',
  l3: 'bg-l3',
  general: 'bg-accent',
  cierre: 'bg-cierre',
};
