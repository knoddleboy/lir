"use client";

import { Button, Icons, Layout } from "@lir/ui";

import { useIsClient } from "usehooks-ts";

import Link from "next/link";

import { sessionModel } from "~/entities/session";
import { Header } from "~/widgets/layouts/landing/header";
import { Nav } from "~/widgets/layouts/landing/nav";

export default function LandingPage() {
  const isClient = useIsClient();
  const isAuth = sessionModel.useAuth();

  return (
    <>
      <Header>
        <Nav />
      </Header>

      <Layout>
        <div className="h-20" />
        <div className="flex w-full justify-center">
          {isClient && !isAuth && (
            <Button variant="ghost" size="link" text="base" asChild>
              <Link href="/d">
                Go to web app <Icons.arrowRight className="ml-1" size={16} />
              </Link>
            </Button>
          )}
        </div>
      </Layout>
    </>
  );
}
