import { supabase } from "@/lib/supabase";
import { mockTakenNickname } from "@/mocks/authUser";
import { toAuthUser, type ProfileRow } from "./auth";
import type { AuthUser } from "./auth.types";
import type { OnboardingRequest } from "./onboarding.types";

// 화면은 이 파일의 함수만 부릅니다.
// Supabase가 연결되지 않았으면 저장하지 않고 성공한 것처럼 동작합니다.

const PROFILES = "profiles";

/** 닉네임이 이미 쓰이고 있을 때 던집니다. 화면은 1단계로 돌아가 오류를 보여 줍니다. */
export class NicknameConflictError extends Error {
  constructor() {
    super("이미 사용 중인 닉네임입니다.");
  }
}

export async function checkNicknameAvailability(
  nickname: string,
  signal: AbortSignal,
): Promise<boolean> {
  if (!supabase) {
    signal.throwIfAborted();
    return nickname !== mockTakenNickname;
  }

  const { data, error } = await supabase
    .rpc("is_nickname_available", { nickname })
    .abortSignal(signal);
  if (error) throw error;
  return data === true;
}

export async function submitOnboarding(
  payload: OnboardingRequest,
  user: AuthUser,
  signal: AbortSignal,
): Promise<AuthUser> {
  if (!supabase) {
    signal.throwIfAborted();
    const { nickname, ...profile } = payload;
    return { ...user, nickname, profile, onboardingCompleted: true };
  }

  const { data, error } = await supabase
    .from(PROFILES)
    .update({
      nickname: payload.nickname,
      gender: payload.gender,
      age_group: payload.ageGroup,
      tennis_started_on: `${payload.tennisStartedOn}-01`,
      ntrp: payload.ntrp,
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id)
    .select()
    .abortSignal(signal)
    .single<ProfileRow>();

  // 23505: 같은 닉네임이 이미 있어 unique 제약에 걸렸습니다.
  if (error?.code === "23505") throw new NicknameConflictError();
  if (error) throw error;
  return toAuthUser(data);
}
