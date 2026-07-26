import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { seedAgenda, seedSpeakers } from '../data/agenda';
import type { AgendaSession, Speaker, Sponsor, NewsItem } from '../types';

/**
 * Cada hook intenta leer de Supabase; si la tabla está vacía o no configurada,
 * cae de vuelta a los datos semilla para que el sitio nunca se vea vacío.
 */

export function useAgenda() {
  const [data, setData] = useState<AgendaSession[]>(seedAgenda);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('agenda_sessions')
      .select('*')
      .order('order_index', { ascending: true })
      .then(({ data: rows, error }) => {
        if (!error && rows && rows.length > 0) setData(rows as AgendaSession[]);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}

export function useSpeakers() {
  const [data, setData] = useState<Speaker[]>(seedSpeakers as unknown as Speaker[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('speakers')
      .select('*')
      .order('order_index', { ascending: true })
      .then(({ data: rows, error }) => {
        if (!error && rows && rows.length > 0) setData(rows as Speaker[]);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}

export function useSponsors() {
  const [data, setData] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('sponsors')
      .select('*')
      .order('order_index', { ascending: true })
      .then(({ data: rows, error }) => {
        if (!error && rows) setData(rows as Sponsor[]);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}

export function useNews() {
  const [data, setData] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from('news')
      .select('*')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .then(({ data: rows, error }) => {
        if (!error && rows) setData(rows as NewsItem[]);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}
