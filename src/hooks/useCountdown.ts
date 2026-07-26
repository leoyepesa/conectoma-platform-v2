import { useEffect, useState } from 'react';

export interface CountdownParts {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function diffToParts(targetTime: number): CountdownParts {
  const now = Date.now();
  const diff = targetTime - now;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, isPast: false };
}

export function useCountdown(targetDateISO: string): CountdownParts {
  const target = new Date(targetDateISO).getTime();
  const [parts, setParts] = useState<CountdownParts>(() => diffToParts(target));

  useEffect(() => {
    const interval = setInterval(() => {
      setParts(diffToParts(target));
    }, 1000);
    return () => clearInterval(interval);
  }, [target]);

  return parts;
}
