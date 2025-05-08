"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Progress } from "@/components/ui/progress"

// Sample IDM data
const idmData = {
  summary: {
    currentScore: 0.7234,
    status: "Berkembang",
    previousYears: [
      { year: 2019, score: 0.6123 },
      { year: 2020, score: 0.6456 },
      { year: 2021, score: 0.6789 },
      { year: 2022, score: 0.7012 },
      { year: 2023, score: 0.7234 },
    ],
  },
  social: {
    score: 0.7512,
    indicators: [
      { name: "Kesehatan", score: 0.82, color: "#3b82f6" },
      { name: "Pendidikan", score: 0.75, color: "#10b981" },
      { name: "Modal Sosial", score: 0.68, color: "#f59e0b" },
      { name: "Pemukiman", score: 0.71, color: "#6366f1" },
    ],
    details: [
      {
        indicator: "Kesehatan",
        score: 0.82,
        subIndicators: [
          { name: "Pelayanan Kesehatan", score: 0.85 },
          { name: "Air Bersih", score: 0.8 },
          { name: "Sanitasi", score: 0.78 },
          { name: "Jaminan Kesehatan", score: 0.85 },
        ],
      },
      {
        indicator: "Pendidikan",
        score: 0.75,
        subIndicators: [
          { name: "Akses Pendidikan Dasar", score: 0.9 },
          { name: "Akses Pendidikan Menengah", score: 0.7 },
          { name: "Akses Pendidikan Non Formal", score: 0.65 },
        ],
      },
      {
        indicator: "Modal Sosial",
        score: 0.68,
        subIndicators: [
          { name: "Solidaritas Sosial", score: 0.75 },
          { name: "Toleransi", score: 0.8 },
          { name: "Rasa Aman", score: 0.65 },
          { name: "Kesejahteraan Sosial", score: 0.52 },
        ],
      },
      {
        indicator: "Pemukiman",
        score: 0.71,
        subIndicators: [
          { name: "Akses Listrik", score: 0.95 },
          { name: "Akses Informasi", score: 0.65 },
          { name: "Perumahan", score: 0.6 },
        ],
      },
    ],
  },
  economic: {
    score: 0.6821,
    indicators: [
      { name: "Keragaman Produksi", score: 0.65, color: "#ec4899" },
      { name: "Perdagangan", score: 0.72, color: "#8b5cf6" },
      { name: "Akses Distribusi", score: 0.7, color: "#14b8a6" },
      { name: "Akses Kredit", score: 0.62, color: "#f43f5e" },
    ],
    details: [
      {
        indicator: "Keragaman Produksi",
        score: 0.65,
        subIndicators: [
          { name: "Pertanian", score: 0.75 },
          { name: "Peternakan", score: 0.6 },
          { name: "Perikanan", score: 0.55 },
          { name: "Industri Kecil", score: 0.7 },
        ],
      },
      {
        indicator: "Perdagangan",
        score: 0.72,
        subIndicators: [
          { name: "Toko/Warung", score: 0.85 },
          { name: "Pasar", score: 0.65 },
          { name: "Akses Pasar", score: 0.65 },
        ],
      },
      {
        indicator: "Akses Distribusi",
        score: 0.7,
        subIndicators: [
          { name: "Jalan Desa", score: 0.75 },
          { name: "Transportasi Umum", score: 0.65 },
        ],
      },
      {
        indicator: "Akses Kredit",
        score: 0.62,
        subIndicators: [
          { name: "Lembaga Keuangan", score: 0.6 },
          { name: "Pinjaman Modal", score: 0.65 },
        ],
      },
    ],
  },
  environmental: {
    score: 0.7368,
    indicators: [
      { name: "Kualitas Lingkungan", score: 0.78, color: "#22c55e" },
      { name: "Potensi Bencana", score: 0.65, color: "#ef4444" },
      { name: "Tanggap Bencana", score: 0.75, color: "#0ea5e9" },
    ],
    details: [
      {
        indicator: "Kualitas Lingkungan",
        score: 0.78,
        subIndicators: [
          { name: "Pencemaran Air", score: 0.8 },
          { name: "Pencemaran Udara", score: 0.85 },
          { name: "Pengelolaan Sampah", score: 0.7 },
        ],
      },
      {
        indicator: "Potensi Bencana",
        score: 0.65,
        subIndicators: [
          { name: "Banjir", score: 0.6 },
          { name: "Longsor", score: 0.7 },
          { name: "Kekeringan", score: 0.65 },
        ],
      },
      {
        indicator: "Tanggap Bencana",
        score: 0.75,
        subIndicators: [
          { name: "Sistem Peringatan Dini", score: 0.7 },
          { name: "Jalur Evakuasi", score: 0.75 },
          { name: "Tim Tanggap Bencana", score: 0.8 },
        ],
      },
    ],
  },
}

