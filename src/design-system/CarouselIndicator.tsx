type CarouselIndicatorProps = {
  currentPage: number;
  totalPages: number;
  className?: string;
};

const MAX_SEGMENTS = 5;

export function CarouselIndicator({
  currentPage,
  totalPages,
  className,
}: CarouselIndicatorProps) {
  const total = Math.trunc(totalPages);

  if (!Number.isFinite(total) || total < 1 || total > MAX_SEGMENTS) return null;

  const page = Number.isFinite(currentPage)
    ? Math.min(total, Math.max(1, Math.trunc(currentPage)))
    : 1;

  return (
    <div
      role="img"
      aria-label={`전체 ${total}페이지 중 ${page}페이지`}
      className={[
        "inline-flex w-fit items-center gap-micro p-inset-medium",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {Array.from({ length: total }, (_, index) => {
        const segment = index + 1;
        return (
          <span
            key={segment}
            aria-hidden="true"
            className={`h-1.5 shrink-0 rounded-pill ${segment === page ? "w-unit-12 bg-fg-neutral-default" : "w-1.5 bg-fg-neutral-subtle"}`}
          />
        );
      })}
    </div>
  );
}
