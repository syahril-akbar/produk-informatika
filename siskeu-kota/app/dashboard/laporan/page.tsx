import { LaporanOverview } from "@/components/laporan/laporan-overview"
import { LaporanFilter } from "@/components/laporan/laporan-filter"
import { LaporanOtomasi } from "@/components/laporan/laporan-otomasi"
import { LaporanClient } from "@/components/laporan/laporan-client"
import { ErrorBoundary } from "@/components/error-boundary"
import { LaporanTableClient } from "@/components/laporan/laporan-table-client"

export default function LaporanPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Laporan Keuangan</h1>
          <p className="text-muted-foreground">Otomasi laporan keuangan untuk website resmi kota</p>
        </div>
        <ErrorBoundary componentName="LaporanClient">
          <LaporanClient />
        </ErrorBoundary>
      </div>
      <ErrorBoundary componentName="LaporanOverview">
        <LaporanOverview />
      </ErrorBoundary>
      <ErrorBoundary componentName="LaporanOtomasi">
        <LaporanOtomasi />
      </ErrorBoundary>
      <ErrorBoundary componentName="LaporanFilter">
        <LaporanFilter />
      </ErrorBoundary>

      {/* Use the client component that handles the dynamic import */}
      <LaporanTableClient />
    </div>
  )
}
