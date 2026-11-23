import { useEffect, useId, useRef } from "react";
import { ActionButton } from "./ActionButton";

type DialogProps = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmDisabled?: boolean;
};

export function Dialog({
  open,
  title,
  description,
  confirmLabel,
  cancelLabel = "취소",
  onConfirm,
  onCancel,
  confirmDisabled = false,
}: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      aria-describedby={description ? descriptionId : undefined}
      onCancel={(event) => {
        event.preventDefault();
        onCancel();
      }}
      className="fixed inset-0 m-0 box-border h-dvh max-h-none w-full max-w-none place-items-center overflow-hidden border-0 bg-transparent p-0 open:grid backdrop:bg-transparent"
    >
      <div
        aria-hidden="true"
        onClick={onCancel}
        className="absolute inset-0 bg-layer-overlay"
      />
      <div className="relative box-border w-[312px] max-w-[calc(100%-64px)] overflow-hidden rounded-lg bg-neutral-default text-fg-neutral-default">
        <div className="flex flex-col gap-small px-inset-extra-large pt-inset-extra-large">
          <h2
            id={titleId}
            className="typography-heading-bold m-0 line-clamp-2 break-keep"
          >
            {title}
          </h2>
          {description && (
            <p
              id={descriptionId}
              className="typography-body-regular m-0 line-clamp-2 break-keep text-fg-neutral-secondary"
            >
              {description}
            </p>
          )}
        </div>
        <div className="flex gap-small p-inset-large">
          <ActionButton
            variant="tertiary"
            size="M"
            onClick={onCancel}
            className="flex-1"
          >
            {cancelLabel}
          </ActionButton>
          <ActionButton
            size="M"
            disabled={confirmDisabled}
            onClick={onConfirm}
            className="flex-1"
          >
            {confirmLabel}
          </ActionButton>
        </div>
      </div>
    </dialog>
  );
}
