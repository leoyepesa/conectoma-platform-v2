import { useState } from 'react';
import { Mail, Loader2, CheckCircle2 } from 'lucide-react';
import { SimpleCrudTable } from '../../components/admin/SimpleCrudTable';
import { supabase } from '../../lib/supabase';

export function SubmissionsAdmin() {
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [sentId, setSentId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);

  async function resendToEditor(submissionId: string) {
    setSendingId(submissionId);
    setSentId(null);
    setErrorId(null);

    const { error } = await supabase.functions.invoke('send-submission-email', {
      body: { submissionId },
    });

    setSendingId(null);
    if (error) {
      setErrorId(submissionId);
      setTimeout(() => setErrorId(null), 4000);
      return;
    }
    setSentId(submissionId);
    setTimeout(() => setSentId(null), 4000);
  }

  return (
    <SimpleCrudTable
      table="submissions"
      title="Artículos y pósters"
      description="Revisa las propuestas recibidas, actualiza su estado, y reenvía cualquiera al editor en jefe por correo."
      orderBy="created_at"
      emptyRow={{
        type: 'articulo', title: '', authors: '', faculty: '', track: 'l1', abstract: '',
        file_url: '', contact_email: '', contact_phone: '', status: 'recibido',
      }}
      columns={[
        { key: 'type', label: 'Tipo', type: 'select', options: [{ value: 'articulo', label: 'Artículo' }, { value: 'poster', label: 'Póster' }] },
        { key: 'title', label: 'Título' },
        { key: 'authors', label: 'Autores' },
        { key: 'faculty', label: 'Facultad' },
        { key: 'track', label: 'Línea temática', type: 'select', options: [
          { value: 'l1', label: 'Línea 1' }, { value: 'l2', label: 'Línea 2' }, { value: 'l3', label: 'Línea 3' },
        ] },
        { key: 'abstract', label: 'Resumen', type: 'textarea' },
        { key: 'file_url', label: 'Enlace al documento' },
        { key: 'contact_email', label: 'Correo de contacto' },
        { key: 'contact_phone', label: 'Teléfono de contacto' },
        { key: 'status', label: 'Estado', type: 'select', options: [
          { value: 'recibido', label: 'Recibido' }, { value: 'en_revision', label: 'En revisión' },
          { value: 'aceptado', label: 'Aceptado' }, { value: 'rechazado', label: 'Rechazado' },
        ] },
      ]}
      renderExtraActions={(row) => {
        const id = row.id as string;
        const isSending = sendingId === id;
        const wasSent = sentId === id;
        const hadError = errorId === id;
        return (
          <button
            type="button"
            onClick={() => resendToEditor(id)}
            disabled={isSending}
            className={`focus-ring flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
              wasSent
                ? 'bg-accent2/15 text-accent2'
                : hadError
                  ? 'bg-red-50 text-red-600'
                  : 'bg-accent/10 text-accent hover:bg-accent/20'
            }`}
          >
            {isSending ? (
              <>
                <Loader2 size={13} className="animate-spin" /> Enviando…
              </>
            ) : wasSent ? (
              <>
                <CheckCircle2 size={13} /> Enviado
              </>
            ) : hadError ? (
              <>
                <Mail size={13} /> Error, reintentar
              </>
            ) : (
              <>
                <Mail size={13} /> Reenviar al editor
              </>
            )}
          </button>
        );
      }}
    />
  );
}
