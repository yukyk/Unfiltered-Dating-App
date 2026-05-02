-- UNFILTERED Supabase Schema (Prototype)
-- This file contains the schema described in the project requirements.

-- Enable required extensions
create extension if not exists "uuid-ossp";
create extension if not exists pgcrypto;

-- USERS TABLE
create table if not exists users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  name text,
  age integer,
  city text,
  plan text default 'free',  -- 'free' | 'honest' | 'unfiltered'
  realness_score integer default 0,
  daily_swipes_remaining integer default 5,
  last_swipe_reset date default current_date,
  created_at timestamp default now()
);

-- PROFILES TABLE
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade not null,
  tagline text,
  layer1_photos text[],
  layer2_photos text[],
  layer3_photos text[],
  layer4_habits jsonb,
  layer5_opinions text[],
  layer6_wound text,
  layer7_ask text,
  updated_at timestamp default now()
);

-- ONBOARDING_ANSWERS TABLE
create table if not exists onboarding_answers (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references users(id) on delete cascade not null,
  q_state text,
  q_need text,
  q_past text,
  q_flaw text,
  q_dealbreaker text,
  created_at timestamp default now()
);

-- SWIPES TABLE
create table if not exists swipes (
  id uuid primary key default gen_random_uuid(),
  swiper_id uuid references users(id) not null,
  swiped_id uuid references users(id) not null,
  direction text, -- 'left' | 'right' | 'super'
  created_at timestamp default now()
);

-- MATCHES TABLE
create table if not exists matches (
  id uuid primary key default gen_random_uuid(),
  user1_id uuid references users(id) not null,
  user2_id uuid references users(id) not null,
  layers_revealed_1 integer[] default '{1}',
  layers_revealed_2 integer[] default '{1}',
  created_at timestamp default now()
);

-- MESSAGES TABLE
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  match_id uuid references matches(id) on delete cascade not null,
  sender_id uuid references users(id) not null,
  content text not null,
  created_at timestamp default now()
);

-- WAITLIST TABLE
create table if not exists waitlist (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  name text,
  plan_interest text,
  created_at timestamp default now()
);
