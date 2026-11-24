import { rankPlayers } from "@/features/ranking/score";
import { playerRecordsMock } from "@/mocks/rankings";
import type { RankingEntry, RankingPeriod } from "./rankings.types";

// 화면은 이 함수만 부릅니다.
// 아직 경기 결과 테이블이 없어서, Supabase 연결 여부와 상관없이 목 데이터를 돌려줍니다.
// 테이블을 만들면 여기서 Supabase로 기록을 읽고 rankPlayers로 순위를 매기면 됩니다.

export async function listRankings(
  period: RankingPeriod,
): Promise<RankingEntry[]> {
  return rankPlayers(playerRecordsMock(period));
}
