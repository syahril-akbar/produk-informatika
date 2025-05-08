"use client"

import { useState, useEffect, type ReactNode } from "react"
import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface DataErrorBoundaryProps {
  children: ReactNode
  fallback?: ReactNode
  loadingFallback?: ReactNode
  fetchData: () => Promise<any>
  dependencies?: any[]
}

export function DataErrorBoundary({
  children,
  fallback,
  loadingFallback,
  fetchData,
  dependencies = [],
}: DataErrorBoundaryProps) {
  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const handleFetchData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await fetchData()
      setData(result)
    } catch (err) {
      console.error("Failed to fetch data:", err)
      setError(err instanceof Error ? err : new Error(String(err)))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    handleFetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  if (isLoading) {
    return (
      loadingFallback || (
        <div className="flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )
    )
  }

  if (error) {
    return (
      fallback || (
        <Card className="border-destructive/50">
          <CardHeader>
            <CardTitle className="flex items-center text-destructive">
              <AlertCircle className="h-5 w-5 mr-2" />
              Error Loading Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">{error.message}</p>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm" onClick={handleFetchData}>
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry
            </Button>
          </CardFooter>
        </Card>
      )
    )
  }

  // Clone children and pass data to them
  return children
}
