-- Uneek Designs — Supabase schema
-- Mirrors the PRD data model (section 8) and the shapes used in /content.
-- Run in the Supabase SQL editor, then set the env vars listed in README.md.

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table if not exists categories (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  slug        text not null unique,
  tagline     text,
  blurb       text,
  cover_url   text,
  art         text default 'grid',          -- fallback cover when no photo
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists projects (
  id           uuid primary key default gen_random_uuid(),
  category_id  uuid references categories(id) on delete set null,
  title        text not null,
  slug         text not null unique,
  client       text,
  tagline      text,
  description  text,
  cover_url    text,
  external_url text,
  deliverables text[] default '{}',
  year         int,
  art          text default 'type',
  featured     boolean not null default false,
  sort_order   int not null default 0,
  created_at   timestamptz not null default now()
);

create table if not exists web_projects (
  id          uuid primary key default gen_random_uuid(),
  title       text not null,
  slug        text not null unique,
  description text,
  cover_url   text,
  live_url    text,
  tech        text[] default '{}',
  year        int,
  featured    boolean not null default false,
  sort_order  int not null default 0,
  created_at  timestamptz not null default now()
);

create table if not exists services (
  id                uuid primary key default gen_random_uuid(),
  name              text not null,
  slug              text not null unique,
  summary           text,
  price             text,
  cadence           text,
  includes          text[] default '{}',
  whatsapp_template text not null,
  featured          boolean not null default false,
  badge             text,
  sort_order        int not null default 0
);

create table if not exists posts (
  id           uuid primary key default gen_random_uuid(),
  title        text not null,
  slug         text not null unique,
  excerpt      text,
  cover_url    text,
  body         text,                        -- markdown
  tags         text[] default '{}',
  status       text not null default 'draft' check (status in ('draft', 'published')),
  art          text default 'poster',
  published_at timestamptz,
  seo_title    text,
  seo_desc     text,
  created_at   timestamptz not null default now()
);

create table if not exists settings (
  id             int primary key default 1 check (id = 1),
  whatsapp_number text,
  phone          text,
  email          text,
  google_drive_url text,
  social_links   jsonb default '{}'::jsonb,
  updated_at     timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Row level security: public read, admin-only write
-- ---------------------------------------------------------------------------
alter table categories  enable row level security;
alter table projects    enable row level security;
alter table web_projects enable row level security;
alter table services    enable row level security;
alter table posts       enable row level security;
alter table settings    enable row level security;

-- Read policies. Draft posts stay hidden from the public.
create policy "public read categories"  on categories  for select using (true);
create policy "public read projects"    on projects    for select using (true);
create policy "public read web"         on web_projects for select using (true);
create policy "public read services"    on services    for select using (true);
create policy "public read posts"       on posts       for select using (status = 'published');
create policy "public read settings"    on settings    for select using (true);

-- Write policies: any authenticated user is the admin (single-owner studio).
-- Tighten to `auth.uid() = 'YOUR-ADMIN-UUID'` once the admin account exists.
create policy "admin write categories" on categories  for all to authenticated using (true) with check (true);
create policy "admin write projects"   on projects    for all to authenticated using (true) with check (true);
create policy "admin write web"        on web_projects for all to authenticated using (true) with check (true);
create policy "admin write services"   on services    for all to authenticated using (true) with check (true);
create policy "admin write posts"      on posts       for all to authenticated using (true) with check (true);
create policy "admin write settings"   on settings    for all to authenticated using (true) with check (true);

-- ---------------------------------------------------------------------------
-- Seed the studio settings row
-- ---------------------------------------------------------------------------
insert into settings (id, whatsapp_number, phone, email, google_drive_url)
values (1, '2348100000000', '+2348100000000', 'hello@uneekdesigns.com', 'https://drive.google.com/')
on conflict (id) do nothing;
