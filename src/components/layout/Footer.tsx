import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="border-t border-ink/10 bg-white">
      <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="font-display text-lg font-bold">
              Ingen<span className="text-accent">IA</span> <span className="text-accent2">2026</span>
            </div>
            <p className="mt-2 text-sm text-ink/60">
              Congreso CONECTOMA · II Edición
              <br />
              Universidad Santo Tomás, Bogotá
              <br />
              División de Ingenierías
            </p>
          </div>
          <div>
            <div className="font-display text-xs font-semibold uppercase tracking-wider text-ink/50">
              Navegación
            </div>
            <ul className="mt-3 space-y-2 text-sm text-ink/70">
              <li><Link className="focus-ring rounded hover:text-accent" to="/agenda">Agenda</Link></li>
              <li><Link className="focus-ring rounded hover:text-accent" to="/speakers">Conferencistas</Link></li>
              <li><Link className="focus-ring rounded hover:text-accent" to="/convocatoria">Convocatoria de artículos y pósters</Link></li>
              <li><Link className="focus-ring rounded hover:text-accent" to="/inscripcion">Inscripción (SUMMA)</Link></li>
            </ul>
          </div>
          <div>
            <div className="font-display text-xs font-semibold uppercase tracking-wider text-ink/50">
              Contacto
            </div>
            <p className="mt-3 text-sm text-ink/70">
              Sede Central USTA, Bogotá
              <br />
              ingenia@usantotomas.edu.co
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-ink/10 pt-6 text-xs text-ink/40 md:flex-row">
          <span>© 2026 Universidad Santo Tomás · Congreso CONECTOMA</span>
          <Link to="/admin" className="focus-ring rounded hover:text-ink/70">
            Acceso administrativo
          </Link>
        </div>
      </div>
    </footer>
  );
}
