"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
// Import the ActiveNav component
import { ActiveNav } from "./landing-active-nav"

export function LandingHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: "Fitur", href: "#fitur" },
    { name: "Manfaat", href: "#manfaat" },
    { name: "Tentang", href: "#tentang" },
    { name: "Kontak", href: "#kontak" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold bg-gradient-to-r from-teal-500 to-teal-300 bg-clip-text text-transparent mr-1">
              DIGITAL
            </span>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-400 to-pink-300 bg-clip-text text-transparent">
              KOTA
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ActiveNav items={navigation} className="hidden md:flex" />

        <div className="flex items-center gap-2">
          <Link href="/dashboard" className="hidden md:block">
            <Button variant="outline" size="sm">
              Masuk
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm">Dashboard</Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">Toggle menu</span>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="container pb-4 md:hidden" id="mobile-menu">
          <nav className="flex flex-col space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link href="/dashboard" className="mt-2">
              <Button variant="outline" size="sm" className="w-full">
                Masuk
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

// Also add a default export for backward compatibility
export default LandingHeader
