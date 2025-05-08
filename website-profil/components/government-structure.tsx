import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const governmentData = [
  {
    name: "H. Ahmad Sulaiman",
    position: "Kepala Desa",
    image: "/placeholder.svg?height=200&width=200&text=Kepala+Desa",
  },
  {
    name: "Budi Santoso",
    position: "Sekretaris Desa",
    image: "/placeholder.svg?height=200&width=200&text=Sekretaris+Desa",
  },
  {
    name: "Siti Aminah",
    position: "Bendahara Desa",
    image: "/placeholder.svg?height=200&width=200&text=Bendahara+Desa",
  },
  {
    name: "Hendra Wijaya",
    position: "Kaur Perencanaan",
    image: "/placeholder.svg?height=200&width=200&text=Kaur+Perencanaan",
  },
  {
    name: "Dewi Lestari",
    position: "Kaur Keuangan",
    image: "/placeholder.svg?height=200&width=200&text=Kaur+Keuangan",
  },
  {
    name: "Rudi Hartono",
    position: "Kaur Umum",
    image: "/placeholder.svg?height=200&width=200&text=Kaur+Umum",
  },
  {
    name: "Agus Setiawan",
    position: "Kasi Pemerintahan",
    image: "/placeholder.svg?height=200&width=200&text=Kasi+Pemerintahan",
  },
  {
    name: "Rina Wati",
    position: "Kasi Kesejahteraan",
    image: "/placeholder.svg?height=200&width=200&text=Kasi+Kesejahteraan",
  },
  {
    name: "Joko Susilo",
    position: "Kasi Pelayanan",
    image: "/placeholder.svg?height=200&width=200&text=Kasi+Pelayanan",
  },
]

export default function GovernmentStructure() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {governmentData.map((official, index) => (
        <Card key={index} className="overflow-hidden border-secondary/20 hover:border-secondary transition-colors">
          <div className="relative h-48 bg-muted">
            <Image src={official.image || "/placeholder.svg"} alt={official.name} fill className="object-cover" />
          </div>
          <CardHeader className="text-center">
            <CardTitle>{official.name}</CardTitle>
            <CardDescription>{official.position}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  )
}
