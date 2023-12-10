import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
}
