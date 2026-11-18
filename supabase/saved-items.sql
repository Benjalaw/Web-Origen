-- ORIGEN: Favoritos, Mi Viaje y ajustes por usuario.
-- Ejecutar una sola vez en SQL Editor del proyecto Supabase.
-- El sitio ya puede sincronizar via Auth metadata si esta tabla aun no existe.

create table if not exists public.user_saved_items (
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null check (kind in ('favorites','trip','settings')),
  items jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id,kind)
);

alter table public.user_saved_items enable row level security;

drop policy if exists "user_saved_items_read_own" on public.user_saved_items;
create policy "user_saved_items_read_own" on public.user_saved_items
for select to authenticated
using ((select auth.uid())=user_id);

drop policy if exists "user_saved_items_insert_own" on public.user_saved_items;
create policy "user_saved_items_insert_own" on public.user_saved_items
for insert to authenticated
with check ((select auth.uid())=user_id);

drop policy if exists "user_saved_items_update_own" on public.user_saved_items;
create policy "user_saved_items_update_own" on public.user_saved_items
for update to authenticated
using ((select auth.uid())=user_id)
with check ((select auth.uid())=user_id);

drop policy if exists "user_saved_items_delete_own" on public.user_saved_items;
create policy "user_saved_items_delete_own" on public.user_saved_items
for delete to authenticated
using ((select auth.uid())=user_id);

grant select,insert,update,delete on public.user_saved_items to authenticated;
revoke all on public.user_saved_items from anon;
