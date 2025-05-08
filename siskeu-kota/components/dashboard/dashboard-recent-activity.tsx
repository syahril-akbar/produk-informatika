"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface DashboardRecentActivityProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardRecentActivity({ className, ...props }: DashboardRecentActivityProps) {
  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Aktivitas Terbaru</CardTitle>
        <CardDescription>Aktivitas terbaru dalam sistem keuangan kota</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-8">
          <div className="flex items-center">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Laporan Keuangan Triwulan II Dipublikasikan</p>
              <p className="text-sm text-muted-foreground">Oleh: Admin Keuangan</p>
              <div className="flex items-center pt-2">
                <Badge variant="outline" className="mr-2">
                  Laporan
                </Badge>
                <span className="text-xs text-muted-foreground">2 jam yang lalu</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Anggaran Sektor Pendidikan Diperbarui</p>
              <p className="text-sm text-muted-foreground">Oleh: Kepala Dinas Pendidikan</p>
              <div className="flex items-center pt-2">
                <Badge variant="outline" className="mr-2">
                  Anggaran
                </Badge>
                <span className="text-xs text-muted-foreground">5 jam yang lalu</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Integrasi dengan Sistem Pelayanan Publik Selesai</p>
              <p className="text-sm text-muted-foreground">Oleh: Tim IT</p>
              <div className="flex items-center pt-2">
                <Badge variant="outline" className="mr-2">
                  Integrasi
                </Badge>
                <span className="text-xs text-muted-foreground">1 hari yang lalu</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Pencairan Dana Infrastruktur Jalan</p>
              <p className="text-sm text-muted-foreground">Oleh: Bendahara Kota</p>
              <div className="flex items-center pt-2">
                <Badge variant="outline" className="mr-2">
                  Transaksi
                </Badge>
                <span className="text-xs text-muted-foreground">2 hari yang lalu</span>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">Rapat Evaluasi Anggaran Semester I</p>
              <p className="text-sm text-muted-foreground">Oleh: Walikota</p>
              <div className="flex items-center pt-2">
                <Badge variant="outline" className="mr-2">
                  Rapat
                </Badge>
                <span className="text-xs text-muted-foreground">3 hari yang lalu</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
