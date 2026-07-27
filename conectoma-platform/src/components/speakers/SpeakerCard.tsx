import { Linkedin, User } from 'lucide-react';
import type { Speaker } from '../../types';
import { trackDot, trackLabel } from '../ui/trackStyles';

export function SpeakerCard({ speaker }: { speaker: Speaker }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-sm transition-shadow hover:shadow-md">
      <div className="flex aspect-[4/3] items-center justify-center bg-ink/5">
        {speaker.photo_url ? (
          <img src={speaker.photo_url} alt={speaker.name} className="h-full w-full object-cover" />
        ) : (
          <User size={40} className="text-ink/20" />
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-ink/40">
          <span className={`h-1.5 w-1.5 rounded-full ${trackDot[speaker.track]}`} />
          {speaker.role}
        </div>
        <div className="mt-1 font-display text-base font-semibold text-ink">{speaker.name}</div>
        {speaker.bio && <p className="mt-1.5 text-sm leading-snug text-ink/60">{speaker.bio}</p>}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-ink/40">{trackLabel[speaker.track]}</span>
          {speaker.linkedin_url && (
            <a
              href={speaker.linkedin_url}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring rounded text-ink/40 hover:text-accent"
              aria-label={`LinkedIn de ${speaker.name}`}
            >
              <Linkedin size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
