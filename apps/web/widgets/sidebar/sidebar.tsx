"use client";

import { cn } from "@lir/lib";
import { Icons } from "@lir/ui";

import React, { type ElementRef, useRef } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { useSidebarStore } from "~/features/sidebar";
import { ProfileCard } from "~/features/user";

const SIDEBAR_DEFAULT_WIDTH = 240;
const SIDEBAR_MIN_WIDTH = 120;
const SIDEBAR_MAX_WIDTH = 400;

const SidebarResizableContainer = ({ children }: { children: React.ReactNode }) => {
  const { isOpened, shouldAnimate, setIsOpened } = useSidebarStore();

  const sidebarRef = useRef<ElementRef<"nav">>(null);
  const isResizing = useRef<boolean>(false);
  const didResize = useRef<boolean>(false);
  const lastWidth = useRef<number>(SIDEBAR_DEFAULT_WIDTH);

  const onMouseDown = () => {
    if (!sidebarRef.current) return;

    // We do not want to persist the transition during drag, so once
    // the user clicks on the resizer, set `shouldAnimate` to false.
    setIsOpened(isOpened, false);

    isResizing.current = true;
    sidebarRef.current.classList.add("shadow-sidebar-active");

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!sidebarRef.current) return;

    if (!didResize.current) {
      console.log("move:");
      didResize.current = true;
    }

    let newWidth = e.clientX;
    // Do not expand the sidebar beyond the maximum allowed width.
    if (newWidth > SIDEBAR_MAX_WIDTH) {
      newWidth = SIDEBAR_MAX_WIDTH;
      document.body.style.cursor = "w-resize";
    }
    // Cease resizing once the minimum allowed width is reached.
    if (newWidth > SIDEBAR_MIN_WIDTH && newWidth < SIDEBAR_DEFAULT_WIDTH) {
      newWidth = SIDEBAR_DEFAULT_WIDTH;
      document.body.style.cursor = "col-resize";
    }
    // Collapse after minimum allowed width after is reached.
    if (newWidth <= SIDEBAR_MIN_WIDTH) {
      newWidth = 0;
      document.body.style.cursor = "e-resize";
    }

    sidebarRef.current.style.width = `${newWidth}px`;
  };

  const onMouseUp = () => {
    if (!sidebarRef.current) return;

    const sidebarOpened = sidebarRef.current.clientWidth > 0;

    // Update the state only when the sidebar is closed to avoid unwanted re-renders.
    if (!sidebarOpened) {
      setIsOpened(sidebarOpened);
    }

    isResizing.current = false;
    lastWidth.current = sidebarOpened
      ? sidebarRef.current.clientWidth
      : SIDEBAR_DEFAULT_WIDTH;

    sidebarRef.current.classList.remove("shadow-sidebar-active");
    sidebarRef.current.classList.add("shadow-sidebar");

    document.body.style.removeProperty("cursor");
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  const onMouseEnter = () => {
    if (sidebarRef.current) {
      sidebarRef.current.classList.remove("shadow-sidebar");
      sidebarRef.current.classList.add("shadow-sidebar-active");
    }
  };

  const onMouseLeave = () => {
    if (sidebarRef.current && !isResizing.current) {
      sidebarRef.current.classList.remove("shadow-sidebar-active");
      sidebarRef.current.classList.add("shadow-sidebar");
    }
  };

  const onClick = () => {
    if (!sidebarRef.current) return;

    // Since `onClick` is triggered synchronously after `onMouseUp`, we aim to prevent
    // the undesired changes described below when the user finishes resizing.
    if (
      didResize.current &&
      // When the sidebar is maximized, the user's cursor is likely not to trigger `onClick`.
      // Therefore, we want to bypass this restriction and proceed to the instructions below.
      sidebarRef.current.clientWidth !== SIDEBAR_MAX_WIDTH
    ) {
      didResize.current = false;
      return;
    }

    // When a user clicks on the resizer, we want to reset the sidebar
    // to its default width and thus set `shouldAnimate` to true.
    setIsOpened(isOpened, true);

    // If the user remains on the resizer, we want to keep it active to
    // create a hover effect. Therefore, reset the class, which was removed
    // in `onMouseUp` (as it fires first).
    sidebarRef.current.classList.add("shadow-sidebar-active");

    lastWidth.current = SIDEBAR_DEFAULT_WIDTH;
    sidebarRef.current.style.width = `${SIDEBAR_DEFAULT_WIDTH}px`;
  };

  return (
    <nav
      ref={sidebarRef}
      aria-label="Sidebar"
      className="shadow-sidebar bg-accent relative h-full shrink-0 grow-0"
      style={{
        width: `${isOpened ? lastWidth.current ?? SIDEBAR_DEFAULT_WIDTH : 0}px`,
        transition: shouldAnimate ? "width linear 120ms" : "",
      }}
    >
      <div className="flex h-full flex-col overflow-hidden">{children}</div>
      <div className="absolute bottom-0 right-0 top-0 h-full w-0 grow-0">
        <div
          onClick={onClick}
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="-ml-[6px] h-full w-3 cursor-col-resize"
        ></div>
      </div>
    </nav>
  );
};

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

const NavigationItem = ({ item }: { item: NavigationItemType }) => {
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

const Navigation = () => (
  <nav>
    {navigation.map((item) => (
      <NavigationItem key={item.name} item={item} />
    ))}
  </nav>
);

const Documents = () => (
  <nav className="flex-1">
    <NavigationItem item={{ name: "", icon: <Icons.document /> }} />
    <NavigationItem
      item={{
        name: "New document",
        icon: (
          <Icons.plus
            size={16}
            strokeWidth={3}
            className="text-accent-foreground/60 group-active:text-accent-foreground/90"
          />
        ),
      }}
    />
  </nav>
);

export const Sidebar = () => {
  return (
    <SidebarResizableContainer>
      <ProfileCard />
      <Navigation />
      <div className="text-accent-foreground/40 mt-2.5 select-none px-3 text-xs font-bold">
        Documents
      </div>
      <Documents />
    </SidebarResizableContainer>
  );
};
