/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["./base.js", "next"],
  parserOptions: {
    babelOptions: {
      presets: [require.resolve("next/babel")],
    },
  },
  settings: {
    next: {
      rootDir: ["apps/web"],
    },
  },
};
