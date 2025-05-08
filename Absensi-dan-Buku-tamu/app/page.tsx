"use client"

import { Navbar } from "@/components/navbar"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 container py-12 bg-white">
        <div
          className={`max-w-4xl mx-auto text-center space-y-8 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <h1 className="text-4xl font-bold tracking-tight animate-fade-in">
            Sistem Absensi dan Buku Tamu DIGITAL KOTA
          </h1>
          <p className="text-xl text-muted-foreground animate-fade-in animation-delay-300">
            Solusi digital terintegrasi untuk pencatatan kehadiran dan buku tamu
          </p>

          <div className="grid grid-cols-2 gap-6 mt-12 animate-fade-in animation-delay-500">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <h2 className="text-2xl font-bold text-[#008080] mb-4">Absensi Digital</h2>
              <p className="mb-6">Sistem absensi digital untuk mencatat kehadiran staff dengan mudah dan efisien.</p>
              <Link href="/absensi">
                <Button className="bg-[#008080] hover:bg-[#006666] transition-all duration-300 hover:scale-105">
                  Akses Absensi
                </Button>
              </Link>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <h2 className="text-2xl font-bold text-[#008080] mb-4">Buku Tamu Digital</h2>
              <p className="mb-6">Sistem buku tamu digital untuk mencatat kunjungan tamu dengan terstruktur.</p>
              <Link href="/buku-tamu">
                <Button className="bg-[#008080] hover:bg-[#006666] transition-all duration-300 hover:scale-105">
                  Akses Buku Tamu
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6 mt-8 animate-fade-in animation-delay-700">
            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-lg font-bold text-[#008080] mb-2">Pengaturan Server</h3>
              <p className="text-sm mb-4">Konfigurasi mode server dan pengaturan sistem</p>
              <Link href="/pengaturan">
                <Button
                  variant="outline"
                  className="w-full border-[#008080] text-[#008080] hover:bg-[#008080] hover:text-white transition-colors duration-300"
                >
                  Buka Pengaturan
                </Button>
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-lg font-bold text-[#008080] mb-2">Dashboard Manajemen</h3>
              <p className="text-sm mb-4">Lihat statistik dan laporan kehadiran</p>
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="w-full border-[#008080] text-[#008080] hover:bg-[#008080] hover:text-white transition-colors duration-300"
                >
                  Buka Dashboard
                </Button>
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-100 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <h3 className="text-lg font-bold text-[#008080] mb-2">Manajemen Staff</h3>
              <p className="text-sm mb-4">Kelola data staff dan rekam KTP</p>
              <Link href="/staff">
                <Button
                  variant="outline"
                  className="w-full border-[#008080] text-[#008080] hover:bg-[#008080] hover:text-white transition-colors duration-300"
                >
                  Kelola Staff
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-[#008080] text-white py-4">
        <div className="container text-center">
          <p>© 2025 DIGITAL KOTA - Sistem Absensi dan Buku Tamu Digital</p>
        </div>
      </footer>
    </div>
  )
}
