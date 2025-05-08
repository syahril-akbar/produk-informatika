"use client"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { useAbsensi } from "@/context/absensi-context"
import { ArrowLeft } from "lucide-react"

export default function StaffPage() {
  const { toast } = useToast()
  const { staff, recordKtp } = useAbsensi()

  const handleRecordKtp = (id: string, name: string) => {
    recordKtp(id)

    toast({
      title: "KTP Berhasil Direkam",
      description: `KTP untuk ${name} telah berhasil direkam.`,
    })
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-1 bg-white">
        <div className="container py-8 max-w-2xl">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="p-4 border-b flex items-center">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <h3 className="text-xl font-bold">Staff</h3>

              <Button className="ml-auto bg-[#f0ad4e] hover:bg-[#ec971f] text-white">Simpan dan Keluar</Button>
            </div>

            <div className="divide-y">
              {staff.map((s) => (
                <div key={s.id} className="p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold">{s.name}</h4>
                    <p className="text-gray-500 text-sm">{s.position}</p>
                  </div>

                  <Button
                    className={`${s.hasKtp ? "bg-green-500 hover:bg-green-600" : "bg-[#0088cc] hover:bg-[#006699]"}`}
                    onClick={() => handleRecordKtp(s.id, s.name)}
                    disabled={s.hasKtp}
                  >
                    {s.hasKtp ? "KTP TEREKAM" : "REKAM KTP"}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
