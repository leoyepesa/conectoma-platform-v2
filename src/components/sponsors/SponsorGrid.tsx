import type { Sponsor } from '../../types';

const tierLabel: Record<Sponsor['tier'], string> = {
  platino: 'Aliados Platino',
  oro: 'Aliados Oro',
  plata: 'Aliados Plata',
  aliado: 'Aliados Institucionales',
};

const tierOrder: Sponsor['tier'][] = ['platino', 'oro', 'plata', 'aliado'];

export function SponsorGrid({ sponsors }: { sponsors: Sponsor[] }) {
  if (sponsors.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-ink/20 p-10 text-center text-sm text-ink/40">
        Los patrocinadores se publicarán próximamente. ¿Quieres aliarte con CONECTOMA?{' '}
        <a href="mailto:ingenia@usantotomas.edu.co" className="font-medium text-accent underline">
          Escríbenos
        </a>
        .
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {tierOrder.map((tier) => {
        const items = sponsors.filter((s) => s.tier === tier);
        if (items.length === 0) return null;
        return (
          <div key={tier}>
            <div className="mb-4 font-display text-xs font-semibold uppercase tracking-widest text-ink/40">
              {tierLabel[tier]}
            </div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
              {items.map((s) => (
                <a
                  key={s.id}
                  href={s.website_url ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="focus-ring flex aspect-video items-center justify-center rounded-xl border border-ink/10 bg-white p-4 grayscale transition-all hover:grayscale-0"
                >
                  {s.logo_url ? (
                    <img src={s.logo_url} alt={s.name} className="max-h-full max-w-full object-contain" />
                  ) : (
                    <span className="text-center text-sm font-medium text-ink/60">{s.name}</span>
                  )}
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
