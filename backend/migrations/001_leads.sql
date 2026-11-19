-- Migration 001: Leads table for SHREEJAN AI SOLUTIONS
-- Stored leads received via website contact form.

create extension if not exists "pgcrypto";

create table if not exists leads (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    name text not null,
    business text not null,
    email text not null,
    phone text not null,
    city_state text,
    service text,
    plan text,
    budget text,
    asset_pack text,
    message text not null,
    preferred_language text,
    site_language text,
    consent boolean not null,
    consent_text_version text not null,
    consent_at timestamptz not null,
    utm_source text,
    utm_medium text,
    utm_campaign text,
    utm_content text,
    utm_term text,
    referrer text,
    landing_path text,
    status text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'won', 'lost')),
    notes text,
    notified_team boolean not null default false,
    auto_reply_sent boolean not null default false
);

-- Indexes for querying by submission date and status
create index if not exists idx_leads_created_at on leads (created_at desc);
create index if not exists idx_leads_status on leads (status);

-- Enable Row-Level Security (RLS)
-- With no public policies declared, anon users cannot read or write to this table.
-- Only the backend service key (service_role) bypasses RLS to insert and manage rows.
alter table leads enable row level security;

-- Grant privileges to service_role
grant all on table public.leads to service_role;
grant all on table public.leads to postgres;

