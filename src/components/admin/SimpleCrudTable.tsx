import { useEffect, useState } from 'react';
import { Plus, Trash2, Save, ImagePlus, Loader2, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export interface ColumnDef {
  key: string;
  label: string;
  type?: 'text' | 'textarea' | 'number' | 'select' | 'checkbox' | 'datetime' | 'image';
  options?: { value: string; label: string }[];
  width?: string;
}

interface Props {
  table: string;
  columns: ColumnDef[];
  emptyRow: Record<string, unknown>;
  orderBy?: string;
  title: string;
  description?: string;
  renderExtraActions?: (row: Record<string, unknown>) => React.ReactNode;
}

export function SimpleCrudTable({
  table,
  columns,
  emptyRow,
  orderBy = 'order_index',
  title,
  description,
  renderExtraActions,
}: Props) {
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [loading, setLoading] = useState(true);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [msg, setMsg] = useState('');

  async function load() {
    setLoading(true);
    const { data } = await supabase.from(table).select('*').order(orderBy, { ascending: true });
    setRows(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  function updateLocal(id: string, key: string, value: unknown) {
    setRows((rs) => rs.map((r) => (r.id === id ? { ...r, [key]: value } : r)));
  }

  async function saveRow(row: Record<string, unknown>) {
    setSavingId(row.id as string);
    const { error } = await supabase.from(table).upsert(row);
    setSavingId(null);
    setMsg(error ? `Error al guardar: ${error.message}` : 'Guardado ✓');
    setTimeout(() => setMsg(''), 2000);
  }

  async function deleteRow(id: string) {
    if (!confirm('¿Eliminar este registro?')) return;
    await supabase.from(table).delete().eq('id', id);
    setRows((rs) => rs.filter((r) => r.id !== id));
  }

  function addRow() {
    const id = crypto.randomUUID();
    const newRow: Record<string, unknown> = { ...emptyRow, id };
    // Solo asigna order_index si la entidad realmente tiene esa columna
    // (ej. news no la tiene, se ordena por published_at)
    if ('order_index' in emptyRow) {
      newRow.order_index = rows.length + 1;
    }
    setRows((rs) => [...rs, newRow]);
  }

  return (
    <div>
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-ink">{title}</h1>
          {description && <p className="mt-1 text-sm text-ink/50">{description}</p>}
        </div>
        <button
          onClick={addRow}
          className="focus-ring flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white"
        >
          <Plus size={15} /> Nuevo
        </button>
      </div>

      {msg && <p className="mb-3 text-sm text-accent2">{msg}</p>}
      {loading && <p className="text-sm text-ink/40">Cargando…</p>}

      <div className="space-y-3">
        {rows.map((row) => (
          <div key={row.id as string} className="rounded-xl border border-ink/10 bg-white p-4">
            <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(columns.length, 3)}, 1fr)` }}>
              {columns.map((col) => (
                <label key={col.key} className="block">
                  <span className="mb-1 block text-xs font-medium text-ink/50">{col.label}</span>
                  <FieldInput
                    col={col}
                    value={row[col.key]}
                    onChange={(v) => updateLocal(row.id as string, col.key, v)}
                  />
                </label>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap justify-end gap-2">
              {renderExtraActions?.(row)}
              <button
                onClick={() => deleteRow(row.id as string)}
                className="focus-ring flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
              >
                <Trash2 size={13} /> Eliminar
              </button>
              <button
                onClick={() => saveRow(row)}
                disabled={savingId === row.id}
                className="focus-ring flex items-center gap-1 rounded-lg bg-ink px-3 py-1.5 text-xs font-medium text-white disabled:opacity-50"
              >
                <Save size={13} /> {savingId === row.id ? 'Guardando…' : 'Guardar'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {!loading && rows.length === 0 && (
        <p className="rounded-xl border border-dashed border-ink/20 p-8 text-center text-sm text-ink/40">
          Sin registros todavía. Haz clic en "Nuevo" para agregar el primero.
        </p>
      )}
    </div>
  );
}

function FieldInput({
  col,
  value,
  onChange,
}: {
  col: ColumnDef;
  value: unknown;
  onChange: (v: unknown) => void;
}) {
  if (col.type === 'image') {
    return <ImageUploadField value={value as string} onChange={onChange} />;
  }
  if (col.type === 'textarea') {
    return (
      <textarea
        rows={2}
        value={(value as string) ?? ''}
        onChange={(e) => onChange(e.target.value)}
        className="input resize-none"
      />
    );
  }
  if (col.type === 'select' && col.options) {
    return (
      <select value={(value as string) ?? ''} onChange={(e) => onChange(e.target.value)} className="input">
        {col.options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    );
  }
  if (col.type === 'checkbox') {
    return (
      <input
        type="checkbox"
        checked={Boolean(value)}
        onChange={(e) => onChange(e.target.checked)}
        className="h-5 w-5 rounded border-ink/20 text-accent focus:ring-accent"
      />
    );
  }
  if (col.type === 'number') {
    return (
      <input
        type="number"
        value={(value as number) ?? 0}
        onChange={(e) => onChange(Number(e.target.value))}
        className="input"
      />
    );
  }
  return (
    <input
      type="text"
      value={(value as string) ?? ''}
      onChange={(e) => onChange(e.target.value)}
      className="input"
    />
  );
}

const MAX_IMAGE_MB = 5;
const IMAGE_ACCEPT = 'image/png,image/jpeg,image/webp,image/svg+xml';

function ImageUploadField({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;

    if (file.size > MAX_IMAGE_MB * 1024 * 1024) {
      setError(`La imagen supera el límite de ${MAX_IMAGE_MB} MB.`);
      return;
    }

    setUploading(true);
    setError('');

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
    const path = `${crypto.randomUUID()}-${safeName}`;

    const { error: uploadError } = await supabase.storage
      .from('site-images')
      .upload(path, file, { cacheControl: '3600', upsert: false });

    setUploading(false);

    if (uploadError) {
      setError('No se pudo subir la imagen. Verifica el formato/tamaño e inténtalo de nuevo.');
      return;
    }

    const { data } = supabase.storage.from('site-images').getPublicUrl(path);
    onChange(data.publicUrl);
  }

  return (
    <div>
      {value ? (
        <div className="flex items-center gap-2 rounded-lg border border-ink/15 bg-paper p-2">
          <img src={value} alt="" className="h-12 w-12 flex-shrink-0 rounded object-cover" />
          <span className="flex-1 truncate text-xs text-ink/50">{value}</span>
          <button
            type="button"
            onClick={() => onChange('')}
            className="focus-ring flex-shrink-0 rounded p-1 text-ink/40 hover:text-red-600"
            aria-label="Quitar imagen"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <label className="focus-ring flex cursor-pointer items-center justify-center gap-2 rounded-lg border border-dashed border-ink/20 bg-paper py-2.5 text-xs font-medium text-ink/50 transition-colors hover:border-accent hover:text-accent">
          {uploading ? (
            <>
              <Loader2 size={14} className="animate-spin" /> Subiendo…
            </>
          ) : (
            <>
              <ImagePlus size={14} /> Subir imagen
            </>
          )}
          <input type="file" accept={IMAGE_ACCEPT} onChange={handleFile} className="hidden" disabled={uploading} />
        </label>
      )}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
