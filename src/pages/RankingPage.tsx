import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { RankingListItem } from "@/components/ranking/RankingListItem";
import { RankingPodium } from "@/components/ranking/RankingPodium";
import { FilterChip } from "@/design-system/FilterChip";
import { Header } from "@/design-system/Header";
import { PageLayout } from "@/design-system/PageLayout";
import { listRankings } from "@/apis/rankings";
import type { RankingEntry, RankingPeriod } from "@/apis/rankings.types";
import { errorMessage } from "@/features/example-matches/format";
import {
  POINTS_PER_LOSS,
  POINTS_PER_WIN,
  rankingPeriodOptions,
} from "@/features/ranking/score";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "ready"; entries: RankingEntry[] };

export default function RankingPage() {
  const navigate = useNavigate();
  const [period, setPeriod] = useState<RankingPeriod>("month");
  const [state, setState] = useState<LoadState>({ status: "loading" });

  useEffect(() => {
    let ignore = false;
    listRankings(period)
      .then((entries) => {
        if (!ignore) setState({ status: "ready", entries });
      })
      .catch((error: unknown) => {
        if (!ignore)
          setState({ status: "error", message: errorMessage(error) });
      });
    return () => {
      ignore = true;
    };
  }, [period]);

  const entries = state.status === "ready" ? state.entries : [];

  return (
    <PageLayout
      background="weak"
      header={
        <Header
          variant="subpage"
          title="랭킹"
          onBack={() => void navigate("/")}
        />
      }
    >
      <div className="flex flex-col gap-medium py-inset-large">
        <p className="typography-caption-r-medium m-0 rounded-md bg-secondary-inverse px-inset-medium py-inset-small break-keep text-fg-accent-default">
          아직 경기 결과 데이터가 없어서 가짜 선수 기록을 보여 줘요.
        </p>

        <div className="flex gap-small" role="group" aria-label="기간">
          {rankingPeriodOptions.map((option) => (
            <FilterChip
              key={option.value}
              label={option.label}
              selected={period === option.value}
              onClick={() => setPeriod(option.value)}
            />
          ))}
        </div>

        {state.status === "loading" && (
          <p className="typography-body-regular m-0 text-fg-neutral-tertiary">
            불러오는 중...
          </p>
        )}

        {state.status === "error" && (
          <p className="typography-body-regular m-0 rounded-md bg-system-error p-inset-medium text-fg-system-error">
            랭킹을 불러오지 못했어요: {state.message}
          </p>
        )}

        {state.status === "ready" && entries.length === 0 && (
          <p className="typography-body-regular m-0 text-fg-neutral-tertiary">
            이 기간에는 아직 경기 기록이 없어요.
          </p>
        )}

        {entries.length > 0 && (
          <>
            <RankingPodium entries={entries.slice(0, 3)} />
            <ol className="m-0 flex list-none flex-col rounded-xl bg-neutral-default p-0 py-inset-small">
              {entries.slice(3).map((entry) => (
                <RankingListItem key={entry.playerId} entry={entry} />
              ))}
            </ol>
          </>
        )}

        <p className="typography-caption-r-regular m-0 text-center text-fg-neutral-tertiary">
          승리 {POINTS_PER_WIN}점, 패배 {POINTS_PER_LOSS}점으로 계산해요.
        </p>
      </div>
    </PageLayout>
  );
}
