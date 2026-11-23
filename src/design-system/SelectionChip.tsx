import type { ComponentProps, MouseEventHandler } from "react";
import closeIcon from "../../assets/icons/close.svg";

type SelectionChipProps = Omit<
  ComponentProps<"button">,
  "children" | "type" | "aria-pressed"
> & { label: string };

type ToggleChipProps = SelectionChipProps & {
  selected?: boolean;
  onRemove?: never;
};

type RemovableChipProps = Omit<SelectionChipProps, "onClick"> & {
  onRemove: MouseEventHandler<HTMLButtonElement>;
  selected?: never;
  onClick?: never;
};

const baseStyles =
  "box-border inline-flex h-10 w-fit appearance-none items-center justify-center rounded-pill border-0 py-inset-small whitespace-nowrap";

const toggleStyles = [
  "typography-label-l-medium cursor-pointer px-inset-large",
  "state-overlay",
  "enabled:hover:state-overlay-hover enabled:active:state-overlay-pressed",
  "disabled:cursor-default disabled:bg-state-disabled disabled:text-fg-neutral-subtle",
].join(" ");

export function SelectionChip({
  label,
  selected = false,
  disabled,
  onRemove,
  onClick,
  className,
  "aria-label": accessibleLabel,
  ...props
}: ToggleChipProps | RemovableChipProps) {
  const styles = onRemove
    ? "typography-label-l-medium cursor-pointer gap-micro bg-neutral-weak px-inset-medium text-fg-neutral-default disabled:cursor-default"
    : [
        toggleStyles,
        selected && !disabled
          ? "bg-secondary-default text-fg-neutral-inverse"
          : "bg-neutral-default text-fg-neutral-secondary inset-ring inset-ring-stroke-neutral-default",
      ].join(" ");

  return (
    <button
      {...props}
      type="button"
      className={[baseStyles, styles, className].filter(Boolean).join(" ")}
      aria-label={accessibleLabel ?? (onRemove ? `${label} 삭제` : undefined)}
      aria-pressed={onRemove ? undefined : selected}
      disabled={disabled}
      onClick={onRemove ?? onClick}
    >
      <span className="min-w-0 truncate">{label}</span>
      {onRemove && <img src={closeIcon} alt="" className="shrink-0" />}
    </button>
  );
}
