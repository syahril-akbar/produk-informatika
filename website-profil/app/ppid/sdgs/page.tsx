import { Card, CardContent } from "@/components/ui/card"

// SDG data with colors matching the image
const sdgsData = [
  {
    id: 1,
    title: "Desa Tanpa Kemiskinan",
    value: 53.75,
    color: "#E5243B",
  },
  {
    id: 2,
    title: "Desa Tanpa Kelaparan",
    value: 33.33,
    color: "#DDA63A",
  },
  {
    id: 3,
    title: "Desa Sehat dan Sejahtera",
    value: 71.12,
    color: "#4C9F38",
  },
  {
    id: 4,
    title: "Pendidikan Desa Berkualitas",
    value: 82.78,
    color: "#C5192D",
  },
  {
    id: 5,
    title: "Keterlibatan Perempuan Desa",
    value: 57.14,
    color: "#FF3A21",
  },
  {
    id: 6,
    title: "Desa Layak Air Bersih dan Sanitasi",
    value: 59.92,
    color: "#26BDE2",
  },
  {
    id: 7,
    title: "Desa Berenergi Bersih dan Terbaharukan",
    value: 99.79,
    color: "#FCC30B",
  },
  {
    id: 8,
    title: "Pertumbuhan Ekonomi Desa Merata",
    value: 58.59,
    color: "#A21942",
  },
  {
    id: 9,
    title: "Infrastruktur dan Inovasi Desa Sesuai Kebutuhan",
    value: 85.74,
    color: "#FD6925",
  },
  {
    id: 10,
    title: "Desa Tanpa Kesenjangan",
    value: 47.78,
    color: "#DD1367",
  },
  {
    id: 11,
    title: "Kawasan Pemukiman Desa Aman dan Nyaman",
    value: 49.5,
    color: "#FD9D24",
  },
  {
    id: 12,
    title: "Konsumsi dan Produksi Desa Sadar Lingkungan",
    value: 3.57,
    color: "#BF8B2E",
  },
]

export default function SDGsPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tighter mb-2 text-primary">SDGs Desa</h1>
      <p className="text-muted-foreground mb-6">
        SDGs Merupakan agenda global yang ditetapkan oleh Perserikatan Bangsa-Bangsa (PBB) untuk mengatasi
        tantangan-tantangan sosial, ekonomi, dan lingkungan yang ada di seluruh dunia. DIGIDES menyediakan layanan SDGs
        Desa untuk memberikan informasi mengenai pembangunan desa yang nantinya akan memudahkan aparat dalam mengembil
        keputusan untuk mencapai Tujuan Pembangunan Berkelanjutan (Sustainable Development Goals/SDGs)
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {sdgsData.map((sdg) => (
          <Card key={sdg.id} className="overflow-hidden border-gray-200 hover:shadow-md transition-shadow">
            <CardContent className="p-0">
              <div className="p-4">
                <h3 className="font-medium text-sm mb-2 line-clamp-2 h-10">{sdg.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="relative w-16 h-16">
                    <div
                      className="absolute inset-0 rounded-md flex flex-col items-center justify-center text-white font-bold"
                      style={{ backgroundColor: sdg.color }}
                    >
                      <span className="text-xs">SDG</span>
                      <span className="text-lg">{sdg.id}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">Nilai</div>
                    <div className="text-4xl font-bold">{sdg.value}</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6 text-primary">Tentang SDGs Desa</h2>
        <div className="prose max-w-none">
          <p>
            Sustainable Development Goals (SDGs) Desa adalah adaptasi dari SDGs global yang disesuaikan dengan konteks
            dan kebutuhan desa di Indonesia. Program ini bertujuan untuk memastikan bahwa pembangunan desa sejalan
            dengan tujuan pembangunan berkelanjutan global.
          </p>
          <p className="mt-4">
            SDGs Desa memiliki 18 tujuan yang mencakup berbagai aspek pembangunan, termasuk pengentasan kemiskinan,
            pendidikan berkualitas, kesehatan, kesetaraan gender, air bersih dan sanitasi, energi terbarukan,
            pertumbuhan ekonomi, infrastruktur, pengurangan kesenjangan, dan pelestarian lingkungan.
          </p>
          <p className="mt-4">
            Melalui implementasi SDGs Desa, diharapkan desa-desa di Indonesia dapat berkembang secara berkelanjutan,
            inklusif, dan tangguh, serta memberikan kontribusi positif terhadap pencapaian tujuan pembangunan
            berkelanjutan nasional dan global.
          </p>
        </div>
      </div>
    </div>
  )
}
