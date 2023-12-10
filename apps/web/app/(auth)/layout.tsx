import { Layout } from "@lir/ui";

import { Header } from "~/widgets/header-landing";

type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
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
