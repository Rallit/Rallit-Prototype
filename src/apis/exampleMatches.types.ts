// 화면에서 쓰는 타입은 camelCase입니다. DB 컬럼(snake_case)과의 변환은 exampleMatches.ts에서 합니다.
export type ExampleMatch = {
  id: string;
  title: string;
  courtName: string;
  /** "YYYY-MM-DD" */
  matchDate: string;
  level: string;
  createdAt: string;
};

export type NewExampleMatch = Pick<
  ExampleMatch,
  "title" | "courtName" | "matchDate" | "level"
>;
