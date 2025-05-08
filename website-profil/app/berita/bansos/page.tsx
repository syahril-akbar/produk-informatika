"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search } from "lucide-react"
import { Chart, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

// Sample bansos data
const bansosData = {
  summary: {
    total: 350,
    byType: [
      { name: "PKH", value: 120, color: "#3b82f6" },
      { name: "BPNT", value: 150, color: "#10b981" },
      { name: "BLT-Dana Desa", value: 80, color: "#f59e0b" },
    ],
  },
  recipients: [
    {
      id: 1,
      nik: "7371122505800001",
      name: "Ahmad Sulaiman",
      address: "Dusun Pao Utara",
      type: "PKH",
      status: "Aktif",
    },
    {
      id: 2,
      nik: "7371122505800002",
      name: "Siti Aminah",
      address: "Dusun Pao Selatan",
      type: "BPNT",
      status: "Aktif",
    },
    {
      id: 3,
      nik: "7371122505800003",
      name: "Budi Santoso",
      address: "Dusun Pao Timur",
      type: "BLT-Dana Desa",
      status: "Aktif",
    },
    { id: 4, nik: "7371122505800004", name: "Dewi Lestari", address: "Dusun Pao Barat", type: "PKH", status: "Aktif" },
    {
      id: 5,
      nik: "7371122505800005",
      name: "Hendra Wijaya",
      address: "Dusun Pao Utara",
      type: "BPNT",
      status: "Aktif",
    },
    {
      id: 6,
      nik: "7371122505800006",
      name: "Rina Wati",
      address: "Dusun Pao Selatan",
      type: "BLT-Dana Desa",
      status: "Aktif",
    },
    { id: 7, nik: "7371122505800007", name: "Agus Setiawan", address: "Dusun Pao Timur", type: "PKH", status: "Aktif" },
    { id: 8, nik: "7371122505800008", name: "Joko Susilo", address: "Dusun Pao Barat", type: "BPNT", status: "Aktif" },
    {
      id: 9,
      nik: "7371122505800009",
      name: "Sri Wahyuni",
      address: "Dusun Pao Utara",
      type: "BLT-Dana Desa",
      status: "Aktif",
    },
    {
      id: 10,
      nik: "7371122505800010",
      name: "Rudi Hartono",
      address: "Dusun Pao Selatan",
      type: "PKH",
      status: "Aktif",
    },
    {
      id: 11,
      nik: "7371122505800011",
      name: "Andi Firmansyah",
      address: "Dusun Pao Timur",
      type: "BPNT",
      status: "Aktif",
    },
    {
      id: 12,
      nik: "7371122505800012",
      name: "Lia Anggraini",
      address: "Dusun Pao Barat",
      type: "BLT-Dana Desa",
      status: "Aktif",
    },
  ],
}

export default function BansosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")

  // Filter recipients based on search term and filter type
  const filteredRecipients = bansosData.recipients.filter((recipient) => {
    const matchesSearch =
      recipient.name.toLowerCase().includes(searchTerm.toLowerCase()) || recipient.nik.includes(searchTerm)

    const matchesType = filterType === "all" || recipient.type === filterType

    return matchesSearch && matchesType
  })

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tighter mb-2">Data Penerima Bantuan Sosial</h1>
      <p className="text-muted-foreground mb-6">Informasi penerima bantuan sosial di Desa Pao-Pao</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Penerima Bansos</CardTitle>
            <CardDescription>Semua jenis bantuan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold">{bansosData.summary.total}</div>
            <p className="text-muted-foreground">Keluarga</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Distribusi Penerima Bansos</CardTitle>
            <CardDescription>Berdasarkan jenis bantuan</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-60">
              <ChartContainer>
                <Chart>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={bansosData.summary.byType}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {bansosData.summary.byType.map((entry, index) => (
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

      <Card>
        <CardHeader>
          <CardTitle>Daftar Penerima Bantuan Sosial</CardTitle>
          <CardDescription>Data penerima bantuan sosial di Desa Pao-Pao</CardDescription>
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
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter Jenis Bantuan" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Semua Jenis</SelectItem>
                <SelectItem value="PKH">PKH</SelectItem>
                <SelectItem value="BPNT">BPNT</SelectItem>
                <SelectItem value="BLT-Dana Desa">BLT-Dana Desa</SelectItem>
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
                  <TableHead>Alamat</TableHead>
                  <TableHead>Jenis Bantuan</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredRecipients.length > 0 ? (
                  filteredRecipients.map((recipient, index) => (
                    <TableRow key={recipient.id}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{recipient.nik}</TableCell>
                      <TableCell className="font-medium">{recipient.name}</TableCell>
                      <TableCell>{recipient.address}</TableCell>
                      <TableCell>{recipient.type}</TableCell>
                      <TableCell>
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800 dark:bg-green-900 dark:text-green-100">
                          {recipient.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      Tidak ada data yang ditemukan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {filteredRecipients.length > 0 && (
            <div className="mt-4 text-sm text-muted-foreground">
              Menampilkan {filteredRecipients.length} dari {bansosData.recipients.length} data
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
