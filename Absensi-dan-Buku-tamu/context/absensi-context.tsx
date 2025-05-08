"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Staff = {
  id: string
  name: string
  position: string
  department: string
  hasKtp: boolean
}

type Guest = {
  id: string
  name: string
  phone: string
  origin: string
  purpose: string
  date: string
  time: string
  photo?: string
}

type Attendance = {
  id: string
  staffId: string
  staffName: string
  date: string
  checkIn: string
  checkOut: string | null
  status: "hadir" | "terlambat" | "pulang-awal" | "lengkap"
}

type ServerMode = "online" | "offline"

type AbsensiContextType = {
  staff: Staff[]
  guests: Guest[]
  attendance: Attendance[]
  serverMode: ServerMode
  areaCode: string
  addStaff: (staff: Omit<Staff, "id">) => void
  updateStaff: (id: string, staff: Partial<Staff>) => void
  recordKtp: (id: string) => void
  addGuest: (guest: Omit<Guest, "id" | "date" | "time">) => void
  checkIn: (staffId: string, staffName: string) => void
  checkOut: (staffId: string) => void
  setServerMode: (mode: ServerMode) => void
  setAreaCode: (code: string) => void
  getStaffById: (id: string) => Staff | undefined
  getAttendanceByStaffId: (staffId: string) => Attendance[]
  getAttendanceByDate: (date: string) => Attendance[]
  getGuestsByDate: (date: string) => Guest[]
  getGuestsByDateRange: (startDate: string, endDate: string) => Guest[]
  getTodayAttendance: () => Attendance[]
  getWeekAttendance: () => Attendance[]
  getMonthAttendance: () => Attendance[]
  getYearAttendance: () => Attendance[]
  getTodayGuests: () => Guest[]
  getWeekGuests: () => Guest[]
  getMonthGuests: () => Guest[]
  getYearGuests: () => Guest[]
}

const AbsensiContext = createContext<AbsensiContextType | undefined>(undefined)

