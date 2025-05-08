"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  // Check if the error is a redirect error
  const isRedirectError =
    error.message.includes("NEXT_REDIRECT") || error.message.includes("Redirect") || error.message.includes("redirect")

  if (isRedirectError) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
        <div className="rounded-full bg-yellow-100 p-3 text-yellow-600 mb-4">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Navigasi Terganggu</h1>
        <p className="text-muted-foreground mb-6 max-w-md">
          Terjadi masalah saat mencoba mengalihkan Anda. Silakan coba navigasi manual.
        </p>
        <div className="space-y-2">
          <Link href="/">
            <Button>Kembali ke Beranda</Button>
          </Link>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Muat Ulang Halaman
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 text-center">
      <div className="rounded-full bg-red-100 p-3 text-red-600 mb-4">
        <AlertCircle className="h-6 w-6" />
      </div>
      <h1 className="text-2xl font-bold mb-2">Terjadi Kesalahan</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Maaf, terjadi kesalahan saat memuat halaman. Tim kami telah diberitahu tentang masalah ini.
      </p>
      <div className="space-y-2">
        <Button onClick={() => reset()}>Coba Lagi</Button>
        <Button variant="outline" onClick={() => window.location.reload()}>
          Muat Ulang Halaman
        </Button>
        <div className="pt-8 border-t mt-8 w-full max-w-md">
          <details className="text-left text-sm text-muted-foreground">
            <summary className="cursor-pointer font-medium">Detail Teknis</summary>
            <pre className="mt-2 rounded bg-slate-100 p-4 overflow-auto text-xs">
              {error?.message || "Unknown error"}
            </pre>
          </details>
        </div>
      </div>
    </div>
  )
}
