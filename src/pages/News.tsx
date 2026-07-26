import { useNews } from '../hooks/useSupabaseData';
import { NewsCard } from '../components/news/NewsCard';

export function News() {
  const { data } = useNews();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
      <header className="mb-10">
        <div className="font-display text-xs font-semibold uppercase tracking-widest text-accent">Actualidad</div>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-4xl">Noticias</h1>
        <p className="mt-2 max-w-2xl text-ink/60">
          Novedades, avances y anuncios oficiales sobre el congreso, antes, durante y después del evento.
        </p>
      </header>
      {data.length === 0 ? (
        <p className="rounded-xl border border-dashed border-ink/20 p-10 text-center text-sm text-ink/40">
          Aún no hay noticias publicadas.
        </p>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {data.map((n) => (
            <NewsCard key={n.id} item={n} />
          ))}
        </div>
      )}
    </div>
  );
}
