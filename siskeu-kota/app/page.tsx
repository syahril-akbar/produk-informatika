"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Phone, Mail, MapPin, Menu, X, ArrowUp, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"

export default function Page() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [showDemoPopup, setShowDemoPopup] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  })
  const [formErrors, setFormErrors] = useState({})
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const otherFeaturesRef = useRef(null)
  const contactRef = useRef(null)

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: null,
      }))
    }
  }

  // Validate form
  const validateForm = () => {
    const errors = {}

    if (!formData.name.trim()) {
      errors.name = "Nama tidak boleh kosong"
    }

    if (!formData.email.trim()) {
      errors.email = "Email tidak boleh kosong"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Format email tidak valid"
    }

    if (!formData.phone.trim()) {
      errors.phone = "Nomor telepon tidak boleh kosong"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    if (validateForm()) {
      setIsLoading(true)

      // Simulate API call
      setTimeout(() => {
        setIsLoading(false)
        setFormSubmitted(true)

        // Reset form after 3 seconds
        setTimeout(() => {
          setShowDemoPopup(false)
          setFormSubmitted(false)
          setFormData({
            name: "",
            email: "",
            phone: "",
            message: "",
          })
        }, 3000)
      }, 1500)
    }
  }

  // Scroll animation effect
  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300)

      // Add animation class to elements when they enter viewport
      const animateElements = document.querySelectorAll(".animate-on-scroll, .animate-from-left, .animate-from-right")
      animateElements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const isInViewport = rect.top <= window.innerHeight * 0.8

        if (isInViewport) {
          el.classList.add("animate-visible")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial state

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [mobileMenuOpen])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  }

  const scrollToSection = (ref) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  const toggleDemoPopup = () => {
    setShowDemoPopup(!showDemoPopup)
  }

  const features = [
    {
      id: "pendekar",
      title: "PENDEKAR",
      description:
        "Sistem yang dibuat untuk memudahkan pemantauan sistem kota dan keuangan kota melalui dashboard menu serta tampilan statistik, membuat pemantauan akan semakin mudah.",
      benefits: [
        "Visualisasi data real-time",
        "Pemantauan keuangan terpadu",
        "Analisis statistik komprehensif",
        "Laporan otomatis berkala",
      ],
    },
    {
      id: "administrasi",
      title: "Administrasi Kota",
      description:
        "Sebuah aplikasi layanan yang memberikan pelayanan bagi warga kota pengguna kota digital untuk administrasi sehingga menghasilkan pelayanan yang lebih baik.",
      benefits: [
        "Pengelolaan dokumen digital",
        "Pencatatan administrasi terintegrasi",
        "Pelacakan status dokumen",
        "Pengarsipan otomatis",
      ],
    },
    {
      id: "pelayanan",
      title: "Pelayanan Kota",
      description:
        "Sebuah aplikasi yang memberikan pelayanan kepada masyarakat dengan terintegrasi dengan sistem administrasi kota. Juga memberikan dampak yang sangat signifikan terhadap efisiensi dan efektivitas penggunaannya.",
      benefits: [
        "Layanan online 24/7",
        "Pengajuan dokumen digital",
        "Notifikasi status layanan",
        "Integrasi dengan sistem nasional",
      ],
    },
  ]

  const testimonials = [
    {
      name: "Budi Santoso",
      position: "Kepala Bagian Keuangan Kota Sukamaju",
      content:
        "DIGITALKOTA telah membantu kami meningkatkan transparansi dan efisiensi pengelolaan dana kota. Masyarakat jadi lebih percaya dengan pengelolaan keuangan kami.",
      avatar: "/placeholder.svg?height=60&width=60&text=BS",
    },
    {
      name: "Siti Rahayu",
      position: "Sekretaris Kota Harapan Jaya",
      content:
        "Dengan DIGITALKOTA, pekerjaan administrasi yang tadinya memakan waktu berhari-hari sekarang bisa selesai dalam hitungan jam. Sangat membantu pekerjaan kami!",
      avatar: "/placeholder.svg?height=60&width=60&text=SR",
    },
    {
      name: "Ahmad Fauzi",
      position: "Bendahara Kota Cinta Damai",
      content:
        "Laporan keuangan yang otomatis dan terintegrasi membuat pekerjaan saya sebagai bendahara jauh lebih mudah dan akurat. Terima kasih DIGITALKOTA!",
      avatar: "/placeholder.svg?height=60&width=60&text=AF",
    },
  ]

  const faqItems = [
    {
      question: "Apa itu DIGITALKOTA?",
      answer:
        "DIGITALKOTA (Digital Kota) adalah sistem keuangan kota online yang membantu pemerintah kota dalam mengelola keuangan, administrasi, dan pelayanan kepada masyarakat secara digital, transparan, dan efisien.",
    },
    {
      question: "Bagaimana cara mengakses DIGITALKOTA?",
      answer:
        "DIGITALKOTA dapat diakses melalui website dan aplikasi mobile yang tersedia di Google Play Store. Pengguna perlu melakukan registrasi dan verifikasi untuk mendapatkan akses ke sistem.",
    },
    {
      question: "Apakah DIGITALKOTA aman digunakan?",
      answer:
        "Ya, DIGITALKOTA menggunakan teknologi keamanan terkini dengan enkripsi data dan autentikasi multi-faktor untuk memastikan keamanan data pengguna dan transaksi keuangan kota.",
    },
    {
      question: "Apakah ada pelatihan untuk menggunakan DIGITALKOTA?",
      answer:
        "Ya, kami menyediakan pelatihan komprehensif untuk pengguna DIGITALKOTA, termasuk tutorial online, dokumentasi, dan dukungan teknis langsung untuk membantu pengguna memaksimalkan penggunaan sistem.",
    },
    {
      question: "Bagaimana cara mendapatkan demo DIGITALKOTA?",
      answer:
        "Anda dapat meminta demo DIGITALKOTA dengan mengklik tombol 'Request Demo' di halaman ini dan mengisi formulir yang tersedia. Tim kami akan menghubungi Anda untuk menjadwalkan demo sesuai kebutuhan Anda.",
    },
  ]

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === features.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? features.length - 1 : prev - 1))
  }

  // Auto slide for carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [activeSlide])

  // Touch swipe for mobile
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left
      nextSlide()
    } else if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right
      prevSlide()
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-on-scroll {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-from-left {
          opacity: 0;
          transform: translateX(-20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-from-right {
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .animate-visible {
          opacity: 1;
          transform: translateY(0) translateX(0);
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #374151;
        }
        
        /* Smooth scrolling for the whole page */
        html {
          scroll-behavior: smooth;
        }
        
        /* Mobile menu animation */
        .mobile-menu-enter {
          opacity: 0;
          transform: translateX(-100%);
        }
        
        .mobile-menu-enter-active {
          opacity: 1;
          transform: translateX(0);
          transition: opacity 300ms, transform 300ms;
        }
        
        .mobile-menu-exit {
          opacity: 1;
          transform: translateX(0);
        }
        
        .mobile-menu-exit-active {
          opacity: 0;
          transform: translateX(-100%);
          transition: opacity 300ms, transform 300ms;
        }
        
        /* Responsive font sizes */
        @media (max-width: 640px) {
          h1 {
            font-size: 2rem !important;
          }
          h2 {
            font-size: 1.75rem !important;
          }
          h3 {
            font-size: 1.5rem !important;
          }
        }
      `}</style>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-[#008080] text-white p-4 z-50 shadow-md transition-all duration-300">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <div className="text-xl font-bold mr-2 bg-white text-[#008080] px-3 py-1 rounded-md">DIGITALKOTA</div>
          </div>

          <nav className="hidden md:flex space-x-6">
            <button onClick={() => scrollToTop()} className="hover:text-teal-100 transition-colors relative group">
              Beranda
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-100 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection(featuresRef)}
              className="hover:text-teal-100 transition-colors relative group"
            >
              Fitur
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-100 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection(otherFeaturesRef)}
              className="hover:text-teal-100 transition-colors relative group"
            >
              Fitur Lainnya
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-100 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <button
              onClick={() => scrollToSection(contactRef)}
              className="hover:text-teal-100 transition-colors relative group"
            >
              Kontak
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-teal-100 transition-all duration-300 group-hover:w-full"></span>
            </button>
          </nav>

          <div className="hidden md:block">
            <Button
              onClick={toggleDemoPopup}
              className="bg-white text-gray-800 hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
            >
              Request Demo
            </Button>
          </div>

          <button
            className="md:hidden text-white p-1 rounded-md hover:bg-teal-600 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div
            className="fixed top-0 left-0 h-full w-4/5 max-w-xs bg-[#008080] p-6 overflow-y-auto transform transition-transform duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-8">
              <div className="text-xl font-bold text-white bg-white/20 px-3 py-1 rounded-md">DIGITALKOTA</div>
              <button
                className="text-white p-1 rounded-md hover:bg-teal-700 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToTop()}
                className="text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors text-left flex items-center"
              >
                <span className="mr-2">•</span> Beranda
              </button>
              <button
                onClick={() => scrollToSection(featuresRef)}
                className="text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors text-left flex items-center"
              >
                <span className="mr-2">•</span> Fitur
              </button>
              <button
                onClick={() => scrollToSection(otherFeaturesRef)}
                className="text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors text-left flex items-center"
              >
                <span className="mr-2">•</span> Fitur Lainnya
              </button>
              <button
                onClick={() => scrollToSection(contactRef)}
                className="text-white py-2 px-4 rounded-md hover:bg-teal-600 transition-colors text-left flex items-center"
              >
                <span className="mr-2">•</span> Kontak
              </button>
            </nav>

            <div className="mt-8">
              <Button
                onClick={() => {
                  toggleDemoPopup()
                  setMobileMenuOpen(false)
                }}
                className="w-full bg-white text-[#008080] hover:bg-teal-100 transition-all duration-300"
              >
                Request Demo
              </Button>
            </div>

            <div className="mt-8 border-t border-teal-400 pt-6">
              <h4 className="text-white font-medium mb-4">Hubungi Kami</h4>
              <div className="flex items-center mb-3 text-white">
                <Phone className="h-5 w-5 mr-2" />
                <span>+62 811 444 9555</span>
              </div>
              <div className="flex items-center text-white">
                <Mail className="h-5 w-5 mr-2" />
                <span>office@digitalkota.id</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <main className="flex-grow pt-16">
        {/* Hero Section */}
        <section
          ref={heroRef}
          className="py-16 px-4 bg-gradient-to-br from-gray-100 via-white to-gray-100 text-gray-800"
        >
          <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center">
            <div className="animate-from-left">
              <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">Sistem Keuangan Kota Online</h1>
              <p className="text-gray-600 mb-6 text-lg">
                Sistem Keuangan Kota Online merupakan fitur sistem keuangan kota yang dapat mengoptimalkan pengelolaan
                keuangan dan pelaporan di tingkat kota dengan teknologi digital terkini.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  onClick={() => scrollToSection(featuresRef)}
                  className="bg-[#008080] text-white hover:bg-teal-700 transition-all duration-300 transform hover:translate-y-[-3px] text-base px-6 py-6"
                >
                  Jelajahi Fitur
                </Button>
                <Button
                  onClick={toggleDemoPopup}
                  variant="outline"
                  className="bg-transparent border-[#008080] text-[#008080] hover:bg-[#008080]/10 transition-all duration-300 transform hover:translate-y-[-3px] text-base px-6 py-6"
                >
                  Request Demo
                </Button>
              </div>

              <div className="mt-8 flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {testimonials.map((testimonial, index) => (
                    <div key={index} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={40}
                        height={40}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <span className="font-bold">500+ Kota</span> telah menggunakan DIGITALKOTA
                </div>
              </div>
            </div>

            <div className="relative animate-from-right">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 to-transparent rounded-xl"></div>
              <div className="relative bg-white/10 backdrop-blur-sm p-4 rounded-xl shadow-2xl transform transition-all duration-500 hover:scale-105 overflow-hidden animate-float">
                <div className="absolute top-0 right-0 w-20 h-20 bg-teal-400/30 rounded-full -translate-x-10 -translate-y-10"></div>
                <div className="absolute bottom-0 left-0 w-20 h-20 bg-teal-400/30 rounded-full translate-x-5 translate-y-5"></div>

                <div className="relative z-10">
                  <div className="bg-gray-800/80 text-white p-2 rounded-t-lg flex items-center">
                    <div className="flex space-x-2 mr-auto">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-sm font-medium">Dashboard DIGITALKOTA</div>
                  </div>

                  <div className="bg-white rounded-b-lg overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=400&width=600&text=Dashboard+Keuangan+Kota"
                      alt="Dashboard Keuangan Kota"
                      width={600}
                      height={400}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-lg shadow-lg transform rotate-6 animate-pulse">
                <div className="text-gray-800 font-bold text-sm">Laporan Real-time</div>
                <div className="text-gray-600 text-xs">Update terbaru</div>
              </div>

              <div className="absolute -top-4 -left-4 bg-white p-3 rounded-lg shadow-lg transform -rotate-6 animate-pulse delay-300">
                <div className="text-gray-800 font-bold text-sm">Data Terintegrasi</div>
                <div className="text-gray-600 text-xs">Sinkronisasi otomatis</div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 bg-white">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="p-6 rounded-lg bg-gradient-to-br from-teal-50 to-teal-100 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="text-3xl md:text-4xl font-bold text-[#008080] mb-2">500+</div>
                <div className="text-gray-600">Kota Terdaftar</div>
              </div>

              <div className="p-6 rounded-lg bg-gradient-to-br from-teal-50 to-teal-100 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="text-3xl md:text-4xl font-bold text-[#008080] mb-2">24/7</div>
                <div className="text-gray-600">Layanan Online</div>
              </div>

              <div className="p-6 rounded-lg bg-gradient-to-br from-teal-50 to-teal-100 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="text-3xl md:text-4xl font-bold text-[#008080] mb-2">98%</div>
                <div className="text-gray-600">Tingkat Kepuasan</div>
              </div>

              <div className="p-6 rounded-lg bg-gradient-to-br from-teal-50 to-teal-100 transform transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="text-3xl md:text-4xl font-bold text-[#008080] mb-2">50M+</div>
                <div className="text-gray-600">Transaksi Diproses</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Title */}
        <section ref={featuresRef} className="py-16 px-4 animate-on-scroll">
          <div className="container mx-auto text-center">
            <div className="inline-block bg-teal-50 text-[#008080] px-4 py-1 rounded-full text-sm font-medium mb-4">
              Fitur Unggulan
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Fitur DIGITALKOTA Online</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-12">
              Sistem Keuangan Kota Online menyediakan berbagai fitur canggih untuk membantu pengelolaan keuangan dan
              administrasi kota secara efisien dan transparan.
            </p>

            <Tabs defaultValue="dashboard" className="w-full max-w-4xl mx-auto" onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger
                  value="dashboard"
                  className="data-[state=active]:bg-[#008080] data-[state=active]:text-white"
                >
                  Dashboard Dana
                </TabsTrigger>
                <TabsTrigger
                  value="integration"
                  className="data-[state=active]:bg-[#008080] data-[state=active]:text-white"
                >
                  Integrasi Sistem
                </TabsTrigger>
                <TabsTrigger
                  value="reports"
                  className="data-[state=active]:bg-[#008080] data-[state=active]:text-white"
                >
                  Otomasi Laporan
                </TabsTrigger>
              </TabsList>

              <TabsContent value="dashboard" className="border-0 p-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1 rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105">
                    <Image
                      src="/images/dashboard.jpg"
                      alt="Dashboard Penggunaan Dana Kota"
                      width={500}
                      height={400}
                      className="w-full h-auto object-cover rounded-xl"
                    />
                  </div>
                  <div className="order-1 md:order-2 text-left transform transition-all duration-500 hover:translate-x-2">
                    <h3 className="text-2xl font-bold mb-4">Dashboard Penggunaan Dana Kota</h3>
                    <p className="text-gray-600 mb-6">
                      Fitur dengan visualisasi data yang dapat memberikan data penggunaan dana kota secara real-time.
                      Dengan data yang terintegrasi ke tahun-tahun sebelumnya, fitur ini juga menyajikan informasi dana
                      kota lebih mudah, sehingga bagi wali pemerintah semakin mudah memantau dan mengambil keputusan.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#008080] mr-2 mt-0.5 flex-shrink-0" />
                        <span>Visualisasi data interaktif dengan grafik dan diagram</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#008080] mr-2 mt-0.5 flex-shrink-0" />
                        <span>Pemantauan real-time penggunaan anggaran</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#008080] mr-2 mt-0.5 flex-shrink-0" />
                        <span>Perbandingan data historis untuk analisis tren</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#008080] mr-2 mt-0.5 flex-shrink-0" />
                        <span>Notifikasi otomatis untuk pengeluaran di luar anggaran</span>
                      </li>
                    </ul>
                    <Button className="bg-[#008080] hover:bg-teal-700 transition-all duration-300">
                      Pelajari Lebih Lanjut
                    </Button>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="integration" className="border-0 p-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="text-left transform transition-all duration-500 hover:translate-x-2">
                    <h3 className="text-2xl font-bold mb-4">
                      Terintegrasi dengan sistem administrasi dan pelayanan kota
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Selain visualisasi data, fitur DIGITALKOTA juga terintegrasi dengan sistem administrasi dan
                      pelayanan kota. Hal ini akan meningkatkan efisiensi, transparansi, dan aksesibilitas dalam
                      penyelenggaraan pemerintah serta pelayanan kepada masyarakat.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#008080] mr-2 mt-0.5 flex-shrink-0" />
                        <span>Integrasi dengan sistem kependudukan nasional</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#008080] mr-2 mt-0.5 flex-shrink-0" />
                        <span>Sinkronisasi data antar departemen kota</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#008080] mr-2 mt-0.5 flex-shrink-0" />
                        <span>Pelacakan status dokumen dan layanan</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#008080] mr-2 mt-0.5 flex-shrink-0" />
                        <span>Akses multi-pengguna dengan manajemen hak akses</span>
                      </li>
                    </ul>
                    <Button className="bg-[#008080] hover:bg-teal-700 transition-all duration-300">
                      Pelajari Lebih Lanjut
                    </Button>
                  </div>
                  <div className="rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105">
                    <Image
                      src="/images/terintegrasi.jpg"
                      alt="Terintegrasi dengan sistem administrasi"
                      width={500}
                      height={400}
                      className="w-full h-auto object-cover rounded-xl"
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reports" className="border-0 p-0">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="order-2 md:order-1 rounded-xl overflow-hidden shadow-lg transform transition-all duration-500 hover:scale-105">
                    <Image
                      src="/images/otomasi.jpg"
                      alt="Otomasi laporan"
                      width={500}
                      height={400}
                      className="w-full h-auto object-cover rounded-xl"
                    />
                  </div>
                  <div className="order-1 md:order-2 text-left transform transition-all duration-500 hover:translate-x-2">
                    <h3 className="text-2xl font-bold mb-4">Otomasi laporan pada website profil</h3>
                    <p className="text-gray-600 mb-6">
                      Melalui DIGITALKOTA laporan dana kota dapat dibuat secara otomatis sehingga dapat meningkatkan
                      efisiensi waktu serta menghindari kesalahan manusia serta memudahkan konsistensi pelaporan dan
                      hasil laporan.
                    </p>
                    <ul className="space-y-2 mb-6">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#008080] mr-2 mt-0.5 flex-shrink-0" />
                        <span>Pembuatan laporan otomatis berkala</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#008080] mr-2 mt-0.5 flex-shrink-0" />
                        <span>Format laporan sesuai standar nasional</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#008080] mr-2 mt-0.5 flex-shrink-0" />
                        <span>Ekspor laporan dalam berbagai format (PDF, Excel, CSV)</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-[#008080] mr-2 mt-0.5 flex-shrink-0" />
                        <span>Publikasi otomatis ke website kota untuk transparansi</span>
                      </li>
                    </ul>
                    <Button className="bg-[#008080] hover:bg-teal-700 transition-all duration-300">Lihat Demo</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Other Features */}
        <section ref={otherFeaturesRef} className="py-16 px-4 bg-gray-50 animate-on-scroll">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <div className="inline-block bg-teal-50 text-[#008080] px-4 py-1 rounded-full text-sm font-medium mb-4">
                Lebih Banyak Fitur
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Fitur Lainnya</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                DIGITALKOTA menyediakan berbagai fitur tambahan untuk memenuhi kebutuhan pengelolaan kota secara
                komprehensif.
              </p>
            </div>

            <div
              className="relative"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex overflow-hidden">
                <div
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${activeSlide * 100}%)` }}
                >
                  {features.map((feature, index) => (
                    <div key={feature.id} className="w-full flex-shrink-0 px-4">
                      <Card className="h-full bg-white border-none overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2">
                        <CardContent className="p-6 flex flex-col items-center text-center">
                          <div className="mb-6 bg-[#008080] text-white p-4 rounded-full">
                            <Image
                              src={`/placeholder.svg?height=80&width=80&text=${feature.title}`}
                              alt={feature.title}
                              width={80}
                              height={80}
                            />
                          </div>
                          <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                          <p className="text-gray-600 mb-6">{feature.description}</p>

                          <div className="w-full mb-6">
                            <div className="border-t border-gray-200 my-4"></div>
                            <h4 className="font-medium text-gray-800 mb-2">Manfaat:</h4>
                            <ul className="text-left space-y-2">
                              {feature.benefits.map((benefit, idx) => (
                                <li key={idx} className="flex items-start">
                                  <Check className="h-4 w-4 text-[#008080] mr-2 mt-0.5 flex-shrink-0" />
                                  <span className="text-sm">{benefit}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <Button className="bg-[#008080] hover:bg-teal-700 mt-auto transition-all duration-300 transform hover:scale-105 w-full">
                            Lihat Fitur
                          </Button>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-md z-10 transition-all duration-300 hover:bg-[#008080] hover:text-white"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-md z-10 transition-all duration-300 hover:bg-[#008080] hover:text-white"
                aria-label="Next slide"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              <div className="flex justify-center mt-8 space-x-2">
                {features.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveSlide(index)}
                    className={`h-3 w-12 rounded-full transition-all duration-300 ${
                      activeSlide === index ? "bg-[#008080]" : "bg-gray-300"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 px-4 bg-white animate-on-scroll">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <div className="inline-block bg-teal-50 text-[#008080] px-4 py-1 rounded-full text-sm font-medium mb-4">
                FAQ
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Pertanyaan yang Sering Diajukan</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Temukan jawaban untuk pertanyaan umum tentang DIGITALKOTA dan cara penggunaannya.
              </p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border border-gray-200 mb-4 rounded-lg overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-4 hover:bg-gray-100 transition-all duration-200 text-left font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 py-4 bg-white">
                    <p className="text-gray-700">{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 px-4 animate-on-scroll">
          <div className="container mx-auto max-w-4xl bg-gradient-to-r from-[#008080] to-teal-700 text-white rounded-xl p-8 text-center relative overflow-hidden transform transition-all duration-500 hover:shadow-2xl">
            <div className="absolute top-0 right-0 w-40 h-40 bg-teal-600 rounded-full -translate-x-10 -translate-y-20 opacity-30"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-teal-600 rounded-full translate-x-10 translate-y-20 opacity-30"></div>
            <h2 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">Tertarik menggunakan DIGITALKOTA?</h2>
            <p className="mb-8 relative z-10 text-gray-200 max-w-xl mx-auto">
              Bergabunglah dengan 500+ kota yang telah mengoptimalkan pengelolaan keuangan dan administrasi mereka
              dengan DIGITALKOTA.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4 relative z-10">
              <Button
                className="bg-white text-[#008080] hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-base px-8 py-6"
                onClick={toggleDemoPopup}
              >
                Request Demo
              </Button>
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white/10 transition-all duration-300 transform hover:scale-105 text-base px-8 py-6"
              >
                Hubungi Kami
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} className="py-16 px-4 bg-white animate-on-scroll">
          <div className="container mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <div className="inline-block bg-teal-50 text-[#008080] px-4 py-1 rounded-full text-sm font-medium mb-4">
                  Kontak
                </div>
                <h2 className="text-3xl font-bold text-gray-800 mb-6">Hubungi Kami</h2>
                <p className="text-gray-600 mb-8">
                  Kami siap membantu Anda dengan pertanyaan atau kebutuhan terkait DIGITALKOTA. Jangan ragu untuk
                  menghubungi kami melalui informasi kontak di bawah ini.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      <Phone className="h-6 w-6 text-[#008080]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Telepon</h3>
                      <p className="text-gray-600">+62 811 444 9555</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      <Mail className="h-6 w-6 text-[#008080]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                      <p className="text-gray-600">office@digitalkota.id</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-gray-100 p-3 rounded-full mr-4">
                      <MapPin className="h-6 w-6 text-[#008080]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">Alamat Kantor</h3>
                      <p className="text-gray-600">
                        Jalan I Wayan JH Cipuntra Cimandiri, A-1/01 Abdul Rosak Kuningan Selatan, Jakarta Selatan
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <h3 className="font-medium text-gray-900 mb-4">Ikuti Kami</h3>
                  <div className="flex space-x-4">
                    <Link
                      href="#"
                      className="bg-[#008080] text-white p-2 rounded-full hover:bg-teal-700 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                      </svg>
                    </Link>
                    <Link
                      href="#"
                      className="bg-[#008080] text-white p-2 rounded-full hover:bg-teal-700 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </Link>
                    <Link
                      href="#"
                      className="bg-[#008080] text-white p-2 rounded-full hover:bg-teal-700 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                      </svg>
                    </Link>
                    <Link
                      href="#"
                      className="bg-[#008080] text-white p-2 rounded-full hover:bg-teal-700 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-8 rounded-xl shadow-sm">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Kirim Pesan</h3>
                <form className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                      placeholder="Masukkan nama lengkap"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                      placeholder="Masukkan email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subjek</label>
                    <input
                      type="text"
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]"
                      placeholder="Masukkan subjek pesan"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-md h-32 focus:outline-none focus:ring-2 focus:ring-[#008080]"
                      placeholder="Tuliskan pesan Anda"
                    ></textarea>
                  </div>
                  <Button className="w-full bg-[#008080] hover:bg-teal-700 transition-all duration-300 py-6">
                    Kirim Pesan
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Scroll to top button */}
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-[#008080] text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-teal-700 z-40"
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}

      {/* Demo Request Popup */}
      {showDemoPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div
            className="bg-white p-8 rounded-xl max-w-md w-full relative animate-on-scroll animate-visible"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={toggleDemoPopup}
              aria-label="Close popup"
            >
              <X size={24} />
            </button>

            {formSubmitted ? (
              <div className="text-center py-8">
                <div className="bg-green-100 text-green-700 rounded-full p-4 inline-flex mb-4">
                  <Check size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Permintaan Terkirim!</h3>
                <p className="text-gray-600 mb-6">
                  Terima kasih telah menghubungi kami. Tim kami akan segera menghubungi Anda untuk demo DIGITALKOTA.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-800 mb-6">Request Demo DIGITALKOTA</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]",
                        formErrors.name ? "border-red-500" : "border-gray-300",
                      )}
                      placeholder="Masukkan nama lengkap"
                    />
                    {formErrors.name && <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]",
                        formErrors.email ? "border-red-500" : "border-gray-300",
                      )}
                      placeholder="Masukkan email"
                    />
                    {formErrors.email && <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nomor Telepon</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={cn(
                        "w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#008080]",
                        formErrors.phone ? "border-red-500" : "border-gray-300",
                      )}
                      placeholder="Masukkan nomor telepon"
                    />
                    {formErrors.phone && <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pesan (Opsional)</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full p-3 border border-gray-300 rounded-md h-24 focus:outline-none focus:ring-2 focus:ring-[#008080]"
                      placeholder="Tuliskan pesan atau pertanyaan Anda"
                    ></textarea>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-[#008080] hover:bg-teal-700 transition-all duration-300 py-6"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Mengirim...
                      </div>
                    ) : (
                      "Kirim Request"
                    )}
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-100 py-12 px-4">
        <div className="container mx-auto grid md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Kontak</h3>
            <div className="flex items-center mb-3">
              <Phone className="h-5 w-5 mr-2 text-[#008080]" />
              <span>+62 811 444 9555</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-5 w-5 mr-2 text-[#008080]" />
              <span>office@digitalkota.id</span>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Jelajahi</h3>
            <ul className="space-y-2">
              <li className="hover:text-[#008080] transition-colors cursor-pointer">• Kebijakan Privasi</li>
              <li className="hover:text-[#008080] transition-colors cursor-pointer">• Syarat dan Ketentuan</li>
              <li className="hover:text-[#008080] transition-colors cursor-pointer">• Pusat Bantuan</li>
              <li className="hover:text-[#008080] transition-colors cursor-pointer">• Permintaan Harga</li>
              <li className="hover:text-[#008080] transition-colors cursor-pointer">• Paket Layanan</li>
              <li className="hover:text-[#008080] transition-colors cursor-pointer">• Jasa Mitra DIGITALKOTA</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-gray-800">Sosial Media</h3>
            <div className="flex space-x-3 mb-6">
              <Link href="#" className="bg-[#008080] text-white p-2 rounded-full hover:bg-teal-700 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </Link>
              <Link href="#" className="bg-[#008080] text-white p-2 rounded-full hover:bg-teal-700 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </Link>
              <Link href="#" className="bg-[#008080] text-white p-2 rounded-full hover:bg-teal-700 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                </svg>
              </Link>
              <Link href="#" className="bg-[#008080] text-white p-2 rounded-full hover:bg-teal-700 transition-colors">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                </svg>
              </Link>
            </div>
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} PT Digital Kota Indonesia. Semua hak dilindungi.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
