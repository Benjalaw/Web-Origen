-- PASAPORTE ORIGEN: tablas, permisos y buckets de revisión
-- Ejecuta este archivo completo en Supabase > SQL Editor.
-- Las fotos quedan privadas hasta que una persona administradora las aprueba.

create table if not exists public.passport_visits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  place_id text not null,
  place_name text not null,
  photo_path text not null,
  public_photo_path text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  use_consent boolean not null default false,
  review_note text,
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewer_id uuid references auth.users(id) on delete set null
);

create unique index if not exists passport_one_active_stamp_per_place
  on public.passport_visits(user_id, place_id)
  where status in ('pending','approved');

alter table public.passport_visits enable row level security;

create or replace function public.is_origen_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

grant execute on function public.is_origen_admin() to authenticated;

drop policy if exists "passport read own" on public.passport_visits;
create policy "passport read own" on public.passport_visits
  for select to authenticated using (user_id = auth.uid());

drop policy if exists "passport admin read" on public.passport_visits;
create policy "passport admin read" on public.passport_visits
  for select to authenticated using (public.is_origen_admin());

drop policy if exists "passport public approved read" on public.passport_visits;
create policy "passport public approved read" on public.passport_visits
  for select to anon, authenticated using (status = 'approved');

drop policy if exists "passport owner submits pending" on public.passport_visits;
create policy "passport owner submits pending" on public.passport_visits
  for insert to authenticated
  with check (
    user_id = auth.uid()
    and status = 'pending'
    and use_consent = true
    and split_part(photo_path, '/', 1) = auth.uid()::text
  );

drop policy if exists "passport admin reviews" on public.passport_visits;
create policy "passport admin reviews" on public.passport_visits
  for update to authenticated
  using (public.is_origen_admin())
  with check (public.is_origen_admin());

drop policy if exists "passport owner removes pending" on public.passport_visits;
create policy "passport owner removes pending" on public.passport_visits
  for delete to authenticated
  using (user_id = auth.uid() and status = 'pending');

revoke all on public.passport_visits from anon, authenticated;
grant select (id, place_id, place_name, public_photo_path, created_at, status)
  on public.passport_visits to anon;
grant select, insert, update, delete on public.passport_visits to authenticated;

create or replace view public.passport_public_stamps
with (security_invoker = true)
as
  select id, place_id, place_name, public_photo_path, created_at
  from public.passport_visits
  where status = 'approved' and use_consent = true and public_photo_path is not null;

grant select on public.passport_public_stamps to anon, authenticated;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('passport-submissions', 'passport-submissions', false, 12582912, array['image/jpeg']),
  ('passport-gallery', 'passport-gallery', true, 12582912, array['image/jpeg'])
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "passport owner uploads private photo" on storage.objects;
create policy "passport owner uploads private photo" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'passport-submissions'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "passport owner views private photo" on storage.objects;
create policy "passport owner views private photo" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'passport-submissions'
    and (
      (storage.foldername(name))[1] = auth.uid()::text
      or public.is_origen_admin()
    )
  );

drop policy if exists "passport owner deletes private photo" on storage.objects;
create policy "passport owner deletes private photo" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'passport-submissions'
    and (
      (storage.foldername(name))[1] = auth.uid()::text
      or public.is_origen_admin()
    )
  );

drop policy if exists "passport admin publishes approved photo" on storage.objects;
create policy "passport admin publishes approved photo" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'passport-gallery'
    and public.is_origen_admin()
  );

drop policy if exists "passport admin updates gallery photo" on storage.objects;
create policy "passport admin updates gallery photo" on storage.objects
  for update to authenticated
  using (
    bucket_id = 'passport-gallery'
    and public.is_origen_admin()
  )
  with check (
    bucket_id = 'passport-gallery'
    and public.is_origen_admin()
  );

drop policy if exists "passport admin removes gallery photo" on storage.objects;
create policy "passport admin removes gallery photo" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'passport-gallery'
    and public.is_origen_admin()
  );

-- Tras ejecutar, asigna el rol de revisión a tu cuenta (reemplaza el correo):
-- update auth.users
-- set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
-- where email = 'TU_CORREO';
-- Cierra sesión y vuelve a entrar para que se actualice el permiso.
