// Supabase 테이블(example_matches)의 컬럼 이름을 그대로 씁니다.
export type ExampleMatch = {
  id: string;
  title: string;
  court_name: string;
  match_date: string; // YYYY-MM-DD
  level: string;
  created_at: string;
};

export type NewExampleMatch = Pick<
  ExampleMatch,
  "title" | "court_name" | "match_date" | "level"
>;

export const LEVELS = ["입문", "초급", "중급", "상급"] as const;
