import { Icons } from "@lir/ui";

import { NavigationItem, type NavigationItemType } from "./ui/navigation-item";

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

export const Navigation = () => (
  <nav>
    {navigation.map((item) => (
      <NavigationItem key={item.name} item={item} />
    ))}
  </nav>
);
