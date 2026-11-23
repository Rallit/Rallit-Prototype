import { useEffect, useEffectEvent } from "react";
import checkIcon from "../../assets/icons/toast-check-round.svg";
import { ActionButton } from "./ActionButton";

type ToastAction = {
  label: string;
  onClick?: () => void;
};

type ToastProps = {
  message: string | null;
  onDismiss?: () => void;
  durationMs?: number;
  icon?: string;
  action?: ToastAction;
  className?: string;
};

export function Toast({
  message,
  onDismiss,
  durationMs = 3000,
  icon = checkIcon,
  action,
  className,
}: ToastProps) {
  const dismiss = useEffectEvent(() => onDismiss?.());
  const autoDismiss = onDismiss !== undefined;

  useEffect(() => {
    if (!message || !autoDismiss) return;

    const timeout = window.setTimeout(() => dismiss(), durationMs);
    return () => window.clearTimeout(timeout);
  }, [message, durationMs, autoDismiss]);

  return (
    <div role="status" className={className}>
      {message && (
        <div className="box-border inline-flex h-12 w-fit max-w-full items-center gap-small rounded-pill bg-neutral-default pr-inset-large pl-inset-medium shadow-toast">
          <img src={icon} alt="" className="block shrink-0" />
          <span className="typography-body-medium min-w-0 truncate text-fg-neutral-default">
            {message}
          </span>
          {action && (
            <ActionButton
              variant="tertiary"
              size="S"
              onClick={action.onClick}
              aria-disabled={!action.onClick || undefined}
              tabIndex={action.onClick ? undefined : -1}
              className="shrink-0 aria-disabled:pointer-events-none"
            >
              {action.label}
            </ActionButton>
          )}
        </div>
      )}
    </div>
  );
}
