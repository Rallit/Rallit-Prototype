import { myProfileMock, recommendedPlayersMock } from "@/mocks/socialMatches";
import type { MatchProfile, RecommendedPlayer } from "./socialMatches.types";

// 아직 테이블이 없어 항상 목 데이터로 동작합니다.
// 다른 사용자의 프로필을 보여 주려면 공개 범위와 개인정보 안내문을 먼저 정해야 합니다.

const sentProposals = new Set<string>();

export async function getMyMatchProfile(): Promise<MatchProfile> {
  return myProfileMock;
}

export async function listCandidatePlayers(): Promise<RecommendedPlayer[]> {
  return [...recommendedPlayersMock];
}

export async function listSentProposalPlayerIds(): Promise<string[]> {
  return [...sentProposals];
}

export async function sendMatchProposal(playerId: string): Promise<void> {
  sentProposals.add(playerId);
}
