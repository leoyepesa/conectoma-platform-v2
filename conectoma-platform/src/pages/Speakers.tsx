import { useSpeakers } from '../hooks/useSupabaseData';
import { SpeakerCard } from '../components/speakers/SpeakerCard';

export function Speakers() {
  const { data } = useSpeakers();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
      <header className="mb-10">
        <div className="font-display text-xs font-semibold uppercase tracking-widest text-accent">
          Invitados
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-4xl">Conferencistas</h1>
        <p className="mt-2 max-w-2xl text-ink/60">
          Voces expertas que guiarán las conversaciones de IngenIA 2026, tanto en las conferencias generales como en
          cada línea temática.
        </p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((s) => (
          <SpeakerCard key={s.id} speaker={s} />
        ))}
      </div>
    </div>
  );
}
