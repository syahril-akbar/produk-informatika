"use client"

import { useState } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"

const formSchema = z.object({
  nama_desa: z.string().min(2, {
    message: "Nama desa harus minimal 2 karakter.",
  }),
  alamat: z.string().min(5, {
    message: "Alamat harus minimal 5 karakter.",
  }),
  telepon: z.string().min(5, {
    message: "Nomor telepon harus minimal 5 karakter.",
  }),
  email: z.string().email({
    message: "Email tidak valid.",
  }),
  website: z.string().url({
    message: "URL website tidak valid.",
  }),
  luas_wilayah: z.string().min(1, {
    message: "Luas wilayah harus diisi.",
  }),
  jumlah_dusun: z.string().min(1, {
    message: "Jumlah dusun harus diisi.",
  }),
  jumlah_rw: z.string().min(1, {
    message: "Jumlah RW harus diisi.",
  }),
  jumlah_rt: z.string().min(1, {
    message: "Jumlah RT harus diisi.",
  }),
  batas_utara: z.string().min(2, {
    message: "Batas utara harus minimal 2 karakter.",
  }),
  batas_selatan: z.string().min(2, {
    message: "Batas selatan harus minimal 2 karakter.",
  }),
  batas_timur: z.string().min(2, {
    message: "Batas timur harus minimal 2 karakter.",
  }),
  batas_barat: z.string().min(2, {
    message: "Batas barat harus minimal 2 karakter.",
  }),
  sejarah: z.string().min(10, {
    message: "Sejarah harus minimal 10 karakter.",
  }),
})

export function ProfilForm() {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_desa: "Desa Sukamaju",
      alamat: "Jl. Raya Sukamaju No. 123, Kecamatan Sukamaju, Kabupaten Sukamaju, Provinsi Jawa Tengah",
      telepon: "(0123) 456789",
      email: "info@desasukamaju.id",
      website: "https://www.desasukamaju.id",
      luas_wilayah: "5.25",
      jumlah_dusun: "5",
      jumlah_rw: "10",
      jumlah_rt: "25",
      batas_utara: "Desa Harapan",
      batas_selatan: "Desa Makmur",
      batas_timur: "Desa Sejahtera",
      batas_barat: "Desa Damai",
      sejarah:
        'Desa Sukamaju didirikan pada tahun 1945 setelah kemerdekaan Indonesia. Awalnya merupakan pemukiman kecil yang kemudian berkembang menjadi desa yang makmur. Nama Sukamaju berasal dari kata "suka" yang berarti senang dan "maju" yang berarti berkembang, mencerminkan harapan pendiri desa agar masyarakatnya selalu senang dan terus berkembang.',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)

      toast({
        title: "Profil desa berhasil diperbarui",
        description: "Perubahan telah disimpan.",
      })
    }, 1500)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="umum" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="umum">Informasi Umum</TabsTrigger>
            <TabsTrigger value="detail">Detail Desa</TabsTrigger>
          </TabsList>
          <TabsContent value="umum" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Informasi Umum</CardTitle>
                <CardDescription>Informasi dasar tentang desa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="nama_desa"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Desa</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama Desa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="alamat"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Alamat</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Alamat lengkap desa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                  <FormField
                    control={form.control}
                    name="telepon"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Telepon</FormLabel>
                        <FormControl>
                          <Input placeholder="Nomor telepon" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email desa" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="website"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Website</FormLabel>
                        <FormControl>
                          <Input placeholder="Website desa" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="detail" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Detail Desa</CardTitle>
                <CardDescription>Informasi detail tentang desa</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-4">
                  <FormField
                    control={form.control}
                    name="luas_wilayah"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Luas Wilayah (km²)</FormLabel>
                        <FormControl>
                          <Input placeholder="Luas wilayah" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="jumlah_dusun"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jumlah Dusun</FormLabel>
                        <FormControl>
                          <Input placeholder="Jumlah dusun" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="jumlah_rw"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jumlah RW</FormLabel>
                        <FormControl>
                          <Input placeholder="Jumlah RW" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="jumlah_rt"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Jumlah RT</FormLabel>
                        <FormControl>
                          <Input placeholder="Jumlah RT" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="batas_utara"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Batas Utara</FormLabel>
                        <FormControl>
                          <Input placeholder="Batas utara" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="batas_selatan"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Batas Selatan</FormLabel>
                        <FormControl>
                          <Input placeholder="Batas selatan" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="batas_timur"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Batas Timur</FormLabel>
                        <FormControl>
                          <Input placeholder="Batas timur" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="batas_barat"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Batas Barat</FormLabel>
                        <FormControl>
                          <Input placeholder="Batas barat" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="sejarah"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sejarah Singkat</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Sejarah singkat desa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  <Button type="submit" disabled={isLoading}>
                    {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  )
}
