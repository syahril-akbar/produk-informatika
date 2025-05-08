"use client"
import { useState } from "react"
import type React from "react"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Plus, Eye } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "@/components/ui/use-toast"

interface LaporanTemplateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const templates = [
  {
    id: "1",
    title: "Template Laporan Keuangan Bulanan",
    description: "Template standar untuk laporan keuangan bulanan",
    format: ["PDF", "Excel"],
    lastUpdated: "15 Juli 2023",
    previewUrl: "/placeholder.svg?height=500&width=400",
    downloadUrl: "#",
  },
  {
    id: "2",
    title: "Template Laporan Realisasi Anggaran",
    description: "Template standar untuk laporan realisasi anggaran",
    format: ["PDF", "Excel", "Word"],
    lastUpdated: "10 Juli 2023",
    previewUrl: "/placeholder.svg?height=500&width=400",
    downloadUrl: "#",
  },
  {
    id: "3",
    title: "Template Laporan Kinerja Anggaran",
    description: "Template standar untuk laporan kinerja anggaran",
    format: ["PDF", "Excel"],
    lastUpdated: "20 Juni 2023",
    previewUrl: "/placeholder.svg?height=500&width=400",
    downloadUrl: "#",
  },
  {
    id: "4",
    title: "Template Laporan Pendapatan Daerah",
    description: "Template standar untuk laporan pendapatan daerah",
    format: ["PDF", "Excel"],
    lastUpdated: "25 Juni 2023",
    previewUrl: "/placeholder.svg?height=500&width=400",
    downloadUrl: "#",
  },
]

export function LaporanTemplateDialog({ open, onOpenChange }: LaporanTemplateDialogProps) {
  const [activeTab, setActiveTab] = useState("available")
  const [previewTemplate, setPreviewTemplate] = useState<(typeof templates)[0] | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [selectedFormats, setSelectedFormats] = useState({
    pdf: true,
    excel: true,
    word: false,
  })
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null as File | null,
  })

  const handlePreview = (template: (typeof templates)[0]) => {
    setPreviewTemplate(template)
    setPreviewOpen(true)
  }

  const handleDownload = (template: (typeof templates)[0]) => {
    // In a real application, this would download the actual file
    toast({
      title: "Template diunduh",
      description: `Template ${template.title} telah berhasil diunduh.`,
    })
  }

  const handleFormatChange = (format: keyof typeof selectedFormats) => {
    setSelectedFormats((prev) => ({
      ...prev,
      [format]: !prev[format],
    }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData((prev) => ({
        ...prev,
        file: e.target.files![0],
      }))
    }
  }

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!formData.title || !formData.description) {
      toast({
        title: "Validasi gagal",
        description: "Judul dan deskripsi template harus diisi.",
        variant: "destructive",
      })
      return
    }

    // In a real application, this would upload the file and create the template
    toast({
      title: "Template dibuat",
      description: `Template ${formData.title} telah berhasil dibuat.`,
    })

    // Reset form
    setFormData({
      title: "",
      description: "",
      file: null,
    })

    // Switch back to available tab
    setActiveTab("available")

    // Close dialog
    onOpenChange(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Template Laporan</DialogTitle>
            <DialogDescription>Pilih template laporan yang tersedia atau buat template baru.</DialogDescription>
          </DialogHeader>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="available">Template Tersedia</TabsTrigger>
              <TabsTrigger value="create">Buat Template Baru</TabsTrigger>
            </TabsList>
            <TabsContent value="available" className="space-y-4 py-4">
              <div className="grid gap-4">
                {templates.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-medium">{template.title}</h3>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>Format: {template.format.join(", ")}</span>
                        <span>•</span>
                        <span>Terakhir diperbarui: {template.lastUpdated}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handlePreview(template)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Pratinjau
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDownload(template)}>
                        <Download className="mr-2 h-4 w-4" />
                        Unduh
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="create" className="space-y-4 py-4">
              <form onSubmit={handleCreateTemplate}>
                <div className="grid gap-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="template-title" className="text-right">
                      Judul Template
                    </Label>
                    <Input
                      id="template-title"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      placeholder="Masukkan judul template"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="template-description" className="text-right">
                      Deskripsi
                    </Label>
                    <Input
                      id="template-description"
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      placeholder="Masukkan deskripsi template"
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Format</Label>
                    <div className="col-span-3 flex flex-col gap-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="pdf"
                          checked={selectedFormats.pdf}
                          onCheckedChange={() => handleFormatChange("pdf")}
                        />
                        <Label htmlFor="pdf">PDF</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="excel"
                          checked={selectedFormats.excel}
                          onCheckedChange={() => handleFormatChange("excel")}
                        />
                        <Label htmlFor="excel">Excel</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="word"
                          checked={selectedFormats.word}
                          onCheckedChange={() => handleFormatChange("word")}
                        />
                        <Label htmlFor="word">Word</Label>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="template-file" className="text-right">
                      Unggah File
                    </Label>
                    <div className="col-span-3">
                      <Input id="template-file" type="file" onChange={handleFileChange} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                    Batal
                  </Button>
                  <Button type="submit">
                    <Plus className="mr-2 h-4 w-4" />
                    Buat Template
                  </Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Pratinjau Template</DialogTitle>
            <DialogDescription>
              {previewTemplate?.title} - {previewTemplate?.description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center py-4">
            <img
              src={previewTemplate?.previewUrl || "/placeholder.svg?height=500&width=400"}
              alt="Template Preview"
              className="max-w-full h-auto border rounded-md shadow-sm"
            />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>
              Tutup
            </Button>
            {previewTemplate && (
              <Button onClick={() => handleDownload(previewTemplate)}>
                <Download className="mr-2 h-4 w-4" />
                Unduh
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
