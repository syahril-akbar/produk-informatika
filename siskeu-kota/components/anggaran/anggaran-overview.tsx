"use client"

import { useEffect, useState } from "react"
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
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { FilterState } from "@/app/dashboard/anggaran/page"

// Sample data for different years
const yearlyData = [
  { name: "2018", anggaran: 850, realisasi: 800 },
  { name: "2019", anggaran: 950, realisasi: 900 },
  { name: "2020", anggaran: 1000, realisasi: 950 },
  { name: "2021", anggaran: 1100, realisasi: 1050 },
  { name: "2022", anggaran: 1200, realisasi: 1100 },
  { name: "2023", anggaran: 1300, realisasi: 1200 },
]

// Sample data for quarters
const quarterlyData = [
  { name: "Q1 2022", anggaran: 300, realisasi: 280 },
  { name: "Q2 2022", anggaran: 300, realisasi: 270 },
  { name: "Q3 2022", anggaran: 300, realisasi: 290 },
  { name: "Q4 2022", anggaran: 300, realisasi: 260 },
  { name: "Q1 2023", anggaran: 325, realisasi: 300 },
  { name: "Q2 2023", anggaran: 325, realisasi: 310 },
  { name: "Q3 2023", anggaran: 325, realisasi: 290 },
  { name: "Q4 2023", anggaran: 325, realisasi: 300 },
]

// Sample data for sectors
const sectorData = [
  { name: "Pendidikan", value: 30 },
  { name: "Kesehatan", value: 25 },
  { name: "Infrastruktur", value: 20 },
  { name: "Sosial", value: 15 },
  { name: "Ekonomi", value: 7 },
  { name: "Administrasi", value: 3 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", "#00C49F"]

interface AnggaranOverviewProps {
  filterState: FilterState
}

export function AnggaranOverview({ filterState }: AnggaranOverviewProps) {
  const [activeTab, setActiveTab] = useState("yearly")
  const [filteredYearlyData, setFilteredYearlyData] = useState(yearlyData)
  const [filteredQuarterlyData, setFilteredQuarterlyData] = useState(quarterlyData)
  const [filteredSectorData, setFilteredSectorData] = useState(sectorData)

  // Apply filters when filterState changes
  useEffect(() => {
    // Filter yearly data based on year if specified
    if (filterState.tahun !== "all") {
      setFilteredYearlyData(yearlyData.filter((item) => item.name === filterState.tahun))
    } else {
      setFilteredYearlyData(yearlyData)
    }

    // Filter quarterly data based on year if specified
    if (filterState.tahun !== "all") {
      setFilteredQuarterlyData(quarterlyData.filter((item) => item.name.includes(filterState.tahun)))
    } else {
      setFilteredQuarterlyData(quarterlyData)
    }

    // For sector data, we would typically filter based on other criteria
    // This is just a placeholder for demonstration
    setFilteredSectorData(sectorData)

    // Set appropriate tab based on period filter
    if (filterState.periode === "triwulan") {
      setActiveTab("quarterly")
    } else if (filterState.periode === "tahunan") {
      setActiveTab("yearly")
    }
  }, [filterState])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tren Anggaran dan Realisasi</CardTitle>
        <CardDescription>Perbandingan anggaran dan realisasi kota dari waktu ke waktu</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="yearly">Tahunan</TabsTrigger>
            <TabsTrigger value="quarterly">Triwulan</TabsTrigger>
            <TabsTrigger value="sector">Distribusi Sektor</TabsTrigger>
          </TabsList>
          <TabsContent value="yearly" className="h-[400px]">
            {filteredYearlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredYearlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `Rp ${value} M`} />
                  <Legend />
                  <Bar dataKey="anggaran" name="Anggaran" fill="#8884d8" />
                  <Bar dataKey="realisasi" name="Realisasi" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Tidak ada data yang sesuai dengan filter</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="quarterly" className="h-[400px]">
            {filteredQuarterlyData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={filteredQuarterlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `Rp ${value} M`} />
                  <Legend />
                  <Line type="monotone" dataKey="anggaran" name="Anggaran" stroke="#8884d8" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="realisasi" name="Realisasi" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-muted-foreground">Tidak ada data yang sesuai dengan filter</p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="sector" className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={filteredSectorData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {filteredSectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
