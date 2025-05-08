"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Download, Printer } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import type { Transaction } from "@/app/dashboard/keuangan/page"

interface KeuanganReportProps {
  transactions: Transaction[]
}

export function KeuanganReport({ transactions }: KeuanganReportProps) {
  const [selectedYear, setSelectedYear] = useState("2023")
  const [selectedPeriod, setSelectedPeriod] = useState("tahunan")
  const { toast } = useToast()

  // Get unique years from transactions
  const years = [...new Set(transactions.map((t) => t.tahun))].sort((a, b) => b.localeCompare(a))

  // Filter transactions based on selected year
  const filteredTransactions = transactions.filter((t) => t.tahun === selectedYear)

  // Calculate summary statistics
  const totalPendapatan = filteredTransactions
    .filter((t) => t.status === "pendapatan")
    .reduce((sum, t) => sum + t.jumlah, 0)

  const totalPengeluaran = filteredTransactions
    .filter((t) => t.status === "pengeluaran")
    .reduce((sum, t) => sum + t.jumlah, 0)

  const saldo = totalPendapatan - totalPengeluaran

  // Group transactions by category
  const pendapatanByCategory = {}
  const pengeluaranByCategory = {}

  filteredTransactions.forEach((t) => {
    if (t.status === "pendapatan") {
      if (!pendapatanByCategory[t.kategori]) {
        pendapatanByCategory[t.kategori] = 0
      }
      pendapatanByCategory[t.kategori] += t.jumlah
    } else {
      if (!pengeluaranByCategory[t.kategori]) {
        pengeluaranByCategory[t.kategori] = 0
      }
      pengeluaranByCategory[t.kategori] += t.jumlah
    }
  })

  const handleDownload = () => {
    toast({
      title: "Laporan diunduh",
      description: `Laporan keuangan ${selectedPeriod} tahun ${selectedYear} telah diunduh.`,
    })
  }

  const handlePrint = () => {
    toast({
      title: "Mencetak laporan",
      description: `Laporan keuangan ${selectedPeriod} tahun ${selectedYear} sedang dicetak.`,
    })
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex gap-2">
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

          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Pilih periode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="tahunan">Tahunan</SelectItem>
              <SelectItem value="semester">Semester</SelectItem>
              <SelectItem value="triwulan">Triwulan</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="mr-2 h-4 w-4" />
            Unduh
          </Button>
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2 h-4 w-4" />
            Cetak
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="text-center border-b pb-4">
          <CardTitle className="text-xl">LAPORAN KEUANGAN DESA SUKAMAJU</CardTitle>
          <CardDescription>
            {selectedPeriod === "tahunan"
              ? "Laporan Tahunan"
              : selectedPeriod === "semester"
                ? "Laporan Semester"
                : "Laporan Triwulan"}{" "}
            Tahun {selectedYear}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">Ringkasan Keuangan</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground">Total Pendapatan</div>
                  <div className="text-xl font-bold mt-1">Rp {totalPendapatan.toLocaleString("id-ID")}</div>
                </div>
                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground">Total Pengeluaran</div>
                  <div className="text-xl font-bold mt-1">Rp {totalPengeluaran.toLocaleString("id-ID")}</div>
                </div>
                <div className="border rounded-md p-4">
                  <div className="text-sm text-muted-foreground">Saldo</div>
                  <div className={`text-xl font-bold mt-1 ${saldo >= 0 ? "text-green-600" : "text-red-600"}`}>
                    Rp {saldo.toLocaleString("id-ID")}
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Rincian Pendapatan</h3>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-muted">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Kategori
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                        Jumlah
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                        Persentase
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-gray-200">
                    {Object.entries(pendapatanByCategory).map(([kategori, jumlah]) => (
                      <tr key={kategori}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{kategori}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          Rp {(jumlah as number).toLocaleString("id-ID")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          {totalPendapatan > 0 ? (((jumlah as number) / totalPendapatan) * 100).toFixed(1) : 0}%
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-muted/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">Total</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right">
                        Rp {totalPendapatan.toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Rincian Pengeluaran</h3>
              <div className="border rounded-md overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-muted">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Kategori
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                        Jumlah
                      </th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">
                        Persentase
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-card divide-y divide-gray-200">
                    {Object.entries(pengeluaranByCategory).map(([kategori, jumlah]) => (
                      <tr key={kategori}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">{kategori}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          Rp {(jumlah as number).toLocaleString("id-ID")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                          {totalPengeluaran > 0 ? (((jumlah as number) / totalPengeluaran) * 100).toFixed(1) : 0}%
                        </td>
                      </tr>
                    ))}
                    <tr className="bg-muted/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">Total</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right">
                        Rp {totalPengeluaran.toLocaleString("id-ID")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-right">100%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-4 flex justify-between">
          <div className="text-sm text-muted-foreground">
            Laporan ini dibuat secara otomatis oleh sistem Siskeudes Online
          </div>
          <div className="text-sm">
            Dicetak pada:{" "}
            {new Date().toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
