import { AUTH_CALLBACK_PATH } from "@/features/auth/paths";
import { supabase, supabaseConfig } from "@/lib/supabase";
import { mockAuthUser } from "@/mocks/authUser";
import type { AuthUser, SocialProvider } from "./auth.types";
import type { AgeGroup, Gender, Ntrp } from "./onboarding.types";

// 화면은 이 파일의 함수만 부릅니다.
// Supabase가 연결되지 않았으면 실제 소셜 로그인 없이 목 사용자로 진행하고,
// 새로고침하면 로그아웃 상태로 돌아갑니다. (Rallit-FE의 mock 모드와 같습니다)

const PROFILES = "profiles";

const providerLabels: Record<SocialProvider, string> = {
  kakao: "카카오",
  google: "구글",
};

/** profiles 테이블의 한 행입니다. 컬럼 이름은 DB 그대로 snake_case입니다. */
export type ProfileRow = {
  id: string;
  nickname: string;
  social_display_name: string | null;
  gender: Gender | null;
  age_group: AgeGroup | null;
  /** date 컬럼. 예: "2024-03-01" */
  tennis_started_on: string | null;
  ntrp: Ntrp | null;
  onboarding_completed: boolean;
};

/** DB 행을 화면에서 쓰는 camelCase 타입으로 바꿉니다. */
export function toAuthUser(row: ProfileRow): AuthUser {
  const { gender, age_group, tennis_started_on, ntrp } = row;
  return {
    id: row.id,
    nickname: row.nickname,
    socialDisplayName: row.social_display_name,
    profileImageUrl: null,
    onboardingCompleted: row.onboarding_completed,
    profile:
      gender && age_group && tennis_started_on && ntrp
        ? {
            gender,
            ageGroup: age_group,
            tennisStartedOn: tennis_started_on.slice(0, 7),
            ntrp,
          }
        : null,
  };
}

function wait(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

async function getProfile(userId: string): Promise<AuthUser> {
  if (!supabase) return mockAuthUser;

  const { data, error } = await supabase
    .from(PROFILES)
    .select("*")
    .eq("id", userId)
    .maybeSingle<ProfileRow>();
  if (error) throw error;
  if (!data) {
    throw new Error(
      "프로필을 찾지 못했어요. supabase/migrations의 SQL을 실행했는지 확인해 주세요.",
    );
  }
  return toAuthUser(data);
}

/** 앱을 열 때 이미 로그인되어 있는지 확인합니다. 로그인 전이면 null입니다. */
export async function restoreSession(): Promise<AuthUser | null> {
  if (!supabase) {
    await wait(500);
    return null;
  }

  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;
  if (!data.session) return null;
  return getProfile(data.session.user.id);
}

/** Supabase 대시보드에서 이 소셜 로그인을 켰는지 확인합니다. */
async function isProviderEnabled(provider: SocialProvider) {
  if (!supabaseConfig) return false;

  const response = await fetch(`${supabaseConfig.url}/auth/v1/settings`, {
    headers: { apikey: supabaseConfig.publishableKey },
  });
  if (!response.ok) return true; // 확인하지 못하면 일단 로그인 화면으로 보냅니다.

  const settings = (await response.json()) as {
    external?: Partial<Record<SocialProvider, boolean>>;
  };
  return settings.external?.[provider] === true;
}

/**
 * 소셜 로그인을 시작합니다.
 * Supabase가 연결되어 있으면 카카오·구글 로그인 화면으로 이동하므로 null을 돌려줍니다.
 * 처음 로그인한 사람은 Supabase에 계정이 생기고, 그때 profiles 행도 자동으로 만들어집니다(회원가입).
 */
export async function startSocialLogin(
  provider: SocialProvider,
): Promise<AuthUser | null> {
  if (!supabase) {
    await wait(1000);
    return mockAuthUser;
  }

  if (!(await isProviderEnabled(provider))) {
    throw new Error(
      `${providerLabels[provider]} 로그인이 아직 Supabase에 설정되지 않았어요. README의 소셜 로그인 설정을 확인해 주세요.`,
    );
  }

  const { error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: new URL(AUTH_CALLBACK_PATH, window.location.origin).href,
    },
  });
  if (error) throw error;
  return null;
}

export async function logout(): Promise<void> {
  if (!supabase) return;

  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/** 다른 탭에서 로그아웃하는 등 세션이 끝나면 알려 줍니다. */
export function subscribeSignedOut(onSignedOut: () => void) {
  if (!supabase) return () => {};

  const { data } = supabase.auth.onAuthStateChange((event) => {
    if (event === "SIGNED_OUT") onSignedOut();
  });
  return () => data.subscription.unsubscribe();
}
