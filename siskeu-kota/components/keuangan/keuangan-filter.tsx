"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DatePicker } from "@/components/ui/date-picker"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, X } from "lucide-react"

export function KeuanganFilter() {
  const [showFilters, setShowFilters] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [kategori, setKategori] = useState("")
  const [status, setStatus] = useState("")
  const [tahun, setTahun] = useState("")
  const [startDate, setStartDate] = useState<Date | undefined>(undefined)
  const [endDate, setEndDate] = useState<Date | undefined>(undefined)

  const handleReset = () => {
    setSearchQuery("")
    setKategori("")
    setStatus("")
    setTahun("")
    setStartDate(undefined)
    setEndDate(undefined)
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Cari transaksi..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)} className="sm:w-auto w-full">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </div>

      {showFilters && (
        <Card>
          <CardContent className="pt-6">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
              <div className="grid gap-2">
                <Label htmlFor="kategori">Kategori</Label>
                <Select value={kategori} onValueChange={setKategori}>
                  <SelectTrigger id="kategori">
                    <SelectValue placeholder="Semua kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua kategori</SelectItem>
                    <SelectItem value="Dana Desa">Dana Desa</SelectItem>
                    <SelectItem value="PAD">PAD</SelectItem>
                    <SelectItem value="Bantuan">Bantuan</SelectItem>
                    <SelectItem value="Infrastruktur">Infrastruktur</SelectItem>
                    <SelectItem value="Pendidikan">Pendidikan</SelectItem>
                    <SelectItem value="Kesehatan">Kesehatan</SelectItem>
                    <SelectItem value="Administrasi">Administrasi</SelectItem>
                    <SelectItem value="Lainnya">Lainnya</SelectItem>
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
                    <SelectItem value="semua">Semua status</SelectItem>
                    <SelectItem value="pendapatan">Pendapatan</SelectItem>
                    <SelectItem value="pengeluaran">Pengeluaran</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tahun">Tahun</Label>
                <Select value={tahun} onValueChange={setTahun}>
                  <SelectTrigger id="tahun">
                    <SelectValue placeholder="Semua tahun" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="semua">Semua tahun</SelectItem>
                    <SelectItem value="2023">2023</SelectItem>
                    <SelectItem value="2022">2022</SelectItem>
                    <SelectItem value="2021">2021</SelectItem>
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
              <Button>
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
