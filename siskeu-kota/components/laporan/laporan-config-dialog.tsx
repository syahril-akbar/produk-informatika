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
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

interface LaporanConfigDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  report: any
}

export function LaporanConfigDialog({ open, onOpenChange, report }: LaporanConfigDialogProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulasi API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Konfigurasi disimpan",
      description: `Konfigurasi untuk laporan "${report.title}" telah berhasil disimpan.`,
    })

    setIsLoading(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Konfigurasi Laporan</DialogTitle>
          <DialogDescription>Atur konfigurasi untuk laporan "{report.title}".</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">Umum</TabsTrigger>
              <TabsTrigger value="schedule">Jadwal</TabsTrigger>
              <TabsTrigger value="publish">Publikasi</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="title" className="text-right">
                    Judul Laporan
                  </Label>
                  <Input id="title" defaultValue={report.title} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Deskripsi
                  </Label>
                  <Input id="description" defaultValue={report.description} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="status" className="text-right">
                    Status
                  </Label>
                  <div className="col-span-3">
                    <Switch id="status" defaultChecked={report.status === "active"} />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notification" className="text-right">
                    Notifikasi
                  </Label>
                  <div className="col-span-3">
                    <Switch id="notification" defaultChecked />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="schedule" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="schedule-type" className="text-right">
                    Tipe Jadwal
                  </Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih tipe jadwal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Harian</SelectItem>
                      <SelectItem value="weekly">Mingguan</SelectItem>
                      <SelectItem value="monthly">Bulanan</SelectItem>
                      <SelectItem value="quarterly">Triwulanan</SelectItem>
                      <SelectItem value="yearly">Tahunan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="day" className="text-right">
                    Hari
                  </Label>
                  <Select defaultValue="last">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih hari" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first">Pertama</SelectItem>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="last">Terakhir</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Waktu
                  </Label>
                  <Input id="time" type="time" defaultValue="23:59" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="retry" className="text-right">
                    Coba Ulang
                  </Label>
                  <div className="col-span-3">
                    <Switch id="retry" defaultChecked />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="publish" className="space-y-4 py-4">
              <div className="space-y-4">
                <h4 className="text-sm font-medium">Publikasikan ke</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="website" defaultChecked={report.publishTo.includes("Website Kota")} />
                    <Label htmlFor="website">Website Resmi Kota</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="portal" defaultChecked={report.publishTo.includes("Portal Data")} />
                    <Label htmlFor="portal">Portal Data Kota</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="keuangan" defaultChecked={report.publishTo.includes("Sistem Keuangan Pusat")} />
                    <Label htmlFor="keuangan">Sistem Keuangan Pusat</Label>
                  </div>
                </div>

                <h4 className="text-sm font-medium mt-6">Format Publikasi</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="pdf" defaultChecked />
                    <Label htmlFor="pdf">PDF</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="excel" defaultChecked />
                    <Label htmlFor="excel">Excel</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="web" defaultChecked />
                    <Label htmlFor="web">Web (HTML)</Label>
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
              {isLoading ? "Menyimpan..." : "Simpan Konfigurasi"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
