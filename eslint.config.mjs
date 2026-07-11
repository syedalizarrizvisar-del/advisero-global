import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Separate Express backend project (own tooling) and compiled output:
    "server/**",
    "node_modules/**",
    "dist/**",
    "coverage/**",
    ".env",
    ".env.local",
  ]),
]);

export default eslintConfig;
