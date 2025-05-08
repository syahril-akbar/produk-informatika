"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

const serviceStatuses = [
  {
    title: "Layanan Aktif",
    description: "Layanan yang sedang diproses",
    value: 42,
    icon: Clock,
    color: "text-yellow-500",
  },
  {
    title: "Layanan Selesai",
    description: "Layanan yang telah diselesaikan",
    value: 180,
    icon: CheckCircle,
    color: "text-green-500",
  },
  {
    title: "Layanan Tertunda",
    description: "Layanan yang tertunda atau bermasalah",
    value: 8,
    icon: AlertCircle,
    color: "text-red-500",
  },
]

export function PelayananStatus() {
  return (
    <>
      {serviceStatuses.map((status, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">{status.title}</CardTitle>
            <status.icon className={`h-4 w-4 ${status.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{status.value}</div>
            <p className="text-xs text-muted-foreground">{status.description}</p>
            <Progress value={status.value} max={230} className="mt-4" />
          </CardContent>
        </Card>
      ))}
    </>
  )
}
