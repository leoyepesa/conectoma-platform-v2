import { Link } from 'react-router-dom';
import { MapPin, Calendar } from 'lucide-react';
import { Countdown } from './Countdown';

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-ink/10 bg-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(58,47,216,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(58,47,216,0.06) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <div className="mb-4 inline-block rounded-full border border-accent px-3 py-1 font-display text-[11px] font-semibold uppercase tracking-widest text-accent">
          II Edición · División de Ingenierías
        </div>
        <h1 className="font-display text-5xl font-bold leading-[0.95] tracking-tight text-ink md:text-7xl">
          Congreso CONECTOMA
          <br />
          Ingen<span className="text-accent">IA</span>{' '}
          <span className="text-accent2">2026</span>
        </h1>
        <p className="mt-5 max-w-xl border-l-[3px] border-accent2 pl-3 font-display text-lg italic text-ink/70 md:text-xl">
          "Ingeniería que piensa, decide y construye"
        </p>

        <div className="mt-6 flex flex-wrap gap-4 text-sm text-ink/60">
          <span className="flex items-center gap-2">
            <MapPin size={16} className="text-accent" /> Universidad Santo Tomás · Sede Central, Bogotá
          </span>
          <span className="flex items-center gap-2">
            <Calendar size={16} className="text-accent" /> 28 y 29 de Octubre de 2026 · Jornada diurna presencial y nocturna virtual
          </span>
        </div>

        <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 font-display text-xs font-semibold uppercase tracking-wider text-ink/50">
              Faltan para el congreso
            </div>
            <Countdown />
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              to="/inscripcion"
              className="focus-ring rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
            >
              Inscríbete en SUMMA
            </Link>
            <Link
              to="/convocatoria"
              className="focus-ring rounded-full border border-ink/20 bg-white px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-accent hover:text-accent"
            >
              Envía tu artículo o póster
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
