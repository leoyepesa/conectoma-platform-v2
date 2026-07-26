import { lineasTematicas, eventStats } from '../../data/agenda';

const cardBg: Record<string, string> = {
  l1: 'bg-l1/5 border-l1',
  l2: 'bg-l2/5 border-l2',
  l3: 'bg-l3/5 border-l3',
};
const numColor: Record<string, string> = {
  l1: 'text-l1',
  l2: 'text-l2',
  l3: 'text-l3',
};

export function LineasTematicas() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
      <div className="mb-8 flex items-center gap-3">
        <h2 className="font-display text-sm font-semibold uppercase tracking-widest text-ink/50">
          Líneas temáticas
        </h2>
        <div className="h-px flex-1 bg-ink/10" />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {lineasTematicas.map((l, i) => (
          <div key={l.id} className={`rounded-xl border-l-4 p-5 ${cardBg[l.color]}`}>
            <div className={`font-display text-xs font-bold uppercase tracking-wider ${numColor[l.color]}`}>
              Línea {i + 1}
            </div>
            <div className="mt-1 font-display text-base font-semibold leading-snug text-ink">
              {l.title}
            </div>
            <div className="mt-1 text-sm text-ink/60">{l.facultades}</div>
          </div>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-3 gap-4 border-t border-ink/10 pt-10 md:grid-cols-7">
        {[
          ['Conferencistas', eventStats.conferencistas],
          ['Días', eventStats.dias],
          ['Jornadas', eventStats.jornadas],
          ['Presenciales', eventStats.estudiantesPresenciales],
          ['Virtuales', eventStats.estudiantesVirtuales],
          ['Facultades', eventStats.facultades],
          ['Ponencias', eventStats.ponencias],
        ].map(([label, num]) => (
          <div key={label as string} className="text-center">
            <div className="font-display text-2xl font-bold text-accent md:text-3xl">{num}</div>
            <div className="mt-0.5 text-[11px] text-ink/50">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
