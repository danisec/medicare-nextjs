"use client";

import { Bell, Menu, Search } from "lucide-react";
import Image from "next/image";
import { openSearchModal } from "@/lib/modals/search";
import { toggleSidebar } from "@/lib/toggleSidebar";
import { useEffect, useState } from "react";

interface HeadProps {
  title: string;
}

export function Header({ title }: HeadProps) {
  const [clock, setClock] = useState("00:00:00");
  const [date, setDate] = useState("Jan 01, 2026");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now
        .toLocaleString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        .replace(".", ":")
        .replace(".", ":");

      const dateString = now.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });

      setClock(timeString);
      setDate(dateString);
    };

    updateClock();
    const intervalId = window.setInterval(updateClock, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  });

  return (
    <>
      <header className="flex items-center justify-between w-full h-[90px] shrink-0 bg-white border-b border-border px-5 md:px-8">
        {/* Left: Mobile menu & Title */}
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            aria-label="Open menu"
            className="lg:hidden size-11 flex items-center justify-center rounded-xl ring-1 ring-border hover:ring-primary transition-all duration-300 cursor-pointer"
          >
            <Menu className="size-6 text-foreground" />
          </button>
          <div className="hidden lg:flex flex-col">
            <h2 className="font-bold text-2xl text-foreground">{title}</h2>
            <p className="text-sm text-secondary">
              Selamat datang kembali, Dr. Hartono
            </p>
          </div>
        </div>
        {/* Center: Real-time Date/Time (Desktop only) */}
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-muted rounded-xl">
          <i data-lucide="clock" className="size-4 text-primary" />
          <span
            id="realtime-clock"
            className="font-mono text-sm font-semibold text-primary"
          >
            {clock}
          </span>
          <span className="text-secondary text-sm">|</span>
          <span
            id="realtime-date"
            className="text-sm font-medium text-foreground"
          >
            {date}
          </span>
        </div>
        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-3">
          <button
            onClick={openSearchModal}
            className="size-11 flex items-center justify-center rounded-xl ring-1 ring-border hover:ring-primary transition-all duration-300 cursor-pointer"
            aria-label="Search"
          >
            <Search className="size-6 text-secondary" />
          </button>
          <button
            className="size-11 flex items-center justify-center rounded-xl ring-1 ring-border hover:ring-primary transition-all duration-300 cursor-pointer relative"
            aria-label="Notifications"
          >
            <Bell className="size-6 text-secondary" />
            <span className="absolute top-2.5 right-3 size-2 rounded-full bg-error ring-2 ring-white" />
          </button>
          {/* Doctor Profile */}
          <div className="hidden md:flex items-center gap-3 pl-3 border-l border-border ml-2">
            <div className="text-right">
              <p className="font-semibold text-foreground text-sm">
                Dr. Budi Hartono
              </p>
              <p className="text-secondary text-xs">Spesialis Jantung</p>
            </div>
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=100&h=100&fit=crop"
                width={36}
                height={36}
                alt="Dr. Profile"
                className="size-11 rounded-full object-cover ring-2 ring-border"
              />
              <span className="absolute bottom-0 right-0 size-3 rounded-full bg-success ring-2 ring-white" />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
