import { createClient } from "@/lib/supabase/server";
import { CareStatus, Gender, Poli } from "@/types/patient";
import { allowedGenders, allowedPoli, allowedStatuses, isValidDate, mapRowToPatient, normalizeString, PatientRow, PatientUpdateInput, toPatientUpdate } from "@/types/patient-api";
import { NextResponse } from "next/server";

export async function DELETE(_request: Request,
    { params }: { params: Promise<{ id: string }>},
) {
    const { id: patientId} = await params;
    if (!patientId) {
        return NextResponse.json(
            {error: "ID pasien tidak valid."},
            {status: 400},
        )
    }

    const supabase = await createClient();
    const {data, error } = await supabase
        .from("patients")
        .delete()
        .eq("id", patientId)
        .select()
        .single();
    
    if (error) {
        return NextResponse.json(
            {error: error.message ?? "Gagal menghapus data pasien."},
            {status: 500},
        )
    }

    if (!data) {
        return NextResponse.json(
            {error: "Pasien tidak ditemukan."},
            {status: 404},
        )
    }

    return NextResponse.json({ok: true}, {status: 200});
}


export async function PATCH(
    request: Request,
    { params }: { params: Promise<{ id: string }>},
){
    const { id: patientId } = await params;
    if (!patientId) {
        return NextResponse.json(
            {error: "ID pasien tidak valid."},
            {status: 400},
        )
    }

    let body: Record<string, unknown> = {};
    try {
        body = (await request.json()) as Record<string, unknown>;
    } catch {
        return NextResponse.json(
            {error: "Payload tidak valid."},
            {status: 400},
        )
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

    if (nik && !/^\d{16}$/.test(nik)) {
        return NextResponse.json(
            {error: "NIK harus 16 digit angka."},
            {status: 400},
        )
    }

    if (phone && !/^[0-9+()\-\s]{8,30}$/.test(phone)) {
        return NextResponse.json(
            {error: "Format nomor HP tidak valid."},
            {status: 400},
        )
    }

        if (dob && !isValidDate(dob)) {
            return NextResponse.json(
                {error: "Tanggal lahir tidak valid."},
                {status: 400},
            )
        }
    
        if (gender && !allowedGenders.includes(gender as Gender)) {
            return NextResponse.json(
                {error: "Jenis kelamin tidak valid."},
                {status: 400},
            )
        }
    
        if (poli && !allowedPoli.includes(poli as Poli)) {
            return NextResponse.json(
                {error: "Poli tidak valid."},
                {status: 400},
            )
        }
    
        if (status && !allowedStatuses.includes(status as CareStatus)) {
            return NextResponse.json(
                {error: "Status perawatan tidak valid."},
                {status: 400},
            )
        }

    const input: PatientUpdateInput = {
        rm: rm || undefined,
        nik: nik || undefined,
        name: name || undefined,
        dob: dob || undefined,
        gender: gender || undefined,
        phone: phone || undefined, 
        poli: poli || undefined,
        status: status || undefined,
        address: address || undefined,
    }

    const payload = toPatientUpdate(input);

    if (Object.keys(payload).length === 0) {
        return NextResponse.json(
            {error: "Tidak ada data yang diperbarui."},
            {status: 400},
        )
    }

    const supabase = await createClient()
    const { data, error } = await supabase
        .from("patients")
        .update(payload)
        .eq("id", patientId)
        .select()
        .single();
    
    if (error || !data) {
        return NextResponse.json(
            {error: error?.message ?? "Gagal memperbarui data pasien."},
            {status: 500},
        )
    }

    const updated = data as PatientRow;
    const patient = mapRowToPatient(updated);

    return NextResponse.json({patient}, {status: 200})
}
