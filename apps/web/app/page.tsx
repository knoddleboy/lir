import { Content } from "@lir/ui";

import Header from "~/components/layout/header";

export default function LandingPage() {
  return (
    <>
      <Header />
      <Content>
        <div className="h-20" />
        <div className="flex w-full justify-center text-4xl font-bold">
          Landing page
        </div>
      </Content>
    </>
  );
}
