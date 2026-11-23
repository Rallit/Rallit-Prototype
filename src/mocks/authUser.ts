import type { AuthUser } from "@/apis/auth.types";

// Supabase를 연결하기 전에 소셜 로그인 대신 쓰는 목 사용자입니다.
// 온보딩 전 상태로 시작합니다.
export const mockAuthUser: AuthUser = {
  id: "mock-user",
  nickname: "테니스곰123",
  socialDisplayName: "테니스 회원",
  profileImageUrl: null,
  onboardingCompleted: false,
  profile: null,
};

/** 목 모드에서 이미 쓰이고 있다고 보는 닉네임입니다. 중복 확인을 시험할 때 씁니다. */
export const mockTakenNickname = "테니스조아";
