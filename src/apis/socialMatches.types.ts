/** 추천에 쓰는 프로필 정보입니다. 나와 상대 모두 같은 항목을 씁니다. */
export type MatchProfile = {
  ntrp: number;
  gender: "남성" | "여성";
  ageGroup: string;
  /** 예: "서울 송파구" */
  region: string;
  /** 예: "주말 오전", "평일 저녁" */
  availableTimes: string[];
};

export type RecommendedPlayer = MatchProfile & {
  id: string;
  nickname: string;
};
