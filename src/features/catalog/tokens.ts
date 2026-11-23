// 카탈로그에 보여 줄 디자인 토큰 목록입니다.
// 클래스 이름은 src/styles/tailwind-theme.css에 등록된 이름과 같아야 합니다.

export type ColorToken = {
  className: string;
  cssVar: string;
  usage: string;
};

export const textColors: ColorToken[] = [
  {
    className: "text-fg-neutral-strong",
    cssVar: "--fg-neutral-strong",
    usage: "가장 진한 글자, 큰 제목",
  },
  {
    className: "text-fg-neutral-default",
    cssVar: "--fg-neutral-default",
    usage: "기본 글자",
  },
  {
    className: "text-fg-neutral-secondary",
    cssVar: "--fg-neutral-secondary",
    usage: "보조 글자, 라벨",
  },
  {
    className: "text-fg-neutral-tertiary",
    cssVar: "--fg-neutral-tertiary",
    usage: "설명, 캡션",
  },
  {
    className: "text-fg-neutral-subtle",
    cssVar: "--fg-neutral-subtle",
    usage: "비활성 글자, 입력 안내 문구",
  },
  {
    className: "text-fg-neutral-inverse",
    cssVar: "--fg-neutral-inverse",
    usage: "어두운 배경 위 글자",
  },
  {
    className: "text-fg-brand-strong",
    cssVar: "--fg-brand-strong",
    usage: "브랜드 강조 글자",
  },
  {
    className: "text-fg-brand-default",
    cssVar: "--fg-brand-default",
    usage: "브랜드 글자",
  },
  {
    className: "text-fg-accent-default",
    cssVar: "--fg-accent-default",
    usage: "파란 강조 글자",
  },
  {
    className: "text-fg-accent-assistive",
    cssVar: "--fg-accent-assistive",
    usage: "빨간 강조 글자, 삭제 같은 위험한 동작",
  },
  {
    className: "text-fg-system-error",
    cssVar: "--fg-system-error",
    usage: "오류 메시지",
  },
];

export const backgroundColors: ColorToken[] = [
  {
    className: "bg-primary-default",
    cssVar: "--bg-primary-default",
    usage: "주요 버튼",
  },
  {
    className: "bg-primary-strong",
    cssVar: "--bg-primary-strong",
    usage: "진한 브랜드 배경, 선택된 체크박스",
  },
  {
    className: "bg-primary-inverse",
    cssVar: "--bg-primary-inverse",
    usage: "연한 브랜드 배경",
  },
  {
    className: "bg-secondary-default",
    cssVar: "--bg-secondary-default",
    usage: "파란 배경, 선택된 칩",
  },
  {
    className: "bg-secondary-inverse",
    cssVar: "--bg-secondary-inverse",
    usage: "연한 파란 배경, 안내 박스",
  },
  {
    className: "bg-neutral-default",
    cssVar: "--bg-neutral-default",
    usage: "기본 흰 배경, 카드",
  },
  {
    className: "bg-neutral-weak",
    cssVar: "--bg-neutral-weak",
    usage: "연한 회색 배경, 페이지 배경",
  },
  {
    className: "bg-neutral-inverse",
    cssVar: "--bg-neutral-inverse",
    usage: "어두운 배경",
  },
  {
    className: "bg-state-disabled",
    cssVar: "--bg-state-disabled",
    usage: "비활성 배경",
  },
  {
    className: "bg-system-error",
    cssVar: "--bg-system-error",
    usage: "오류 배경",
  },
  {
    className: "bg-system-alert",
    cssVar: "--bg-system-alert",
    usage: "알림 배경",
  },
  {
    className: "bg-layer-overlay",
    cssVar: "--bg-layer-overlay",
    usage: "모달 뒤의 어두운 막",
  },
];

export const borderColors: ColorToken[] = [
  {
    className: "border-stroke-neutral-default",
    cssVar: "--border-neutral-default",
    usage: "기본 테두리, 구분선",
  },
  {
    className: "border-stroke-neutral-weak",
    cssVar: "--border-neutral-weak",
    usage: "연한 테두리",
  },
  {
    className: "border-stroke-system-error",
    cssVar: "--border-system-error",
    usage: "오류 테두리",
  },
  {
    className: "border-stroke-brand-focus",
    cssVar: "--border-brand-focus",
    usage: "포커스 테두리",
  },
];

