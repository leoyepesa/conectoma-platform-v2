import { useCountdown } from '../../hooks/useCountdown';

const EVENT_DATE = import.meta.env.VITE_EVENT_DATE || '2026-10-21T08:00:00-05:00';

const units: { key: 'days' | 'hours' | 'minutes' | 'seconds'; label: string }[] = [
  { key: 'days', label: 'Días' },
  { key: 'hours', label: 'Horas' },
  { key: 'minutes', label: 'Min' },
  { key: 'seconds', label: 'Seg' },
];

export function Countdown() {
  const parts = useCountdown(EVENT_DATE);

  if (parts.isPast) {
    return (
      <div className="rounded-2xl border border-accent2/30 bg-accent2/10 px-6 py-4 text-center font-display font-semibold text-accent2">
        ¡El congreso está en marcha! Consulta la agenda en vivo.
      </div>
    );
  }

  return (
    <div className="flex gap-3 md:gap-4" role="timer" aria-label="Tiempo restante para IngenIA 2026">
      {units.map((u) => (
        <div
          key={u.key}
          className="flex w-16 flex-col items-center rounded-xl border border-ink/10 bg-white py-3 shadow-sm md:w-20"
        >
          <span className="font-display text-2xl font-bold tabular-nums text-ink md:text-3xl">
            {String(parts[u.key]).padStart(2, '0')}
          </span>
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-ink/50">
            {u.label}
          </span>
        </div>
      ))}
    </div>
  );
}
