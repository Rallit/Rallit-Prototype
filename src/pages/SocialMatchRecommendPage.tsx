import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import toastAlertIcon from "../../assets/icons/toast-alert-round.svg";
import { Header } from "@/design-system/Header";
import { PageLayout } from "@/design-system/PageLayout";
import { Toast } from "@/design-system/Toast";
import {
  getMyMatchProfile,
  listCandidatePlayers,
  listSentProposalPlayerIds,
  sendMatchProposal,
} from "@/apis/socialMatches";
import type {
  MatchProfile,
  RecommendedPlayer,
} from "@/apis/socialMatches.types";
import { RecommendedPlayerCard } from "@/components/social-match/RecommendedPlayerCard";
import { errorMessage } from "@/features/example-matches/format";
import {
  recommendPlayers,
  type Recommendation,
} from "@/features/social-match/recommend";

type LoadState =
  | { status: "loading" }
  | { status: "error"; message: string }
  | {
      status: "ready";
      me: MatchProfile;
      recommendations: Recommendation[];
    };

export default function SocialMatchRecommendPage() {
  const navigate = useNavigate();
  const [state, setState] = useState<LoadState>({ status: "loading" });
  const [proposedIds, setProposedIds] = useState<string[]>([]);
  const [sendingId, setSendingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{ text: string; error: boolean } | null>(
    null,
  );

  useEffect(() => {
    let ignore = false;
    Promise.all([
      getMyMatchProfile(),
      listCandidatePlayers(),
      listSentProposalPlayerIds(),
    ])
      .then(([me, players, sentIds]) => {
        if (ignore) return;
        setProposedIds(sentIds);
        setState({
          status: "ready",
          me,
          recommendations: recommendPlayers(me, players),
        });
      })
      .catch((error: unknown) => {
        if (!ignore)
          setState({ status: "error", message: errorMessage(error) });
      });
    return () => {
      ignore = true;
    };
  }, []);

  async function propose(player: RecommendedPlayer) {
    setSendingId(player.id);
    try {
      await sendMatchProposal(player.id);
      setProposedIds((ids) => [...ids, player.id]);
      setToast({
        text: `${player.nickname}님께 제안을 보냈어요`,
        error: false,
      });
    } catch (error) {
      setToast({
        text: `제안을 보내지 못했어요: ${errorMessage(error)}`,
        error: true,
      });
    } finally {
      setSendingId(null);
    }
  }

  return (
    <PageLayout
      background="weak"
      header={
        <Header
          variant="subpage"
          title="추천 상대"
          onBack={() => void navigate("/")}
        />
      }
      footer={
        <div className="relative">
          <Toast
            message={toast?.text ?? null}
            icon={toast?.error ? toastAlertIcon : undefined}
            onDismiss={() => setToast(null)}
            className="absolute inset-x-inset-large bottom-[calc(100%+8px)]"
          />
        </div>
      }
    >
      <div className="flex flex-col gap-medium py-inset-large">
        {state.status === "ready" && (
          <section className="flex flex-col gap-small rounded-lg bg-neutral-default p-inset-large">
            <h2 className="typography-label-l-bold m-0 text-fg-neutral-strong">
              내 프로필 기준으로 추천해요
            </h2>
            <p className="typography-label-r-regular m-0 break-keep text-fg-neutral-secondary">
              NTRP {state.me.ntrp.toFixed(1)} · {state.me.gender} ·{" "}
              {state.me.ageGroup}
              <br />
              {state.me.region} · {state.me.availableTimes.join(", ")}
            </p>
          </section>
        )}

        {state.status === "loading" && (
          <p className="typography-body-regular m-0 text-fg-neutral-tertiary">
            불러오는 중...
          </p>
        )}

        {state.status === "error" && (
          <p className="typography-body-regular m-0 rounded-md bg-system-error p-inset-medium text-fg-system-error">
            추천 상대를 불러오지 못했어요: {state.message}
          </p>
        )}

        {state.status === "ready" && state.recommendations.length === 0 && (
          <p className="typography-body-regular m-0 text-fg-neutral-tertiary">
            아직 추천할 상대가 없어요.
          </p>
        )}

        {state.status === "ready" &&
          state.recommendations.map((recommendation) => (
            <RecommendedPlayerCard
              key={recommendation.player.id}
              recommendation={recommendation}
              proposed={proposedIds.includes(recommendation.player.id)}
              sending={sendingId === recommendation.player.id}
              onPropose={() => void propose(recommendation.player)}
            />
          ))}
      </div>
    </PageLayout>
  );
}
