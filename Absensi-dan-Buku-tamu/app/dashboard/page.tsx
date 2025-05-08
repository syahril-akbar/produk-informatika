"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAbsensi } from "@/context/absensi-context"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const {
    staff,
    getTodayGuests,
    getWeekGuests,
    getMonthGuests,
    getYearGuests,
    getTodayAttendance,
    getWeekAttendance,
    getMonthAttendance,
    getYearAttendance,
  } = useAbsensi()

  const [searchTerm, setSearchTerm] = useState("")

  // Get guest counts
  const todayGuestsCount = getTodayGuests().length
  const weekGuestsCount = getWeekGuests().length
  const monthGuestsCount = getMonthGuests().length
  const yearGuestsCount = getYearGuests().length

  // Get attendance counts
  const todayAttendanceCount = getTodayAttendance().length
  const weekAttendanceCount = getWeekAttendance().length
  const monthAttendanceCount = getMonthAttendance().length
  const yearAttendanceCount = getYearAttendance().length

  // Get all guests for display
  const allGuests = getYearGuests()

  // Filter guests based on search term
  const filteredGuests = allGuests.filter(
    (guest) =>
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.origin.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.purpose.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-white py-8">
        <div className="container">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <Tabs defaultValue="buku-tamu">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="resepsionis">Resepsionis</TabsTrigger>
                <TabsTrigger value="absensi-staff">Absensi Staff</TabsTrigger>
                <TabsTrigger value="buku-tamu">Buku Tamu</TabsTrigger>
              </TabsList>

              <TabsContent value="buku-tamu" className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold">Manajemen Buku Tamu</h3>
                  <span className="text-sm text-gray-500">
                    Hari ini:{" "}
                    {new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
                  </span>
                </div>

                <div className="grid grid-cols-4 gap-4">
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <h4 className="text-purple-600 text-xl font-bold">{todayGuestsCount} Tamu</h4>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Hari Ini</span>
                      <span>01</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <h4 className="text-blue-600 text-xl font-bold">{weekGuestsCount} Tamu</h4>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Minggu Ini</span>
                      <span>01</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <h4 className="text-red-600 text-xl font-bold">{monthGuestsCount} Tamu</h4>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Bulan Ini</span>
                      <span>01</span>
                    </div>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                    <h4 className="text-green-600 text-xl font-bold">{yearGuestsCount} Tamu</h4>
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>Tahun Ini</span>
                      <span>75</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <div className="flex justify-between items-center mb-4">
                    <h4 className="font-bold">Log Buku Tamu</h4>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <span className="mr-1">🔍</span> Cetak Log
                    </Button>
                  </div>

                  <div className="flex gap-4 mb-4">
                    <Button variant="outline" size="sm">
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      Sepanjang Tahun Ini
                    </Button>
                    <div className="relative ml-auto">
                      <Input
                        placeholder="Cari..."
                        className="pl-8 w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <span className="absolute left-2 top-2.5 text-gray-400">🔍</span>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="p-2 text-left">Tanggal</th>
                          <th className="p-2 text-left">Nama Tamu</th>
                          <th className="p-2 text-left">Nomor Telepon</th>
                          <th className="p-2 text-left">Asal/Instansi</th>
                          <th className="p-2 text-left">Keperluan</th>
                          <th className="p-2 text-left">Foto</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredGuests.length > 0 ? (
                          filteredGuests.map((guest) => (
                            <tr key={guest.id} className="border-b">
                              <td className="p-2">
                                {guest.date}, {guest.time}
                              </td>
                              <td className="p-2">{guest.name}</td>
                              <td className="p-2">{guest.phone}</td>
                              <td className="p-2">{guest.origin}</td>
                              <td className="p-2">{guest.purpose}</td>
                              <td className="p-2">
                                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                  <span className="text-gray-500">👤</span>
                                </div>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="p-4 text-center text-gray-500">
                              Tidak ada data tamu yang ditemukan
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="absensi-staff">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-bold">Manajemen Absensi Staff</h3>
                    <span className="text-sm text-gray-500">
                      Hari ini:{" "}
                      {new Date().toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })}
                    </span>
                  </div>

                  <div className="grid grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                      <h4 className="text-purple-600 text-xl font-bold">{todayAttendanceCount} Staff</h4>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Hari Ini</span>
                        <span>01</span>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                      <h4 className="text-blue-600 text-xl font-bold">{weekAttendanceCount} Staff</h4>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Minggu Ini</span>
                        <span>01</span>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                      <h4 className="text-red-600 text-xl font-bold">{monthAttendanceCount} Staff</h4>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Bulan Ini</span>
                        <span>01</span>
                      </div>
                    </div>
                    <div className="bg-white p-4 rounded-lg border border-gray-200 text-center">
                      <h4 className="text-green-600 text-xl font-bold">{yearAttendanceCount} Staff</h4>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>Tahun Ini</span>
                        <span>75</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold">Laporan Absensi Staff</h4>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <span className="mr-1">🔍</span> Cetak Laporan
                      </Button>
                    </div>

                    <div className="flex gap-4 mb-4">
                      <Button variant="outline" size="sm">
                        Filter
                      </Button>
                      <Button variant="outline" size="sm">
                        Sepanjang Tahun Ini
                      </Button>
                      <div className="relative ml-auto">
                        <Input
                          placeholder="Cari staff..."
                          className="pl-8 w-64"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <span className="absolute left-2 top-2.5 text-gray-400">🔍</span>
                      </div>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="p-2 text-left">Tanggal</th>
                            <th className="p-2 text-left">Nama Staff</th>
                            <th className="p-2 text-left">Jabatan</th>
                            <th className="p-2 text-left">Jam Masuk</th>
                            <th className="p-2 text-left">Jam Pulang</th>
                            <th className="p-2 text-left">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getYearAttendance().length > 0 ? (
                            getYearAttendance().map((attendance) => {
                              const staffData = staff.find((s) => s.id === attendance.staffId)
                              return (
                                <tr key={attendance.id} className="border-b">
                                  <td className="p-2">{attendance.date}</td>
                                  <td className="p-2">{attendance.staffName}</td>
                                  <td className="p-2">{staffData?.position || "-"}</td>
                                  <td className="p-2">{attendance.checkIn}</td>
                                  <td className="p-2">{attendance.checkOut || "-"}</td>
                                  <td className="p-2">
                                    <span
                                      className={`px-2 py-1 rounded-full text-xs ${
                                        attendance.status === "hadir"
                                          ? "bg-green-100 text-green-800"
                                          : attendance.status === "terlambat"
                                            ? "bg-yellow-100 text-yellow-800"
                                            : attendance.status === "pulang-awal"
                                              ? "bg-orange-100 text-orange-800"
                                              : "bg-blue-100 text-blue-800"
                                      }`}
                                    >
                                      {attendance.status === "hadir"
                                        ? "Hadir"
                                        : attendance.status === "terlambat"
                                          ? "Terlambat"
                                          : attendance.status === "pulang-awal"
                                            ? "Pulang Awal"
                                            : "Lengkap"}
                                    </span>
                                  </td>
                                </tr>
                              )
                            })
                          ) : (
                            <tr>
                              <td colSpan={6} className="p-4 text-center text-gray-500">
                                Tidak ada data absensi yang ditemukan
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="resepsionis">
                <div className="p-4 text-center">
                  <h3 className="text-lg font-bold mb-4">Resepsionis</h3>
                  <p>Data resepsionis akan ditampilkan di sini.</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}
