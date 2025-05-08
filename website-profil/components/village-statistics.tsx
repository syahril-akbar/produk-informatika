"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis } from "recharts"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Info, Download } from "lucide-react"

// Population data by age and gender for the pyramid chart
const populationByAgeGender = [
  { ageGroup: "0-4", male: 184, female: 164 },
  { ageGroup: "5-9", male: 187, female: 221 },
  { ageGroup: "10-14", male: 207, female: 204 },
  { ageGroup: "15-19", male: 211, female: 180 },
  { ageGroup: "20-24", male: 179, female: 191 },
  { ageGroup: "25-29", male: 190, female: 145 },
  { ageGroup: "30-34", male: 153, female: 165 },
  { ageGroup: "35-39", male: 164, female: 150 },
  { ageGroup: "40-44", male: 162, female: 165 },
  { ageGroup: "45-49", male: 146, female: 139 },
  { ageGroup: "50-54", male: 120, female: 150 },
  { ageGroup: "55-59", male: 96, female: 125 },
  { ageGroup: "60-64", male: 63, female: 82 },
  { ageGroup: "65-69", male: 53, female: 70 },
  { ageGroup: "70-74", male: 42, female: 52 },
  { ageGroup: "75-79", male: 20, female: 36 },
  { ageGroup: "80-84", male: 12, female: 18 },
  { ageGroup: "85+", male: 10, female: 18 },
]

// Transform data for the pyramid chart
const pyramidData = populationByAgeGender.map((item) => ({
  ageGroup: item.ageGroup,
  male: -item.male, // Negative values for males to display on the left
  female: item.female,
}))

const populationData = [
  { name: "Laki-laki", value: 4300, color: "#2563eb", percentage: "50.6%" },
  { name: "Perempuan", value: 4200, color: "#ec4899", percentage: "49.4%" },
]

const ageData = [
  { name: "0-14 tahun", value: 2100, color: "#22c55e", percentage: "24.7%" },
  { name: "15-64 tahun", value: 5600, color: "#eab308", percentage: "65.9%" },
  { name: "65+ tahun", value: 800, color: "#ef4444", percentage: "9.4%" },
]

// Trend data for 5 years
const populationTrend = [
  { year: "2019", total: 8100, male: 4050, female: 4050 },
  { year: "2020", total: 8200, male: 4100, female: 4100 },
  { year: "2021", total: 8300, male: 4150, female: 4150 },
  { year: "2022", total: 8400, male: 4200, female: 4200 },
  { year: "2023", total: 8500, male: 4300, female: 4200 },
]

const educationData = [
  { name: "Tidak Sekolah", value: 450, percentage: "5.3%" },
  { name: "SD", value: 2500, percentage: "29.4%" },
  { name: "SMP", value: 2200, percentage: "25.9%" },
  { name: "SMA", value: 2000, percentage: "23.5%" },
  { name: "Diploma", value: 800, percentage: "9.4%" },
  { name: "Sarjana", value: 700, percentage: "8.2%" },
  { name: "Pascasarjana", value: 300, percentage: "3.5%" },
]

const occupationData = [
  { name: "Petani", value: 2800, percentage: "32.9%" },
  { name: "Pedagang", value: 1500, percentage: "17.6%" },
  { name: "PNS", value: 800, percentage: "9.4%" },
  { name: "Swasta", value: 1200, percentage: "14.1%" },
  { name: "Lainnya", value: 2200, percentage: "25.9%" },
]

// Religious data
const religionData = [
  { name: "Islam", value: 7820, percentage: "92%" },
  { name: "Kristen", value: 425, percentage: "5%" },
  { name: "Katolik", value: 170, percentage: "2%" },
  { name: "Hindu", value: 68, percentage: "0.8%" },
  { name: "Buddha", value: 17, percentage: "0.2%" },
]

// Income level data
const incomeData = [
  { name: "< 1 juta", value: 1200, percentage: "14.1%" },
  { name: "1-2 juta", value: 3500, percentage: "41.2%" },
  { name: "2-3 juta", value: 2100, percentage: "24.7%" },
  { name: "3-5 juta", value: 1300, percentage: "15.3%" },
  { name: "> 5 juta", value: 400, percentage: "4.7%" },
]

