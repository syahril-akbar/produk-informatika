"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileText } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { KeuanganOverview } from "@/components/keuangan/keuangan-overview"
import { KeuanganTable } from "@/components/keuangan/keuangan-table"
import { KeuanganFilter } from "@/components/keuangan/keuangan-filter"
import { KeuanganReport } from "@/components/keuangan/keuangan-report"
import { KeuanganDialog } from "@/components/keuangan/keuangan-dialog"
import { KeuanganService } from "@/lib/services/keuangan-service"
import type { Database } from "@/lib/database.types"

// Definisikan tipe Transaction
export type Transaction = Database["public"]["Tables"]["transaksi"]["Row"]

export default function KeuanganPage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [currentTransaction, setCurrentTransaction] = useState<Transaction | undefined>(undefined)
  const { toast } = useToast()

  // Load transactions
  useEffect(() => {
    async function loadTransactions() {
      setIsLoading(true)
      try {
        const data = await KeuanganService.getTransaksi("desa_sukamaju") // TODO: Get actual desa_id
        setTransactions(data)
      } catch (error) {
        console.error("Error loading transactions:", error)
        toast({
          title: "Error",
          description: "Gagal memuat data transaksi",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadTransactions()
  }, [toast])

  // Handle opening the create dialog
  const handleCreateTransaction = () => {
    setCurrentTransaction(undefined)
    setDialogOpen(true)
  }

  // Handle opening the edit dialog
  const handleEditTransaction = (transaction: Transaction) => {
    setCurrentTransaction(transaction)
    setDialogOpen(true)
  }

  // Handle transaction deletion
  const handleDeleteTransaction = async (id: string) => {
    try {
      await KeuanganService.deleteTransaksi(id)

      // Update the local state (optimistic UI)
      setTransactions(transactions.filter((t) => t.id !== id))

      toast({
        title: "Berhasil",
        description: "Transaksi telah dihapus.",
      })
    } catch (error) {
      console.error("Error deleting transaction:", error)
      toast({
        title: "Error",
        description: "Gagal menghapus transaksi. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  // Handle transaction save success
  const handleTransactionSuccess = (transaction: Transaction, isEdit: boolean) => {
    if (isEdit) {
      // Update existing transaction in the list
      setTransactions(transactions.map((t) => (t.id === transaction.id ? transaction : t)))
    } else {
      // Add new transaction to the list
      setTransactions([transaction, ...transactions])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Keuangan Desa</h1>
          <p className="text-muted-foreground">Kelola data keuangan dan anggaran desa Anda.</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleCreateTransaction}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Tambah Transaksi
          </Button>
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Laporan
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger value="transaksi">Transaksi</TabsTrigger>
          <TabsTrigger value="laporan">Laporan</TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="space-y-4">
          <KeuanganOverview transactions={transactions} />
        </TabsContent>
        <TabsContent value="transaksi" className="space-y-4">
          <KeuanganFilter />
          <KeuanganTable
            data={transactions}
            isLoading={isLoading}
            onEdit={handleEditTransaction}
            onDelete={handleDeleteTransaction}
          />
        </TabsContent>
        <TabsContent value="laporan" className="space-y-4">
          <KeuanganReport transactions={transactions} />
        </TabsContent>
      </Tabs>

      {/* Dialog for creating/editing transactions */}
      <KeuanganDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        transaction={currentTransaction}
        onSuccess={handleTransactionSuccess}
      />
    </div>
  )
}
