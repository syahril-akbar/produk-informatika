"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts"

const syncData = [
  { time: "00:00", count: 120 },
  { time: "02:00", count: 90 },
  { time: "04:00", count: 75 },
  { time: "06:00", count: 110 },
  { time: "08:00", count: 180 },
  { time: "10:00", count: 210 },
  { time: "12:00", count: 185 },
  { time: "14:00", count: 195 },
  { time: "16:00", count: 220 },
  { time: "18:00", count: 170 },
  { time: "20:00", count: 130 },
  { time: "22:00", count: 95 },
]

const dataPointsPerSystem = [
  { name: "Keuangan", value: 1250 },
  { name: "Kepegawaian", value: 850 },
  { name: "Aset", value: 1500 },
  { name: "Pelayanan", value: 950 },
  { name: "Kesehatan", value: 1100 },
  { name: "Pendidikan", value: 780 },
]

export function IntegrasiStatus() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Status Sinkronisasi</CardTitle>
          <CardDescription>Aktivitas sinkronisasi data dalam 24 jam terakhir</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={syncData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" name="Jumlah Sinkronisasi" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Data Points per Sistem</CardTitle>
          <CardDescription>Jumlah data yang terintegrasi per sistem</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={dataPointsPerSystem} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" name="Data Points" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
