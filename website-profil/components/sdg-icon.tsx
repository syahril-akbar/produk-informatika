import { cn } from "@/lib/utils"

interface SDGIconProps {
  number: number
  color: string
  className?: string
}

export function SDGIcon({ number, color, className }: SDGIconProps) {
  return (
    <div
      className={cn("rounded-md flex flex-col items-center justify-center text-white font-bold", className)}
      style={{ backgroundColor: color }}
    >
      <span className="text-xs">SDG</span>
      <span className="text-lg">{number}</span>
    </div>
  )
}
