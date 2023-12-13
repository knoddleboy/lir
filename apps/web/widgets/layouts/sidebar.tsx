"use client";

import { Icons } from "@lir/ui";

import React, { useRef, useEffect } from "react";
import type { ElementRef } from "react";

import { Navigation, NavigationItem, useSidebarStore } from "~/features/sidebar";
import { Search } from "~/features/sidebar/search";
import { UserDropdown } from "~/features/user/user-dropdown";

const SIDEBAR_DEFAULT_WIDTH = 240;
const SIDEBAR_MIN_WIDTH = 120;
const SIDEBAR_MAX_WIDTH = 400;

const SidebarResizableContainer = ({ children }: { children: React.ReactNode }) => {
  const { isOpened, shouldAnimate, setIsOpened } = useSidebarStore();

  const sidebarRef = useRef<ElementRef<"nav">>(null);
  const resizerRef = useRef<ElementRef<"div">>(null);
  const resizerHighlighted = useRef<boolean>(false);
  const isResizing = useRef<boolean>(false);
  const didResize = useRef<boolean>(false);
  const lastWidth = useRef<number>(SIDEBAR_DEFAULT_WIDTH);

  useEffect(() => {
    highlightResizer(!isOpened);
  }, [isOpened]);

  const onMouseDown = () => {
    if (!sidebarRef.current || !resizerRef.current) return;

    // We do not want to persist the transition during drag, so once
    // the user clicks on the resizer, set `shouldAnimate` to false.
    if (shouldAnimate) {
      setIsOpened(isOpened, false);
    }

    isResizing.current = true;
    didResize.current = false;

    sidebarRef.current.classList.add("shadow-sidebar-active");

    document.body.style.userSelect = "none";
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!sidebarRef.current || !resizerRef.current) return;

    if (!didResize.current) {
      didResize.current = true;
    }

    let newWidth = e.clientX;

    // Once the cursor reaches the minimum width, remove the highlight
    if (newWidth > SIDEBAR_MIN_WIDTH && resizerHighlighted.current) {
      highlightResizer(false);
    }

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
    if (!sidebarRef.current || !resizerRef.current) return;

    const sidebarOpened = sidebarRef.current.clientWidth > 0;

    setIsOpened(sidebarOpened);

    if (!sidebarOpened) {
      highlightResizer(true);
    }

    isResizing.current = false;
    lastWidth.current = sidebarOpened
      ? sidebarRef.current.clientWidth
      : SIDEBAR_DEFAULT_WIDTH;

    sidebarRef.current.classList.remove("shadow-sidebar-active");
    sidebarRef.current.classList.add("shadow-sidebar");

    document.body.style.removeProperty("cursor");
    document.body.style.removeProperty("user-select");
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

  // TODO: fix reset to default on oclick to previous value
  const onClick = () => {
    if (!sidebarRef.current || !resizerRef.current) return;

    // Since `onClick` is triggered synchronously after `onMouseUp`, we aim to prevent
    // the undesired changes described below when the user finishes resizing.
    if (didResize.current) {
      return;
    }

    // When a user clicks on the resizer, we want to reset the sidebar
    // to its default width and thus set `shouldAnimate` to true.
    setIsOpened(true, true);

    // If the user remains on the resizer, we want to keep it active to
    // create a hover effect. Therefore, reset the class, which was removed
    // in `onMouseUp` (as it fires first).
    sidebarRef.current.classList.add("shadow-sidebar-active");

    if (resizerHighlighted.current) {
      highlightResizer(false);
    }

    lastWidth.current = SIDEBAR_DEFAULT_WIDTH;
    sidebarRef.current.style.width = `${SIDEBAR_DEFAULT_WIDTH}px`;
  };

  // This helps to locate the resizer when the sidebar is closed.
  const highlightResizer = (highlight: boolean) => {
    if (!resizerRef.current) return;

    if (highlight) {
      resizerHighlighted.current = true;
      resizerRef.current.classList.add("hover:bg-control");
      resizerRef.current.classList.add("active:bg-control-foreground");
      resizerRef.current.style.padding = "0 8px";
    } else {
      resizerHighlighted.current = false;
      resizerRef.current.classList.remove("hover:bg-control");
      resizerRef.current.classList.remove("active:bg-control-foreground");
      resizerRef.current.style.removeProperty("padding");
    }
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
          ref={resizerRef}
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
    <>
      <SidebarResizableContainer>
        <UserDropdown />
        <Navigation />
        <div className="text-accent-foreground/40 mt-2.5 select-none px-3 text-xs font-bold">
          Documents
        </div>
        <Documents />
      </SidebarResizableContainer>
      <Search />
    </>
  );
};
