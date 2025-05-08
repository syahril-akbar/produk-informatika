"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAbsensi } from "@/context/absensi-context"
import Image from "next/image"

export default function AbsensiPage() {
  const { toast } = useToast()
  const { staff, checkIn, checkOut, getTodayAttendance } = useAbsensi()

  const [formData, setFormData] = useState({
    name: "",
    niap: "",
    position: "",
    time: new Date().toTimeString().split(" ")[0].substring(0, 5),
  })

  const [selectedStaff, setSelectedStaff] = useState<string | null>(null)
  const [todayAttendance, setTodayAttendance] = useState<any[]>([])

  useEffect(() => {
    // Update attendance data
    setTodayAttendance(getTodayAttendance())

    // Update time every minute
    const interval = setInterval(() => {
      setFormData((prev) => ({
        ...prev,
        time: new Date().toTimeString().split(" ")[0].substring(0, 5),
      }))
    }, 60000)

    return () => clearInterval(interval)
  }, [getTodayAttendance])

  // Find staff by NIAP
  const handleNiapChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const niap = e.target.value
    setFormData((prev) => ({ ...prev, niap }))

    // Find staff with matching NIAP
    const matchedStaff = staff.find((s) => s.id === niap)
    if (matchedStaff) {
      setFormData((prev) => ({
        ...prev,
        name: matchedStaff.name,
        position: matchedStaff.position,
      }))
      setSelectedStaff(matchedStaff.id)
    } else {
      setFormData((prev) => ({
        ...prev,
        name: "",
        position: "",
      }))
      setSelectedStaff(null)
    }
  }

  const handleCheckIn = () => {
    if (!selectedStaff) {
      toast({
        title: "Error",
        description: "Staff tidak ditemukan. Masukkan NIAP yang valid.",
        variant: "destructive",
      })
      return
    }

    // Check if already checked in
    const alreadyCheckedIn = todayAttendance.some((a) => a.staffId === selectedStaff)
    if (alreadyCheckedIn) {
      toast({
        title: "Sudah Absen",
        description: "Anda sudah melakukan absen masuk hari ini.",
        variant: "destructive",
      })
      return
    }

    checkIn(selectedStaff, formData.name)

    // Update today's attendance data
    setTodayAttendance(getTodayAttendance())

    toast({
      title: "Absen Masuk Berhasil",
      description: `${formData.name} telah berhasil melakukan absen masuk pada ${formData.time}`,
    })
  }

  const handleCheckOut = () => {
    if (!selectedStaff) {
      toast({
        title: "Error",
        description: "Staff tidak ditemukan. Masukkan NIAP yang valid.",
        variant: "destructive",
      })
      return
    }

    // Check if already checked in
    const attendance = todayAttendance.find((a) => a.staffId === selectedStaff)
    if (!attendance) {
      toast({
        title: "Belum Absen Masuk",
        description: "Anda belum melakukan absen masuk hari ini.",
        variant: "destructive",
      })
      return
    }

    // Check if already checked out
    if (attendance.checkOut) {
      toast({
        title: "Sudah Absen Pulang",
        description: "Anda sudah melakukan absen pulang hari ini.",
        variant: "destructive",
      })
      return
    }

    checkOut(selectedStaff)

    // Update today's attendance data
    setTodayAttendance(getTodayAttendance())

    toast({
      title: "Absen Pulang Berhasil",
      description: `${formData.name} telah berhasil melakukan absen pulang pada ${formData.time}`,
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <div className="bg-white min-h-screen flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full overflow-hidden">
            <div className="bg-[#008080] text-white p-3 font-bold">Absensi</div>
            <div className="p-6 grid grid-cols-[120px_1fr] gap-4">
              <div className="row-span-4">
                <Image
                  src={selectedStaff ? "/staff-photo.jpg" : "/placeholder-photo.jpg"}
                  alt="Foto Profil"
                  width={120}
                  height={150}
                  className="object-cover rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Nama</label>
                <Input
                  placeholder="Masukkan nama"
                  className="bg-gray-100"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  readOnly={!!selectedStaff}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">NIAP</label>
                <Input
                  placeholder="Masukkan NIAP"
                  className="bg-gray-100"
                  value={formData.niap}
                  onChange={handleNiapChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Jabatan</label>
                <Input
                  placeholder="Masukkan jabatan"
                  className="bg-gray-100"
                  value={formData.position}
                  onChange={(e) => setFormData((prev) => ({ ...prev, position: e.target.value }))}
                  readOnly={!!selectedStaff}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Jam</label>
                <Input type="time" className="bg-gray-100" value={formData.time} readOnly />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4">
              <Button className="bg-[#008080] hover:bg-[#006666] text-white p-6" onClick={handleCheckIn}>
                <span className="mr-2">➡️</span> Absen Masuk
              </Button>
              <Button className="bg-[#f0ad4e] hover:bg-[#ec971f] text-white p-6" onClick={handleCheckOut}>
                <span className="mr-2">⬅️</span> Absen Pulang
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
