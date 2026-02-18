# MediCare Center App

Dashboard rumah sakit berbasis Next.js (App Router)

## Ringkasan Fitur

- Halaman pasien di `app/dashboard/pasien/page.tsx` untuk lihat, tambah, ubah, dan hapus pasien.
- API route Next.js untuk CRUD:
  - `GET /api/patients`
  - `POST /api/patients`
  - `PATCH /api/patients/:id`
  - `DELETE /api/patients/:id`
- Skema database pasien + enum di Supabase migration.
- RLS untuk role `anon` dan `authenticated` (saat ini keduanya diizinkan CRUD).
- Seed 100 data pasien siap pakai.
- Skrip K6 untuk smoke test dan CRUD test.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4
- Supabase (`@supabase/ssr`, `@supabase/supabase-js`)
- K6 (load/smoke testing)

## Struktur Folder Penting

```text
app/
  api/patients/
    route.ts
    [id]/route.ts
  dashboard/
    pasien/page.tsx
    overview/page.tsx
    administrasi/page.tsx

supabase/
  migrations/
    20260216000100_create_patients_schema.sql
    20260216000200_patients_rls.sql
  seeds/
    seed_patients.mjs

types/
  patient.ts
  patient-api.ts

K6/
  patients_smoke.js
  patients_crud.js
```

## Prasyarat

- Node.js 20+
- npm 10+
- Supabase CLI (untuk migration/seed)
- K6 (opsional, untuk load test)

## Setup Lokal

1. Install dependency

```bash
npm install
```

2. Buat file environment

```bash
cp .env.example .env
```

Isi nilai berikut di `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY
```

3. Jalankan migration

```bash
npx supabase db push --include-all
```

4. Seed data pasien (100 data)

```bash
npm run seed:data
```

5. Jalankan aplikasi

```bash
npm run dev
```

App berjalan di `http://localhost:3000`.

## Skrip NPM

- `npm run dev` - jalankan development server
- `npm run build` - build production
- `npm run start` - jalankan hasil build
- `npm run lint` - linting kode
- `npm run seed:data` - seed 100 data pasien ke Supabase

## Quality Check

Disarankan jalankan ini sebelum merge/deploy:

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## K6 Testing

Script K6 bisa menargetkan API Vercel **atau** Supabase REST.

Smoke test (read-only):

```bash
# Target aplikasi Vercel
BASE_URL="https://your-app.vercel.app" k6 run K6/patients_smoke.js

# Target Supabase REST
set -a && . ./.env && set +a && k6 run K6/patients_smoke.js
```

CRUD test (destructive, create-update-delete):

```bash
# Target aplikasi Vercel
BASE_URL="https://your-app.vercel.app" ALLOW_DESTRUCTIVE=true k6 run K6/patients_crud.js

# Target Supabase REST
set -a && . ./.env && set +a && ALLOW_DESTRUCTIVE=true k6 run K6/patients_crud.js
```

Catatan:

- `patients_crud.js` membuat data sementara lalu menghapusnya kembali.
- Jika `BASE_URL` diset, K6 memanggil `/api/patients` di aplikasi.
- Jika `BASE_URL` kosong, K6 memanggil Supabase REST (`/rest/v1/patients`).

## Data Model

- ERD ada di `dbdiagram.dbml`
- Tabel utama: `public.patients`
- Enum: `gender_enum`, `care_status_enum`, `poli_enum`
