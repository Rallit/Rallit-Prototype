import type { RankingEntry } from "@/apis/rankings.types";
import { Badge } from "@/design-system/Badge";
import { Profile } from "@/design-system/Profile";

type RankingPodiumProps = {
  /** 1~3위 선수. 화면에는 2위, 1위, 3위 순으로 놓입니다. */
  entries: RankingEntry[];
};

export function RankingPodium({ entries }: RankingPodiumProps) {
  const [first, second, third] = entries;
  const ordered = [second, first, third].filter(Boolean);

  return (
    <section
      aria-label="상위 3명"
      className="flex items-end justify-center gap-small rounded-xl bg-neutral-default px-inset-medium pt-inset-extra-large pb-inset-large"
    >
      {ordered.map((entry) => {
        const isFirst = entry === first;
        return (
          <div
            key={entry.playerId}
            className={`flex flex-1 flex-col items-center gap-small ${isFirst ? "" : "pt-inset-extra-large"}`}
          >
            <span
              className={`typography-label-r-bold flex size-7 items-center justify-center rounded-pill ${
                isFirst
                  ? "bg-primary-default text-fg-neutral-strong"
                  : "bg-neutral-weak text-fg-neutral-secondary"
              }`}
            >
              {entry.rank}
            </span>
            <Profile size={isFirst ? "L" : "M"} alt={entry.nickname} />
            <p className="typography-label-l-bold m-0 max-w-full truncate text-fg-neutral-strong">
              {entry.nickname}
            </p>
            <Badge variant="blue">NTRP {entry.ntrp}</Badge>
            <p
              className={`m-0 ${
                isFirst
                  ? "typography-headline-bold text-fg-brand-strong"
                  : "typography-body-bold text-fg-neutral-default"
              }`}
            >
              {entry.points}점
            </p>
          </div>
        );
      })}
    </section>
  );
}
