-- 예시 화면(/examples/matches)이 쓰는 테이블입니다.
-- Supabase 대시보드 > SQL Editor에 붙여 넣고 실행하면 됩니다.

create table public.example_matches (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  court_name text not null,
  match_date date not null,
  level text not null,
  created_at timestamptz not null default now()
);

-- RLS(행 단위 접근 권한)를 켜고, 누가 무엇을 할 수 있는지 정책으로 정합니다.
-- RLS를 켜고 정책을 만들지 않으면 조회 결과가 오류 없이 빈 목록으로 옵니다.
alter table public.example_matches enable row level security;

-- 프로토타입용 정책: 로그인하지 않은 사용자도 조회와 추가를 할 수 있습니다.
-- 실제 개인정보를 저장하는 테이블에는 이 정책을 그대로 쓰지 않습니다.
create policy "누구나 조회" on public.example_matches
  for select to anon, authenticated
  using (true);

create policy "누구나 추가" on public.example_matches
  for insert to anon, authenticated
  with check (true);
