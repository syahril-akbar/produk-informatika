"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface NavigationItem {
  name: string
  href: string
}

interface ActiveNavProps {
  items: NavigationItem[]
  className?: string
}

export function ActiveNav({ items, className }: ActiveNavProps) {
  const [activeSection, setActiveSection] = useState("")

  // Add scroll event listener to detect active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = items.map((item) => item.href.replace("#", ""))

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [items])

  return (
    <nav className={cn("flex items-center gap-6", className)}>
      {items.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`text-sm font-medium transition-colors hover:text-primary ${
            activeSection === item.href.replace("#", "") ? "text-primary font-semibold" : "text-muted-foreground"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  )
}
