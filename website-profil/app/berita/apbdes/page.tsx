"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download, FileText } from "lucide-react"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

// Sample APBDes data
const apbdesData = {
  2023: {
    pendapatan: [
      { name: "Dana Desa", value: 1200000000, color: "#3b82f6" },
      { name: "Alokasi Dana Desa", value: 800000000, color: "#10b981" },
      { name: "Bagi Hasil Pajak", value: 300000000, color: "#f59e0b" },
      { name: "Pendapatan Asli Desa", value: 150000000, color: "#6366f1" },
    ],
    belanja: [
      { name: "Bidang Penyelenggaraan Pemerintahan", value: 600000000 },
      { name: "Bidang Pelaksanaan Pembangunan", value: 1000000000 },
      { name: "Bidang Pembinaan Kemasyarakatan", value: 400000000 },
      { name: "Bidang Pemberdayaan Masyarakat", value: 350000000 },
      { name: "Bidang Penanggulangan Bencana", value: 100000000 },
    ],
    pembiayaan: {
      penerimaan: 200000000,
      pengeluaran: 150000000,
    },
    dokumen: [
      { name: "Perdes APBDes 2023", file: "#" },
      { name: "Laporan Realisasi APBDes Semester 1", file: "#" },
      { name: "Laporan Realisasi APBDes Tahunan", file: "#" },
    ],
  },
  2022: {
    pendapatan: [
      { name: "Dana Desa", value: 1100000000, color: "#3b82f6" },
      { name: "Alokasi Dana Desa", value: 750000000, color: "#10b981" },
      { name: "Bagi Hasil Pajak", value: 280000000, color: "#f59e0b" },
      { name: "Pendapatan Asli Desa", value: 120000000, color: "#6366f1" },
    ],
    belanja: [
      { name: "Bidang Penyelenggaraan Pemerintahan", value: 550000000 },
      { name: "Bidang Pelaksanaan Pembangunan", value: 900000000 },
      { name: "Bidang Pembinaan Kemasyarakatan", value: 350000000 },
      { name: "Bidang Pemberdayaan Masyarakat", value: 300000000 },
      { name: "Bidang Penanggulangan Bencana", value: 80000000 },
    ],
    pembiayaan: {
      penerimaan: 180000000,
      pengeluaran: 130000000,
    },
    dokumen: [
      { name: "Perdes APBDes 2022", file: "#" },
      { name: "Laporan Realisasi APBDes Semester 1", file: "#" },
      { name: "Laporan Realisasi APBDes Semester 2", file: "#" },
      { name: "Laporan Realisasi APBDes Tahunan", file: "#" },
    ],
  },
}

export default function ApbdesPage() {
  const [selectedYear, setSelectedYear] = useState("2023")
  const data = apbdesData[selectedYear as keyof typeof apbdesData]

  const totalPendapatan = data.pendapatan.reduce((sum, item) => sum + item.value, 0)
  const totalBelanja = data.belanja.reduce((sum, item) => sum + item.value, 0)
  const selisih = totalPendapatan - totalBelanja

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tighter mb-2">Anggaran Pendapatan dan Belanja Desa</h1>
      <p className="text-muted-foreground mb-6">Transparansi pengelolaan keuangan Desa Pao-Pao</p>

      <div className="flex justify-between items-center mb-6">
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Tahun" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023">Tahun 2023</SelectItem>
            <SelectItem value="2022">Tahun 2022</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Pendapatan</CardTitle>
            <CardDescription>Tahun {selectedYear}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalPendapatan.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Belanja</CardTitle>
            <CardDescription>Tahun {selectedYear}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {totalBelanja.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Surplus/Defisit</CardTitle>
            <CardDescription>Tahun {selectedYear}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${selisih >= 0 ? "text-green-600" : "text-red-600"}`}>
              {selisih.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pendapatan" className="mb-10">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pendapatan">Pendapatan</TabsTrigger>
          <TabsTrigger value="belanja">Belanja</TabsTrigger>
          <TabsTrigger value="dokumen">Dokumen</TabsTrigger>
        </TabsList>

        <TabsContent value="pendapatan" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Rincian Pendapatan Desa</CardTitle>
              <CardDescription>Tahun Anggaran {selectedYear}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-80">
                  <ChartContainer>
                    <Chart>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={data.pendapatan}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {data.pendapatan.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </Chart>
                  </ChartContainer>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Rincian Pendapatan</h3>
                  <div className="space-y-4">
                    {data.pendapatan.map((item, index) => (
                      <div key={index} className="flex justify-between border-b pb-2">
                        <span>{item.name}</span>
                        <span className="font-medium">
                          {item.value.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-2 font-bold">
                      <span>Total Pendapatan</span>
                      <span>{totalPendapatan.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="belanja" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Rincian Belanja Desa</CardTitle>
              <CardDescription>Tahun Anggaran {selectedYear}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-80">
                  <ChartContainer>
                    <Chart>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data.belanja}>
                          <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </BarChart>
                      </ResponsiveContainer>
                    </Chart>
                  </ChartContainer>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Rincian Belanja</h3>
                  <div className="space-y-4">
                    {data.belanja.map((item, index) => (
                      <div key={index} className="flex justify-between border-b pb-2">
                        <span>{item.name}</span>
                        <span className="font-medium">
                          {item.value.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
                        </span>
                      </div>
                    ))}
                    <div className="flex justify-between pt-2 font-bold">
                      <span>Total Belanja</span>
                      <span>{totalBelanja.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="dokumen" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Dokumen APBDes</CardTitle>
              <CardDescription>Tahun Anggaran {selectedYear}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {data.dokumen.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between border p-4 rounded-lg">
                    <div className="flex items-center">
                      <FileText className="h-6 w-6 mr-3 text-primary" />
                      <span>{doc.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Lihat
                      </Button>
                      <Button size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Unduh
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
