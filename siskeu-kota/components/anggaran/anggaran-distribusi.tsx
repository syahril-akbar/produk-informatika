"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { FilterState } from "@/app/dashboard/anggaran/page"

// Sample data for sectors
const sectorData = [
  { name: "Pendidikan", value: 30 },
  { name: "Kesehatan", value: 25 },
  { name: "Infrastruktur", value: 20 },
  { name: "Sosial", value: 15 },
  { name: "Ekonomi", value: 7 },
  { name: "Administrasi", value: 3 },
]

// Sample data for regions
const regionData = [
  { name: "Kecamatan A", value: 25 },
  { name: "Kecamatan B", value: 20 },
  { name: "Kecamatan C", value: 18 },
  { name: "Kecamatan D", value: 15 },
  { name: "Kecamatan E", value: 12 },
  { name: "Kecamatan F", value: 10 },
]

// Sample data for categories
const categoryData = [
  { name: "Belanja Modal", value: 40 },
  { name: "Belanja Barang", value: 30 },
  { name: "Belanja Pegawai", value: 15 },
  { name: "Belanja Bantuan", value: 10 },
  { name: "Belanja Hibah", value: 3 },
  { name: "Belanja Lain", value: 2 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", "#00C49F"]

interface AnggaranDistribusiProps {
  filterState: FilterState
}

export function AnggaranDistribusi({ filterState }: AnggaranDistribusiProps) {
  const [activeTab, setActiveTab] = useState("sector")
  const [filteredSectorData, setFilteredSectorData] = useState(sectorData)
  const [filteredRegionData, setFilteredRegionData] = useState(regionData)
  const [filteredCategoryData, setFilteredCategoryData] = useState(categoryData)

  // Apply filters when filterState changes
  useEffect(() => {
    // In a real app, we would filter the data based on the filterState
    // For this example, we'll just simulate filtering

    // If a specific sector is selected, highlight it in the chart
    if (filterState.sektor !== "all") {
      const sectorName = filterState.sektor.charAt(0).toUpperCase() + filterState.sektor.slice(1)
      setFilteredSectorData(
        sectorData.map((item) => ({
          ...item,
          value: item.name === sectorName ? item.value * 1.2 : item.value,
          highlight: item.name === sectorName,
        })),
      )
    } else {
      setFilteredSectorData(sectorData)
    }

    // If a specific region is selected, highlight it in the chart
    if (filterState.wilayah !== "all") {
      const regionName = filterState.wilayah.replace("kecamatan_", "Kecamatan ").toUpperCase()
      setFilteredRegionData(
        regionData.map((item) => ({
          ...item,
          value: item.name === regionName ? item.value * 1.2 : item.value,
          highlight: item.name === regionName,
        })),
      )
    } else {
      setFilteredRegionData(regionData)
    }

    // If a specific category is selected, highlight it in the chart
    if (filterState.kategori !== "all") {
      const categoryName = filterState.kategori.replace("belanja_", "Belanja ").replace(/\b\w/g, (l) => l.toUpperCase())
      setFilteredCategoryData(
        categoryData.map((item) => ({
          ...item,
          value: item.name === categoryName ? item.value * 1.2 : item.value,
          highlight: item.name === categoryName,
        })),
      )
    } else {
      setFilteredCategoryData(categoryData)
    }
  }, [filterState])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Distribusi Anggaran</CardTitle>
        <CardDescription>Visualisasi distribusi anggaran berdasarkan sektor, wilayah, dan kategori</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="sector">Sektor</TabsTrigger>
            <TabsTrigger value="region">Wilayah</TabsTrigger>
            <TabsTrigger value="category">Kategori</TabsTrigger>
          </TabsList>
          <TabsContent value="sector" className="h-[400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              <div className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={filteredSectorData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {filteredSectorData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke={entry.highlight ? "#000" : undefined}
                          strokeWidth={entry.highlight ? 2 : undefined}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={filteredSectorData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="value" fill="#8884d8">
                      {filteredSectorData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke={entry.highlight ? "#000" : undefined}
                          strokeWidth={entry.highlight ? 2 : undefined}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="region" className="h-[400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              <div className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={filteredRegionData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {filteredRegionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke={entry.highlight ? "#000" : undefined}
                          strokeWidth={entry.highlight ? 2 : undefined}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={filteredRegionData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="value" fill="#82ca9d">
                      {filteredRegionData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke={entry.highlight ? "#000" : undefined}
                          strokeWidth={entry.highlight ? 2 : undefined}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="category" className="h-[400px]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full">
              <div className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={filteredCategoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={true}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {filteredCategoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke={entry.highlight ? "#000" : undefined}
                          strokeWidth={entry.highlight ? 2 : undefined}
                        />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={filteredCategoryData}
                    layout="vertical"
                    margin={{ top: 20, right: 30, left: 70, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={80} />
                    <Tooltip formatter={(value) => `${value}%`} />
                    <Bar dataKey="value" fill="#ffc658">
                      {filteredCategoryData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                          stroke={entry.highlight ? "#000" : undefined}
                          strokeWidth={entry.highlight ? 2 : undefined}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
