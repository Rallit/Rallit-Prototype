import type { OnboardingProfile } from "./onboarding.types";

export type SocialProvider = "kakao" | "google";

export type AuthUser = {
  /** Supabase Auth의 사용자 id(uuid) */
  id: string;
  nickname: string;
  /** 소셜 계정의 이름. 온보딩 소개 화면의 "OO님"에 씁니다. */
  socialDisplayName: string | null;
  profileImageUrl: string | null;
  onboardingCompleted: boolean;
  profile: OnboardingProfile | null;
};

export type AuthState =
  | { status: "checking" }
  | { status: "unauthenticated" }
  | { status: "authenticated"; user: AuthUser }
  | { status: "error"; message: string };
