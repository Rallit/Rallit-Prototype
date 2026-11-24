import { supabase } from "@/lib/supabase";

/**
 * Supabase가 연결되어 있는지 알려 줍니다.
 * false이면 모든 apis 함수가 목 데이터로 동작하므로, 화면에서 안내 문구를 보여 줄 때 씁니다.
 */
export const isSupabaseConnected = supabase !== null;
