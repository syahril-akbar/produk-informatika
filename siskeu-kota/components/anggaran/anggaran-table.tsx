"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
  getFilteredRowModel,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpDown, Search, ChevronLeft, ChevronRight } from "lucide-react"
import type { FilterState } from "@/app/dashboard/anggaran/page"
import { Badge } from "@/components/ui/badge"
import { ResponsiveTableContainer } from "@/components/ui/responsive-table-container"

type AnggaranItem = {
  id: string
  tahun: string
  sektor: string
  program: string
  wilayah: string
  kategori: string
  anggaran: number
  realisasi: number
  persentase: number
  status: "dianggarkan" | "direalisasi" | "direvisi" | "dibatalkan"
}

// Extended sample data with more fields
const sampleData: AnggaranItem[] = [
  {
    id: "1",
    tahun: "2023",
    sektor: "Pendidikan",
    program: "Pembangunan Sekolah",
    wilayah: "Kecamatan A",
    kategori: "Belanja Modal",
    anggaran: 120,
    realisasi: 100,
    persentase: 83.33,
    status: "direalisasi",
  },
  {
    id: "2",
    tahun: "2023",
    sektor: "Kesehatan",
    program: "Pengadaan Alat Kesehatan",
    wilayah: "Kecamatan B",
    kategori: "Belanja Barang",
    anggaran: 80,
    realisasi: 75,
    persentase: 93.75,
    status: "direalisasi",
  },
  {
    id: "3",
    tahun: "2023",
    sektor: "Infrastruktur",
    program: "Perbaikan Jalan",
    wilayah: "Kecamatan C",
    kategori: "Belanja Modal",
    anggaran: 150,
    realisasi: 130,
    persentase: 86.67,
    status: "direalisasi",
  },
  {
    id: "4",
    tahun: "2023",
    sektor: "Sosial",
    program: "Bantuan Sosial",
    wilayah: "Kecamatan D",
    kategori: "Belanja Bantuan",
    anggaran: 90,
    realisasi: 85,
    persentase: 94.44,
    status: "direalisasi",
  },
  {
    id: "5",
    tahun: "2023",
    sektor: "Ekonomi",
    program: "Pemberdayaan UMKM",
    wilayah: "Kecamatan E",
    kategori: "Belanja Hibah",
    anggaran: 70,
    realisasi: 60,
    persentase: 85.71,
    status: "direalisasi",
  },
  {
    id: "6",
    tahun: "2023",
    sektor: "Administrasi",
    program: "Digitalisasi Pelayanan",
    wilayah: "Kecamatan F",
    kategori: "Belanja Barang",
    anggaran: 50,
    realisasi: 45,
    persentase: 90.0,
    status: "direalisasi",
  },
  {
    id: "7",
    tahun: "2023",
    sektor: "Pendidikan",
    program: "Beasiswa Pendidikan",
    wilayah: "Kecamatan A",
    kategori: "Belanja Bantuan",
    anggaran: 60,
    realisasi: 55,
    persentase: 91.67,
    status: "direalisasi",
  },
  {
    id: "8",
    tahun: "2023",
    sektor: "Kesehatan",
    program: "Penyuluhan Kesehatan",
    wilayah: "Kecamatan B",
    kategori: "Belanja Barang",
    anggaran: 40,
    realisasi: 35,
    persentase: 87.5,
    status: "direalisasi",
  },
  {
    id: "9",
    tahun: "2022",
    sektor: "Infrastruktur",
    program: "Pembangunan Taman Kota",
    wilayah: "Kecamatan C",
    kategori: "Belanja Modal",
    anggaran: 80,
    realisasi: 70,
    persentase: 87.5,
    status: "direalisasi",
  },
  {
    id: "10",
    tahun: "2022",
    sektor: "Sosial",
    program: "Pelatihan Keterampilan",
    wilayah: "Kecamatan D",
    kategori: "Belanja Lain",
    anggaran: 45,
    realisasi: 40,
    persentase: 88.89,
    status: "direalisasi",
  },
  {
    id: "11",
    tahun: "2022",
    sektor: "Ekonomi",
    program: "Bantuan Modal Usaha",
    wilayah: "Kecamatan E",
    kategori: "Belanja Hibah",
    anggaran: 65,
    realisasi: 60,
    persentase: 92.31,
    status: "direalisasi",
  },
  {
    id: "12",
    tahun: "2022",
    sektor: "Administrasi",
    program: "Pelatihan Aparatur",
    wilayah: "Kecamatan F",
    kategori: "Belanja Pegawai",
    anggaran: 35,
    realisasi: 32,
    persentase: 91.43,
    status: "direalisasi",
  },
  {
    id: "13",
    tahun: "2021",
    sektor: "Pendidikan",
    program: "Renovasi Sekolah",
    wilayah: "Kecamatan A",
    kategori: "Belanja Modal",
    anggaran: 110,
    realisasi: 100,
    persentase: 90.91,
    status: "direalisasi",
  },
  {
    id: "14",
    tahun: "2021",
    sektor: "Kesehatan",
    program: "Vaksinasi Massal",
    wilayah: "Kecamatan B",
    kategori: "Belanja Barang",
    anggaran: 75,
    realisasi: 70,
    persentase: 93.33,
    status: "direalisasi",
  },
  {
    id: "15",
    tahun: "2021",
    sektor: "Infrastruktur",
    program: "Perbaikan Drainase",
    wilayah: "Kecamatan C",
    kategori: "Belanja Modal",
    anggaran: 95,
    realisasi: 90,
    persentase: 94.74,
    status: "direalisasi",
  },
]

