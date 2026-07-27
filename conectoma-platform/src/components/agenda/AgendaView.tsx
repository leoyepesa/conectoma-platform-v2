import { useEffect, useState } from 'react';
import { useAgenda } from '../../hooks/useSupabaseData';
import { SessionCard } from './SessionCard';

export function AgendaView() {
  const { data: sessions, loading } = useAgenda();
  const [day, setDay] = useState<1 | 2>(1);
  const [modality, setModality] = useState<'todas' | 'presencial' | 'virtual'>('todas');
  const [now, setNow] = useState(new Date());

  // Refresca cada 30s para actualizar el estado "en vivo"
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 30000);
    return () => clearInterval(t);
  }, []);

  const filtered = sessions
    .filter((s) => s.day === day)
    .filter((s) => modality === 'todas' || s.modality === modality)
    .sort((a, b) => a.order_index - b.order_index);

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex gap-2">
          {[1, 2].map((d) => (
            <button
              key={d}
              onClick={() => setDay(d as 1 | 2)}
              className={`focus-ring rounded-full px-5 py-2 font-display text-sm font-semibold transition-colors ${
                day === d ? 'bg-accent text-white' : 'bg-white text-ink/60 hover:text-ink border border-ink/10'
              }`}
            >
              Día {d}
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {(['todas', 'presencial', 'virtual'] as const).map((m) => (
            <button
              key={m}
              onClick={() => setModality(m)}
              className={`focus-ring rounded-full px-4 py-1.5 text-xs font-medium capitalize transition-colors ${
                modality === m ? 'bg-ink text-white' : 'bg-white text-ink/50 hover:text-ink border border-ink/10'
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {loading && <p className="text-sm text-ink/40">Cargando agenda…</p>}

      <div className="grid gap-3 sm:grid-cols-2">
        {filtered.map((s) => (
          <SessionCard key={s.id} session={s} now={now} />
        ))}
      </div>

      {!loading && filtered.length === 0 && (
        <p className="rounded-xl border border-dashed border-ink/20 p-8 text-center text-sm text-ink/40">
          No hay sesiones para este filtro todavía.
        </p>
      )}
    </div>
  );
}
