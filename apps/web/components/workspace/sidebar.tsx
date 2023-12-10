"use client";

import { useRef, type ElementRef } from "react";

const SIDEBAR_DEFAULT_WIDTH = 240;
const SIDEBAR_MIN_WIDTH = 120;
const SIDEBAR_MAX_WIDTH = 400;

const SidebarResizableContainer = ({ children }: { children: React.ReactNode }) => {
  const sidebarRef = useRef<ElementRef<"nav">>(null);
  const isResizing = useRef<boolean>(false);

  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    if (!sidebarRef.current) return;

    e.preventDefault();
    e.stopPropagation();

    isResizing.current = true;
    sidebarRef.current.classList.add("shadow-sidebar-active");

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  const onMouseMove = (e: MouseEvent) => {
    if (!sidebarRef.current) return;

    let newWidth = e.clientX;
    // Do not expand the sidebar beyond the maximum allowed width
    if (newWidth > SIDEBAR_MAX_WIDTH) {
      newWidth = SIDEBAR_MAX_WIDTH;
      document.body.style.cursor = "w-resize";
    }
    // Cease resizing once the minimum allowed width is reached
    if (newWidth > SIDEBAR_MIN_WIDTH && newWidth < SIDEBAR_DEFAULT_WIDTH) {
      newWidth = SIDEBAR_DEFAULT_WIDTH;
      document.body.style.cursor = "col-resize";
    }
    // Collapse after minimum allowed width after is reached
    if (newWidth <= SIDEBAR_MIN_WIDTH) {
      newWidth = 0;
      document.body.style.cursor = "e-resize";
    }

    sidebarRef.current.style.width = `${newWidth}px`;
  };

  const onMouseUp = () => {
    if (!sidebarRef.current) return;

    isResizing.current = false;
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

  return (
    <nav
      ref={sidebarRef}
      aria-label="Sidebar"
      className="shadow-sidebar bg-accent relative h-full shrink-0 grow-0"
      style={{ width: `${SIDEBAR_DEFAULT_WIDTH}px` }}
    >
      <div className="flex h-full flex-col">{children}</div>
      <div className="absolute bottom-0 right-0 top-0 h-full w-0 grow-0">
        <div
          onMouseDown={onMouseDown}
          onMouseEnter={onMouseEnter}
          onMouseLeave={onMouseLeave}
          className="-ml-[6px] h-full w-3 cursor-col-resize"
        ></div>
      </div>
    </nav>
  );
};

export const Sidebar = () => {
  return (
    <SidebarResizableContainer>
      <div>1</div>
      <div>2</div>
    </SidebarResizableContainer>
  );
};
