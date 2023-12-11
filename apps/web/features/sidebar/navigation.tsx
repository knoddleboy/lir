import { cn } from "@lir/lib";
import { Icons } from "@lir/ui";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationItemType = {
  name: string;
  href?: string;
  icon?: React.ReactNode;
  isCurrent?: ({ pathname }: { pathname: string }) => boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
};

const navigation: NavigationItemType[] = [
  {
    name: "Settings",
    href: "/settings",
    icon: <Icons.settings size={16} />,
    isCurrent: ({ pathname }) => pathname.startsWith("/settings") ?? false,
  },
  {
    name: "Trash",
    icon: <Icons.trash />,
  },
  {
    name: "Import",
    icon: <Icons.import size={16} />,
  },
];

export const NavigationItem = ({ item }: { item: NavigationItemType }) => {
  const pathname = usePathname();
  const current = item.isCurrent?.({ pathname }) ?? false;

  const sharedAttributes = {
    role: "button",
    tabIndex: 0,
    className: cn(
      "_ring hover:bg-control active:text-accent-foreground active:bg-control-foreground text-accent-foreground/75 flex cursor-pointer select-none items-center rounded-md py-1 pl-3.5 pr-1.5 font-medium",
      current && "bg-control"
    ),
  };

  return (
    <div className="group mx-1.5 my-0.5">
      {item.href ? (
        <Link href={item.href} {...sharedAttributes}>
          <div className="mr-2 flex h-4 w-4 shrink-0 grow-0 items-center justify-center">
            {item.icon}
          </div>

          <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {item.name}
          </div>
        </Link>
      ) : (
        <div {...sharedAttributes}>
          <div className="mr-2 flex h-4 w-4 shrink-0 grow-0 items-center justify-center">
            {item.icon}
          </div>

          <div className="flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm">
            {item.name}
          </div>
        </div>
      )}
    </div>
  );
};

export const Navigation = () => (
  <nav>
    {navigation.map((item) => (
      <NavigationItem key={item.name} item={item} />
    ))}
  </nav>
);
