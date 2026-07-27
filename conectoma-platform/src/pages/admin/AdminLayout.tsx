import { NavLink, Navigate, Outlet } from 'react-router-dom';
import { LogOut, Calendar, Users, Building2, Newspaper, FileText } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

const items = [
  { to: '/admin/agenda', label: 'Agenda', icon: Calendar },
  { to: '/admin/speakers', label: 'Conferencistas', icon: Users },
  { to: '/admin/sponsors', label: 'Patrocinadores', icon: Building2 },
  { to: '/admin/news', label: 'Noticias', icon: Newspaper },
  { to: '/admin/submissions', label: 'Artículos y pósters', icon: FileText },
];

export function AdminLayout() {
  const { session, profile, loading, signOut } = useAuth();

  if (loading) return <div className="p-10 text-center text-sm text-ink/40">Cargando…</div>;
  if (!session) return <Navigate to="/admin/login" replace />;

  return (
    <div className="flex min-h-[80vh]">
      <aside className="w-56 flex-shrink-0 border-r border-ink/10 bg-white p-4">
        <div className="mb-6 px-2">
          <div className="font-display text-sm font-bold">Panel admin</div>
          <div className="truncate text-xs text-ink/40">{profile?.email ?? session.user.email}</div>
        </div>
        <nav className="space-y-1">
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              className={({ isActive }) =>
                `focus-ring flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  isActive ? 'bg-accent/10 text-accent' : 'text-ink/60 hover:bg-ink/5'
                }`
              }
            >
              <it.icon size={16} /> {it.label}
            </NavLink>
          ))}
        </nav>
        <button
          onClick={() => signOut()}
          className="focus-ring mt-6 flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-ink/50 hover:bg-ink/5"
        >
          <LogOut size={16} /> Cerrar sesión
        </button>
      </aside>
      <main className="flex-1 overflow-x-auto p-6">
        <Outlet />
      </main>
    </div>
  );
}
