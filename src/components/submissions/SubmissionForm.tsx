import { useState, type FormEvent } from 'react';
import { supabase } from '../../lib/supabase';
import type { SubmissionType, Track } from '../../types';

const initial = {
  type: 'articulo' as SubmissionType,
  title: '',
  authors: '',
  faculty: '',
  track: 'l1' as Track,
  abstract: '',
  file_url: '',
  contact_email: '',
  contact_phone: '',
};

export function SubmissionForm() {
  const [form, setForm] = useState(initial);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const { error } = await supabase.from('submissions').insert([
      {
        ...form,
        status: 'recibido',
      },
    ]);

    if (error) {
      setStatus('error');
      setErrorMsg(
        'No pudimos enviar tu propuesta. Verifica tu conexión o escríbenos a ingenia@usantotomas.edu.co.'
      );
      return;
    }
    setStatus('sent');
    setForm(initial);
  }

  if (status === 'sent') {
    return (
      <div className="rounded-2xl border border-accent2/30 bg-accent2/10 p-8 text-center">
        <h3 className="font-display text-xl font-semibold text-ink">¡Propuesta recibida!</h3>
        <p className="mt-2 text-sm text-ink/60">
          Gracias por postular. El comité académico revisará tu {form.type === 'articulo' ? 'artículo' : 'póster'} y
          te contactará al correo indicado con el resultado de la evaluación.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-2xl border border-ink/10 bg-white p-6 md:p-8">
      <div className="flex gap-3">
        {(['articulo', 'poster'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setForm((f) => ({ ...f, type: t }))}
            className={`focus-ring flex-1 rounded-xl border py-3 text-sm font-semibold capitalize transition-colors ${
              form.type === t ? 'border-accent bg-accent/10 text-accent' : 'border-ink/10 text-ink/50'
            }`}
          >
            {t === 'articulo' ? 'Artículo' : 'Póster'}
          </button>
        ))}
      </div>

      <Field label="Título del trabajo" required>
        <input
          required
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          className="input"
        />
      </Field>

      <Field label="Autores (separados por coma)" required>
        <input
          required
          value={form.authors}
          onChange={(e) => setForm((f) => ({ ...f, authors: e.target.value }))}
          className="input"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Facultad / programa" required>
          <input
            required
            value={form.faculty}
            onChange={(e) => setForm((f) => ({ ...f, faculty: e.target.value }))}
            className="input"
          />
        </Field>
        <Field label="Línea temática" required>
          <select
            value={form.track}
            onChange={(e) => setForm((f) => ({ ...f, track: e.target.value as Track }))}
            className="input"
          >
            <option value="l1">Línea 1 · Sistemas Inteligentes</option>
            <option value="l2">Línea 2 · Infraestructura Sostenible</option>
            <option value="l3">Línea 3 · Manufactura Inteligente</option>
          </select>
        </Field>
      </div>

      <Field label="Resumen (máx. 300 palabras)" required>
        <textarea
          required
          rows={5}
          value={form.abstract}
          onChange={(e) => setForm((f) => ({ ...f, abstract: e.target.value }))}
          className="input resize-none"
        />
      </Field>

      <Field label="Enlace al documento (Drive, OneDrive, etc.)">
        <input
          type="url"
          placeholder="https://..."
          value={form.file_url}
          onChange={(e) => setForm((f) => ({ ...f, file_url: e.target.value }))}
          className="input"
        />
      </Field>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Correo de contacto" required>
          <input
            required
            type="email"
            value={form.contact_email}
            onChange={(e) => setForm((f) => ({ ...f, contact_email: e.target.value }))}
            className="input"
          />
        </Field>
        <Field label="Teléfono (opcional)">
          <input
            value={form.contact_phone}
            onChange={(e) => setForm((f) => ({ ...f, contact_phone: e.target.value }))}
            className="input"
          />
        </Field>
      </div>

      {status === 'error' && <p className="text-sm text-red-600">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="focus-ring w-full rounded-full bg-accent py-3 font-semibold text-white transition-transform hover:scale-[1.01] disabled:opacity-50"
      >
        {status === 'sending' ? 'Enviando…' : 'Enviar propuesta'}
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink/70">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {children}
    </label>
  );
}
