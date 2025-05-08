import type { Metadata } from "next"
import { PelayananOverview } from "@/components/pelayanan/pelayanan-overview"
import { PelayananStatus } from "@/components/pelayanan/pelayanan-status"
import { PelayananTable } from "@/components/pelayanan/pelayanan-table"

export const metadata: Metadata = {
  title: "Pelayanan Publik | Siskeu Kota Online",
  description: "Manajemen dan pemantauan layanan publik kota",
}

export default function PelayananPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pelayanan Publik</h1>
        <p className="text-muted-foreground">Manajemen dan pemantauan layanan publik kota</p>
      </div>

      <div className="grid gap-6">
        <PelayananOverview />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <PelayananStatus />
        </div>

        <PelayananTable />
      </div>
    </div>
  )
}
