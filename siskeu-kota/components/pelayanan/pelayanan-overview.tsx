"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

const performanceData = [
  {
    name: "Jan",
    "Permintaan Layanan": 120,
    "Layanan Selesai": 115,
  },
  {
    name: "Feb",
    "Permintaan Layanan": 132,
    "Layanan Selesai": 125,
  },
  {
    name: "Mar",
    "Permintaan Layanan": 145,
    "Layanan Selesai": 140,
  },
  {
    name: "Apr",
    "Permintaan Layanan": 155,
    "Layanan Selesai": 150,
  },
  {
    name: "May",
    "Permintaan Layanan": 170,
    "Layanan Selesai": 162,
  },
  {
    name: "Jun",
    "Permintaan Layanan": 185,
    "Layanan Selesai": 180,
  },
]

const categoryData = [
  {
    name: "KTP",
    value: 35,
  },
  {
    name: "KK",
    value: 25,
  },
  {
    name: "Akta",
    value: 15,
  },
  {
    name: "Perizinan",
    value: 20,
  },
  {
    name: "Lainnya",
    value: 5,
  },
]

export function PelayananOverview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ikhtisar Pelayanan Publik</CardTitle>
        <CardDescription>Statistik dan tren pelayanan publik kota</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tren">
          <TabsList className="mb-4">
            <TabsTrigger value="tren">Tren Layanan</TabsTrigger>
            <TabsTrigger value="kategori">Kategori Layanan</TabsTrigger>
          </TabsList>
          <TabsContent value="tren" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Permintaan Layanan" stroke="#8884d8" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="Layanan Selesai" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </TabsContent>
          <TabsContent value="kategori" className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Jumlah Layanan" />
              </BarChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
