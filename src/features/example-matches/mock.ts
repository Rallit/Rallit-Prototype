import type { ExampleMatch } from "./types";

// Supabase를 연결하기 전에 보여 줄 목 데이터입니다.
export const exampleMatchesMock: ExampleMatch[] = [
  {
    id: "mock-1",
    title: "토요일 아침 복식 한 판",
    court_name: "올림픽공원 테니스장",
    match_date: "2026-12-05",
    level: "초급",
    created_at: "2026-11-20T09:00:00.000Z",
  },
  {
    id: "mock-2",
    title: "퇴근 후 단식 랠리",
    court_name: "장충 테니스장",
    match_date: "2026-12-09",
    level: "중급",
    created_at: "2026-11-21T09:00:00.000Z",
  },
];
