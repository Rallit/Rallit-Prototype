import type { ComponentProps } from "react";
import { Profile } from "./Profile";

type NotificationProps = Omit<
  ComponentProps<"button">,
  "children" | "type" | "title"
> & {
  title: string;
  description: string;
  time: string;
  imageSrc?: string | null;
  profile?: boolean;
  isNew?: boolean;
};

export function Notification({
  title,
  description,
  time,
  imageSrc,
  profile = true,
  isNew = false,
  className,
  ...props
}: NotificationProps) {
  return (
    <button
      {...props}
      type="button"
      className={[
        "box-border flex h-20 w-full cursor-pointer appearance-none items-start gap-large border-0 p-inset-large text-start",
        "state-overlay active:state-overlay-pressed",
        isNew ? "bg-neutral-weak" : "bg-neutral-default",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="flex min-w-0 flex-1 items-center gap-medium">
        {profile && <Profile src={imageSrc} size="S" />}
        <span className="flex min-w-0 flex-1 flex-col gap-micro">
          <span className="typography-body-medium truncate text-fg-neutral-default">
            {isNew && <span className="sr-only">새 알림 </span>}
            {title}
          </span>
          <span className="typography-label-r-regular truncate text-fg-neutral-secondary">
            {description}
          </span>
        </span>
      </span>
      <span className="typography-label-r-regular shrink-0 whitespace-nowrap text-fg-neutral-subtle">
        {time}
      </span>
    </button>
  );
}
