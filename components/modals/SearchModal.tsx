"use client";

import { Search } from "lucide-react";
import { closeSearchModal } from "@/lib/modals/search";

export function SearchModal() {
  return (
    <>
      <div
        id="search-modal"
        className="fixed inset-0 bg-black/50 z-[100] hidden items-center justify-center p-4"
      >
        <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[80vh] overflow-hidden shadow-2xl">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-3 bg-muted rounded-xl px-4">
              <Search className="size-5 text-secondary" />
              <input
                type="text"
                id="search-input"
                placeholder="Cari pasien, dokter, atau layanan..."
                className="flex-1 py-3 bg-transparent outline-none text-foreground placeholder:text-secondary"
              />
              <button
                onClick={closeSearchModal}
                className="text-xs bg-white px-2 py-1 rounded border border-border text-secondary"
              >
                ESC
              </button>
            </div>
          </div>
          <div className="p-4">
            <p className="text-sm text-secondary mb-3">Pencarian Terakhir</p>
            <div className="flex flex-col gap-2">
              <a
                href="#"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-all cursor-pointer"
              >
                <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center">
                  <i data-lucide="user" className="size-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">Ahmad Santoso</p>
                  <p className="text-xs text-secondary">Pasien - RM-2024-001</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
