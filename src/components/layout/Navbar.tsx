import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
  { to: '/agenda', label: 'Agenda' },
  { to: '/speakers', label: 'Conferencistas' },
  { to: '/convocatoria', label: 'Convocatoria' },
  { to: '/sponsors', label: 'Patrocinadores' },
  { to: '/noticias', label: 'Noticias' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 md:px-8">
        <NavLink to="/" className="flex items-baseline gap-1 focus-ring rounded" onClick={() => setOpen(false)}>
          <span className="font-display text-xl font-bold tracking-tight text-ink">
            Ingen<span className="text-accent">IA</span>
          </span>
          <span className="font-display text-sm font-semibold text-accent2">2026</span>
        </NavLink>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `focus-ring rounded text-sm font-medium transition-colors ${
                  isActive ? 'text-accent' : 'text-ink/70 hover:text-ink'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <NavLink
            to="/inscripcion"
            className="focus-ring rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.03]"
          >
            Inscríbete
          </NavLink>
        </div>

        <button
          className="focus-ring rounded p-2 md:hidden"
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-ink/10 bg-paper px-5 pb-4 md:hidden">
          <div className="flex flex-col gap-1 pt-2">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `focus-ring rounded px-2 py-2 text-sm font-medium ${
                    isActive ? 'text-accent' : 'text-ink/70'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <NavLink
              to="/inscripcion"
              onClick={() => setOpen(false)}
              className="focus-ring mt-2 rounded-full bg-accent px-4 py-2 text-center text-sm font-semibold text-white"
            >
              Inscríbete
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}
