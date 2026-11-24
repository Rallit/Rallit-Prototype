import type {
  MatchProfile,
  RecommendedPlayer,
} from "@/apis/socialMatches.types";

export type Recommendation = {
  player: RecommendedPlayer;
  /** 나와 맞는 항목 이름. 예: ["NTRP", "지역"] */
  matched: string[];
};

/** NTRP 차이가 이 값 이하면 비슷하다고 봅니다. */
const NTRP_GAP = 0.5;

function matchedCriteria(me: MatchProfile, other: MatchProfile): string[] {
  const matched: string[] = [];
  if (Math.abs(me.ntrp - other.ntrp) <= NTRP_GAP) matched.push("NTRP");
  if (me.gender === other.gender) matched.push("성별");
  if (me.ageGroup === other.ageGroup) matched.push("연령대");
  if (me.region === other.region) matched.push("지역");
  if (other.availableTimes.some((t) => me.availableTimes.includes(t)))
    matched.push("가능한 시간");
  return matched;
}

/** 내 프로필과 맞는 항목이 많은 순서로 정렬합니다. 하나도 안 맞으면 뺍니다. */
export function recommendPlayers(
  me: MatchProfile,
  players: RecommendedPlayer[],
): Recommendation[] {
  return players
    .map((player) => ({ player, matched: matchedCriteria(me, player) }))
    .filter(({ matched }) => matched.length > 0)
    .sort((a, b) => b.matched.length - a.matched.length);
}
