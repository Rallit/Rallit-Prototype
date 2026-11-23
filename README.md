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

| 주소                | 화면                                  |
| ------------------- | ------------------------------------- |
| `/`                 | 프로토타입 목록                       |
| `/design-system`    | 색상, 타이포그래피, 컴포넌트 카탈로그 |
| `/examples/matches` | Supabase 데이터를 읽고 쓰는 화면 예시 |

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

## 배포

Vercel로 배포합니다.

1. Vercel에서 이 저장소를 Import합니다. Framework Preset은 Vite로 자동 인식됩니다.
2. Settings > Environment Variables에 `.env.local`과 같은 이름으로 Supabase 값을 넣습니다.
3. `main`에 push하면 자동으로 배포됩니다.

`vercel.json`은 새로고침해도 화면 경로가 유지되도록 모든 경로를 `index.html`로 보냅니다.

## 디자인 시스템

`src/design-system/`은 Rallit-FE 컴포넌트를 각색해 가져온 폴더입니다. 기준 커밋과 동기화 방법은 [src/design-system/README.md](src/design-system/README.md)에 있습니다.
