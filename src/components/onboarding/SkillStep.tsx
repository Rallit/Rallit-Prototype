import type { SkillDraft } from "@/features/onboarding/form";
import { NtrpPicker } from "./NtrpPicker";
import { TennisStartPicker } from "./TennisStartPicker";

type SkillStepProps = {
  value: SkillDraft;
  onChange: (value: SkillDraft) => void;
};

export function SkillStep({ value, onChange }: SkillStepProps) {
  return (
    <div className="mt-extra-large grid gap-large pb-inset-large">
      <TennisStartPicker
        value={value.tennisStart}
        onChange={(tennisStart) => onChange({ ...value, tennisStart })}
      />
      <NtrpPicker
        value={value.ntrp}
        onChange={(ntrp) => onChange({ ...value, ntrp })}
      />
    </div>
  );
}
