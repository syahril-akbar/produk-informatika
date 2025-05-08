"use client"

import { useState, useEffect } from "react"
import { AdministrasiOverview } from "@/components/administrasi/administrasi-overview"
import { AdministrasiTable } from "@/components/administrasi/administrasi-table"
import { AdministrasiFilter } from "@/components/administrasi/administrasi-filter"
import { AdministrasiDialog } from "@/components/administrasi/administrasi-dialog"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { AdministrasiService } from "@/lib/services/administrasi-service"
import { useToast } from "@/components/ui/use-toast"
import type { Database } from "@/lib/database.types"

type Document = Database["public"]["Tables"]["dokumen"]["Row"]

export default function AdministrasiPage() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [documents, setDocuments] = useState<Document[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedDocument, setSelectedDocument] = useState<Document | undefined>(undefined)
  const { toast } = useToast()

  useEffect(() => {
    async function loadDocuments() {
      setIsLoading(true)
      try {
        const data = await AdministrasiService.getAll({ key: "desa_id", value: "DESA001" })
        setDocuments(data)
      } catch (error) {
        console.error("Error loading documents:", error)
        toast({
          title: "Error",
          description: "Gagal memuat data dokumen",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    loadDocuments()
  }, [toast])

  const handleCreateDocument = () => {
    setSelectedDocument(undefined)
    setDialogOpen(true)
  }

  const handleEditDocument = (document: Document) => {
    setSelectedDocument(document)
    setDialogOpen(true)
  }

  const handleDeleteDocument = async (id: string) => {
    try {
      await AdministrasiService.delete(id)

      // Update local state (optimistic UI)
      setDocuments(documents.filter((doc) => doc.id !== id))

      toast({
        title: "Berhasil",
        description: "Dokumen telah dihapus.",
      })
    } catch (error) {
      console.error("Error deleting document:", error)
      toast({
        title: "Error",
        description: "Gagal menghapus dokumen. Silakan coba lagi.",
        variant: "destructive",
      })
    }
  }

  const handleDocumentSuccess = (document: Document, isEdit: boolean) => {
    if (isEdit) {
      // Update existing document in the list
      setDocuments(documents.map((doc) => (doc.id === document.id ? document : doc)))
    } else {
      // Add new document to the list
      setDocuments([document, ...documents])
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Administrasi Desa</h1>
          <p className="text-muted-foreground">Kelola dokumen dan administrasi desa Anda.</p>
        </div>
        <Button onClick={handleCreateDocument}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Tambah Dokumen
        </Button>
      </div>

      <AdministrasiOverview />

      <div className="space-y-4">
        <AdministrasiFilter />
        <AdministrasiTable
          documents={documents}
          isLoading={isLoading}
          onEdit={handleEditDocument}
          onDelete={handleDeleteDocument}
        />
      </div>

      <AdministrasiDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        document={selectedDocument}
        onSuccess={handleDocumentSuccess}
      />
    </div>
  )
}
