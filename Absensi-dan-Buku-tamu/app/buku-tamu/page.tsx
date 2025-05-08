"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useAbsensi } from "@/context/absensi-context"
import { X } from "lucide-react"
import Image from "next/image"

export default function BukuTamuPage() {
  const { toast } = useToast()
  const { addGuest } = useAbsensi()

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    origin: "",
    purpose: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, purpose: value }))
  }

  const handleSubmit = () => {
    // Validate form
    if (!formData.name || !formData.phone || !formData.origin || !formData.purpose) {
      toast({
        title: "Form tidak lengkap",
        description: "Silakan lengkapi semua field yang diperlukan.",
        variant: "destructive",
      })
      return
    }

    // Add guest
    addGuest({
      name: formData.name,
      phone: formData.phone,
      origin: formData.origin,
      purpose: formData.purpose,
    })

    // Reset form
    setFormData({
      name: "",
      phone: "",
      origin: "",
      purpose: "",
    })

    // Show success message
    toast({
      title: "Berhasil",
      description: "Data tamu berhasil disimpan.",
    })
  }

  const handleCancel = () => {
    // Reset form
    setFormData({
      name: "",
      phone: "",
      origin: "",
      purpose: "",
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1">
        <div className="bg-white min-h-screen flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full overflow-hidden">
            <div className="bg-[#008080] text-white p-3 font-bold">Form Buku Tamu</div>
            <div className="p-6 grid grid-cols-[120px_1fr] gap-4">
              <div className="row-span-4">
                <Image
                  src="/guest-photo.jpg"
                  alt="Foto Tamu"
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
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">No.Telepon/HP</label>
                <Input
                  placeholder="Masukkan nomor telepon"
                  className="bg-gray-100"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Asal/Instansi</label>
                <Input
                  placeholder="Masukkan asal/instansi"
                  className="bg-gray-100"
                  name="origin"
                  value={formData.origin}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Keperluan</label>
                <Select onValueChange={handleSelectChange} value={formData.purpose}>
                  <SelectTrigger className="bg-gray-100">
                    <SelectValue placeholder="Pilih Keperluan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="konsultasi">Konsultasi</SelectItem>
                    <SelectItem value="pengaduan">Pengaduan</SelectItem>
                    <SelectItem value="kunjungan">Kunjungan</SelectItem>
                    <SelectItem value="lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4">
              <Button
                variant="outline"
                className="bg-[#f0ad4e] hover:bg-[#ec971f] text-white border-0"
                onClick={handleCancel}
              >
                <X className="mr-2 h-4 w-4" /> Batal
              </Button>
              <Button className="bg-[#008080] hover:bg-[#006666] text-white" onClick={handleSubmit}>
                <span className="mr-2">✓</span> Konfirmasi
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
