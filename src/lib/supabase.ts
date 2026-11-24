import { createClient } from "@supabase/supabase-js";

// 환경변수(import.meta.env)는 이 파일에서만 읽습니다.
const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/**
 * 실제 사용자가 쓰는 운영 Supabase 프로젝트(rallit-prototype)의 주소입니다.
 * 로컬 개발(npm run dev)에서는 운영 DB에 연결하지 않습니다.
 * 시험 데이터가 실제 사용자 데이터에 섞이지 않게 하기 위해서입니다.
 */
const PRODUCTION_SUPABASE_URL = "https://mjylcjzyslrwzdrxxfhl.supabase.co";

if (import.meta.env.DEV && url === PRODUCTION_SUPABASE_URL) {
  const message =
    "로컬 개발에서는 운영 DB에 연결하지 않습니다. .env.local의 값을 .env.example의 실험용 DB 값으로 바꾼 뒤 개발 서버를 다시 실행하세요.";
  // 앱이 뜨기 전에 멈추므로, 빈 화면 대신 안내 문구를 보여 줍니다.
  document.body.textContent = message;
  throw new Error(message);
}

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
