import { ToggleSidebar } from "~/features/header/toggle-sidebar";
import { Header } from "~/widgets/layouts/header";

type Props = {
  children: React.ReactNode;
};

export default function NestedLayout({ children }: Props) {
  return (
    <>
      <Header>
        <ToggleSidebar />
      </Header>
      <main>{children}</main>
    </>
  );
}
