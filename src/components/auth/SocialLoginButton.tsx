import type { ComponentProps } from "react";
import googleIcon from "../../../assets/icons/google.svg";
import kakaoIcon from "../../../assets/icons/kakao.svg";
import type { SocialProvider } from "@/apis/auth.types";

// 카카오·구글 버튼 배경색은 각 회사의 로그인 버튼 가이드를 따르는 색이라
// Rallit 디자인 토큰에 없습니다. Rallit-FE와 같은 값을 씁니다.
const providers: Record<
  SocialProvider,
  { label: string; icon: string; background: string }
> = {
  kakao: {
    label: "카카오로 시작하기",
    icon: kakaoIcon,
    background: "bg-[#ffe812]",
  },
  google: {
    label: "Google로 계속하기",
    icon: googleIcon,
    background: "bg-[#f6f7f8]",
  },
};

const baseStyles = [
  "typography-label-l-medium box-border flex h-12 w-full cursor-pointer appearance-none items-center justify-center",
  "gap-small rounded-md border-0 px-[10px] py-inset-medium text-fg-neutral-default",
  "state-overlay",
  "enabled:hover:state-overlay-hover enabled:active:state-overlay-pressed",
  "disabled:cursor-default",
].join(" ");

type SocialLoginButtonProps = Omit<
  ComponentProps<"button">,
  "children" | "type"
> & {
  provider: SocialProvider;
  loading?: boolean;
};

export function SocialLoginButton({
  provider,
  loading = false,
  className,
  ...props
}: SocialLoginButtonProps) {
  const { label, icon, background } = providers[provider];

  return (
    <button
      {...props}
      type="button"
      aria-busy={loading || undefined}
      className={[baseStyles, background, className].filter(Boolean).join(" ")}
    >
      <img src={icon} alt="" className="block size-5 shrink-0" />
      <span>{loading ? "처리 중…" : label}</span>
    </button>
  );
}
