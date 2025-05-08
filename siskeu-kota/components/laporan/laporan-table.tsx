"use client"

import { useState, useEffect, useId } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowUpDown, Download, Eye, FileText, MoreHorizontal, Search } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { supabaseClient } from "@/lib/supabase/client"
import type { Database } from "@/lib/database.types"
import { toast } from "@/components/ui/use-toast"

type LaporanItem = Database["public"]["Tables"]["laporan"]["Row"] & {
  publishedTo?: string[]
}

export function LaporanTable() {
  // Generate stable IDs for accessibility
  const tableId = useId()
  const searchId = useId()

  const [sorting, setSorting] = useState<SortingState>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [reports, setReports] = useState<LaporanItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [mounted, setMounted] = useState(false)

  // Fixed: Separate state for filtered data to avoid infinite loop
  const [filteredData, setFilteredData] = useState<LaporanItem[]>([])

  // Ensure component is mounted before rendering to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Fetch reports only once when component mounts
  useEffect(() => {
    if (!mounted) return

    async function fetchReports() {
      setIsLoading(true)
      try {
        const { data, error } = await supabaseClient
          .from("laporan")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) {
          throw error
        }

        let reportData: LaporanItem[] = []

        if (data && data.length > 0) {
          // Add mock publishedTo data for now
          reportData = data.map((report) => ({
            ...report,
            publishedTo:
              report.status === "disetujui"
                ? ["Website Kota", "Portal Data"]
                : report.status === "final"
                  ? ["Website Kota"]
                  : [],
          }))
        } else {
          // Sample data if no data is available
          reportData = [
            {
              id: "1",
              desa_id: "DESA001",
              judul: "Laporan Keuangan Bulanan Juli 2023",
              jenis: "Laporan Keuangan",
              periode: "Bulanan",
              tanggal: "2023-07-31",
              pembuat: "Admin Keuangan",
              status: "disetujui",
              publishedTo: ["Website Kota", "Portal Data"],
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
            {
              id: "2",
              desa_id: "DESA001",
              judul: "Laporan Realisasi Anggaran Q2 2023",
              jenis: "Realisasi Anggaran",
              periode: "Triwulan",
              tanggal: "2023-06-30",
              pembuat: "Admin Keuangan",
              status: "disetujui",
              publishedTo: ["Website Kota", "Portal Data", "Sistem Keuangan Pusat"],
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ]
        }

        setReports(reportData)
        // Initialize filtered data with all reports
        setFilteredData(reportData)
      } catch (error) {
        console.error("Error fetching reports:", error)
        toast({
          title: "Error",
          description: "Gagal memuat data laporan",
          variant: "destructive",
        })
        // Set empty arrays on error
        setReports([])
        setFilteredData([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchReports()
  }, [mounted])

  // Filter data when search query changes
  useEffect(() => {
    if (!reports.length) return

    const filtered = reports.filter((item) => {
      if (!searchQuery) return true
      const searchLower = searchQuery.toLowerCase()
      return (
        item.judul.toLowerCase().includes(searchLower) ||
        item.jenis.toLowerCase().includes(searchLower) ||
        item.periode.toLowerCase().includes(searchLower)
      )
    })

    setFilteredData(filtered)
  }, [searchQuery, reports])

  const handleView = (report: LaporanItem) => {
    toast({
      title: "Lihat Laporan",
      description: `Melihat laporan: ${report.judul}`,
    })
  }

  const handleDownload = (report: LaporanItem) => {
    if (report.file_url) {
      window.open(report.file_url, "_blank")
    } else {
      toast({
        title: "Informasi",
        description: `Laporan ${report.judul} tidak memiliki file yang dapat diunduh.`,
      })
    }
  }

  const handlePublish = (report: LaporanItem) => {
    toast({
      title: "Publikasikan Ulang",
      description: `Mempublikasikan ulang laporan: ${report.judul}`,
    })
  }

  // Define columns
  const columns: ColumnDef<LaporanItem>[] = [
    {
      accessorKey: "judul",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Judul Laporan
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div className="font-medium">{row.getValue("judul")}</div>,
    },
    {
      accessorKey: "jenis",
      header: "Jenis",
      cell: ({ row }) => <div>{row.getValue("jenis")}</div>,
    },
    {
      accessorKey: "periode",
      header: "Periode",
      cell: ({ row }) => <div>{row.getValue("periode")}</div>,
    },
    {
      accessorKey: "tanggal",
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
            Tanggal
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => <div>{new Date(row.getValue("tanggal")).toLocaleDateString("id-ID")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge variant={status === "disetujui" ? "default" : status === "draft" ? "outline" : "destructive"}>
            {status === "disetujui" ? "Terpublikasi" : status === "draft" ? "Draft" : "Final"}
          </Badge>
        )
      },
    },
    {
      accessorKey: "publishedTo",
      header: "Dipublikasikan Ke",
      cell: ({ row }) => {
        const publishedTo = row.original.publishedTo || []
        return <div className="max-w-[200px] truncate">{publishedTo.length > 0 ? publishedTo.join(", ") : "-"}</div>
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const report = row.original
        const actionId = `action-${report.id}`

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0" id={actionId}>
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Aksi</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => handleView(report)}>
                <Eye className="mr-2 h-4 w-4" />
                Lihat
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload(report)}>
                <Download className="mr-2 h-4 w-4" />
                Unduh
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handlePublish(report)}>
                <FileText className="mr-2 h-4 w-4" />
                Publikasikan Ulang
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  // Initialize table with filtered data
  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  })

  // If not mounted yet, return null to prevent hydration mismatch
  if (!mounted) {
    return null
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <CardTitle>Daftar Laporan Keuangan</CardTitle>
          <div className="flex gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                id={searchId}
                type="search"
                placeholder="Cari laporan..."
                className="pl-8 w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" size="icon">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex justify-center items-center h-24">
            <p>Memuat data...</p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table id={tableId}>
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
                      Tidak ada data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        )}
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Sebelumnya
          </Button>
          <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
            Selanjutnya
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
