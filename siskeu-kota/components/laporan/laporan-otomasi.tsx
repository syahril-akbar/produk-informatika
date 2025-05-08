"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Clock, Calendar, FileText, Globe, RefreshCw, Settings, CheckCircle, AlertCircle } from "lucide-react"
import { LaporanRunDialog } from "./laporan-run-dialog"
import { LaporanConfigDialog } from "./laporan-config-dialog"
import { LaporanViewTemplateDialog } from "./laporan-view-template-dialog"
import { LaporanEditTemplateDialog } from "./laporan-edit-template-dialog"

const scheduledReports = [
  {
    id: "1",
    title: "Laporan Keuangan Bulanan",
    description: "Laporan keuangan bulanan otomatis",
    schedule: "Setiap akhir bulan, 23:59",
    lastPublished: "31 Juli 2023",
    nextSchedule: "31 Agustus 2023",
    status: "active",
    publishTo: ["Website Kota", "Portal Data"],
  },
  {
    id: "2",
    title: "Laporan Realisasi Anggaran",
    description: "Laporan realisasi anggaran triwulanan",
    schedule: "Setiap akhir triwulan, 23:59",
    lastPublished: "30 Juni 2023",
    nextSchedule: "30 September 2023",
    status: "active",
    publishTo: ["Website Kota", "Portal Data", "Sistem Keuangan Pusat"],
  },
  {
    id: "3",
    title: "Laporan Kinerja Anggaran",
    description: "Laporan kinerja anggaran semesteran",
    schedule: "Setiap akhir semester, 23:59",
    lastPublished: "30 Juni 2023",
    nextSchedule: "31 Desember 2023",
    status: "active",
    publishTo: ["Website Kota", "Portal Data"],
  },
  {
    id: "4",
    title: "Laporan Pendapatan Daerah",
    description: "Laporan pendapatan daerah bulanan",
    schedule: "Setiap tanggal 5, 08:00",
    lastPublished: "5 Juli 2023",
    nextSchedule: "5 Agustus 2023",
    status: "issue",
    publishTo: ["Website Kota"],
  },
]

const templateReports = [
  {
    id: "5",
    title: "Template Laporan Keuangan Bulanan",
    description: "Template standar untuk laporan keuangan bulanan",
    lastUpdated: "15 Juli 2023",
    format: ["PDF", "Excel"],
    status: "active",
  },
  {
    id: "6",
    title: "Template Laporan Realisasi Anggaran",
    description: "Template standar untuk laporan realisasi anggaran",
    lastUpdated: "10 Juli 2023",
    format: ["PDF", "Excel", "Word"],
    status: "active",
  },
  {
    id: "7",
    title: "Template Laporan Kinerja Anggaran",
    description: "Template standar untuk laporan kinerja anggaran",
    lastUpdated: "20 Juni 2023",
    format: ["PDF", "Excel"],
    status: "active",
  },
  {
    id: "8",
    title: "Template Laporan Pendapatan Daerah",
    description: "Template standar untuk laporan pendapatan daerah",
    lastUpdated: "25 Juni 2023",
    format: ["PDF", "Excel"],
    status: "active",
  },
]

