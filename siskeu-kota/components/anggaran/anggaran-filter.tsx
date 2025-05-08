"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import type { FilterState } from "./anggaran-client"

interface AnggaranFilterProps {
  filterState: FilterState
  onFilterChange: (newFilters: Partial<FilterState>) => void
  onApplyFilter: () => void
  onResetFilter: () => void
}

export function AnggaranFilter({ filterState, onFilterChange, onApplyFilter, onResetFilter }: AnggaranFilterProps) {
  const [localFilterState, setLocalFilterState] = useState<FilterState>(filterState)

  // Update local state when props change
  useState(() => {
    setLocalFilterState(filterState)
  })

  const handleLocalChange = (newFilters: Partial<FilterState>) => {
    setLocalFilterState((prev) => ({ ...prev, ...newFilters }))
  }

  const handleApply = () => {
    onFilterChange(localFilterState)
    onApplyFilter()
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="tahun">Tahun Anggaran</Label>
          <Select value={localFilterState.tahun} onValueChange={(value) => handleLocalChange({ tahun: value })}>
            <SelectTrigger id="tahun" className="w-full mt-1">
              <SelectValue placeholder="Pilih Tahun" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2023">2023</SelectItem>
              <SelectItem value="2022">2022</SelectItem>
              <SelectItem value="2021">2021</SelectItem>
              <SelectItem value="2020">2020</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Periode</Label>
          <RadioGroup
            value={localFilterState.periode}
            onValueChange={(value) => handleLocalChange({ periode: value })}
            className="flex flex-col space-y-1 mt-1"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="tahunan" id="tahunan" />
              <Label htmlFor="tahunan" className="cursor-pointer">
                Tahunan
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="triwulan" id="triwulan" />
              <Label htmlFor="triwulan" className="cursor-pointer">
                Triwulan
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="bulanan" id="bulanan" />
              <Label htmlFor="bulanan" className="cursor-pointer">
                Bulanan
              </Label>
            </div>
          </RadioGroup>
        </div>

        <div>
          <Label htmlFor="sektor">Sektor</Label>
          <Select value={localFilterState.sektor} onValueChange={(value) => handleLocalChange({ sektor: value })}>
            <SelectTrigger id="sektor" className="w-full mt-1">
              <SelectValue placeholder="Pilih Sektor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Sektor</SelectItem>
              <SelectItem value="pendidikan">Pendidikan</SelectItem>
              <SelectItem value="kesehatan">Kesehatan</SelectItem>
              <SelectItem value="infrastruktur">Infrastruktur</SelectItem>
              <SelectItem value="sosial">Sosial</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="wilayah">Wilayah</Label>
          <Select value={localFilterState.wilayah} onValueChange={(value) => handleLocalChange({ wilayah: value })}>
            <SelectTrigger id="wilayah" className="w-full mt-1">
              <SelectValue placeholder="Pilih Wilayah" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Wilayah</SelectItem>
              <SelectItem value="utara">Kota Utara</SelectItem>
              <SelectItem value="selatan">Kota Selatan</SelectItem>
              <SelectItem value="timur">Kota Timur</SelectItem>
              <SelectItem value="barat">Kota Barat</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label htmlFor="kategori">Kategori Anggaran</Label>
          <Select value={localFilterState.kategori} onValueChange={(value) => handleLocalChange({ kategori: value })}>
            <SelectTrigger id="kategori" className="w-full mt-1">
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua Kategori</SelectItem>
              <SelectItem value="belanja">Belanja</SelectItem>
              <SelectItem value="pendapatan">Pendapatan</SelectItem>
              <SelectItem value="pembiayaan">Pembiayaan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Jumlah (dalam Miliar Rupiah)</Label>
            <span className="text-sm text-muted-foreground">
              Rp {localFilterState.jumlahMin}M - Rp {localFilterState.jumlahMax}M
            </span>
          </div>
          <Slider
            defaultValue={[localFilterState.jumlahMin, localFilterState.jumlahMax]}
            max={1000}
            step={10}
            onValueChange={(values) => {
              handleLocalChange({
                jumlahMin: values[0],
                jumlahMax: values[1],
              })
            }}
            className="mt-2"
          />
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button variant="outline" onClick={onResetFilter}>
          Reset
        </Button>
        <Button onClick={handleApply}>Terapkan Filter</Button>
      </div>
    </div>
  )
}
