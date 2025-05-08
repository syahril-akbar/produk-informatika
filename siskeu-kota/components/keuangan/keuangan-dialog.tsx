"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { KeuanganForm } from "@/components/keuangan/keuangan-form"
import { KeuanganService } from "@/lib/services/keuangan-service"
import { useToast } from "@/components/ui/use-toast"
import type { Transaction } from "@/app/dashboard/keuangan/page"

interface KeuanganDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  transaction?: Transaction
  onSuccess: (transaction: Transaction, isEdit: boolean) => void
}

export function KeuanganDialog({ open, onOpenChange, transaction, onSuccess }: KeuanganDialogProps) {
  const { toast } = useToast()
  const isEdit = !!transaction?.id

  const handleSubmit = async (formData: any) => {
    try {
      // Format date to ISO string expected by the database
      const formattedData = {
        ...formData,
        tanggal: formData.tanggal.toISOString().split("T")[0],
      }

      let result: Transaction

      if (isEdit && transaction) {
        // Update existing transaction
        result = await KeuanganService.updateTransaksi(transaction.id, formattedData)
        toast({
          title: "Berhasil",
          description: "Transaksi berhasil diperbarui.",
        })
      } else {
        // Create new transaction
        result = await KeuanganService.createTransaksi(
          "desa_sukamaju", // TODO: Replace with actual desa_id from context/state
          formattedData,
        )
        toast({
          title: "Berhasil",
          description: "Transaksi baru berhasil ditambahkan.",
        })
      }

      // Notify parent component of success
      onSuccess(result, isEdit)

      // Close dialog
      onOpenChange(false)
    } catch (error) {
      console.error("Error saving transaction:", error)
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat menyimpan transaksi. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isEdit ? "Edit Transaksi" : "Tambah Transaksi Baru"}</DialogTitle>
          <DialogDescription>
            {isEdit ? "Perbarui detail transaksi yang ada" : "Tambahkan transaksi baru ke dalam sistem keuangan desa."}
          </DialogDescription>
        </DialogHeader>
        <KeuanganForm initialData={transaction} onSubmit={handleSubmit} onCancel={handleCancel} />
      </DialogContent>
    </Dialog>
  )
}
