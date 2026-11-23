import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/**
 * 프로젝트 전체에서 함께 쓰는 Supabase 클라이언트입니다.
 * src/apis의 함수에서만 씁니다.
 * 환경변수가 없으면 null이며, 이때 apis 함수는 목 데이터로 동작합니다.
 */
export const supabase =
  url && publishableKey ? createClient(url, publishableKey) : null;
