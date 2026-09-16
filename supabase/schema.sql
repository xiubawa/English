-- Run once in the project's SQL editor. Passwords are managed only by Supabase Auth.
create table if not exists public.learning_progress (
  user_id uuid primary key references auth.users(id) on delete cascade,
  revision bigint not null default 0 check (revision >= 0),
  state jsonb not null default '{}'::jsonb check (jsonb_typeof(state) = 'object'),
  updated_at timestamptz not null default now()
);
alter table public.learning_progress enable row level security;
revoke all on public.learning_progress from anon, authenticated;
grant select on public.learning_progress to authenticated;
create policy "Read own learning progress" on public.learning_progress
  for select to authenticated using ((select auth.uid()) = user_id);

-- Serialize writes and reject outdated revisions. The caller never supplies an owner ID.
create or replace function public.save_learning_progress(expected_revision bigint, new_state jsonb)
returns jsonb language plpgsql security definer set search_path = '' as $$
declare
  owner_id uuid := auth.uid();
  saved public.learning_progress%rowtype;
begin
  if owner_id is null then raise exception 'Authentication required' using errcode = '42501'; end if;
  if new_state is null or jsonb_typeof(new_state) <> 'object' or octet_length(new_state::text) > 2000000 then
    raise exception 'Invalid learning state' using errcode = '22023';
  end if;
  insert into public.learning_progress(user_id) values (owner_id) on conflict do nothing;
  select * into saved from public.learning_progress where user_id = owner_id for update;
  if expected_revision is null or saved.revision <> expected_revision then
    return jsonb_build_object('conflict', true, 'revision', saved.revision, 'state', saved.state);
  end if;
  update public.learning_progress set state = new_state, revision = revision + 1, updated_at = now()
    where user_id = owner_id returning * into saved;
  return jsonb_build_object('conflict', false, 'revision', saved.revision, 'state', saved.state);
end;
$$;
revoke all on function public.save_learning_progress(bigint, jsonb) from public, anon;
grant execute on function public.save_learning_progress(bigint, jsonb) to authenticated;
