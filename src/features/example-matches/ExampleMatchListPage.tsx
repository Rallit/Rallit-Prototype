import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Badge } from "@/design-system/Badge";
import { BottomCTA } from "@/design-system/BottomCTA";
import { Header } from "@/design-system/Header";
import { PageLayout } from "@/design-system/PageLayout";
import { isSupabaseConfigured } from "@/lib/supabase";
import { listExampleMatches } from "./api";
import { errorMessage, formatMatchDate } from "./format";
import type { ExampleMatch } from "./types";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; matches: ExampleMatch[] };

export function ExampleMatchListPage() {
  const navigate = useNavigate();
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let ignore = false;
    listExampleMatches()
      .then((matches) => {
        if (!ignore) setState({ status: "ready", matches });
      })
      .catch((error: unknown) => {
        if (!ignore)
          setState({ status: "error", message: errorMessage(error) });
      });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <PageLayout
      background="weak"
      header={
        <Header
          variant="subpage"
          title="예시: 매치 목록"
          onBack={() => void navigate("/")}
        />
      }
      footer={
        <div className="py-inset-medium">
          <BottomCTA
            primaryAction={{
              children: "매치 만들기",
              onClick: () => void navigate("/examples/matches/new"),
            }}
          />
        </div>
      }
    >
      <div className="flex flex-col gap-medium py-inset-large">
        {!isSupabaseConfigured && (
          <p className="typography-caption-r-medium m-0 rounded-md bg-secondary-inverse px-inset-medium py-inset-small break-keep text-fg-accent-default">
            Supabase 연결 전이라 목 데이터를 보여 줘요. 새로고침하면 추가한
            매치가 사라져요.
          </p>
        )}

        {state.status === "loading" && (
          <p className="typography-body-regular m-0 text-fg-neutral-tertiary">
            불러오는 중...
          </p>
        )}

        {state.status === "error" && (
          <p className="typography-body-regular m-0 rounded-md bg-system-error p-inset-medium text-fg-system-error">
            매치를 불러오지 못했어요: {state.message}
          </p>
        )}

        {state.status === "ready" && state.matches.length === 0 && (
          <p className="typography-body-regular m-0 text-fg-neutral-tertiary">
            아직 등록된 매치가 없어요.
          </p>
        )}

        {state.status === "ready" &&
          state.matches.map((match) => (
            <article
              key={match.id}
              className="flex flex-col gap-small rounded-lg bg-neutral-default p-inset-large"
            >
              <Badge variant="blue">{match.level}</Badge>
              <h2 className="typography-headline-bold m-0 text-fg-neutral-strong">
                {match.title}
              </h2>
              <p className="typography-label-r-regular m-0 text-fg-neutral-secondary">
                {formatMatchDate(match.match_date)} · {match.court_name}
              </p>
            </article>
          ))}
      </div>
    </PageLayout>
  );
}
