import type {
  AgeGroup,
  Gender,
  Ntrp,
  OnboardingRequest,
} from "@/apis/onboarding.types";

// Rallit-FE의 src/features/onboarding/form.ts에서 3단계(선호하는 매칭)를 뺐습니다.
// 기획 변경으로 온보딩은 1단계 기본프로필, 2단계 실력까지만 받습니다.

export type BasicProfileDraft = {
  nickname: string;
  gender: Gender | null;
  ageGroup: AgeGroup | null;
};

export type TennisStartMonth = { year: number; month: number };

export type SkillDraft = {
  tennisStart: TennisStartMonth | null;
  ntrp: Ntrp;
};

export const nicknameMaxLength = 12;

function formatTennisStartedOn({ year, month }: TennisStartMonth) {
  return `${year}-${String(month).padStart(2, "0")}`;
}

export function buildOnboardingRequest(
  { nickname, gender, ageGroup }: BasicProfileDraft,
  { tennisStart, ntrp }: SkillDraft,
): OnboardingRequest | null {
  if (!gender || !ageGroup || !tennisStart) return null;

  return {
    nickname,
    gender,
    ageGroup,
    tennisStartedOn: formatTennisStartedOn(tennisStart),
    ntrp,
  };
}
