import http from "k6/http";
import { check, sleep } from "k6";

export const options = {
  vus: 1,
  iterations: 5,
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
const useAppApi = Boolean(baseUrl);

if (!useAppApi && (!supabaseUrl || !apiKey)) {
  throw new Error(
    "Missing env. Set BASE_URL for Vercel API or provide Supabase keys.",
  );
}

export default function smokePatientsList() {
  const res = useAppApi
    ? http.get(`${baseUrl}/api/patients`, {
        headers: { Accept: "application/json" },
      })
    : http.get(`${supabaseUrl}/rest/v1/patients?select=*`, {
        headers: {
          apikey: apiKey,
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json",
        },
      });

  check(res, {
    "status is 200": (r) => r.status === 200,
    "has patients array": (r) => {
      try {
        const body = r.json();
        return useAppApi ? Array.isArray(body.patients) : Array.isArray(body);
      } catch {
        return false;
      }
    },
  });

  sleep(1);
}
