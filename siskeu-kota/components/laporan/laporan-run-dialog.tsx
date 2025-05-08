"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { toast } from "@/components/ui/use-toast"

interface LaporanRunDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  report: any
}

export function LaporanRunDialog({ open, onOpenChange, report }: LaporanRunDialogProps) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("idle") // idle, running, completed, error
  const [logs, setLogs] = useState<string[]>([])

  useEffect(() => {
    if (open && status === "idle") {
      setProgress(0)
      setLogs([])
    }
  }, [open, status])

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`])
  }

  const handleRun = async () => {
    setStatus("running")
    setProgress(0)
    setLogs([])

    addLog(`Memulai pembuatan laporan: ${report.title}`)

    // Simulasi proses pembuatan laporan
    await new Promise((resolve) => setTimeout(resolve, 500))
    setProgress(10)
    addLog("Menginisialisasi template...")

    await new Promise((resolve) => setTimeout(resolve, 800))
    setProgress(25)
    addLog("Mengambil data dari database...")

    await new Promise((resolve) => setTimeout(resolve, 1200))
    setProgress(40)
    addLog("Memproses data...")

    await new Promise((resolve) => setTimeout(resolve, 1000))
    setProgress(60)
    addLog("Membuat dokumen laporan...")

    await new Promise((resolve) => setTimeout(resolve, 1500))
    setProgress(85)
    addLog("Menyimpan laporan...")

    await new Promise((resolve) => setTimeout(resolve, 800))
    setProgress(100)
    addLog("Laporan berhasil dibuat!")

    setStatus("completed")
    toast({
      title: "Laporan berhasil dibuat",
      description: `Laporan ${report.title} telah berhasil dibuat dan siap dipublikasikan.`,
    })
  }

  const handleClose = () => {
    if (status !== "running") {
      onOpenChange(false)
      // Reset state setelah dialog ditutup
      setTimeout(() => {
        setStatus("idle")
        setProgress(0)
        setLogs([])
      }, 300)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Jalankan Laporan</DialogTitle>
          <DialogDescription>
            {status === "idle"
              ? "Jalankan pembuatan laporan secara manual."
              : status === "running"
                ? "Sedang membuat laporan, mohon tunggu..."
                : status === "completed"
                  ? "Laporan berhasil dibuat!"
                  : "Terjadi kesalahan saat membuat laporan."}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Log Aktivitas</h4>
            <ScrollArea className="h-[200px] rounded-md border p-4">
              {logs.length > 0 ? (
                logs.map((log, index) => (
                  <div key={index} className="text-xs">
                    {log}
                  </div>
                ))
              ) : (
                <div className="text-xs text-muted-foreground">Belum ada aktivitas.</div>
              )}
            </ScrollArea>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium">Detail Laporan</h4>
            <div className="rounded-md border p-4 space-y-2">
              <div className="grid grid-cols-3 text-sm">
                <span className="font-medium">Judul:</span>
                <span className="col-span-2">{report.title}</span>
              </div>
              <div className="grid grid-cols-3 text-sm">
                <span className="font-medium">Jadwal:</span>
                <span className="col-span-2">{report.schedule}</span>
              </div>
              <div className="grid grid-cols-3 text-sm">
                <span className="font-medium">Publikasi ke:</span>
                <span className="col-span-2">{report.publishTo.join(", ")}</span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter>
          {status === "idle" && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Batal
              </Button>
              <Button onClick={handleRun}>Jalankan Sekarang</Button>
            </>
          )}
          {status === "running" && (
            <Button disabled>
              <span className="animate-spin mr-2">⏳</span>
              Sedang Berjalan...
            </Button>
          )}
          {(status === "completed" || status === "error") && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Tutup
              </Button>
              {status === "completed" && <Button onClick={handleClose}>Lihat Hasil</Button>}
              {status === "error" && (
                <Button variant="destructive" onClick={handleRun}>
                  Coba Lagi
                </Button>
              )}
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
