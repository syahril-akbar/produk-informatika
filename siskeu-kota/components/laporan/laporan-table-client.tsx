"use client"

import dynamic from "next/dynamic"
import { Suspense } from "react"
import { ErrorBoundary } from "@/components/error-boundary"

// Dynamically import LaporanTable with SSR disabled
const LaporanTable = dynamic(
  () => import("@/components/laporan/laporan-table").then((mod) => ({ default: mod.LaporanTable })),
  {
    ssr: false,
    loading: () => (
      <div className="h-60 w-full bg-muted rounded-md animate-pulse flex items-center justify-center">
        <p className="text-muted-foreground">Memuat tabel laporan...</p>
      </div>
    ),
  },
)

export function LaporanTableClient() {
  return (
    <ErrorBoundary componentName="LaporanTable">
      <Suspense
        fallback={
          <div className="h-60 w-full bg-muted rounded-md animate-pulse flex items-center justify-center">
            <p className="text-muted-foreground">Memuat tabel laporan...</p>
          </div>
        }
      >
        <LaporanTable />
      </Suspense>
    </ErrorBoundary>
  )
}
