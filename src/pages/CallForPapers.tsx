import { SubmissionForm } from '../components/submissions/SubmissionForm';
import { TemplatesDownload } from '../components/submissions/TemplatesDownload';

const criteria = [
  ['Originalidad', 'Trabajos inéditos, no publicados previamente en otros congresos o revistas.'],
  ['Alineación temática', 'Deben enmarcarse en una de las 3 líneas temáticas del congreso.'],
  ['Autoría estudiantil o docente', 'Abierto a estudiantes, docentes e investigadores de cualquier institución.'],
  ['Formato', 'Artículo: máx. 8 páginas. Póster: tamaño 90x120 cm, formato digital PDF para revisión.'],
];

export function CallForPapers() {
  return (
    <div className="mx-auto max-w-5xl px-5 py-12 md:px-8">
      <header className="mb-10 max-w-2xl">
        <div className="font-display text-xs font-semibold uppercase tracking-widest text-accent">
          Convocatoria abierta
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-4xl">
          Envía tu artículo o póster
        </h1>
        <p className="mt-2 text-ink/60">
          IngenIA 2026 recibe propuestas de investigación de estudiantes y docentes para ser presentadas en la
          jornada de pósters (Día 1) y las ponencias estudiantiles (Día 2), con premiación a los mejores trabajos.
        </p>
      </header>

      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-8">
          <TemplatesDownload />

          <div className="space-y-4">
            <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-ink/40">
              Criterios de evaluación
            </h2>
            {criteria.map(([title, desc]) => (
              <div key={title} className="rounded-xl border border-ink/10 bg-white p-4">
                <div className="font-display text-sm font-semibold text-ink">{title}</div>
                <div className="mt-1 text-sm text-ink/60">{desc}</div>
              </div>
            ))}
          </div>
        </div>

        <SubmissionForm />
      </div>
    </div>
  );
}
