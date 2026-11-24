import { Link, Navigate, useLocation } from "react-router";
import { PageLayout } from "@/design-system/PageLayout";
import { getCallbackError } from "@/features/auth/callback";
import {
  LOGIN_PATH,
  ONBOARDING_INTRO_PATH,
  SERVICE_HOME_PATH,
} from "@/features/auth/paths";
import { useAuthContext } from "@/hooks/useAuthContext";

// Rallit-FE의 src/pages/AuthCompletePage.tsx를 Supabase 소셜 로그인에 맞게 옮겼습니다.
// Supabase가 주소의 로그인 정보를 읽어 세션을 만들면, 온보딩 여부에 따라 다음 화면으로 보냅니다.
function AuthCallbackContent() {
  const location = useLocation();
  const { authState, retry } = useAuthContext();
  const callbackError = getCallbackError(location);

  if (callbackError) {
    return (
      <section>
        <p role="alert">{callbackError}</p>
        <Link to={LOGIN_PATH} replace>
          로그인으로 돌아가기
        </Link>
      </section>
    );
  }

  if (authState.status === "checking") {
    return <p role="status">로그인을 완료하고 있습니다…</p>;
  }

  if (authState.status === "error") {
    return (
      <section>
        <p role="alert">{authState.message}</p>
        <button type="button" onClick={retry}>
          다시 시도
        </button>
        <Link to={LOGIN_PATH} replace>
          로그인으로 돌아가기
        </Link>
      </section>
    );
  }

  if (authState.status === "unauthenticated") {
    return (
      <section>
        <p role="alert">
          로그인 정보를 확인할 수 없습니다. 다시 로그인해주세요.
        </p>
        <Link to={LOGIN_PATH} replace>
          로그인으로 돌아가기
        </Link>
      </section>
    );
  }

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

export default function AuthCallbackPage() {
  return (
    <PageLayout>
      <AuthCallbackContent />
    </PageLayout>
  );
}
