import { createClient } from "@supabase/supabase-js";

// 환경변수(import.meta.env)는 이 파일에서만 읽습니다.
const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/**
 * 프로젝트 전체에서 함께 쓰는 Supabase 클라이언트입니다.
 * src/apis의 함수에서만 씁니다.
 * 환경변수가 없으면 null이며, 이때 apis 함수는 목 데이터로 동작합니다.
 */
export const supabase =
  url && publishableKey
    ? createClient(url, publishableKey, {
        // 소셜 로그인 후 돌아온 주소의 code를 세션으로 바꾸는 방식(PKCE)입니다.
        auth: { flowType: "pkce" },
      })
    : null;

/** 클라이언트에 없는 Supabase API(예: Auth 설정 조회)를 직접 부를 때 씁니다. */
export const supabaseConfig =
  url && publishableKey ? { url, publishableKey } : null;
