import { supabase } from "@/lib/supabase";
import { exampleMatchesMock } from "./mock";
import type { ExampleMatch, NewExampleMatch } from "./types";

// 화면은 이 파일의 함수만 부릅니다.
// Supabase가 연결되지 않았으면 목 데이터로 동작하고, 새로고침하면 추가한 데이터가 사라집니다.

const TABLE = "example_matches";

let mockMatches = [...exampleMatchesMock];

function byMatchDate(a: ExampleMatch, b: ExampleMatch) {
  return a.match_date.localeCompare(b.match_date);
}

export async function listExampleMatches(): Promise<ExampleMatch[]> {
  if (!supabase) return [...mockMatches].sort(byMatchDate);

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("match_date", { ascending: true });
  if (error) throw error;
  return data;
}

export async function createExampleMatch(
  input: NewExampleMatch,
): Promise<ExampleMatch> {
  if (!supabase) {
    const match: ExampleMatch = {
      ...input,
      id: crypto.randomUUID(),
      created_at: new Date().toISOString(),
    };
    mockMatches = [...mockMatches, match];
    return match;
  }

  const { data, error } = await supabase
    .from(TABLE)
    .insert(input)
    .select()
    .single();
  if (error) throw error;
  return data;
}
