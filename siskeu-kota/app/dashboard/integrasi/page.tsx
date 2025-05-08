"use client"

import { useState } from "react"
import { IntegrasiOverview } from "@/components/integrasi/integrasi-overview"
import { IntegrasiSistem } from "@/components/integrasi/integrasi-sistem"
import { IntegrasiStatus } from "@/components/integrasi/integrasi-status"
import { Button } from "@/components/ui/button"
import { RefreshCw, Settings } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { IntegrasiConfigDialog } from "@/components/integrasi/integrasi-config-dialog"

export default function IntegrasiPage() {
  const [configDialogOpen, setConfigDialogOpen] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    // Simulasi refresh data
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast({
      title: "Data diperbarui",
      description: "Data integrasi sistem telah berhasil diperbarui.",
    })
    setIsRefreshing(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Integrasi Sistem</h1>
          <p className="text-muted-foreground">Integrasi dengan sistem administrasi dan pelayanan publik kota</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
            <RefreshCw className={`mr-2 h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Memperbarui..." : "Refresh"}
          </Button>
          <Button onClick={() => setConfigDialogOpen(true)}>
            <Settings className="mr-2 h-4 w-4" />
            Konfigurasi
          </Button>
        </div>
      </div>
      <IntegrasiOverview />
      <IntegrasiSistem />
      <IntegrasiStatus />
      <IntegrasiConfigDialog open={configDialogOpen} onOpenChange={setConfigDialogOpen} />
    </div>
  )
}
