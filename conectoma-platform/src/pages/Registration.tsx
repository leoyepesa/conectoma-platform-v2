import { ExternalLink, CheckCircle2 } from 'lucide-react';

const SUMMA_URL =
  import.meta.env.VITE_SUMMA_REGISTRATION_URL || 'https://summa.usta.edu.co/';

const steps = [
  'Ingresa a la plataforma SUMMA con tu usuario institucional (o crea una cuenta si eres externo).',
  'Busca el evento "CONECTOMA | IngenIA 2026" en el módulo de inscripciones.',
  'Selecciona tu modalidad: jornada presencial o jornada virtual/distancia.',
  'Confirma tus datos y completa el registro. Recibirás la confirmación por correo.',
];

export function Registration() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-16 md:px-8">
      <header className="text-center">
        <div className="font-display text-xs font-semibold uppercase tracking-widest text-accent">
          Inscripción oficial
        </div>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-4xl">
          Regístrate para IngenIA 2026
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-ink/60">
          La inscripción se realiza a través de la plataforma institucional SUMMA de la Universidad Santo Tomás. Es
          gratuita para estudiantes y comunidad USTA.
        </p>
      </header>

      <div className="mt-10 rounded-2xl border border-ink/10 bg-white p-6 md:p-8">
        <ol className="space-y-4">
          {steps.map((s, i) => (
            <li key={i} className="flex gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent/10 text-xs font-bold text-accent">
                {i + 1}
              </span>
              <span className="text-sm text-ink/70">{s}</span>
            </li>
          ))}
        </ol>

        <a
          href={SUMMA_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 font-semibold text-white transition-transform hover:scale-[1.01]"
        >
          Ir a SUMMA a inscribirme <ExternalLink size={16} />
        </a>
      </div>

      <div className="mt-8 flex items-start gap-3 rounded-xl bg-accent2/10 p-4 text-sm text-ink/70">
        <CheckCircle2 size={18} className="mt-0.5 flex-shrink-0 text-accent2" />
        <p>
          Al finalizar tu inscripción en SUMMA recibirás un correo de confirmación con el enlace de acceso a las
          salas virtuales (para la jornada nocturna) y las indicaciones de ingreso al campus (para la jornada
          presencial).
        </p>
      </div>
    </div>
  );
}
