-- ═══════════════════════════════════════════════════════════════
-- CONECTOMA | IngenIA 2026 — Esquema de base de datos (Supabase)
-- Ejecuta este script completo en: Supabase → SQL Editor → New query
-- ═══════════════════════════════════════════════════════════════

-- ── Extensión para generar UUIDs ──
create extension if not exists "pgcrypto";

-- ── TABLA: profiles (roles de administración) ──
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  full_name text,
  role text not null default 'editor' check (role in ('admin', 'editor', 'viewer')),
  created_at timestamptz default now()
);

-- Crea automáticamente un perfil cuando se registra un nuevo usuario
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, role)
  values (new.id, new.email, 'editor');
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ── TABLA: agenda_sessions ──
create table if not exists agenda_sessions (
  id text primary key default gen_random_uuid()::text,
  day int not null check (day in (1, 2)),
  modality text not null check (modality in ('presencial', 'virtual')),
  start_time text not null,
  end_time text not null,
  title text not null,
  subtitle text,
  location text,
  track text not null default 'general',
  kind text not null default 'plenaria',
  order_index int not null default 0
);

-- ── TABLA: speakers ──
create table if not exists speakers (
  id text primary key default gen_random_uuid()::text,
  role text not null,
  name text not null,
  bio text,
  photo_url text,
  track text not null default 'general',
  day int check (day in (1, 2)),
  linkedin_url text,
  order_index int not null default 0
);

-- ── TABLA: sponsors ──
create table if not exists sponsors (
  id text primary key default gen_random_uuid()::text,
  name text not null,
  logo_url text,
  website_url text,
  tier text not null default 'aliado' check (tier in ('platino', 'oro', 'plata', 'aliado')),
  order_index int not null default 0
);

-- ── TABLA: news ──
create table if not exists news (
  id text primary key default gen_random_uuid()::text,
  title text not null,
  summary text not null,
  content text,
  cover_image_url text,
  published_at timestamptz not null default now(),
  published boolean not null default false
);

-- ── TABLA: submissions (artículos y pósters) ──
create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  type text not null check (type in ('articulo', 'poster')),
  title text not null,
  authors text not null,
  faculty text not null,
  track text not null,
  abstract text not null,
  file_url text,
  contact_email text not null,
  contact_phone text,
  status text not null default 'recibido' check (status in ('recibido', 'en_revision', 'aceptado', 'rechazado')),
  created_at timestamptz not null default now()
);

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY (RLS)
-- Lectura pública para contenido del sitio; escritura solo admin/editor
-- ═══════════════════════════════════════════════════════════════

alter table profiles enable row level security;
alter table agenda_sessions enable row level security;
alter table speakers enable row level security;
alter table sponsors enable row level security;
alter table news enable row level security;
alter table submissions enable row level security;

-- profiles: cada usuario ve/edita solo su propio perfil
create policy "profiles_select_own" on profiles for select using (auth.uid() = id);
create policy "profiles_update_own" on profiles for update using (auth.uid() = id);

-- Función helper: ¿el usuario autenticado es admin o editor?
create or replace function public.is_editor()
returns boolean as $$
  select exists (
    select 1 from profiles
    where id = auth.uid() and role in ('admin', 'editor')
  );
$$ language sql security definer stable;

-- agenda_sessions: lectura pública, escritura solo editores
create policy "agenda_public_read" on agenda_sessions for select using (true);
create policy "agenda_editor_write" on agenda_sessions for all using (public.is_editor()) with check (public.is_editor());

-- speakers: lectura pública, escritura solo editores
create policy "speakers_public_read" on speakers for select using (true);
create policy "speakers_editor_write" on speakers for all using (public.is_editor()) with check (public.is_editor());

-- sponsors: lectura pública, escritura solo editores
create policy "sponsors_public_read" on sponsors for select using (true);
create policy "sponsors_editor_write" on sponsors for all using (public.is_editor()) with check (public.is_editor());

-- news: lectura pública solo de lo publicado; editores ven/editan todo
create policy "news_public_read" on news for select using (published = true or public.is_editor());
create policy "news_editor_write" on news for all using (public.is_editor()) with check (public.is_editor());

-- submissions: cualquiera puede insertar (postular); solo editores pueden leer/editar/borrar
create policy "submissions_public_insert" on submissions for insert with check (true);
create policy "submissions_editor_read" on submissions for select using (public.is_editor());
create policy "submissions_editor_write" on submissions for update using (public.is_editor());
create policy "submissions_editor_delete" on submissions for delete using (public.is_editor());

-- ═══════════════════════════════════════════════════════════════
-- STORAGE: bucket para los archivos de artículos y pósters
-- Permite que cualquier visitante suba su documento desde el
-- formulario público de /convocatoria, sin necesidad de iniciar sesión.
-- ═══════════════════════════════════════════════════════════════

insert into storage.buckets (id, name, public, file_size_limit)
values ('submissions', 'submissions', true, 15728640) -- 15 MB
on conflict (id) do nothing;

-- Cualquiera puede subir un archivo nuevo al bucket "submissions"
create policy "submissions_bucket_public_upload"
  on storage.objects for insert
  with check (bucket_id = 'submissions');

-- El archivo es público para lectura (así el enlace funciona sin login,
-- tanto para el comité como para quien postuló)
create policy "submissions_bucket_public_read"
  on storage.objects for select
  using (bucket_id = 'submissions');

-- Solo editores/admin pueden borrar archivos subidos
create policy "submissions_bucket_editor_delete"
  on storage.objects for delete
  using (bucket_id = 'submissions' and public.is_editor());

-- ═══════════════════════════════════════════════════════════════
-- Después de correr este script:
-- 1. Ve a Authentication → Users → "Add user" y crea tu primer usuario admin.
-- 2. Ve a Table Editor → profiles, busca ese usuario y cambia su "role" a 'admin'.
-- 3. Ya puedes iniciar sesión en /admin con ese correo y contraseña.
-- ═══════════════════════════════════════════════════════════════
