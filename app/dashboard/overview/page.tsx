import Image from "next/image";
import { Header } from "@/components/Header";
import { Aside } from "@/components/Aside";
import { Bed, CalendarCheck, FileText, Stethoscope, Users } from "lucide-react";
import { SearchModal } from "@/components/modals/SearchModal";
import { VisitChart } from "@/components/charts/VisitChart";

export default function OverviewPage() {
  return (
    <>
      <Aside />

      <main className="flex-1 lg:ml-[280px] flex flex-col bg-muted min-h-screen overflow-hidden">
        <Header title="Overview" />
        <SearchModal />

        {/* Page Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-5 md:p-8">
          {/* HERO CARDS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6">
            {/* Card 1: Total Pasien */}
            <div className="flex flex-col rounded-2xl border border-border p-5 gap-3 bg-white shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <Users className="size-5 text-primary" />
                  </div>
                  <p className="font-medium text-secondary text-sm">
                    Total Pasien
                  </p>
                </div>
                <span className="text-success text-xs font-bold bg-success-light px-2 py-1 rounded-full">
                  +12%
                </span>
              </div>
              <div>
                <p className="font-bold text-[28px] leading-tight text-foreground">
                  14.2K
                </p>
                <p className="text-xs text-secondary mt-1">Bulan ini</p>
              </div>
            </div>
            {/* Card 2: Dokter Aktif */}
            <div className="flex flex-col rounded-2xl border border-border p-5 gap-3 bg-white shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-10 bg-success/10 rounded-xl flex items-center justify-center">
                    <Stethoscope className="size-5 text-success" />
                  </div>
                  <p className="font-medium text-secondary text-sm">
                    Dokter Aktif
                  </p>
                </div>
                <span className="flex size-2 rounded-full bg-success animate-pulse" />
              </div>
              <div>
                <p className="font-bold text-[28px] leading-tight text-foreground">
                  42
                </p>
                <p className="text-xs text-secondary mt-1">Sedang bertugas</p>
              </div>
            </div>
            {/* Card 3: Bed Tersedia */}
            <div className="flex flex-col rounded-2xl border border-border p-5 gap-3 bg-white shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-10 bg-warning/10 rounded-xl flex items-center justify-center">
                    <Bed className="size-5 text-warning-dark" />
                  </div>
                  <p className="font-medium text-secondary text-sm">
                    Bed Tersedia
                  </p>
                </div>
                <span className="text-error text-xs font-bold bg-error-light px-2 py-1 rounded-full">
                  Low
                </span>
              </div>
              <div>
                <p className="font-bold text-[28px] leading-tight text-foreground">
                  8
                </p>
                <p className="text-xs text-secondary mt-1">
                  Dari 150 total bed
                </p>
              </div>
            </div>
            {/* Card 4: Appointment Hari Ini */}
            <div className="flex flex-col rounded-2xl border border-border p-5 gap-3 bg-white shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="size-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <CalendarCheck className="size-5 text-primary" />
                  </div>
                  <p className="font-medium text-secondary text-sm">
                    Janji Temu
                  </p>
                </div>
              </div>
              <div>
                <p className="font-bold text-[28px] leading-tight text-foreground">
                  85
                </p>
                <div className="w-full bg-muted rounded-full h-1.5 mt-2 overflow-hidden">
                  <div
                    className="bg-primary h-1.5 rounded-full"
                    style={{ width: "70%" }}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* MIDDLE SECTION (Chart 65% + IGD Widget 35%) */}
          <div className="flex flex-col lg:flex-row gap-6 mb-6">
            {/* Area Chart: Statistik Kunjungan (65%) */}
            <div className="w-full lg:w-[65%] flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-lg text-foreground">
                    Statistik Kunjungan
                  </h3>
                  <p className="text-sm text-secondary">
                    Pasien Rawat Jalan &amp; IGD
                  </p>
                </div>
                <div className="flex bg-muted p-1 rounded-xl">
                  <button className="px-3 py-1.5 bg-white rounded-lg shadow-sm text-xs font-semibold text-primary">
                    Mingguan
                  </button>
                  <button className="px-3 py-1.5 text-xs font-medium text-secondary hover:text-foreground">
                    Bulanan
                  </button>
                </div>
              </div>
              <div className="relative w-full h-[300px]">
                <VisitChart />
              </div>
            </div>
            {/* Widget: Status IGD (35%) */}
            <div className="w-full lg:w-[35%] flex flex-col rounded-2xl border border-border bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-foreground">
                  Status IGD
                </h3>
                <span className="flex items-center gap-1.5 px-2 py-1 bg-error/10 text-error text-xs font-bold rounded-lg">
                  <span className="size-1.5 bg-error rounded-full animate-pulse" />
                  High Traffic
                </span>
              </div>
              {/* IGD Stats Summary */}
              <div className="flex gap-4 mb-6">
                <div className="flex-1 p-3 bg-muted rounded-xl text-center">
                  <p className="text-xs text-secondary font-medium uppercase">
                    Total Pasien
                  </p>
                  <p className="text-xl font-bold text-foreground mt-1">24</p>
                </div>
                <div className="flex-1 p-3 bg-success/10 rounded-xl text-center">
                  <p className="text-xs text-success-dark font-medium uppercase">
                    Tertangani
                  </p>
                  <p className="text-xl font-bold text-success mt-1">18</p>
                </div>
                <div className="flex-1 p-3 bg-warning/10 rounded-xl text-center">
                  <p className="text-xs text-warning-dark font-medium uppercase">
                    Menunggu
                  </p>
                  <p className="text-xl font-bold text-warning-dark mt-1">6</p>
                </div>
              </div>
              {/* Room Status List */}
              <div className="flex flex-col gap-3 flex-1 overflow-y-auto max-h-[220px] pr-1">
                <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-error/10 flex items-center justify-center text-xs font-bold text-error">
                      R1
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Trauma Center
                      </p>
                      <p className="text-xs text-secondary">
                        Dr. Sarah (Bedah)
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 bg-error text-white rounded-md">
                    Penuh
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-error/10 flex items-center justify-center text-xs font-bold text-error">
                      R2
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Resusitasi
                      </p>
                      <p className="text-xs text-secondary">
                        Dr. Anton (Anestesi)
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 bg-error text-white rounded-md">
                    Penuh
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-success/10 flex items-center justify-center text-xs font-bold text-success">
                      R3
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Observasi A
                      </p>
                      <p className="text-xs text-secondary">Kosong</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 bg-success text-white rounded-md">
                    Tersedia
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl border border-border bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="size-8 rounded-lg bg-warning/10 flex items-center justify-center text-xs font-bold text-warning-dark">
                      R4
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">
                        Observasi B
                      </p>
                      <p className="text-xs text-secondary">Sterilisasi</p>
                    </div>
                  </div>
                  <span className="text-xs font-medium px-2 py-1 bg-warning text-foreground rounded-md">
                    Cleaning
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* BOTTOM SECTION: Table Aktivitas Terbaru */}
          <div className="flex flex-col rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-border">
              <h3 className="font-bold text-lg text-foreground">
                Aktivitas Terbaru
              </h3>
              <a
                href="#"
                className="cursor-pointer text-sm font-semibold text-primary hover:underline"
              >
                Lihat Semua
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Pasien
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Tipe Layanan
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Dokter
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Waktu
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-secondary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-secondary uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-white">
                  {/* Row 1 */}
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Image
                          className="size-9 rounded-full object-cover ring-1 ring-border"
                          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
                          width={36}
                          height={36}
                          alt="Pasien"
                        />
                        <div>
                          <div className="text-sm font-semibold text-foreground">
                            Ahmad Santoso
                          </div>
                          <div className="text-xs text-secondary">
                            RM-2024-001
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-foreground">
                        Rawat Jalan
                      </div>
                      <div className="text-xs text-secondary">
                        Poli Penyakit Dalam
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="size-6 bg-primary/10 rounded-full flex items-center justify-center text-[10px] font-bold text-primary">
                          DH
                        </div>
                        <span className="text-sm text-secondary">
                          Dr. Hartono
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-foreground">10:45 WIB</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-light text-success-dark">
                        Selesai
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-secondary hover:text-primary transition-colors"
                        aria-label="Detail"
                      >
                        <FileText className="size-4" />
                      </button>
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Image
                          className="size-9 rounded-full object-cover ring-1 ring-border"
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                          width={36}
                          height={36}
                          alt="Pasien"
                        />
                        <div>
                          <div className="text-sm font-semibold text-foreground">
                            Siti Aminah
                          </div>
                          <div className="text-xs text-secondary">
                            RM-2024-042
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-foreground">
                        IGD
                      </div>
                      <div className="text-xs text-secondary">
                        Darurat - Asma
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="size-6 bg-error/10 rounded-full flex items-center justify-center text-[10px] font-bold text-error">
                          DS
                        </div>
                        <span className="text-sm text-secondary">
                          Dr. Sarah
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-foreground">11:15 WIB</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-warning-light text-warning-dark">
                        Penanganan
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-secondary hover:text-primary transition-colors"
                        aria-label="Detail"
                      >
                        <FileText className="size-4" />
                      </button>
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Image
                          className="size-9 rounded-full object-cover ring-1 ring-border"
                          src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop"
                          width={36}
                          height={36}
                          alt="Pasien"
                        />
                        <div>
                          <div className="text-sm font-semibold text-foreground">
                            Budi Santoso
                          </div>
                          <div className="text-xs text-secondary">
                            RM-2024-089
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-foreground">
                        Checkup
                      </div>
                      <div className="text-xs text-secondary">Poli Jantung</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="size-6 bg-primary/10 rounded-full flex items-center justify-center text-[10px] font-bold text-primary">
                          DH
                        </div>
                        <span className="text-sm text-secondary">
                          Dr. Hartono
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-foreground">11:30 WIB</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        Menunggu
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        className="text-secondary hover:text-primary transition-colors"
                        aria-label="Detail"
                      >
                        <FileText className="size-4" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Footer Copyright */}
          <div className="mt-8 text-center md:text-left text-xs text-secondary">
            © 2024 MediCare Center Hospital System. All rights reserved.
          </div>
        </div>
      </main>
    </>
  );
}
