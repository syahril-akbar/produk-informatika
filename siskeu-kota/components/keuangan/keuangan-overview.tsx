"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useMemo } from "react"
import type { Transaction } from "@/app/dashboard/keuangan/page"

interface KeuanganOverviewProps {
  transactions: Transaction[]
}

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#0088fe"]

export function KeuanganOverview({ transactions }: KeuanganOverviewProps) {
  const [period, setPeriod] = useState("yearly")
  const [selectedYear, setSelectedYear] = useState("2023")

  // Get unique years from transactions
  const years = useMemo(() => {
    const uniqueYears = [...new Set(transactions.map((t) => t.tahun))].sort((a, b) => b.localeCompare(a))
    return uniqueYears.length > 0 ? uniqueYears : ["2023"]
  }, [transactions])

  // Prepare data for charts based on selected period and year
  const chartData = useMemo(() => {
    // Filter transactions by selected year if period is monthly
    const filteredTransactions =
      period === "monthly" ? transactions.filter((t) => t.tahun === selectedYear) : transactions

    if (period === "monthly") {
      // Group by month for the selected year
      const monthlyData = Array(12)
        .fill(0)
        .map((_, i) => ({
          name: new Date(0, i).toLocaleString("id-ID", { month: "short" }),
          pendapatan: 0,
          pengeluaran: 0,
          month: i + 1,
        }))

      filteredTransactions.forEach((t) => {
        const date = new Date(t.tanggal)
        const month = date.getMonth()
        if (t.status === "pendapatan") {
          monthlyData[month].pendapatan += t.jumlah / 1000000
        } else {
          monthlyData[month].pengeluaran += t.jumlah / 1000000
        }
      })

      return monthlyData
    } else {
      // Group by year
      const yearlyData = {}
      filteredTransactions.forEach((t) => {
        if (!yearlyData[t.tahun]) {
          yearlyData[t.tahun] = { name: t.tahun, pendapatan: 0, pengeluaran: 0 }
        }
        if (t.status === "pendapatan") {
          yearlyData[t.tahun].pendapatan += t.jumlah / 1000000
        } else {
          yearlyData[t.tahun].pengeluaran += t.jumlah / 1000000
        }
      })
      return Object.values(yearlyData).sort((a: any, b: any) => a.name.localeCompare(b.name))
    }
  }, [transactions, period, selectedYear])

  // Prepare data for pie chart (category distribution)
  const categoryData = useMemo(() => {
    const filteredTransactions = transactions.filter((t) => t.tahun === selectedYear)
    const categories = {}

    filteredTransactions.forEach((t) => {
      if (t.status === "pengeluaran") {
        if (!categories[t.kategori]) {
          categories[t.kategori] = 0
        }
        categories[t.kategori] += t.jumlah / 1000000
      }
    })

    return Object.entries(categories).map(([name, value]) => ({ name, value }))
  }, [transactions, selectedYear])

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const filteredTransactions = transactions.filter((t) => t.tahun === selectedYear)

    const totalPendapatan = filteredTransactions
      .filter((t) => t.status === "pendapatan")
      .reduce((sum, t) => sum + t.jumlah, 0)

    const totalPengeluaran = filteredTransactions
      .filter((t) => t.status === "pengeluaran")
      .reduce((sum, t) => sum + t.jumlah, 0)

    const saldo = totalPendapatan - totalPengeluaran

    const realisasiPercentage = totalPendapatan > 0 ? (totalPengeluaran / totalPendapatan) * 100 : 0

    return {
      totalPendapatan,
      totalPengeluaran,
      saldo,
      realisasiPercentage,
    }
  }, [transactions, selectedYear])

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-2xl font-bold">Dashboard Penggunaan Dana Desa</h2>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Pilih periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="monthly">Bulanan</SelectItem>
              <SelectItem value="yearly">Tahunan</SelectItem>
            </SelectContent>
          </Select>

          {period === "monthly" && (
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Pilih tahun" />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pendapatan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {summaryStats.totalPendapatan.toLocaleString("id-ID")}</div>
            <p className="text-xs text-muted-foreground">Tahun {selectedYear}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pengeluaran</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {summaryStats.totalPengeluaran.toLocaleString("id-ID")}</div>
            <div className="mt-1 h-2 w-full rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary"
                style={{ width: `${Math.min(summaryStats.realisasiPercentage, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {summaryStats.realisasiPercentage.toFixed(1)}% dari total pendapatan
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saldo</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Rp {summaryStats.saldo.toLocaleString("id-ID")}</div>
            <p className="text-xs text-muted-foreground">
              {summaryStats.saldo >= 0 ? "Surplus" : "Defisit"} tahun {selectedYear}
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analisis Keuangan</CardTitle>
          <CardDescription>
            {period === "monthly"
              ? `Ringkasan pendapatan dan pengeluaran desa tahun ${selectedYear}`
              : "Perbandingan pendapatan dan pengeluaran desa per tahun"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="bar" className="space-y-4">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="bar">Bar Chart</TabsTrigger>
              <TabsTrigger value="line">Line Chart</TabsTrigger>
              <TabsTrigger value="pie">Distribusi Anggaran</TabsTrigger>
            </TabsList>
            <TabsContent value="bar" className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `Rp ${value} juta`} />
                  <Legend />
                  <Bar dataKey="pendapatan" fill="#8884d8" name="Pendapatan" />
                  <Bar dataKey="pengeluaran" fill="#82ca9d" name="Pengeluaran" />
                </BarChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="line" className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => `Rp ${value} juta`} />
                  <Legend />
                  <Line type="monotone" dataKey="pendapatan" stroke="#8884d8" name="Pendapatan" activeDot={{ r: 8 }} />
                  <Line type="monotone" dataKey="pengeluaran" stroke="#82ca9d" name="Pengeluaran" />
                </LineChart>
              </ResponsiveContainer>
            </TabsContent>
            <TabsContent value="pie" className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `Rp ${value} juta`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
