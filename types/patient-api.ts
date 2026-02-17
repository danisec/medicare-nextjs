import { CareStatus, Gender, Patient, Poli } from "@/types/patient";

export type PatientInput = {
    rm: string;
    nik: string;
    name: string;
    dob: string;
    gender: Gender;
    phone: string
    poli: Poli
    status: CareStatus
    address: string
}

export type PatientCreateInput = PatientInput;
export type PatientUpdateInput = Partial<PatientInput>;

export type DbGender = "laki_laki" | "perempuan";
export type DbPoli = 
    | "poli_umum"
    | "poli_gigi"
    | "poli_jantung"
    | "poli_penyakit_dalam"
    | "poli_kandungan"
    | "igd_darurat"
export type DbCareStatus = "rawat_jalan" | "rawat_inap" | "observasi" | "selesai";

export type PatientInsert = {
    medical_record_no: string;
    national_id: string;
    full_name: string;
    birth_date: string;
    gender: DbGender;
    phone: string;
    poli: DbPoli;
    care_status: DbCareStatus;
    address: string;
    avatar_url?: string | null
}

export type PatientRow = PatientInsert & {
    id: string;
    created_at: string;
    updated_at: string;
}

export const allowedGenders: Gender[] = ["Laki-laki", "Perempuan"];
export const allowedPoli: Poli[] = [
    "Poli Umum",
    "Poli Gigi",
    "Poli Jantung",
    "Poli Penyakit Dalam",
    "Poli Kandungan",
    "IGD (Darurat)",
]
export const allowedStatuses: CareStatus[] = [
    "Rawat Jalan",
    "Rawat Inap",
    "Observasi",
    "Selesai",
]

export const genderToDb: Record<Gender, DbGender> = {
    "Laki-laki": "laki_laki",
    "Perempuan": "perempuan",
}
export const poliToDb: Record<Poli, DbPoli> = {
    "Poli Umum": "poli_umum",
    "Poli Gigi": "poli_gigi",
    "Poli Jantung": "poli_jantung",
    "Poli Penyakit Dalam": "poli_penyakit_dalam",
    "Poli Kandungan": "poli_kandungan",
    "IGD (Darurat)": "igd_darurat",
}

export const statusToDb: Record<CareStatus, DbCareStatus> = {
    "Rawat Jalan": "rawat_jalan",
    "Rawat Inap": "rawat_inap",
    "Observasi": "observasi",
    "Selesai": "selesai",
}

export const dbToGender: Record<DbGender, Gender> = {
    laki_laki: "Laki-laki",
    perempuan: "Perempuan",
}

export const dbToPoli: Record<DbPoli, Poli> = {
    poli_umum: "Poli Umum",
    poli_gigi: "Poli Gigi",
    poli_jantung: "Poli Jantung",
    poli_penyakit_dalam: "Poli Penyakit Dalam",
    poli_kandungan: "Poli Kandungan",
    igd_darurat: "IGD (Darurat)",
}

export const dbToStatus: Record<DbCareStatus, CareStatus> = {
    rawat_jalan: "Rawat Jalan",
    rawat_inap: "Rawat Inap",
    observasi: "Observasi",
    selesai: "Selesai"
}

export const normalizeString = (value: unknown) => typeof value === "string" ? value.trim() : "";

export const isValidDate = (value: string) => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
        return false;
    }

    const parsed = new Date(value);
    if(Number.isNaN(parsed.getTime())) {
        return false;
    }
    return parsed <= new Date();
}

export const getAgeFromDob = (dob: string) => {
    const birthDate = new Date(dob);
    if (Number.isNaN(birthDate.getTime())) {
        return 0;
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getMonth();
    const monthDiff = today.getMonth() - birthDate.getFullYear();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age -= 1;
    }

    return age;

};

export const toPatientInsert = (input: PatientInput): PatientInsert => ({
    medical_record_no: input.rm,
    national_id: input.nik,
    full_name: input.name,
    birth_date: input.dob,
    gender: genderToDb[input.gender],
    phone: input.phone,
    poli: poliToDb[input.poli],
    care_status: statusToDb[input.status],
    address: input.address,
    avatar_url: null,
})

export const toPatientUpdate = (
  input: PatientUpdateInput,
): Partial<PatientInsert> => {
  const payload: Partial<PatientInsert> = {};

  if (input.rm) {
    payload.medical_record_no = input.rm;
  }

  if (input.nik) {
    payload.national_id = input.nik;
  }

  if (input.name) {
    payload.full_name = input.name;
  }

  if (input.dob) {
    payload.birth_date = input.dob;
  }

  if (input.gender) {
    payload.gender = genderToDb[input.gender];
  }

  if (input.phone) {
    payload.phone = input.phone;
  }

  if (input.poli) {
    payload.poli = poliToDb[input.poli];
  }

  if (input.status) {
    payload.care_status = statusToDb[input.status];
  }

  if (input.address) {
    payload.address = input.address;
  }

  return payload;
};

export const mapRowToPatient = (row: PatientRow): Patient => ({
    id: row.id,
    name: row.full_name,
    address: row.address,
    rm: row.medical_record_no,
    age: getAgeFromDob(row.birth_date),
    gender: dbToGender[row.gender],
    poli: dbToPoli[row.poli],
    status: dbToStatus[row.care_status],
    nik: row.national_id,
    dob: row.birth_date as Patient["dob"],
    phone: row.phone,
    avatarUrl: row.avatar_url ?? undefined,

})