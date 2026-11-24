import { PageLayout } from "@/design-system/PageLayout";
import { TextButton } from "@/design-system/TextButton";
import { useAuthContext } from "@/hooks/useAuthContext";

// 온보딩을 마치면 오는 서비스 홈입니다. 아직 내용 없이 비워 둡니다.
// 로그아웃 버튼은 다른 계정으로 로그인·온보딩을 다시 시험해 보기 위한 것입니다.
export default function HomePage() {
  const { logout } = useAuthContext();

  return (
    <PageLayout
      footer={
        <div className="flex justify-center py-inset-medium">
          <TextButton label="로그아웃" onClick={() => void logout()} />
        </div>
      }
    />
  );
}
