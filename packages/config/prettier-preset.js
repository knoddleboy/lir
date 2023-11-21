/** @type {import("prettier").Config} */
module.exports = {
  bracketSpacing: true,
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "es5",
  semi: true,
  printWidth: 80,
  arrowParens: "always",
  endOfLine: "auto",
  importOrder: [],
  importOrderSeparation: true,
  /**
   * Plugins to address Prettier requirements for experimental features.
   * See https://github.com/trivago/prettier-plugin-sort-imports#importorderparserplugins for more.
   */
  importOrderParserPlugins: ["jsx", "typescript", "decorators-legacy"],
  plugins: ["@trivago/prettier-plugin-sort-imports"],
};
