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
  importOrder: ["<THIRD_PARTY_MODULES>", "^@nestjs/(.*)$", "^~/(.*)$", "^[./]"],
  importOrderSeparation: true,
  /**
   * Satisfy prettier with experimental features.
   * @see https://github.com/trivago/prettier-plugin-sort-imports#importorderparserplugins
   */
  importOrderParserPlugins: ["jsx", "typescript", "decorators-legacy"],
  plugins: [
    "@trivago/prettier-plugin-sort-imports",
    /**
     * **NOTE** tailwind plugin must come last!
     * @see https://github.com/tailwindlabs/prettier-plugin-tailwindcss#compatibility-with-other-prettier-plugins
     */
    "prettier-plugin-tailwindcss",
  ],
};
