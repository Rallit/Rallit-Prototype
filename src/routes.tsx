import { lazy, type ReactNode } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import {
  AUTH_CALLBACK_PATH,
  LOGIN_PATH,
  ONBOARDING_INTRO_PATH,
  ONBOARDING_PATH,
} from "@/features/auth/paths";

// 화면(src/pages)은 lazy로 불러옵니다. 화면별로 파일이 나뉘어 첫 화면이 빨리 뜹니다.
const AuthCallbackPage = lazy(() => import("@/pages/AuthCallbackPage"));
const DesignSystemPage = lazy(() => import("@/pages/DesignSystemPage"));
const ExampleMatchCreatePage = lazy(
  () => import("@/pages/ExampleMatchCreatePage"),
);
const ExampleMatchListPage = lazy(() => import("@/pages/ExampleMatchListPage"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const OnboardingIntroPage = lazy(() => import("@/pages/OnboardingIntroPage"));
const OnboardingPage = lazy(() => import("@/pages/OnboardingPage"));

export type PrototypeRoute = {
  path: string;
  element: ReactNode;
  /** 홈 목록에 보여 줄 이름입니다. 없으면 홈 목록에 나오지 않습니다. */
  title?: string;
  description?: string;
};

// 새 화면을 만들면 위에 lazy 한 줄, 아래 목록에 한 줄을 추가합니다.
// title을 적으면 프로토타입 목록(/)에도 나옵니다.
export const routes: PrototypeRoute[] = [
  {
    path: "/design-system",
    element: <DesignSystemPage />,
    title: "디자인 시스템",
    description: "쓸 수 있는 색상, 타이포그래피, 컴포넌트 모음",
  },
  {
    path: LOGIN_PATH,
    element: <LoginPage />,
    title: "로그인·온보딩",
    description: "Rallit-FE의 소셜 로그인, 가입, 온보딩 2단계까지",
  },
  {
    path: AUTH_CALLBACK_PATH,
    element: <AuthCallbackPage />,
  },
  {
    path: ONBOARDING_INTRO_PATH,
    element: (
      <ProtectedRoute onboarding="pending">
        <OnboardingIntroPage />
      </ProtectedRoute>
    ),
  },
  {
    path: ONBOARDING_PATH,
    element: (
      <ProtectedRoute>
        <OnboardingPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/examples/matches",
    element: <ExampleMatchListPage />,
    title: "예시: 매치 목록",
    description: "Supabase 데이터를 읽고 쓰는 화면 예시",
  },
  {
    path: "/examples/matches/new",
    element: <ExampleMatchCreatePage />,
  },
];
