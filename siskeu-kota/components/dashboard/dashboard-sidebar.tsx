"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
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
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

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

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden border-r bg-muted/40 md:block md:w-64">
      <div className="flex h-full flex-col gap-2 p-4">
        <div className="flex h-14 items-center border-b px-4 py-2">
          <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
            <Home className="h-6 w-6" />
            <span className="text-lg">Siskeu Kota Online</span>
          </Link>
        </div>
        <div className="flex-1 py-2">
          <nav className="grid gap-1">
            {sidebarItems.map((item, index) => (
              <Button
                key={index}
                asChild
                variant={pathname === item.href ? "secondary" : "ghost"}
                className={cn("justify-start", pathname === item.href ? "bg-secondary" : "")}
              >
                <Link href={item.href}>
                  <item.icon className="mr-2 h-5 w-5" />
                  {item.title}
                </Link>
              </Button>
            ))}
          </nav>
        </div>
        <div className="border-t pt-4">
          <div className="flex items-center gap-2 rounded-lg bg-muted p-4">
            <div className="grid gap-1">
              <p className="text-sm font-medium leading-none">Siskeu Kota Online</p>
              <p className="text-xs text-muted-foreground">v1.0.0</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
