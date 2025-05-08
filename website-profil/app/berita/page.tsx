"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { ChevronRight } from "lucide-react"

// Sample news data
const newsData = [
  {
    id: 1,
    title: "Kegiatan Gotong Royong Desa",
    date: "2023-04-12",
    category: "Kegiatan",
    image: "/placeholder.svg?height=300&width=500&text=Berita+1",
    excerpt:
      "Masyarakat Desa Pao-Pao bersama-sama melakukan kegiatan gotong royong membersihkan lingkungan desa dan saluran air untuk mencegah banjir di musim hujan.",
  },
  {
    id: 2,
    title: "Penyuluhan Kesehatan untuk Lansia",
    date: "2023-04-05",
    category: "Kesehatan",
    image: "/placeholder.svg?height=300&width=500&text=Berita+2",
    excerpt:
      "Dinas Kesehatan bekerja sama dengan Pemerintah Desa Pao-Pao mengadakan penyuluhan kesehatan untuk lansia di balai desa. Kegiatan ini diikuti oleh 50 lansia.",
  },
  {
    id: 3,
    title: "Pelatihan Keterampilan Digital untuk Pemuda",
    date: "2023-03-28",
    category: "Pendidikan",
    image: "/placeholder.svg?height=300&width=500&text=Berita+3",
    excerpt:
      "Sebanyak 30 pemuda Desa Pao-Pao mengikuti pelatihan keterampilan digital yang diselenggarakan oleh Kementerian Komunikasi dan Informatika di aula desa.",
  },
  {
    id: 4,
    title: "Pembagian Bantuan Bibit Tanaman",
    date: "2023-03-20",
    category: "Pertanian",
    image: "/placeholder.svg?height=300&width=500&text=Berita+4",
    excerpt:
      "Dinas Pertanian membagikan bantuan bibit tanaman kepada petani Desa Pao-Pao. Bantuan ini diharapkan dapat meningkatkan produktivitas pertanian di desa.",
  },
  {
    id: 5,
    title: "Rapat Koordinasi Pembangunan Desa",
    date: "2023-03-15",
    category: "Pemerintahan",
    image: "/placeholder.svg?height=300&width=500&text=Berita+5",
    excerpt:
      "Kepala Desa Pao-Pao mengadakan rapat koordinasi pembangunan desa dengan seluruh perangkat desa dan tokoh masyarakat untuk membahas rencana pembangunan tahun 2023.",
  },
  {
    id: 6,
    title: "Vaksinasi COVID-19 Tahap 3",
    date: "2023-03-10",
    category: "Kesehatan",
    image: "/placeholder.svg?height=300&width=500&text=Berita+6",
    excerpt:
      "Puskesmas bekerja sama dengan Pemerintah Desa Pao-Pao mengadakan vaksinasi COVID-19 tahap 3 untuk masyarakat desa. Kegiatan ini diikuti oleh 200 warga.",
  },
]

// Sample events data
const eventsData = [
  {
    id: 1,
    title: "Musyawarah Desa",
    date: "2023-05-15",
    location: "Balai Desa Pao-Pao",
    description: "Musyawarah desa untuk membahas rencana pembangunan desa tahun 2023.",
  },
  {
    id: 2,
    title: "Peringatan HUT RI",
    date: "2023-08-17",
    location: "Lapangan Desa Pao-Pao",
    description: "Peringatan HUT RI ke-78 dengan berbagai lomba dan kegiatan.",
  },
  {
    id: 3,
    title: "Posyandu Balita",
    date: "2023-05-05",
    location: "Posyandu Desa Pao-Pao",
    description: "Pemeriksaan kesehatan rutin untuk balita di desa.",
  },
  {
    id: 4,
    title: "Pelatihan Pertanian Organik",
    date: "2023-05-20",
    location: "Aula Desa Pao-Pao",
    description: "Pelatihan pertanian organik untuk petani desa.",
  },
]

export default function BeritaPage() {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [selectedEvents, setSelectedEvents] = useState<any[]>([])

  // Filter events based on selected date
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0]
      const filtered = eventsData.filter((event) => event.date === formattedDate)
      setSelectedEvents(filtered)
    } else {
      setSelectedEvents([])
    }
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tighter mb-2 text-primary">Berita Desa</h1>
      <p className="text-muted-foreground mb-6">
        Menyajikan informasi terbaru tentang peristiwa, berita terkini, dan artikel-artikel jurnalistik dari Desa
        Pao-Pao
      </p>

      <Tabs defaultValue="news" className="mb-10">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="news">Berita Terkini</TabsTrigger>
          <TabsTrigger value="calendar">Kalender Kegiatan</TabsTrigger>
        </TabsList>

        <TabsContent value="news" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsData.map((news) => (
              <Card
                key={news.id}
                className="overflow-hidden border-secondary/20 hover:border-secondary transition-colors"
              >
                <div className="relative h-48">
                  <Image src={news.image || "/placeholder.svg"} alt={news.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs bg-secondary/20 text-secondary px-2 py-1 rounded-full">
                      {news.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(news.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  <CardTitle className="line-clamp-2">{news.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-3 text-muted-foreground">{news.excerpt}</p>
                </CardContent>
                <CardFooter>
                  <Link href={`/berita/${news.id}`} className="text-primary flex items-center">
                    Baca Selengkapnya <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="calendar" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Kalender Kegiatan</CardTitle>
                <CardDescription>Pilih tanggal untuk melihat kegiatan</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar mode="single" selected={date} onSelect={handleDateSelect} className="rounded-md border" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kegiatan Terjadwal</CardTitle>
                <CardDescription>
                  {date
                    ? `Kegiatan pada ${date.toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}`
                    : "Pilih tanggal untuk melihat kegiatan"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {selectedEvents.length > 0 ? (
                  <div className="space-y-4">
                    {selectedEvents.map((event) => (
                      <div key={event.id} className="border rounded-lg p-4">
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">Lokasi: {event.location}</p>
                        <p className="text-sm">{event.description}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground">
                      {date ? "Tidak ada kegiatan pada tanggal ini" : "Pilih tanggal untuk melihat kegiatan"}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-primary">Kegiatan Mendatang</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {eventsData.map((event) => (
                <Card key={event.id} className="border-secondary/20 hover:border-secondary transition-colors">
                  <CardHeader>
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription>
                      {new Date(event.date).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-2">
                      <span className="font-medium">Lokasi:</span> {event.location}
                    </p>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-primary text-primary hover:bg-primary/10"
                    >
                      Detail Kegiatan
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
