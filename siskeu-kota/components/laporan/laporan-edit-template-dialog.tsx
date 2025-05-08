"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

interface LaporanEditTemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  template: any
}

export function LaporanEditTemplateDialog({ open, onOpenChange, template }: LaporanEditTemplateDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulasi API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Template disimpan",
      description: `Template ${template.title} telah berhasil diperbarui.`,
    })

    setIsLoading(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>Edit Template</DialogTitle>
          <DialogDescription>Edit template laporan "{template.title}".</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">Umum</TabsTrigger>
              <TabsTrigger value="structure">Struktur</TabsTrigger>
              <TabsTrigger value="data">Sumber Data</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Judul Template
                  </Label>
                  <Input id="title" defaultValue={template.title} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Deskripsi
                  </Label>
                  <Textarea id="description" defaultValue={template.description} className="col-span-3" rows={3} />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label className="text-right pt-2">Format</Label>
                  <div className="col-span-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="pdf" defaultChecked={template.format.includes("PDF")} />
                      <Label htmlFor="pdf">PDF</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="excel" defaultChecked={template.format.includes("Excel")} />
                      <Label htmlFor="excel">Excel</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="word" defaultChecked={template.format.includes("Word")} />
                      <Label htmlFor="word">Word</Label>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="file" className="text-right">
                    Unggah File Baru
                  </Label>
                  <Input id="file" type="file" className="col-span-3" />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="structure" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="header" className="text-right pt-2">
                    Header
                  </Label>
                  <Textarea
                    id="header"
                    defaultValue="Logo, judul laporan, dan periode laporan"
                    className="col-span-3"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="summary" className="text-right pt-2">
                    Ringkasan Eksekutif
                  </Label>
                  <Textarea
                    id="summary"
                    defaultValue="Berisi ringkasan utama dari laporan keuangan"
                    className="col-span-3"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="table" className="text-right pt-2">
                    Tabel Data
                  </Label>
                  <Textarea
                    id="table"
                    defaultValue="Menampilkan data keuangan dalam format tabel"
                    className="col-span-3"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="chart" className="text-right pt-2">
                    Grafik
                  </Label>
                  <Textarea
                    id="chart"
                    defaultValue="Visualisasi data dalam bentuk grafik dan diagram"
                    className="col-span-3"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="analysis" className="text-right pt-2">
                    Analisis
                  </Label>
                  <Textarea
                    id="analysis"
                    defaultValue="Analisis dan interpretasi data keuangan"
                    className="col-span-3"
                    rows={2}
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="footer" className="text-right pt-2">
                    Footer
                  </Label>
                  <Textarea
                    id="footer"
                    defaultValue="Berisi informasi kontak dan tanggal pembuatan laporan"
                    className="col-span-3"
                    rows={2}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="data" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="anggaran" className="text-right pt-2">
                    Tabel Anggaran
                  </Label>
                  <div className="col-span-3 space-y-2">
                    <Input id="anggaran-table" defaultValue="anggaran_kota" />
                    <Textarea
                      id="anggaran-query"
                      defaultValue="SELECT * FROM anggaran_kota WHERE periode = :periode"
                      className="font-mono text-xs"
                      rows={2}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="realisasi" className="text-right pt-2">
                    Tabel Realisasi
                  </Label>
                  <div className="col-span-3 space-y-2">
                    <Input id="realisasi-table" defaultValue="realisasi_anggaran" />
                    <Textarea
                      id="realisasi-query"
                      defaultValue="SELECT * FROM realisasi_anggaran WHERE periode = :periode"
                      className="font-mono text-xs"
                      rows={2}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="pendapatan" className="text-right pt-2">
                    Tabel Pendapatan
                  </Label>
                  <div className="col-span-3 space-y-2">
                    <Input id="pendapatan-table" defaultValue="pendapatan_daerah" />
                    <Textarea
                      id="pendapatan-query"
                      defaultValue="SELECT * FROM pendapatan_daerah WHERE periode = :periode"
                      className="font-mono text-xs"
                      rows={2}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="belanja" className="text-right pt-2">
                    Tabel Belanja
                  </Label>
                  <div className="col-span-3 space-y-2">
                    <Input id="belanja-table" defaultValue="belanja_daerah" />
                    <Textarea
                      id="belanja-query"
                      defaultValue="SELECT * FROM belanja_daerah WHERE periode = :periode"
                      className="font-mono text-xs"
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan Template"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
