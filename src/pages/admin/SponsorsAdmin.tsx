import { SimpleCrudTable } from '../../components/admin/SimpleCrudTable';

export function SponsorsAdmin() {
  return (
    <SimpleCrudTable
      table="sponsors"
      title="Patrocinadores"
      description="Administra los logos y niveles de patrocinio."
      orderBy="order_index"
      emptyRow={{ name: '', logo_url: '', website_url: '', tier: 'aliado', order_index: 0 }}
      columns={[
        { key: 'name', label: 'Nombre' },
        { key: 'logo_url', label: 'URL del logo' },
        { key: 'website_url', label: 'Sitio web' },
        { key: 'tier', label: 'Nivel', type: 'select', options: [
          { value: 'platino', label: 'Platino' }, { value: 'oro', label: 'Oro' },
          { value: 'plata', label: 'Plata' }, { value: 'aliado', label: 'Aliado institucional' },
        ] },
        { key: 'order_index', label: 'Orden', type: 'number' },
      ]}
    />
  );
}
