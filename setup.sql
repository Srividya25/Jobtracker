-- ============================================================
-- JobTracker — Supabase Backend Setup
--
-- HOW TO RUN: open the Supabase SQL Editor and paste the
-- ENTIRE file in, then click RUN. That's it.
--
-- This script is safe to re-run: every policy is dropped first,
-- and tables use "if not exists".
-- ============================================================




-- ============================================================
-- PART A — TABLES
-- ============================================================


-- 1. RESUMES TABLE
-- Stores metadata about uploaded resume PDFs.
-- Each resume belongs to a user (via auth.uid()).
create table if not exists public.resumes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  file_name text not null,            -- original filename (e.g., "resume_v2.pdf")
  file_path text not null,            -- storage path (e.g., "user_id/uuid.pdf")
  uploaded_at timestamptz default now()
);


-- 2. APPLICATIONS TABLE
-- Stores each job application with a link to the resume used.
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  company text not null,
  job_title text not null,
  job_url text,
  job_description text,
  status text default 'Applied',
  applied_date date default now(),
  resume_id uuid references public.resumes(id) on delete set null,
  notes text,
  follow_up_date date,
  interview_date timestamptz,
  interview_location text,
  created_at timestamptz default now()
);




-- ============================================================
-- PART B — GRANT BASE PERMISSIONS (required before RLS)
-- ============================================================

grant usage on schema public to anon, authenticated;
grant all on public.resumes to anon, authenticated;
grant all on public.applications to anon, authenticated;

-- ============================================================
-- PART C — ROW-LEVEL SECURITY (tables)
-- ============================================================


-- Turn RLS on for both tables.
alter table public.resumes enable row level security;
alter table public.applications enable row level security;


-- ---------- RESUMES policies ----------


drop policy if exists "Users can view own resumes" on public.resumes;
create policy "Users can view own resumes"
  on public.resumes for select
  using (auth.uid() = user_id);


drop policy if exists "Users can insert own resumes" on public.resumes;
create policy "Users can insert own resumes"
  on public.resumes for insert
  with check (auth.uid() = user_id);


drop policy if exists "Users can update own resumes" on public.resumes;
create policy "Users can update own resumes"
  on public.resumes for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


drop policy if exists "Users can delete own resumes" on public.resumes;
create policy "Users can delete own resumes"
  on public.resumes for delete
  using (auth.uid() = user_id);


-- ---------- APPLICATIONS policies ----------


drop policy if exists "Users can view own applications" on public.applications;
create policy "Users can view own applications"
  on public.applications for select
  using (auth.uid() = user_id);


drop policy if exists "Users can insert own applications" on public.applications;
create policy "Users can insert own applications"
  on public.applications for insert
  with check (auth.uid() = user_id);


drop policy if exists "Users can update own applications" on public.applications;
create policy "Users can update own applications"
  on public.applications for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);


drop policy if exists "Users can delete own applications" on public.applications;
create policy "Users can delete own applications"
  on public.applications for delete
  using (auth.uid() = user_id);




-- ============================================================
-- PART D — STORAGE POLICIES
--
-- First create the "resumes" bucket (private, Public = OFF),
-- then the policies below guard it.
--
-- Files are organized under a folder named after the user's id,
-- e.g. "<user_id>/<uuid>.pdf". The (storage.foldername(name))[1]
-- expression pulls out that first folder and checks it matches
-- the logged-in user.
-- ============================================================


-- Create the private "resumes" bucket (skips if it already exists).
insert into storage.buckets (id, name, public)
values ('resumes', 'resumes', false)
on conflict (id) do nothing;


drop policy if exists "Users can upload own resume files" on storage.objects;
create policy "Users can upload own resume files"
  on storage.objects for insert
  with check (
    bucket_id = 'resumes'
    and (storage.foldername(name))[1] = auth.uid()::text
  );


drop policy if exists "Users can view own resume files" on storage.objects;
create policy "Users can view own resume files"
  on storage.objects for select
  using (
    bucket_id = 'resumes'
    and (storage.foldername(name))[1] = auth.uid()::text
  );


drop policy if exists "Users can update own resume files" on storage.objects;
create policy "Users can update own resume files"
  on storage.objects for update
  using (
    bucket_id = 'resumes'
    and (storage.foldername(name))[1] = auth.uid()::text
  );


drop policy if exists "Users can delete own resume files" on storage.objects;
create policy "Users can delete own resume files"
  on storage.objects for delete
  using (
    bucket_id = 'resumes'
    and (storage.foldername(name))[1] = auth.uid()::text
  );