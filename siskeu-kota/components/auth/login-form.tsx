"use client"

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
import { supabaseClient } from "@/lib/supabase/client"

const formSchema = z.object({
  email: z.string().email({
    message: "Masukkan alamat email yang valid.",
  }),
  password: z.string().min(8, {
    message: "Password harus minimal 8 karakter.",
  }),
})

export function LoginForm() {
  const router = useRouter()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  // Add state for error messages
  const [error, setError] = useState("")

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // Update the onSubmit function with better error handling
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true)
    setError("")

    try {
      const { data, error } = await supabaseClient.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      if (error) {
        // Provide user-friendly error messages
        if (error.message.includes("Invalid login")) {
          setError("Email or password is incorrect. Please try again.")
        } else if (error.message.includes("Email not confirmed")) {
          setError("Please verify your email address before logging in.")
        } else {
          setError(error.message)
        }
        return
      }

      toast({
        title: "Login berhasil",
        description: "Selamat datang kembali di DigitalKota.",
      })

      router.push("/dashboard")
      router.refresh()
    } catch (error) {
      setError("Terjadi kesalahan saat login, silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-center mb-2">
          <Shield className="h-10 w-10 text-primary" />
        </div>
        <CardTitle className="text-2xl font-bold text-center">DigitalKota</CardTitle>
        <CardDescription className="text-center">Masuk ke akun Anda untuk mengakses Siskeudes Online</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
            {error && <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Memproses..." : "Masuk"}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <div className="text-sm text-center text-muted-foreground">
          <Link href="#" className="hover:text-primary underline underline-offset-4">
            Lupa password?
          </Link>
        </div>
        <div className="text-sm text-center text-muted-foreground">
          Belum memiliki akun?{" "}
          <Link href="/register" className="hover:text-primary underline underline-offset-4">
            Daftar
          </Link>
        </div>
      </CardFooter>
    </Card>
  )
}
