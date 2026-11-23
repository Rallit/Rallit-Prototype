import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { BottomCTA } from "@/design-system/BottomCTA";
import { Calendar } from "@/design-system/Calendar";
import { Header } from "@/design-system/Header";
import { PageLayout } from "@/design-system/PageLayout";
import { SelectionChip } from "@/design-system/SelectionChip";
import { TextInputField } from "@/design-system/TextInputField";
import { Toast } from "@/design-system/Toast";
import toastAlertIcon from "../../../assets/icons/toast-alert-round.svg";
import { createExampleMatch } from "./api";
import { dateAfter, errorMessage } from "./format";
import { LEVELS } from "./types";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="grid gap-small">
      <span className="typography-label-r-medium text-fg-neutral-secondary">
        {label}
      </span>
      {children}
    </label>
  );
}

export function ExampleMatchCreatePage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [courtName, setCourtName] = useState("");
  const [matchDate, setMatchDate] = useState<string | null>(null);
  const [level, setLevel] = useState<string>(LEVELS[1]);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const canSubmit =
    title.trim() !== "" && courtName.trim() !== "" && matchDate !== null;

  async function submit() {
    if (!canSubmit || submitting) return;
    setSubmitting(true);
    try {
      await createExampleMatch({
        title: title.trim(),
        court_name: courtName.trim(),
        match_date: matchDate,
        level,
      });
      void navigate("/examples/matches", { replace: true });
    } catch (error) {
      setToast(`등록하지 못했어요: ${errorMessage(error)}`);
      setSubmitting(false);
    }
  }

  return (
    <PageLayout
      header={
        <Header
          variant="subpage"
          title="매치 만들기"
          onBack={() => void navigate(-1)}
        />
      }
      footer={
        <div className="relative py-inset-medium">
          <Toast
            message={toast}
            icon={toastAlertIcon}
            onDismiss={() => setToast(null)}
            className="absolute inset-x-inset-large bottom-[calc(100%+8px)]"
          />
          <BottomCTA
            primaryAction={{
              children: submitting ? "등록하는 중..." : "등록하기",
              disabled: !canSubmit || submitting,
              onClick: () => void submit(),
            }}
          />
        </div>
      }
    >
      <div className="flex flex-col gap-large py-inset-large">
        <Field label="매치 이름">
          <TextInputField
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="예: 토요일 아침 복식 한 판"
          />
        </Field>

        <Field label="코트">
          <TextInputField
            value={courtName}
            onChange={(event) => setCourtName(event.target.value)}
            placeholder="예: 올림픽공원 테니스장"
          />
        </Field>

        <div className="grid gap-small">
          <span className="typography-label-r-medium text-fg-neutral-secondary">
            실력
          </span>
          <div className="flex flex-wrap gap-small">
            {LEVELS.map((option) => (
              <SelectionChip
                key={option}
                label={option}
                selected={level === option}
                onClick={() => setLevel(option)}
              />
            ))}
          </div>
        </div>

        <div className="grid gap-small">
          <span className="typography-label-r-medium text-fg-neutral-secondary">
            날짜
          </span>
          <Calendar
            value={matchDate}
            onChange={setMatchDate}
            min={dateAfter(0)}
            max={dateAfter(60)}
          />
        </div>
      </div>
    </PageLayout>
  );
}
