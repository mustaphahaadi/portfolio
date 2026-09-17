-- ====================================================================
-- SUPABASE PG_CRON DATABASE KEEP-ALIVE SCRIPT
-- ====================================================================
-- Optional in-database SQL scheduled ping to prevent Supabase auto-pause.
-- Run this in Supabase SQL Editor (Database -> Extensions -> enable pg_cron first).

-- 1. Enable pg_cron and pg_net extensions
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- 2. Schedule a daily SELECT query to touch the profile table at 00:00 & 12:00 UTC
SELECT cron.schedule(
    'keep-alive-supabase-ping',
    '0 0,12 * * *',
    $$ SELECT count(*) FROM public.profile; $$
);
