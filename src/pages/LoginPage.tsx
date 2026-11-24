import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import logoWhite from "../../assets/images/rallit-logo-white.svg";
import { PageLayout } from "@/design-system/PageLayout";
import { startSocialLogin } from "@/apis/auth";
import type { SocialProvider } from "@/apis/auth.types";
import { isSupabaseConnected } from "@/apis/connection";
import { SocialLoginButton } from "@/components/auth/SocialLoginButton";
import {
  ONBOARDING_INTRO_PATH,
  SERVICE_HOME_PATH,
} from "@/features/auth/paths";
import { useAuthContext } from "@/hooks/useAuthContext";

// Rallit-FE의 src/pages/LoginPage.tsx와 App.tsx의 /login 경로를 옮겼습니다.
// FE는 Rallit 백엔드로 소셜 로그인을 하지만, 여기서는 Supabase Auth로 합니다.
function LoginScreen() {
  const { isLoggingOut, logoutError, completeLogin } = useAuthContext();
  const [loadingProvider, setLoadingProvider] = useState<SocialProvider | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState("");
  const isLoading = loadingProvider !== null || isLoggingOut;

  useEffect(() => {
    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        setLoadingProvider(null);
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  const handleLogin = async (provider: SocialProvider) => {
    if (isLoading) return;

    setLoadingProvider(provider);
    setErrorMessage("");

    try {
      const user = await startSocialLogin(provider);
      // Supabase 연결 시에는 소셜 로그인 화면으로 이동하므로 user가 없습니다.
      if (!user) return;
      completeLogin(user);
      setLoadingProvider(null);
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "로그인 중 오류가 발생했습니다.",
      );
      setLoadingProvider(null);
    }
  };

  return (
    <main className="box-border mx-auto flex min-h-dvh w-full max-w-[480px] flex-col bg-common-black pt-[env(safe-area-inset-top,0px)] pr-[env(safe-area-inset-right,0px)] pb-[max(env(safe-area-inset-bottom,0px),34px)] pl-[env(safe-area-inset-left,0px)]">
      <p role="status" className="sr-only">
        {loadingProvider
          ? "로그인 처리 중…"
          : isLoggingOut
            ? "로그아웃 처리 중…"
            : ""}
      </p>
      <h1 className="m-0 flex justify-center pt-[81px]">
        <img src={logoWhite} alt="Rallit" className="block" />
      </h1>

      <div className="mt-auto grid gap-small px-inset-large">
        {!isSupabaseConnected && (
          <p className="typography-caption-r-medium m-0 text-center break-keep text-fg-neutral-subtle">
            Supabase 연결 전이라 실제 소셜 로그인 없이 진행돼요.
          </p>
        )}
        {isLoggingOut && (
          <p className="typography-label-r-medium m-0 text-center text-fg-neutral-inverse">
            로그아웃 처리 중…
          </p>
        )}
        {logoutError && (
          <p
            role="alert"
            className="typography-label-r-medium m-0 text-center text-fg-neutral-inverse"
          >
            {logoutError}
          </p>
        )}
        {errorMessage && (
          <p
            role="alert"
            className="typography-label-r-medium m-0 text-center break-keep text-fg-neutral-inverse"
          >
            {errorMessage}
          </p>
        )}

        <SocialLoginButton
          provider="kakao"
          loading={loadingProvider === "kakao"}
          disabled={isLoading}
          onClick={() => void handleLogin("kakao")}
        />
        <SocialLoginButton
          provider="google"
          loading={loadingProvider === "google"}
          disabled={isLoading}
          onClick={() => void handleLogin("google")}
        />
      </div>
    </main>
  );
}

export default function LoginPage() {
  const { authState } = useAuthContext();

  if (authState.status === "authenticated") {
    return (
      <Navigate
        to={
          authState.user.onboardingCompleted
            ? SERVICE_HOME_PATH
            : ONBOARDING_INTRO_PATH
        }
        replace
      />
    );
  }

  if (authState.status === "checking") {
    return (
      <PageLayout>
        <p role="status">로그인 상태를 확인하고 있습니다…</p>
      </PageLayout>
    );
  }

  return <LoginScreen />;
}