export default function IDMPage() {
  const [selectedYear, setSelectedYear] = useState("2023")

  // Format score to percentage
  const formatScore = (score: number) => {
    return `${(score * 100).toFixed(2)}%`
  }

  // Get status color based on score
  const getStatusColor = (score: number) => {
    if (score >= 0.8) return "text-green-600"
    if (score >= 0.7) return "text-emerald-600"
    if (score >= 0.6) return "text-blue-600"
    if (score >= 0.5) return "text-yellow-600"
    return "text-red-600"
  }

  // Get status text based on score
  const getStatusText = (score: number) => {
    if (score >= 0.8) return "Mandiri"
    if (score >= 0.7) return "Maju"
    if (score >= 0.6) return "Berkembang"
    if (score >= 0.5) return "Tertinggal"
    return "Sangat Tertinggal"
  }

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tighter mb-2">Indeks Desa Membangun (IDM)</h1>
      <p className="text-muted-foreground mb-6">
        Data perkembangan pembangunan Desa Pao-Pao berdasarkan Indeks Desa Membangun
      </p>

      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold">
            Skor IDM:{" "}
            <span className={getStatusColor(idmData.summary.currentScore)}>
              {formatScore(idmData.summary.currentScore)}
            </span>
          </h2>
          <p className="text-muted-foreground">
            Status: <span className="font-medium">{getStatusText(idmData.summary.currentScore)}</span>
          </p>
        </div>
        <Select value={selectedYear} onValueChange={setSelectedYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Tahun" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023">Tahun 2023</SelectItem>
            <SelectItem value="2022">Tahun 2022</SelectItem>
            <SelectItem value="2021">Tahun 2021</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Perkembangan Skor IDM (5 Tahun Terakhir)</CardTitle>
          <CardDescription>Tren perkembangan Indeks Desa Membangun dari tahun ke tahun</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer>
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={idmData.summary.previousYears}>
                    <XAxis dataKey="year" />
                    <YAxis domain={[0.5, 0.8]} />
                    <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </LineChart>
                </ResponsiveContainer>
              </Chart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="social" className="mb-10">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="social">Ketahanan Sosial</TabsTrigger>
          <TabsTrigger value="economic">Ketahanan Ekonomi</TabsTrigger>
          <TabsTrigger value="environmental">Ketahanan Lingkungan</TabsTrigger>
        </TabsList>

        <TabsContent value="social" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Indeks Ketahanan Sosial</CardTitle>
              <CardDescription>
                Skor: <span className="font-medium">{formatScore(idmData.social.score)}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-80">
                  <ChartContainer>
                    <Chart>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={idmData.social.indicators}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="score"
                            nameKey="name"
                          >
                            {idmData.social.indicators.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </Chart>
                  </ChartContainer>
                </div>

                <div className="space-y-6">
                  {idmData.social.details.map((detail, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{detail.indicator}</h4>
                        <span className="text-sm font-medium">{formatScore(detail.score)}</span>
                      </div>
                      <Progress value={detail.score * 100} className="h-2 mb-4" />
                      <div className="space-y-2">
                        {detail.subIndicators.map((sub, subIndex) => (
                          <div key={subIndex} className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">{sub.name}</span>
                            <span>{formatScore(sub.score)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="economic" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Indeks Ketahanan Ekonomi</CardTitle>
              <CardDescription>
                Skor: <span className="font-medium">{formatScore(idmData.economic.score)}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-80">
                  <ChartContainer>
                    <Chart>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={idmData.economic.indicators}>
                          <XAxis dataKey="name" />
                          <YAxis domain={[0, 1]} />
                          <Bar dataKey="score" fill="#8884d8">
                            {idmData.economic.indicators.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </BarChart>
                      </ResponsiveContainer>
                    </Chart>
                  </ChartContainer>
                </div>

                <div className="space-y-6">
                  {idmData.economic.details.map((detail, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{detail.indicator}</h4>
                        <span className="text-sm font-medium">{formatScore(detail.score)}</span>
                      </div>
                      <Progress value={detail.score * 100} className="h-2 mb-4" />
                      <div className="space-y-2">
                        {detail.subIndicators.map((sub, subIndex) => (
                          <div key={subIndex} className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">{sub.name}</span>
                            <span>{formatScore(sub.score)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="environmental" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Indeks Ketahanan Lingkungan</CardTitle>
              <CardDescription>
                Skor: <span className="font-medium">{formatScore(idmData.environmental.score)}</span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-80">
                  <ChartContainer>
                    <Chart>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={idmData.environmental.indicators} layout="vertical">
                          <XAxis type="number" domain={[0, 1]} />
                          <YAxis type="category" dataKey="name" width={150} />
                          <Bar dataKey="score" fill="#8884d8">
                            {idmData.environmental.indicators.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </BarChart>
                      </ResponsiveContainer>
                    </Chart>
                  </ChartContainer>
                </div>

                <div className="space-y-6">
                  {idmData.environmental.details.map((detail, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{detail.indicator}</h4>
                        <span className="text-sm font-medium">{formatScore(detail.score)}</span>
                      </div>
                      <Progress value={detail.score * 100} className="h-2 mb-4" />
                      <div className="space-y-2">
                        {detail.subIndicators.map((sub, subIndex) => (
                          <div key={subIndex} className="flex justify-between items-center text-sm">
                            <span className="text-muted-foreground">{sub.name}</span>
                            <span>{formatScore(sub.score)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
