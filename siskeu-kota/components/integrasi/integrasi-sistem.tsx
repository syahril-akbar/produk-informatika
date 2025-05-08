"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, AlertCircle, Clock, Settings, RefreshCw } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

const administrasiSystems = [
  {
    id: "1",
    name: "Sistem Informasi Keuangan Daerah",
    description: "Pengelolaan keuangan dan anggaran daerah",
    status: "active",
    lastSync: "2 jam yang lalu",
    dataPoints: 1250,
  },
  {
    id: "2",
    name: "Sistem Informasi Kepegawaian",
    description: "Pengelolaan data pegawai dan struktur organisasi",
    status: "active",
    lastSync: "1 jam yang lalu",
    dataPoints: 850,
  },
  {
    id: "3",
    name: "Sistem Informasi Aset Daerah",
    description: "Pengelolaan aset dan inventaris daerah",
    status: "issue",
    lastSync: "1 hari yang lalu",
    dataPoints: 1500,
  },
  {
    id: "4",
    name: "Sistem Informasi Perencanaan Pembangunan",
    description: "Perencanaan dan monitoring pembangunan daerah",
    status: "active",
    lastSync: "3 jam yang lalu",
    dataPoints: 720,
  },
  {
    id: "5",
    name: "Sistem Informasi Pengadaan",
    description: "Pengelolaan pengadaan barang dan jasa",
    status: "pending",
    lastSync: "Belum tersinkronisasi",
    dataPoints: 0,
  },
]

const pelayananSystems = [
  {
    id: "6",
    name: "Sistem Pelayanan Terpadu",
    description: "Pelayanan administrasi terpadu untuk masyarakat",
    status: "active",
    lastSync: "30 menit yang lalu",
    dataPoints: 950,
  },
  {
    id: "7",
    name: "Sistem Informasi Kesehatan",
    description: "Pengelolaan data kesehatan dan pelayanan medis",
    status: "active",
    lastSync: "1 jam yang lalu",
    dataPoints: 1100,
  },
  {
    id: "8",
    name: "Sistem Informasi Pendidikan",
    description: "Pengelolaan data pendidikan dan sekolah",
    status: "active",
    lastSync: "2 jam yang lalu",
    dataPoints: 780,
  },
  {
    id: "9",
    name: "Sistem Informasi Perizinan",
    description: "Pengelolaan perizinan dan dokumentasi",
    status: "issue",
    lastSync: "5 jam yang lalu",
    dataPoints: 650,
  },
  {
    id: "10",
    name: "Sistem Pengaduan Masyarakat",
    description: "Pengelolaan pengaduan dan aspirasi masyarakat",
    status: "active",
    lastSync: "45 menit yang lalu",
    dataPoints: 320,
  },
]

const otherSystems = [
  {
    id: "11",
    name: "Sistem Informasi Geografis",
    description: "Pengelolaan data spasial dan pemetaan wilayah",
    status: "active",
    lastSync: "4 jam yang lalu",
    dataPoints: 1450,
  },
  {
    id: "12",
    name: "Sistem Monitoring Pembangunan",
    description: "Pemantauan proyek pembangunan daerah",
    status: "active",
    lastSync: "2 jam yang lalu",
    dataPoints: 580,
  },
  {
    id: "13",
    name: "Sistem Informasi Kebencanaan",
    description: "Pengelolaan informasi dan mitigasi bencana",
    status: "pending",
    lastSync: "Belum tersinkronisasi",
    dataPoints: 0,
  },
  {
    id: "14",
    name: "Sistem Informasi Statistik Daerah",
    description: "Pengelolaan data statistik dan indikator daerah",
    status: "pending",
    lastSync: "Belum tersinkronisasi",
    dataPoints: 0,
  },
  {
    id: "15",
    name: "Sistem Informasi Transportasi",
    description: "Pengelolaan data transportasi dan lalu lintas",
    status: "active",
    lastSync: "3 jam yang lalu",
    dataPoints: 890,
  },
]

