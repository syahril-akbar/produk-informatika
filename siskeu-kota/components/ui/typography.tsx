import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface TypographyProps {
  children: ReactNode
  className?: string
}

export function Heading1({ children, className }: TypographyProps) {
  return <h1 className={cn("scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl", className)}>{children}</h1>
}

export function Heading2({ children, className }: TypographyProps) {
  return (
    <h2 className={cn("scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0", className)}>
      {children}
    </h2>
  )
}

export function Heading3({ children, className }: TypographyProps) {
  return <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>{children}</h3>
}

export function Heading4({ children, className }: TypographyProps) {
  return <h4 className={cn("scroll-m-20 text-xl font-semibold tracking-tight", className)}>{children}</h4>
}

export function Paragraph({ children, className }: TypographyProps) {
  return <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>{children}</p>
}

export function Lead({ children, className }: TypographyProps) {
  return <p className={cn("text-xl text-muted-foreground", className)}>{children}</p>
}

export function Large({ children, className }: TypographyProps) {
  return <div className={cn("text-lg font-semibold", className)}>{children}</div>
}

export function Small({ children, className }: TypographyProps) {
  return <small className={cn("text-sm font-medium leading-none", className)}>{children}</small>
}

export function Muted({ children, className }: TypographyProps) {
  return <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
}
