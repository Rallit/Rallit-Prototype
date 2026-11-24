import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { PageLayout } from "@/design-system/PageLayout";
import {
  LOGIN_PATH,
  ONBOARDING_INTRO_PATH,
  SERVICE_HOME_PATH,
} from "@/features/auth/paths";
import { useAuthContext } from "@/hooks/useAuthContext";

type ProtectedRouteProps = {
  onboarding?: "any" | "pending" | "completed";
  children: ReactNode;
};

// 로그인한 사용자만 볼 수 있는 화면을 감쌉니다.
// Rallit-FE App.tsx의 AuthStatusGate와 components/auth/ProtectedRoute.tsx를 합쳤습니다.
export function ProtectedRoute({
  onboarding = "any",
  children,
}: ProtectedRouteProps) {
  const { authState, retry } = useAuthContext();

  if (authState.status === "checking") {
    return (
      <PageLayout>
        <p role="status">로그인 상태를 확인하고 있습니다…</p>
      </PageLayout>
    );
  }

  if (authState.status === "error") {
    return (
      <PageLayout>
        <section>
          <p role="alert">{authState.message}</p>
          <button type="button" onClick={retry}>
            다시 시도
          </button>
        </section>
      </PageLayout>
    );
  }

  if (authState.status !== "authenticated") {
    return <Navigate to={LOGIN_PATH} replace />;
  }

  if (onboarding === "completed" && !authState.user.onboardingCompleted) {
    return <Navigate to={ONBOARDING_INTRO_PATH} replace />;
  }

  if (onboarding === "pending" && authState.user.onboardingCompleted) {
    return <Navigate to={SERVICE_HOME_PATH} replace />;
  }

  return children;
}
