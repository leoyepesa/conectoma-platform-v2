import { SimpleCrudTable } from '../../components/admin/SimpleCrudTable';

export function SubmissionsAdmin() {
  return (
    <SimpleCrudTable
      table="submissions"
      title="Artículos y pósters"
      description="Revisa las propuestas recibidas y actualiza su estado de evaluación."
      orderBy="created_at"
      emptyRow={{ type: 'articulo', title: '', authors: '', faculty: '', track: 'l1', abstract: '', file_url: '', contact_email: '', contact_phone: '', status: 'recibido' }}
      columns={[
        { key: 'type', label: 'Tipo', type: 'select', options: [{ value: 'articulo', label: 'Artículo' }, { value: 'poster', label: 'Póster' }] },
        { key: 'title', label: 'Título' },
        { key: 'authors', label: 'Autores' },
        { key: 'faculty', label: 'Facultad' },
        { key: 'contact_email', label: 'Correo de contacto' },
        { key: 'status', label: 'Estado', type: 'select', options: [
          { value: 'recibido', label: 'Recibido' }, { value: 'en_revision', label: 'En revisión' },
          { value: 'aceptado', label: 'Aceptado' }, { value: 'rechazado', label: 'Rechazado' },
        ] },
      ]}
    />
  );
}
