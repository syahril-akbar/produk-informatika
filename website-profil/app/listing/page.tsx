"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { MapPin, Navigation } from "lucide-react"
import Image from "next/image"

// Sample listing data
const listingData = {
  tourism: [
    {
      id: 1,
      name: "Air Terjun Pao-Pao",
      description:
        "Air terjun alami dengan ketinggian 15 meter yang dikelilingi oleh hutan yang rindang. Tempat yang cocok untuk refreshing dan menikmati keindahan alam.",
      image: "/placeholder.svg?height=300&width=500&text=Air+Terjun",
      location: { lat: -5.195, lng: 119.452 },
      facilities: ["Area Parkir", "Warung Makan", "Toilet Umum", "Spot Foto"],
    },
    {
      id: 2,
      name: "Pemandian Alam Batu Bassi",
      description:
        "Pemandian air jernih yang berasal dari mata air pegunungan. Suasana yang sejuk dan nyaman menjadikannya tempat favorit warga untuk bersantai.",
      image: "/placeholder.svg?height=300&width=500&text=Pemandian+Alam",
      location: { lat: -5.193, lng: 119.455 },
      facilities: ["Gazebo", "Area Bermain Anak", "Warung Makan", "Toilet Umum"],
    },
    {
      id: 3,
      name: "Agrowisata Kebun Buah",
      description:
        "Kebun buah seluas 5 hektar yang menawarkan pengalaman memetik buah langsung dari pohonnya. Terdapat berbagai jenis buah seperti rambutan, durian, dan mangga.",
      image: "/placeholder.svg?height=300&width=500&text=Agrowisata",
      location: { lat: -5.19, lng: 119.45 },
      facilities: ["Area Parkir", "Pusat Oleh-oleh", "Toilet Umum", "Musholla"],
    },
  ],
  agriculture: [
    {
      id: 1,
      name: "Pertanian Padi Organik",
      description:
        "Lahan pertanian padi organik seluas 10 hektar yang dikelola oleh kelompok tani Sumber Makmur. Menghasilkan beras organik berkualitas tinggi.",
      image: "/placeholder.svg?height=300&width=500&text=Pertanian+Padi",
      location: { lat: -5.197, lng: 119.448 },
      products: ["Beras Merah Organik", "Beras Putih Organik", "Beras Hitam Organik"],
    },
    {
      id: 2,
      name: "Perkebunan Sayur",
      description:
        "Perkebunan sayur hidroponik dan konvensional yang menanam berbagai jenis sayuran segar. Hasil panen dipasarkan ke pasar lokal dan kota terdekat.",
      image: "/placeholder.svg?height=300&width=500&text=Kebun+Sayur",
      location: { lat: -5.192, lng: 119.447 },
      products: ["Bayam", "Kangkung", "Sawi", "Tomat", "Cabai", "Terong"],
    },
    {
      id: 3,
      name: "Peternakan Sapi Perah",
      description:
        "Peternakan sapi perah dengan 50 ekor sapi yang menghasilkan susu segar setiap hari. Terdapat juga pengolahan susu menjadi yogurt dan keju.",
      image: "/placeholder.svg?height=300&width=500&text=Peternakan+Sapi",
      location: { lat: -5.199, lng: 119.451 },
      products: ["Susu Segar", "Yogurt", "Keju", "Mentega"],
    },
  ],
  facilities: [
    {
      id: 1,
      name: "Balai Desa Pao-Pao",
      description:
        "Pusat administrasi dan kegiatan pemerintahan desa. Dilengkapi dengan aula serbaguna yang dapat digunakan untuk berbagai kegiatan masyarakat.",
      image: "/placeholder.svg?height=300&width=500&text=Balai+Desa",
      location: { lat: -5.195, lng: 119.45 },
      services: ["Pelayanan Administrasi", "Rapat Desa", "Kegiatan Sosial", "Pelatihan Masyarakat"],
    },
    {
      id: 2,
      name: "Puskesmas Pembantu",
      description:
        "Fasilitas kesehatan yang melayani masyarakat desa dengan berbagai layanan dasar kesehatan. Buka setiap hari kerja dari pukul 08.00-14.00 WITA.",
      image: "/placeholder.svg?height=300&width=500&text=Puskesmas",
      location: { lat: -5.194, lng: 119.449 },
      services: ["Pemeriksaan Umum", "Imunisasi", "KB", "Posyandu", "Konsultasi Gizi"],
    },
    {
      id: 3,
      name: "Pasar Desa",
      description:
        "Pasar tradisional yang beroperasi setiap hari dengan puncak keramaian pada hari Minggu. Menjual berbagai kebutuhan pokok dan hasil pertanian lokal.",
      image: "/placeholder.svg?height=300&width=500&text=Pasar+Desa",
      location: { lat: -5.196, lng: 119.451 },
      services: ["Penjualan Sembako", "Hasil Pertanian", "Kuliner Lokal", "Kerajinan Tangan"],
    },
    {
      id: 4,
      name: "Sekolah Dasar Negeri Pao-Pao",
      description:
        "Sekolah dasar negeri dengan 12 ruang kelas dan fasilitas pendukung seperti perpustakaan, laboratorium komputer, dan lapangan olahraga.",
      image: "/placeholder.svg?height=300&width=500&text=Sekolah+Dasar",
      location: { lat: -5.193, lng: 119.452 },
      services: ["Pendidikan Dasar", "Ekstrakurikuler", "Perpustakaan", "Olahraga"],
    },
  ],
}

