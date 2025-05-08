import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart2, FileText, Settings, Users } from "lucide-react"
import { OptimizedImage } from "@/components/ui/optimized-image"
import { LandingHeader } from "@/components/landing/landing-header"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Keep only the LandingHeader component */}
      <LandingHeader />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-primary/5 via-accent/5 to-background py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
                    Sistem Keuangan Kota Online
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Mengoptimalkan pengelolaan keuangan dan pelaporan kota dengan teknologi terkini untuk kolaborasi,
                    transparansi, dan pertumbuhan yang lebih baik.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/dashboard">
                    <Button size="lg" className="gap-1.5">
                      Mulai Sekarang
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#fitur">
                    <Button size="lg" variant="outline">
                      Pelajari Lebih Lanjut
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="responsive-image-container">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-30 rounded-3xl blur-2xl transform -rotate-1"></div>
                  <OptimizedImage
                    src="/images/financial-management-hero.png"
                    alt="Financial Management Collaboration"
                    className="relative z-10 rounded-2xl shadow-xl border border-primary/10 max-w-full h-auto object-contain image-reveal"
                    width={550}
                    height={400}
                    priority={true}
                    style={{ maxHeight: "400px" }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="fitur" className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Fitur Utama</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Solusi Lengkap untuk Pengelolaan Keuangan Kota
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Platform kami menyediakan berbagai fitur yang dirancang untuk memudahkan pengelolaan keuangan dan
                  administrasi kota.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 mt-12">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <BarChart2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Keuangan</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Kelola anggaran, pendapatan, dan pengeluaran dengan mudah dan transparan.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Laporan</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Buat dan kelola laporan keuangan secara otomatis dengan template yang tersedia.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Administrasi</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Kelola dokumen dan administrasi desa dengan sistem yang terintegrasi.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
                <div className="rounded-full bg-primary/10 p-3">
                  <Settings className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Integrasi</h3>
                <p className="text-center text-sm text-muted-foreground">
                  Integrasikan dengan sistem lain untuk pengalaman yang lebih baik.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section id="manfaat" className="bg-primary/5 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Manfaat</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Mengapa Menggunakan Siskeu Kota Online?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nikmati berbagai manfaat yang akan meningkatkan efisiensi dan transparansi pengelolaan keuangan kota.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {[
                {
                  title: "Efisiensi Waktu",
                  description: "Otomatisasi proses administrasi dan keuangan menghemat waktu hingga 70%.",
                },
                {
                  title: "Transparansi",
                  description: "Laporan keuangan yang transparan dan mudah diakses oleh semua pemangku kepentingan.",
                },
                {
                  title: "Keamanan Data",
                  description: "Sistem keamanan berlapis untuk melindungi data penting keuangan dan administrasi.",
                },
                {
                  title: "Analisis Real-time",
                  description: "Dapatkan wawasan dan analisis keuangan secara real-time untuk pengambilan keputusan.",
                },
                {
                  title: "Kemudahan Akses",
                  description: "Akses sistem dari mana saja dan kapan saja dengan koneksi internet.",
                },
                {
                  title: "Dukungan Teknis",
                  description: "Tim dukungan teknis yang siap membantu Anda 24/7.",
                },
              ].map((benefit, index) => (
                <div key={index} className="flex flex-col space-y-2 rounded-lg border bg-background p-6 shadow-sm">
                  <h3 className="text-xl font-bold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Siap Meningkatkan Pengelolaan Keuangan Kota Anda?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Bergabunglah dengan ratusan kota yang telah menggunakan Siskeu Kota Online untuk meningkatkan
                  efisiensi dan transparansi.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/dashboard">
                  <Button size="lg" className="gap-1.5">
                    Mulai Sekarang
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="#kontak">
                  <Button size="lg" variant="outline">
                    Hubungi Kami
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="kontak" className="bg-primary/5 py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Kontak</div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Hubungi Kami</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Punya pertanyaan atau ingin tahu lebih banyak? Tim kami siap membantu Anda.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Telepon</p>
                      <p className="text-sm text-muted-foreground">+62 123 4567 890</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Email</p>
                      <p className="text-sm text-muted-foreground">info@siskeukota.id</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-5 w-5 text-primary"
                      >
                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">Alamat</p>
                      <p className="text-sm text-muted-foreground">Jl. Merdeka No. 123, Jakarta Pusat, Indonesia</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-full max-w-md space-y-4 rounded-lg border bg-background p-6 shadow-sm">
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold">Kirim Pesan</h3>
                    <p className="text-sm text-muted-foreground">
                      Isi formulir di bawah ini dan tim kami akan menghubungi Anda segera.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label
                          htmlFor="first-name"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Nama Depan
                        </label>
                        <input
                          id="first-name"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="John"
                        />
                      </div>
                      <div className="space-y-2">
                        <label
                          htmlFor="last-name"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          Nama Belakang
                        </label>
                        <input
                          id="last-name"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="john.doe@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="message"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Pesan
                      </label>
                      <textarea
                        id="message"
                        className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        placeholder="Tulis pesan Anda di sini..."
                      ></textarea>
                    </div>
                    <Button className="w-full">Kirim Pesan</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background px-4 py-6 lg:px-6">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <Link className="flex items-center justify-center" href="/">
              <span className="font-bold text-lg text-primary">Siskeu Kota Online</span>
            </Link>
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © 2023 Siskeu Kota Online. Hak Cipta Dilindungi.
            </p>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Kebijakan Privasi
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Syarat & Ketentuan
            </Link>
            <Link className="text-xs hover:underline underline-offset-4" href="#">
              Bantuan
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  )
}
