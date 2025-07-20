-- Enable necessary extensions
create extension if not exists "uuid-ossp";

-- Custom types
create type wedding_style as enum ('modern', 'rustic', 'classic', 'boho', 'vintage', 'outdoor', 'industrial');
create type rsvp_status as enum ('pending', 'confirmed', 'declined', 'maybe');
create type task_priority as enum ('low', 'medium', 'high', 'critical');
create type venue_type as enum ('indoor', 'outdoor', 'destination', 'mixed');

-- Profiles table (extends auth.users)
create table profiles (
  id uuid references auth.users on delete cascade primary key,
  email text unique not null,
  full_name text,
  avatar_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Weddings table
create table weddings (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  partner_user_id uuid references auth.users on delete set null,
  wedding_date date,
  venue_name text,
  venue_address text,
  guest_count integer default 0,
  budget decimal(12,2),
  style wedding_style,
  theme_colors jsonb,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Budget calculations
create table budget_calculations (
  id uuid default uuid_generate_v4() primary key,
  wedding_id uuid references weddings on delete cascade,
  user_id uuid references auth.users on delete cascade,
  session_id text, -- for anonymous users
  input_data jsonb not null,
  total_budget decimal(12,2),
  category_breakdown jsonb,
  ai_recommendations jsonb,
  regional_factors jsonb,
  confidence_score decimal(3,2),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Timeline generations
create table timelines (
  id uuid default uuid_generate_v4() primary key,
  wedding_id uuid references weddings on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  input_data jsonb not null,
  generated_timeline jsonb,
  ai_recommendations jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Timeline tasks
create table timeline_tasks (
  id uuid default uuid_generate_v4() primary key,
  timeline_id uuid references timelines on delete cascade not null,
  wedding_id uuid references weddings on delete cascade not null,
  task_name text not null,
  description text,
  category text,
  due_date date not null,
  estimated_duration integer, -- hours
  priority task_priority default 'medium',
  dependencies uuid[],
  is_completed boolean default false,
  assigned_to uuid references auth.users,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Guests
create table guests (
  id uuid default uuid_generate_v4() primary key,
  wedding_id uuid references weddings on delete cascade not null,
  first_name text not null,
  last_name text,
  email text,
  phone text,
  address text,
  relationship text,
  side text check (side in ('bride', 'groom', 'both')),
  rsvp_status rsvp_status default 'pending',
  rsvp_date timestamp with time zone,
  plus_one_allowed boolean default false,
  plus_one_name text,
  plus_one_rsvp rsvp_status,
  dietary_restrictions text[],
  special_requirements text,
  accommodation_needed boolean default false,
  table_assignment integer,
  seat_assignment text,
  invitation_sent boolean default false,
  invitation_sent_at timestamp with time zone,
  thank_you_sent boolean default false,
  notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Venue analyses
create table venue_analyses (
  id uuid default uuid_generate_v4() primary key,
  wedding_id uuid references weddings on delete cascade,
  user_id uuid references auth.users on delete cascade,
  session_id text, -- for anonymous users
  venue_name text,
  image_urls text[],
  analysis_results jsonb,
  compatibility_score decimal(3,2),
  ai_recommendations jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Stress assessments
create table stress_assessments (
  id uuid default uuid_generate_v4() primary key,
  wedding_id uuid references weddings on delete cascade,
  user_id uuid references auth.users on delete cascade not null,
  stress_level integer check (stress_level between 1 and 10),
  stress_factors text[],
  mood_rating integer check (mood_rating between 1 and 5),
  sleep_quality integer check (sleep_quality between 1 and 5),
  exercise_frequency integer check (exercise_frequency between 1 and 5),
  support_system_rating integer check (support_system_rating between 1 and 5),
  planning_enjoyment integer check (planning_enjoyment between 1 and 5),
  overwhelm_factors jsonb,
  coping_strategies text[],
  notes text,
  ai_recommendations jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Email captures (for lead generation)
create table email_captures (
  id uuid default uuid_generate_v4() primary key,
  email text not null,
  source text not null, -- which tool/page
  capture_data jsonb,
  consent_marketing boolean default false,
  converted_to_signup boolean default false,
  user_id uuid references auth.users on delete set null, -- set when they sign up
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Tool sessions (analytics)
create table tool_sessions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade,
  session_id text not null,
  tool_name text not null,
  session_data jsonb,
  started_at timestamp with time zone default timezone('utc'::text, now()) not null,
  completed_at timestamp with time zone,
  completion_percentage decimal(5,2)
);

-- Enable RLS on all tables
alter table profiles enable row level security;
alter table weddings enable row level security;
alter table budget_calculations enable row level security;
alter table timelines enable row level security;
alter table timeline_tasks enable row level security;
alter table guests enable row level security;
alter table venue_analyses enable row level security;
alter table stress_assessments enable row level security;
alter table email_captures enable row level security;
alter table tool_sessions enable row level security;

-- Profiles policies
create policy "Users can view own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- Weddings policies
create policy "Users can view own weddings" on weddings for select using (auth.uid() = user_id or auth.uid() = partner_user_id);
create policy "Users can create own weddings" on weddings for insert with check (auth.uid() = user_id);
create policy "Users can update own weddings" on weddings for update using (auth.uid() = user_id or auth.uid() = partner_user_id);

-- Budget calculations policies
create policy "Users can view own calculations" on budget_calculations for select using (auth.uid() = user_id);
create policy "Users can create calculations" on budget_calculations for insert with check (auth.uid() = user_id or user_id is null);

-- Timeline policies
create policy "Users can view own timelines" on timelines for select using (auth.uid() = user_id);
create policy "Users can create timelines" on timelines for insert with check (auth.uid() = user_id);
create policy "Users can update timelines" on timelines for update using (auth.uid() = user_id);

-- Timeline tasks policies
create policy "Users can view own timeline tasks" on timeline_tasks for select using (auth.uid() = user_id);
create policy "Users can create timeline tasks" on timeline_tasks for insert with check (auth.uid() = user_id);
create policy "Users can update timeline tasks" on timeline_tasks for update using (auth.uid() = user_id);

-- Guests policies
create policy "Users can view own guests" on guests for select using (auth.uid() = user_id);
create policy "Users can create guests" on guests for insert with check (auth.uid() = user_id);
create policy "Users can update guests" on guests for update using (auth.uid() = user_id);
create policy "Users can delete guests" on guests for delete using (auth.uid() = user_id);

-- Venue analyses policies
create policy "Users can view own venue analyses" on venue_analyses for select using (auth.uid() = user_id);
create policy "Users can create venue analyses" on venue_analyses for insert with check (auth.uid() = user_id or user_id is null);

-- Stress assessments policies
create policy "Users can view own stress assessments" on stress_assessments for select using (auth.uid() = user_id);
create policy "Users can create stress assessments" on stress_assessments for insert with check (auth.uid() = user_id);

-- Email captures policies (allow anonymous access for lead generation)
create policy "Anyone can create email captures" on email_captures for insert with check (true);
create policy "Users can view own email captures" on email_captures for select using (auth.uid() = user_id);

-- Tool sessions policies
create policy "Users can view own tool sessions" on tool_sessions for select using (auth.uid() = user_id);
create policy "Users can create tool sessions" on tool_sessions for insert with check (auth.uid() = user_id or user_id is null);

-- Create indexes for better performance
create index idx_weddings_user_id on weddings(user_id);
create index idx_weddings_partner_user_id on weddings(partner_user_id);
create index idx_budget_calculations_user_id on budget_calculations(user_id);
create index idx_budget_calculations_session_id on budget_calculations(session_id);
create index idx_timelines_wedding_id on timelines(wedding_id);
create index idx_timeline_tasks_wedding_id on timeline_tasks(wedding_id);
create index idx_timeline_tasks_due_date on timeline_tasks(due_date);
create index idx_guests_wedding_id on guests(wedding_id);
create index idx_guests_rsvp_status on guests(rsvp_status);
create index idx_venue_analyses_user_id on venue_analyses(user_id);
create index idx_stress_assessments_user_id on stress_assessments(user_id);
create index idx_email_captures_email on email_captures(email);
create index idx_tool_sessions_user_id on tool_sessions(user_id);
create index idx_tool_sessions_session_id on tool_sessions(session_id);

-- Create functions for automatic updated_at timestamps
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create triggers for updated_at
create trigger update_profiles_updated_at before update on profiles
  for each row execute function update_updated_at_column();

create trigger update_weddings_updated_at before update on weddings
  for each row execute function update_updated_at_column(); 