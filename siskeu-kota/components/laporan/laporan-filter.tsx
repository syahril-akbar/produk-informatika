"use client"

import { useState, useId } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"

export function LaporanFilter() {
  const [year, setYear] = useState("2023")
  const [period, setPeriod] = useState("all")
  const [type, setType] = useState("all")
  const [status, setStatus] = useState("all")

  // Generate stable IDs for form elements
  const yearId = useId()
  const periodId = useId()
  const typeId = useId()
  const statusId = useId()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter Laporan</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <label htmlFor={yearId} className="text-sm font-medium">
              Tahun
            </label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger id={yearId}>
                <SelectValue placeholder="Pilih tahun" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
                <SelectItem value="2019">2019</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor={periodId} className="text-sm font-medium">
              Periode
            </label>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger id={periodId}>
                <SelectValue placeholder="Pilih periode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Periode</SelectItem>
                <SelectItem value="monthly">Bulanan</SelectItem>
                <SelectItem value="quarterly">Triwulan</SelectItem>
                <SelectItem value="semester">Semester</SelectItem>
                <SelectItem value="yearly">Tahunan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor={typeId} className="text-sm font-medium">
              Jenis Laporan
            </label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger id={typeId}>
                <SelectValue placeholder="Pilih jenis" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Jenis</SelectItem>
                <SelectItem value="financial">Laporan Keuangan</SelectItem>
                <SelectItem value="realization">Realisasi Anggaran</SelectItem>
                <SelectItem value="performance">Kinerja Anggaran</SelectItem>
                <SelectItem value="income">Pendapatan Daerah</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor={statusId} className="text-sm font-medium">
              Status
            </label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger id={statusId}>
                <SelectValue placeholder="Pilih status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Status</SelectItem>
                <SelectItem value="published">Terpublikasi</SelectItem>
                <SelectItem value="pending">Tertunda</SelectItem>
                <SelectItem value="issue">Bermasalah</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline">Reset</Button>
          <Button>
            <Filter className="mr-2 h-4 w-4" />
            Terapkan Filter
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
