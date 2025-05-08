import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative h-10 w-10">
                <Image
                  src="/placeholder.svg?height=40&width=40&text=Logo"
                  alt="Desa Pao-Pao Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-xl">Desa Pao-Pao</span>
                <span className="text-xs text-white/80">Kabupaten Barru</span>
              </div>
            </div>
            <p className="mb-4">
              Website resmi Desa Pao-Pao. Menyediakan informasi lengkap tentang desa, kegiatan, dan layanan untuk
              masyarakat.
            </p>
            <div className="flex space-x-4">
              <Link href="https://facebook.com" className="hover:text-secondary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://instagram.com" className="hover:text-secondary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="mailto:info@desapaopao.desa.id" className="hover:text-secondary">
                <Mail className="h-5 w-5" />
                <span className="sr-only">Email</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Kontak</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="h-5 w-5 mr-2 mt-0.5" />
                <span>Jl. Pao-Pao No. 123, Kecamatan Somba Opu, Kabupaten Barru, Sulawesi Selatan</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                <span>+62 812 3456 7890</span>
              </div>
              <div className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                <span>info@desapaopao.desa.id</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-secondary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/profil" className="hover:text-secondary">
                  Profil Desa
                </Link>
              </li>
              <li>
                <Link href="/berita" className="hover:text-secondary">
                  Berita
                </Link>
              </li>
              <li>
                <Link href="/listing" className="hover:text-secondary">
                  Listing
                </Link>
              </li>
              <li>
                <Link href="/ppid" className="hover:text-secondary">
                  PPID
                </Link>
              </li>
              <li>
                <Link href="/idm" className="hover:text-secondary">
                  IDM
                </Link>
              </li>
              <li>
                <Link href="/cek-bansos" className="hover:text-secondary">
                  Belanja
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-white/20">
        <div className="container py-6 text-center">
          <p>© {new Date().getFullYear()} Desa Pao-Pao. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}
