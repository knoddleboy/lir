import { type Metadata } from "next";
import { redirect } from "next/navigation";

import { isAuth } from "~/shared/lib/is-auth";
import { Sidebar } from "~/widgets/layouts/sidebar";

import { defaultMetadata } from "../metadata";

export const metadata: Metadata = {
  ...defaultMetadata,
  title: "%s",
};

type Props = {
  children: React.ReactNode;
};

export default function WorkspaceLayout({ children }: Props) {
  if (!isAuth()) {
    redirect("/login");
  }

  return (
    <>
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar />
        <div className="flex h-full w-full flex-col">
          <div className="bg-muted h-full flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
