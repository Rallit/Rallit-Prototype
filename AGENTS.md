# Rallit Prototype 작업 가이드

이 문서는 이 저장소에서 일하는 AI 에이전트를 위한 규칙입니다.

## 이 저장소

- Rallit(테니스 매칭 서비스)의 PM이 기능 아이디어를 빠르게 화면으로 만들어 보는 프로토타입 저장소입니다.
- 실서비스 코드(Rallit-FE, Rallit-BE)와는 별개이며, 여기서 만든 코드가 그대로 배포되지는 않습니다.
- 사용자는 개발 경험이 없는 PM일 수 있습니다. 설명은 쉬운 말로 하고, 바꾼 뒤에는 어느 주소에서 무엇을 확인하면 되는지 알려 주세요.

## 기술 스택과 명령어

- Vite, React 19, TypeScript, Tailwind CSS v4, react-router, Supabase
- 배포: Vercel

| 명령어           | 하는 일                                    |
| ---------------- | ------------------------------------------ |
| `npm run dev`    | 개발 서버 실행 (http://localhost:3002)     |
| `npm run format` | 코드 모양 정리                             |
| `npm run lint`   | 규칙 검사 (디자인 토큰 위반은 경고로 표시) |
| `npm run build`  | 타입 검사와 배포용 빌드                    |

작업을 마치면 `npm run format`, `npm run lint`, `npm run build`를 차례로 실행해 오류가 없는지 확인합니다.

## 폴더 구조

| 위치                   | 내용                                                     |
| ---------------------- | -------------------------------------------------------- |
| `src/features/<기능>/` | 기능별 화면, 전용 컴포넌트, `api.ts`, 목 데이터          |
| `src/components/`      | 여러 기능에서 함께 쓰는 컴포넌트 (필요할 때 만듭니다)    |
| `src/design-system/`   | Rallit-FE에서 가져온 공용 컴포넌트. 직접 고치지 않습니다 |
| `src/styles/`          | 디자인 토큰, 타이포그래피, Tailwind 테마                 |
| `src/lib/supabase.ts`  | Supabase 클라이언트                                      |
| `src/routes.tsx`       | 화면 경로 목록                                           |
| `supabase/migrations/` | 테이블과 권한 정책 SQL                                   |
| `assets/`              | 아이콘과 이미지                                          |

## 새 화면 추가하기

1. `src/features/<기능-이름>/`에 페이지 컴포넌트를 만듭니다.
2. `src/routes.tsx`에 경로를 추가합니다. `title`을 적으면 홈 화면 목록에도 나옵니다.
3. 화면 틀은 `PageLayout`과 `Header`로 잡습니다.
4. `src/features/example-matches/`를 참고 예시로 씁니다.

## 디자인 규칙

색상과 타이포그래피는 Rallit 디자인 토큰만 쓰는 것을 원칙으로 합니다. 어기면 `npm run lint`가 경고를 냅니다. 전체 목록과 실제 모습은 `/design-system` 화면에서 볼 수 있습니다.

### 색상

| 용도   | 클래스 예시                                                                                            |
| ------ | ------------------------------------------------------------------------------------------------------ |
| 글자   | `text-fg-neutral-default`, `text-fg-neutral-secondary`, `text-fg-brand-strong`, `text-fg-system-error` |
| 배경   | `bg-neutral-default`, `bg-neutral-weak`, `bg-primary-default`, `bg-secondary-inverse`                  |
| 테두리 | `border-stroke-neutral-default`, `border-stroke-brand-focus`                                           |

- Tailwind 기본 색상(`bg-gray-100`, `text-red-500`, `bg-white`)은 쓰지 않습니다.
- 임의 색상(`bg-[#ff0000]`, `style={{ color: "#333" }}`)도 쓰지 않습니다.
- 필요한 색이 토큰에 없으면 새 색을 만들지 말고, 가장 가까운 토큰을 쓴 뒤 사용자에게 알려 주세요. 디자이너에게 토큰 추가를 요청해야 하는 일입니다.

### 타이포그래피

- 글자 크기, 굵기, 줄 높이, 자간은 `typography-*` 클래스 하나로 정합니다. 예: `typography-title-bold`, `typography-body-regular`, `typography-caption-r-medium`
- `text-lg`, `text-[15px]`, `font-bold`, `leading-*`, `tracking-*`는 쓰지 않습니다.

### 간격과 모서리

- 요소 사이 간격: `gap-micro`, `gap-small`, `gap-medium`, `gap-large`, `gap-extra-large`
- 안쪽 여백: `p-inset-small`, `px-inset-large`, `py-inset-medium` 등
- 모서리: `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-pill`
- 간격과 모서리는 권장 사항입니다. 레이아웃에 필요한 너비와 높이(`h-[52px]` 등)는 자유롭게 정합니다.

### 컴포넌트

- 먼저 `src/design-system/`에서 찾습니다. 모양은 `/design-system` 화면의 컴포넌트 탭에서 확인합니다.
- 맞는 것이 없으면 자유롭게 새로 만듭니다. 한 기능에서만 쓰면 `src/features/<기능>/`, 여러 기능에서 쓰면 `src/components/`에 두는 것을 권장합니다.
- 새 컴포넌트도 위의 색상과 타이포그래피 규칙을 따릅니다.
- `src/design-system/`의 파일은 고치지 않습니다. 변형이 필요하면 감싸는 컴포넌트를 새로 만듭니다.
- 아이콘은 `assets/icons/`의 SVG를 import해서 `<img src={icon} alt="" />`로 씁니다.

## 데이터와 Supabase

- 화면 컴포넌트에서 Supabase를 직접 부르지 않습니다. `src/features/<기능>/api.ts`에 함수를 만들고, 화면은 그 함수만 부릅니다.
- Supabase 클라이언트는 `src/lib/supabase.ts`의 `supabase`만 씁니다. 환경변수가 없으면 `null`이므로, `api.ts`는 이때 목 데이터로 동작하게 만듭니다.
- 테이블을 만들거나 바꾸면 `supabase/migrations/<YYYYMMDDHHMMSS>_<설명>.sql` 파일로 SQL을 남깁니다.
- 같은 SQL 파일에서 RLS를 켜고 권한 정책을 함께 만듭니다. RLS를 켜고 정책이 없으면 조회 결과가 오류 없이 빈 목록으로 옵니다. 데이터가 안 보이면 정책부터 확인합니다.
- 브라우저 코드와 `.env.local`에는 publishable key만 넣습니다. secret key나 service_role key는 어디에도 넣지 않습니다.
- 실제 개인정보(실명, 전화번호, 계좌번호 등)는 저장하지 않습니다.

## Git

- 커밋과 push는 사용자가 요청할 때만 합니다.
- 커밋 메시지는 `feat: 매치 목록 화면 추가`처럼 `타입: 한국어 요약` 형식으로 씁니다. 타입은 `feat`, `fix`, `refactor`, `chore`, `docs` 중에서 고릅니다.
- `.env.local` 같은 환경변수 파일은 커밋하지 않습니다.

## 디자인 시스템 동기화

Rallit-FE의 변경을 가져오는 방법은 `src/design-system/README.md`에 있습니다. 사용자가 요청할 때만 진행합니다.
