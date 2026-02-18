import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? "";
const supabaseKey = serviceRoleKey || publishableKey;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Missing env: NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY/SUPABASE_SERVICE_ROLE_KEY.",
  );
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const padDigits = (value, length) => String(value).padStart(length, "0");

const formatDate = (date) => {
  const year = date.getUTCFullYear();
  const month = padDigits(date.getUTCMonth() + 1, 2);
  const day = padDigits(date.getUTCDate(), 2);
  return `${year}-${month}-${day}`;
};

const buildPatients = (count) => {
  const baseDate = new Date(Date.UTC(1970, 0, 1));
  const rows = [];

  for (let index = 1; index <= count; index += 1) {
    const offsetDays = (index * 73) % 18000;
    const birthDate = new Date(
      baseDate.getTime() + offsetDays * 24 * 60 * 60 * 1000,
    );
    const gender = index % 2 === 0 ? "perempuan" : "laki_laki";
    const poliOptions = [
      "poli_umum",
      "poli_gigi",
      "poli_jantung",
      "poli_penyakit_dalam",
      "poli_kandungan",
      "igd_darurat",
    ];
    const statusOptions = ["rawat_jalan", "rawat_inap", "observasi", "selesai"];

    rows.push({
      medical_record_no: `RM-2026-${padDigits(index, 4)}`,
      national_id: `320101201090${padDigits(index, 4)}`,
      full_name: `Pasien ${padDigits(index, 3)}`,
      birth_date: formatDate(birthDate),
      gender,
      phone: `08123${padDigits(index, 6)}`,
      poli: poliOptions[index % poliOptions.length],
      care_status: statusOptions[index % statusOptions.length],
      address: `Jl. Sehat No. ${index}, Kota Medika`,
      avatar_url: null,
    });
  }

  return rows;
};

const run = async () => {
  const rows = buildPatients(100);
  const { error } = await supabase
    .from("patients")
    .upsert(rows, { onConflict: "medical_record_no" });

  if (error) {
    throw new Error(`Seed failed: ${error.message}`);
  }

  console.log(`Seeded ${rows.length} patients.`);
};

await run();
