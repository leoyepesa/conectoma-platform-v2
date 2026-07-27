import { SimpleCrudTable } from '../../components/admin/SimpleCrudTable';

export function SpeakersAdmin() {
  return (
    <SimpleCrudTable
      table="speakers"
      title="Conferencistas"
      description="Administra la información de los speakers del congreso."
      orderBy="order_index"
      emptyRow={{ role: '', name: '', bio: '', photo_url: '', track: 'general', day: 1, linkedin_url: '', order_index: 0 }}
      columns={[
        { key: 'role', label: 'Rol (ej. Conferencista Línea 1)' },
        { key: 'name', label: 'Nombre completo' },
        { key: 'bio', label: 'Biografía / tema', type: 'textarea' },
        { key: 'photo_url', label: 'URL de foto' },
        { key: 'linkedin_url', label: 'URL LinkedIn' },
        { key: 'track', label: 'Línea', type: 'select', options: [
          { value: 'general', label: 'General' }, { value: 'l1', label: 'Línea 1' },
          { value: 'l2', label: 'Línea 2' }, { value: 'l3', label: 'Línea 3' }, { value: 'cierre', label: 'Cierre' },
        ] },
        { key: 'day', label: 'Día', type: 'select', options: [{ value: '1', label: 'Día 1' }, { value: '2', label: 'Día 2' }] },
        { key: 'order_index', label: 'Orden', type: 'number' },
      ]}
    />
  );
}
