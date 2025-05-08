"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Shield } from "lucide-react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabaseClient } from "@/lib/supabase/client"

const formSchema = z
  .object({
    name: z.string().min(2, {
      message: "Nama harus minimal 2 karakter.",
    }),
    email: z.string().email({
      message: "Masukkan alamat email yang valid.",
    }),
    password: z.string().min(8, {
      message: "Password harus minimal 8 karakter.",
    }),
    confirmPassword: z.string(),
    role: z.string({
      required_error: "Silakan pilih jabatan",
    }),
    desaId: z.string({
      required_error: "Silakan pilih desa",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password tidak cocok",
    path: ["confirmPassword"],
  })

export function RegisterForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [desaOptions, setDesaOptions] = useState([
    { id: "desa_sukamaju", nama: "Desa Sukamaju" },
    { id: "desa_harapan", nama: "Desa Harapan" },
    { id: "desa_makmur", nama: "Desa Makmur" },
    { id: "desa_sejahtera", nama: "Desa Sejahtera" },
  ])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      desaId: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)

    try {
      // 1. Register the user with Supabase Auth
      const { data: authData, error: authError } = await supabaseClient.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            name: values.name,
            role: values.role,
          },
        },
      })

      if (authError) {
        toast({
          title: "Error pendaftaran",
          description: authError.message,
          variant: "destructive",
        })
        return
      }

      // 2. Store additional user information in the database
      if (authData.user) {
        // Insert into users table
        const { error: userError } = await supabaseClient.from("users").insert({
          id: authData.user.id,
          email: values.email,
          password_hash: "secured-by-supabase-auth", // We don't store actual passwords
          name: values.name,
          role: values.role as any,
        })

        if (userError) {
          toast({
            title: "Error penyimpanan data",
            description: userError.message,
            variant: "destructive",
          })
          return
        }

        // Associate user with desa
        const { error: userDesaError } = await supabaseClient.from("user_desa").insert({
          user_id: authData.user.id,
          desa_id: values.desaId,
        })

        if (userDesaError) {
          toast({
            title: "Error penghubungan user dengan desa",
            description: userDesaError.message,
            variant: "destructive",
          })
          return
        }

        toast({
          title: "Pendaftaran berhasil",
          description: "Akun Anda telah berhasil dibuat. Silakan periksa email Anda untuk konfirmasi pendaftaran.",
        })

        router.push("/")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat pendaftaran, silakan coba lagi.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Load desa options from the database
  React.useEffect(() => {
    async function loadDesaOptions() {
      const { data, error } = await supabaseClient.from("desa").select("id, nama")

      if (data && data.length > 0) {
        setDesaOptions(data)
      }
    }

    loadDesaOptions()
  }, [])

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-2">
          <Shield className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold text-center">DigitalKota</CardTitle>
        <CardDescription className="text-center">Daftar untuk mengakses Siskeudes Online</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input placeholder="Nama Lengkap" {...field} />
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
                    <Input placeholder="nama@desa.id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Jabatan</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih jabatan" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="kepala_desa">Kepala Desa</SelectItem>
                        <SelectItem value="sekretaris">Sekretaris Desa</SelectItem>
                        <SelectItem value="bendahara">Bendahara</SelectItem>
                        <SelectItem value="kaur_keuangan">Kaur Keuangan</SelectItem>
                        <SelectItem value="operator">Operator</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="desaId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Desa</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih desa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {desaOptions.map((desa) => (
                          <SelectItem key={desa.id} value={desa.id}>
                            {desa.nama}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Konfirmasi Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Daftar"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-center w-full text-muted-foreground">
          Sudah memiliki akun?{" "}
          <Link href="/" className="hover:text-primary underline underline-offset-4">
            Masuk
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
