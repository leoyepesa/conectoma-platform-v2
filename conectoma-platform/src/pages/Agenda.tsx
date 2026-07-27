import { AgendaView } from '../components/agenda/AgendaView';

export function Agenda() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
      <header className="mb-10">
        <div className="font-display text-xs font-semibold uppercase tracking-widest text-accent">
          Cronograma
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-4xl">Agenda del congreso</h1>
        <p className="mt-2 max-w-2xl text-ink/60">
          Consulta las actividades de cada día. Las sesiones se actualizan automáticamente para mostrarte qué está
          pasando ahora mismo durante el evento.
        </p>
      </header>
      <AgendaView />
    </div>
  );
}
