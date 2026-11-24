# Rallit Prototype 작업 가이드

이 문서는 이 저장소에서 일하는 AI 에이전트를 위한 규칙입니다.

## 이 저장소

- Rallit(테니스 매칭 서비스)의 PM이 기능 아이디어를 화면으로 만들고, 실제 사용자와 사용성 테스트(베타)까지 운영하는 저장소입니다.
- `main`에 합쳐진 코드는 https://beta.rallit.co.kr 에 바로 배포되고 실제 사용자가 씁니다. 나중에 실서비스(Rallit-FE, Rallit-BE)로 교체할 예정입니다.
- 실험과 운영을 섞지 않습니다. 로컬 개발과 PR 미리보기는 실험용 DB, `main` 배포는 운영 DB를 씁니다. 자세한 규칙은 아래 "데이터와 Supabase"에 있습니다.
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

### 실험용 DB와 운영 DB

| DB     | Supabase 프로젝트                               | 쓰는 곳                                            | 데이터             |
| ------ | ----------------------------------------------- | -------------------------------------------------- | ------------------ |
| 실험용 | `rallit-prototype-dev` (`aeuhzwrqimvdexjzueps`) | 로컬 개발(`.env.local`), PR 미리보기 배포, AI 작업 | 가짜·시험 데이터   |
| 운영   | `rallit-prototype` (`mjylcjzyslrwzdrxxfhl`)     | `main` 배포 (beta.rallit.co.kr)                    | 실제 사용자 데이터 |

- 로컬 개발은 항상 실험용 DB에 연결합니다. `cp .env.example .env.local`로 만든 값을 그대로 쓰면 됩니다. 운영 DB 값을 `.env.local`에 넣으면 개발 서버가 오류를 냅니다.
- AI 도구(Supabase 커넥터 등)로 SQL을 실행하거나 데이터를 볼 때는 실험용 프로젝트(`aeuhzwrqimvdexjzueps`)만 씁니다. 운영 프로젝트에는 SQL을 직접 실행하지 않고, 실제 사용자 데이터도 조회하지 않습니다. 운영 DB는 아래처럼 `main`에 합칠 때 자동으로 바뀝니다. 직접 실행하면 migration 기록이 어긋나서 다음 자동 적용이 실패할 수 있습니다.
- 새 migration은 실험용 DB에 먼저 적용해 화면에서 확인합니다. PR을 `main`에 합치면 Supabase GitHub 연동이 `supabase/migrations`의 새 SQL을 운영 DB에 자동으로 적용합니다. 사람이 운영 DB에 따로 반영하지 않습니다.
- 시험 데이터는 실험용 DB와 `src/mocks`에만 넣습니다. 운영 DB에는 넣지 않습니다.

### 코드

- Supabase는 `src/apis`의 함수에서만 부릅니다. 화면, 화면 조각, 훅에서 `@/lib/supabase`나 `@supabase/supabase-js`를 가져오면 `npm run lint`가 오류를 냅니다.
- Supabase 클라이언트는 `src/lib/supabase.ts`의 `supabase`만 씁니다. 환경변수가 없으면 `null`이므로, apis 함수는 이때 `src/mocks`의 목 데이터로 동작하게 만듭니다.
- 화면에서 Supabase 연결 여부를 보여 줘야 하면 `src/apis/connection.ts`의 `isSupabaseConnected`를 씁니다.
- DB 컬럼은 snake_case(`court_name`), 화면 타입은 camelCase(`courtName`)로 씁니다. DB 행 타입(`XxxRow`)과 변환 함수는 apis 파일 안에 두고, 화면에는 변환한 타입만 넘깁니다.
- apis 함수는 Supabase 오류를 그대로 `throw`합니다. 화면에서 잡아서 문구로 보여 줍니다.
- 로그인한 사용자 정보는 `useAuthContext()`로 읽습니다. 로그인과 로그아웃은 `src/apis/auth.ts`를 거칩니다.

### 테이블과 권한 (SQL)

- 테이블을 만들거나 바꾸면 `supabase/migrations/<YYYYMMDDHHMMSS>_<설명>.sql` 파일로 SQL을 남깁니다.
- 이미 커밋한 migration 파일은 고치지 않습니다. 바꿀 내용은 새 파일로 추가합니다. `main`에 합쳐진 파일은 이미 운영 DB에 적용돼 있기 때문입니다.
- 파일 이름의 시각은 `main`의 마지막 migration보다 뒤여야 합니다. 앞서면 운영 DB에 적용되지 않습니다.
- 운영 DB 적용과 화면 배포는 합칠 때 거의 동시에 시작되고, 어느 쪽이 먼저 끝날지 정해져 있지 않습니다. 테이블과 컬럼은 추가 위주로 바꾸고, 지금 배포된 화면이 쓰는 컬럼을 지우거나 이름을 바꾸지 않습니다.
  - 화면이 쓰는 컬럼을 지우려면 PR을 두 번으로 나눕니다. 먼저 화면에서 그 컬럼을 쓰지 않게 바꿔 합치고, 다음 PR에서 컬럼을 지웁니다.
  - 이름을 바꾸려면 새 컬럼 추가, 데이터 복사, 화면 전환, 옛 컬럼 삭제 순서로 나눕니다.
