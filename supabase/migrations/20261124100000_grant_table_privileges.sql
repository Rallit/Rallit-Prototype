-- 화면(브라우저)에서 테이블을 읽고 쓸 수 있게 권한을 줍니다.
-- 최근에 만든 Supabase 프로젝트는 테이블을 만들어도 이 권한을 자동으로 주지 않습니다.
-- 권한이 없으면 화면에서 "permission denied for table" 오류(401)가 납니다.
-- 어떤 행을 볼 수 있는지는 각 테이블의 RLS 정책이 정합니다.

-- 예시 매치: 로그인하지 않은 사용자도 조회와 추가를 할 수 있습니다.
grant select, insert on public.example_matches to anon, authenticated;

-- 프로필: 로그인한 사용자가 본인 행을 조회하고 수정합니다.
-- 행을 만드는 일은 가입 트리거(handle_new_user)가 하므로 insert 권한은 주지 않습니다.
grant select, update on public.profiles to authenticated;
