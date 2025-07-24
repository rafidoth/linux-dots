import globals from "globals";
import js from "@eslint/js";
import ts from "typescript-eslint";

export default ts.config([
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      globals: globals.node,
      parser: ts.parser,
      parserOptions: {
        project: "./tsconfig.json", // Ensure this path points to your tsconfig.json
      },
    },
    plugins: {
      "@typescript-eslint": ts.plugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...ts.configs.recommended.rules,
      ...ts.configs["recommended-type-checked"].rules,
      "@typescript-eslint/no-floating-promises": "error",
    },
  },
]);
