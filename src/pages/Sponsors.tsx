import { useSponsors } from '../hooks/useSupabaseData';
import { SponsorGrid } from '../components/sponsors/SponsorGrid';

export function Sponsors() {
  const { data } = useSponsors();

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 md:px-8">
      <header className="mb-10">
        <div className="font-display text-xs font-semibold uppercase tracking-widest text-accent">Aliados</div>
        <h1 className="mt-2 font-display text-3xl font-bold text-ink md:text-4xl">Patrocinadores</h1>
        <p className="mt-2 max-w-2xl text-ink/60">
          Empresas e instituciones que hacen posible IngenIA 2026 y que participan en la feria empresarial y bolsa
          de empleo del congreso.
        </p>
      </header>
      <SponsorGrid sponsors={data} />
    </div>
  );
}
