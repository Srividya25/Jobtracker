-- ============================================================
-- JobTracker — Phase 6 migration
-- Run this in Supabase SQL Editor (replaces the old applications table def).
-- Adds: notes, follow_up_date, interview_date, interview_location
-- ============================================================

alter table public.applications add column if not exists notes text;
alter table public.applications add column if not exists follow_up_date date;
alter table public.applications add column if not exists interview_date timestamptz;
alter table public.applications add column if not exists interview_location text;
