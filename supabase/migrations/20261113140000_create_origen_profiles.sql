-- Migration version of the existing ORIGEN setup.sql.
-- Creates user profiles, row-level security policies, and the auth trigger.

-- ORIGEN: perfil público de cada usuario y preferencia de correos.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  display_name text,
  marketing_opt_in boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
for select using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
for insert with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
for update using (auth.uid() = id) with check (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id,email,display_name,marketing_opt_in)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name',''),
    coalesce((new.raw_user_meta_data->>'marketing_opt_in')::boolean,false)
  )
  on conflict (id) do update set
    email=excluded.email,
    display_name=excluded.display_name,
    marketing_opt_in=excluded.marketing_opt_in,
    updated_at=now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert or update of email, raw_user_meta_data on auth.users
for each row execute function public.handle_new_user();
