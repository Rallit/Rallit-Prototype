import type { PropsWithChildren } from "react";

const styles = {
  brand: "rounded-sm bg-primary-inverse text-fg-brand-strong",
  blue: "rounded-sm bg-secondary-inverse text-fg-accent-default",
  "blue-inverse": "rounded-pill bg-secondary-default text-fg-neutral-inverse",
  neutral: "rounded-sm bg-neutral-weak text-fg-brand-strong",
};

type BadgeProps = PropsWithChildren<{
  variant?: keyof typeof styles;
  fitContent?: boolean;
}>;

export function Badge({
  children,
  variant = "brand",
  fitContent = false,
}: BadgeProps) {
  return (
    <span
      className={`typography-caption-r-bold box-border inline-flex w-fit shrink-0 items-center justify-center px-inset-small py-inset-micro whitespace-nowrap text-center ${fitContent ? "" : "h-unit-24"} ${styles[variant]}`}
    >
      {children}
    </span>
  );
}