export function LaporanOtomasi() {
  const [runDialogOpen, setRunDialogOpen] = useState(false)
  const [configDialogOpen, setConfigDialogOpen] = useState(false)
  const [viewTemplateDialogOpen, setViewTemplateDialogOpen] = useState(false)
  const [editTemplateDialogOpen, setEditTemplateDialogOpen] = useState(false)
  const [selectedReport, setSelectedReport] = useState<any>(null)
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)

  const handleRunReport = (report: any) => {
    setSelectedReport(report)
    setRunDialogOpen(true)
  }

  const handleConfigReport = (report: any) => {
    setSelectedReport(report)
    setConfigDialogOpen(true)
  }

  const handleViewTemplate = (template: any) => {
    setSelectedTemplate(template)
    setViewTemplateDialogOpen(true)
  }

  const handleEditTemplate = (template: any) => {
    setSelectedTemplate(template)
    setEditTemplateDialogOpen(true)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Otomasi Laporan</CardTitle>
          <CardDescription>Pengaturan otomatisasi laporan keuangan</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="scheduled" className="space-y-4">
            <TabsList>
              <TabsTrigger value="scheduled">Laporan Terjadwal</TabsTrigger>
              <TabsTrigger value="templates">Template Laporan</TabsTrigger>
              <TabsTrigger value="settings">Pengaturan Publikasi</TabsTrigger>
            </TabsList>
            <TabsContent value="scheduled">
              <div className="space-y-4">
                {scheduledReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{report.title}</h3>
                        <Badge variant={report.status === "active" ? "default" : "destructive"}>
                          {report.status === "active" ? (
                            <CheckCircle className="mr-1 h-3 w-3" />
                          ) : (
                            <AlertCircle className="mr-1 h-3 w-3" />
                          )}
                          {report.status === "active" ? "Aktif" : "Bermasalah"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{report.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{report.schedule}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>Terakhir: {report.lastPublished}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>Berikutnya: {report.nextSchedule}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 pt-1">
                        <Globe className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          Publikasi ke: {report.publishTo.join(", ")}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleRunReport(report)}>
                        <RefreshCw className="mr-2 h-3 w-3" />
                        Jalankan
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleConfigReport(report)}>
                        <Settings className="mr-2 h-3 w-3" />
                        Konfigurasi
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="templates">
              <div className="space-y-4">
                {templateReports.map((template) => (
                  <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{template.title}</h3>
                        <Badge variant="outline">
                          <FileText className="mr-1 h-3 w-3" />
                          {template.format.join(", ")}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>Terakhir diperbarui: {template.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleViewTemplate(template)}>
                        <FileText className="mr-2 h-3 w-3" />
                        Lihat
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditTemplate(template)}>
                        <Settings className="mr-2 h-3 w-3" />
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="settings">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Pengaturan Publikasi Otomatis</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="website" className="flex flex-col space-y-1">
                        <span>Website Resmi Kota</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Publikasikan laporan ke website resmi kota
                        </span>
                      </Label>
                      <Switch id="website" defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="portal" className="flex flex-col space-y-1">
                        <span>Portal Data Kota</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Publikasikan laporan ke portal data kota
                        </span>
                      </Label>
                      <Switch id="portal" defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="keuangan" className="flex flex-col space-y-1">
                        <span>Sistem Keuangan Pusat</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Kirim laporan ke sistem keuangan pusat
                        </span>
                      </Label>
                      <Switch id="keuangan" defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="email" className="flex flex-col space-y-1">
                        <span>Notifikasi Email</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Kirim notifikasi email saat laporan dipublikasikan
                        </span>
                      </Label>
                      <Switch id="email" defaultChecked />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Format Publikasi</h3>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="pdf" className="flex flex-col space-y-1">
                        <span>PDF</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Publikasikan laporan dalam format PDF
                        </span>
                      </Label>
                      <Switch id="pdf" defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="excel" className="flex flex-col space-y-1">
                        <span>Excel</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Publikasikan laporan dalam format Excel
                        </span>
                      </Label>
                      <Switch id="excel" defaultChecked />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between space-x-2">
                      <Label htmlFor="web" className="flex flex-col space-y-1">
                        <span>Web (HTML)</span>
                        <span className="font-normal text-sm text-muted-foreground">
                          Publikasikan laporan dalam format web
                        </span>
                      </Label>
                      <Switch id="web" defaultChecked />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Batal</Button>
                  <Button>Simpan Pengaturan</Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {selectedReport && (
        <LaporanRunDialog open={runDialogOpen} onOpenChange={setRunDialogOpen} report={selectedReport} />
      )}

      {selectedReport && (
        <LaporanConfigDialog open={configDialogOpen} onOpenChange={setConfigDialogOpen} report={selectedReport} />
      )}

      {selectedTemplate && (
        <LaporanViewTemplateDialog
          open={viewTemplateDialogOpen}
          onOpenChange={setViewTemplateDialogOpen}
          template={selectedTemplate}
          onEdit={() => {
            setViewTemplateDialogOpen(false)
            setEditTemplateDialogOpen(true)
          }}
        />
      )}

      {selectedTemplate && (
        <LaporanEditTemplateDialog
          open={editTemplateDialogOpen}
          onOpenChange={setEditTemplateDialogOpen}
          template={selectedTemplate}
        />
      )}
    </>
  )
}