export default function VillageStatistics() {
  const [year, setYear] = useState("2023")
  const [showInfo, setShowInfo] = useState<string | null>(null)

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Visualisasi Data Desa</h3>
        <Select value={year} onValueChange={setYear}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih Tahun" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="2023">Tahun 2023</SelectItem>
            <SelectItem value="2022">Tahun 2022</SelectItem>
            <SelectItem value="2021">Tahun 2021</SelectItem>
            <SelectItem value="2020">Tahun 2020</SelectItem>
            <SelectItem value="2019">Tahun 2019</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              Total Penduduk
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setShowInfo(showInfo === "population" ? null : "population")}
              >
                <Info className="h-4 w-4" />
                <span className="sr-only">Info total penduduk</span>
              </Button>
            </CardTitle>
            <CardDescription>Tahun {year}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">8.500</div>
            <p className="text-muted-foreground">Jiwa</p>
            {showInfo === "population" && (
              <div className="mt-2 text-xs bg-muted p-2 rounded-md">
                Data diperbarui pada 31 Desember 2023. Peningkatan 1.2% dari tahun sebelumnya.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              Jumlah Rumah Tangga
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setShowInfo(showInfo === "households" ? null : "households")}
              >
                <Info className="h-4 w-4" />
                <span className="sr-only">Info jumlah rumah tangga</span>
              </Button>
            </CardTitle>
            <CardDescription>Tahun {year}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">2.100</div>
            <p className="text-muted-foreground">Rumah Tangga</p>
            {showInfo === "households" && (
              <div className="mt-2 text-xs bg-muted p-2 rounded-md">
                Rata-rata 4 orang per rumah tangga. Peningkatan 0.8% dari tahun sebelumnya.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center justify-between">
              Laju Pertumbuhan
              <Button
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setShowInfo(showInfo === "growth" ? null : "growth")}
              >
                <Info className="h-4 w-4" />
                <span className="sr-only">Info laju pertumbuhan</span>
              </Button>
            </CardTitle>
            <CardDescription>Per tahun</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600">1.2%</div>
            <p className="text-muted-foreground">Pertumbuhan tahunan</p>
            {showInfo === "growth" && (
              <div className="mt-2 text-xs bg-muted p-2 rounded-md">
                Lebih tinggi dari rata-rata nasional (0.9%) dan rata-rata provinsi (1.0%).
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Main Statistics Tabs */}
      <Tabs defaultValue="population" className="w-full">
        <TabsList className="w-full grid grid-cols-2 md:grid-cols-5 mb-6">
          <TabsTrigger value="population">Populasi</TabsTrigger>
          <TabsTrigger value="trends">Tren & Proyeksi</TabsTrigger>
          <TabsTrigger value="education">Pendidikan</TabsTrigger>
          <TabsTrigger value="occupation">Ekonomi</TabsTrigger>
          <TabsTrigger value="social">Sosial</TabsTrigger>
        </TabsList>

        {/* Population Tab */}
        <TabsContent value="population" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Jumlah Penduduk Berdasarkan Kelompok Umur & Jenis Kelamin
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  Unduh Data
                </Button>
              </CardTitle>
              <CardDescription>
                Piramida penduduk menunjukkan distribusi penduduk berdasarkan usia dan jenis kelamin
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[600px]">
                <div className="flex justify-center items-center gap-8 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#4ade80]"></div>
                    <span>Laki-Laki (4.300 jiwa)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#fb923c]"></div>
                    <span>Perempuan (4.200 jiwa)</span>
                  </div>
                </div>

                <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={pyramidData} margin={{ top: 20, right: 30, left: 50, bottom: 5 }}>
                    <XAxis type="number" tickFormatter={(value) => `${Math.abs(value)}`} />
                    <YAxis type="category" dataKey="ageGroup" width={40} />
                    <ChartTooltip
                      formatter={(value: number, name: string) => {
                        return [Math.abs(value), name === "male" ? "Laki-laki" : "Perempuan"]
                      }}
                    />
                    <Bar dataKey="male" name="Laki-laki" fill="#4ade80" radius={[4, 0, 0, 4]} />
                    <Bar dataKey="female" name="Perempuan" fill="#fb923c" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Interpretasi Data:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Kelompok usia produktif (15-64 tahun) mendominasi struktur penduduk desa sebesar 65.9%</li>
                  <li>
                    Jumlah penduduk laki-laki dan perempuan cukup seimbang dengan rasio jenis kelamin 102.4 (laki-laki
                    per 100 perempuan)
                  </li>
                  <li>Terdapat potensi bonus demografi dengan tingginya persentase penduduk usia produktif</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Penduduk Berdasarkan Jenis Kelamin</CardTitle>
                <CardDescription>Total: 8.500 jiwa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 mb-6">
                  <ChartContainer>
                    <Chart>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={populationData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {populationData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </Chart>
                  </ChartContainer>
                </div>

                {populationData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between mb-2 last:mb-0">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.value.toLocaleString()}</span>
                      <span className="text-muted-foreground text-sm">({item.percentage})</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Penduduk Berdasarkan Kelompok Usia</CardTitle>
                <CardDescription>Total: 8.500 jiwa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 mb-6">
                  <ChartContainer>
                    <Chart>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={ageData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {ageData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </Chart>
                  </ChartContainer>
                </div>

                {ageData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between mb-2 last:mb-0">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                      <span>{item.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{item.value.toLocaleString()}</span>
                      <span className="text-muted-foreground text-sm">({item.percentage})</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Trends Tab */}
        <TabsContent value="trends" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Tren Jumlah Penduduk (5 Tahun Terakhir)
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  Unduh Data
                </Button>
              </CardTitle>
              <CardDescription>Perkembangan jumlah penduduk dari tahun ke tahun</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 mb-4">
                <ChartContainer
                  config={{
                    male: {
                      label: "Laki-laki",
                      color: "#4ade80",
                    },
                    female: {
                      label: "Perempuan",
                      color: "#fb923c",
                    },
                    total: {
                      label: "Total",
                      color: "#3b82f6",
                    },
                  }}
                >
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={populationTrend}>
                        <XAxis dataKey="year" />
                        <YAxis domain={[7500, 9000]} />
                        <Line
                          type="monotone"
                          dataKey="total"
                          stroke="#3b82f6"
                          strokeWidth={3}
                          dot={{ r: 6 }}
                          name="Total"
                        />
                        <Line
                          type="monotone"
                          dataKey="male"
                          stroke="#4ade80"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          name="Laki-laki"
                        />
                        <Line
                          type="monotone"
                          dataKey="female"
                          stroke="#fb923c"
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          name="Perempuan"
                        />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </LineChart>
                    </ResponsiveContainer>
                  </Chart>
                </ChartContainer>
              </div>

              <div className="bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Interpretasi Data:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Pertumbuhan penduduk yang stabil dengan rata-rata 1.2% per tahun</li>
                  <li>Proyeksi penduduk untuk tahun 2024 diperkirakan mencapai 8.600 jiwa</li>
                  <li>
                    Faktor yang mempengaruhi: tingkat kelahiran, migrasi masuk dari daerah lain, serta program
                    pembangunan perumahan baru
                  </li>
                </ul>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-2">Proyeksi Jumlah Penduduk:</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-md">
                    <p className="text-sm text-muted-foreground">2024</p>
                    <p className="text-xl font-bold">8.600</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-md">
                    <p className="text-sm text-muted-foreground">2025</p>
                    <p className="text-xl font-bold">8.700</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-md">
                    <p className="text-sm text-muted-foreground">2026</p>
                    <p className="text-xl font-bold">8.800</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Education Tab */}
        <TabsContent value="education" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Penduduk Berdasarkan Tingkat Pendidikan
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  Unduh Data
                </Button>
              </CardTitle>
              <CardDescription>Data penduduk usia 5 tahun ke atas</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80 mb-6">
                <ChartContainer>
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={educationData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Chart>
                </ChartContainer>
              </div>

              <div className="space-y-4">
                {educationData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span>{item.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{item.value.toLocaleString()}</span>
                        <span className="text-muted-foreground text-sm">({item.percentage})</span>
                      </div>
                    </div>
                    <Progress value={(item.value / 8500) * 100} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Interpretasi Data:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Mayoritas penduduk telah menyelesaikan pendidikan SD dan SMP (55.3%)</li>
                  <li>Angka Partisipasi Sekolah untuk usia 7-12 tahun mencapai 98.7%</li>
                  <li>Tantangan: masih ada 5.3% penduduk yang tidak bersekolah, terutama pada kelompok usia lanjut</li>
                </ul>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fasilitas Pendidikan</CardTitle>
              <CardDescription>Jumlah fasilitas pendidikan di Desa Pao-Pao</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-md text-center">
                  <p className="font-medium">PAUD/TK</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">3</p>
                  <p className="text-sm text-muted-foreground">Unit</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-md text-center">
                  <p className="font-medium">SD/MI</p>
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">2</p>
                  <p className="text-sm text-muted-foreground">Unit</p>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md text-center">
                  <p className="font-medium">SMP/MTs</p>
                  <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">1</p>
                  <p className="text-sm text-muted-foreground">Unit</p>
                </div>
                <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-md text-center">
                  <p className="font-medium">SMA/MA</p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">0</p>
                  <p className="text-sm text-muted-foreground">Unit</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Occupation Tab */}
        <TabsContent value="occupation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Penduduk Berdasarkan Pekerjaan
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  Unduh Data
                </Button>
              </CardTitle>
              <CardDescription>Data penduduk usia produktif (15-64 tahun)</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-80">
                  <ChartContainer>
                    <Chart>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={occupationData}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </BarChart>
                      </ResponsiveContainer>
                    </Chart>
                  </ChartContainer>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Distribusi Pekerjaan:</h4>
                  {occupationData.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span>{item.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.value.toLocaleString()}</span>
                          <span className="text-muted-foreground text-sm">({item.percentage})</span>
                        </div>
                      </div>
                      <Progress value={(item.value / 8500) * 100} className="h-2" />
                    </div>
                  ))}

                  <div className="bg-muted p-4 rounded-md mt-4">
                    <h4 className="font-medium mb-2">Interpretasi Data:</h4>
                    <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                      <li>Sektor pertanian masih menjadi mata pencaharian utama penduduk desa (32.9%)</li>
                      <li>Sektor perdagangan dan jasa mulai berkembang seiring dengan pembangunan infrastruktur</li>
                      <li>Tingkat pengangguran terbuka sebesar 3.8%, lebih rendah dari rata-rata nasional</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-2">Pendapatan Rata-rata per Bulan:</h4>
                <div className="space-y-4">
                  {incomeData.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span>{item.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.value.toLocaleString()}</span>
                          <span className="text-muted-foreground text-sm">({item.percentage})</span>
                        </div>
                      </div>
                      <Progress value={(item.value / 8500) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Tab */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Penduduk Berdasarkan Agama
                <Button variant="outline" size="sm" className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  Unduh Data
                </Button>
              </CardTitle>
              <CardDescription>Komposisi penduduk berdasarkan agama yang dianut</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-80">
                  <ChartContainer
                    config={{
                      Islam: {
                        color: "#22c55e",
                      },
                      Kristen: {
                        color: "#3b82f6",
                      },
                      Katolik: {
                        color: "#ef4444",
                      },
                      Hindu: {
                        color: "#f59e0b",
                      },
                      Buddha: {
                        color: "#6366f1",
                      },
                    }}
                  >
                    <Chart>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={religionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                          />
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </PieChart>
                      </ResponsiveContainer>
                    </Chart>
                  </ChartContainer>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium">Komposisi Agama:</h4>
                  {religionData.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-1">
                        <span>{item.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{item.value.toLocaleString()}</span>
                          <span className="text-muted-foreground text-sm">({item.percentage})</span>
                        </div>
                      </div>
                      <Progress value={(item.value / 8500) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium mb-2">Fasilitas Keagamaan:</h4>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4 text-center">
                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-md">
                    <p className="font-medium">Masjid</p>
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">8</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-md">
                    <p className="font-medium">Gereja</p>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">1</p>
                  </div>
                  <div className="bg-red-50 dark:bg-red-950 p-4 rounded-md">
                    <p className="font-medium">Kapel</p>
                    <p className="text-3xl font-bold text-red-600 dark:text-red-400">0</p>
                  </div>
                  <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md">
                    <p className="font-medium">Pura</p>
                    <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">0</p>
                  </div>
                  <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-md">
                    <p className="font-medium">Vihara</p>
                    <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">0</p>
                  </div>
                </div>
              </div>

              <div className="mt-6 bg-muted p-4 rounded-md">
                <h4 className="font-medium mb-2">Kerukunan Umat Beragama:</h4>
                <p className="text-sm text-muted-foreground">
                  Desa Pao-Pao dikenal dengan kerukunan antar umat beragama yang harmonis. Masyarakat aktif mengikuti
                  kegiatan keagamaan dan saling menghormati perayaan hari besar agama. Forum Kerukunan Umat Beragama
                  (FKUB) secara rutin mengadakan dialog antar tokoh agama untuk menjaga keharmonisan.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Sumber Data</CardTitle>
          <CardDescription>Informasi mengenai sumber data statistik</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>Data penduduk bersumber dari sensus penduduk desa tahun 2023</li>
            <li>Data fasilitas umum berdasarkan inventarisasi aset desa tahun 2023</li>
            <li>Data ekonomi berdasarkan survei ekonomi rumah tangga tahun 2023</li>
            <li>Pembaruan data dilakukan setiap akhir tahun melalui pemutakhiran data desa</li>
          </ul>
          <div className="mt-4">
            <p className="text-sm italic">Terakhir diperbarui: 15 Januari 2024</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
