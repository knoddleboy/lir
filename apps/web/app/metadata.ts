import { APP_NAME } from "@lir/lib";

import { type Metadata } from "next";

const description =
  "Distraction-free writing environment with support for markdown syntax and WYSIWYG experience.";

export const defaultMetadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description,
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};
