import { useEffect, useState } from "react";

// Rallit-FE의 src/hooks/useOnboardingProfilePhoto.ts를 mock 모드 동작으로 옮겼습니다.
// 프로토타입은 사진을 서버에 올리지 않고 이 화면에서 미리보기만 합니다.
// (실제 얼굴 사진 같은 개인정보를 Supabase에 저장하지 않기 위해서입니다)
export function useOnboardingProfilePhoto() {
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (photoUrl) return () => URL.revokeObjectURL(photoUrl);
  }, [photoUrl]);

  return {
    photoUrl,
    isUploading: false,
    uploadError: "",
    selectPhoto: (file: File) => setPhotoUrl(URL.createObjectURL(file)),
  };
}
