import { supabase } from "@/lib/supabase";
import { exampleMatchesMock } from "@/mocks/exampleMatches";
import type { ExampleMatch, NewExampleMatch } from "./exampleMatches.types";

// 화면은 이 파일의 함수만 부릅니다.
// Supabase가 연결되지 않았으면 목 데이터로 동작하고, 새로고침하면 추가한 데이터가 사라집니다.

const TABLE = "example_matches";

/** example_matches 테이블의 한 행입니다. 컬럼 이름은 DB 그대로 snake_case입니다. */
type ExampleMatchRow = {
  id: string;
  title: string;
  court_name: string;
  match_date: string;
  level: string;
  created_at: string;
};

function toExampleMatch(row: ExampleMatchRow): ExampleMatch {
  return {
    id: row.id,
    title: row.title,
    courtName: row.court_name,
    matchDate: row.match_date,
    level: row.level,
    createdAt: row.created_at,
  };
}

let mockMatches = [...exampleMatchesMock];

function byMatchDate(a: ExampleMatch, b: ExampleMatch) {
  return a.matchDate.localeCompare(b.matchDate);
}

export async function listExampleMatches(): Promise<ExampleMatch[]> {
  if (!supabase) return [...mockMatches].sort(byMatchDate);

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("match_date", { ascending: true });
  if (error) throw error;
  return (data as ExampleMatchRow[]).map(toExampleMatch);
}

export async function createExampleMatch(
  input: NewExampleMatch,
): Promise<ExampleMatch> {
  if (!supabase) {
    const match: ExampleMatch = {
      ...input,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    mockMatches = [...mockMatches, match];
    return match;
  }

  const { data, error } = await supabase
    .from(TABLE)
    .insert({
      title: input.title,
      court_name: input.courtName,
      match_date: input.matchDate,
      level: input.level,
    })
    .select()
    .single<ExampleMatchRow>();
  if (error) throw error;
  return toExampleMatch(data);
}
