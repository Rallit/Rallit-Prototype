const weekdays = ["일", "월", "화", "수", "목", "금", "토"];

/** "2026-12-05" -> "12월 5일 (토)" */
export function formatMatchDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  const weekday = weekdays[new Date(year, month - 1, day).getDay()];
  return `${month}월 ${day}일 (${weekday})`;
}

/** 오늘로부터 days일 뒤의 날짜를 "YYYY-MM-DD"로 돌려줍니다. */
export function dateAfter(days: number) {
  const date = new Date();
  date.setDate(date.getDate() + days);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function errorMessage(error: unknown) {
  if (error && typeof error === "object" && "message" in error) {
    return String(error.message);
  }
  return String(error);
}
