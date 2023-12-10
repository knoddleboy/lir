import { type Metadata } from "next";

import { Header } from "~/widgets/header/header";
import { Sidebar } from "~/widgets/sidebar/sidebar";

import { defaultMetadata } from "../metadata";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "%s",
};

type Props = {
  children: React.ReactNode;
};

export default function WorkspaceLayout({ children }: Props) {
  return (
    <>
      <div className="flex h-screen w-screen">
        <Sidebar />
        <div className="flex w-full flex-col">
          <Header />
          <main className="bg-muted h-full flex-1">{children}</main>
        </div>
      </div>
    </>
  );
}
