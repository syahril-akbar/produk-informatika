"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Download, FileSpreadsheet, FileText } from "lucide-react"
import type { FilterState } from "./anggaran-client"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface AnggaranDownloadProps {
  filterState: FilterState
}

export function AnggaranDownload({ filterState }: AnggaranDownloadProps) {
  const [format, setFormat] = useState<string>("csv")
  const [isDownloading, setIsDownloading] = useState(false)
  const [selectedColumns, setSelectedColumns] = useState({
    id: true,
    nama: true,
    kategori: true,
    sektor: true,
    wilayah: true,
    jumlah: true,
    tanggal: true,
    status: true,
  })

  const handleColumnToggle = (column: string) => {
    setSelectedColumns((prev) => ({
      ...prev,
      [column]: !prev[column as keyof typeof selectedColumns],
    }))
  }

  const handleDownload = () => {
    setIsDownloading(true)

    // Simulate download process
    setTimeout(() => {
      setIsDownloading(false)

      // Create a mock CSV/Excel file download
      const element = document.createElement("a")
      const fileName = `anggaran_kota_${filterState.tahun}_${new Date().toISOString().split("T")[0]}.${format}`

      element.setAttribute("href", "#")
      element.setAttribute("download", fileName)
      element.style.display = "none"

      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)

      // In a real app, you would generate the file server-side or use a library
    }, 1500)
  }

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button>
                <Download className="mr-2 h-4 w-4" />
                Unduh Data
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Unduh data anggaran dalam format CSV atau Excel</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Unduh Data Anggaran</DialogTitle>
          <DialogDescription>Pilih format dan kolom yang ingin diunduh</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label>Format File</Label>
            <RadioGroup value={format} onValueChange={setFormat} className="flex flex-col space-y-1 mt-1">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="csv" id="csv" />
                <Label htmlFor="csv" className="flex items-center cursor-pointer">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  CSV
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="xlsx" id="xlsx" />
                <Label htmlFor="xlsx" className="flex items-center cursor-pointer">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Excel
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pdf" id="pdf" />
                <Label htmlFor="pdf" className="flex items-center cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" />
                  PDF
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Kolom yang Diunduh</Label>
            <div className="grid grid-cols-2 gap-2 mt-1">
              <div className="flex items-center space-x-2">
                <Checkbox id="col-id" checked={selectedColumns.id} onCheckedChange={() => handleColumnToggle("id")} />
                <Label htmlFor="col-id" className="cursor-pointer">
                  ID
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="col-nama"
                  checked={selectedColumns.nama}
                  onCheckedChange={() => handleColumnToggle("nama")}
                />
                <Label htmlFor="col-nama" className="cursor-pointer">
                  Nama
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="col-kategori"
                  checked={selectedColumns.kategori}
                  onCheckedChange={() => handleColumnToggle("kategori")}
                />
                <Label htmlFor="col-kategori" className="cursor-pointer">
                  Kategori
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="col-sektor"
                  checked={selectedColumns.sektor}
                  onCheckedChange={() => handleColumnToggle("sektor")}
                />
                <Label htmlFor="col-sektor" className="cursor-pointer">
                  Sektor
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="col-wilayah"
                  checked={selectedColumns.wilayah}
                  onCheckedChange={() => handleColumnToggle("wilayah")}
                />
                <Label htmlFor="col-wilayah" className="cursor-pointer">
                  Wilayah
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="col-jumlah"
                  checked={selectedColumns.jumlah}
                  onCheckedChange={() => handleColumnToggle("jumlah")}
                />
                <Label htmlFor="col-jumlah" className="cursor-pointer">
                  Jumlah
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="col-tanggal"
                  checked={selectedColumns.tanggal}
                  onCheckedChange={() => handleColumnToggle("tanggal")}
                />
                <Label htmlFor="col-tanggal" className="cursor-pointer">
                  Tanggal
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="col-status"
                  checked={selectedColumns.status}
                  onCheckedChange={() => handleColumnToggle("status")}
                />
                <Label htmlFor="col-status" className="cursor-pointer">
                  Status
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <Label>Opsi Tambahan</Label>
            <div className="flex items-center space-x-2 mt-1">
              <Checkbox id="filter-only" defaultChecked />
              <Label htmlFor="filter-only" className="cursor-pointer">
                Hanya data terfilter
              </Label>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleDownload} disabled={isDownloading || Object.values(selectedColumns).every((v) => !v)}>
            {isDownloading ? "Mengunduh..." : "Unduh"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
