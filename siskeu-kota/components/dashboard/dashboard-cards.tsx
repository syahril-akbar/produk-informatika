"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowUpRight, ArrowDownRight, DollarSign, Users, FileText, Activity } from "lucide-react"
import { getSupabaseClient } from "@/lib/supabase/client"

// Sample data as fallback
const sampleCards = [
  {
    title: "Total Anggaran",
    value: "Rp 1.2T",
    description: "Tahun Anggaran 2023",
    icon: DollarSign,
  },
  {
    title: "Realisasi Anggaran",
    value: "68.2%",
    change: "+4.5%",
    changeType: "positive",
    description: "dari bulan lalu",
    icon: Activity,
  },
  {
    title: "Jumlah Layanan Publik",
    value: "24",
    change: "+2",
    changeType: "positive",
    description: "layanan baru",
    icon: Users,
  },
  {
    title: "Laporan Keuangan",
    value: "12",
    description: "Laporan Tahun 2023",
    icon: FileText,
  },
]

export function DashboardCards() {
  const [cards, setCards] = useState(sampleCards)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchCards() {
      try {
        const supabase = getSupabaseClient()

        // First, let's check the structure of the transaksi table
        const { data: tableInfo, error: tableError } = await supabase.from("transaksi").select("*").limit(1)

        if (tableError) {
          console.error("Error fetching transaksi table info:", tableError)
          throw tableError
        }

        // If we can't get the table structure, use sample data
        if (!tableInfo || tableInfo.length === 0) {
          console.warn("No data in transaksi table, using sample data")
          setLoading(false)
          return
        }

        // Check if we have a type column instead of jenis
        const hasTypeColumn = tableInfo[0].hasOwnProperty("type")
        const hasKategoriColumn = tableInfo[0].hasOwnProperty("kategori")
        const hasJumlahColumn = tableInfo[0].hasOwnProperty("jumlah")
        const hasAmountColumn = tableInfo[0].hasOwnProperty("amount")

        // Determine which column to use for transaction type and amount
        const typeColumn = hasTypeColumn ? "type" : hasKategoriColumn ? "kategori" : "tipe"
        const amountColumn = hasJumlahColumn ? "jumlah" : hasAmountColumn ? "amount" : "nilai"

        // Get total budget (income transactions)
        const { data: pendapatanData, error: pendapatanError } = await supabase
          .from("transaksi")
          .select(amountColumn)
          .ilike(typeColumn, "%pendapatan%")

        if (pendapatanError) {
          console.error("Error fetching pendapatan:", pendapatanError)
          throw pendapatanError
        }

        // Get expenses
        const { data: pengeluaranData, error: pengeluaranError } = await supabase
          .from("transaksi")
          .select(amountColumn)
          .ilike(typeColumn, "%pengeluaran%")

        if (pengeluaranError) {
          console.error("Error fetching pengeluaran:", pengeluaranError)
          throw pengeluaranError
        }

        // Get count of active services from pelayanan table
        const { count: layananCount, error: layananError } = await supabase
          .from("pelayanan")
          .select("*", { count: "exact", head: true })

        if (layananError) {
          console.error("Error fetching layanan count:", layananError)
          throw layananError
        }

        // Get count of financial reports from laporan table
        const { count: laporanCount, error: laporanError } = await supabase
          .from("laporan")
          .select("*", { count: "exact", head: true })

        if (laporanError) {
          console.error("Error fetching laporan count:", laporanError)
          throw laporanError
        }

        // Calculate total budget
        const totalPendapatan =
          pendapatanData?.reduce((sum, item) => {
            const amount = item[amountColumn] || 0
            return sum + (typeof amount === "number" ? amount : Number.parseFloat(amount) || 0)
          }, 0) || 0

        // Calculate budget realization percentage
        const totalPengeluaran =
          pengeluaranData?.reduce((sum, item) => {
            const amount = item[amountColumn] || 0
            return sum + (typeof amount === "number" ? amount : Number.parseFloat(amount) || 0)
          }, 0) || 0

        const realisasiPersentase = totalPendapatan > 0 ? Math.round((totalPengeluaran / totalPendapatan) * 100) : 0

        // Format total budget
        let formattedBudget = "Rp 0"
        if (totalPendapatan >= 1000000000000) {
          formattedBudget = `Rp ${(totalPendapatan / 1000000000000).toFixed(1)}T`
        } else if (totalPendapatan >= 1000000000) {
          formattedBudget = `Rp ${(totalPendapatan / 1000000000).toFixed(1)}M`
        } else if (totalPendapatan >= 1000000) {
          formattedBudget = `Rp ${(totalPendapatan / 1000000).toFixed(1)}Jt`
        } else {
          formattedBudget = `Rp ${totalPendapatan.toLocaleString("id-ID")}`
        }

        // Create updated cards with real data
        const updatedCards = [
          {
            title: "Total Anggaran",
            value: formattedBudget,
            description: `Tahun Anggaran ${new Date().getFullYear()}`,
            icon: DollarSign,
          },
          {
            title: "Realisasi Anggaran",
            value: `${realisasiPersentase}%`,
            change: "+4.5%", // This could be calculated if we had historical data
            changeType: "positive",
            description: "dari bulan lalu",
            icon: Activity,
          },
          {
            title: "Jumlah Layanan Publik",
            value: layananCount?.toString() || "0",
            change: "+2", // This could be calculated if we had historical data
            changeType: "positive",
            description: "layanan baru",
            icon: Users,
          },
          {
            title: "Laporan Keuangan",
            value: laporanCount?.toString() || "0",
            description: `Laporan Tahun ${new Date().getFullYear()}`,
            icon: FileText,
          },
        ]

        setCards(updatedCards)
      } catch (err) {
        console.error("Failed to fetch dashboard cards:", err)
        setError("Gagal memuat data dashboard. Menggunakan data sampel.")
        // Keep using sample data in case of error
      } finally {
        setLoading(false)
      }
    }

    fetchCards()
  }, [])

  // Update the loading state rendering
  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium bg-muted h-4 w-24 rounded"></CardTitle>
              <div className="h-4 w-4 rounded-full bg-muted"></div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold bg-muted h-6 w-32 rounded"></div>
              <p className="text-xs text-muted-foreground mt-2 bg-muted h-3 w-16 rounded"></p>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <>
      {error && (
        <div className="mb-4 p-2 bg-amber-50 border border-amber-200 rounded text-amber-700 text-sm">{error}</div>
      )}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => {
          const Icon = card.icon
          return (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{card.value}</div>
                {card.change ? (
                  <div className="flex items-center pt-1">
                    {card.changeType === "positive" ? (
                      <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-3 w-3 text-rose-500" />
                    )}
                    <span
                      className={card.changeType === "positive" ? "text-xs text-emerald-500" : "text-xs text-rose-500"}
                    >
                      {card.change}
                    </span>
                    <span className="text-xs text-muted-foreground ml-1">{card.description}</span>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">{card.description}</p>
                )}
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}
