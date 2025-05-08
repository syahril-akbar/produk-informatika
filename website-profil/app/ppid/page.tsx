"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, Eye, FileText, Search } from "lucide-react"

// Sample PPID data
const ppidData = {
  information: [
    {
      id: 1,
      title: "Laporan Penyelenggaraan Pemerintahan Desa (LPPD) Tahun 2023",
      category: "Laporan",
      date: "2023-12-30",
      description: "Laporan tahunan penyelenggaraan pemerintahan Desa Pao-Pao tahun 2023.",
      file: "#",
    },
    {
      id: 2,
      title: "Peraturan Desa No. 5 Tahun 2023 tentang APBDes",
      category: "Peraturan",
      date: "2023-01-15",
      description: "Peraturan desa tentang Anggaran Pendapatan dan Belanja Desa tahun 2023.",
      file: "#",
    },
    {
      id: 3,
      title: "Rencana Kerja Pemerintah Desa (RKPDes) Tahun 2023",
      category: "Perencanaan",
      date: "2022-10-20",
      description: "Dokumen perencanaan desa untuk periode satu tahun (2023).",
      file: "#",
    },
    {
      id: 4,
      title: "Laporan Realisasi APBDes Semester 1 Tahun 2023",
      category: "Keuangan",
      date: "2023-07-10",
      description: "Laporan realisasi pelaksanaan APBDes semester 1 tahun 2023.",
      file: "#",
    },
    {
      id: 5,
      title: "Daftar Informasi Publik Desa Pao-Pao",
      category: "Informasi Publik",
      date: "2023-01-05",
      description: "Daftar informasi publik yang tersedia di Desa Pao-Pao.",
      file: "#",
    },
    {
      id: 6,
      title: "Profil Desa Pao-Pao Tahun 2023",
      category: "Profil",
      date: "2023-02-15",
      description: "Dokumen profil Desa Pao-Pao yang berisi data dan informasi desa terkini.",
      file: "#",
    },
  ],
  budget: [
    {
      id: 1,
      title: "APBDes Tahun 2023",
      year: "2023",
      category: "APBDes",
      date: "2023-01-10",
      description: "Dokumen Anggaran Pendapatan dan Belanja Desa tahun 2023.",
      file: "#",
      fileSize: "2.5 MB",
      fileType: "PDF",
    },
    {
      id: 2,
      title: "Laporan Realisasi APBDes Semester 1 Tahun 2023",
      year: "2023",
      category: "Laporan Realisasi",
      date: "2023-07-15",
      description: "Laporan realisasi pelaksanaan APBDes semester 1 tahun 2023.",
      file: "#",
      fileSize: "3.2 MB",
      fileType: "PDF",
    },
    {
      id: 3,
      title: "Laporan Realisasi APBDes Tahunan 2022",
      year: "2022",
      category: "Laporan Realisasi",
      date: "2023-01-20",
      description: "Laporan realisasi pelaksanaan APBDes tahunan 2022.",
      file: "#",
      fileSize: "4.1 MB",
      fileType: "PDF",
    },
    {
      id: 4,
      title: "APBDes Tahun 2022",
      year: "2022",
      category: "APBDes",
      date: "2022-01-12",
      description: "Dokumen Anggaran Pendapatan dan Belanja Desa tahun 2022.",
      file: "#",
      fileSize: "2.3 MB",
      fileType: "PDF",
    },
    {
      id: 5,
      title: "Laporan Realisasi APBDes Semester 1 Tahun 2022",
      year: "2022",
      category: "Laporan Realisasi",
      date: "2022-07-10",
      description: "Laporan realisasi pelaksanaan APBDes semester 1 tahun 2022.",
      file: "#",
      fileSize: "2.8 MB",
      fileType: "PDF",
    },
    {
      id: 6,
      title: "Laporan Realisasi APBDes Semester 2 Tahun 2022",
      year: "2022",
      category: "Laporan Realisasi",
      date: "2023-01-05",
      description: "Laporan realisasi pelaksanaan APBDes semester 2 tahun 2022.",
      file: "#",
      fileSize: "3.0 MB",
      fileType: "PDF",
    },
  ],
}

