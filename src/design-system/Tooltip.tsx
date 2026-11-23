import type { ComponentProps } from "react";

type TooltipProps = Pick<ComponentProps<"div">, "children" | "id" | "ref">;

export function Tooltip({ children, id, ref }: TooltipProps) {
  return (
    <div
      id={id}
      ref={ref}
      role="tooltip"
      className="typography-caption-r-medium pointer-events-auto box-border w-max max-w-[min(320px,100%)] rounded-md rounded-br-none bg-neutral-weak px-inset-large py-inset-medium text-center break-keep whitespace-pre-line text-fg-neutral-secondary"
    >
      {children}
    </div>
  );
}
