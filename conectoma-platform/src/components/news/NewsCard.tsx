import type { NewsItem } from '../../types';

export function NewsCard({ item }: { item: NewsItem }) {
  const date = new Date(item.published_at).toLocaleDateString('es-CO', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <article className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-shadow hover:shadow-md">
      {item.cover_image_url && (
        <div className="aspect-video overflow-hidden bg-ink/5">
          <img src={item.cover_image_url} alt="" className="h-full w-full object-cover" />
        </div>
      )}
      <div className="p-5">
        <div className="text-xs font-medium uppercase tracking-wide text-ink/40">{date}</div>
        <h3 className="mt-1 font-display text-lg font-semibold leading-snug text-ink">{item.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink/60">{item.summary}</p>
      </div>
    </article>
  );
}
