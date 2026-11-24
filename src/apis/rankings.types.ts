// 랭킹 화면에서 쓰는 타입입니다.

/** 랭킹을 모아 보는 기간입니다. */
export type RankingPeriod = "week" | "month" | "all";

/** 한 선수의 기간 내 경기 기록입니다. 순위는 rankings.ts에서 계산합니다. */
export type PlayerRecord = {
  playerId: string;
  nickname: string;
  ntrp: string;
  wins: number;
  losses: number;
};

/** 화면에 보여 줄 랭킹 한 줄입니다. */
export type RankingEntry = PlayerRecord & {
  /** 1부터 시작합니다. 승점이 같으면 같은 순위입니다. */
  rank: number;
  points: number;
  /** 0~100 사이 정수 */
  winRate: number;
};
