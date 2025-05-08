import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"

interface SkeletonCardProps {
  header?: boolean
  footer?: boolean
  rows?: number
}

export function SkeletonCard({ header = true, footer = false, rows = 3 }: SkeletonCardProps) {
  return (
    <Card>
      {header && (
        <CardHeader className="gap-2">
          <Skeleton className="h-5 w-1/3" />
          <Skeleton className="h-4 w-1/2" />
        </CardHeader>
      )}
      <CardContent className="flex flex-col gap-3">
        {Array(rows)
          .fill(null)
          .map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
      </CardContent>
      {footer && (
        <CardFooter>
          <Skeleton className="h-10 w-28" />
        </CardFooter>
      )}
    </Card>
  )
}
