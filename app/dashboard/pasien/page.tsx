"use client";

import { Aside } from "@/components/Aside";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { DeleteModal } from "@/components/modals/DeleteModal";
import { PasienModal } from "@/components/modals/PasienModal";
import { Patient, PatientFormValues } from "@/types/patient";
import {
  Bed,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Filter,
  Hash,
  Pencil,
  Plus,
  Search,
  Sheet,
  Trash2,
  UserPlus,
  Users,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const getStatusClass = (status: string) => {
  if (status === "Rawat Jalan") {
    return "bg-success-light text-success-dark border-success/20";
  }
  if (status === "Rawat Inap") {
    return "bg-blue-100 text-blue-700 border-blue-200";
  }
  if (status === "Observasi") {
    return "bg-warning-light text-warning-dark border-warning/20";
  }
  return "bg-gray-100 text-gray-700 border-gray-200";
};

const getPoliColor = (poli: string) => {
  if (poli.includes("Gigi")) return "bg-orange-500";
  if (poli.includes("Kandungan")) return "bg-green-500";
  if (poli.includes("Jantung")) return "bg-purple-500";
  if (poli.includes("IGD")) return "bg-red-500";
  return "bg-blue-500";
};

const getInitials = (name: string) => {
  const parts = name.trim().split(" ").filter(Boolean);
  return parts
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
};

const getAgeFromDob = (dob: string) => {
  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) {
    return 0;
  }

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age -= 1;
  }
  return age;
};

