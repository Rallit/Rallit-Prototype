-- 로그인·온보딩 화면(/login, /onboarding)이 쓰는 사용자 프로필 테이블입니다.
-- Supabase 대시보드 > SQL Editor에 붙여 넣고 실행하면 됩니다.
-- 소셜 로그인 계정 자체(이메일 등)는 Supabase가 auth.users에 따로 저장합니다.

create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  nickname text not null unique
    check (nickname ~ '^[가-힣A-Za-z0-9]{2,12}$'),
  -- 소셜 계정의 이름입니다. 온보딩 소개 화면의 "OO님"에 씁니다.
  social_display_name text,
  -- 온보딩 1단계: 기본프로필
  gender text check (gender in ('MALE', 'FEMALE')),
  age_group text check (
    age_group in (
      'TEENS', 'TWENTIES', 'THIRTIES', 'FORTIES', 'FIFTIES', 'SIXTIES_OR_OLDER'
    )
  ),
  -- 온보딩 2단계: 실력. 테니스 시작 연월은 그 달 1일로 저장합니다.
  tennis_started_on date,
  ntrp text check (ntrp in ('1.0', '1.5', '2.0', '2.5', '3.0', '3.5', '4.0+')),
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS(행 단위 접근 권한)를 켜고, 로그인한 본인 행만 보고 고칠 수 있게 합니다.
-- RLS를 켜고 정책을 만들지 않으면 조회 결과가 오류 없이 빈 목록으로 옵니다.
alter table public.profiles enable row level security;

create policy "본인 프로필 조회" on public.profiles
  for select to authenticated
  using ((select auth.uid()) = id);

create policy "본인 프로필 수정" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- 회원가입: 소셜 로그인으로 처음 들어온 사용자에게 프로필 행을 자동으로 만듭니다.
-- 기본 닉네임은 "테니스곰" + 숫자이고, 온보딩 1단계에서 바꿀 수 있습니다.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  candidate text;
  attempt int := 0;
begin
  loop
    attempt := attempt + 1;
    if attempt <= 5 then
      candidate := '테니스곰' || floor(random() * 900 + 100)::int;
    else
      candidate := '테니스곰' || substr(replace(new.id::text, '-', ''), 1, 8);
    end if;

    begin
      insert into public.profiles (id, nickname, social_display_name)
      values (
        new.id,
        candidate,
        coalesce(
          new.raw_user_meta_data ->> 'full_name',
          new.raw_user_meta_data ->> 'name',
          new.raw_user_meta_data ->> 'nickname'
        )
      );
      return new;
    exception when unique_violation then
      -- 닉네임이 겹치면 다른 숫자로 다시 시도합니다.
      if attempt > 5 then
        raise;
      end if;
    end;
  end loop;
end;
$$;

revoke execute on function public.handle_new_user() from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 닉네임 중복 확인: 다른 사람의 프로필은 RLS로 볼 수 없으므로 함수로 확인합니다.
-- 본인이 지금 쓰는 닉네임은 사용 가능으로 봅니다.
-- 사용 가능 여부(true/false)만 돌려주므로, 보안 점검(Advisors)의
-- "Signed-In Users Can Execute SECURITY DEFINER Function" 경고는 의도한 것입니다.
create function public.is_nickname_available(nickname text)
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select not exists (
    select 1
    from public.profiles p
    where p.nickname = is_nickname_available.nickname
      and p.id <> (select auth.uid())
  );
$$;

revoke execute on function public.is_nickname_available(text) from public, anon;
grant execute on function public.is_nickname_available(text) to authenticated;
