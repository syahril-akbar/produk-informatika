import { DashboardOverview } from "@/components/dashboard/dashboard-overview"
import { DashboardCards } from "@/components/dashboard/dashboard-cards"
import { DashboardCharts } from "@/components/dashboard/dashboard-charts"
import { DashboardRecentActivity } from "@/components/dashboard/dashboard-recent-activity"

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Ringkasan pengelolaan keuangan dan anggaran kota</p>
      </div>
      <DashboardCards />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        <DashboardCharts className="lg:col-span-4" />
        <DashboardRecentActivity className="lg:col-span-3" />
      </div>
      <DashboardOverview />
    </div>
  )
}
