import type { ComponentProps } from "react";

type FilterChipProps = Omit<
  ComponentProps<"button">,
  "children" | "type" | "aria-pressed"
> & {
  label: string;
  selected?: boolean;
};

export function FilterChip({
  label,
  selected = false,
  className,
  ...props
}: FilterChipProps) {
  return (
    <button
      {...props}
      type="button"
      aria-pressed={selected}
      className={[
        "typography-label-r-medium box-border inline-flex h-9 w-fit min-w-[52px] shrink-0 cursor-pointer appearance-none items-center justify-center rounded-pill border-0 px-inset-medium py-inset-small whitespace-nowrap disabled:cursor-default",
        selected
          ? "bg-secondary-inverse text-fg-accent-default"
          : "bg-neutral-default text-fg-neutral-secondary inset-ring inset-ring-stroke-neutral-default",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {label}
    </button>
  );
}
