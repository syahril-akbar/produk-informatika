"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Edit } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

interface LaporanViewTemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  template: any
  onEdit: () => void
}

export function LaporanViewTemplateDialog({ open, onOpenChange, template, onEdit }: LaporanViewTemplateDialogProps) {
  const handleDownload = (format: string) => {
    toast({
      title: "Template diunduh",
      description: `Template ${template.title} dalam format ${format} telah berhasil diunduh.`,
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Pratinjau Template</DialogTitle>
          <DialogDescription>Pratinjau template laporan "{template.title}".</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview">Pratinjau</TabsTrigger>
            <TabsTrigger value="structure">Struktur</TabsTrigger>
            <TabsTrigger value="data">Sumber Data</TabsTrigger>
          </TabsList>
          <TabsContent value="preview" className="space-y-4 py-4">
            <div className="border rounded-md p-4 h-[400px] overflow-auto bg-white">
              <div className="flex justify-center items-center h-full">
                <div className="text-center">
                  <FileText className="h-16 w-16 mx-auto text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">{template.title}</h3>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                  <p className="mt-2 text-sm">Format: {template.format.join(", ")}</p>
                  <p className="text-sm">Terakhir diperbarui: {template.lastUpdated}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              {template.format.includes("PDF") && (
                <Button variant="outline" size="sm" onClick={() => handleDownload("PDF")}>
                  <Download className="mr-2 h-4 w-4" />
                  Unduh PDF
                </Button>
              )}
              {template.format.includes("Excel") && (
                <Button variant="outline" size="sm" onClick={() => handleDownload("Excel")}>
                  <Download className="mr-2 h-4 w-4" />
                  Unduh Excel
                </Button>
              )}
              {template.format.includes("Word") && (
                <Button variant="outline" size="sm" onClick={() => handleDownload("Word")}>
                  <Download className="mr-2 h-4 w-4" />
                  Unduh Word
                </Button>
              )}
            </div>
          </TabsContent>
          <TabsContent value="structure" className="space-y-4 py-4">
            <div className="border rounded-md p-4 h-[400px] overflow-auto">
              <h3 className="text-lg font-medium mb-4">Struktur Template</h3>
              <div className="space-y-4">
                <div className="p-2 border rounded-md">
                  <h4 className="font-medium">Header</h4>
                  <p className="text-sm text-muted-foreground">
                    Bagian header berisi logo, judul laporan, dan periode laporan.
                  </p>
                </div>
                <div className="p-2 border rounded-md">
                  <h4 className="font-medium">Ringkasan Eksekutif</h4>
                  <p className="text-sm text-muted-foreground">Berisi ringkasan utama dari laporan keuangan.</p>
                </div>
                <div className="p-2 border rounded-md">
                  <h4 className="font-medium">Tabel Data</h4>
                  <p className="text-sm text-muted-foreground">Menampilkan data keuangan dalam format tabel.</p>
                </div>
                <div className="p-2 border rounded-md">
                  <h4 className="font-medium">Grafik</h4>
                  <p className="text-sm text-muted-foreground">Visualisasi data dalam bentuk grafik dan diagram.</p>
                </div>
                <div className="p-2 border rounded-md">
                  <h4 className="font-medium">Analisis</h4>
                  <p className="text-sm text-muted-foreground">Analisis dan interpretasi data keuangan.</p>
                </div>
                <div className="p-2 border rounded-md">
                  <h4 className="font-medium">Footer</h4>
                  <p className="text-sm text-muted-foreground">
                    Berisi informasi kontak dan tanggal pembuatan laporan.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="data" className="space-y-4 py-4">
            <div className="border rounded-md p-4 h-[400px] overflow-auto">
              <h3 className="text-lg font-medium mb-4">Sumber Data</h3>
              <div className="space-y-4">
                <div className="p-2 border rounded-md">
                  <h4 className="font-medium">Tabel Anggaran</h4>
                  <p className="text-sm text-muted-foreground">Data anggaran dari tabel anggaran_kota.</p>
                  <code className="text-xs block mt-2 p-2 bg-muted">
                    SELECT * FROM anggaran_kota WHERE periode = :periode
                  </code>
                </div>
                <div className="p-2 border rounded-md">
                  <h4 className="font-medium">Tabel Realisasi</h4>
                  <p className="text-sm text-muted-foreground">
                    Data realisasi anggaran dari tabel realisasi_anggaran.
                  </p>
                  <code className="text-xs block mt-2 p-2 bg-muted">
                    SELECT * FROM realisasi_anggaran WHERE periode = :periode
                  </code>
                </div>
                <div className="p-2 border rounded-md">
                  <h4 className="font-medium">Tabel Pendapatan</h4>
                  <p className="text-sm text-muted-foreground">Data pendapatan dari tabel pendapatan_daerah.</p>
                  <code className="text-xs block mt-2 p-2 bg-muted">
                    SELECT * FROM pendapatan_daerah WHERE periode = :periode
                  </code>
                </div>
                <div className="p-2 border rounded-md">
                  <h4 className="font-medium">Tabel Belanja</h4>
                  <p className="text-sm text-muted-foreground">Data belanja dari tabel belanja_daerah.</p>
                  <code className="text-xs block mt-2 p-2 bg-muted">
                    SELECT * FROM belanja_daerah WHERE periode = :periode
                  </code>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Tutup
          </Button>
          <Button onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Template
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
