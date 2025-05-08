"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts"

// Sample population data
const populationData = {
  summary: {
    total: 8500,
    male: 4300,
    female: 4200,
    households: 2100,
    density: 1635, // per km²
    growthRate: 1.2, // percent per year
    byGender: [
      { name: "Laki-laki", value: 4300, color: "#2563eb" },
      { name: "Perempuan", value: 4200, color: "#ec4899" },
    ],
    byAge: [
      { name: "0-4", value: 720, color: "#22c55e" },
      { name: "5-14", value: 1380, color: "#10b981" },
      { name: "15-24", value: 1450, color: "#0ea5e9" },
      { name: "25-44", value: 2650, color: "#6366f1" },
      { name: "45-64", value: 1500, color: "#f59e0b" },
      { name: "65+", value: 800, color: "#ef4444" },
    ],
    byEducation: [
      { name: "Tidak Sekolah", value: 450 },
      { name: "SD", value: 2500 },
      { name: "SMP", value: 2200 },
      { name: "SMA", value: 2000 },
      { name: "Diploma", value: 800 },
      { name: "Sarjana", value: 700 },
      { name: "Pascasarjana", value: 300 },
    ],
    byOccupation: [
      { name: "Petani", value: 2800 },
      { name: "Pedagang", value: 1500 },
      { name: "PNS", value: 800 },
      { name: "Swasta", value: 1200 },
      { name: "Lainnya", value: 2200 },
    ],
  },
  trend: [
    { year: "2018", value: 8100 },
    { year: "2019", value: 8200 },
    { year: "2020", value: 8300 },
    { year: "2021", value: 8400 },
    { year: "2022", value: 8450 },
    { year: "2023", value: 8500 },
  ],
  byDusun: [
    { name: "Dusun Pao Utara", value: 2500, households: 620 },
    { name: "Dusun Pao Selatan", value: 2300, households: 570 },
    { name: "Dusun Pao Timur", value: 1800, households: 450 },
    { name: "Dusun Pao Barat", value: 1900, households: 460 },
  ],
  residents: [
    {
      id: 1,
      nik: "7371122505800001",
      name: "Ahmad Sulaiman",
      gender: "Laki-laki",
      age: 45,
      address: "Dusun Pao Utara",
      education: "SMA",
      occupation: "Petani",
    },
    {
      id: 2,
      nik: "7371122505800002",
      name: "Siti Aminah",
      gender: "Perempuan",
      age: 42,
      address: "Dusun Pao Selatan",
      education: "SMP",
      occupation: "Pedagang",
    },
    {
      id: 3,
      nik: "7371122505800003",
      name: "Budi Santoso",
      gender: "Laki-laki",
      age: 38,
      address: "Dusun Pao Timur",
      education: "Sarjana",
      occupation: "PNS",
    },
    {
      id: 4,
      nik: "7371122505800004",
      name: "Dewi Lestari",
      gender: "Perempuan",
      age: 35,
      address: "Dusun Pao Barat",
      education: "Diploma",
      occupation: "Swasta",
    },
    {
      id: 5,
      nik: "7371122505800005",
      name: "Hendra Wijaya",
      gender: "Laki-laki",
      age: 50,
      address: "Dusun Pao Utara",
      education: "SMA",
      occupation: "Pedagang",
    },
    {
      id: 6,
      nik: "7371122505800006",
      name: "Rina Wati",
      gender: "Perempuan",
      age: 28,
      address: "Dusun Pao Selatan",
      education: "Sarjana",
      occupation: "Swasta",
    },
    {
      id: 7,
      nik: "7371122505800007",
      name: "Agus Setiawan",
      gender: "Laki-laki",
      age: 55,
      address: "Dusun Pao Timur",
      education: "SD",
      occupation: "Petani",
    },
    {
      id: 8,
      nik: "7371122505800008",
      name: "Joko Susilo",
      gender: "Laki-laki",
      age: 60,
      address: "Dusun Pao Barat",
      education: "SMP",
      occupation: "Petani",
    },
    {
      id: 9,
      nik: "7371122505800009",
      name: "Sri Wahyuni",
      gender: "Perempuan",
      age: 32,
      address: "Dusun Pao Utara",
      education: "Sarjana",
      occupation: "PNS",
    },
    {
      id: 10,
      nik: "7371122505800010",
      name: "Rudi Hartono",
      gender: "Laki-laki",
      age: 40,
      address: "Dusun Pao Selatan",
      education: "SMA",
      occupation: "Swasta",
    },
    {
      id: 11,
      nik: "7371122505800011",
      name: "Andi Firmansyah",
      gender: "Laki-laki",
      age: 25,
      address: "Dusun Pao Timur",
      education: "Diploma",
      occupation: "Swasta",
    },
    {
      id: 12,
      nik: "7371122505800012",
      name: "Lia Anggraini",
      gender: "Perempuan",
      age: 30,
      address: "Dusun Pao Barat",
      education: "Sarjana",
      occupation: "PNS",
    },
  ],
}

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

