import type { Metadata } from "next"
import DataProfilClient from "@/components/data-profil-client"

export const metadata: Metadata = {
  title: "Pengaturan Tampilan | Admin DigiDesa",
  description: "Pengaturan tampilan aplikasi DigiDesa",
}

export default function TampilanPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Data Profil</h1>
      <DataProfilClient />
    </div>
  )
}
