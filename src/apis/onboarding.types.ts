export type Gender = "MALE" | "FEMALE";

export type AgeGroup =
  | "TEENS"
  | "TWENTIES"
  | "THIRTIES"
  | "FORTIES"
  | "FIFTIES"
  | "SIXTIES_OR_OLDER";

export type Ntrp = "1.0" | "1.5" | "2.0" | "2.5" | "3.0" | "3.5" | "4.0+";

/** 온보딩에서 받는 정보입니다. 기획 변경으로 2단계(실력)까지만 받습니다. */
export type OnboardingProfile = {
  gender: Gender;
  ageGroup: AgeGroup;
  /** 테니스 시작 연월. 예: "2024-03" */
  tennisStartedOn: string;
  ntrp: Ntrp;
};

export type OnboardingRequest = OnboardingProfile & { nickname: string };
