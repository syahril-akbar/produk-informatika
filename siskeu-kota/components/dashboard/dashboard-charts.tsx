"use client"

import type React from "react"
import { useEffect, useRef } from "react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const monthlyData = [
  { name: "Jan", pendapatan: 65, pengeluaran: 40 },
  { name: "Feb", pendapatan: 59, pengeluaran: 45 },
  { name: "Mar", pendapatan: 80, pengeluaran: 60 },
  { name: "Apr", pendapatan: 81, pengeluaran: 70 },
  { name: "Mei", pendapatan: 56, pengeluaran: 50 },
  { name: "Jun", pendapatan: 55, pengeluaran: 48 },
  { name: "Jul", pendapatan: 40, pengeluaran: 35 },
]

const sectorData = [
  { name: "Pendidikan", anggaran: 350, realisasi: 290 },
  { name: "Kesehatan", anggaran: 300, realisasi: 240 },
  { name: "Infrastruktur", anggaran: 280, realisasi: 220 },
  { name: "Sosial", anggaran: 200, realisasi: 170 },
  { name: "Ekonomi", anggaran: 180, realisasi: 140 },
  { name: "Administrasi", anggaran: 120, realisasi: 100 },
]

interface DashboardChartsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardCharts({ className, ...props }: DashboardChartsProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)

  // Handle window resize for charts
  useEffect(() => {
    const handleResize = () => {
      if (chartContainerRef.current) {
        // Force a re-render of the chart container
        chartContainerRef.current.style.height = "299px"
        setTimeout(() => {
          if (chartContainerRef.current) {
            chartContainerRef.current.style.height = "300px"
          }
        }, 0)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <Card className={className} {...props}>
      <CardHeader>
        <CardTitle>Tren Anggaran Kota</CardTitle>
        <CardDescription>Perbandingan pendapatan dan pengeluaran kota per bulan</CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]" ref={chartContainerRef}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={monthlyData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => `Rp ${value} M`} />
            <Legend />
            <Line type="monotone" dataKey="pendapatan" stroke="#8884d8" name="Pendapatan" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="pengeluaran" stroke="#82ca9d" name="Pengeluaran" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
