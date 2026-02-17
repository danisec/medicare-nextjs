"use client";

import { useMemo, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import type { PatientFormState, PatientFormValues } from "@/types/patient";

type PasienModalProps = {
  open: boolean;
  mode: "add" | "edit";
  initialValues?: PatientFormValues;
  onCloseAction: () => void;
  onSubmitAction: (
    values: PatientFormValues,
  ) => Promise<{ ok: boolean; message?: string }>;
};

const emptyValues: PatientFormState = {
  rm: "",
  nik: "",
  name: "",
  dob: "",
  gender: "",
  phone: "",
  poli: "",
  status: "Rawat Jalan",
  address: "",
};

const requiredFields: (keyof PatientFormValues)[] = [
  "rm",
  "nik",
  "name",
  "dob",
  "gender",
  "phone",
  "poli",
  "address",
];

export function PasienModal({
  open,
  mode,
  initialValues,
  onCloseAction,
  onSubmitAction,
}: PasienModalProps) {
  const [values, setValues] = useState<PatientFormState>(() => ({
    ...emptyValues,
    ...initialValues,
  }));
  const [errors, setErrors] = useState<
    Partial<Record<keyof PatientFormState, string>>
  >({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const title = useMemo(
    () => (mode === "edit" ? "Edit Data Pasien" : "Tambah Pasien Baru"),
    [mode],
  );

  const handleChange = (field: keyof PatientFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError("");

    const nextErrors: Partial<Record<keyof PatientFormState, string>> = {};
    requiredFields.forEach((field) => {
      if (!values[field].trim()) {
        nextErrors[field] = "Wajib diisi";
      }
    });

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (values.dob === "" || values.gender === "" || values.poli === "") {
      return;
    }

    const submittedValues: PatientFormValues = {
      ...values,
      dob: values.dob,
      gender: values.gender,
      poli: values.poli,
    };

    setIsSubmitting(true);
    const result = await onSubmitAction(submittedValues);
    setIsSubmitting(false);

    if (!result.ok) {
      setSubmitError(result.message ?? "Gagal menyimpan data pasien.");
      return;
    }

    onCloseAction();
  };

  if (!open) {
    return null;
  }

  return (
    <div
      id="patient-modal"
      className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onCloseAction();
        }
      }}
    >
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
        <div className="p-6 border-b border-border flex justify-between items-center sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-foreground" id="modal-title">
            {title}
          </h3>
          <button
            type="button"
            onClick={onCloseAction}
            className="p-2 hover:bg-muted rounded-xl cursor-pointer"
            aria-label="Tutup"
          >
            <X className="size-5" />
          </button>
        </div>
        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm font-medium text-secondary">
                No. Rekam Medis <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="input-rm"
                value={values.rm}
                onChange={(event) => handleChange("rm", event.target.value)}
                className={`w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-gray-50 font-mono text-sm${
                  errors.rm ? " border-error" : ""
                }`}
                placeholder="RM-2024-XXX"
              />
              {errors.rm && (
                <span className="text-error text-xs">{errors.rm}</span>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-secondary">
                NIK <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="input-nik"
                value={values.nik}
                onChange={(event) => handleChange("nik", event.target.value)}
                className={`w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20${
                  errors.nik ? " border-error" : ""
                }`}
                placeholder="16 digit NIK"
              />
              {errors.nik && (
                <span className="text-error text-xs">{errors.nik}</span>
              )}
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-secondary">
                Nama Lengkap <span className="text-error">*</span>
              </label>
              <input
                type="text"
                id="input-nama"
                value={values.name}
                onChange={(event) => handleChange("name", event.target.value)}
                className={`w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20${
                  errors.name ? " border-error" : ""
                }`}
                placeholder="Nama Pasien"
              />
              {errors.name && (
                <span className="text-error text-xs">{errors.name}</span>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-secondary">
                Tanggal Lahir <span className="text-error">*</span>
              </label>
              <input
                type="date"
                id="input-dob"
                value={values.dob}
                onChange={(event) => handleChange("dob", event.target.value)}
                className={`w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20${
                  errors.dob ? " border-error" : ""
                }`}
              />
              {errors.dob && (
                <span className="text-error text-xs">{errors.dob}</span>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-secondary">
                Jenis Kelamin <span className="text-error">*</span>
              </label>
              <select
                id="input-gender"
                value={values.gender}
                onChange={(event) => handleChange("gender", event.target.value)}
                className={`w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white${
                  errors.gender ? " border-error" : ""
                }`}
              >
                <option value="">Pilih...</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
              {errors.gender && (
                <span className="text-error text-xs">{errors.gender}</span>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-secondary">
                No. HP <span className="text-error">*</span>
              </label>
              <input
                type="tel"
                id="input-phone"
                value={values.phone}
                onChange={(event) => handleChange("phone", event.target.value)}
                className={`w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20${
                  errors.phone ? " border-error" : ""
                }`}
                placeholder="0812..."
              />
              {errors.phone && (
                <span className="text-error text-xs">{errors.phone}</span>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-secondary">
                Poli / Layanan <span className="text-error">*</span>
              </label>
              <select
                id="input-poli"
                value={values.poli}
                onChange={(event) => handleChange("poli", event.target.value)}
                className={`w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white${
                  errors.poli ? " border-error" : ""
                }`}
              >
                <option value="">Pilih...</option>
                <option value="Poli Umum">Poli Umum</option>
                <option value="Poli Gigi">Poli Gigi</option>
                <option value="Poli Jantung">Poli Jantung</option>
                <option value="Poli Penyakit Dalam">Poli Penyakit Dalam</option>
                <option value="Poli Kandungan">Poli Kandungan</option>
                <option value="IGD (Darurat)">IGD (Darurat)</option>
              </select>
              {errors.poli && (
                <span className="text-error text-xs">{errors.poli}</span>
              )}
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium text-secondary">
                Status Perawatan <span className="text-error">*</span>
              </label>
              <select
                id="input-status"
                value={values.status}
                onChange={(event) => handleChange("status", event.target.value)}
                className="w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 bg-white"
              >
                <option value="Rawat Jalan">Rawat Jalan</option>
                <option value="Rawat Inap">Rawat Inap</option>
                <option value="Observasi">Observasi</option>
                <option value="Selesai">Selesai</option>
              </select>
            </div>
            <div className="space-y-1 md:col-span-2">
              <label className="text-sm font-medium text-secondary">
                Alamat Lengkap <span className="text-error">*</span>
              </label>
              <textarea
                id="input-address"
                rows={3}
                value={values.address}
                onChange={(event) =>
                  handleChange("address", event.target.value)
                }
                className={`w-full px-4 py-2 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none${
                  errors.address ? " border-error" : ""
                }`}
              />
              {errors.address && (
                <span className="text-error text-xs">{errors.address}</span>
              )}
            </div>
          </div>
          <div className="pt-4 border-t border-border flex justify-end gap-3">
            <button
              type="button"
              onClick={onCloseAction}
              className="px-5 py-2.5 rounded-xl border border-border text-secondary font-medium hover:bg-muted transition-all cursor-pointer"
            >
              Batal
            </button>

            <div className="flex flex-col items-end gap-2">
              {submitError ? (
                <span className="text-error text-xs">{submitError}</span>
              ) : null}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover shadow-lg shadow-primary/30 transition-all cursor-pointer disabled:opacity-70"
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Data"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
