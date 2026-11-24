import type { PlayerRecord, RankingPeriod } from "@/apis/rankings.types";

// 경기 결과 테이블을 만들기 전까지 보여 줄 가짜 선수 기록입니다.
// 이름은 모두 지어낸 닉네임입니다.

type MockPlayer = Pick<PlayerRecord, "playerId" | "nickname" | "ntrp"> & {
  /** 기간별 [승, 패] */
  records: Record<RankingPeriod, [number, number]>;
};

const players: MockPlayer[] = [
  {
    playerId: "p1",
    nickname: "포핸드장인",
    ntrp: "4.0+",
    records: { week: [4, 0], month: [14, 3], all: [58, 17] },
  },
  {
    playerId: "p2",
    nickname: "새벽랠리",
    ntrp: "3.5",
    records: { week: [3, 1], month: [12, 4], all: [61, 22] },
  },
  {
    playerId: "p3",
    nickname: "발리요정",
    ntrp: "3.5",
    records: { week: [3, 0], month: [11, 2], all: [40, 12] },
  },
  {
    playerId: "p4",
    nickname: "서브에이스",
    ntrp: "4.0+",
    records: { week: [2, 2], month: [10, 6], all: [52, 30] },
  },
  {
    playerId: "p5",
    nickname: "주말테린이",
    ntrp: "2.5",
    records: { week: [3, 2], month: [9, 5], all: [22, 18] },
  },
  {
    playerId: "p6",
    nickname: "탑스핀",
    ntrp: "3.0",
    records: { week: [1, 1], month: [9, 3], all: [35, 20] },
  },
  {
    playerId: "p7",
    nickname: "라켓소년",
    ntrp: "3.0",
    records: { week: [2, 0], month: [8, 4], all: [30, 15] },
  },
  {
    playerId: "p8",
    nickname: "백핸드연습중",
    ntrp: "2.5",
    records: { week: [2, 1], month: [7, 6], all: [18, 21] },
  },
  {
    playerId: "p9",
    nickname: "코트위의별",
    ntrp: "3.5",
    records: { week: [1, 2], month: [7, 3], all: [44, 26] },
  },
  {
    playerId: "p10",
    nickname: "로브마스터",
    ntrp: "3.0",
    records: { week: [2, 2], month: [6, 5], all: [27, 24] },
  },
  {
    playerId: "p11",
    nickname: "슬라이스",
    ntrp: "2.0",
    records: { week: [1, 0], month: [5, 4], all: [12, 14] },
  },
  {
    playerId: "p12",
    nickname: "퇴근후테니스",
    ntrp: "2.5",
    records: { week: [0, 2], month: [5, 7], all: [20, 25] },
  },
  {
    playerId: "p13",
    nickname: "듀스",
    ntrp: "2.0",
    records: { week: [1, 1], month: [4, 4], all: [9, 11] },
  },
  {
    playerId: "p14",
    nickname: "올림픽공원러",
    ntrp: "3.0",
    records: { week: [0, 1], month: [3, 5], all: [25, 19] },
  },
  {
    playerId: "p15",
    nickname: "초보탈출",
    ntrp: "1.5",
    records: { week: [1, 3], month: [2, 6], all: [5, 13] },
  },
];

export function playerRecordsMock(period: RankingPeriod): PlayerRecord[] {
  return players.map(({ records, ...player }) => ({
    ...player,
    wins: records[period][0],
    losses: records[period][1],
  }));
}
