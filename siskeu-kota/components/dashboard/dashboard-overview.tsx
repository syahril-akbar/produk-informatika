"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getSupabaseClient } from "@/lib/supabase/client"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts"

// Sample data as fallback
const sampleYearlyData = [
  { name: "2018", pendapatan: 850, pengeluaran: 800 },
  { name: "2019", pendapatan: 950, pengeluaran: 900 },
  { name: "2020", pendapatan: 1000, pengeluaran: 950 },
  { name: "2021", pendapatan: 1100, pengeluaran: 1050 },
  { name: "2022", pendapatan: 1200, pengeluaran: 1100 },
  { name: "2023", pendapatan: 1300, pengeluaran: 1200 },
]

const sampleCategoryData = [
  { name: "Infrastruktur", value: 500 },
  { name: "Pendidikan", value: 300 },
  { name: "Kesehatan", value: 200 },
  { name: "Administrasi", value: 150 },
  { name: "Sosial", value: 100 },
  { name: "Ekonomi", value: 50 },
]

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe", "#00C49F"]

export function DashboardOverview() {
  const [yearlyData, setYearlyData] = useState(sampleYearlyData)
  const [categoryData, setCategoryData] = useState(sampleCategoryData)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const supabase = getSupabaseClient()

        // Instead of querying a non-existent dashboard_overview table,
        // we'll query the transaksi table which we know exists
        const { data: transactionData, error: transactionError } = await supabase
          .from("transaksi")
          .select("tanggal, jumlah, status, kategori")

        if (transactionError) {
          console.error("Error fetching transaction data:", transactionError)
          // Fall back to sample data
          return
        }

        if (transactionData && transactionData.length > 0) {
          // Process transaction data to create yearly data
          const yearlyDataMap = new Map()
          const categoryDataMap = new Map()

          // Initialize with sample years to ensure we have data for all years
          sampleYearlyData.forEach((item) => {
            yearlyDataMap.set(item.name, {
              name: item.name,
              pendapatan: 0,
              pengeluaran: 0,
            })
          })

          // Process transaction data
          transactionData.forEach((transaction) => {
            const year = new Date(transaction.tanggal).getFullYear().toString()

            // Update yearly data
            if (!yearlyDataMap.has(year)) {
              yearlyDataMap.set(year, {
                name: year,
                pendapatan: 0,
                pengeluaran: 0,
              })
            }

            const yearData = yearlyDataMap.get(year)
            if (transaction.status === "pendapatan") {
              yearData.pendapatan += transaction.jumlah / 1000000 // Convert to millions
            } else {
              yearData.pengeluaran += transaction.jumlah / 1000000 // Convert to millions
            }

            // Update category data
            if (!categoryDataMap.has(transaction.kategori)) {
              categoryDataMap.set(transaction.kategori, {
                name: transaction.kategori,
                value: 0,
              })
            }

            const categoryItem = categoryDataMap.get(transaction.kategori)
            categoryItem.value += transaction.jumlah / 1000000 // Convert to millions
          })

          // Convert maps to arrays
          const processedYearlyData = Array.from(yearlyDataMap.values()).sort(
            (a, b) => Number.parseInt(a.name) - Number.parseInt(b.name),
          )

          const processedCategoryData = Array.from(categoryDataMap.values()).sort((a, b) => b.value - a.value)

          // Update state with processed data
          if (processedYearlyData.length > 0) {
            setYearlyData(processedYearlyData)
          }

          if (processedCategoryData.length > 0) {
            setCategoryData(processedCategoryData)
          }
        }
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err)
        setError("Gagal memuat data dashboard")
        // Fall back to sample data
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const renderContent = () => {
    if (loading) {
      return <div className="p-4 text-center">Memuat data...</div>
    }

    if (error) {
      return <div className="p-4 text-center text-red-500">{error}</div>
    }

    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Tren Anggaran Multi-Tahun</CardTitle>
            <CardDescription>Perbandingan pendapatan dan pengeluaran kota dari tahun ke tahun</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={yearlyData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => `Rp ${value} M`} />
                <Legend />
                <Bar dataKey="pendapatan" name="Pendapatan" fill="#8884d8" />
                <Bar dataKey="pengeluaran" name="Pengeluaran" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Distribusi Anggaran</CardTitle>
            <CardDescription>Distribusi anggaran berdasarkan kategori</CardDescription>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `Rp ${value} M`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ikhtisar Keuangan</CardTitle>
        <CardDescription>Ringkasan keuangan dan anggaran kota</CardDescription>
      </CardHeader>
      <CardContent>{renderContent()}</CardContent>
    </Card>
  )
}
