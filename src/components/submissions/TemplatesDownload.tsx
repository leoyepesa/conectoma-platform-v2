import { FileDown } from 'lucide-react';
import { templates } from '../../data/templates';

export function TemplatesDownload() {
  return (
    <div className="space-y-3">
      <h2 className="font-display text-sm font-semibold uppercase tracking-wide text-ink/40">
        Plantillas descargables
      </h2>
      {templates.map((t) => (
        <a
          key={t.id}
          href={`/templates/${t.fileName}`}
          download
          className="focus-ring flex items-center gap-3 rounded-xl border border-ink/10 bg-white p-4 transition-colors hover:border-accent"
        >
          <FileDown size={20} className="flex-shrink-0 text-accent" />
          <div>
            <div className="font-display text-sm font-semibold text-ink">{t.label}</div>
            <div className="mt-0.5 text-xs text-ink/50">{t.description}</div>
          </div>
        </a>
      ))}
    </div>
  );
}
