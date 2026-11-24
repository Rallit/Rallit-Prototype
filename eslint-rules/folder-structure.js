// src 안의 파일이 정해진 폴더와 이름 규칙을 따르는지 검사하는 ESLint 규칙입니다.
// 폴더 규칙은 AGENTS.md의 "폴더 구조"와 같습니다. 규칙을 바꾸면 두 곳을 함께 고칩니다.
import path from "node:path";

const PASCAL = "[A-Z][A-Za-z0-9]*";
const CAMEL = "[a-z][A-Za-z0-9]*";
const KEBAB = "[a-z0-9]+(?:-[a-z0-9]+)*";

const ROOT_FILES = new Set([
  "App.tsx",
  "main.tsx",
  "routes.tsx",
  "vite-env.d.ts",
]);

// 검사하지 않는 폴더입니다. design-system은 Rallit-FE에서 가져온 코드입니다.
const SKIPPED = ["design-system/", "styles/"];

const FOLDERS = {
  pages: {
    pattern: new RegExp(`^pages/${PASCAL}Page\\.tsx$`),
    message:
      "화면 파일은 src/pages 바로 아래에 'XxxPage.tsx' 이름으로 둡니다. 예: src/pages/LoginPage.tsx",
  },
  components: {
    pattern: new RegExp(
      `^components/${KEBAB}/(?:${PASCAL}\\.tsx|${CAMEL}\\.ts)$`,
    ),
    message:
      "화면 조각은 src/components/<도메인>/에 'PascalCase.tsx'로 둡니다. 예: src/components/onboarding/SkillStep.tsx. 여러 도메인이 함께 쓰면 src/components/common/에 둡니다.",
  },
  features: {
    pattern: new RegExp(`^features/${KEBAB}/${CAMEL}\\.ts$`),
    message:
      "src/features/<도메인>/에는 화면이 아닌 로직(.ts)만 둡니다. 예: form.ts, format.ts. 화면은 src/pages, 화면 조각은 src/components/<도메인>에 둡니다.",
  },
  apis: {
    pattern: new RegExp(`^apis/${CAMEL}(?:\\.types)?\\.ts$`),
    message:
      "API 파일은 src/apis 바로 아래에 '<도메인>.ts'(함수)와 '<도메인>.types.ts'(타입)로 둡니다. 예: src/apis/exampleMatches.ts",
  },
  hooks: {
    pattern: new RegExp(`^hooks/use${PASCAL}\\.ts$`),
    message:
      "훅은 src/hooks 바로 아래에 'useXxx.ts'로 둡니다. 예: src/hooks/useAuth.ts",
  },
  contexts: {
    pattern: new RegExp(`^contexts/${PASCAL}\\.tsx?$`),
    message:
      "Context는 src/contexts 바로 아래에 'XxxContext.ts', 'XxxProvider.tsx'로 둡니다.",
  },
  mocks: {
    pattern: new RegExp(`^mocks/${CAMEL}\\.ts$`),
    message:
      "목 데이터는 src/mocks 바로 아래에 '<도메인>.ts'로 둡니다. 예: src/mocks/exampleMatches.ts",
  },
  lib: {
    pattern: new RegExp(`^lib/${CAMEL}\\.ts$`),
    message:
      "src/lib에는 Supabase 클라이언트 같은 외부 도구 설정만 둡니다. 예: src/lib/supabase.ts",
  },
};

const UNKNOWN =
  "src 안에는 정해진 폴더만 씁니다: pages, components, features, apis, hooks, contexts, mocks, lib (AGENTS.md의 폴더 구조 참고)";

export const folderStructure = {
  meta: {
    type: "suggestion",
    docs: { description: "src 파일의 위치와 이름 규칙을 검사합니다." },
    schema: [],
    messages: { wrongPlace: "{{message}} (지금 위치: {{file}})" },
  },
  create(context) {
    const relative = path
      .relative(context.cwd, context.filename)
      .split(path.sep)
      .join("/");
    if (!relative.startsWith("src/")) return {};

    const file = relative.slice("src/".length);
    if (ROOT_FILES.has(file)) return {};
    if (SKIPPED.some((folder) => file.startsWith(folder))) return {};

    const folder = FOLDERS[file.split("/")[0]];
    if (folder && folder.pattern.test(file)) return {};

    return {
      Program(node) {
        context.report({
          node,
          messageId: "wrongPlace",
          data: { message: folder ? folder.message : UNKNOWN, file: relative },
        });
      },
    };
  },
};

export default {
  meta: { name: "rallit" },
  rules: { "folder-structure": folderStructure },
};
