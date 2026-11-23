import { lazy, type ReactNode } from "react";

// 화면(src/pages)은 lazy로 불러옵니다. 화면별로 파일이 나뉘어 첫 화면이 빨리 뜹니다.
const DesignSystemPage = lazy(() => import("@/pages/DesignSystemPage"));
const ExampleMatchCreatePage = lazy(
  () => import("@/pages/ExampleMatchCreatePage"),
);
const ExampleMatchListPage = lazy(() => import("@/pages/ExampleMatchListPage"));

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
