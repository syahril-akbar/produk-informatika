"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileText } from "lucide-react"
import { LaporanCreateDialog } from "@/components/laporan/laporan-create-dialog"
import { LaporanTemplateDialog } from "@/components/laporan/laporan-template-dialog"

export function LaporanClient() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false)
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false)

  return (
    <>
      <div className="flex flex-col sm:flex-row gap-2">
        <Button onClick={() => setCreateDialogOpen(true)}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Buat Laporan
        </Button>
        <Button variant="outline" onClick={() => setTemplateDialogOpen(true)}>
          <FileText className="mr-2 h-4 w-4" />
          Template
        </Button>
      </div>

      {/* Only render dialogs when they're open to prevent unnecessary renders */}
      {createDialogOpen && <LaporanCreateDialog open={createDialogOpen} onOpenChange={setCreateDialogOpen} />}

      {templateDialogOpen && <LaporanTemplateDialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen} />}
    </>
  )
}
