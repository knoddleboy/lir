import { Content } from "@lir/ui";

import Header from "~/components/layout/header";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <Header includeNav={false} />
      <Content className="overflow-hidden">
        <div className="flex h-full w-full items-center justify-center">
          {children}
        </div>
      </Content>
    </>
  );
}
