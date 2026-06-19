-- Weekly digests
create table if not exists digests (
  id uuid default gen_random_uuid() primary key,
  week_number integer not null,
  year integer not null,
  generated_at timestamptz default now(),
  is_published boolean default true
);

-- Articles per digest
create table if not exists articles (
  id uuid default gen_random_uuid() primary key,
  digest_id uuid references digests(id) on delete cascade,
  sector text not null,
  is_featured boolean default false,
  headline text not null,
  source text,
  url text,
  excerpt text,
  article_date date
);

-- Cahier des tendances entries
create table if not exists tendances (
  id uuid default gen_random_uuid() primary key,
  digest_id uuid references digests(id) on delete cascade,
  sector text not null,
  project_name text not null,
  studio text,
  description text,
  url text,
  image_url text
);

-- Team bookmarks
create table if not exists bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_email text not null,
  article_id uuid references articles(id) on delete cascade,
  saved_at timestamptz default now(),
  unique(user_email, article_id)
);

-- Indexes
create index if not exists articles_digest_id_idx on articles(digest_id);
create index if not exists articles_sector_idx on articles(sector);
create index if not exists tendances_digest_id_idx on tendances(digest_id);
create index if not exists bookmarks_user_email_idx on bookmarks(user_email);

-- Enable RLS
alter table digests enable row level security;
alter table articles enable row level security;
alter table tendances enable row level security;
alter table bookmarks enable row level security;

-- Public read for digests, articles, tendances
create policy "Public read digests" on digests for select using (is_published = true);
create policy "Public read articles" on articles for select using (true);
create policy "Public read tendances" on tendances for select using (true);

-- Bookmarks: users manage their own
create policy "Users read own bookmarks" on bookmarks for select using (user_email = current_user);
create policy "Users insert own bookmarks" on bookmarks for insert with check (user_email = current_user);
create policy "Users delete own bookmarks" on bookmarks for delete using (user_email = current_user);