export function IntegrasiSistem() {
  const [syncingSystem, setSyncingSystem] = useState<string | null>(null)
  const [configuringSystem, setConfiguringSystem] = useState<string | null>(null)

  const handleSync = async (systemId: string) => {
    setSyncingSystem(systemId)
    // Simulasi sinkronisasi
    await new Promise((resolve) => setTimeout(resolve, 1500))
    toast({
      title: "Sinkronisasi berhasil",
      description: "Data sistem telah berhasil disinkronisasi.",
    })
    setSyncingSystem(null)
  }

  const handleConfigure = (systemId: string) => {
    setConfiguringSystem(systemId)
    // Simulasi konfigurasi
    setTimeout(() => {
      toast({
        title: "Konfigurasi sistem",
        description: "Pengaturan sistem telah diperbarui.",
      })
      setConfiguringSystem(null)
    }, 500)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sistem Terintegrasi</CardTitle>
        <CardDescription>Status integrasi dengan berbagai sistem kota</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="administrasi" className="space-y-4">
          <TabsList>
            <TabsTrigger value="administrasi">Administrasi</TabsTrigger>
            <TabsTrigger value="pelayanan">Pelayanan Publik</TabsTrigger>
            <TabsTrigger value="lainnya">Lainnya</TabsTrigger>
          </TabsList>
          <TabsContent value="administrasi">
            <div className="space-y-4">
              {administrasiSystems.map((system) => (
                <div key={system.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{system.name}</h3>
                      <Badge
                        variant={
                          system.status === "active" ? "default" : system.status === "issue" ? "destructive" : "outline"
                        }
                      >
                        {system.status === "active" ? (
                          <CheckCircle className="mr-1 h-3 w-3" />
                        ) : system.status === "issue" ? (
                          <AlertCircle className="mr-1 h-3 w-3" />
                        ) : (
                          <Clock className="mr-1 h-3 w-3" />
                        )}
                        {system.status === "active" ? "Aktif" : system.status === "issue" ? "Bermasalah" : "Menunggu"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{system.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Sinkronisasi terakhir: {system.lastSync}</span>
                      <span>Data points: {system.dataPoints}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSync(system.id)}
                      disabled={syncingSystem === system.id}
                    >
                      <RefreshCw className={`mr-2 h-3 w-3 ${syncingSystem === system.id ? "animate-spin" : ""}`} />
                      {syncingSystem === system.id ? "Sinkronisasi..." : "Sinkronisasi"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConfigure(system.id)}
                      disabled={configuringSystem === system.id}
                    >
                      <Settings className="mr-2 h-3 w-3" />
                      Konfigurasi
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="pelayanan">
            <div className="space-y-4">
              {pelayananSystems.map((system) => (
                <div key={system.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{system.name}</h3>
                      <Badge
                        variant={
                          system.status === "active" ? "default" : system.status === "issue" ? "destructive" : "outline"
                        }
                      >
                        {system.status === "active" ? (
                          <CheckCircle className="mr-1 h-3 w-3" />
                        ) : system.status === "issue" ? (
                          <AlertCircle className="mr-1 h-3 w-3" />
                        ) : (
                          <Clock className="mr-1 h-3 w-3" />
                        )}
                        {system.status === "active" ? "Aktif" : system.status === "issue" ? "Bermasalah" : "Menunggu"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{system.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Sinkronisasi terakhir: {system.lastSync}</span>
                      <span>Data points: {system.dataPoints}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSync(system.id)}
                      disabled={syncingSystem === system.id}
                    >
                      <RefreshCw className={`mr-2 h-3 w-3 ${syncingSystem === system.id ? "animate-spin" : ""}`} />
                      {syncingSystem === system.id ? "Sinkronisasi..." : "Sinkronisasi"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConfigure(system.id)}
                      disabled={configuringSystem === system.id}
                    >
                      <Settings className="mr-2 h-3 w-3" />
                      Konfigurasi
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="lainnya">
            <div className="space-y-4">
              {otherSystems.map((system) => (
                <div key={system.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{system.name}</h3>
                      <Badge
                        variant={
                          system.status === "active" ? "default" : system.status === "issue" ? "destructive" : "outline"
                        }
                      >
                        {system.status === "active" ? (
                          <CheckCircle className="mr-1 h-3 w-3" />
                        ) : system.status === "issue" ? (
                          <AlertCircle className="mr-1 h-3 w-3" />
                        ) : (
                          <Clock className="mr-1 h-3 w-3" />
                        )}
                        {system.status === "active" ? "Aktif" : system.status === "issue" ? "Bermasalah" : "Menunggu"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{system.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Sinkronisasi terakhir: {system.lastSync}</span>
                      <span>Data points: {system.dataPoints}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSync(system.id)}
                      disabled={syncingSystem === system.id}
                    >
                      <RefreshCw className={`mr-2 h-3 w-3 ${syncingSystem === system.id ? "animate-spin" : ""}`} />
                      {syncingSystem === system.id ? "Sinkronisasi..." : "Sinkronisasi"}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleConfigure(system.id)}
                      disabled={configuringSystem === system.id}
                    >
                      <Settings className="mr-2 h-3 w-3" />
                      Konfigurasi
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
