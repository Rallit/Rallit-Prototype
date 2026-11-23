# Rallit Prototype 작업 가이드

이 문서는 이 저장소에서 일하는 AI 에이전트를 위한 규칙입니다.

## 이 저장소

- Rallit(테니스 매칭 서비스)의 PM이 기능 아이디어를 빠르게 화면으로 만들어 보는 프로토타입 저장소입니다.
- 실서비스 코드(Rallit-FE, Rallit-BE)와는 별개이며, 여기서 만든 코드가 그대로 배포되지는 않습니다.
- 사용자는 개발 경험이 없는 PM일 수 있습니다. 설명은 쉬운 말로 하고, 바꾼 뒤에는 어느 주소에서 무엇을 확인하면 되는지 알려 주세요.

## 기술 스택과 명령어

- Vite, React 19, TypeScript, Tailwind CSS v4, react-router, Supabase
- 배포: Vercel

| 명령어           | 하는 일                                |
| ---------------- | -------------------------------------- |
| `npm run dev`    | 개발 서버 실행 (http://localhost:3002) |
| `npm run format` | 코드 모양 정리                         |
| `npm run lint`   | 규칙 검사 (아래 "린트 규칙" 참고)      |
| `npm run build`  | 타입 검사와 배포용 빌드                |

작업을 마치면 `npm run format`, `npm run lint`, `npm run build`를 차례로 실행해 오류가 없는지 확인합니다.

## 폴더 구조

Rallit-FE와 같은 구조를 씁니다. 파일 위치와 이름은 `npm run lint`가 검사하며, 어기면 오류입니다.

| 위치                         | 둘 것                                                                        | 예                                                    |
| ---------------------------- | ---------------------------------------------------------------------------- | ----------------------------------------------------- |
| `src/pages/XxxPage.tsx`      | 화면. 경로 하나에 파일 하나, `export default`                                | `LoginPage.tsx`, `ExampleMatchListPage.tsx`           |
| `src/components/<도메인>/`   | 화면 조각. `PascalCase.tsx`, `export function`                               | `onboarding/SkillStep.tsx`, `auth/ProtectedRoute.tsx` |
| `src/components/common/`     | 여러 도메인이 함께 쓰는 화면 조각                                            |                                                       |
| `src/features/<도메인>/`     | 화면이 아닌 로직만 (`.ts`). 폼 상태, 계산, 날짜 형식, 경로 상수, 선택지 목록 | `onboarding/form.ts`, `auth/paths.ts`                 |
| `src/apis/<도메인>.ts`       | 데이터를 읽고 쓰는 함수. Supabase는 여기서만 부릅니다                        | `exampleMatches.ts`                                   |
| `src/apis/<도메인>.types.ts` | 화면에서 쓰는 데이터 타입 (camelCase)                                        | `exampleMatches.types.ts`                             |
| `src/mocks/<도메인>.ts`      | Supabase가 없을 때 apis 함수가 돌려줄 목 데이터                              | `exampleMatches.ts`                                   |
| `src/hooks/useXxx.ts`        | 여러 화면이 함께 쓰는 상태 로직                                              | `useAuth.ts`, `useOnboardingNickname.ts`              |
| `src/contexts/`              | 앱 전체가 공유하는 상태 (`XxxContext.ts`, `XxxProvider.tsx`)                 | `AuthProvider.tsx`                                    |
| `src/lib/`                   | Supabase 클라이언트와 환경변수                                               | `supabase.ts`                                         |
| `src/design-system/`         | Rallit-FE에서 가져온 공용 컴포넌트. 직접 고치지 않습니다                     |                                                       |
| `src/styles/`                | 디자인 토큰, 타이포그래피, Tailwind 테마                                     |                                                       |
| `src/routes.tsx`             | 화면 경로 목록                                                               |                                                       |
| `supabase/migrations/`       | 테이블과 권한 정책 SQL                                                       |                                                       |
| `assets/`                    | 아이콘과 이미지                                                              |                                                       |
| `eslint-rules/`              | 폴더 규칙을 검사하는 린트 규칙                                               |                                                       |

- 도메인 폴더 이름은 kebab-case로 씁니다. 예: `example-matches`, `match-request`
- 같은 폴더 안의 파일은 `./`로, 다른 폴더의 파일은 `@/`로 가져옵니다. `../`는 `assets/`를 가져올 때만 씁니다.

### 가져오는 방향

각 폴더는 아래 표에 적힌 곳에서만 가져옵니다. 다른 곳에서 가져오면 `npm run lint`가 경고를 냅니다.

| 폴더                | 가져올 수 있는 것                                                      |
| ------------------- | ---------------------------------------------------------------------- |
| `pages`             | components, hooks, contexts, apis, features, design-system             |
| `components`        | 다른 components, hooks, contexts, features, design-system, apis의 타입 |
| `hooks`, `contexts` | 서로, apis, features                                                   |
| `apis`              | lib, mocks, features, 다른 apis                                        |
| `features`, `mocks` | apis의 타입                                                            |

- 화면 조각(components)은 데이터를 직접 불러오지 않습니다. 화면(pages)이나 훅(hooks)에서 apis 함수로 불러와 props로 넘깁니다.
- apis, features, mocks에서는 React를 쓰지 않습니다.

## 새 화면 추가하기

1. 데이터가 필요하면 `src/apis/<도메인>.types.ts`에 타입, `src/apis/<도메인>.ts`에 함수, `src/mocks/<도메인>.ts`에 목 데이터를 만듭니다.
2. `src/pages/XxxPage.tsx`에 화면을 만들고 `export default`로 내보냅니다. 화면 틀은 `PageLayout`과 `Header`로 잡습니다.
3. 화면이 길어지면 조각을 `src/components/<도메인>/`으로, 계산이나 폼 로직을 `src/features/<도메인>/`으로 나눕니다.
4. `src/routes.tsx`에 `lazy(() => import("@/pages/XxxPage"))` 한 줄과 경로 한 줄을 추가합니다. `title`을 적으면 프로토타입 목록(`/`)에도 나옵니다.
5. 로그인한 사용자만 볼 화면은 `routes.tsx`에서 `<ProtectedRoute>`로 감쌉니다.

참고 예시:

- 데이터 읽고 쓰기: `src/pages/ExampleMatchListPage.tsx`, `src/apis/exampleMatches.ts`
- 로그인과 여러 단계 폼: `src/pages/OnboardingPage.tsx`, `src/components/onboarding/`

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
- 맞는 것이 없으면 자유롭게 새로 만듭니다. 한 도메인에서만 쓰면 `src/components/<도메인>/`, 여러 도메인에서 쓰면 `src/components/common/`에 둡니다.
- 새 컴포넌트도 위의 색상과 타이포그래피 규칙을 따릅니다.
- `src/design-system/`의 파일은 고치지 않습니다. 변형이 필요하면 감싸는 컴포넌트를 새로 만듭니다.
- 아이콘은 `assets/icons/`의 SVG를 import해서 `<img src={icon} alt="" />`로 씁니다.

## 데이터와 Supabase

### 코드

- Supabase는 `src/apis`의 함수에서만 부릅니다. 화면, 화면 조각, 훅에서 `@/lib/supabase`나 `@supabase/supabase-js`를 가져오면 `npm run lint`가 오류를 냅니다.
- Supabase 클라이언트는 `src/lib/supabase.ts`의 `supabase`만 씁니다. 환경변수가 없으면 `null`이므로, apis 함수는 이때 `src/mocks`의 목 데이터로 동작하게 만듭니다.
- 화면에서 Supabase 연결 여부를 보여 줘야 하면 `src/apis/connection.ts`의 `isSupabaseConnected`를 씁니다.
- DB 컬럼은 snake_case(`court_name`), 화면 타입은 camelCase(`courtName`)로 씁니다. DB 행 타입(`XxxRow`)과 변환 함수는 apis 파일 안에 두고, 화면에는 변환한 타입만 넘깁니다.
- apis 함수는 Supabase 오류를 그대로 `throw`합니다. 화면에서 잡아서 문구로 보여 줍니다.
- 로그인한 사용자 정보는 `useAuthContext()`로 읽습니다. 로그인과 로그아웃은 `src/apis/auth.ts`를 거칩니다.

### 테이블과 권한 (SQL)

- 테이블을 만들거나 바꾸면 `supabase/migrations/<YYYYMMDDHHMMSS>_<설명>.sql` 파일로 SQL을 남깁니다.
- 이미 커밋한 migration 파일은 고치지 않습니다. 바꿀 내용은 새 파일로 추가합니다. 누군가 이미 실행했을 수 있기 때문입니다.
- 같은 SQL 파일에서 RLS를 켜고 권한 정책을 함께 만듭니다. RLS를 켜고 정책이 없으면 조회 결과가 오류 없이 빈 목록으로 옵니다. 데이터가 안 보이면 정책부터 확인합니다.
- 사용자 본인 데이터는 `to authenticated`와 `using ((select auth.uid()) = user_id)`처럼 본인 행만 허용합니다. `auth.uid()`를 `(select ...)`로 감싸면 행마다 다시 계산하지 않아 빠릅니다.
- `security definer` 함수에는 `set search_path = ''`를 붙이고, 실행 권한은 필요한 역할에만 줍니다. 다른 사용자의 데이터를 돌려주지 않게 합니다.
- SQL을 실행한 뒤 Supabase 대시보드의 Advisors에서 보안 경고를 확인합니다.

### 환경변수와 개인정보

- 환경변수(`import.meta.env`)는 `src/lib`에서만 읽습니다. 새 변수를 만들면 `.env.example`과 `src/vite-env.d.ts`에도 추가합니다.
- `VITE_`로 시작하는 변수는 브라우저에 그대로 공개됩니다. 브라우저 코드와 `.env.local`에는 publishable key만 넣습니다. secret key나 service_role key는 어디에도 넣지 않습니다.
- 실제 개인정보(실명, 전화번호, 계좌번호, 얼굴 사진 등)는 저장하지 않습니다.

## 린트 규칙

`npm run lint`는 다음을 검사합니다. 오류는 CI를 멈추고, 경고는 통과시킵니다. 경고도 고치는 것을 원칙으로 합니다.

| 검사                                         | 수준 | 설정 위치                          |
| -------------------------------------------- | ---- | ---------------------------------- |
| 파일 위치와 이름                             | 오류 | `eslint-rules/folder-structure.js` |
| `src/apis` 밖에서 Supabase 사용              | 오류 | `eslint.config.js`                 |
| 가져오는 방향, `../` 경로, `import.meta.env` | 경고 | `eslint.config.js`                 |
| 디자인 토큰 (색상, 타이포그래피)             | 경고 | `eslint.config.js`                 |

폴더 규칙을 바꾸면 이 문서, `eslint-rules/folder-structure.js`, `eslint.config.js`를 함께 고칩니다.

## Git

- 커밋과 push는 사용자가 요청할 때만 합니다.
- 커밋 메시지는 `feat: 매치 목록 화면 추가`처럼 `타입: 한국어 요약` 형식으로 씁니다. 타입은 `feat`, `fix`, `refactor`, `chore`, `docs` 중에서 고릅니다.
- `.env.local` 같은 환경변수 파일은 커밋하지 않습니다.

## 디자인 시스템 동기화

Rallit-FE의 변경을 가져오는 방법은 `src/design-system/README.md`에 있습니다. 사용자가 요청할 때만 진행합니다.
