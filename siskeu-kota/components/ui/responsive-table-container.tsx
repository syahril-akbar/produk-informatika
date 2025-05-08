import type React from "react"
import { cn } from "@/lib/utils"

interface ResponsiveTableContainerProps {
  children: React.ReactNode
  className?: string
}

export function ResponsiveTableContainer({ children, className }: ResponsiveTableContainerProps) {
  return (
    <div className={cn("overflow-auto -mx-4 sm:mx-0", className)}>
      <div className="inline-block min-w-full align-middle p-4 sm:p-0">{children}</div>
    </div>
  )
}