export function AbsensiProvider({ children }: { children: React.ReactNode }) {
  const [staff, setStaff] = useState<Staff[]>([
    {
      id: "1",
      name: "Rina Rosmawati",
      position: "KEPALA URUSAN KEUANGAN",
      department: "Keuangan",
      hasKtp: false,
    },
    {
      id: "2",
      name: "Uus Husaeni",
      position: "KEPALA SEKSI PELAYANAN MASYARAKAT",
      department: "Pelayanan",
      hasKtp: false,
    },
    {
      id: "3",
      name: "Lily Nur Indasari",
      position: "Duta Digital",
      department: "IT",
      hasKtp: false,
    },
    {
      id: "4",
      name: "Arifin kadingo",
      position: "kader digital",
      department: "IT",
      hasKtp: false,
    },
    {
      id: "5",
      name: "AGUSTINA TIALA GOLI",
      position: "SEKRETARIS DESA",
      department: "Administrasi",
      hasKtp: false,
    },
    {
      id: "6",
      name: "Epul Saepuloh",
      position: "KEPALA URUSAN PERENCANAAN",
      department: "Perencanaan",
      hasKtp: false,
    },
    {
      id: "7",
      name: "AGUSTINUS PATI WEDO",
      position: "Pj. Desa",
      department: "Pemerintahan",
      hasKtp: false,
    },
  ])

  const [guests, setGuests] = useState<Guest[]>([
    {
      id: "1",
      name: "Udin",
      phone: "9595",
      origin: "Ugg",
      purpose: "Kunjungan",
      date: "2024-04-27",
      time: "07:24",
      photo: "/guest-photo.jpg",
    },
  ])

  const [attendance, setAttendance] = useState<Attendance[]>([
    {
      id: "1",
      staffId: "1",
      staffName: "Rina Rosmawati",
      date: "2024-04-28",
      checkIn: "08:15",
      checkOut: "17:05",
      status: "lengkap",
    },
    {
      id: "2",
      staffId: "2",
      staffName: "Uus Husaeni",
      date: "2024-04-28",
      checkIn: "07:55",
      checkOut: "16:30",
      status: "pulang-awal",
    },
    {
      id: "3",
      staffId: "3",
      staffName: "Lily Nur Indasari",
      date: "2024-04-28",
      checkIn: "09:10",
      checkOut: "17:15",
      status: "terlambat",
    },
    {
      id: "4",
      staffId: "4",
      staffName: "Arifin kadingo",
      date: "2024-04-27",
      checkIn: "08:05",
      checkOut: "17:00",
      status: "lengkap",
    },
    {
      id: "5",
      staffId: "5",
      staffName: "AGUSTINA TIALA GOLI",
      date: "2024-04-27",
      checkIn: "08:00",
      checkOut: "17:10",
      status: "lengkap",
    },
  ])
  const [serverMode, setServerMode] = useState<ServerMode>("online")
  const [areaCode, setAreaCode] = useState<string>("99.99.99.9999")

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedStaff = localStorage.getItem("staff")
    const savedGuests = localStorage.getItem("guests")
    const savedAttendance = localStorage.getItem("attendance")
    const savedServerMode = localStorage.getItem("serverMode")
    const savedAreaCode = localStorage.getItem("areaCode")

    if (savedStaff) setStaff(JSON.parse(savedStaff))
    if (savedGuests) setGuests(JSON.parse(savedGuests))
    if (savedAttendance) setAttendance(JSON.parse(savedAttendance))
    if (savedServerMode) setServerMode(JSON.parse(savedServerMode))
    if (savedAreaCode) setAreaCode(savedAreaCode)
  }, [])

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("staff", JSON.stringify(staff))
    localStorage.setItem("guests", JSON.stringify(guests))
    localStorage.setItem("attendance", JSON.stringify(attendance))
    localStorage.setItem("serverMode", JSON.stringify(serverMode))
    localStorage.setItem("areaCode", areaCode)
  }, [staff, guests, attendance, serverMode, areaCode])

  const addStaff = (newStaff: Omit<Staff, "id">) => {
    const staffWithId = {
      ...newStaff,
      id: Date.now().toString(),
    }
    setStaff((prev) => [...prev, staffWithId])
  }

  const updateStaff = (id: string, updatedStaff: Partial<Staff>) => {
    setStaff((prev) => prev.map((s) => (s.id === id ? { ...s, ...updatedStaff } : s)))
  }

  const recordKtp = (id: string) => {
    setStaff((prev) => prev.map((s) => (s.id === id ? { ...s, hasKtp: true } : s)))
  }

  const addGuest = (newGuest: Omit<Guest, "id" | "date" | "time">) => {
    const now = new Date()
    const guestWithId = {
      ...newGuest,
      id: Date.now().toString(),
      date: now.toISOString().split("T")[0],
      time: now.toTimeString().split(" ")[0].substring(0, 5),
    }
    setGuests((prev) => [...prev, guestWithId])
  }

  const checkIn = (staffId: string, staffName: string) => {
    const now = new Date()
    const today = now.toISOString().split("T")[0]
    const time = now.toTimeString().split(" ")[0].substring(0, 5)

    // Check if already checked in today
    const existingAttendance = attendance.find((a) => a.staffId === staffId && a.date === today)

    if (existingAttendance) {
      return // Already checked in
    }

    const isLate = now.getHours() >= 9 // Assuming work starts at 9 AM

    const newAttendance: Attendance = {
      id: Date.now().toString(),
      staffId,
      staffName,
      date: today,
      checkIn: time,
      checkOut: null,
      status: isLate ? "terlambat" : "hadir",
    }

    setAttendance((prev) => [...prev, newAttendance])
  }

  const checkOut = (staffId: string) => {
    const now = new Date()
    const today = now.toISOString().split("T")[0]
    const time = now.toTimeString().split(" ")[0].substring(0, 5)

    const isEarlyLeave = now.getHours() < 17 // Assuming work ends at 5 PM

    setAttendance((prev) =>
      prev.map((a) => {
        if (a.staffId === staffId && a.date === today && !a.checkOut) {
          return {
            ...a,
            checkOut: time,
            status: isEarlyLeave ? "pulang-awal" : "lengkap",
          }
        }
        return a
      }),
    )
  }

  const getStaffById = (id: string) => {
    return staff.find((s) => s.id === id)
  }

  const getAttendanceByStaffId = (staffId: string) => {
    return attendance.filter((a) => a.staffId === staffId)
  }

  const getAttendanceByDate = (date: string) => {
    return attendance.filter((a) => a.date === date)
  }

  const getGuestsByDate = (date: string) => {
    return guests.filter((g) => g.date === date)
  }

  const getGuestsByDateRange = (startDate: string, endDate: string) => {
    return guests.filter((g) => g.date >= startDate && g.date <= endDate)
  }

  // Helper function to get date ranges
  const getDateRange = (days: number) => {
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - days)
    return {
      start: start.toISOString().split("T")[0],
      end: end.toISOString().split("T")[0],
    }
  }

  const getTodayAttendance = () => {
    const today = new Date().toISOString().split("T")[0]
    return getAttendanceByDate(today)
  }

  const getWeekAttendance = () => {
    const { start, end } = getDateRange(7)
    return attendance.filter((a) => a.date >= start && a.date <= end)
  }

  const getMonthAttendance = () => {
    const { start, end } = getDateRange(30)
    return attendance.filter((a) => a.date >= start && a.date <= end)
  }

  const getYearAttendance = () => {
    const { start, end } = getDateRange(365)
    return attendance.filter((a) => a.date >= start && a.date <= end)
  }

  const getTodayGuests = () => {
    const today = new Date().toISOString().split("T")[0]
    return getGuestsByDate(today)
  }

  const getWeekGuests = () => {
    const { start, end } = getDateRange(7)
    return getGuestsByDateRange(start, end)
  }

  const getMonthGuests = () => {
    const { start, end } = getDateRange(30)
    return getGuestsByDateRange(start, end)
  }

  const getYearGuests = () => {
    const { start, end } = getDateRange(365)
    return getGuestsByDateRange(start, end)
  }

  const value = {
    staff,
    guests,
    attendance,
    serverMode,
    areaCode,
    addStaff,
    updateStaff,
    recordKtp,
    addGuest,
    checkIn,
    checkOut,
    setServerMode,
    setAreaCode,
    getStaffById,
    getAttendanceByStaffId,
    getAttendanceByDate,
    getGuestsByDate,
    getGuestsByDateRange,
    getTodayAttendance,
    getWeekAttendance,
    getMonthAttendance,
    getYearAttendance,
    getTodayGuests,
    getWeekGuests,
    getMonthGuests,
    getYearGuests,
  }

  return <AbsensiContext.Provider value={value}>{children}</AbsensiContext.Provider>
}

export function useAbsensi() {
  const context = useContext(AbsensiContext)
  if (context === undefined) {
    throw new Error("useAbsensi must be used within an AbsensiProvider")
  }
  return context
}