export default function ListingPage() {
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const openGoogleMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps?q=${lat},${lng}`, "_blank")
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tighter mb-2">Potensi dan Fasilitas Desa Pao-Pao</h1>
      <p className="text-muted-foreground mb-6">
        Informasi lengkap tentang potensi wisata, pertanian, dan fasilitas umum di Desa Pao-Pao
      </p>

      <Tabs defaultValue="tourism" className="mb-10">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="tourism">Potensi Wisata</TabsTrigger>
          <TabsTrigger value="agriculture">Potensi Pertanian</TabsTrigger>
          <TabsTrigger value="facilities">Fasilitas Umum</TabsTrigger>
        </TabsList>

        <TabsContent value="tourism" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {listingData.tourism.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Fasilitas:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {item.facilities.map((facility, index) => (
                        <li key={index}>{facility}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => setSelectedItem(item)}
                  >
                    <MapPin className="h-4 w-4" />
                    Lihat Lokasi
                  </Button>
                  <Button
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => openGoogleMaps(item.location.lat, item.location.lng)}
                  >
                    <Navigation className="h-4 w-4" />
                    Buka di Maps
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="agriculture" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {listingData.agriculture.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Produk:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {item.products.map((product, index) => (
                        <li key={index}>{product}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => setSelectedItem(item)}
                  >
                    <MapPin className="h-4 w-4" />
                    Lihat Lokasi
                  </Button>
                  <Button
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => openGoogleMaps(item.location.lat, item.location.lng)}
                  >
                    <Navigation className="h-4 w-4" />
                    Buka di Maps
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="facilities" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {listingData.facilities.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="relative h-48">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{item.description}</p>
                  <div className="mb-4">
                    <h4 className="font-medium mb-2">Layanan:</h4>
                    <ul className="list-disc list-inside text-sm text-muted-foreground">
                      {item.services.map((service, index) => (
                        <li key={index}>{service}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => setSelectedItem(item)}
                  >
                    <MapPin className="h-4 w-4" />
                    Lihat Lokasi
                  </Button>
                  <Button
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => openGoogleMaps(item.location.lat, item.location.lng)}
                  >
                    <Navigation className="h-4 w-4" />
                    Buka di Maps
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedItem && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Lokasi {selectedItem.name}</CardTitle>
            <CardDescription>Peta lokasi dan koordinat</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video w-full rounded-lg overflow-hidden border">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3000!2d${selectedItem.location.lng}!3d${selectedItem.location.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNcKwMTEnNDIuMCJTIDExOcKwMjcnMDcuMiJF!5e0!3m2!1sid!2sid!4v1650000000000!5m2!1sid!2sid`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Koordinat: {selectedItem.location.lat}, {selectedItem.location.lng}
                </p>
              </div>
              <Button
                className="flex items-center gap-2"
                onClick={() => openGoogleMaps(selectedItem.location.lat, selectedItem.location.lng)}
              >
                <Navigation className="h-4 w-4" />
                Navigasi ke Lokasi
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
