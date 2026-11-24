import { ActionButton } from "@/design-system/ActionButton";
import { Badge } from "@/design-system/Badge";
import { Profile } from "@/design-system/Profile";
import type { Recommendation } from "@/features/social-match/recommend";

type RecommendedPlayerCardProps = {
  recommendation: Recommendation;
  proposed: boolean;
  sending: boolean;
  onPropose: () => void;
};

export function RecommendedPlayerCard({
  recommendation,
  proposed,
  sending,
  onPropose,
}: RecommendedPlayerCardProps) {
  const { player, matched } = recommendation;
  return (
    <article className="flex flex-col gap-medium rounded-lg bg-neutral-default p-inset-large">
      <div className="flex items-center gap-medium">
        <Profile size="M" alt={player.nickname} />
        <div className="flex min-w-0 flex-1 flex-col gap-micro">
          <h2 className="typography-headline-bold m-0 truncate text-fg-neutral-strong">
            {player.nickname}
          </h2>
          <p className="typography-label-r-regular m-0 text-fg-neutral-secondary">
            NTRP {player.ntrp.toFixed(1)} · {player.gender} · {player.ageGroup}
          </p>
          <p className="typography-label-r-regular m-0 text-fg-neutral-secondary">
            {player.region} · {player.availableTimes.join(", ")}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-micro">
        {matched.map((name) => (
          <Badge key={name} variant="blue">
            {name} 일치
          </Badge>
        ))}
      </div>

      <ActionButton
        size="M"
        fullWidth
        variant={proposed ? "tertiary" : "primary"}
        disabled={proposed || sending}
        onClick={onPropose}
      >
        {proposed ? "제안을 보냈어요" : "같이 치자고 제안하기"}
      </ActionButton>
    </article>
  );
}
