import { Aside } from "@/components/Aside";
import { PoliTrendChart } from "@/components/charts/PoliTrendChart";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Calendar, CheckCircle, Loader2, Printer } from "lucide-react";
import Image from "next/image";

export default function AdministrasiPage() {
  return (
    <>
      <Aside />

      <main className="flex-1 lg:ml-[280px] flex flex-col bg-muted min-h-screen overflow-hidden">
        <Header title="Administrasi" />

        {/* Page Content Scroll Area */}
        <div className="flex-1 overflow-y-auto p-5 md:p-8">
          {/* New Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Card 1: Appointment Masuk */}
            <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-border shadow-sm">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Calendar className="size-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary">
                    Appointment Masuk
                  </p>
                  <h3 className="text-2xl font-bold text-foreground mt-0.5">
                    42
                  </h3>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-primary bg-blue-100 px-2 py-1 rounded-full">
                  Baru
                </span>
                <p className="text-xs text-secondary mt-1">Hari ini</p>
              </div>
            </div>
            {/* Card 2: Sedang Diproses */}
            <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-border shadow-sm">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-warning-light rounded-xl flex items-center justify-center">
                  <Loader2 className="size-6 text-warning-dark" />
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary">
                    Sedang Diproses
                  </p>
                  <h3 className="text-2xl font-bold text-foreground mt-0.5">
                    18
                  </h3>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-warning-dark bg-warning-light px-2 py-1 rounded-full">
                  Proses
                </span>
                <p className="text-xs text-secondary mt-1">Aktif</p>
              </div>
            </div>
            {/* Card 3: Selesai */}
            <div className="flex items-center justify-between p-6 bg-white rounded-2xl border border-border shadow-sm">
              <div className="flex items-center gap-4">
                <div className="size-12 bg-success-light rounded-xl flex items-center justify-center">
                  <CheckCircle className="size-6 text-success" />
                </div>
                <div>
                  <p className="text-sm font-medium text-secondary">Selesai</p>
                  <h3 className="text-2xl font-bold text-foreground mt-0.5">
                    156
                  </h3>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs font-bold text-success bg-success-light px-2 py-1 rounded-full">
                  +12%
                </span>
                <p className="text-xs text-secondary mt-1">Total</p>
              </div>
            </div>
          </div>
          {/* Middle Section: Chart & Queue Widget */}
          <div className="flex flex-col lg:flex-row gap-6 mb-8">
            {/* Bar Chart (60%) */}
            <div className="w-full lg:w-[60%] bg-white rounded-2xl border border-border shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-foreground">
                  Tren Poli Populer
                </h3>
                <select className="text-xs border border-border rounded-lg px-2 py-1 bg-muted text-secondary outline-none">
                  <option>Minggu Ini</option>
                  <option>Bulan Ini</option>
                </select>
              </div>
              <div className="w-full h-[300px]">
                <PoliTrendChart />
              </div>
            </div>
            {/* Queue Widget (40%) */}
            <div className="w-full lg:w-[40%] bg-white rounded-2xl border border-border shadow-sm p-6 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-lg text-foreground">
                  Antrian Loket
                </h3>
                <span className="size-2 bg-green-500 rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col gap-4 flex-1">
                {/* Loket 1 */}
                <div className="flex items-center justify-between p-4 bg-muted rounded-xl border border-border">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <span className="font-bold text-primary text-lg">A</span>
                    </div>
                    <div>
                      <p className="text-xs text-secondary font-medium uppercase">
                        Loket Pendaftaran
                      </p>
                      <h4 className="text-xl font-bold text-foreground">
                        A-042
                      </h4>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-success-light text-success text-xs font-bold rounded-full">
                    Serving
                  </div>
                </div>
                {/* Loket 2 */}
                <div className="flex items-center justify-between p-4 bg-muted rounded-xl border border-border">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <span className="font-bold text-orange-500 text-lg">
                        B
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-secondary font-medium uppercase">
                        Loket Pembayaran
                      </p>
                      <h4 className="text-xl font-bold text-foreground">
                        B-015
                      </h4>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-success-light text-success text-xs font-bold rounded-full">
                    Serving
                  </div>
                </div>
                {/* Farmasi */}
                <div className="flex items-center justify-between p-4 bg-muted rounded-xl border border-border mt-auto">
                  <div className="flex items-center gap-3">
                    <div className="size-10 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <span className="font-bold text-purple-500 text-lg">
                        F
                      </span>
                    </div>
                    <div>
                      <p className="text-xs text-secondary font-medium uppercase">
                        Farmasi / Obat
                      </p>
                      <h4 className="text-xl font-bold text-foreground">
                        F-089
                      </h4>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-warning-light text-warning-dark text-xs font-bold rounded-full">
                    Waiting
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Payment History Table */}
          <div className="flex flex-col rounded-2xl border border-border bg-white shadow-sm overflow-hidden">
            <div className="p-5 border-b border-border flex justify-between items-center bg-gray-50">
              <h3 className="font-bold text-lg text-foreground">
                Riwayat Pembayaran
              </h3>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-border rounded-xl text-sm font-medium hover:bg-muted text-foreground transition-all shadow-sm">
                <Printer className="size-4 text-secondary" />
                Cetak Invoice PDF
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]" id="payment-table">
                <thead className="bg-gray-50 border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary uppercase tracking-wider">
                      No
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary uppercase tracking-wider">
                      Pasien
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary uppercase tracking-wider">
                      Poli
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary uppercase tracking-wider">
                      Tanggal
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-bold text-secondary uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-4 text-center text-xs font-bold text-secondary uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-bold text-secondary uppercase tracking-wider">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border bg-white">
                  {/* Row 1 */}
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-secondary">
                      1
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="size-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold text-xs">
                          AS
                        </div>
                        <div>
                          <div className="text-sm font-bold text-foreground">
                            Ahmad Santoso
                          </div>
                          <div className="text-xs text-secondary">
                            RM-2024-001
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      Poli Penyakit Dalam
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary font-mono">
                      24 Jan 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground">
                      Rp 150.000
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-light text-success border border-success/20">
                        Lunas
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="text-xs font-medium text-primary hover:text-primary-hover border border-primary/20 hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-all">
                        + Buat Invoice
                      </button>
                    </td>
                  </tr>
                  {/* Row 2 */}
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-secondary">
                      2
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Image
                          alt="administrasi"
                          width={36}
                          height={36}
                          src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop"
                          className="size-8 rounded-full object-cover"
                        />
                        <div>
                          <div className="text-sm font-bold text-foreground">
                            Siti Aminah
                          </div>
                          <div className="text-xs text-secondary">
                            RM-2024-042
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      IGD (Darurat)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary font-mono">
                      24 Jan 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground">
                      Rp 450.000
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-warning-light text-warning-dark border border-warning/20">
                        Pending
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="text-xs font-medium text-primary hover:text-primary-hover border border-primary/20 hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-all">
                        + Buat Invoice
                      </button>
                    </td>
                  </tr>
                  {/* Row 3 */}
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-secondary">
                      3
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="size-8 bg-purple-100 rounded-full flex items-center justify-center text-purple-600 font-bold text-xs">
                          BH
                        </div>
                        <div>
                          <div className="text-sm font-bold text-foreground">
                            Budi Hartono
                          </div>
                          <div className="text-xs text-secondary">
                            RM-2024-089
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      Poli Jantung
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary font-mono">
                      23 Jan 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground">
                      Rp 1.200.000
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-light text-success border border-success/20">
                        Lunas
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="text-xs font-medium text-primary hover:text-primary-hover border border-primary/20 hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-all">
                        + Buat Invoice
                      </button>
                    </td>
                  </tr>
                  {/* Row 4 */}
                  <tr className="hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 text-sm font-medium text-secondary">
                      4
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Image
                          alt="administrasi"
                          width={36}
                          height={36}
                          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop"
                          className="size-8 rounded-full object-cover"
                        />
                        <div>
                          <div className="text-sm font-bold text-foreground">
                            Rina Wati
                          </div>
                          <div className="text-xs text-secondary">
                            RM-2024-156
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                      Poli Gigi
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-secondary font-mono">
                      23 Jan 2024
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-foreground">
                      Rp 350.000
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-success-light text-success border border-success/20">
                        Lunas
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button className="text-xs font-medium text-primary hover:text-primary-hover border border-primary/20 hover:bg-primary/5 px-3 py-1.5 rounded-lg transition-all">
                        + Buat Invoice
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          {/* Footer Copyright */}
          <Footer />
        </div>
      </main>
    </>
  );
}
