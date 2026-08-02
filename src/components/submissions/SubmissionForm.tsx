import { useState, type ChangeEvent, type FormEvent } from 'react';
import { UploadCloud, FileText, X } from 'lucide-react';
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

// La postulación de pósters está desactivada por ahora — solo se reciben artículos.
// Para reactivarla, vuelve a agregar el selector de tipo que estaba antes de esta constante.
const POSTER_ENABLED = false;

const MAX_FILE_MB = 15;
const ACCEPTED = '.pdf,.doc,.docx,.ppt,.pptx';

export function SubmissionForm() {
  const [form, setForm] = useState(initial);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0] ?? null;
    if (f && f.size > MAX_FILE_MB * 1024 * 1024) {
      setErrorMsg(`El archivo supera el límite de ${MAX_FILE_MB} MB.`);
      e.target.value = '';
      setFile(null);
      return;
    }
    setErrorMsg('');
    setFile(f);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    let file_url = '';

    if (file) {
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
      const path = `${crypto.randomUUID()}-${safeName}`;

      const { error: uploadError } = await supabase.storage
        .from('submissions')
        .upload(path, file, { cacheControl: '3600', upsert: false });

      if (uploadError) {
        setStatus('error');
        setErrorMsg(
          'No pudimos subir el archivo. Verifica el formato/tamaño e inténtalo de nuevo, o escríbenos a congreso.ingenieria@usta.edu.co.'
        );
        return;
      }

      const { data: publicUrlData } = supabase.storage.from('submissions').getPublicUrl(path);
      file_url = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from('submissions').insert([
      {
        ...form,
        file_url,
        status: 'recibido',
      },
    ]);

    if (error) {
      setStatus('error');
      setErrorMsg(
        'No pudimos enviar tu propuesta. Verifica tu conexión o escríbenos a congreso.ingenieria@usta.edu.co.'
      );
      return;
    }
    setStatus('sent');
    setForm(initial);
    setFile(null);
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
      {POSTER_ENABLED ? (
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
      ) : (
        <div className="rounded-xl border border-accent bg-accent/10 px-4 py-3 text-center text-sm font-semibold text-accent">
          Postulación de artículos
        </div>
      )}

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

      <Field label="Documento del trabajo (PDF, Word o PowerPoint)">
        {!file ? (
          <label className="focus-ring flex cursor-pointer flex-col items-center gap-2 rounded-xl border-2 border-dashed border-ink/20 bg-paper px-4 py-8 text-center transition-colors hover:border-accent">
            <UploadCloud size={22} className="text-ink/40" />
            <span className="text-sm font-medium text-ink/60">
              Haz clic para elegir un archivo desde tu computador
            </span>
            <span className="text-xs text-ink/40">PDF, DOC, DOCX, PPT o PPTX · máx. {MAX_FILE_MB} MB</span>
            <input type="file" accept={ACCEPTED} onChange={handleFileChange} className="hidden" />
          </label>
        ) : (
          <div className="flex items-center gap-3 rounded-xl border border-ink/15 bg-paper px-4 py-3">
            <FileText size={18} className="flex-shrink-0 text-accent" />
            <span className="flex-1 truncate text-sm text-ink/70">{file.name}</span>
            <span className="flex-shrink-0 text-xs text-ink/40">
              {(file.size / (1024 * 1024)).toFixed(1)} MB
            </span>
            <button
              type="button"
              onClick={() => setFile(null)}
              className="focus-ring flex-shrink-0 rounded p-1 text-ink/40 hover:text-red-600"
              aria-label="Quitar archivo"
            >
              <X size={16} />
            </button>
          </div>
        )}
      </Field>

      {errorMsg && status !== 'error' && <p className="text-sm text-red-600">{errorMsg}</p>}

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
