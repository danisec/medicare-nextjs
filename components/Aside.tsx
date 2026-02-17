"use client";

import {
  Activity,
  FolderKanban,
  HelpCircle,
  LayoutDashboard,
  Settings,
  User,
  X,
} from "lucide-react";
import { toggleSidebar } from "@/lib/toggleSidebar";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Aside() {
  const pathname = usePathname();
  const isActive = (path: string) =>
    pathname === path || pathname.startsWith(`${path}/`);

  return (
    <>
      <aside
        id="sidebar"
        className="flex flex-col w-[280px] shrink-0 h-screen fixed inset-y-0 left-0 z-50 bg-white border-r border-border transform -translate-x-full lg:translate-x-0 transition-transform duration-300 overflow-hidden"
      >
        {/* Top Bar with logo */}
        <div className="flex items-center justify-between border-b border-border h-[90px] px-5 gap-3">
          <div className="flex items-center gap-3">
            <div className="size-11 bg-primary rounded-xl flex items-center justify-center shrink-0">
              <Activity className="size-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-lg leading-tight">MediCare</h1>
              <p className="text-xs text-secondary font-medium">Center</p>
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            aria-label="Close sidebar"
            className="lg:hidden size-11 flex shrink-0 bg-white rounded-xl p-[10px] items-center justify-center ring-1 ring-border hover:ring-primary transition-all duration-300 cursor-pointer"
          >
            <X className="size-6 text-secondary" />
          </button>
        </div>
        {/* Navigation Menu */}
        <div className="flex flex-col p-5 gap-6 overflow-y-auto flex-1">
          <div className="flex flex-col gap-4">
            <h3 className="font-medium text-xs text-secondary uppercase tracking-wider">
              Menu Utama
            </h3>
            <div className="flex flex-col gap-1">
              {/* Active menu item */}
              <Link
                href={"/dashboard/overview"}
                className={`group cursor-pointer${isActive("/dashboard/overview") ? " active" : ""}`}
              >
                <div className="flex items-center rounded-xl p-4 gap-3 bg-white group-[.active]:bg-primary/5 group-hover:bg-muted transition-all duration-300">
                  <LayoutDashboard className="size-6 text-secondary group-[.active]:text-primary group-hover:text-foreground transition-all duration-300" />
                  <span className="font-medium text-secondary group-[.active]:font-semibold group-[.active]:text-primary group-hover:text-foreground transition-all duration-300">
                    Beranda
                  </span>
                </div>
              </Link>
              {/* Pasien */}
              <Link
                href={"/dashboard/pasien"}
                className={`group cursor-pointer${isActive("/dashboard/pasien") ? " active" : ""}`}
              >
                <div className="flex items-center rounded-xl p-4 gap-3 bg-white group-[.active]:bg-primary/5 group-hover:bg-muted transition-all duration-300">
                  <User className="size-6 text-secondary group-[.active]:text-primary group-hover:text-foreground transition-all duration-300" />
                  <span className="font-medium text-secondary group-[.active]:font-semibold group-[.active]:text-primary group-hover:text-foreground transition-all duration-300">
                    Pasien
                  </span>
                </div>
              </Link>
              {/* Administrasi */}
              <Link
                href={"/dashboard/administrasi"}
                className={`group cursor-pointer${isActive("/dashboard/administrasi") ? " active" : ""}`}
              >
                <div className="flex items-center rounded-xl p-4 gap-3 bg-white group-[.active]:bg-primary/5 group-hover:bg-muted transition-all duration-300">
                  <FolderKanban className="size-6 text-secondary group-[.active]:text-primary group-hover:text-foreground transition-all duration-300" />
                  <span className="font-medium text-secondary group-[.active]:font-semibold group-[.active]:text-primary group-hover:text-foreground transition-all duration-300">
                    Administrasi
                  </span>
                </div>
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4 mt-auto">
            <h3 className="font-medium text-xs text-secondary uppercase tracking-wider">
              Lainnya
            </h3>
            <div className="flex flex-col gap-1">
              <a href="#" className="group cursor-pointer">
                <div className="flex items-center rounded-xl p-4 gap-3 bg-white hover:bg-muted transition-all duration-300">
                  <Settings className="size-6 text-secondary group-hover:text-foreground transition-all duration-300" />
                  <span className="font-medium text-secondary group-hover:text-foreground transition-all duration-300">
                    Pengaturan
                  </span>
                </div>
              </a>
              <a href="#" className="group cursor-pointer">
                <div className="flex items-center rounded-xl p-4 gap-3 bg-white hover:bg-muted transition-all duration-300">
                  <HelpCircle className="size-6 text-secondary group-hover:text-foreground transition-all duration-300" />
                  <span className="font-medium text-secondary group-hover:text-foreground transition-all duration-300">
                    Bantuan
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
