"use client";

import { toggleSidebar } from "@/lib/toggleSidebar";

export function SidebarOverlay() {
  return (
    <>
      <div
        id="sidebar-overlay"
        className="fixed inset-0 bg-black/80 z-40 lg:hidden hidden"
        onClick={() => toggleSidebar()}
      ></div>
    </>
  );
}
