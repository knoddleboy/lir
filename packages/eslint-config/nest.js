/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["./base.js"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  ignorePatterns: ["dist"],
  env: {
    node: true,
    jest: true,
  },
  rules: {
    "@typescript-eslint/consistent-type-imports": "off",
  },
};
