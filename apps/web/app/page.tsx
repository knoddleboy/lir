import { Layout } from "@lir/ui";

import { Header } from "~/widgets/layouts/landing/header";
import { Nav } from "~/widgets/layouts/landing/nav";

export default function LandingPage() {
  return (
    <>
      <Header>
        <Nav />
      </Header>

      <Layout>
        <div className="h-20" />
        <div className="flex w-full justify-center text-4xl font-bold">
          Landing page
        </div>
      </Layout>
    </>
  );
}
