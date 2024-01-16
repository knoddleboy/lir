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
  rules: {
    "import/no-anonymous-default-export": [
      "warn",
      {
        allowNew: true,
      },
    ],
    "prefer-template": "off",
  },
};
