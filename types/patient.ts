export type Gender = "Laki-laki" | "Perempuan";

export type CareStatus = 
    | "Rawat Jalan"
    | "Rawat Inap"
    | "Observasi"
    | "Selesai";

export type Poli =
    | "Poli Umum"
    | "Poli Gigi"
    | "Poli Jantung"
    | "Poli Penyakit Dalam"
    | "Poli Kandungan"
    | "IGD (Darurat)";

export type ISODateString = `${number}-${number}-${number}`;

export type PatientFormValues = {
    rm: string;
    nik: string;
    name: string;
    dob: ISODateString;
    gender: Gender;
    phone: string;
    poli: Poli;
    status: CareStatus;
    address: string;
}

export type PatientFormState = Omit<PatientFormValues, "dob" | "gender" | "poli"> & {
    dob: ISODateString | "";
    gender: Gender | "";
    poli: Poli | ""
}

export type Patient = {
    id: string;
    name: string;
    address: string;
    rm: string;
    age: number;
    gender: Gender;
    poli: Poli;
    status: CareStatus;
    nik: string;
    dob: ISODateString;
    phone: string;
    avatarUrl?: string;
}