// 소셜 로그인 뒤 돌아온 주소(/auth/callback)에 담긴 오류를 읽습니다.
// Supabase는 오류를 ?error=...&error_description=... 형태로 붙여 보냅니다.

/** 오류가 있으면 사용자에게 보여 줄 문구를, 없으면 null을 돌려줍니다. */
export function getCallbackError(location: {
  search: string;
  hash: string;
}): string | null {
  const params = new URLSearchParams(location.search);
  const hash = new URLSearchParams(location.hash.replace(/^#/, ""));
  const error = params.get("error") ?? hash.get("error");
  if (error === null) return null;

  if (error === "access_denied") {
    return "로그인이 취소되었어요. 다시 시도해 주세요.";
  }

  const description =
    params.get("error_description") ?? hash.get("error_description");
  if (description?.toLowerCase().includes("email")) {
    return "소셜 계정의 인증된 이메일 제공 동의를 확인해주세요.";
  }

  return "로그인에 실패했습니다. 다시 시도해주세요.";
}
