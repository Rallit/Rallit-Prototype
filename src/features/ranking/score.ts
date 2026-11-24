import type {
  PlayerRecord,
  RankingEntry,
  RankingPeriod,
} from "@/apis/rankings.types";

// 승점 규칙입니다. 이 숫자만 바꾸면 순위 계산이 함께 바뀝니다.
export const POINTS_PER_WIN = 3;
export const POINTS_PER_LOSS = 1;

export const rankingPeriodOptions: { value: RankingPeriod; label: string }[] = [
  { value: "week", label: "이번 주" },
  { value: "month", label: "이번 달" },
  { value: "all", label: "전체" },
];

export function winRate(record: PlayerRecord) {
  const games = record.wins + record.losses;
  return games === 0 ? 0 : Math.round((record.wins / games) * 100);
}

/**
 * 승점이 높은 순으로 줄을 세웁니다.
 * 승점이 같으면 승률이 높은 사람이 앞에 서지만, 순위 숫자는 같게 둡니다.
 */
export function rankPlayers(records: PlayerRecord[]): RankingEntry[] {
  const scored = records
    .map((record) => ({
      ...record,
      points: record.wins * POINTS_PER_WIN + record.losses * POINTS_PER_LOSS,
      winRate: winRate(record),
    }))
    .sort((a, b) => b.points - a.points || b.winRate - a.winRate);

  return scored.map((entry) => ({
    ...entry,
    rank: scored.findIndex((other) => other.points === entry.points) + 1,
  }));
}
