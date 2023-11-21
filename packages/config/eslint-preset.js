/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  // For now leave `next` here but later should find a way to extend specifically for next.
  extends: ["next", "plugin:prettier/recommended", "turbo"],
  plugins: ["unused-imports"],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ["./apps/*/tsconfig.json", "./packages/*/tsconfig.json"],
  },
  rules: {
    "unused-imports/no-unused-imports": "error",
    "prefer-template": "error",
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      extends: ["plugin:@typescript-eslint/recommended"],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
      rules: {
        "@typescript-eslint/consistent-type-imports": [
          "error",
          {
            prefer: "type-imports",
            fixStyle: "inline-type-imports",
            disallowTypeAnnotations: false,
          },
        ],
        "@typescript-eslint/no-unused-vars": [
          "warn",
          {
            vars: "all",
            varsIgnorePattern: "^_",
            args: "after-used",
            argsIgnorePattern: "^_",
            destructuredArrayIgnorePattern: "^_",
          },
        ],
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
      },
      overrides: [
        // NestJS
        {
          files: ["apps/api/**/*.{ts,tsx}"],
          parserOptions: {
            sourceType: "module",
          },
          env: {
            node: true,
            jest: true,
          },
        },
        // NextJS
        {
          files: ["apps/web/**/*.{ts,tsx}"],
          settings: {
            next: {
              rootDir: ["apps/web"],
            },
          },
        },
      ],
    },
  ],
};
