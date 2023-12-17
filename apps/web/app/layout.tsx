import { cn } from "@lir/lib";
import "@lir/ui/styles/globals.css";

import { Toaster } from "sonner";

import type { Metadata, Viewport } from "next";

import { Providers } from "~/providers";

import { inter } from "./fonts";
import { defaultMetadata } from "./metadata";

export const metadata: Metadata = {
  ...defaultMetadata,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head />
      <body
        className={cn(
          "bg-background text-foreground min-h-screen font-sans antialiased",
          inter.variable
        )}
      >
        <Providers>{children}</Providers>
        <Toaster duration={3000} />
      </body>
    </html>
  );
}
