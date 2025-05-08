"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search, FileText, Download } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// Import the ResponsiveTableContainer
import { ResponsiveTableContainer } from "@/components/ui/responsive-table-container"

// This would typically come from your database schema
type PelayananItem = {
  id: string
  nama: string
  layanan: string
  tanggal: string
  status: string
  petugas: string
}

export function PelayananTable() {
  const [searchTerm, setSearchTerm] = useState("")
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [selectedLayanan, setSelectedLayanan] = useState<PelayananItem | null>(null)
  const [isExporting, setIsExporting] = useState(false)
  const [pelayananData, setPelayananData] = useState<PelayananItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchPelayanan() {
      setIsLoading(true)
      try {
        // Dalam aplikasi nyata, Anda akan mengambil data dari tabel 'pelayanan'
        // Untuk saat ini, kita akan menggunakan data sampel
        // const { data, error } = await supabaseClient
        //   .from('pelayanan')
        //   .select('*')
        //   .order('created_at', { ascending: false })

        // if (error) {
        //   throw error
        // }

        // if (data && data.length > 0) {
        //   setPelayananData(data)
        // } else {
        // Data sampel untuk demo
        const mockData = [
          {
            id: "PL-001",
            nama: "Ahmad Sulaiman",
            layanan: "Pembuatan KTP",
            tanggal: "2023-05-10",
            status: "Selesai",
            petugas: "Budi Santoso",
          },
          {
            id: "PL-002",
            nama: "Siti Rahayu",
            layanan: "Pembuatan KK",
            tanggal: "2023-05-11",
            status: "Proses",
            petugas: "Dewi Lestari",
          },
          {
            id: "PL-003",
            nama: "Rudi Hermawan",
            layanan: "Akta Kelahiran",
            tanggal: "2023-05-12",
            status: "Selesai",
            petugas: "Agus Widodo",
          },
          {
            id: "PL-004",
            nama: "Nina Maulida",
            layanan: "Izin Usaha",
            tanggal: "2023-05-13",
            status: "Tertunda",
            petugas: "Eko Prasetyo",
          },
          {
            id: "PL-005",
            nama: "Dian Sastro",
            layanan: "Pembuatan KTP",
            tanggal: "2023-05-14",
            status: "Proses",
            petugas: "Budi Santoso",
          },
        ]

        // Simulasi delay database
        await new Promise((resolve) => setTimeout(resolve, 500))

        setPelayananData(mockData)
        // }
      } catch (error) {
        console.error("Error fetching pelayanan data:", error)
        toast({
          title: "Error",
          description: "Gagal memuat data pelayanan",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchPelayanan()
  }, [])

  const filteredData = pelayananData.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.layanan.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleViewDetail = (item: PelayananItem) => {
    setSelectedLayanan(item)
    setViewDialogOpen(true)
  }

  const handleEditStatus = (item: PelayananItem) => {
    toast({
      title: "Edit Status",
      description: `Mengubah status layanan ${item.id} - ${item.layanan}`,
    })
  }

  const handleCetakBukti = (item: PelayananItem) => {
    toast({
      title: "Cetak Bukti",
      description: `Mencetak bukti layanan ${item.id} - ${item.layanan}`,
    })
  }

  const handleExport = async () => {
    setIsExporting(true)
    try {
      // Simulasi proses ekspor
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Dalam aplikasi nyata, Anda akan menghasilkan dan mengunduh file di sini

      toast({
        title: "Data Diekspor",
        description: "Data layanan berhasil diekspor ke Excel.",
      })
    } catch (error) {
      console.error("Error exporting data:", error)
      toast({
        title: "Error",
        description: "Gagal mengekspor data",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Daftar Layanan</CardTitle>
              <CardDescription>Daftar permintaan layanan publik terbaru</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Cari layanan..."
                  className="w-[200px] pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" onClick={handleExport} disabled={isExporting}>
                {isExporting ? (
                  <>
                    <span className="animate-spin mr-2">⏳</span>
                    Mengekspor...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center items-center h-24">
              <p>Memuat data...</p>
            </div>
          ) : (
            <ResponsiveTableContainer>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nama</TableHead>
                    <TableHead>Jenis Layanan</TableHead>
                    <TableHead>Tanggal</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Petugas</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{item.id}</TableCell>
                      <TableCell>{item.nama}</TableCell>
                      <TableCell>{item.layanan}</TableCell>
                      <TableCell>{item.tanggal}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            item.status === "Selesai" ? "success" : item.status === "Proses" ? "default" : "destructive"
                          }
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{item.petugas}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Aksi</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleViewDetail(item)}>Lihat Detail</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEditStatus(item)}>Edit Status</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleCetakBukti(item)}>Cetak Bukti</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ResponsiveTableContainer>
          )}
        </CardContent>
      </Card>

      {/* Dialog Detail Layanan */}
      {selectedLayanan && (
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Detail Layanan</DialogTitle>
              <DialogDescription>Informasi lengkap tentang layanan.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">ID:</p>
                <p className="col-span-3">{selectedLayanan.id}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">Nama:</p>
                <p className="col-span-3">{selectedLayanan.nama}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">Layanan:</p>
                <p className="col-span-3">{selectedLayanan.layanan}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">Tanggal:</p>
                <p className="col-span-3">{selectedLayanan.tanggal}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">Status:</p>
                <div className="col-span-3">
                  <Badge
                    variant={
                      selectedLayanan.status === "Selesai"
                        ? "success"
                        : selectedLayanan.status === "Proses"
                          ? "default"
                          : "destructive"
                    }
                  >
                    {selectedLayanan.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">Petugas:</p>
                <p className="col-span-3">{selectedLayanan.petugas}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                Tutup
              </Button>
              <Button onClick={() => handleCetakBukti(selectedLayanan)}>
                <FileText className="mr-2 h-4 w-4" />
                Cetak Bukti
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
