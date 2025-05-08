"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useState } from "react"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

// Sample stunting data
const stuntingData = {
  summary: {
    total: 85,
    percentage: 5.2,
    byGender: [
      { name: "Laki-laki", value: 45, color: "#3b82f6" },
      { name: "Perempuan", value: 40, color: "#ec4899" },
    ],
    byAge: [
      { name: "0-1 tahun", value: 15, color: "#10b981" },
      { name: "1-2 tahun", value: 25, color: "#f59e0b" },
      { name: "2-3 tahun", value: 20, color: "#6366f1" },
      { name: "3-5 tahun", value: 25, color: "#ef4444" },
    ],
  },
  trend: [
    { year: "2018", value: 120 },
    { year: "2019", value: 110 },
    { year: "2020", value: 100 },
    { year: "2021", value: 95 },
    { year: "2022", value: 90 },
    { year: "2023", value: 85 },
  ],
  byDusun: [
    { name: "Dusun Pao Utara", value: 25 },
    { name: "Dusun Pao Selatan", value: 20 },
    { name: "Dusun Pao Timur", value: 15 },
    { name: "Dusun Pao Barat", value: 25 },
  ],
  interventions: [
    {
      title: "Program 1000 Hari Pertama Kehidupan",
      description: "Program pemberian makanan tambahan untuk ibu hamil dan balita.",
      target: 50,
      achieved: 45,
    },
    {
      title: "Posyandu Balita Rutin",
      description: "Pemantauan pertumbuhan dan perkembangan balita secara rutin.",
      target: 100,
      achieved: 85,
    },
    {
      title: "Penyuluhan Gizi Keluarga",
      description: "Edukasi tentang pola makan sehat dan gizi seimbang untuk keluarga.",
      target: 75,
      achieved: 60,
    },
    {
      title: "Pemberian Vitamin A",
      description: "Pemberian suplemen vitamin A untuk balita.",
      target: 100,
      achieved: 95,
    },
  ],
}

export default function StuntingPage() {
  const [selectedYear, setSelectedYear] = useState("2023")

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tighter mb-2">Data Stunting Desa Pao-Pao</h1>
      <p className="text-muted-foreground mb-6">Informasi dan upaya pencegahan stunting di Desa Pao-Pao</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Kasus Stunting</CardTitle>
            <CardDescription>Tahun 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stuntingData.summary.total}</div>
            <p className="text-muted-foreground">Anak</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Persentase Stunting</CardTitle>
            <CardDescription>Dari total balita</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{stuntingData.summary.percentage}%</div>
            <p className="text-muted-foreground">Dari total balita di desa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tren Stunting</CardTitle>
            <CardDescription>5 tahun terakhir</CardDescription>
          </CardHeader>
          <CardContent className="h-20">
            <ChartContainer>
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={stuntingData.trend}>
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 0 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </LineChart>
                </ResponsiveContainer>
              </Chart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="summary" className="mb-10">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="summary">Ringkasan</TabsTrigger>
          <TabsTrigger value="distribution">Distribusi</TabsTrigger>
          <TabsTrigger value="interventions">Intervensi</TabsTrigger>
        </TabsList>

        <TabsContent value="summary" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Kasus Stunting Berdasarkan Jenis Kelamin</CardTitle>
                <CardDescription>Tahun 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer>
                    <Chart>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={stuntingData.summary.byGender}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {stuntingData.summary.byGender.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </Chart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Kasus Stunting Berdasarkan Kelompok Usia</CardTitle>
                <CardDescription>Tahun 2023</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer>
                    <Chart>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={stuntingData.summary.byAge}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {stuntingData.summary.byAge.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </Chart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Tren Kasus Stunting (5 Tahun Terakhir)</CardTitle>
              <CardDescription>Perkembangan jumlah kasus stunting dari tahun ke tahun</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer>
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={stuntingData.trend}>
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Chart>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribusi Kasus Stunting Berdasarkan Wilayah</CardTitle>
              <CardDescription>Persebaran kasus stunting di setiap dusun</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer>
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={stuntingData.byDusun}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Chart>
                </ChartContainer>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                {stuntingData.byDusun.map((dusun, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{dusun.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Jumlah Kasus:</span>
                        <span className="text-xl font-bold">{dusun.value}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-muted-foreground">Persentase:</span>
                        <span className="text-lg font-medium">
                          {((dusun.value / stuntingData.summary.total) * 100).toFixed(1)}%
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="interventions" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Program Intervensi Stunting</CardTitle>
              <CardDescription>Program-program yang dilakukan untuk mengatasi stunting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {stuntingData.interventions.map((program, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="text-lg">{program.title}</CardTitle>
                      <CardDescription>{program.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Target: {program.target} anak</span>
                            <span className="text-sm font-medium">
                              {Math.round((program.achieved / program.target) * 100)}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-2.5">
                            <div
                              className="bg-primary h-2.5 rounded-full"
                              style={{ width: `${(program.achieved / program.target) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-muted-foreground">Tercapai:</span>
                          <span className="font-medium">{program.achieved} anak</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
