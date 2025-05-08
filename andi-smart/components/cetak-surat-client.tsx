"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Printer, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Safe localStorage wrapper
const safeLocalStorage = {
  getItem: (key: string, defaultValue: any = "[]") => {
    if (typeof window === "undefined") return defaultValue
    try {
      return localStorage.getItem(key) || defaultValue
    } catch (error) {
      console.error("Error accessing localStorage:", error)
      return defaultValue
    }
  },
  setItem: (key: string, value: string) => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.error("Error setting localStorage:", error)
    }
  },
}

// Letter type mapping
const letterTypeMap: Record<string, string> = {
  ktp: "KTP",
  kk: "KK",
  akta: "AKT",
  skck: "SKCK",
  domisili: "DOM",
  usaha: "USH",
  kelahiran: "LHR",
  kematian: "MTI",
  pindah: "PND",
  nikah: "NKH",
  cerai: "CRI",
  waris: "WRS",
  izin: "IZN",
  umum: "UMM",
}

export default function CetakSuratClient() {
  const [isClient, setIsClient] = useState(false)
  const [letterData, setLetterData] = useState<any>(null)
  const [isCopied, setIsCopied] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Get letter ID from URL
  const letterId = searchParams.get("id")

  useEffect(() => {
    setIsClient(true)

    if (!letterId) return

    try {
      // Get letter data from localStorage
      const storedLetters = JSON.parse(safeLocalStorage.getItem("letters", "[]"))
      const letter = storedLetters.find((l: any) => l.id === letterId)

      if (letter) {
        setLetterData(letter)
      } else {
        toast({
          title: "Surat tidak ditemukan",
          description: "Surat dengan ID tersebut tidak ditemukan",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error fetching letter data:", error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat memuat data surat",
        variant: "destructive",
      })
    }
  }, [letterId, toast])

  // Don't render anything on the server
  if (!isClient) {
    return null
  }

  if (!letterData) {
    return (
      <div className="container mx-auto p-6">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Surat Tidak Ditemukan</CardTitle>
            <CardDescription>Surat dengan ID tersebut tidak ditemukan atau telah dihapus</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => router.push("/buat-surat")}>Buat Surat Baru</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  const handlePrint = () => {
    window.print()
  }

  const copyLetterNumber = () => {
    if (!letterData.nomorSurat) return

    navigator.clipboard.writeText(letterData.nomorSurat)
    setIsCopied(true)

    toast({
      title: "Nomor surat disalin",
      description: `${letterData.nomorSurat} telah disalin ke clipboard`,
    })

    setTimeout(() => setIsCopied(false), 2000)
  }

  return (
    <div className="container mx-auto p-6">
      <div className="print:hidden">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
        </Button>
      </div>

      <Card className="mb-6 print:shadow-none print:border-none">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Cetak Surat</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm font-mono">
                {letterData.nomorSurat}
              </Badge>
              <Button variant="ghost" size="icon" onClick={copyLetterNumber} className="h-8 w-8">
                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <CardDescription>Preview dan cetak surat Anda</CardDescription>
        </CardHeader>

        <CardContent>
          <div className="border p-6 rounded-lg min-h-[60vh] bg-white">
            <div className="text-center mb-6">
              <h1 className="text-xl font-bold uppercase">
                SURAT KETERANGAN {letterTypeMap[letterData.type]?.toUpperCase() || letterData.type.toUpperCase()}
              </h1>
              <p className="text-sm font-medium">{letterData.nomorSurat}</p>
            </div>

            <div className="space-y-4">
              <p>Yang bertanda tangan di bawah ini:</p>

              <div className="ml-6 space-y-1">
                <p>Nama: Kepala Desa Contoh</p>
                <p>Jabatan: Kepala Desa</p>
                <p>Alamat: Jl. Contoh No. 123, Desa Contoh</p>
              </div>

              <p>Dengan ini menerangkan bahwa:</p>

              <div className="ml-6 space-y-1">
                <p>Nama: {letterData.nama}</p>
                <p>NIK: {letterData.nik}</p>
                <p>
                  Tempat/Tanggal Lahir: {letterData.tempatLahir}, {letterData.tanggalLahir}
                </p>
                <p>Jenis Kelamin: {letterData.jenisKelamin}</p>
                <p>Alamat: {letterData.alamat}</p>
              </div>

              <p>
                Adalah benar warga Desa Contoh yang mengajukan permohonan{" "}
                {letterTypeMap[letterData.type] || letterData.type}.
              </p>

              <p>Demikian surat keterangan ini dibuat untuk dipergunakan sebagaimana mestinya.</p>

              <div className="text-right mt-8">
                <p>
                  Desa Contoh,{" "}
                  {new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </p>
                <p className="mt-1">Kepala Desa Contoh</p>
                <div className="h-16"></div>
                <p className="font-bold underline">Nama Kepala Desa</p>
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="print:hidden">
          <Button onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" /> Cetak Surat
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
