"use client"

import { useState } from "react"
import { AnggaranOverview } from "@/components/anggaran/anggaran-overview"
import { AnggaranFilter } from "@/components/anggaran/anggaran-filter"
import { AnggaranTable } from "@/components/anggaran/anggaran-table"
import { AnggaranDistribusi } from "@/components/anggaran/anggaran-distribusi"
import { AnggaranDownload } from "@/components/anggaran/anggaran-download"
import { Button } from "@/components/ui/button"
import { Filter } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// Define the filter state type
export type FilterState = {
  tahun: string
  periode: string
  sektor: string
  wilayah: string
  kategori: string
  jumlahMin: number
  jumlahMax: number
}

// Sample data for demonstration
const initialFilterState: FilterState = {
  tahun: "2023",
  periode: "tahunan",
  sektor: "all",
  wilayah: "all",
  kategori: "all",
  jumlahMin: 0,
  jumlahMax: 500,
}

export default function AnggaranClient() {
  // State for filters
  const [filterState, setFilterState] = useState<FilterState>(initialFilterState)
  const [isFilterApplied, setIsFilterApplied] = useState(false)

  // Handler for filter changes
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...newFilters }))
  }

  // Handler for applying filters
  const handleApplyFilter = () => {
    setIsFilterApplied(true)
    // In a real app, this might trigger an API call or data refresh
  }

  // Handler for resetting filters
  const handleResetFilter = () => {
    setFilterState(initialFilterState)
    setIsFilterApplied(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard Anggaran Kota</h1>
          <p className="text-muted-foreground">
            Visualisasi data interaktif penggunaan anggaran kota dari tahun ke tahun
          </p>
        </div>
        <div className="flex gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline">
                <Filter className="mr-2 h-4 w-4" />
                Filter
                {isFilterApplied && <span className="ml-2 rounded-full bg-primary w-2 h-2" aria-hidden="true" />}
              </Button>
            </SheetTrigger>
            <SheetContent className="sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Filter Data Anggaran</SheetTitle>
                <SheetDescription>Sesuaikan filter untuk melihat data anggaran yang spesifik</SheetDescription>
              </SheetHeader>
              <div className="mt-4">
                <AnggaranFilter
                  filterState={filterState}
                  onFilterChange={handleFilterChange}
                  onApplyFilter={handleApplyFilter}
                  onResetFilter={handleResetFilter}
                />
              </div>
            </SheetContent>
          </Sheet>
          <AnggaranDownload filterState={filterState} />
        </div>
      </div>

      {/* Display applied filters summary if any */}
      {isFilterApplied && (
        <div className="bg-muted/50 p-3 rounded-lg text-sm">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-2">
              <span className="font-medium">Filter aktif:</span>
              {filterState.tahun !== "all" && (
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md">Tahun: {filterState.tahun}</span>
              )}
              {filterState.periode !== "all" && (
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md">
                  Periode: {filterState.periode === "tahunan" ? "Tahunan" : "Triwulan"}
                </span>
              )}
              {filterState.sektor !== "all" && (
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md">Sektor: {filterState.sektor}</span>
              )}
              {filterState.wilayah !== "all" && (
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md">
                  Wilayah: {filterState.wilayah}
                </span>
              )}
              {filterState.kategori !== "all" && (
                <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md">
                  Kategori: {filterState.kategori}
                </span>
              )}
              <span className="bg-primary/10 text-primary px-2 py-0.5 rounded-md">
                Jumlah: Rp {filterState.jumlahMin}M - Rp {filterState.jumlahMax}M
              </span>
            </div>
            <Button variant="ghost" size="sm" onClick={handleResetFilter}>
              Reset
            </Button>
          </div>
        </div>
      )}

      <AnggaranOverview filterState={filterState} />
      <AnggaranDistribusi filterState={filterState} />
      <AnggaranTable filterState={filterState} />
    </div>
  )
}