export type TypographyToken = {
  className: string;
  spec: string;
  usage: string;
};

export const typography: TypographyToken[] = [
  {
    className: "typography-title-bold",
    spec: "22 / 30 · 600",
    usage: "화면의 가장 큰 제목",
  },
  {
    className: "typography-heading-bold",
    spec: "20 / 28 · 600",
    usage: "섹션 제목",
  },
  {
    className: "typography-headline-bold",
    spec: "18 / 26 · 600",
    usage: "카드 제목",
  },
  {
    className: "typography-body-bold",
    spec: "16 / 24 · 600",
    usage: "강조 본문",
  },
  { className: "typography-body-medium", spec: "16 / 24 · 500", usage: "본문" },
  {
    className: "typography-body-regular",
    spec: "16 / 24 · 400",
    usage: "본문",
  },
  {
    className: "typography-label-l-bold",
    spec: "16 / 22 · 600",
    usage: "큰 라벨, 버튼",
  },
  {
    className: "typography-label-l-medium",
    spec: "16 / 22 · 500",
    usage: "큰 라벨, 버튼",
  },
  {
    className: "typography-label-l-regular",
    spec: "16 / 22 · 400",
    usage: "큰 라벨",
  },
  {
    className: "typography-label-r-bold",
    spec: "14 / 20 · 600",
    usage: "라벨",
  },
  {
    className: "typography-label-r-medium",
    spec: "14 / 20 · 500",
    usage: "라벨, 작은 버튼",
  },
  {
    className: "typography-label-r-regular",
    spec: "14 / 20 · 400",
    usage: "라벨, 보조 정보",
  },
  {
    className: "typography-caption-r-bold",
    spec: "12 / 18 · 600",
    usage: "배지",
  },
  {
    className: "typography-caption-r-medium",
    spec: "12 / 18 · 500",
    usage: "캡션",
  },
  {
    className: "typography-caption-r-regular",
    spec: "12 / 18 · 400",
    usage: "캡션, 안내 문구",
  },
  {
    className: "typography-caption-s-medium",
    spec: "11 / 18 · 500",
    usage: "가장 작은 글자",
  },
  {
    className: "typography-caption-s-regular",
    spec: "11 / 18 · 400",
    usage: "가장 작은 글자",
  },
];

export type SizeToken = {
  className: string;
  cssVar: string;
  px: number;
};

export const gaps: SizeToken[] = [
  { className: "gap-micro", cssVar: "--spacing-gap-micro", px: 4 },
  { className: "gap-small", cssVar: "--spacing-gap-small", px: 8 },
  { className: "gap-medium", cssVar: "--spacing-gap-medium", px: 12 },
  { className: "gap-large", cssVar: "--spacing-gap-large", px: 20 },
  { className: "gap-extra-large", cssVar: "--spacing-gap-extra-large", px: 32 },
];

export const paddings: SizeToken[] = [
  { className: "p-inset-micro", cssVar: "--spacing-padding-micro", px: 4 },
  { className: "p-inset-small", cssVar: "--spacing-padding-small", px: 8 },
  { className: "p-inset-medium", cssVar: "--spacing-padding-medium", px: 12 },
  { className: "p-inset-large", cssVar: "--spacing-padding-large", px: 16 },
  {
    className: "p-inset-large-plus",
    cssVar: "--spacing-padding-large-plus",
    px: 20,
  },
  {
    className: "p-inset-extra-large",
    cssVar: "--spacing-padding-extra-large",
    px: 24,
  },
];

export const radii: SizeToken[] = [
  { className: "rounded-sm", cssVar: "--radius-small", px: 8 },
  { className: "rounded-md", cssVar: "--radius-medium", px: 12 },
  { className: "rounded-lg", cssVar: "--radius-large", px: 16 },
  { className: "rounded-xl", cssVar: "--radius-extra-large", px: 32 },
  { className: "rounded-pill", cssVar: "--radius-full", px: 99 },
];
