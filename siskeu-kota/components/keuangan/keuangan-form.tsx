"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { ClientOnly } from "@/lib/utils/client-only"
import type { Transaction } from "@/app/dashboard/keuangan/page"

// Validation schema for transaction form
const transactionSchema = z.object({
  tanggal: z.date({
    required_error: "Tanggal transaksi harus diisi",
  }),
  keterangan: z.string().min(5, {
    message: "Keterangan harus minimal 5 karakter",
  }),
  kategori: z.string().min(1, {
    message: "Kategori harus dipilih",
  }),
  jumlah: z.coerce.number().positive({
    message: "Jumlah harus berupa angka positif",
  }),
  status: z.enum(["pendapatan", "pengeluaran"], {
    required_error: "Status harus dipilih",
  }),
  sumber: z.string().min(1, {
    message: "Sumber dana harus diisi",
  }),
  tahun: z.string().length(4, {
    message: "Tahun harus 4 digit",
  }),
})

type TransactionFormProps = {
  initialData?: Partial<Transaction>
  onSubmit: (data: z.infer<typeof transactionSchema>) => Promise<void>
  onCancel: () => void
}

export function KeuanganForm({ initialData, onSubmit, onCancel }: TransactionFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  // Initialize the form with default values or initial data
  const form = useForm<z.infer<typeof transactionSchema>>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      tanggal: initialData?.tanggal ? new Date(initialData.tanggal) : new Date(),
      keterangan: initialData?.keterangan || "",
      kategori: initialData?.kategori || "",
      jumlah: initialData?.jumlah ? Number(initialData.jumlah) : undefined,
      status: (initialData?.status as "pendapatan" | "pengeluaran") || "pendapatan",
      sumber: initialData?.sumber || "",
      tahun: initialData?.tahun || new Date().getFullYear().toString(),
    },
  })

  // Categories for the dropdown
  const categories = [
    "Dana Desa",
    "Alokasi Dana Desa",
    "Pendapatan Asli Desa",
    "Retribusi",
    "Hibah",
    "Infrastruktur",
    "Administrasi",
    "Kesehatan",
    "Pendidikan",
    "Lainnya",
  ]

  // Sources for the dropdown
  const sources = [
    "Pemerintah Pusat",
    "Pemerintah Daerah",
    "Kementerian Keuangan",
    "PAD",
    "Dana Desa",
    "Swadaya Masyarakat",
    "Lainnya",
  ]

  // Handle form submission
  const handleSubmit = async (values: z.infer<typeof transactionSchema>) => {
    try {
      setIsSubmitting(true)
      await onSubmit(values)
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menyimpan data. Silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <ClientOnly>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tanggal */}
            <FormField
              control={form.control}
              name="tanggal"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Tanggal Transaksi</FormLabel>
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

            {/* Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih status transaksi" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="pendapatan">Pendapatan</SelectItem>
                      <SelectItem value="pengeluaran">Pengeluaran</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Keterangan */}
          <FormField
            control={form.control}
            name="keterangan"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Keterangan</FormLabel>
                <FormControl>
                  <Input placeholder="Masukkan keterangan transaksi" {...field} />
                </FormControl>
                <FormDescription>Deskripsi singkat tentang transaksi ini</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Kategori */}
            <FormField
              control={form.control}
              name="kategori"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Kategori</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih kategori" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Jumlah */}
            <FormField
              control={form.control}
              name="jumlah"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jumlah (Rp)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Masukkan jumlah"
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value === "" ? undefined : Number.parseFloat(e.target.value)
                        field.onChange(value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Sumber */}
            <FormField
              control={form.control}
              name="sumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sumber Dana</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih sumber dana" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {sources.map((source) => (
                        <SelectItem key={source} value={source}>
                          {source}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Tahun */}
            <FormField
              control={form.control}
              name="tahun"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tahun</FormLabel>
                  <FormControl>
                    <Input placeholder="Masukkan tahun" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
              Batal
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan..." : initialData?.id ? "Perbarui" : "Simpan"}
            </Button>
          </div>
        </form>
      </Form>
    </ClientOnly>
  )
}
