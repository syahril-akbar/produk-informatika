"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function AdministrasiFilter() {
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [kategori, setKategori] = useState("")
  const [status, setStatus] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  const handleReset = () => {
    setSearchQuery("")
    setKategori("")
    setStatus("")
    setStartDate(undefined)
    setEndDate(undefined)
    toast({
      title: "Filter direset",
      description: "Semua filter telah direset ke nilai default.",
    })
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      toast({
        title: "Pencarian dokumen",
        description: `Mencari dokumen: ${searchQuery}`,
      })
    }
  }

  const handleApplyFilter = () => {
    toast({
      title: "Filter diterapkan",
      description: "Filter telah diterapkan pada data dokumen.",
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <form className="relative flex-1" onSubmit={handleSearch}>
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari dokumen..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="sm:w-auto w-full">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="grid gap-2">
                <Label htmlFor="kategori">Kategori</Label>
                <Select value={kategori} onValueChange={setKategori}>
                  <SelectTrigger id="kategori">
                    <SelectValue placeholder="Semua kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua kategori</SelectItem>
                    <SelectItem value="surat_keputusan">Surat Keputusan</SelectItem>
                    <SelectItem value="peraturan_desa">Peraturan Desa</SelectItem>
                    <SelectItem value="surat_keterangan">Surat Keterangan</SelectItem>
                    <SelectItem value="laporan">Laporan</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Semua status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua status</SelectItem>
                    <SelectItem value="aktif">Aktif</SelectItem>
                    <SelectItem value="kadaluarsa">Kadaluarsa</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label>Tanggal Mulai</Label>
                <DatePicker date={startDate} setDate={setStartDate} />
              </div>
              <div className="grid gap-2">
                <Label>Tanggal Akhir</Label>
                <DatePicker date={endDate} setDate={setEndDate} />
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={handleReset}>
                <X className="mr-2 h-4 w-4" />
                Reset
              </Button>
              <Button onClick={handleApplyFilter}>
                <Search className="mr-2 h-4 w-4" />
                Terapkan Filter
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
