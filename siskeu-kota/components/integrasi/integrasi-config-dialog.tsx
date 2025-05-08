"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

interface IntegrasiConfigDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function IntegrasiConfigDialog({ open, onOpenChange }: IntegrasiConfigDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [formState, setFormState] = useState({
    autoSync: true,
    syncInterval: "hourly",
    notification: true,
    apiKey: "••••••••••••••••",
    endpoint: "https://api.kotaonline.id",
    timeout: "30",
    scheduleType: "cron",
    cronExpression: "0 * * * *",
    retryCount: "3",
  })

  const handleChange = (field: string, value: string | boolean) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulasi API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    toast({
      title: "Konfigurasi disimpan",
      description: "Konfigurasi integrasi sistem telah berhasil disimpan.",
    })

    setIsLoading(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Konfigurasi Integrasi Sistem</DialogTitle>
          <DialogDescription>Atur konfigurasi integrasi dengan berbagai sistem kota.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="general">Umum</TabsTrigger>
              <TabsTrigger value="connection">Koneksi</TabsTrigger>
              <TabsTrigger value="schedule">Jadwal</TabsTrigger>
            </TabsList>
            <TabsContent value="general" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="auto-sync" className="text-right">
                    Sinkronisasi Otomatis
                  </Label>
                  <div className="col-span-3">
                    <Switch
                      id="auto-sync"
                      checked={formState.autoSync}
                      onCheckedChange={(checked) => handleChange("autoSync", checked)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="sync-interval" className="text-right">
                    Interval Sinkronisasi
                  </Label>
                  <Select value={formState.syncInterval} onValueChange={(value) => handleChange("syncInterval", value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih interval" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15min">Setiap 15 menit</SelectItem>
                      <SelectItem value="30min">Setiap 30 menit</SelectItem>
                      <SelectItem value="hourly">Setiap jam</SelectItem>
                      <SelectItem value="daily">Setiap hari</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notification" className="text-right">
                    Notifikasi
                  </Label>
                  <div className="col-span-3">
                    <Switch
                      id="notification"
                      checked={formState.notification}
                      onCheckedChange={(checked) => handleChange("notification", checked)}
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="connection" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="api-key" className="text-right">
                    API Key
                  </Label>
                  <Input
                    id="api-key"
                    type="password"
                    value={formState.apiKey}
                    onChange={(e) => handleChange("apiKey", e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="endpoint" className="text-right">
                    Endpoint URL
                  </Label>
                  <Input
                    id="endpoint"
                    placeholder="https://api.example.com"
                    value={formState.endpoint}
                    onChange={(e) => handleChange("endpoint", e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="timeout" className="text-right">
                    Timeout (detik)
                  </Label>
                  <Input
                    id="timeout"
                    type="number"
                    value={formState.timeout}
                    onChange={(e) => handleChange("timeout", e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="schedule" className="space-y-4 py-4">
              <div className="space-y-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="schedule-type" className="text-right">
                    Tipe Jadwal
                  </Label>
                  <Select value={formState.scheduleType} onValueChange={(value) => handleChange("scheduleType", value)}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Pilih tipe jadwal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="interval">Interval</SelectItem>
                      <SelectItem value="cron">Cron</SelectItem>
                      <SelectItem value="fixed">Waktu Tetap</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="cron-expression" className="text-right">
                    Ekspresi Cron
                  </Label>
                  <Input
                    id="cron-expression"
                    value={formState.cronExpression}
                    onChange={(e) => handleChange("cronExpression", e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="retry-count" className="text-right">
                    Jumlah Percobaan Ulang
                  </Label>
                  <Input
                    id="retry-count"
                    type="number"
                    value={formState.retryCount}
                    onChange={(e) => handleChange("retryCount", e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter className="mt-6">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan Konfigurasi"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
