import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router";
import { Header } from "@/design-system/Header";
import { PageLayout } from "@/design-system/PageLayout";
import { SelectionChip } from "@/design-system/SelectionChip";
import { ComponentShowcase } from "@/components/catalog/ComponentShowcase";
import {
  backgroundColors,
  borderColors,
  gaps,
  paddings,
  radii,
  textColors,
  typography,
  type ColorToken,
  type SizeToken,
} from "@/features/catalog/tokens";

const sections = ["색상", "타이포그래피", "간격·모서리", "컴포넌트"] as const;
type Section = (typeof sections)[number];

function SectionTitle({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col gap-micro">
      <h2 className="typography-heading-bold m-0 text-fg-neutral-strong">
        {title}
      </h2>
      <p className="typography-label-r-regular m-0 text-fg-neutral-secondary">
        {description}
      </p>
    </div>
  );
}

function ColorList({ title, tokens }: { title: string; tokens: ColorToken[] }) {
  return (
    <section className="flex flex-col gap-medium rounded-lg bg-neutral-default p-inset-large">
      <h3 className="typography-headline-bold m-0 text-fg-neutral-strong">
        {title}
      </h3>
      <ul className="m-0 flex list-none flex-col gap-medium p-0">
        {tokens.map((token) => (
          <li key={token.className} className="flex items-center gap-medium">
            <span
              aria-hidden="true"
              className="size-unit-32 shrink-0 rounded-sm border border-solid border-stroke-neutral-weak"
              style={{ background: `var(${token.cssVar})` }}
            />
            <span className="flex min-w-0 flex-col">
              <code className="typography-label-r-medium text-fg-neutral-default">
                {token.className}
              </code>
              <span className="typography-caption-r-regular text-fg-neutral-tertiary">
                {token.usage}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SizeList({
  title,
  tokens,
  render,
}: {
  title: string;
  tokens: SizeToken[];
  render: (token: SizeToken) => ReactNode;
}) {
  return (
    <section className="flex flex-col gap-medium rounded-lg bg-neutral-default p-inset-large">
      <h3 className="typography-headline-bold m-0 text-fg-neutral-strong">
        {title}
      </h3>
      <ul className="m-0 flex list-none flex-col gap-medium p-0">
        {tokens.map((token) => (
          <li key={token.className} className="flex items-center gap-medium">
            {render(token)}
            <code className="typography-label-r-medium text-fg-neutral-default">
              {token.className}
            </code>
            <span className="typography-caption-r-regular text-fg-neutral-tertiary">
              {token.px}px
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function DesignSystemPage() {
  const navigate = useNavigate();
  const [section, setSection] = useState<Section>("색상");

  return (
    <PageLayout
      background="weak"
      header={
        <Header
          variant="subpage"
          title="디자인 시스템"
          onBack={() => void navigate("/")}
        />
      }
    >
      <div className="flex flex-col gap-large py-inset-large">
        <div className="flex flex-wrap gap-small">
          {sections.map((item) => (
            <SelectionChip
              key={item}
              label={item}
              selected={section === item}
              onClick={() => setSection(item)}
            />
          ))}
        </div>

        {section === "색상" && (
          <>
            <SectionTitle
              title="색상"
              description="아래 클래스만 쓰는 걸 권장해요. Tailwind 기본 색상(bg-gray-100 등)은 쓰지 않아요."
            />
            <ColorList title="글자 (text-)" tokens={textColors} />
            <ColorList title="배경 (bg-)" tokens={backgroundColors} />
            <ColorList title="테두리 (border-)" tokens={borderColors} />
          </>
        )}

        {section === "타이포그래피" && (
          <>
            <SectionTitle
              title="타이포그래피"
              description="글자 크기, 굵기, 줄 높이는 typography-* 클래스 하나로 정해요. 크기 / 줄 높이 · 굵기 순서로 적었어요."
            />
            <section className="flex flex-col gap-large rounded-lg bg-neutral-default p-inset-large">
              {typography.map((token) => (
                <div key={token.className} className="flex flex-col gap-micro">
                  <p
                    className={`${token.className} m-0 text-fg-neutral-default`}
                  >
                    랠릿에서 테니스 매치 찾기
                  </p>
                  <code className="typography-caption-r-medium text-fg-neutral-secondary">
                    {token.className}
                  </code>
                  <span className="typography-caption-r-regular text-fg-neutral-tertiary">
                    {token.spec} · {token.usage}
                  </span>
                </div>
              ))}
            </section>
          </>
        )}

        {section === "간격·모서리" && (
          <>
            <SectionTitle
              title="간격·모서리"
              description="요소 사이 간격은 gap-*, 안쪽 여백은 p-inset-* (px-, py-도 가능), 모서리는 rounded-*를 써요."
            />
            <SizeList
              title="요소 사이 간격"
              tokens={gaps}
              render={(token) => (
                <span
                  aria-hidden="true"
                  className="h-unit-16 shrink-0 rounded-sm bg-secondary-default"
                  style={{ width: `var(${token.cssVar})` }}
                />
              )}
            />
            <SizeList
              title="안쪽 여백"
              tokens={paddings}
              render={(token) => (
                <span
                  aria-hidden="true"
                  className="h-unit-16 shrink-0 rounded-sm bg-primary-default"
                  style={{ width: `var(${token.cssVar})` }}
                />
              )}
            />
            <SizeList
              title="모서리"
              tokens={radii}
              render={(token) => (
                <span
                  aria-hidden="true"
                  className="size-unit-32 shrink-0 bg-primary-inverse"
                  style={{ borderRadius: `var(${token.cssVar})` }}
                />
              )}
            />
          </>
        )}

        {section === "컴포넌트" && (
          <>
            <SectionTitle
              title="컴포넌트"
              description="src/design-system에 있는 Rallit-FE 컴포넌트예요. 새로 만들기 전에 여기서 먼저 찾아 주세요."
            />
            <ComponentShowcase />
          </>
        )}
      </div>
    </PageLayout>
  );
}
