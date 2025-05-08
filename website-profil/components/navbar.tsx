"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

const mainNavItems = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Profil Desa",
    href: "/profil",
  },
  {
    title: "Infografis",
    href: "/berita",
  },
  {
    title: "Listing",
    href: "/listing",
  },
  {
    title: "IDM",
    href: "/idm",
  },
  {
    title: "Berita",
    href: "/berita",
    submenu: [
      { title: "APBDes", href: "/berita/apbdes" },
      { title: "Penduduk", href: "/berita/penduduk" },
      { title: "Stunting", href: "/berita/stunting" },
      { title: "Bansos", href: "/berita/bansos" },
    ],
  },
  {
    title: "Belanja",
    href: "/cek-bansos",
  },
  {
    title: "PPID",
    href: "/ppid",
    submenu: [
      { title: "Informasi Publik", href: "/ppid" },
      { title: "SDGs", href: "/ppid/sdgs" },
    ],
  },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled ? "bg-primary/95 backdrop-blur supports-[backdrop-filter]:bg-primary/60 border-b" : "bg-primary",
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative h-10 w-10">
            <Image
              src="/placeholder.svg?height=40&width=40&text=Logo"
              alt="Desa Pao-Pao Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-xl text-white">Desa Pao-Pao</span>
            <span className="text-xs text-white/80">Kabupaten Barru</span>
          </div>
        </Link>

        <div className="hidden md:flex">
          <div className="flex space-x-4">
            {mainNavItems.map((item) => (
              <div key={item.title} className="relative group">
                <Link
                  href={item.href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium text-white rounded-md hover:bg-primary-foreground/10",
                    pathname === item.href && "bg-primary-foreground/20",
                  )}
                >
                  {item.title}
                </Link>

                {item.submenu && (
                  <div className="absolute left-0 mt-1 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.title}
                        href={subitem.href}
                        className={cn(
                          "block px-4 py-2 text-sm text-gray-700 hover:bg-accent hover:text-accent-foreground",
                          pathname === subitem.href && "bg-accent text-accent-foreground",
                        )}
                      >
                        {subitem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="outline"
                size="icon"
                className="bg-transparent border-white/20 text-white hover:bg-primary-foreground/10 hover:text-white"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-primary text-white">
              <nav className="flex flex-col gap-4 mt-8">
                {mainNavItems.map((item) => (
                  <div key={item.title}>
                    <Link
                      href={item.href}
                      className={cn(
                        "text-lg font-medium transition-colors hover:text-white/80",
                        pathname === item.href ? "text-white" : "text-white/60",
                      )}
                    >
                      {item.title}
                    </Link>
                    {item.submenu && (
                      <div className="ml-4 mt-2 flex flex-col space-y-2">
                        {item.submenu.map((subitem) => (
                          <Link
                            key={subitem.title}
                            href={subitem.href}
                            className={cn(
                              "text-sm transition-colors hover:text-white/80",
                              pathname === subitem.href ? "text-white" : "text-white/60",
                            )}
                          >
                            {subitem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
