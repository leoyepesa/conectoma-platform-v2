import type { AgendaSession } from '../../types';
import { trackBg, trackDot } from '../ui/trackStyles';

const EVENT_DATE = import.meta.env.VITE_EVENT_DATE || '2026-10-21T08:00:00-05:00';

function sessionDateTime(session: AgendaSession, timeStr: string): Date {
  const base = new Date(EVENT_DATE);
  const dayOffset = session.day - 1;
  const [h, m] = timeStr.split(':').map(Number);
  const d = new Date(base);
  d.setDate(d.getDate() + dayOffset);
  d.setHours(h, m, 0, 0);
  return d;
}

type Status = 'past' | 'live' | 'upcoming';

function getStatus(session: AgendaSession, now: Date): Status {
  const start = sessionDateTime(session, session.start_time);
  const end = sessionDateTime(session, session.end_time);
  if (now >= start && now <= end) return 'live';
  if (now > end) return 'past';
  return 'upcoming';
}

const kindLabel: Record<AgendaSession['kind'], string> = {
  plenaria: 'Plenaria',
  panel: 'Panel',
  break: 'Receso',
  student: 'Estudiantil',
  award: 'Premiación',
  show: 'Cierre',
  net: 'Networking',
};

export function SessionCard({ session, now }: { session: AgendaSession; now: Date }) {
  const status = getStatus(session, now);

  return (
    <div
      className={`relative rounded-xl border-l-4 p-4 transition-all ${trackBg[session.track]} ${
        status === 'past' ? 'opacity-50' : ''
      } ${status === 'live' ? 'ring-2 ring-accent2 ring-offset-2 ring-offset-paper' : ''}`}
    >
      {status === 'live' && (
        <span className="absolute -top-2.5 right-3 flex items-center gap-1 rounded-full bg-accent2 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" /> En vivo
        </span>
      )}
      <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-ink/50">
        <span className="tabular-nums">
          {session.start_time} – {session.end_time}
        </span>
        <span className={`h-1 w-1 rounded-full ${trackDot[session.track]}`} />
        <span className="uppercase tracking-wide">{kindLabel[session.kind]}</span>
        <span className="ml-auto rounded-full bg-white/60 px-2 py-0.5 text-[10px] uppercase">
          {session.modality === 'presencial' ? 'Presencial' : 'Virtual'}
        </span>
      </div>
      <div className="mt-1.5 font-display text-sm font-semibold leading-snug text-ink md:text-[15px]">
        {session.title}
      </div>
      {session.subtitle && <div className="mt-0.5 text-xs text-ink/60">{session.subtitle}</div>}
      {session.location && (
        <div className="mt-1 text-xs font-medium text-ink/50">{session.location}</div>
      )}
    </div>
  );
}
