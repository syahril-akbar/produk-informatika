export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          password_hash: string
          name: string
          role: "kepala_desa" | "sekretaris" | "bendahara" | "kaur_keuangan" | "operator"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          password_hash: string
          name: string
          role: "kepala_desa" | "sekretaris" | "bendahara" | "kaur_keuangan" | "operator"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          password_hash?: string
          name?: string
          role?: "kepala_desa" | "sekretaris" | "bendahara" | "kaur_keuangan" | "operator"
          created_at?: string
          updated_at?: string
        }
      }
      desa: {
        Row: {
          id: string
          nama: string
          alamat: string
          telepon?: string
          email?: string
          website?: string
          luas_wilayah?: number
          jumlah_dusun?: number
          jumlah_rw?: number
          jumlah_rt?: number
          batas_utara?: string
          batas_selatan?: string
          batas_timur?: string
          batas_barat?: string
          sejarah?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          nama: string
          alamat: string
          telepon?: string
          email?: string
          website?: string
          luas_wilayah?: number
          jumlah_dusun?: number
          jumlah_rw?: number
          jumlah_rt?: number
          batas_utara?: string
          batas_selatan?: string
          batas_timur?: string
          batas_barat?: string
          sejarah?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          nama?: string
          alamat?: string
          telepon?: string
          email?: string
          website?: string
          luas_wilayah?: number
          jumlah_dusun?: number
          jumlah_rw?: number
          jumlah_rt?: number
          batas_utara?: string
          batas_selatan?: string
          batas_timur?: string
          batas_barat?: string
          sejarah?: string
          created_at?: string
          updated_at?: string
        }
      }
      user_desa: {
        Row: {
          id: string
          user_id: string
          desa_id: string
        }
        Insert: {
          id?: string
          user_id: string
          desa_id: string
        }
        Update: {
          id?: string
          user_id?: string
          desa_id?: string
        }
      }
      transaksi: {
        Row: {
          id: string
          desa_id: string
          tanggal: string
          keterangan: string
          kategori: string
          jumlah: number
          status: "pendapatan" | "pengeluaran"
          sumber: string
          tahun: string
          created_by?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          desa_id: string
          tanggal: string
          keterangan: string
          kategori: string
          jumlah: number
          status: "pendapatan" | "pengeluaran"
          sumber: string
          tahun: string
          created_by?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          desa_id?: string
          tanggal?: string
          keterangan?: string
          kategori?: string
          jumlah?: number
          status?: "pendapatan" | "pengeluaran"
          sumber?: string
          tahun?: string
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      dokumen: {
        Row: {
          id: string
          desa_id: string
          nomor: string
          judul: string
          kategori: string
          tanggal: string
          status: "aktif" | "kadaluarsa" | "draft"
          pembuat: string
          file_url?: string
          created_by?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          desa_id: string
          nomor: string
          judul: string
          kategori: string
          tanggal: string
          status: "aktif" | "kadaluarsa" | "draft"
          pembuat: string
          file_url?: string
          created_by?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          desa_id?: string
          nomor?: string
          judul?: string
          kategori?: string
          tanggal?: string
          status?: "aktif" | "kadaluarsa" | "draft"
          pembuat?: string
          file_url?: string
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      laporan: {
        Row: {
          id: string
          desa_id: string
          judul: string
          jenis: string
          periode: string
          tanggal: string
          pembuat: string
          status: "draft" | "final" | "disetujui"
          file_url?: string
          created_by?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          desa_id: string
          judul: string
          jenis: string
          periode: string
          tanggal: string
          pembuat: string
          status: "draft" | "final" | "disetujui"
          file_url?: string
          created_by?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          desa_id?: string
          judul?: string
          jenis?: string
          periode?: string
          tanggal?: string
          pembuat?: string
          status?: "draft" | "final" | "disetujui"
          file_url?: string
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      penduduk: {
        Row: {
          id: string
          desa_id: string
          nik: string
          nama: string
          tempat_lahir: string
          tanggal_lahir: string
          jenis_kelamin: "L" | "P"
          alamat: string
          rt: string
          rw: string
          agama: string
          status_perkawinan: string
          pekerjaan?: string
          kewarganegaraan: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          desa_id: string
          nik: string
          nama: string
          tempat_lahir: string
          tanggal_lahir: string
          jenis_kelamin: "L" | "P"
          alamat: string
          rt: string
          rw: string
          agama: string
          status_perkawinan: string
          pekerjaan?: string
          kewarganegaraan?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          desa_id?: string
          nik?: string
          nama?: string
          tempat_lahir?: string
          tanggal_lahir?: string
          jenis_kelamin?: "L" | "P"
          alamat?: string
          rt?: string
          rw?: string
          agama?: string
          status_perkawinan?: string
          pekerjaan?: string
          kewarganegaraan?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
