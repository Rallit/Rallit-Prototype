import type { RankingEntry } from "@/apis/rankings.types";
import { Profile } from "@/design-system/Profile";

type RankingListItemProps = {
  entry: RankingEntry;
};

export function RankingListItem({ entry }: RankingListItemProps) {
  return (
    <li className="flex items-center gap-medium px-inset-large py-inset-medium">
      <span className="typography-body-bold w-6 shrink-0 text-center text-fg-neutral-secondary">
        {entry.rank}
      </span>
      <Profile size="S" alt={entry.nickname} />
      <div className="flex min-w-0 flex-1 flex-col gap-micro">
        <p className="typography-body-medium m-0 truncate text-fg-neutral-strong">
          {entry.nickname}
        </p>
        <p className="typography-caption-r-regular m-0 text-fg-neutral-tertiary">
          NTRP {entry.ntrp} · {entry.wins}승 {entry.losses}패 · 승률{" "}
          {entry.winRate}%
        </p>
      </div>
      <span className="typography-body-bold shrink-0 text-fg-neutral-default">
        {entry.points}점
      </span>
    </li>
  );
}
