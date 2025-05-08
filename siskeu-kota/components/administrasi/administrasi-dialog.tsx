"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"
import { ClientOnly } from "@/lib/utils/client-only"
import { AdministrasiService } from "@/lib/services/administrasi-service"
import type { Database } from "@/lib/database.types"

type Document = Database["public"]["Tables"]["dokumen"]["Row"]

const documentSchema = z.object({
  nomor: z.string().min(1, { message: "Nomor dokumen harus diisi" }),
  judul: z.string().min(3, { message: "Judul harus minimal 3 karakter" }),
  kategori: z.string().min(1, { message: "Kategori harus dipilih" }),
  tanggal: z.date({ required_error: "Tanggal harus dipilih" }),
  status: z.enum(["aktif", "kadaluarsa", "draft"], { required_error: "Status harus dipilih" }),
  pembuat: z.string().min(1, { message: "Pembuat harus diisi" }),
  deskripsi: z.string().optional(),
})

type DocumentFormValues = z.infer<typeof documentSchema>

interface AdministrasiDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  document?: Document
  onSuccess: (document: Document, isEdit: boolean) => void
}

export function AdministrasiDialog({ open, onOpenChange, document, onSuccess }: AdministrasiDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isEdit = !!document?.id

  // Create form with default values or data from existing document
  const form = useForm<DocumentFormValues>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      nomor: document?.nomor || "",
      judul: document?.judul || "",
      kategori: document?.kategori || "",
      tanggal: document?.tanggal ? new Date(document.tanggal) : new Date(),
      status: (document?.status as "aktif" | "kadaluarsa" | "draft") || "aktif",
      pembuat: document?.pembuat || "",
      deskripsi: "",
    },
  })

  const handleSubmit = async (values: DocumentFormValues) => {
    try {
      setIsSubmitting(true)

      // Format date to ISO string for the database
      const formattedData = {
        ...values,
        tanggal: values.tanggal.toISOString().split("T")[0],
      }

      let result: Document

      if (isEdit && document) {
        // Update existing document
        result = await AdministrasiService.update(document.id, formattedData)
        toast({
          title: "Berhasil",
          description: "Dokumen berhasil diperbarui.",
        })
      } else {
        // Create new document
        result = await AdministrasiService.create({
          ...formattedData,
          desa_id: "DESA001", // TODO: Get actual desa_id
        })
        toast({
          title: "Berhasil",
          description: "Dokumen baru berhasil ditambahkan.",
        })
      }

      // Notify parent component of success
      onSuccess(result, isEdit)

      // Close dialog and reset form
      onOpenChange(false)
      form.reset()
    } catch (error) {
      console.error("Error saving document:", error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menyimpan dokumen. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Dokumen" : "Tambah Dokumen Baru"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Perbarui dokumen yang ada" : "Tambahkan dokumen administrasi baru ke dalam sistem."}
          </DialogDescription>
        </DialogHeader>
        <ClientOnly>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="nomor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nomor Dokumen</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nomor dokumen" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tanggal"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Tanggal Dokumen</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={"outline"}
                              className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                            >
                              {field.value ? format(field.value, "PPP") : <span>Pilih tanggal</span>}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="judul"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Judul Dokumen</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan judul dokumen" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="kategori"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kategori dokumen" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Surat Keputusan">Surat Keputusan</SelectItem>
                          <SelectItem value="Peraturan Desa">Peraturan Desa</SelectItem>
                          <SelectItem value="Surat Keterangan">Surat Keterangan</SelectItem>
                          <SelectItem value="Laporan">Laporan</SelectItem>
                          <SelectItem value="Lainnya">Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih status dokumen" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="aktif">Aktif</SelectItem>
                          <SelectItem value="kadaluarsa">Kadaluarsa</SelectItem>
                          <SelectItem value="draft">Draft</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="pembuat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pembuat</FormLabel>
                    <FormControl>
                      <Input placeholder="Masukkan nama pembuat dokumen" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deskripsi"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deskripsi</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Masukkan deskripsi dokumen" className="resize-none" {...field} />
                    </FormControl>
                    <FormDescription>Deskripsi singkat tentang dokumen ini</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
                  Batal
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Menyimpan..." : isEdit ? "Perbarui" : "Simpan"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </ClientOnly>
      </DialogContent>
    </Dialog>
  )
}
