import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronRight, FileText, MapPin, Users } from "lucide-react"
import GovernmentStructure from "@/components/government-structure"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="container flex flex-col items-center text-center z-10 text-white space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">Selamat Datang</h1>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tighter">Website Resmi Desa Pao-Pao</h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Sumber informasi terbaru tentang pemerintahan di Desa Pao-Pao
          </p>
          {/* Removed buttons as requested */}
        </div>

        {/* Navigation arrows */}
        <button className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 z-20">
          <span className="sr-only">Previous</span>
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
            className="text-white h-6 w-6"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 z-20">
          <span className="sr-only">Next</span>
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
            className="text-white h-6 w-6"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
          <span className="h-2 w-2 bg-white rounded-full"></span>
          <span className="h-2 w-2 bg-white/50 rounded-full"></span>
          <span className="h-2 w-2 bg-white/50 rounded-full"></span>
        </div>

        {/* Background image */}
        <div className="absolute inset-0 bg-[url('/images/danau-toba-sunrise.jpeg')] bg-cover bg-center bg-no-repeat before:content-[''] before:absolute before:inset-0 before:bg-black/20"></div>

        {/* Accessibility controls */}
        <div className="absolute bottom-6 right-6 flex space-x-2 z-20">
          <button className="bg-blue-600 p-2 rounded-full" aria-label="Accessibility options">
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
              className="text-white h-6 w-6"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m17.8 9-2.5 5.5-5.5 2.5L7.2 15l2.5-5.5L15.2 7 17.8 9Z"></path>
              <line x1="12" y1="12" x2="12" y2="12.01"></line>
            </svg>
          </button>
          <button className="bg-orange-400 text-white p-2 rounded-md">Pengaduan</button>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-12 bg-muted">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Users className="h-8 w-8 text-secondary" />
                <div>
                  <CardTitle>Data Penduduk</CardTitle>
                  <CardDescription>Informasi statistik penduduk desa</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/berita/penduduk" className="text-primary flex items-center">
                  Lihat Detail <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <FileText className="h-8 w-8 text-secondary" />
                <div>
                  <CardTitle>APBDes</CardTitle>
                  <CardDescription>Anggaran Pendapatan dan Belanja Desa</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/berita/apbdes" className="text-primary flex items-center">
                  Lihat Detail <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <MapPin className="h-8 w-8 text-secondary" />
                <div>
                  <CardTitle>Potensi Desa</CardTitle>
                  <CardDescription>Wisata, pertanian, dan fasilitas umum</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <Link href="/listing" className="text-primary flex items-center">
                  Lihat Detail <ChevronRight className="h-4 w-4 ml-1" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Government Structure */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter mb-2 text-primary">Struktur Pemerintahan Desa</h2>
            <p className="text-muted-foreground max-w-3xl mx-auto">
              Berikut adalah struktur kelengkapan pemerintahan Desa Pao-Pao yang bertugas melayani masyarakat
            </p>
          </div>
          <GovernmentStructure />
        </div>
      </section>

      {/* Latest News */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter text-primary">Berita Terkini</h2>
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary/10">
              <Link href="/berita">Lihat Semua Berita</Link>
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <div className="relative h-48">
                  <Image
                    src={`/placeholder.svg?height=300&width=500&text=Berita+${i}`}
                    alt={`Berita ${i}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>Kegiatan Gotong Royong Desa</CardTitle>
                  <CardDescription>12 April 2023</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3">
                    Masyarakat Desa Pao-Pao bersama-sama melakukan kegiatan gotong royong membersihkan lingkungan desa
                    dan saluran air untuk mencegah banjir di musim hujan.
                  </p>
                  <Link href={`/berita/${i}`} className="text-primary flex items-center mt-4">
                    Baca Selengkapnya <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
