// Convert Rallit-FE component class syntax (e.g. bg-(--bg-primary-default))
// into the Tailwind utilities registered in src/styles/tailwind-theme.css.
// Usage: node scripts/convert-fe-classes.mjs <file.tsx...>
import { readFileSync, writeFileSync } from "node:fs";

const radius = {
  small: "sm",
  medium: "md",
  large: "lg",
  "extra-large": "xl",
  full: "pill",
};

function mapToken(token) {
  let m;
  if ((m = token.match(/^fg-(.+)$/))) return `fg-${m[1]}`;
  if ((m = token.match(/^bg-(.+)$/))) return m[1];
  if ((m = token.match(/^border-(.+)$/))) return `stroke-${m[1]}`;
  if ((m = token.match(/^spacing-gap-(.+)$/))) return m[1];
  if ((m = token.match(/^spacing-padding-(.+)$/))) return `inset-${m[1]}`;
  if ((m = token.match(/^unit-(\d+)$/))) return `unit-${m[1]}`;
  if ((m = token.match(/^radius-(.+)$/)) && radius[m[1]]) return radius[m[1]];
  if (token === "red-500") return "indicator-alert";
  return null;
}

const fixed = [
  [
    /bg-\[linear-gradient\(var\(--bg-primary-inverse\),var\(--bg-primary-inverse\)\)\]/g,
    "bg-primary-inverse-overlay",
  ],
  [
    /pb-\[max\(var\(--spacing-padding-large\),env\(safe-area-inset-bottom,0px\)\)\]/g,
    "pb-safe-inset-large",
  ],
  [/shadow-\[0_2\.58px_19\.351px_var\(--gray-alpha-100\)\]/g, "shadow-fab"],
  [/shadow-\[0_2px_30px_var\(--gray-alpha-200\)\]/g, "shadow-toast"],
  [/\[--[\w-]+:var\(--bg-state-hover\)\]/g, "state-overlay-hover"],
  [/\[--[\w-]+:var\(--bg-state-pressed\)\]/g, "state-overlay-pressed"],
];

const unmapped = [];
for (const file of process.argv.slice(2)) {
  let source = readFileSync(file, "utf8");

  // State overlay: bg-[linear-gradient(var(--x-overlay),var(--x-overlay))] + [--x-overlay:transparent]
  const overlayNames = new Set(
    [
      ...source.matchAll(
        /bg-\[linear-gradient\(var\(--([\w-]+)\),var\(--\1\)\)\]/g,
      ),
    ]
      .map((match) => match[1])
      .filter((name) => !name.startsWith("bg-")),
  );
  for (const name of overlayNames) {
    source = source
      .replaceAll(
        `bg-[linear-gradient(var(--${name}),var(--${name}))]`,
        "state-overlay",
      )
      .replaceAll(` [--${name}:transparent]`, "")
      .replaceAll(`[--${name}:transparent] `, "")
      .replaceAll(`[--${name}:transparent]`, "");
  }

  // FE의 "@/components/X" import를 같은 폴더(src/design-system) 기준으로 바꿉니다.
  source = source.replaceAll('"@/components/', '"./');

  for (const [pattern, replacement] of fixed) {
    source = source.replace(pattern, replacement);
  }

  source = source.replace(
    /-\((?:color:|length:)?--([a-z0-9-]+)\)/g,
    (all, token) => {
      const mapped = mapToken(token);
      if (!mapped) {
        unmapped.push(`${file}: ${all}`);
        return all;
      }
      return `-${mapped}`;
    },
  );

  writeFileSync(file, source);
}

for (const item of unmapped) console.error(`UNMAPPED ${item}`);
if (unmapped.length > 0) process.exitCode = 1;
