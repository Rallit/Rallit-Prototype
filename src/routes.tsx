import type { ReactNode } from "react";
import { DesignSystemPage } from "@/features/catalog/DesignSystemPage";
import { ExampleMatchCreatePage } from "@/features/example-matches/ExampleMatchCreatePage";
import { ExampleMatchListPage } from "@/features/example-matches/ExampleMatchListPage";

export type PrototypeRoute = {
  path: string;
  element: ReactNode;
  /** 홈 목록에 보여 줄 이름입니다. 없으면 홈 목록에 나오지 않습니다. */
  title?: string;
  description?: string;
};

// 새 화면을 만들면 여기에 한 줄 추가합니다. title을 적으면 홈 목록에도 나옵니다.
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
