import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const publishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

/**
 * 프로젝트 전체에서 함께 쓰는 Supabase 클라이언트입니다.
 * 환경변수가 없으면 null이며, 이때 각 feature의 api.ts는 목 데이터를 씁니다.
 */
export const supabase =
  url && publishableKey ? createClient(url, publishableKey) : null;

export const isSupabaseConfigured = supabase !== null;
