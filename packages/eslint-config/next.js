/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["./base.js", "next"],
  settings: {
    next: {
      rootDir: ["apps/web"],
    },
  },
};
