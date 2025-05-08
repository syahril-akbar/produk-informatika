"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function AdministrasiOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Dokumen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">128</div>
          <p className="text-xs text-muted-foreground">Dokumen yang tersimpan dalam sistem</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dokumen Aktif</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">98</div>
          <Progress value={76} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">76% dari total dokumen</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dokumen Kadaluarsa</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">30</div>
          <Progress value={24} className="mt-2" />
          <p className="text-xs text-muted-foreground mt-1">24% dari total dokumen</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Dokumen Bulan Ini</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">Dokumen yang dibuat bulan ini</p>
        </CardContent>
      </Card>
    </div>
  )
}
