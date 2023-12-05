import base from "@lir/config/tailwind.config";

import type { Config } from "tailwindcss";

const config: Pick<Config, "presets"> = {
  presets: [base],
};

export default config;