interface AnggaranTableProps {
  filterState: FilterState
}

export function AnggaranTable({ filterState }: AnggaranTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredData, setFilteredData] = useState<AnggaranItem[]>(sampleData)
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  // Apply filters when filterState changes
  useEffect(() => {
    let result = [...sampleData]

    // Apply year filter
    if (filterState.tahun !== "all") {
      result = result.filter((item) => item.tahun === filterState.tahun)
    }

    // Apply sector filter
    if (filterState.sektor !== "all") {
      result = result.filter((item) => item.sektor.toLowerCase() === filterState.sektor.toLowerCase())
    }

    // Apply region filter
    if (filterState.wilayah !== "all") {
      result = result.filter((item) => {
        const region = filterState.wilayah.replace("kecamatan_", "Kecamatan ")
        return item.wilayah === region
      })
    }

    // Apply category filter
    if (filterState.kategori !== "all") {
      result = result.filter((item) => {
        const category = filterState.kategori.replace("belanja_", "Belanja ")
        return item.kategori === category
      })
    }

    // Apply amount filter
    result = result.filter((item) => item.anggaran >= filterState.jumlahMin && item.anggaran <= filterState.jumlahMax)

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (item) =>
          item.program.toLowerCase().includes(query) ||
          item.sektor.toLowerCase().includes(query) ||
          item.wilayah.toLowerCase().includes(query) ||
          item.kategori.toLowerCase().includes(query),
      )
    }

    setFilteredData(result)
    setPagination((prev) => ({ ...prev, pageIndex: 0 })) // Reset to first page when filters change
  }, [filterState, searchQuery])

  const columns: ColumnDef<AnggaranItem>[] = [
    {
      accessorKey: "tahun",
      header: "Tahun",
      cell: ({ row }) => <div>{row.getValue("tahun")}</div>,
    },
    {
      accessorKey: "sektor",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Sektor
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{row.getValue("sektor")}</div>,
    },
    {
      accessorKey: "program",
      header: "Program",
      cell: ({ row }) => <div className="font-medium">{row.getValue("program")}</div>,
    },
    {
      accessorKey: "wilayah",
      header: "Wilayah",
      cell: ({ row }) => <div>{row.getValue("wilayah")}</div>,
    },
    {
      accessorKey: "kategori",
      header: "Kategori",
      cell: ({ row }) => <div>{row.getValue("kategori")}</div>,
    },
    {
      accessorKey: "anggaran",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Anggaran
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("anggaran"))
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(amount * 1000000000)
        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "realisasi",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Realisasi
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const amount = Number.parseFloat(row.getValue("realisasi"))
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
          maximumFractionDigits: 0,
        }).format(amount * 1000000000)
        return <div className="text-right font-medium">{formatted}</div>
      },
    },
    {
      accessorKey: "persentase",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Persentase
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const percentage = Number.parseFloat(row.getValue("persentase"))
        let badgeVariant = "default"

        if (percentage >= 90) badgeVariant = "success"
        else if (percentage >= 70) badgeVariant = "warning"
        else badgeVariant = "destructive"

        return (
          <div className="text-right">
            <Badge variant={badgeVariant as any}>{percentage.toFixed(2)}%</Badge>
          </div>
        )
      },
    },
  ]

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      pagination,
    },
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Detail Anggaran dan Realisasi</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari program, sektor..."
                className="pl-8 w-[200px] md:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveTableContainer>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      Tidak ada data yang sesuai dengan filter
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </ResponsiveTableContainer>
        <div className="flex items-center justify-between space-x-2 py-4">
          <div className="text-sm text-muted-foreground">
            Menampilkan{" "}
            {table.getFilteredRowModel().rows.length > 0
              ? `${table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-${Math.min(
                  (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                  table.getFilteredRowModel().rows.length,
                )}`
              : "0"}{" "}
            dari {table.getFilteredRowModel().rows.length} data
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Sebelumnya
            </Button>
            <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
              Selanjutnya
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
