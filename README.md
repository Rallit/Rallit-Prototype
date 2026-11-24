# Rallit Prototype

Rallit PM이 기능 아이디어를 빠르게 화면으로 만들어 검증하는 프로토타입 저장소입니다.
디자인은 Rallit-FE의 디자인 시스템을 그대로 따릅니다.

## 시작하기

Node.js 22 이상이 필요합니다.

```sh
npm install
npm run dev
```

브라우저에서 http://localhost:3002 을 엽니다.

| 주소                | 화면                                            |
| ------------------- | ----------------------------------------------- |
| `/`                 | 프로토타입 목록                                 |
| `/design-system`    | 색상, 타이포그래피, 컴포넌트 카탈로그           |
| `/examples/matches` | Supabase 데이터를 읽고 쓰는 화면 예시           |
| `/login`            | Rallit-FE의 소셜 로그인, 가입, 온보딩 2단계까지 |

## AI와 함께 작업하기

작업 규칙은 [AGENTS.md](AGENTS.md)에 있습니다. Claude Code는 `CLAUDE.md`를 통해 같은 문서를 읽습니다.

## Supabase 연결

연결하지 않아도 목 데이터로 동작합니다. 여러 사람이 같은 데이터를 봐야 할 때 연결합니다.

1. [Supabase](https://supabase.com)에서 프로젝트를 만듭니다.
2. SQL Editor에서 `supabase/migrations/`의 SQL 파일을 순서대로 실행합니다.
3. `.env.example`을 복사해 `.env.local`을 만들고 값을 채웁니다.

   ```sh
   cp .env.example .env.local
   ```

   - 두 값 모두 Supabase 대시보드 상단의 Connect 버튼에서 확인할 수 있습니다.
   - `VITE_SUPABASE_URL`: 프로젝트 URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY`: publishable key (secret key가 아닙니다)

4. 개발 서버를 다시 실행합니다.

무료 플랜은 일주일 동안 사용량이 적으면 프로젝트가 일시정지됩니다. 시연 전에는 Supabase 대시보드에서 프로젝트가 켜져 있는지 확인합니다.

## 소셜 로그인 설정

`/login`의 카카오·구글 로그인은 Supabase Auth로 동작합니다.

- Supabase를 연결하지 않으면 버튼을 눌렀을 때 실제 로그인 없이 목 사용자로 온보딩까지 진행합니다. 새로고침하면 로그아웃 상태로 돌아갑니다.
- 처음 로그인한 사람은 Supabase에 계정이 생기고, `profiles` 테이블에 기본 닉네임("테니스곰" + 숫자)이 담긴 행이 자동으로 만들어집니다. 이것이 회원가입입니다.
- 온보딩 2단계에서 "완료"를 누르면 입력한 값이 `profiles`에 저장됩니다.
- 프로필 사진은 미리보기만 하고 저장하지 않습니다.

실제 소셜 로그인을 쓰려면 Supabase 대시보드에서 다음을 설정합니다.

1. Authentication > URL Configuration
   - Site URL: 배포 주소 (예: `https://rallit-prototype.vercel.app`)
   - Redirect URLs: `http://localhost:3002/**`와 배포 주소 뒤에 `/**`를 붙인 주소
   - 여기에 없는 주소로는 로그인 뒤에 돌아오지 못합니다.
2. Authentication > Sign In / Providers에서 Kakao와 Google을 켭니다.
   - 각 항목을 펼치면 나오는 Callback URL(`https://<프로젝트>.supabase.co/auth/v1/callback`)을 카카오·구글 개발자 콘솔에 등록합니다.
   - 카카오: [Kakao Developers](https://developers.kakao.com)에서 앱을 만들고 REST API 키와 Client Secret을 넣습니다. 이메일 동의 항목은 비즈 앱만 쓸 수 있으므로, 비즈 앱이 아니면 Supabase의 Kakao 설정에서 "Allow users without an email"을 켭니다.
   - 구글: [Google Cloud Console](https://console.cloud.google.com)에서 OAuth 클라이언트(웹 애플리케이션)를 만들고 Client ID와 Client Secret을 넣습니다.
   - 자세한 순서: [Supabase Kakao 문서](https://supabase.com/docs/guides/auth/social-sign-in/auth-kakao), [Supabase Google 문서](https://supabase.com/docs/guides/auth/social-login/auth-google)

설정하지 않은 버튼을 누르면 로그인 화면에 "아직 Supabase에 설정되지 않았어요"라고 안내합니다.

온보딩을 처음부터 다시 시험하려면 Authentication > Users에서 해당 사용자를 지웁니다. 프로필 행도 함께 지워집니다.

## 배포

Vercel로 배포합니다.

1. Vercel에서 이 저장소를 Import합니다. Framework Preset은 Vite로 자동 인식됩니다.
2. Settings > Environment Variables에 `.env.local`과 같은 이름으로 Supabase 값을 넣습니다.
3. `main`에 push하면 자동으로 배포됩니다.

`vercel.json`은 새로고침해도 화면 경로가 유지되도록 모든 경로를 `index.html`로 보냅니다.

## 디자인 시스템

`src/design-system/`은 Rallit-FE 컴포넌트를 각색해 가져온 폴더입니다. 기준 커밋과 동기화 방법은 [src/design-system/README.md](src/design-system/README.md)에 있습니다.
