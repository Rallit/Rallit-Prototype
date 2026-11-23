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

const hexColorSyntax = {
  selector: "Literal[value=/^#[0-9a-fA-F]{3,8}$/]",
  message: colorMessage,
};
const envSyntax = {
  selector: "MemberExpression[object.type='MetaProperty'][property.name='env']",
  message:
    "환경변수(import.meta.env)는 src/lib에서만 읽습니다. 다른 곳에서는 src/lib이 내보내는 값을 씁니다. (AGENTS.md의 데이터 규칙 참고)",
};

// 폴더 사이의 의존 방향입니다. 화살표 방향으로만 가져올 수 있습니다. (AGENTS.md의 폴더 구조 참고)
// pages -> components, hooks, contexts, apis, features, design-system
// components -> hooks, contexts, features, design-system, apis의 타입
// hooks, contexts -> apis, features
// apis -> lib, mocks, features
// features, mocks -> apis의 타입
const deny = {
  parentPath: {
    regex: "^\\.\\./(?!(?:\\.\\./)*assets/)",
    message:
      "src 안의 파일은 '../' 대신 '@/'로 가져옵니다. 예: import { SkillStep } from \"@/components/onboarding/SkillStep\"",
  },
  pages: {
    group: ["@/pages/*"],
    message:
      "화면(src/pages)은 다른 곳에서 가져오지 않습니다. 함께 쓰는 부분은 src/components로 옮깁니다.",
  },
  components: {
    group: ["@/components/*"],
    message:
      "화면 조각(src/components)은 화면(src/pages)이나 다른 화면 조각에서만 가져옵니다.",
  },
  hooks: {
    group: ["@/hooks/*", "@/contexts/*"],
    message: "훅과 Context는 화면과 화면 조각에서만 씁니다.",
  },
  designSystem: {
    group: ["@/design-system/*"],
    message: "디자인 시스템 컴포넌트는 화면과 화면 조각에서만 씁니다.",
  },
  apis: {
    group: ["@/apis/*"],
    allowTypeImports: true,
    message:
      "데이터는 화면(src/pages)이나 훅(src/hooks)에서 src/apis 함수로 불러와 props로 넘깁니다. 여기서는 apis의 타입만 가져옵니다.",
  },
  mocks: {
    group: ["@/mocks/*"],
    message:
      "목 데이터(src/mocks)는 src/apis에서만 씁니다. Supabase가 없을 때 apis 함수가 대신 돌려줍니다.",
  },
};
const reactPaths = ["react", "react-dom", "react-router"].map((name) => ({
  name,
  allowTypeImports: true,
  message:
    "화면이 아닌 코드(apis, features, mocks)에서는 React를 쓰지 않습니다. 화면 로직은 src/hooks로 옮깁니다.",
}));

function layer(files, patterns, paths = []) {
  return {
    files,
    rules: {
      "@typescript-eslint/no-restricted-imports": ["warn", { paths, patterns }],
    },
  };
}

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
      "no-restricted-syntax": ["warn", hexColorSyntax, envSyntax],
    },
  },
  {
    files: ["src/lib/**/*.ts"],
    rules: { "no-restricted-syntax": ["warn", hexColorSyntax] },
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
  {
    // Supabase는 src/apis에서만 부릅니다. 어기면 오류입니다.
    files: ["src/**/*.{ts,tsx}"],
    ignores: ["src/lib/**", "src/apis/**", "src/design-system/**"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "@supabase/supabase-js",
              message:
                "Supabase 클라이언트는 src/lib/supabase.ts에서만 만듭니다. 화면에서는 src/apis의 함수를 부릅니다. (AGENTS.md의 데이터 규칙 참고)",
            },
          ],
          patterns: [
            {
              group: ["@/lib/*"],
              message:
                "Supabase(src/lib)는 src/apis의 함수에서만 씁니다. 화면에서는 src/apis의 함수를 부릅니다. (AGENTS.md의 데이터 규칙 참고)",
            },
          ],
        },
      ],
    },
  },
  // 폴더 사이의 의존 방향은 경고로 알립니다.
  layer(["src/*.{ts,tsx}", "src/lib/**/*.ts"], [deny.parentPath]),
  layer(["src/pages/**/*.tsx"], [deny.parentPath, deny.pages, deny.mocks]),
  layer(
    ["src/components/**/*.{ts,tsx}"],
    [deny.parentPath, deny.pages, deny.apis, deny.mocks],
  ),
  layer(
    ["src/hooks/**/*.ts", "src/contexts/**/*.{ts,tsx}"],
    [deny.parentPath, deny.pages, deny.components, deny.mocks],
  ),
  layer(
    ["src/apis/**/*.ts"],
    [
      deny.parentPath,
      deny.pages,
      deny.components,
      deny.hooks,
      deny.designSystem,
    ],
    reactPaths,
  ),
  layer(
    ["src/features/**/*.ts", "src/mocks/**/*.ts"],
    [
      deny.parentPath,
      deny.pages,
      deny.components,
      deny.hooks,
      deny.designSystem,
      deny.apis,
      deny.mocks,
    ],
    reactPaths,
  ),
  eslintConfigPrettier,
]);
