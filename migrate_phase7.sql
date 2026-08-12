-- ============================================================
-- JobTracker — Phase 7 migration
-- Run this in Supabase SQL Editor.
-- Adds: screening_date (for the Pipeline drag-to-screening feature)
-- ============================================================

alter table public.applications add column if not exists screening_date timestamptz;
