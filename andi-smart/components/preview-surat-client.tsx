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

// Example letter data
const exampleLetters = [
  {
    id: "example-1",
    type: "ktp",
    nomorSurat: "474/001/KTP/2023",
    nama: "Budi Santoso",
    nik: "1234567890123456",
    tempatLahir: "Jakarta",
    tanggalLahir: "1990-01-01",
    jenisKelamin: "Laki-laki",
    alamat: "Jl. Contoh No. 123, RT 001/RW 002, Desa Contoh",
    keperluan: "Pembuatan KTP baru",
  },
  {
    id: "example-2",
    type: "domisili",
    nomorSurat: "474/002/DOM/2023",
    nama: "Siti Aminah",
    nik: "6543210987654321",
    tempatLahir: "Bandung",
    tanggalLahir: "1995-05-15",
    jenisKelamin: "Perempuan",
    alamat: "Jl. Contoh No. 456, RT 003/RW 004, Desa Contoh",
    keperluan: "Surat keterangan domisili untuk keperluan pekerjaan",
  },
]

export default function PreviewSuratClient() {
  const [isClient, setIsClient] = useState(false)
  const [letterData, setLetterData] = useState<any>(null)
  const [isCopied, setIsCopied] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  // Get letter type from URL
  const letterType = searchParams.get("type") || "ktp"

  useEffect(() => {
    setIsClient(true)

    // Find example letter for the selected type
    const example = exampleLetters.find((letter) => letter.type === letterType) || exampleLetters[0]
    setLetterData(example)

    // Validate letter number against stored numbers
    try {
      const storedNumbers = JSON.parse(safeLocalStorage.getItem("letterNumbers", "[]"))

      // Check if the example letter number already exists
      if (example && !storedNumbers.includes(example.nomorSurat)) {
        // Add the example letter number to stored numbers
        storedNumbers.push(example.nomorSurat)
        safeLocalStorage.setItem("letterNumbers", JSON.stringify(storedNumbers))
      }
    } catch (error) {
      console.error("Error validating letter number:", error)
    }
  }, [letterType])

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
            <CardTitle>Contoh Surat Tidak Tersedia</CardTitle>
            <CardDescription>Contoh surat untuk jenis tersebut tidak tersedia</CardDescription>
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
            <CardTitle>Contoh Surat</CardTitle>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-sm font-mono">
                {letterData.nomorSurat}
              </Badge>
              <Button variant="ghost" size="icon" onClick={copyLetterNumber} className="h-8 w-8">
                {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
          <CardDescription>Preview contoh surat {letterTypeMap[letterData.type] || letterData.type}</CardDescription>
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

      <div className="print:hidden">
        <Button onClick={() => router.push("/buat-surat")} className="mt-4">
          Buat Surat Baru
        </Button>
      </div>
    </div>
  )
}
