import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 1,
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<1500"],
  },
};

const baseUrl = (__ENV.BASE_URL || "").replace(/\/$/, "");
const supabaseUrl = (__ENV.NEXT_PUBLIC_SUPABASE_URL || "").replace(/\/$/, "");
const publishableKey = __ENV.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || "";
const serviceRoleKey = __ENV.SUPABASE_SERVICE_ROLE_KEY || "";
const apiKey = serviceRoleKey || publishableKey;
const allowDestructive =
  (__ENV.ALLOW_DESTRUCTIVE || "").toLowerCase() === "true";
const useAppApi = Boolean(baseUrl);

if (!useAppApi && (!supabaseUrl || !apiKey)) {
  throw new Error(
    "Missing env. Set BASE_URL for Vercel API or provide Supabase keys.",
  );
}

function padDigits(value, length) {
  return String(value).padStart(length, "0");
}

export default function patientsCrudFlow() {
  if (!allowDestructive) {
    throw new Error(
      "Set ALLOW_DESTRUCTIVE=true to run CRUD test (create/update/delete).",
    );
  }

  const uniqueSeed = Date.now() + __VU * 1000 + __ITER;
  const nikSuffix = padDigits(uniqueSeed % 10000, 4);
  const rm = `RM-${uniqueSeed}`;
  const nik = `320101201090${nikSuffix}`;

  const appPayload = {
    rm,
    nik,
    name: `K6 Pasien ${uniqueSeed}`,
    dob: "1994-06-15",
    gender: "Laki-laki",
    phone: "081234567890",
    poli: "Poli Umum",
    status: "Rawat Jalan",
    address: "Jl. K6 Test No. 1",
  };

  const supabasePayload = {
    medical_record_no: rm,
    national_id: nik,
    full_name: `K6 Pasien ${uniqueSeed}`,
    birth_date: "1994-06-15",
    gender: "laki_laki",
    phone: "081234567890",
    poli: "poli_umum",
    care_status: "rawat_jalan",
    address: "Jl. K6 Test No. 1",
  };

  const createRes = useAppApi
    ? http.post(`${baseUrl}/api/patients`, JSON.stringify(appPayload), {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      })
    : http.post(
        `${supabaseUrl}/rest/v1/patients`,
        JSON.stringify(supabasePayload),
        {
          headers: {
            apikey: apiKey,
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            Prefer: "return=representation",
          },
        },
      );

  const createOk = check(createRes, {
    "create status 201": (r) => r.status === 201,
    "create returns patient": (r) => {
      try {
        const body = r.json();
        return useAppApi
          ? Boolean(body.patient && body.patient.id)
          : Array.isArray(body) && Boolean(body[0] && body[0].id);
      } catch {
        return false;
      }
    },
  });

  if (!createOk) {
    return;
  }

  const created = useAppApi ? createRes.json().patient : createRes.json()[0];
  const patientId = created.id;

  const updatePayload = useAppApi
    ? {
        address: "Jl. K6 Test No. 2",
        phone: "081234567891",
        status: "Observasi",
      }
    : {
        address: "Jl. K6 Test No. 2",
        phone: "081234567891",
        care_status: "observasi",
      };

  const updateRes = useAppApi
    ? http.patch(
        `${baseUrl}/api/patients/${patientId}`,
        JSON.stringify(updatePayload),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        },
      )
    : http.patch(
        `${supabaseUrl}/rest/v1/patients?id=eq.${patientId}`,
        JSON.stringify(updatePayload),
        {
          headers: {
            apikey: apiKey,
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            Prefer: "return=representation",
          },
        },
      );

  check(updateRes, {
    "update status 200": (r) => r.status === 200,
    "update returns patient": (r) => {
      try {
        const body = r.json();
        return useAppApi
          ? Boolean(body.patient && body.patient.id === patientId)
          : Array.isArray(body) && Boolean(body[0] && body[0].id === patientId);
      } catch {
        return false;
      }
    },
  });

  const deleteRes = useAppApi
    ? http.del(`${baseUrl}/api/patients/${patientId}`, null, {
        headers: { Accept: "application/json" },
      })
    : http.del(`${supabaseUrl}/rest/v1/patients?id=eq.${patientId}`, null, {
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
        },
      });

  check(deleteRes, {
    "delete status 204": (r) =>
      useAppApi ? r.status === 200 : r.status === 204,
  });

  sleep(1);
}