export default function PendudukPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterDusun, setFilterDusun] = useState("all")
  const [filterGender, setFilterGender] = useState("all")

  // Filter residents based on search term and filters
  const filteredResidents = populationData.residents.filter((resident) => {
    const matchesSearch =
      resident.name.toLowerCase().includes(searchTerm.toLowerCase()) || resident.nik.includes(searchTerm)

    const matchesDusun = filterDusun === "all" || resident.address === filterDusun
    const matchesGender = filterGender === "all" || resident.gender === filterGender

    return matchesSearch && matchesDusun && matchesGender
  })

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tighter mb-2">Data Penduduk Desa Pao-Pao</h1>
      <p className="text-muted-foreground mb-6">Informasi statistik dan demografi penduduk Desa Pao-Pao</p>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Penduduk</CardTitle>
            <CardDescription>Tahun 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{populationData.summary.total}</div>
            <p className="text-muted-foreground">Jiwa</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Jumlah KK</CardTitle>
            <CardDescription>Tahun 2023</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{populationData.summary.households}</div>
            <p className="text-muted-foreground">Kepala Keluarga</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Kepadatan</CardTitle>
            <CardDescription>Penduduk per km²</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{populationData.summary.density}</div>
            <p className="text-muted-foreground">Jiwa/km²</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Laju Pertumbuhan</CardTitle>
            <CardDescription>Per tahun</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{populationData.summary.growthRate}%</div>
            <p className="text-muted-foreground">Pertumbuhan tahunan</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Tren Jumlah Penduduk (5 Tahun Terakhir)</CardTitle>
          <CardDescription>Perkembangan jumlah penduduk dari tahun ke tahun</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ChartContainer>
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={populationData.trend}>
                    <XAxis dataKey="year" />
                    <YAxis domain={[8000, 8600]} />
                    <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </LineChart>
                </ResponsiveContainer>
              </Chart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="demographics" className="mb-10">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="demographics">Demografi</TabsTrigger>
          <TabsTrigger value="distribution">Distribusi</TabsTrigger>
          <TabsTrigger value="residents">Data Penduduk</TabsTrigger>
        </TabsList>

        <TabsContent value="demographics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Penduduk Berdasarkan Kelompok Umur</CardTitle>
                <CardDescription>Total: {populationData.summary.total} jiwa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[600px]">
                  <div className="flex justify-center mb-4">
                    <div className="flex items-center mr-6">
                      <div className="w-4 h-4 bg-[#4ade80] mr-2"></div>
                      <span>Laki-Laki</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-4 h-4 bg-[#fb923c] mr-2"></div>
                      <span>Perempuan</span>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart layout="vertical" data={pyramidData} margin={{ top: 20, right: 30, left: 50, bottom: 5 }}>
                      <ChartTooltip
                        formatter={(value: number, name: string) => {
                          return [Math.abs(value), name === "male" ? "Laki-laki" : "Perempuan"]
                        }}
                      />
                      <Bar dataKey="male" fill="#4ade80" name="Laki-laki" radius={[4, 0, 0, 4]} />
                      <Bar dataKey="female" fill="#fb923c" name="Perempuan" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-lg font-medium">Laki-laki</div>
                    <div className="text-2xl font-bold text-blue-600">{populationData.summary.male}</div>
                    <div className="text-sm text-muted-foreground">
                      {((populationData.summary.male / populationData.summary.total) * 100).toFixed(1)}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-medium">Perempuan</div>
                    <div className="text-2xl font-bold text-pink-600">{populationData.summary.female}</div>
                    <div className="text-sm text-muted-foreground">
                      {((populationData.summary.female / populationData.summary.total) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Penduduk Berdasarkan Kelompok Usia</CardTitle>
                <CardDescription>Total: {populationData.summary.total} jiwa</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer>
                    <Chart>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={populationData.summary.byAge}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {populationData.summary.byAge.map((entry, index) => (
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
                <CardTitle>Penduduk Berdasarkan Tingkat Pendidikan</CardTitle>
                <CardDescription>Data penduduk usia 5 tahun ke atas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer>
                    <Chart>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={populationData.summary.byEducation}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </BarChart>
                      </ResponsiveContainer>
                    </Chart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Penduduk Berdasarkan Pekerjaan</CardTitle>
                <CardDescription>Data penduduk usia produktif</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ChartContainer>
                    <Chart>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={populationData.summary.byOccupation}>
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
                          <ChartTooltip content={<ChartTooltipContent />} />
                        </BarChart>
                      </ResponsiveContainer>
                    </Chart>
                  </ChartContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="distribution" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribusi Penduduk Berdasarkan Wilayah</CardTitle>
              <CardDescription>Persebaran penduduk di setiap dusun</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ChartContainer>
                  <Chart>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={populationData.byDusun}>
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
                {populationData.byDusun.map((dusun, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg">{dusun.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">Jumlah Penduduk</div>
                          <div className="text-xl font-bold">{dusun.value}</div>
                          <div className="text-sm text-muted-foreground">
                            {((dusun.value / populationData.summary.total) * 100).toFixed(1)}% dari total
                          </div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">Jumlah KK</div>
                          <div className="text-xl font-bold">{dusun.households}</div>
                          <div className="text-sm text-muted-foreground">
                            {((dusun.households / populationData.summary.households) * 100).toFixed(1)}% dari total
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="residents" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Penduduk</CardTitle>
              <CardDescription>Daftar penduduk Desa Pao-Pao</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Cari berdasarkan nama atau NIK..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={filterDusun} onValueChange={setFilterDusun}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter Dusun" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua Dusun</SelectItem>
                    <SelectItem value="Dusun Pao Utara">Dusun Pao Utara</SelectItem>
                    <SelectItem value="Dusun Pao Selatan">Dusun Pao Selatan</SelectItem>
                    <SelectItem value="Dusun Pao Timur">Dusun Pao Timur</SelectItem>
                    <SelectItem value="Dusun Pao Barat">Dusun Pao Barat</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterGender} onValueChange={setFilterGender}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter Jenis Kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Semua</SelectItem>
                    <SelectItem value="Laki-laki">Laki-laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>No</TableHead>
                      <TableHead>NIK</TableHead>
                      <TableHead>Nama</TableHead>
                      <TableHead>Jenis Kelamin</TableHead>
                      <TableHead>Usia</TableHead>
                      <TableHead>Alamat</TableHead>
                      <TableHead>Pendidikan</TableHead>
                      <TableHead>Pekerjaan</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredResidents.length > 0 ? (
                      filteredResidents.map((resident, index) => (
                        <TableRow key={resident.id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{resident.nik}</TableCell>
                          <TableCell className="font-medium">{resident.name}</TableCell>
                          <TableCell>{resident.gender}</TableCell>
                          <TableCell>{resident.age}</TableCell>
                          <TableCell>{resident.address}</TableCell>
                          <TableCell>{resident.education}</TableCell>
                          <TableCell>{resident.occupation}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} className="h-24 text-center">
                          Tidak ada data yang ditemukan.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>

              {filteredResidents.length > 0 && (
                <div className="mt-4 text-sm text-muted-foreground">
                  Menampilkan {filteredResidents.length} dari {populationData.residents.length} data
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
