"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { v4 as uuidv4 } from "uuid"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Copy, Check } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// Safe localStorage wrapper
const safeLocalStorage = {
  getItem: (key: string, defaultValue: any = "[]") => {
    if (typeof window === "undefined") return defaultValue
    try {
      return localStorage.getItem(key) || defaultValue
    } catch (error) {
      console.error("Error accessing localStorage:", error)
      return defaultValue
    }
  },
  setItem: (key: string, value: string) => {
    if (typeof window === "undefined") return
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.error("Error setting localStorage:", error)
    }
  },
}

// Letter type mapping
const letterTypeMap: Record<string, string> = {
  ktp: "KTP",
  kk: "KK",
  akta: "AKT",
  skck: "SKCK",
  domisili: "DOM",
  usaha: "USH",
  kelahiran: "LHR",
  kematian: "MTI",
  pindah: "PND",
  nikah: "NKH",
  cerai: "CRI",
  waris: "WRS",
  izin: "IZN",
  umum: "UMM",
}

// Form schema
const formSchema = z.object({
  type: z.string({
    required_error: "Pilih jenis surat",
  }),
  nama: z.string().min(3, {
    message: "Nama harus minimal 3 karakter",
  }),
  nik: z
    .string()
    .min(16, {
      message: "NIK harus 16 digit",
    })
    .max(16, {
      message: "NIK harus 16 digit",
    }),
  tempatLahir: z.string().min(3, {
    message: "Tempat lahir harus minimal 3 karakter",
  }),
  tanggalLahir: z.string().min(1, {
    message: "Tanggal lahir harus diisi",
  }),
  jenisKelamin: z.enum(["Laki-laki", "Perempuan"], {
    required_error: "Pilih jenis kelamin",
  }),
  alamat: z.string().min(10, {
    message: "Alamat harus minimal 10 karakter",
  }),
  keperluan: z.string().min(10, {
    message: "Keperluan harus minimal 10 karakter",
  }),
})

export default function BuatSuratClient() {
  const [isClient, setIsClient] = useState(false)
  const [nomorSurat, setNomorSurat] = useState<string>("")
  const [isCopied, setIsCopied] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  // Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "",
      nama: "",
      nik: "",
      tempatLahir: "",
      tanggalLahir: "",
      jenisKelamin: "Laki-laki",
      alamat: "",
      keperluan: "",
    },
  })

  // Generate letter number when type changes
  useEffect(() => {
    setIsClient(true)

    const type = form.watch("type")
    if (!type) return

    generateLetterNumber(type)
  }, [form.watch("type")])

  // Don't render anything on the server
  if (!isClient) {
    return null
  }

  // Generate a unique letter number
  function generateLetterNumber(type: string) {
    try {
      // Get existing letter numbers
      const letterNumbers = JSON.parse(safeLocalStorage.getItem("letterNumbers", "[]"))

      // Get the current year
      const year = new Date().getFullYear()

      // Get the letter type code
      const typeCode = letterTypeMap[type] || "UMM"

      // Find the highest sequential number for this type and year
      let maxSeq = 0
      letterNumbers.forEach((num: string) => {
        if (num.includes(`/${typeCode}/${year}`)) {
          const parts = num.split("/")
          const seq = Number.parseInt(parts[1])
          if (seq > maxSeq) maxSeq = seq
        }
      })

      // Generate new number
      const newSeq = maxSeq + 1
      const newNumber = `474/${newSeq.toString().padStart(3, "0")}/${typeCode}/${year}`

      // Save to state
      setNomorSurat(newNumber)

      return newNumber
    } catch (error) {
      console.error("Error generating letter number:", error)
      return ""
    }
  }

  // Copy letter number to clipboard
  const copyLetterNumber = () => {
    if (!nomorSurat) return

    navigator.clipboard.writeText(nomorSurat)
    setIsCopied(true)

    toast({
      title: "Nomor surat disalin",
      description: `${nomorSurat} telah disalin ke clipboard`,
    })

    setTimeout(() => setIsCopied(false), 2000)
  }

  // Form submission handler
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Generate a unique ID for the letter
      const letterId = uuidv4()

      // Create letter data
      const letterData = {
        id: letterId,
        nomorSurat,
        createdAt: new Date().toISOString(),
        ...values,
      }

      // Save letter data to localStorage
      const existingLetters = JSON.parse(safeLocalStorage.getItem("letters", "[]"))
      existingLetters.push(letterData)
      safeLocalStorage.setItem("letters", JSON.stringify(existingLetters))

      // Save letter number to localStorage
      const existingNumbers = JSON.parse(safeLocalStorage.getItem("letterNumbers", "[]"))
      existingNumbers.push(nomorSurat)
      safeLocalStorage.setItem("letterNumbers", JSON.stringify(existingNumbers))

      // Show success toast
      toast({
        title: "Surat berhasil dibuat",
        description: "Anda akan diarahkan ke halaman cetak surat",
      })

      // Redirect to print page
      setTimeout(() => {
        router.push(`/cetak-surat?id=${letterId}`)
      }, 1000)
    } catch (error) {
      console.error("Error submitting form:", error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat membuat surat",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto p-6">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Kembali
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Buat Surat Baru</CardTitle>
            {nomorSurat && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-sm font-mono">
                  {nomorSurat}
                </Badge>
                <Button variant="ghost" size="icon" onClick={copyLetterNumber} className="h-8 w-8">
                  {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            )}
          </div>
          <CardDescription>Isi formulir berikut untuk membuat surat baru</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jenis Surat</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jenis surat" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="ktp">Surat Pengantar KTP</SelectItem>
                        <SelectItem value="kk">Surat Pengantar KK</SelectItem>
                        <SelectItem value="domisili">Surat Keterangan Domisili</SelectItem>
                        <SelectItem value="usaha">Surat Keterangan Usaha</SelectItem>
                        <SelectItem value="kelahiran">Surat Keterangan Kelahiran</SelectItem>
                        <SelectItem value="kematian">Surat Keterangan Kematian</SelectItem>
                        <SelectItem value="pindah">Surat Keterangan Pindah</SelectItem>
                        <SelectItem value="umum">Surat Keterangan Umum</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="nama"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan nama lengkap" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="nik"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NIK</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan NIK 16 digit" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tempatLahir"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tempat Lahir</FormLabel>
                      <FormControl>
                        <Input placeholder="Masukkan tempat lahir" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tanggalLahir"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Lahir</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="jenisKelamin"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jenis Kelamin</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jenis kelamin" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                          <SelectItem value="Perempuan">Perempuan</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="alamat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Masukkan alamat lengkap" {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="keperluan"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Keperluan</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Masukkan keperluan pembuatan surat" {...field} rows={3} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full md:w-auto">
                Buat Surat
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
