"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  FileText,
  Home,
  LayoutDashboard,
  Link2,
  Settings,
  Building2,
  FileBarChart2,
  Users,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useState, useEffect } from "react"
import { Menu } from "lucide-react"

const sidebarItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Anggaran Kota",
    href: "/dashboard/anggaran",
    icon: BarChart3,
  },
  {
    title: "Integrasi Sistem",
    href: "/dashboard/integrasi",
    icon: Link2,
  },
  {
    title: "Laporan Keuangan",
    href: "/dashboard/laporan",
    icon: FileText,
  },
  {
    title: "Administrasi",
    href: "/dashboard/administrasi",
    icon: FileBarChart2,
  },
  {
    title: "Pelayanan Publik",
    href: "/dashboard/pelayanan",
    icon: Users,
  },
  {
    title: "Profil Kota",
    href: "/dashboard/profil",
    icon: Building2,
  },
  {
    title: "Pengaturan",
    href: "/dashboard/pengaturan",
    icon: Settings,
  },
]

export function DashboardSidebarMobile() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  // Tutup sidebar saat rute berubah
  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="p-0 w-[240px]">
        <div className="flex h-full flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 py-2">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Home className="h-6 w-6" />
              <span className="text-lg">Siskeu Kota Online</span>
            </Link>
            <Button variant="ghost" size="icon" className="ml-auto" onClick={() => setOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex-1 py-2 px-2">
            <nav className="grid gap-1">
              {sidebarItems.map((item, index) => (
                <Button
                  key={index}
                  asChild
                  variant={pathname === item.href ? "secondary" : "ghost"}
                  className={cn("justify-start", pathname === item.href ? "bg-secondary" : "")}
                  onClick={() => {
                    router.push(item.href)
                    setOpen(false)
                  }}
                >
                  <Link href={item.href}>
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.title}
                  </Link>
                </Button>
              ))}
            </nav>
          </div>
          <div className="border-t p-4">
            <div className="flex items-center gap-2 rounded-lg bg-muted p-4">
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Siskeu Kota Online</p>
                <p className="text-xs text-muted-foreground">v1.0.0</p>
              </div>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
