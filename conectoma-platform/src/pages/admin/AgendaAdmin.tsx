import { SimpleCrudTable } from '../../components/admin/SimpleCrudTable';

export function AgendaAdmin() {
  return (
    <SimpleCrudTable
      table="agenda_sessions"
      title="Agenda"
      description="Edita, agrega o elimina sesiones del cronograma. Los cambios se reflejan de inmediato en el sitio público."
      orderBy="order_index"
      emptyRow={{
        day: 1, modality: 'presencial', start_time: '08:00', end_time: '09:00',
        title: '', subtitle: '', location: '', track: 'general', kind: 'plenaria', order_index: 0,
      }}
      columns={[
        { key: 'day', label: 'Día', type: 'select', options: [{ value: '1', label: 'Día 1' }, { value: '2', label: 'Día 2' }] },
        { key: 'modality', label: 'Modalidad', type: 'select', options: [{ value: 'presencial', label: 'Presencial' }, { value: 'virtual', label: 'Virtual' }] },
        { key: 'start_time', label: 'Inicio (HH:MM)' },
        { key: 'end_time', label: 'Fin (HH:MM)' },
        { key: 'title', label: 'Título' },
        { key: 'subtitle', label: 'Subtítulo' },
        { key: 'location', label: 'Lugar' },
        { key: 'track', label: 'Línea', type: 'select', options: [
          { value: 'general', label: 'General' }, { value: 'l1', label: 'Línea 1' },
          { value: 'l2', label: 'Línea 2' }, { value: 'l3', label: 'Línea 3' }, { value: 'cierre', label: 'Cierre' },
        ] },
        { key: 'kind', label: 'Tipo', type: 'select', options: [
          { value: 'plenaria', label: 'Plenaria' }, { value: 'panel', label: 'Panel' }, { value: 'break', label: 'Receso' },
          { value: 'student', label: 'Estudiantil' }, { value: 'award', label: 'Premiación' }, { value: 'show', label: 'Cierre' }, { value: 'net', label: 'Networking' },
        ] },
        { key: 'order_index', label: 'Orden', type: 'number' },
      ]}
    />
  );
}
