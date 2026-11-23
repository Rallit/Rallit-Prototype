import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import betterTailwindcss from "eslint-plugin-better-tailwindcss";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import rallit from "./eslint-rules/folder-structure.js";

// 클래스 앞의 변형(hover:, md: 등)과 중요도 표시(!)를 허용하는 접두사
const prefix = "^(?:\\S*:)?!?";
const colorUtilities =
  "(?:bg|text|border(?:-[xytrblse])?|ring|inset-ring|outline|fill|stroke|from|via|to|divide|placeholder|decoration|accent|caret|shadow|inset-shadow)";
const tailwindPalette =
  "(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)";

const colorMessage =
  "Rallit 색상 토큰을 써 주세요. 예: bg-primary-default, text-fg-neutral-default, border-stroke-neutral-default (AGENTS.md의 디자인 규칙 참고)";
const typographyMessage =
  "글자 크기, 굵기, 줄 높이, 자간은 typography-* 클래스를 써 주세요. 예: typography-body-regular (AGENTS.md의 디자인 규칙 참고)";

export default defineConfig([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  {
    // 디자인 토큰 사용 권장: 위반은 오류가 아니라 경고로만 알립니다.
    // src/design-system은 Rallit-FE에서 가져온 코드라 검사하지 않습니다.
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/design-system/**"],
    plugins: { "better-tailwindcss": betterTailwindcss },
    settings: {
      "better-tailwindcss": { entryPoint: "src/index.css" },
    },
    rules: {
      "better-tailwindcss/no-restricted-classes": [
        "warn",
        {
          restrict: [
            {
              pattern: `${prefix}${colorUtilities}-${tailwindPalette}-\\d{2,3}(?:\\/\\S+)?!?$`,
              message: colorMessage,
            },
            {
              pattern: `${prefix}${colorUtilities}-(?:white|black)(?:\\/\\S+)?!?$`,
              message: colorMessage,
            },
            {
              pattern: `${prefix}${colorUtilities}-\\[(?:#|rgba?\\(|hsla?\\(|oklch\\(|oklab\\(|color:)`,
              message: colorMessage,
            },
            {
              pattern: `${prefix}text-(?:xs|sm|base|lg|xl|[2-9]xl|\\[\\d)`,
              message: typographyMessage,
            },
            {
              pattern: `${prefix}font-(?:thin|extralight|light|normal|medium|semibold|bold|extrabold|black|sans|serif|mono)!?$`,
              message: typographyMessage,
            },
            {
              pattern: `${prefix}(?:leading|tracking)-`,
              message: typographyMessage,
            },
          ],
        },
      ],
      "no-restricted-syntax": [
        "warn",
        {
          selector: "Literal[value=/^#[0-9a-fA-F]{3,8}$/]",
          message: colorMessage,
        },
      ],
    },
  },
  {
    // routes.tsx는 화면을 lazy로 불러오면서 routes 목록을 내보내는 파일입니다.
    // 이 파일을 고치면 빠른 새로고침 대신 페이지 전체가 새로고침됩니다.
    files: ["src/routes.tsx"],
    rules: { "react-refresh/only-export-components": "off" },
  },
  {
    // 파일 위치와 이름 규칙 (eslint-rules/folder-structure.js). 어기면 오류입니다.
    files: ["src/**/*.{ts,tsx}"],
    plugins: { rallit },
    rules: { "rallit/folder-structure": "error" },
  },
  eslintConfigPrettier,
]);
