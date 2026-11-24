import type {
  MatchProfile,
  RecommendedPlayer,
} from "@/apis/socialMatches.types";

// 가짜 사용자입니다. 실제 사용자 정보를 넣지 않습니다.
export const myProfileMock: MatchProfile = {
  ntrp: 2.5,
  gender: "남성",
  ageGroup: "30대",
  region: "서울 송파구",
  availableTimes: ["주말 오전", "평일 저녁"],
};

export const recommendedPlayersMock: RecommendedPlayer[] = [
  {
    id: "mock-player-1",
    nickname: "서브장인",
    ntrp: 2.5,
    gender: "남성",
    ageGroup: "30대",
    region: "서울 송파구",
    availableTimes: ["주말 오전"],
  },
  {
    id: "mock-player-2",
    nickname: "백핸드연습중",
    ntrp: 2.0,
    gender: "여성",
    ageGroup: "20대",
    region: "서울 강동구",
    availableTimes: ["평일 저녁", "주말 오후"],
  },
  {
    id: "mock-player-3",
    nickname: "주말랠리",
    ntrp: 3.0,
    gender: "남성",
    ageGroup: "30대",
    region: "서울 송파구",
    availableTimes: ["주말 오전", "주말 오후"],
  },
  {
    id: "mock-player-4",
    nickname: "김테스트",
    ntrp: 4.0,
    gender: "여성",
    ageGroup: "40대",
    region: "경기 성남시",
    availableTimes: ["평일 낮"],
  },
];
