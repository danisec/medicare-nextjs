import { createClient } from "@/lib/supabase/server";
import { CareStatus, Gender, Poli } from "@/types/patient";
import { allowedPoli, allowedGenders, isValidDate, normalizeString, allowedStatuses, PatientInput, toPatientInsert, mapRowToPatient, PatientRow } from "@/types/patient-api";
import { NextResponse } from "next/server";

export async function GET() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from("patients")
        .select()
        .order("created_at", {ascending: false});

    if (error) {
        return NextResponse.json(
            {error: error.message ?? "Gagal memuat data pasien"},
            {status: 500},
        )
    }

    const rows = (data ?? []) as PatientRow[];
    const patients = rows.map(
        mapRowToPatient
    );

    return NextResponse.json({patients});
}

export async function POST(request: Request) {
    let body: Record<string, unknown> = {}

    try {
        body = (await request.json()) as Record<string, unknown>;
    } catch {
        return NextResponse.json(
            {error: "Payload tidak valid."},
            {status: 400},
        );
    }

    const rm = normalizeString(body.rm);
    const nik = normalizeString(body.nik);
    const name = normalizeString(body.name);
    const dob = normalizeString(body.dob);
    const gender = normalizeString(body.gender) as Gender | "";
    const phone = normalizeString(body.phone);
    const poli = normalizeString(body.poli) as Poli | "";
    const status = normalizeString(body.status) as CareStatus | "";
    const address = normalizeString(body.address);

    if (!rm || !nik || !name || !dob || !gender || !phone || !poli || !status || !address) {
        return NextResponse.json (
            {error: "Semua field wajib diisi."},
            {status: 400},
        )
    }

    if (!/^\d{16}$/.test(nik)) {
        return NextResponse.json(
            {error: "NIK harus 16 digit angka."},
            {status: 400},
        )
    }

    if (!/^[0-9+()\-\s]{8,30}$/.test(phone)) {
        return NextResponse.json(
            {error: "Format nomor HP tidak valid."},
            {status: 400},
        )
    }

    if (!isValidDate(dob)) {
        return NextResponse.json(
            {error: "Tanggal lahir tidak valid."},
            {status: 400},
        )
    }

    if (!allowedGenders.includes(gender as Gender)) {
        return NextResponse.json(
            {error: "Jenis kelamin tidak valid."},
            {status: 400},
        )
    }

    if (!allowedPoli.includes(poli as Poli)) {
        return NextResponse.json(
            {error: "Poli tidak valid."},
            {status: 400},
        )
    }

    if (!allowedStatuses.includes(status as CareStatus)) {
        return NextResponse.json(
            {error: "Status perawatan tidak valid."},
            {status: 400},
        )
    }

    const input: PatientInput = {
        rm,
        nik,
        name,
        dob,
        gender: gender as Gender,
        phone, 
        poli: poli as Poli,
        status: status as CareStatus,
        address,
    }

    const payload = toPatientInsert(input);

    const supabase = await createClient();
    const { data, error } = await supabase
        .from("patients")
        .insert(payload)
        .select()
        .single();
    
    if (error || !data) {
        return NextResponse.json(
            {error: error?.message ?? "Gagal menyimpan data pasien."},
            {status: 500},
        )
    }

    const inserted = data as PatientRow;
    const patient = mapRowToPatient(inserted);

    return NextResponse.json(
        {patient},
        {status: 201},
    )
}
