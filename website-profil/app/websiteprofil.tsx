"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Facebook, Instagram, Twitter, Youtube, PhoneIcon as WhatsApp } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

export default function WebsiteProfil() {
  // Refs for scroll animations
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const otherFeaturesRef = useRef(null)
  const ctaRef = useRef(null)

  // Check if elements are in view
  const heroInView = useInView(heroRef, { once: true, amount: 0.3 })
  const featuresInView = useInView(featuresRef, { once: true, amount: 0.1 })
  const otherFeaturesInView = useInView(otherFeaturesRef, { once: true, amount: 0.3 })
  const ctaInView = useInView(ctaRef, { once: true, amount: 0.5 })

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header - Removed navbar */}
      <header className="bg-emerald-700 text-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              DIGITAL KOTA
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section - Removed button */}
        <section className="py-12 md:py-20">
          <motion.div
            ref={heroRef}
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="container mx-auto px-4 grid md:grid-cols-2 gap-8 items-center"
          >
            <motion.div variants={fadeIn}>
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Dapatkan berbagai manfaat dari website profil desa
              </h1>
              <p className="text-gray-600 mb-6">
                Dapatkan berbagai manfaat dari membuat website profil desa Anda. Tingkatkan transparansi, akses
                informasi publik, dan layanan digital bagi masyarakat desa. Dengan website profil desa, Anda dapat
                mempromosikan potensi desa, publikasi kegiatan, dan menyediakan informasi penting untuk warga desa.
              </p>
            </motion.div>
            <motion.div variants={fadeIn} className="relative h-64 md:h-80">
              <Image
                src="/images/hero/desa-pao-pao.png"
                alt="Website Profil Desa Pao-Pao"
                fill
                className="object-cover"
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-center mb-12"
            >
              Fitur
            </motion.h2>

            <div ref={featuresRef} className="space-y-16">
              {/* Feature Item */}
              <motion.div
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                variants={fadeIn}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-3">Profil Pemerintahan</h3>
                  <p className="text-gray-600 mb-4">
                    Menampilkan struktur organisasi pemerintah desa dan informasi lengkap pemerintahan desa.
                  </p>
                </div>
                <div>
                  <Image
                    src="/images/features/profil-pemerintahan.png"
                    alt="Profil Pemerintahan Desa"
                    width={500}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>

              {/* Feature Item */}
              <motion.div
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ delay: 0.2 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div className="order-2 md:order-1">
                  <Image
                    src="/images/features/profil-desa.png"
                    alt="Profil Desa"
                    width={500}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-xl font-semibold mb-3">Profil Desa</h3>
                  <p className="text-gray-600 mb-4">
                    Menampilkan informasi lengkap tentang desa, seperti sejarah dan profil wilayah desa.
                  </p>
                </div>
              </motion.div>

              {/* Feature Item */}
              <motion.div
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ delay: 0.4 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-3">Statistik</h3>
                  <p className="text-gray-600 mb-4">
                    Menampilkan berbagai statistik dan demografi desa yang disajikan dalam bentuk grafik interaktif
                    untuk memudahkan visualisasi.
                  </p>
                </div>
                <div>
                  <Image
                    src="/images/features/statistik.png"
                    alt="Statistik Desa"
                    width={500}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>

              {/* Feature Item */}
              <motion.div
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ delay: 0.6 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div className="order-2 md:order-1">
                  <Image
                    src="/images/features/publikasi.png"
                    alt="Publikasi Umum"
                    width={500}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-xl font-semibold mb-3">Publikasi Umum</h3>
                  <p className="text-gray-600 mb-4">
                    Menampilkan berita, pengumuman, dan informasi terkait di desa, serta kalender kegiatan untuk
                    memudahkan akses informasi masyarakat.
                  </p>
                </div>
              </motion.div>

              {/* Feature Item */}
              <motion.div
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ delay: 0.8 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-3">Bank Data Desa</h3>
                  <p className="text-gray-600 mb-4">
                    Menyediakan akses data dan dokumen penting yang dapat diakses oleh masyarakat untuk transparansi dan
                    keterbukaan data.
                  </p>
                </div>
                <div>
                  <Image
                    src="/images/features/bank-data.png"
                    alt="Bank Data Desa"
                    width={500}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>

              {/* Feature Item */}
              <motion.div
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ delay: 1.0 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div className="order-2 md:order-1">
                  <Image
                    src="/images/features/potensi-desa.png"
                    alt="Potensi dan Fasilitas Desa"
                    width={500}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-xl font-semibold mb-3">Berbagai Potensi dan Fasilitas Desa</h3>
                  <p className="text-gray-600 mb-4">
                    Menampilkan potensi ekonomi dan pariwisata desa, serta fasilitas umum yang tersedia untuk
                    meningkatkan daya tarik daerah.
                  </p>
                </div>
              </motion.div>

              {/* Feature Item */}
              <motion.div
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ delay: 1.2 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-3">PPID</h3>
                  <p className="text-gray-600 mb-4">
                    Pejabat Pengelola Informasi dan Dokumentasi untuk memudahkan akses Informasi Publik sesuai dengan
                    ketentuan perundang-undangan, dengan fitur permohonan informasi yang dapat diajukan di website
                    secara online.
                  </p>
                </div>
                <div>
                  <Image
                    src="/images/features/ppid.png"
                    alt="PPID"
                    width={500}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>

              {/* Feature Item */}
              <motion.div
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ delay: 1.4 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div className="order-2 md:order-1">
                  <Image
                    src="/images/features/sdgs.png"
                    alt="SDGs"
                    width={500}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-xl font-semibold mb-3">SDGs</h3>
                  <p className="text-gray-600 mb-4">
                    Sustainable Development Goals (Tujuan Pembangunan Berkelanjutan) untuk mengukur pencapaian desa
                    dalam 17 tujuan global, dengan visualisasi indikator yang memudahkan pemantauan pencapaian desa yang
                    berkelanjutan.
                  </p>
                </div>
              </motion.div>

              {/* Feature Item */}
              <motion.div
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ delay: 1.6 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div>
                  <h3 className="text-xl font-semibold mb-3">IDM</h3>
                  <p className="text-gray-600 mb-4">
                    Indeks Desa Membangun, digunakan untuk mengukur status kemajuan dan kemandirian desa, yang membantu
                    dalam perencanaan pembangunan desa dan alokasi anggaran yang tepat.
                  </p>
                </div>
                <div>
                  <Image
                    src="/images/features/idm.png"
                    alt="IDM"
                    width={500}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </motion.div>

              {/* Feature Item */}
              <motion.div
                initial="hidden"
                animate={featuresInView ? "visible" : "hidden"}
                variants={fadeIn}
                transition={{ delay: 1.8 }}
                className="grid md:grid-cols-2 gap-12 items-center"
              >
                <div className="order-2 md:order-1">
                  <Image
                    src="/images/features/cek-bansos.png"
                    alt="Cek Bansos"
                    width={500}
                    height={300}
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="order-1 md:order-2">
                  <h3 className="text-xl font-semibold mb-3">Cek Bansos</h3>
                  <p className="text-gray-600 mb-4">
                    Fitur untuk cek data penerima bantuan sosial untuk memastikan transparansi dan akuntabilitas dalam
                    penyaluran bantuan sosial kepada masyarakat yang berhak menerima.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Other Features Section */}
        <section className="py-12">
          <div ref={otherFeaturesRef} className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={otherFeaturesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-bold text-center mb-12"
            >
              Fitur Lainnya
            </motion.h2>

            <motion.div
              initial="hidden"
              animate={otherFeaturesInView ? "visible" : "hidden"}
              variants={staggerContainer}
              className="grid md:grid-cols-3 gap-8"
            >
              <motion.div variants={fadeIn}>
                <Card className="bg-emerald-50 border-none">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-emerald-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Pengaduan (SIPS-P)</h3>
                      <p className="text-gray-600 mb-4">
                        Sistem pengaduan online untuk masyarakat desa yang memudahkan pelaporan masalah dan keluhan.
                      </p>
                      <Button
                        variant="outline"
                        className="border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white"
                      >
                        Cek Fitur
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card className="bg-emerald-50 border-none">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-emerald-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Bantuan Sosial</h3>
                      <p className="text-gray-600 mb-4">
                        Informasi tentang program bantuan sosial dan cara mengaksesnya untuk masyarakat desa.
                      </p>
                      <Button
                        variant="outline"
                        className="border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white"
                      >
                        Cek Fitur
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={fadeIn}>
                <Card className="bg-emerald-50 border-none">
                  <CardContent className="pt-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-8 w-8 text-emerald-700"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold mb-2">Website Profil</h3>
                      <p className="text-gray-600 mb-4">
                        Website profil desa yang komprehensif dengan semua informasi penting tentang desa.
                      </p>
                      <Button
                        variant="outline"
                        className="border-emerald-700 text-emerald-700 hover:bg-emerald-700 hover:text-white"
                      >
                        Cek Fitur
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 bg-emerald-700 text-white">
          <div ref={ctaRef} className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={ctaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto bg-emerald-800 p-8 rounded-lg"
            >
              <h2 className="text-2xl font-bold mb-4">Tutorial menggunakan DIGIDES</h2>
              <p className="mb-6">Pelajari fitur-fitur lengkap dan cara penggunaan DIGIDES</p>
              <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                Lihat Tutorial
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Kontak</h3>
              <p className="text-gray-600 mb-2">+62 812 3456 7890</p>
              <p className="text-gray-600">info@digitaldesa.id</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Jejaring</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Alamat Kantor DIGIDES</li>
                <li>Jl. Contoh No. 123</li>
                <li>Kota, Provinsi</li>
                <li>Indonesia</li>
                <li>Cek status DIGIDES</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Sosial Media</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-gray-600 hover:text-emerald-700">
                  <Facebook className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-600 hover:text-emerald-700">
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-600 hover:text-emerald-700">
                  <Instagram className="h-6 w-6" />
                </Link>
                <Link href="#" className="text-gray-600 hover:text-emerald-700">
                  <Youtube className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>

          <div className="border-t pt-8 text-center text-gray-600">
            <p>© 2025 DIGIDES. All Rights Reserved.</p>
            <div className="flex justify-center mt-4">
              <Link href="#" className="flex items-center text-emerald-700 hover:text-emerald-800">
                <WhatsApp className="h-5 w-5 mr-2" />
                Hubungi kami via WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
