"use client"

import { useState, useEffect } from "react"
import { Edit } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"

interface ProfileItem {
  id: number
  name: string
  nik: string
  lastEdit: string
  address: string
  active: boolean
}

export default function DataProfilClient() {
  const { toast } = useToast()
  const [isClient, setIsClient] = useState(false)
  const [profileData, setProfileData] = useState<ProfileItem[]>([])
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [currentItem, setCurrentItem] = useState<ProfileItem | null>(null)

  // Fungsi untuk mendapatkan data dari localStorage atau data default
  const getInitialData = () => {
    if (typeof window === "undefined") return []

    try {
      const savedData = localStorage.getItem("profileData")
      if (savedData) return JSON.parse(savedData)

      // Data default jika tidak ada data tersimpan
      return [
        {
          id: 1,
          name: "Nama Desa",
          nik: "Desa Lestari",
          lastEdit: "23/04/2025",
          address: "Kota Malang",
          active: true,
        },
        {
          id: 2,
          name: "Alamat Desa",
          nik: "Jl. Raya Desa No.123",
          lastEdit: "23/04/2025",
          address: "Kec. Lowokwaru, Kota Malang, Jawa Timur",
          active: true,
        },
        {
          id: 3,
          name: "Kepala Desa",
          nik: "Budi Santoso",
          lastEdit: "22/04/2025",
          address: "08123456789",
          active: true,
        },
        {
          id: 4,
          name: "Sekretaris",
          nik: "Siti Aminah",
          lastEdit: "21/04/2025",
          address: "08198765432",
          active: false,
        },
        {
          id: 5,
          name: "Kode Pos Desa",
          nik: "65141",
          lastEdit: "20/04/2025",
          address: "-",
          active: true,
        },
      ]
    } catch (error) {
      console.error("Error loading profile data:", error)
      return []
    }
  }

  useEffect(() => {
    setIsClient(true)
    setProfileData(getInitialData())
  }, [])

  // Simpan data ke localStorage saat data berubah
  useEffect(() => {
    if (isClient && profileData.length > 0) {
      try {
        localStorage.setItem("profileData", JSON.stringify(profileData))
      } catch (error) {
        console.error("Error saving profile data:", error)
      }
    }
  }, [profileData, isClient])

  const handleToggleActive = (id: number) => {
    setProfileData((prevData) => prevData.map((item) => (item.id === id ? { ...item, active: !item.active } : item)))

    toast({
      title: "Status berhasil diubah",
      description: "Status tampilan item telah diperbarui",
    })
  }

  const handleEdit = (item: ProfileItem) => {
    setCurrentItem(item)
    setIsEditDialogOpen(true)
  }

  const handleSaveEdit = () => {
    if (!currentItem) return

    setProfileData((prevData) =>
      prevData.map((item) =>
        item.id === currentItem.id
          ? {
              ...currentItem,
              lastEdit: new Date().toLocaleDateString("id-ID"),
            }
          : item,
      ),
    )

    setIsEditDialogOpen(false)

    toast({
      title: "Data berhasil diperbarui",
      description: "Perubahan telah disimpan",
    })
  }

  if (!isClient) {
    return (
      <div className="animate-pulse">
        <div className="h-10 bg-gray-200 rounded mb-4"></div>
        <div className="space-y-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="h-16 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50">
              <TableHead className="w-12 text-center">No</TableHead>
              <TableHead>Nama Item</TableHead>
              <TableHead>NIK</TableHead>
              <TableHead>Last Edit</TableHead>
              <TableHead>Alamat/No Telepon</TableHead>
              <TableHead className="w-24 text-center">Aktifkan</TableHead>
              <TableHead className="w-12 text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {profileData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="text-center">{item.id}</TableCell>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.nik}</TableCell>
                <TableCell>{item.lastEdit}</TableCell>
                <TableCell>{item.address}</TableCell>
                <TableCell className="text-center">
                  <Switch
                    checked={item.active}
                    onCheckedChange={() => handleToggleActive(item.id)}
                    className="data-[state=checked]:bg-blue-500"
                  />
                </TableCell>
                <TableCell className="text-center">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(item)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Data Profil</DialogTitle>
          </DialogHeader>

          {currentItem && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Nama Item
                </Label>
                <Input
                  id="name"
                  value={currentItem.name}
                  onChange={(e) => setCurrentItem({ ...currentItem, name: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nik" className="text-right">
                  NIK/Nilai
                </Label>
                <Input
                  id="nik"
                  value={currentItem.nik}
                  onChange={(e) => setCurrentItem({ ...currentItem, nik: e.target.value })}
                  className="col-span-3"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Alamat/No Telepon
                </Label>
                <Input
                  id="address"
                  value={currentItem.address}
                  onChange={(e) => setCurrentItem({ ...currentItem, address: e.target.value })}
                  className="col-span-3"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Batal
            </Button>
            <Button onClick={handleSaveEdit}>Simpan</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
