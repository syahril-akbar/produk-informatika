import { BaseService } from "./base-service"
import type { Database } from "@/lib/database.types"
import { supabaseClient } from "@/lib/supabase"

type Document = Database["public"]["Tables"]["dokumen"]["Row"]

// Sample document data
const sampleDocuments: Document[] = [
  {
    id: "DOC001",
    desa_id: "DESA001",
    nomor: "SK/001/VII/2023",
    judul: "SK Pengangkatan Perangkat Desa",
    kategori: "Surat Keputusan",
    tanggal: "2023-07-15",
    status: "aktif",
    pembuat: "Kepala Desa",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "DOC002",
    desa_id: "DESA001",
    nomor: "PD/002/VII/2023",
    judul: "Peraturan Desa tentang APBDes 2023",
    kategori: "Peraturan Desa",
    tanggal: "2023-07-10",
    status: "aktif",
    pembuat: "BPD",
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
]

class AdministrasiServiceClass extends BaseService<Document> {
  constructor() {
    super("dokumen", sampleDocuments)
  }

  // Add any specialized methods needed for documents here

  async getDocumentsByCategory(desaId: string, category: string): Promise<Document[]> {
    try {
      const { data, error } = await supabaseClient
        .from("dokumen")
        .select("*")
        .eq("desa_id", desaId)
        .eq("kategori", category)
        .order("tanggal", { ascending: false })

      if (error) {
        console.error("Error fetching documents by category:", error)
        return sampleDocuments.filter((doc) => doc.kategori === category)
      }

      return (data as Document[]) || []
    } catch (err) {
      console.error("Exception in getDocumentsByCategory:", err)
      return sampleDocuments.filter((doc) => doc.kategori === category)
    }
  }
}

export const AdministrasiService = new AdministrasiServiceClass()
