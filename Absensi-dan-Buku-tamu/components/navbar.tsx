import Link from "next/link"

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#008080] text-white">
      <div className="container flex h-14 items-center">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
          DIGITAL KOTA
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link href="/" className="text-sm font-medium hover:underline underline-offset-4">
            Beranda
          </Link>
          <Link href="/absensi" className="text-sm font-medium hover:underline underline-offset-4 font-bold">
            Absensi
          </Link>
          <Link href="/buku-tamu" className="text-sm font-medium hover:underline underline-offset-4">
            Buku Tamu
          </Link>
          <Link href="/pengaturan" className="text-sm font-medium hover:underline underline-offset-4">
            Pengaturan
          </Link>
          <Link href="/dashboard" className="text-sm font-medium hover:underline underline-offset-4">
            Dashboard
          </Link>
          <Link href="/staff" className="text-sm font-medium hover:underline underline-offset-4">
            Staff
          </Link>
        </nav>
      </div>
    </header>
  )
}