- 데이터를 지우거나 바꾸는 SQL(`drop table`, `drop column`, `truncate`, `delete from`, 이름 바꾸기, 컬럼 타입 바꾸기)은 실제 사용자 데이터를 잃게 할 수 있습니다. 쓰기 전에 사용자에게 알리고, 관리자와 상의한 뒤 PR에 `운영 데이터 변경 확인` 라벨을 붙입니다.
- `supabase/`가 바뀐 PR은 검사(`.github/workflows/migrations.yml`)가 위 규칙을 확인하고, 빈 DB에 모든 migration을 순서대로 적용해 봅니다. `main`은 보호돼 있어 직접 push할 수 없고, 검사가 실패한 PR은 합칠 수 없습니다.
- 시험 데이터 정리처럼 운영 DB의 행만 지우거나 고치는 일(`delete`, `update`)은 migration으로 하지 않습니다. 관리자가 요청할 때만, 관리자의 터미널에서 대상 행을 먼저 조회해 보여 준 뒤 실행합니다. 테이블 구조를 바꾸는 SQL(`create`, `alter`, `drop`)은 운영 DB에 직접 실행하지 않습니다.
- 같은 SQL 파일에서 RLS를 켜고 권한 정책을 함께 만듭니다. RLS를 켜고 정책이 없으면 조회 결과가 오류 없이 빈 목록으로 옵니다. 데이터가 안 보이면 정책부터 확인합니다.
- 같은 SQL 파일에 `grant select, insert on public.<테이블> to anon, authenticated;`처럼 화면에서 쓰는 권한도 줍니다. Supabase는 새 테이블에 이 권한을 자동으로 주지 않는 쪽으로 기본값을 바꾸고 있고, 팀 프로젝트에도 적용돼 있습니다. 빠뜨리면 화면에서 "permission denied for table" 오류(401)가 납니다. 로그인한 사용자만 쓰는 테이블은 `authenticated`에만 줍니다. 예시: `supabase/migrations/20261124100000_grant_table_privileges.sql`
- 사용자 본인 데이터는 `to authenticated`와 `using ((select auth.uid()) = user_id)`처럼 본인 행만 허용합니다. `auth.uid()`를 `(select ...)`로 감싸면 행마다 다시 계산하지 않아 빠릅니다.
- `security definer` 함수에는 `set search_path = ''`를 붙이고, 실행 권한은 필요한 역할에만 줍니다. 다른 사용자의 데이터를 돌려주지 않게 합니다.
- SQL을 실행한 뒤 Supabase 대시보드의 Advisors에서 보안 경고를 확인합니다.

### 환경변수

- 환경변수(`import.meta.env`)는 `src/lib`에서만 읽습니다. 새 변수를 만들면 `.env.example`과 `src/vite-env.d.ts`에도 추가합니다.
- `.env.local`은 커밋하지 않습니다. `.gitignore`에 들어 있고, 실수로 올리면 CI가 실패합니다.
- `VITE_`로 시작하는 변수는 브라우저에 그대로 공개됩니다. 브라우저 코드와 `.env.local`에는 publishable key만 넣습니다. secret key나 service_role key는 어디에도 넣지 않습니다.
- 운영 DB 값은 Vercel의 production 환경변수에만 있습니다. PR 미리보기(preview)에는 실험용 DB 값이 들어 있습니다.

### 개인정보

실제 사용자가 쓰는 서비스이므로 다음을 지킵니다.

- 실제 사용자 정보는 운영 DB에만 저장합니다. 목 데이터, 실험용 DB, 코드, 문서, 스크린샷에는 실제 개인정보(실명, 전화번호, 계좌번호, 얼굴 사진 등)를 넣지 않습니다. 시험할 때는 "김테스트", "010-0000-0000" 같은 가짜 값을 씁니다.
- 지금 받는 정보는 로그인 정보(이메일, 닉네임)와 온보딩 정보(성별, 연령대, 테니스 시작 연월, NTRP)뿐입니다. 전화번호, 계좌번호, 사진처럼 새 개인정보를 받는 화면은 만들기 전에 사용자에게 먼저 확인합니다. 참여자에게 안내한 개인정보 안내문을 함께 고쳐야 하기 때문입니다.
- 개인정보가 들어가는 테이블은 본인 행만 보도록 RLS를 겁니다. "누구나 조회" 정책은 개인정보가 없는 테이블에만 씁니다.
- 사용자 데이터를 내보내거나 지우는 작업은 사용자가 요청할 때만 합니다.

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

- 작업 순서, 브랜치 이름, PR 규칙은 [CONTRIBUTING.md](CONTRIBUTING.md)를 따릅니다.
- 커밋과 push는 사용자가 요청할 때만 합니다.
- PR을 만들 때는 `.github/PULL_REQUEST_TEMPLATE.md`의 체크리스트를 채웁니다. 확인하지 못한 항목은 체크하지 않고 이유를 적습니다.
- 커밋 메시지는 `feat: 매치 목록 화면 추가`처럼 `타입: 한국어 요약` 형식으로 씁니다. 타입은 `feat`, `fix`, `refactor`, `chore`, `docs` 중에서 고릅니다.
- `.env.local` 같은 환경변수 파일은 커밋하지 않습니다. CI가 검사해서 올라가면 실패합니다.

## 디자인 시스템 동기화

Rallit-FE의 변경을 가져오는 방법은 `src/design-system/README.md`에 있습니다. 사용자가 요청할 때만 진행합니다.