export default function PasienPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadPatients = async () => {
      setLoading(true);
      setLoadError(null);

      try {
        const response = await fetch("/api/patients", { method: "GET" });
        const result = (await response.json()) as {
          patients?: Patient[];
          error?: string;
        };

        if (!response.ok) {
          if (!cancelled) {
            setLoadError(result.error ?? "Gagal memuat data pasien");
          }
          return;
        }

        if (!cancelled) {
          setPatients(result.patients ?? []);
        }
      } catch {
        if (!cancelled) {
          setLoadError("Gagal memuat data pasien");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadPatients();
    return () => {
      cancelled = true;
    };
  }, []);

  const editingPatient = useMemo(
    () => patients.find((patient) => patient.id === editingId) ?? null,
    [patients, editingId],
  );

  const modalInitValues = useMemo<PatientFormValues | undefined>(() => {
    if (!editingPatient) {
      return undefined;
    }

    return {
      rm: editingPatient.rm,
      nik: editingPatient.nik,
      name: editingPatient.name,
      dob: editingPatient.dob,
      gender: editingPatient.gender,
      phone: editingPatient.phone,
      poli: editingPatient.poli,
      status: editingPatient.status,
      address: editingPatient.address,
    };
  }, [editingPatient]);

  const modalKey = useMemo(() => {
    if (!modalOpen) {
      return "closed";
    }

    if (modalMode === "edit" && editingPatient) {
      return `editi-${editingPatient.id}`;
    }
    return "add";
  }, [modalOpen, modalMode, editingPatient]);

  const openAddModal = () => {
    setModalMode("add");
    setEditingId(null);
    setModalOpen(true);
  };

  const openEditModal = (id: string) => {
    setModalMode("edit");
    setEditingId(id);
    setModalOpen(true);
  };

  const openDeleteModal = (id: string) => {
    setDeleteId(id);
    setDeleteError(null);
    setDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteLoading(false);
    setDeleteError(null);
    setDeleteOpen(false);
    setDeleteId(null);
  };

  const confirmDelete = async () => {
    if (!deleteId) {
      return;
    }

    setDeleteLoading(true);
    setDeleteError(null);

    try {
      const response = await fetch(`/api/patients/${deleteId}`, {
        method: "DELETE",
      });

      const result = (await response.json()) as { error?: string };
      if (!response.ok) {
        setDeleteError(result.error ?? "Gagal menghapus data pasien");
        return;
      }

      setPatients((prev) => prev.filter((patient) => patient.id !== deleteId));
      closeDeleteModal();
    } catch {
      setDeleteError("Gagal menghapus data pasien.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleSubmit = async (values: PatientFormValues) => {
    const age = getAgeFromDob(values.dob);

    if (modalMode === "add") {
      const response = await fetch("/api/patients", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as {
        patient?: Patient;
        error?: string;
      };

      if (!response.ok || !result.patient) {
        return {
          ok: false,
          message: result.error ?? "Gagal menyimpan data pasien.",
        };
      }

      const newPatient: Patient = {
        ...result.patient,
        age: result.patient.age ?? age,
      };

      setPatients((prev) => [newPatient, ...prev]);
      return { ok: true };
    }

    if (!editingPatient) {
      return { ok: false, message: "Pasien tidak ditemukan." };
    }

    const response = await fetch(`/api/patients/${editingPatient.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });

    const result = (await response.json()) as {
      patient?: Patient;
      error?: string;
    };

    if (!response.ok || !result.patient) {
      return {
        ok: false,
        message: result.error ?? "Gagal memperbarui data pasien.",
      };
    }

    const updatedPatient: Patient = {
      ...result.patient,
      age: result.patient.age ?? age,
    };

    setPatients((prev) =>
      prev.map((patient) =>
        patient.id === editingPatient.id ? updatedPatient : patient,
      ),
    );

    return { ok: true };
  };

  return (
    <>
      <Aside />

      <main className="flex-1 lg:ml-[280px] flex flex-col bg-muted min-h-screen overflow-hidden">
        <Header title="Pasien" />

        {/* Page Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-5 md:p-8">
          {/* Quick Insights: 3 Mini Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card 1: Rawat Jalan */}
            <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-border shadow-sm">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Users className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary">
                    Rawat Jalan
                  </p>
                  <h3 className="text-2xl font-bold text-foreground mt-0.5">
                    8,432
                  </h3>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-success bg-success-light px-2 py-1 rounded-full">
                  +5.2%
                </span>
                <p className="text-xs text-secondary mt-1">Minggu ini</p>
              </div>
            </div>
            {/* Card 2: Rawat Inap */}
            <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-border shadow-sm">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Bed className="size-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary">
                    Rawat Inap
                  </p>
                  <h3 className="text-2xl font-bold text-foreground mt-0.5">
                    145
                  </h3>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-success bg-success-light px-2 py-1 rounded-full">
                  +1.8%
                </span>
                <p className="text-xs text-secondary mt-1">Minggu ini</p>
              </div>
            </div>
            {/* Card 3: Pasien Baru */}
            <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-border shadow-sm">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-success/10 rounded-xl flex items-center justify-center">
                  <UserPlus className="size-6 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary">
                    Pasien Baru
                  </p>
                  <h3 className="text-2xl font-bold text-foreground mt-0.5">
                    324
                  </h3>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-error bg-error-light px-2 py-1 rounded-full">
                  -2.4%
                </span>
                <p className="text-xs text-secondary mt-1">Minggu ini</p>
              </div>
            </div>
          </div>
          {/* Toolbar: Search, Filter, Actions */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            {/* Search Bar */}
            <div className="relative w-full lg:w-[400px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5 text-secondary" />
              <input
                type="text"
                placeholder="Cari Nama/No RM..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 placeholder:text-secondary shadow-sm transition-all"
              />
            </div>
            {/* Actions Group */}
            <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
              {/* Filter */}
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-3 bg-white border border-border rounded-xl hover:bg-muted transition-all text-sm font-medium text-foreground shadow-sm">
                  <Filter className="size-4 text-secondary" />
                  Filter Layanan
                  <ChevronDown className="size-4 text-secondary ml-1" />
                </button>
                {/* Dropdown (Hidden by default, hover logic simulated) */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-border rounded-xl shadow-xl hidden group-hover:block z-20 p-1">
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg"
                  >
                    Semua Poli
                  </a>
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg"
                  >
                    Poli Umum
                  </a>
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg"
                  >
                    Poli Gigi
                  </a>
                  <a
                    href="#"
                    className="block px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg"
                  >
                    IGD
                  </a>
                </div>
              </div>
              {/* Export */}
              <button className="flex items-center gap-2 px-4 py-3 bg-white border border-border rounded-xl hover:bg-muted transition-all text-sm font-medium text-foreground shadow-sm">
                <Sheet className="size-4 text-success" />
                Export Excel
              </button>
              {/* Add Patient */}
              <button
                onClick={openAddModal}
                className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl hover:bg-primary-hover transition-all text-sm font-bold shadow-lg shadow-primary/30 cursor-pointer"
              >
                <Plus className="size-4" />
                Tambah Pasien
              </button>
            </div>
          </div>
          {/* Main Data Table */}
          <div className="flex flex-col rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]" id="patients-table">
                <thead className="bg-gray-50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary uppercase tracking-wider">
                      Pasien
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary uppercase tracking-wider">
                      No. Rekam Medis
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary uppercase tracking-wider">
                      Umur / JK
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary uppercase tracking-wider">
                      Poli / Layanan
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-secondary uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-white">
                  {loadError ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-6 text-sm text-error text-center"
                      >
                        {loadError}
                      </td>
                    </tr>
                  ) : loading ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-6 text-sm text-secondary text-center"
                      >
                        Memuat data pasien...
                      </td>
                    </tr>
                  ) : patients.length === 0 ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-6 py-6 text-sm text-secondary text-center"
                      >
                        Belum ada data pasien.
                      </td>
                    </tr>
                  ) : (
                    patients.map((patient) => (
                      <tr
                        key={patient.id}
                        className="hover:bg-muted/30 transition-colors group"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-3">
                            {patient.avatarUrl ? (
                              <Image
                                className="size-10 rounded-full object-cover ring-2 ring-border"
                                src={patient.avatarUrl}
                                width={36}
                                height={36}
                                alt={patient.name}
                              />
                            ) : (
                              <div className="size-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold ring-2 ring-border">
                                {getInitials(patient.name)}
                              </div>
                            )}
                            <div>
                              <div className="text-sm font-bold text-foreground">
                                {patient.name}
                              </div>
                              <div className="text-xs text-secondary">
                                {patient.address}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Hash className="size-3 text-secondary" />
                            <span className="text-sm font-mono text-foreground font-medium">
                              {patient.rm}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-foreground">
                            {patient.age} Tahun
                          </div>
                          <div className="text-xs text-secondary">
                            {patient.gender}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span
                              className={`size-2 rounded-full ${getPoliColor(
                                patient.poli,
                              )}`}
                            />
                            <span className="text-sm text-foreground">
                              {patient.poli}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusClass(
                              patient.status,
                            )}`}
                          >
                            {patient.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => openEditModal(patient.id)}
                              className="p-2 rounded-lg text-secondary hover:text-primary hover:bg-primary/5 transition-all cursor-pointer"
                              title="Edit"
                            >
                              <Pencil className="size-4" />
                            </button>
                            <button
                              onClick={() => openDeleteModal(patient.id)}
                              className="p-2 rounded-lg text-secondary hover:text-error hover:bg-error/5 transition-all cursor-pointer"
                              title="Hapus"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-between p-5 border-t border-border bg-white">
              <div className="text-sm text-secondary">
                Menampilkan
                <span className="font-bold text-foreground">1-5</span> dari
                <span className="font-bold text-foreground">45</span> pasien
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-xl border border-border text-secondary hover:bg-muted hover:text-foreground transition-all disabled:opacity-50">
                  <ChevronLeft className="size-4" />
                </button>
                <button className="size-9 rounded-xl bg-primary text-white text-sm font-medium flex items-center justify-center">
                  1
                </button>
                <button className="size-9 rounded-xl border border-border text-secondary hover:bg-muted hover:text-foreground text-sm font-medium flex items-center justify-center transition-all">
                  2
                </button>
                <button className="size-9 rounded-xl border border-border text-secondary hover:bg-muted hover:text-foreground text-sm font-medium flex items-center justify-center transition-all">
                  3
                </button>
                <span className="text-secondary px-1">...</span>
                <button className="size-9 rounded-xl border border-border text-secondary hover:bg-muted hover:text-foreground text-sm font-medium flex items-center justify-center transition-all">
                  9
                </button>
                <button className="p-2 rounded-xl border border-border text-secondary hover:bg-muted hover:text-foreground transition-all">
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
          {/* Footer Copyright */}
          <Footer />
        </div>
      </main>
      <PasienModal
        key={modalKey}
        open={modalOpen}
        mode={modalMode}
        initialValues={modalInitValues}
        onCloseAction={() => setModalOpen(false)}
        onSubmitAction={handleSubmit}
      />
      <DeleteModal
        open={deleteOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        loading={deleteLoading}
        error={deleteError}
      />
    </>
  );
}
