import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { AbsensiProvider } from "@/context/absensi-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "DIGITAL KOTA - Fitur Absensi dan Buku Tamu",
  description: "Solusi digital untuk absensi dan buku tamu kota",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <AbsensiProvider>
            {children}
            <Toaster />
          </AbsensiProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
