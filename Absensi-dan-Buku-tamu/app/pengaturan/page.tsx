"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAbsensi } from "@/context/absensi-context"
import { ArrowLeft, ChevronDown } from "lucide-react"

export default function PengaturanPage() {
  const { toast } = useToast()
  const { serverMode, areaCode, setServerMode, setAreaCode } = useAbsensi()

  const [showModeSelector, setShowModeSelector] = useState(false)
  const [localServerMode, setLocalServerMode] = useState<"online" | "offline">(serverMode)
  const [localAreaCode, setLocalAreaCode] = useState(areaCode)

  const handleSave = () => {
    setServerMode(localServerMode)
    setAreaCode(localAreaCode)

    toast({
      title: "Pengaturan Disimpan",
      description: `Mode server: ${localServerMode}, Kode Wilayah: ${localAreaCode}`,
    })
  }

  const handleCancel = () => {
    setLocalServerMode(serverMode)
    setLocalAreaCode(areaCode)
    setShowModeSelector(false)
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-white">
        <div className="container py-8 max-w-md">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 border-b flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <h3 className="text-xl font-bold">Mode</h3>
            </div>
            <div className="p-6">
              <h4 className="text-lg mb-4">Pilih Mode</h4>

              <div
                className="border rounded-md mb-6 cursor-pointer"
                onClick={() => setShowModeSelector(!showModeSelector)}
              >
                <div className="p-3 flex justify-between items-center">
                  <span>{localServerMode === "online" ? "Server Online" : "Server Offline"}</span>
                  <ChevronDown className="h-5 w-5" />
                </div>
              </div>

              {showModeSelector && (
                <div className="bg-white border rounded-lg shadow-md mb-6">
                  <div
                    className={`p-4 border-b cursor-pointer ${localServerMode === "online" ? "bg-gray-100" : ""}`}
                    onClick={() => {
                      setLocalServerMode("online")
                      setShowModeSelector(false)
                    }}
                  >
                    <div className="py-2">Server Online</div>
                  </div>
                  <div
                    className={`p-4 cursor-pointer ${localServerMode === "offline" ? "bg-gray-100" : ""}`}
                    onClick={() => {
                      setLocalServerMode("offline")
                      setShowModeSelector(false)
                    }}
                  >
                    <div className="py-2">Server Offline</div>
                  </div>
                </div>
              )}

              <div className="mb-6">
                <label className="block mb-2">Kode Wilayah Desa</label>
                <Input
                  placeholder="99.99.99.9999"
                  className="bg-gray-100"
                  value={localAreaCode}
                  onChange={(e) => setLocalAreaCode(e.target.value)}
                />
              </div>

              <div className="flex justify-between mt-8">
                <Button className="bg-[#0088cc] hover:bg-[#006699]" onClick={handleSave}>
                  SIMPAN
                </Button>
                <Button
                  variant="outline"
                  className="bg-[#333] text-white hover:bg-[#555] border-0"
                  onClick={handleCancel}
                >
                  BATAL
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
