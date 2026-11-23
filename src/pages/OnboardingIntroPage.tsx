import { useNavigate } from "react-router";
import { ServiceIntro } from "@/components/intro/ServiceIntro";
import { ONBOARDING_PATH } from "@/features/auth/paths";
import { useAuthContext } from "@/hooks/useAuthContext";

// Rallit-FE App.tsx의 OnboardingIntroRoute입니다. 처음 가입한 사용자가 온보딩 전에 봅니다.
export default function OnboardingIntroPage() {
  const { authState } = useAuthContext();
  const navigate = useNavigate();

  return (
    <ServiceIntro
      displayName={
        authState.status === "authenticated"
          ? authState.user.socialDisplayName
          : null
      }
      onStart={() => void navigate(ONBOARDING_PATH)}
    />
  );
}
