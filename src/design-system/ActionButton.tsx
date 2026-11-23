import type { ComponentProps } from "react";

type ActionButtonVariantProps =
  | { variant?: "primary" | "tertiary"; size?: "S" | "M" }
  | { variant: "secondary"; size?: "M" };

export type ActionButtonProps = ComponentProps<"button"> &
  ActionButtonVariantProps & { fullWidth?: boolean };

const baseStyles = [
  "action-button box-border inline-flex cursor-pointer appearance-none items-center justify-center border-0 text-center",
  "state-overlay",
  "enabled:hover:state-overlay-hover enabled:active:state-overlay-pressed",
  "disabled:cursor-default disabled:bg-state-disabled disabled:text-fg-neutral-subtle",
].join(" ");

const variantStyles = {
  primary: "bg-primary-default text-fg-neutral-default",
  secondary: "bg-primary-inverse text-fg-brand-strong",
  tertiary: "bg-neutral-weak text-fg-neutral-default",
};

const sizeStyles = {
  S: "typography-label-r-medium h-[36px] min-w-[56px] rounded-sm px-inset-large py-inset-small",
  M: "typography-label-l-medium h-[48px] min-w-[76px] rounded-md px-inset-extra-large py-inset-medium",
};

export function ActionButton({
  variant = "primary",
  size = variant === "secondary" ? "M" : "S",
  type = "button",
  fullWidth = false,
  className,
  ...props
}: ActionButtonProps) {
  const classes = [
    baseStyles,
    variantStyles[variant],
    sizeStyles[size],
    fullWidth ? "w-full" : "w-fit",
    className,
  ].filter(Boolean);

  return (
    <button
      {...props}
      type={type}
      className={classes.join(" ")}
      data-variant={variant}
      data-size={size}
      data-full-width={fullWidth || undefined}
    />
  );
}
