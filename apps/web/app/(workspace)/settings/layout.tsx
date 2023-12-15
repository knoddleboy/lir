import { type Metadata } from "next";

import { GoBack } from "~/features/header/go-back";
import { Header } from "~/widgets/layouts/header";

export const metadata: Metadata = {
  title: "Settings",
};

type Props = {
  children: React.ReactNode;
};

export default function SettingsLayout({ children }: Props) {
  return (
    <>
      <Header>
        <GoBack />
        <div className="flex h-full items-center text-lg font-medium">Settings</div>
        <div className="w-11"></div>
      </Header>
      <main className="h-[calc(100%-52px)]">{children}</main>
    </>
  );
}
