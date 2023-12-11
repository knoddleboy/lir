import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Check your email",
};

export default function Page() {
  return (
    <>
      <div className="space-y-3">
        <h2 className="text-center text-2xl font-bold">Finish signing in</h2>
      </div>
      <div>
        <hr />
        <div className="my-8">
          <h2 className="text-center text-3xl font-bold">Check your email</h2>
          <div className="mt-6 text-center">
            We&apos;ve just sent a link to
            <div className="text-lg font-medium">test@test.com</div>
            <div className="my-6">
              Follow the link in your email to finish signing in.
            </div>
            If you haven&apos;t received it within a few minutes, double check your
            spam/junk folder.
          </div>
        </div>
      </div>
    </>
  );
}
