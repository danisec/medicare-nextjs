"use client";

import { Trash2 } from "lucide-react";

type DeleteModalProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
  error?: string | null;
};

export function DeleteModal({
  open,
  onClose,
  onConfirm,
  loading = false,
  error = null,
}: DeleteModalProps) {
  if (!open) {
    return null;
  }

  return (
    <>
      <div
        id="delete-modal"
        className="fixed inset-0 bg-black/50 z-[70] flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            onClose();
          }
        }}
      >
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl">
          <div className="w-16 h-16 bg-error-light rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-error" />
          </div>
          <h3 className="text-foreground text-xl font-bold mb-2">
            Hapus Data Pasien?
          </h3>
          <p className="text-secondary text-sm mb-6">
            Tindakan ini tidak dapat dibatalkan. Data pasien akan dihapus secara
            permanen dari sistem.
          </p>
          <div className="flex gap-3 justify-center">
            {error ? (
              <p className="text-error text-xs font-medium mb-4">{error}</p>
            ) : null}
            <button
              onClick={onClose}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl border border-border text-secondary font-medium hover:bg-muted transition-all cursor-pointer"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="px-5 py-2.5 rounded-xl bg-error text-white font-bold hover:bg-red-600 shadow-lg shadow-error/30 transition-all cursor-pointer"
            >
              {loading ? "Menghapus..." : "Ya, Hapus"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
