import type { ReactNode } from "react";
import { PageLayout } from "@/design-system/PageLayout";

type IntroScreenProps = {
  title: string;
  footer?: ReactNode;
};

export function IntroScreen({ title, footer }: IntroScreenProps) {
  return (
    <PageLayout
      footer={
        footer && (
          <div className="pb-[max(0px,calc(34px-env(safe-area-inset-bottom,0px)))]">
            {footer}
          </div>
        )
      }
    >
      <h1 className="typography-title-bold m-0 pt-20 whitespace-pre-line text-fg-neutral-default">
        {title}
      </h1>
      <div
        aria-hidden="true"
        className="mx-auto mt-18 aspect-square w-full max-w-[320px] bg-neutral-weak"
      />
    </PageLayout>
  );
}
