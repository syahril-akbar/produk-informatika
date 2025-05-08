"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, Search, XCircle } from "lucide-react"

// Sample bansos recipients data
const bansosRecipients = [
  {
    nik: "7371122505800001",
    name: "Ahmad Sulaiman",
    address: "Dusun Pao Utara",
    type: "PKH",
    status: "Aktif",
  },
  {
    nik: "7371122505800002",
    name: "Siti Aminah",
    address: "Dusun Pao Selatan",
    type: "BPNT",
    status: "Aktif",
  },
  {
    nik: "7371122505800003",
    name: "Budi Santoso",
    address: "Dusun Pao Timur",
    type: "BLT-Dana Desa",
    status: "Aktif",
  },
  { nik: "7371122505800004", name: "Dewi Lestari", address: "Dusun Pao Barat", type: "PKH", status: "Aktif" },
  {
    nik: "7371122505800005",
    name: "Hendra Wijaya",
    address: "Dusun Pao Utara",
    type: "BPNT",
    status: "Aktif",
  },
  {
    nik: "7371122505800006",
    name: "Rina Wati",
    address: "Dusun Pao Selatan",
    type: "BLT-Dana Desa",
    status: "Aktif",
  },
  { nik: "7371122505800007", name: "Agus Setiawan", address: "Dusun Pao Timur", type: "PKH", status: "Aktif" },
  { nik: "7371122505800008", name: "Joko Susilo", address: "Dusun Pao Barat", type: "BPNT", status: "Aktif" },
  {
    nik: "7371122505800009",
    name: "Sri Wahyuni",
    address: "Dusun Pao Utara",
    type: "BLT-Dana Desa",
    status: "Aktif",
  },
  {
    nik: "7371122505800010",
    name: "Rudi Hartono",
    address: "Dusun Pao Selatan",
    type: "PKH",
    status: "Aktif",
  },
]

export default function CekBansosPage() {
  const [searchMethod, setSearchMethod] = useState<"nik" | "name">("nik")
  const [searchTerm, setSearchTerm] = useState("")
  const [searchResult, setSearchResult] = useState<any>(null)
  const [isSearched, setIsSearched] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = () => {
    if (!searchTerm.trim()) return

    setIsLoading(true)
    setIsSearched(false)

    // Simulate API call with timeout
    setTimeout(() => {
      let result = null

      if (searchMethod === "nik") {
        result = bansosRecipients.find((recipient) => recipient.nik === searchTerm)
      } else {
        result = bansosRecipients.find((recipient) => recipient.name.toLowerCase().includes(searchTerm.toLowerCase()))
      }

      setSearchResult(result)
      setIsSearched(true)
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tighter mb-2">Cek Penerima Bantuan Sosial</h1>
      <p className="text-muted-foreground mb-6">
        Cek apakah Anda atau keluarga terdaftar sebagai penerima bantuan sosial di Desa Pao-Pao
      </p>

      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Cek Status Penerima Bansos</CardTitle>
          <CardDescription>Masukkan NIK atau nama untuk memeriksa status penerima bantuan sosial</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="nik" onValueChange={(value) => setSearchMethod(value as "nik" | "name")}>
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="nik">Cari dengan NIK</TabsTrigger>
              <TabsTrigger value="name">Cari dengan Nama</TabsTrigger>
            </TabsList>

            <div className="flex gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder={searchMethod === "nik" ? "Masukkan NIK..." : "Masukkan Nama..."}
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button onClick={handleSearch} disabled={isLoading}>
                {isLoading ? "Mencari..." : "Cari"}
              </Button>
            </div>

            {searchMethod === "nik" && (
              <p className="text-xs text-muted-foreground mt-2">
                Masukkan 16 digit NIK tanpa spasi, contoh: 7371122505800001
              </p>
            )}
          </Tabs>

          {isSearched && (
            <div className="mt-6">
              {searchResult ? (
                <Alert className="border-green-500 bg-green-50 dark:bg-green-950 dark:border-green-900">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <AlertTitle className="text-green-800 dark:text-green-300">Terdaftar sebagai Penerima</AlertTitle>
                  <AlertDescription className="text-green-700 dark:text-green-400">
                    <div className="mt-2 grid grid-cols-1 gap-2">
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Nama</span>
                        <span className="col-span-2">: {searchResult.name}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">NIK</span>
                        <span className="col-span-2">: {searchResult.nik}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Alamat</span>
                        <span className="col-span-2">: {searchResult.address}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Jenis Bantuan</span>
                        <span className="col-span-2">: {searchResult.type}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1">
                        <span className="font-medium">Status</span>
                        <span className="col-span-2">: {searchResult.status}</span>
                      </div>
                    </div>
                  </AlertDescription>
                </Alert>
              ) : (
                <Alert className="border-red-500 bg-red-50 dark:bg-red-950 dark:border-red-900">
                  <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  <AlertTitle className="text-red-800 dark:text-red-300">Tidak Terdaftar</AlertTitle>
                  <AlertDescription className="text-red-700 dark:text-red-400">
                    Data yang Anda masukkan tidak terdaftar sebagai penerima bantuan sosial di Desa Pao-Pao.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start">
          <p className="text-sm text-muted-foreground">
            Jika Anda memiliki pertanyaan atau memerlukan bantuan, silakan hubungi kantor desa di (0411) 123-4567 atau
            kunjungi Balai Desa Pao-Pao pada jam kerja.
          </p>
        </CardFooter>
      </Card>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-4">Informasi Bantuan Sosial</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Program Keluarga Harapan (PKH)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Program pemberian bantuan sosial bersyarat kepada keluarga miskin yang ditetapkan sebagai keluarga
                penerima manfaat PKH.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Bantuan Pangan Non Tunai (BPNT)</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Program bantuan pangan dari pemerintah yang diberikan kepada KPM setiap bulannya melalui mekanisme akun
                elektronik.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>BLT Dana Desa</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Bantuan langsung tunai yang berasal dari Dana Desa yang diberikan kepada keluarga miskin atau tidak
                mampu di desa.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
