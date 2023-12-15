import { Layout } from "@lir/ui";

import { redirect } from "next/navigation";

import { isAuth } from "~/shared/lib/is-auth";
import { Header } from "~/widgets/layouts/landing/header";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  if (isAuth()) {
    redirect("/last-edited-document");
  }

  return (
    <>
      <Header />
      <Layout className="overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          <div className="mb-24 w-full max-w-[360px] space-y-8">{children}</div>
        </div>
      </Layout>
    </>
  );
}
