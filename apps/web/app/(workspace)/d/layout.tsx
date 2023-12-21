import { APP_NAME } from "@lir/lib";

import type { Metadata } from "next";

import { ToggleSidebar } from "~/features/header/toggle-sidebar";
import { Header } from "~/widgets/layouts/header";

// Used to display Lir as a placeholder while the document is loading
export const metadata: Metadata = {
  title: APP_NAME,
};

type Props = {
  children: React.ReactNode;
};

export default function NestedLayout({ children }: Props) {
  return (
    <>
      <Header>
        <ToggleSidebar />
      </Header>
      <main className="h-[calc(100%-52px)] w-full">{children}</main>
    </>
  );
}
