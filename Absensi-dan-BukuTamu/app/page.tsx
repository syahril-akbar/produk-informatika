"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowLeft,
  ChevronDown,
  ChevronRight,
  Download,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  PhoneIcon,
  Youtube,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

export default function FeaturePage() {
  const [showServerModal, setShowServerModal] = useState(false)
  const [activeTab, setActiveTab] = useState("absensi")

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full bg-[#008080] text-white">
        <div className="container flex h-14 items-center">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            DIGITAL KOTA
          </Link>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Beranda
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4 font-bold">
              Fitur
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Mitra
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Artikel
            </Link>
            <Link href="#" className="text-sm font-medium hover:underline underline-offset-4">
              Kontak
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="container py-12 md:py-16 lg:py-20">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Kini Hadir Fitur Absensi dan Buku Tamu
              </h1>
              <p className="text-muted-foreground">
                Absensi merupakan salah satu proses pencatatan kehadiran dalam lingkup pekerjaan atau kegiatan lainnya.
                Pada masa kini, hadir dengan terobosan baru, menjadikan Absensi terintegrasi Desa & Buku Tamu dalam satu
                layanan. Absensi & Buku Tamu Digital - Melihat kebutuhan akan pencatatan kehadiran yang terintegrasi dan
                terhubungan dengan data terpusat dan akurat. Absensi dan Buku Tamu digital dirancang dengan pembaruan
                API, memungkinkan kesederhanaan operasi desa.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button className="bg-[#008080] hover:bg-[#006666]">Pelajari Lebih Lanjut</Button>
              </div>
            </div>
            <div className="relative h-[300px] lg:h-[400px] overflow-hidden rounded-lg">
              <Image
                src="/feature-hero.png"
                alt="Fitur Absensi dan Buku Tamu"
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </section>

        {/* Feature Title */}
        <section className="container py-8">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#008080]">Fitur Absensi dan Buku Tamu</h2>
        </section>

        {/* Demo Section */}
        <section className="container py-8">
          <div className="bg-[#e8f5f5] p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-6 text-[#008080]">Demo Aplikasi</h3>

            <div className="bg-[url('/sawah-background.jpg')] bg-cover bg-center rounded-lg p-4 relative">
              <div className="flex justify-center gap-4 mb-6">
                <Button
                  variant={activeTab === "buku-tamu" ? "outline" : "default"}
                  className={`${activeTab === "buku-tamu" ? "bg-[#e8f5f5] border-[#008080] text-[#008080]" : "bg-[#008080]"} hover:bg-[#006666] hover:text-white`}
                  onClick={() => setActiveTab("buku-tamu")}
                >
                  <span className="mr-2">📋</span> Buku Tamu
                </Button>
                <Button
                  variant={activeTab === "absensi" ? "outline" : "default"}
                  className={`${activeTab === "absensi" ? "bg-[#e8f5f5] border-[#008080] text-[#008080]" : "bg-[#008080]"} hover:bg-[#006666] hover:text-white`}
                  onClick={() => setActiveTab("absensi")}
                >
                  <span className="mr-2">📝</span> Absensi
                </Button>
              </div>

              {activeTab === "absensi" && (
                <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto overflow-hidden">
                  <div className="bg-[#008080] text-white p-3 font-bold">Absensi</div>
                  <div className="p-6 grid grid-cols-[120px_1fr] gap-4">
                    <div className="row-span-4">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fitur-absensi-vSNGSa3CDRedSuyKp1S8du6VncxsED.webp"
                        alt="Foto Profil"
                        width={120}
                        height={150}
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Nama</label>
                      <Input placeholder="Masukkan nama" className="bg-gray-100" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">NIAP</label>
                      <Input placeholder="Masukkan NIAP" className="bg-gray-100" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Jabatan</label>
                      <Input placeholder="Masukkan jabatan" className="bg-gray-100" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Jam</label>
                      <Input type="time" defaultValue="17:00" className="bg-gray-100" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <Button className="bg-[#008080] hover:bg-[#006666] text-white p-6">
                      <span className="mr-2">➡️</span> Absen Masuk
                    </Button>
                    <Button className="bg-[#f0ad4e] hover:bg-[#ec971f] text-white p-6">
                      <span className="mr-2">⬅️</span> Absen Pulang
                    </Button>
                  </div>
                </div>
              )}

              {activeTab === "buku-tamu" && (
                <div className="bg-white rounded-lg shadow-lg max-w-2xl mx-auto overflow-hidden">
                  <div className="bg-[#008080] text-white p-3 font-bold">Form Buku Tamu</div>
                  <div className="p-6 grid grid-cols-[120px_1fr] gap-4">
                    <div className="row-span-4">
                      <Image
                        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fitur-buku-tamu-H0yHO7SIlLshXLQfz08cKVoqV3eK4W.webp"
                        alt="Foto Profil"
                        width={120}
                        height={150}
                        className="object-cover rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Nama</label>
                      <Input placeholder="Masukkan nama" className="bg-gray-100" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">No.Telepon/HP</label>
                      <Input placeholder="Masukkan nomor telepon" className="bg-gray-100" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Asal/Instansi</label>
                      <Input placeholder="Masukkan asal/instansi" className="bg-gray-100" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Keperluan</label>
                      <Select>
                        <SelectTrigger className="bg-gray-100">
                          <SelectValue placeholder="Pilih Keperluan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="konsultasi">Konsultasi</SelectItem>
                          <SelectItem value="pengaduan">Pengaduan</SelectItem>
                          <SelectItem value="kunjungan">Kunjungan</SelectItem>
                          <SelectItem value="lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 p-4">
                    <Button variant="outline" className="bg-[#f0ad4e] hover:bg-[#ec971f] text-white border-0">
                      <X className="mr-2 h-4 w-4" /> Batal
                    </Button>
                    <Button className="bg-[#008080] hover:bg-[#006666] text-white">
                      <span className="mr-2">✓</span> Konfirmasi
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Absensi Section */}
        <section className="container py-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4 order-2 lg:order-1">
              <h3 className="text-2xl font-bold">Absensi</h3>
              <p className="text-muted-foreground">
                Modul ini digunakan untuk mencatat kehadiran dalam absensi/monitoring dengan mudah. Anda juga dapat
                melihat catatan kehadiran dan dapat diunduh sebagai laporan sekaligus.
              </p>
            </div>
            <div className="relative h-[300px] overflow-hidden rounded-lg order-1 lg:order-2 hover:scale-105 transition-transform duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fitur-absensi-vSNGSa3CDRedSuyKp1S8du6VncxsED.webp"
                alt="Fitur Absensi"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* Buku Tamu Section */}
        <section className="container py-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="relative h-[300px] overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fitur-buku-tamu-H0yHO7SIlLshXLQfz08cKVoqV3eK4W.webp"
                alt="Fitur Buku Tamu"
                fill
                className="object-contain"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Buku Tamu</h3>
              <p className="text-muted-foreground">
                Modul Buku ini, sangat penting terutama ke kantor desa dapat digunakan untuk mencatat tamu/pengunjung.
                Dengan fitur KTP yang memudahkan manual buku tamu. Data yang terisi juga dapat disalurkan dan dikelola
                secara terstruktur.
              </p>
            </div>
          </div>
        </section>

        {/* Pengaturan Server Section */}
        <section className="container py-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4 order-2 lg:order-1">
              <h3 className="text-2xl font-bold">Pengaturan Server</h3>
              <p className="text-muted-foreground">
                Dapat diatur Online, sistem absensi dan buku tamu juga tersedia dengan mode offline yang memungkinkan
                fleksibilitas sesuai dengan kebutuhan desa anda.
              </p>
              <Button className="bg-[#008080] hover:bg-[#006666]" onClick={() => setShowServerModal(true)}>
                Lihat Demo Pengaturan
              </Button>
            </div>
            <div className="relative h-[300px] overflow-hidden rounded-lg order-1 lg:order-2 hover:scale-105 transition-transform duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pengaturan-server.jpg-esV2BtX60WQHJRk4zwkfLzZncBADUZ.jpeg"
                alt="Pengaturan Server"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* Rekam KTP Section */}
        <section className="container py-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="relative h-[300px] overflow-hidden rounded-lg hover:scale-105 transition-transform duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/rekam-ktp.jpg-Frp0dcAVdzxcObg7dXuxnj4Tn6Vlr0.jpeg"
                alt="Rekam KTP"
                fill
                className="object-contain"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Rekam KTP</h3>
              <p className="text-muted-foreground">
                Dilengkapi dengan fitur KTP, status staff desa dan warga dapat dipisahkan secara otomatis. Selain itu
                dengan pembaruan KTP ini, staff desa juga memudahkan sikses sekali untuk melakukan absensi.
              </p>
            </div>
          </div>
        </section>

        {/* Manajemen Section */}
        <section className="container py-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4 order-2 lg:order-1">
              <h3 className="text-2xl font-bold">Manajemen Absensi & Buku Tamu</h3>
              <p className="text-muted-foreground">
                Dengan fitur manajemen yang terintegrasi, admin dapat dengan mudah menggunakan konsep untuk itu DIGITAL
                KOTA hadir memberikan solusi melalui fitur manajemen absensi dan manajemen buku tamu. Dengan fitur ini,
                admin desa dapat dengan mudah melakukan rekap dan laporan kehadiran operasi desa yang terstruktur.
              </p>
            </div>
            <div className="relative h-[300px] overflow-hidden rounded-lg order-1 lg:order-2 hover:scale-105 transition-transform duration-300">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202025-04-26%20213851-CifZ20s766jMs33yGdefs7StMPzQy4.png"
                alt="Manajemen Absensi & Buku Tamu"
                fill
                className="object-contain"
              />
            </div>
          </div>
        </section>

        {/* Dashboard Demo */}
        <section className="container py-12 bg-[#e8f5f5]">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#008080] mb-8">Dashboard Manajemen</h2>

          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            <Tabs defaultValue="buku-tamu">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="resepsionis">Resepsionis</TabsTrigger>
                <TabsTrigger value="absensi-staff">Absensi Staff</TabsTrigger>
                <TabsTrigger value="buku-tamu">Buku Tamu</TabsTrigger>
              </TabsList>

              <TabsContent value="buku-tamu" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">Manajemen Buku Tamu</h3>
                  <span className="text-sm text-gray-500">Hari ini: 03 Mei 2024</span>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <h4 className="text-purple-600 text-xl font-bold">0 Tamu</h4>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Hari Ini</span>
                      <span>01</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <h4 className="text-blue-600 text-xl font-bold">0 Tamu</h4>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Minggu Ini</span>
                      <span>01</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <h4 className="text-red-600 text-xl font-bold">0 Tamu</h4>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Bulan Ini</span>
                      <span>01</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <h4 className="text-green-600 text-xl font-bold">8 Tamu</h4>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Tahun Ini</span>
                      <span>75</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold">Log Buku Tamu</h4>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <span className="mr-1">🔍</span> Cetak Log
                    </Button>
                  </div>

                  <div className="flex gap-4 mb-4">
                    <Button variant="outline" size="sm">
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      Sepanjang Tahun Ini
                    </Button>
                    <div className="relative ml-auto">
                      <Input placeholder="Cari..." className="pl-8 w-64" />
                      <span className="absolute left-2 top-2.5 text-gray-400">🔍</span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 text-left">Tanggal</th>
                          <th className="p-2 text-left">Nama Tamu</th>
                          <th className="p-2 text-left">Nomor Telepon</th>
                          <th className="p-2 text-left">Asal/Instansi</th>
                          <th className="p-2 text-left">Keperluan</th>
                          <th className="p-2 text-left">Foto</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b">
                          <td className="p-2">27 April 2024, 07:24 AM</td>
                          <td className="p-2">Udin</td>
                          <td className="p-2">9595</td>
                          <td className="p-2">Ugg</td>
                          <td className="p-2">Kunjungan</td>
                          <td className="p-2">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                              <span className="text-gray-500">👤</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="absensi-staff">
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold mb-4">Absensi Staff</h3>
                  <p>Data absensi staff akan ditampilkan di sini.</p>
                </div>
              </TabsContent>

              <TabsContent value="resepsionis">
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold mb-4">Resepsionis</h3>
                  <p>Data resepsionis akan ditampilkan di sini.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Other Features */}
        <section className="container py-12">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-[#008080] mb-12">Fitur Lainnya</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Feature Card 1 */}
            <Card className="bg-white border-none shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-6 flex items-center justify-center text-[#008080]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Bantuan Sosial</h3>
                <p className="text-muted-foreground mb-6">
                  Fitur ini membantu dalam manajemen dan pengelolaan data penerima bantuan sosial di desa. Memudahkan
                  untuk memanajemen desa dan yang berhak menerima bantuan sosial.
                </p>
                <Button
                  variant="outline"
                  className="border-[#008080] text-[#008080] hover:bg-[#008080] hover:text-white"
                >
                  Lihat Fitur
                </Button>
              </CardContent>
            </Card>

            {/* Feature Card 2 */}
            <Card className="bg-white border-none shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-6 flex items-center justify-center text-[#008080]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <path d="M7 7h10M7 12h10M7 17h10" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Website Profil</h3>
                <p className="text-muted-foreground mb-6">
                  Fitur ini membantu dalam membangun dan mengelola profil website desa dengan tampilan yang menarik dan
                  profesional untuk Anda.
                </p>
                <Button
                  variant="outline"
                  className="border-[#008080] text-[#008080] hover:bg-[#008080] hover:text-white"
                >
                  Lihat Fitur
                </Button>
              </CardContent>
            </Card>

            {/* Feature Card 3 */}
            <Card className="bg-white border-none shadow-md hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-6 flex items-center justify-center text-[#008080]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                    <path d="M12 18h.01" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-4">Mobile App</h3>
                <p className="text-muted-foreground mb-6">
                  Aplikasi mobile yang terintegrasi dengan sistem desa untuk memudahkan akses penduduk dan perangkat
                  desa dalam penggunaan layanan desa secara online.
                </p>
                <Button
                  variant="outline"
                  className="border-[#008080] text-[#008080] hover:bg-[#008080] hover:text-white"
                >
                  Lihat Fitur
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container py-16">
          <div className="bg-[#008080] text-white rounded-lg p-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Tertarik menggunakan DIGITAL KOTA?</h2>
            <p className="mb-6">Request Demo untuk melihat potensi lebih lanjut tentang DIGITAL KOTA</p>
            <Button className="bg-[#ff9800] hover:bg-[#e68a00] text-white">Request Demo</Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#e8f5f5] py-12">
        <div className="container grid gap-8 md:grid-cols-3">
          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-[#008080] mb-4">Kontak</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 w-fit">
                <span>+62 811 444 5555</span>
              </div>
              <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 w-fit">
                <span>official@digitalkota.id</span>
              </div>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-lg font-bold text-[#008080] mb-4">Jelajahi</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="hover:text-[#008080] flex items-center gap-1">
                  <ChevronRight className="h-4 w-4" />
                  <span>Kebijakan Privasi</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#008080] flex items-center gap-1">
                  <ChevronRight className="h-4 w-4" />
                  <span>Syarat dan Ketentuan</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#008080] flex items-center gap-1">
                  <ChevronRight className="h-4 w-4" />
                  <span>Pusat Bantuan</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#008080] flex items-center gap-1">
                  <ChevronRight className="h-4 w-4" />
                  <span>Permintaan Integrasi</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#008080] flex items-center gap-1">
                  <ChevronRight className="h-4 w-4" />
                  <span>Karir Lowongan</span>
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[#008080] flex items-center gap-1">
                  <ChevronRight className="h-4 w-4" />
                  <span>Jadi Mitra DIGITAL KOTA</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-bold text-[#008080] mb-4">Sosial Media</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              <Link href="#" className="bg-white p-2 rounded-full hover:bg-gray-100">
                <Facebook className="h-5 w-5 text-[#1877F2]" />
              </Link>
              <Link href="#" className="bg-white p-2 rounded-full hover:bg-gray-100">
                <Instagram className="h-5 w-5 text-[#E4405F]" />
              </Link>
              <Link href="#" className="bg-white p-2 rounded-full hover:bg-gray-100">
                <Twitter className="h-5 w-5 text-[#1DA1F2]" />
              </Link>
              <Link href="#" className="bg-white p-2 rounded-full hover:bg-gray-100">
                <PhoneIcon className="h-5 w-5 text-[#25D366]" />
              </Link>
              <Link href="#" className="bg-white p-2 rounded-full hover:bg-gray-100">
                <Youtube className="h-5 w-5 text-[#FF0000]" />
              </Link>
              <Link href="#" className="bg-white p-2 rounded-full hover:bg-gray-100">
                <Linkedin className="h-5 w-5 text-[#0A66C2]" />
              </Link>
            </div>
            <div className="flex items-center gap-2">
              <Link href="#" className="bg-black text-white px-3 py-1 rounded-md flex items-center gap-2">
                <Download className="h-4 w-4" />
                <span>Google Play</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="container mt-12 pt-6 border-t border-gray-200">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-sm text-muted-foreground">
                Badan Usaha (PT) Digital Kota Indonesia, © 2025
                <br />
                Alamat Kantor Sukmajaya Bekasi
              </p>
            </div>
            <div className="flex md:justify-end items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground">
                  Gedung Menara BRI, Jl. TB. SIMATUPANG Kota Cilandak Timur,
                  <br />
                  Jakarta Selatan
                </p>
              </div>
              <div className="w-24 h-24 bg-white p-2 rounded-lg">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-xs">QR Code</span>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center mt-6 text-sm text-muted-foreground">
            © 2025 Powered by PT Digital Kota Indonesia
          </div>
        </div>
      </footer>

      {/* WhatsApp Float Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Link
          href="https://wa.me/628114445555"
          className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:bg-[#128C7E] transition-colors"
        >
          <PhoneIcon className="h-6 w-6" />
        </Link>
      </div>

      {/* Server Modal */}
      {showServerModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="p-4 border-b flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <h3 className="text-xl font-bold">Mode</h3>
            </div>
            <div className="p-6">
              <h4 className="text-lg mb-4">Pilih Mode</h4>

              <div className="border rounded-md mb-6">
                <div className="p-3 flex justify-between items-center">
                  <span>Server Online</span>
                  <ChevronDown className="h-5 w-5" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block mb-2">Kode Wilayah Desa</label>
                <Input placeholder="99.99.99.9999" className="bg-gray-100" />
              </div>

              <div className="bg-white border rounded-lg shadow-md">
                <div className="p-4 border-b">
                  <div className="py-2">Server Online</div>
                </div>
                <div className="p-4">
                  <div className="py-2">Server Offline</div>
                </div>
              </div>

              <div className="flex justify-between mt-8">
                <Button className="bg-[#0088cc] hover:bg-[#006699]">SIMPAN</Button>
                <Button
                  variant="outline"
                  className="bg-[#333] text-white hover:bg-[#555] border-0"
                  onClick={() => setShowServerModal(false)}
                >
                  BATAL
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
