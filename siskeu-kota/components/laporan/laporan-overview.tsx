"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { FileText, CheckCircle, Clock, AlertCircle } from "lucide-react"

export function LaporanOverview() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Laporan</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">24</div>
          <p className="text-xs text-muted-foreground">Laporan tahun 2023</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Laporan Terpublikasi</CardTitle>
          <CheckCircle className="h-4 w-4 text-emerald-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">18</div>
          <div className="mt-2">
            <Progress value={75} className="h-2" />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">75% dari total laporan</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Laporan Tertunda</CardTitle>
          <Clock className="h-4 w-4 text-amber-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">4</div>
          <div className="mt-2">
            <Progress value={16.7} className="h-2" />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">16.7% dari total laporan</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Laporan Bermasalah</CardTitle>
          <AlertCircle className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">2</div>
          <div className="mt-2">
            <Progress value={8.3} className="h-2" />
          </div>
          <p className="mt-1 text-xs text-muted-foreground">8.3% dari total laporan</p>
        </CardContent>
      </Card>
    </div>
  )
}
