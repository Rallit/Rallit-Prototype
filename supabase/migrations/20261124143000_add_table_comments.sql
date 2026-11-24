-- 테이블 설명을 남깁니다. Supabase 대시보드의 Table Editor에서 보입니다.
-- 데이터와 권한은 바꾸지 않습니다.
comment on table public.example_matches is '데이터 읽고 쓰기 연습용 예시 매치. 실제 기획 화면이 아니며 개인정보가 없습니다.';
comment on table public.profiles is '회원 프로필. 가입 시 handle_new_user 트리거가 만들고, 온보딩에서 채웁니다. 본인 행만 조회·수정할 수 있습니다.';
