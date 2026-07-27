import { useState, type FormEvent } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function AdminLogin() {
  const { session, signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (session) return <Navigate to="/admin" replace />;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error: err } = await signIn(email, password);
    setLoading(false);
    if (err) setError('Credenciales incorrectas. Verifica tu correo y contraseña.');
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-5">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-ink/10 bg-white p-8">
        <div className="mb-6 text-center">
          <div className="font-display text-xl font-bold">
            Ingen<span className="text-accent">IA</span> <span className="text-accent2">2026</span>
          </div>
          <p className="mt-1 text-sm text-ink/50">Panel administrativo</p>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-sm font-medium text-ink/70">Correo</span>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
          />
        </label>
        <label className="mt-4 block">
          <span className="mb-1.5 block text-sm font-medium text-ink/70">Contraseña</span>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
          />
        </label>

        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="focus-ring mt-6 w-full rounded-full bg-accent py-3 font-semibold text-white disabled:opacity-50"
        >
          {loading ? 'Ingresando…' : 'Ingresar'}
        </button>
      </form>
    </div>
  );
}