export default function PPIDPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterYear, setFilterYear] = useState("all")
  const [filterCategory, setFilterCategory] = useState("all")
  const [selectedDocument, setSelectedDocument] = useState<any>(null)

  // Filter budget documents
  const filteredBudget = ppidData.budget.filter((doc) => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesYear = filterYear === "all" || doc.year === filterYear
    const matchesCategory = filterCategory === "all" || doc.category === filterCategory

    return matchesSearch && matchesYear && matchesCategory
  })

  // Handle document view
  const handleViewDocument = (document: any) => {
    setSelectedDocument(document)
    // In a real application, this would open a modal or redirect to a viewer
    alert(`Viewing document: ${document.title}`)
  }

  // Handle document download
  const handleDownloadDocument = (document: any) => {
    // In a real application, this would trigger a download
    alert(`Downloading document: ${document.title}`)
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tighter mb-2">PPID (Pejabat Pengelola Informasi dan Dokumentasi)</h1>
      <p className="text-muted-foreground mb-6">Informasi publik dan dokumentasi Desa Pao-Pao</p>

      <Tabs defaultValue="information" className="mb-10">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="information">Informasi Publik</TabsTrigger>
          <TabsTrigger value="budget">Dokumen Anggaran</TabsTrigger>
        </TabsList>

        <TabsContent value="information" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Publik Terbaru</CardTitle>
              <CardDescription>Daftar informasi publik yang tersedia di Desa Pao-Pao</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {ppidData.information.map((info) => (
                  <Card key={info.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{info.title}</CardTitle>
                          <CardDescription>
                            {info.category} •{" "}
                            {new Date(info.date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={() => handleViewDocument(info)}
                          >
                            <Eye className="h-4 w-4" />
                            Lihat
                          </Button>
                          <Button
                            size="sm"
                            className="flex items-center gap-2"
                            onClick={() => handleDownloadDocument(info)}
                          >
                            <Download className="h-4 w-4" />
                            Unduh
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{info.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="budget" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Dokumen Anggaran</CardTitle>
              <CardDescription>Dokumen anggaran dan laporan keuangan desa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari dokumen..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterYear} onValueChange={setFilterYear}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter Tahun" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Tahun</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter Kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Kategori</SelectItem>
                    <SelectItem value="APBDes">APBDes</SelectItem>
                    <SelectItem value="Laporan Realisasi">Laporan Realisasi</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Dokumen</TableHead>
                      <TableHead>Kategori</TableHead>
                      <TableHead>Tanggal</TableHead>
                      <TableHead>Ukuran</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBudget.length > 0 ? (
                      filteredBudget.map((doc) => (
                        <TableRow key={doc.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <FileText className="h-5 w-5 text-primary" />
                              <div>
                                <p className="font-medium">{doc.title}</p>
                                <p className="text-xs text-muted-foreground">{doc.description}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{doc.category}</TableCell>
                          <TableCell>
                            {new Date(doc.date).toLocaleDateString("id-ID", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </TableCell>
                          <TableCell>
                            {doc.fileSize} ({doc.fileType})
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => handleViewDocument(doc)}
                              >
                                <Eye className="h-3 w-3" />
                                Lihat
                              </Button>
                              <Button
                                size="sm"
                                className="flex items-center gap-1"
                                onClick={() => handleDownloadDocument(doc)}
                              >
                                <Download className="h-3 w-3" />
                                Unduh
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          Tidak ada dokumen yang ditemukan.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {filteredBudget.length > 0 && (
                <div className="mt-4 text-sm text-muted-foreground">
                  Menampilkan {filteredBudget.length} dari {ppidData.budget.length} dokumen
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
