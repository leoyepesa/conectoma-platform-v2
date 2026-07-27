import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Hero } from '../components/home/Hero';
import { LineasTematicas } from '../components/home/LineasTematicas';
import { useNews } from '../hooks/useSupabaseData';
import { NewsCard } from '../components/news/NewsCard';

export function Home() {
  const { data: news } = useNews();

  return (
    <div>
      <Hero />
      <LineasTematicas />

      <section className="border-t border-ink/10 bg-white py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-8 flex items-end justify-between">
            <h2 className="font-display text-2xl font-bold text-ink">Últimas noticias</h2>
            <Link
              to="/noticias"
              className="focus-ring flex items-center gap-1 rounded text-sm font-medium text-accent hover:underline"
            >
              Ver todas <ArrowRight size={14} />
            </Link>
          </div>
          {news.length === 0 ? (
            <p className="text-sm text-ink/40">Muy pronto compartiremos las primeras novedades del congreso.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-3">
              {news.slice(0, 3).map((n) => (
                <NewsCard key={n.id} item={n} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-ink py-16 text-white">
        <div className="mx-auto max-w-6xl px-5 text-center md:px-8">
          <h2 className="font-display text-2xl font-bold md:text-3xl">
            ¿Tienes un proyecto que aporte a la ingeniería del futuro?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-white/60">
            Postula tu artículo o póster de investigación y compártelo con toda la comunidad académica de IngenIA
            2026.
          </p>
          <Link
            to="/convocatoria"
            className="focus-ring mt-6 inline-block rounded-full bg-accent2 px-7 py-3 font-semibold text-ink transition-transform hover:scale-[1.03]"
          >
            Ver convocatoria
          </Link>
        </div>
      </section>
    </div>
  );
}
