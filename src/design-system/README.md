# 디자인 시스템

Rallit-FE의 공용 컴포넌트를 Rallit-Admin-FE와 같은 방식으로 각색해 가져온 폴더입니다.
FE의 `bg-(--bg-primary-default)` 같은 CSS 변수 문법을 `src/styles/tailwind-theme.css`에 등록한 `bg-primary-default` 같은 Tailwind 클래스로 바꿨습니다.

## 기준 커밋

- Rallit-FE [`cf995b2`](https://github.com/Rallit/Rallit-FE/tree/cf995b28e0ffe480dbbd4675ccf43d87741ca56e) (2026-11-20)
- 함께 가져온 파일: `src/styles/tokens.css`, `src/styles/typography.css`, `assets/`, `public/` 파비콘
- `src/styles/tailwind-theme.css`는 Rallit-Admin-FE의 파일에 `--color-fg-accent-assistive`를 추가했습니다.

## 가져오지 않은 것

| 컴포넌트             | 이유                        |
| -------------------- | --------------------------- |
| `ActivityAreaPicker` | FE의 지역 조회 API를 호출함 |
| `MatchCard`          | FE의 이미지 API를 호출함    |
| `BottomNav`          | FE 서비스의 경로가 고정됨   |

## 추가로 가져온 것

- `PageLayout`: FE의 `src/components/layout/PageLayout.tsx`
- `src/hooks/useHorizontalMouseDrag.ts`: `DaySelector`가 쓰는 훅

## FE 변경을 가져오는 방법

1. Rallit-FE에서 바뀐 컴포넌트 파일을 이 폴더에 복사합니다.
2. 클래스 문법을 변환합니다.

   ```sh
   node scripts/convert-fe-classes.mjs src/design-system/<파일>.tsx
   npx prettier --write src/design-system
   ```

3. 스크립트가 `UNMAPPED`를 출력하면, 해당 토큰을 `tailwind-theme.css`에 등록하거나 손으로 바꿉니다.
4. `tokens.css`와 `typography.css`는 FE 파일로 덮어씁니다. 새 토큰이 생겼으면 `tailwind-theme.css`에도 등록합니다.
5. `npm run build`로 확인하고, 이 문서의 기준 커밋을 갱신합니다.

변환 스크립트는 Rallit-Admin-FE가 손으로 바꾼 컴포넌트 27개와 같은 결과를 내는지 확인했습니다.
