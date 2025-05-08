"use client"

import { useState } from "react"
import { ArrowUpDown, MoreHorizontal, Trash2, Pencil, Download, Eye } from "lucide-react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import type { Database } from "@/lib/database.types"
import { ResponsiveTableContainer } from "@/components/ui/responsive-table-container"

type Document = Database["public"]["Tables"]["dokumen"]["Row"]

interface AdministrasiTableProps {
  documents: Document[]
  isLoading: boolean
  onEdit: (document: Document) => void
  onDelete: (id: string) => void
}

// Sample document files for demo purposes
const documentFiles = {
  DOC001: {
    name: "SK Pengangkatan Perangkat Desa.pdf",
    type: "application/pdf",
    size: 1024 * 1024 * 2.5, // 2.5MB
    url: "/placeholder.svg?height=500&width=400", // In a real app, this would be a real file URL
  },
  DOC002: {
    name: "Peraturan Desa tentang APBDes 2023.pdf",
    type: "application/pdf",
    size: 1024 * 1024 * 3.2, // 3.2MB
    url: "/placeholder.svg?height=500&width=400", // In a real app, this would be a real file URL
  },
}

export function AdministrasiTable({ documents, isLoading, onEdit, onDelete }: AdministrasiTableProps) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)

  const handleView = (document: Document) => {
    setSelectedDocument(document)
    setViewDialogOpen(true)
  }

  const handleDownload = async (document: Document) => {
    setIsDownloading(true)

    try {
      // In a real application, this would fetch the actual file from the server
      // For demo purposes, we'll simulate a download delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Get the document file info (in a real app, this would come from the document record)
      const fileInfo = documentFiles[document.id as keyof typeof documentFiles]

      if (!fileInfo) {
        throw new Error("File not found")
      }

      // In a real application, this would create a download link for the actual file
      // For demo purposes, we'll just show a success message
      toast({
        title: "Dokumen diunduh",
        description: `Dokumen ${document.judul} (${fileInfo.name}) telah berhasil diunduh.`,
      })

      // In a real application, you would trigger the download like this:
      // const link = document.createElement('a')
      // link.href = fileInfo.url
      // link.download = fileInfo.name
      // document.body.appendChild(link)
      // link.click()
      // document.body.removeChild(link)
    } catch (error) {
      console.error("Error downloading document:", error)
      toast({
        title: "Gagal mengunduh dokumen",
        description: "Terjadi kesalahan saat mengunduh dokumen. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsDownloading(false)
    }
  }

  const handleEdit = (document: Document) => {
    onEdit(document)
  }

  const handleDelete = (document: Document) => {
    setSelectedDocument(document)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = async () => {
    if (selectedDocument) {
      setIsDeleting(true)
      try {
        await onDelete(selectedDocument.id)
        setDeleteDialogOpen(false)
      } catch (error) {
        console.error("Error confirming delete:", error)
        toast({
          title: "Error",
          description: "Gagal menghapus dokumen",
          variant: "destructive",
        })
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const columns: ColumnDef<Document>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "nomor",
      header: "Nomor",
      cell: ({ row }) => <div className="font-medium">{row.getValue("nomor")}</div>,
    },
    {
      accessorKey: "judul",
      header: "Judul",
      cell: ({ row }) => <div className="max-w-[250px] truncate">{row.getValue("judul")}</div>,
    },
    {
      accessorKey: "kategori",
      header: "Kategori",
      cell: ({ row }) => <div>{row.getValue("kategori")}</div>,
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
      cell: ({ row }) => {
        const date = new Date(row.getValue("tanggal"))
        return <div>{date.toLocaleDateString("id-ID")}</div>
      },
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <Badge
            variant={status === "aktif" ? "default" : status === "draft" ? "outline" : "destructive"}
            className="capitalize"
          >
            {status}
          </Badge>
        )
      },
    },
    {
      accessorKey: "pembuat",
      header: "Pembuat",
      cell: ({ row }) => <div>{row.getValue("pembuat")}</div>,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const document = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Aksi</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => navigator.clipboard.writeText(document.id)}>Salin ID</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleView(document)}>
                <Eye className="mr-2 h-4 w-4" />
                Lihat
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload(document)}>
                <Download className="mr-2 h-4 w-4" />
                Unduh
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleEdit(document)}>
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(document)}>
                <Trash2 className="mr-2 h-4 w-4" />
                Hapus
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: documents,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column, index) => (
                  <TableHead key={index}>{typeof column.header === "string" ? column.header : ""}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 5 }).map((_, index) => (
                <TableRow key={index}>
                  {columns.map((_, cellIndex) => (
                    <TableCell key={cellIndex}>
                      <Skeleton className="h-6 w-full" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="space-y-4">
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
                      Tidak ada data
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </ResponsiveTableContainer>
        <div className="flex items-center justify-between">
          <div className="flex-1 text-sm text-muted-foreground">
            {table.getFilteredSelectedRowModel().rows.length} dari {table.getFilteredRowModel().rows.length} baris
            dipilih.
          </div>
          <div className="flex items-center space-x-2">
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
        </div>
      </div>

      {/* Dialog untuk melihat dokumen */}
      {selectedDocument && (
        <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Detail Dokumen</DialogTitle>
              <DialogDescription>Informasi lengkap tentang dokumen.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">ID:</p>
                <p className="col-span-3">{selectedDocument.id}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">Nomor:</p>
                <p className="col-span-3">{selectedDocument.nomor}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">Judul:</p>
                <p className="col-span-3">{selectedDocument.judul}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">Kategori:</p>
                <p className="col-span-3">{selectedDocument.kategori}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">Tanggal:</p>
                <p className="col-span-3">{new Date(selectedDocument.tanggal).toLocaleDateString("id-ID")}</p>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">Status:</p>
                <div className="col-span-3">
                  <Badge
                    variant={
                      selectedDocument.status === "aktif"
                        ? "default"
                        : selectedDocument.status === "draft"
                          ? "outline"
                          : "destructive"
                    }
                    className="capitalize"
                  >
                    {selectedDocument.status}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <p className="text-right font-medium">Pembuat:</p>
                <p className="col-span-3">{selectedDocument.pembuat}</p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                Tutup
              </Button>
              <Button onClick={() => handleDownload(selectedDocument)} disabled={isDownloading}>
                <Download className="mr-2 h-4 w-4" />
                {isDownloading ? "Mengunduh..." : "Unduh"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Dialog konfirmasi hapus */}
      {selectedDocument && (
        <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
          <AlertDialogContent className="sm:max-w-[425px]">
            <AlertDialogHeader>
              <AlertDialogTitle>Konfirmasi Hapus</AlertDialogTitle>
              <AlertDialogDescription>
                Apakah Anda yakin ingin menghapus dokumen ini? Tindakan ini tidak dapat dibatalkan.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <div className="py-4">
              <p className="text-sm font-medium">
                Dokumen: <span className="font-normal">{selectedDocument.judul}</span>
              </p>
              <p className="text-sm font-medium">
                Nomor: <span className="font-normal">{selectedDocument.nomor}</span>
              </p>
            </div>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isDeleting}>Batal</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDelete}
                disabled={isDeleting}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                {isDeleting ? "Menghapus..." : "Hapus"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </>
  )
}
