import { SimpleCrudTable } from '../../components/admin/SimpleCrudTable';

export function NewsAdmin() {
  return (
    <SimpleCrudTable
      table="news"
      title="Noticias"
      description="Publica actualizaciones antes, durante y después del congreso."
      orderBy="published_at"
      emptyRow={{ title: '', summary: '', content: '', cover_image_url: '', published_at: new Date().toISOString(), published: false }}
      columns={[
        { key: 'title', label: 'Título' },
        { key: 'summary', label: 'Resumen corto', type: 'textarea' },
        { key: 'content', label: 'Contenido completo', type: 'textarea' },
        { key: 'cover_image_url', label: 'Imagen de portada (URL)' },
        { key: 'published_at', label: 'Fecha (ISO)' },
        { key: 'published', label: 'Publicada', type: 'checkbox' },
      ]}
    />
  );
}
