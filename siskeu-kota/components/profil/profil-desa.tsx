"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import { MapPin, Phone, Mail, Globe } from "lucide-react"
import { useEffect, useState } from "react"

// Sample desa data
const sampleDesaData = {
  nama: "Desa Sukamaju",
  alamat: "Jl. Raya Sukamaju No. 123, Kecamatan Sukamaju, Kabupaten Sukamaju, Provinsi Jawa Tengah",
  telepon: "(0123) 456789",
  email: "info@desasukamaju.id",
  website: "www.desasukamaju.id",
  luas_wilayah: 5.25,
  jumlah_dusun: 5,
  jumlah_rw: 10,
  jumlah_rt: 25,
  batas_utara: "Desa Harapan",
  batas_selatan: "Desa Makmur",
  batas_timur: "Desa Sejahtera",
  batas_barat: "Desa Damai",
  sejarah:
    'Desa Sukamaju didirikan pada tahun 1945 setelah kemerdekaan Indonesia. Awalnya merupakan pemukiman kecil yang kemudian berkembang menjadi desa yang makmur. Nama Sukamaju berasal dari kata "suka" yang berarti senang dan "maju" yang berarti berkembang, mencerminkan harapan pendiri desa agar masyarakatnya selalu senang dan terus berkembang.',
}

export function ProfilDesa() {
  const [desaData, setDesaData] = useState(sampleDesaData)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="grid gap-6">
        <Card>
          <CardHeader className="pb-4">
            <CardTitle>Memuat Data...</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader className="pb-4">
          <CardTitle>Profil {desaData.nama}</CardTitle>
          <CardDescription>Informasi umum tentang {desaData.nama}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Alamat</div>
                  <div className="text-sm text-muted-foreground">{desaData.alamat}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Telepon</div>
                  <div className="text-sm text-muted-foreground">{desaData.telepon}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-sm text-muted-foreground">{desaData.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-muted-foreground" />
                <div>
                  <div className="font-medium">Website</div>
                  <div className="text-sm text-muted-foreground">{desaData.website}</div>
                </div>
              </div>
            </div>
            <div className="relative h-[200px] rounded-lg overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600" alt="Desa Sukamaju" fill className="object-cover" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="umum" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="umum">Umum</TabsTrigger>
          <TabsTrigger value="demografi">Demografi</TabsTrigger>
          <TabsTrigger value="potensi">Potensi</TabsTrigger>
          <TabsTrigger value="pemerintahan">Pemerintahan</TabsTrigger>
        </TabsList>
        <TabsContent value="umum" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Umum</CardTitle>
              <CardDescription>Data umum tentang {desaData.nama}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="font-medium">Luas Wilayah</div>
                  <div className="text-sm text-muted-foreground">{desaData.luas_wilayah} km²</div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Jumlah Dusun</div>
                  <div className="text-sm text-muted-foreground">{desaData.jumlah_dusun} Dusun</div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Jumlah RW</div>
                  <div className="text-sm text-muted-foreground">{desaData.jumlah_rw} RW</div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Jumlah RT</div>
                  <div className="text-sm text-muted-foreground">{desaData.jumlah_rt} RT</div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Batas Utara</div>
                  <div className="text-sm text-muted-foreground">{desaData.batas_utara}</div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Batas Selatan</div>
                  <div className="text-sm text-muted-foreground">{desaData.batas_selatan}</div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Batas Timur</div>
                  <div className="text-sm text-muted-foreground">{desaData.batas_timur}</div>
                </div>
                <div className="space-y-2">
                  <div className="font-medium">Batas Barat</div>
                  <div className="text-sm text-muted-foreground">{desaData.batas_barat}</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="font-medium">Sejarah Singkat</div>
                <div className="text-sm text-muted-foreground">{desaData.sejarah}</div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* Other tabs remain the same */}
      </Tabs>
    </div>
  )
}
