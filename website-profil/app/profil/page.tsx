import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import VillageStatistics from "@/components/village-statistics"

export default function ProfilePage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold tracking-tighter mb-6">Profil Desa Pao-Pao</h1>

      <Tabs defaultValue="info" className="mb-10">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="info">Informasi Dasar</TabsTrigger>
          <TabsTrigger value="vision">Visi & Misi</TabsTrigger>
          <TabsTrigger value="history">Sejarah</TabsTrigger>
          <TabsTrigger value="statistics">Statistik</TabsTrigger>
        </TabsList>

        <TabsContent value="info" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Informasi Dasar Desa Pao-Pao</CardTitle>
              <CardDescription>Data umum tentang desa</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-2">Lokasi</h3>
                  <p className="text-muted-foreground mb-4">
                    Desa Pao-Pao terletak di Kecamatan Somba Opu, Kabupaten Gowa, Provinsi Sulawesi Selatan. Desa ini
                    memiliki luas wilayah sekitar 5,2 km² dan berada pada ketinggian 25-100 meter di atas permukaan
                    laut.
                  </p>

                  <h3 className="text-lg font-semibold mb-2">Batas Wilayah</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Utara: Desa Sungguminasa</li>
                    <li>Selatan: Desa Tamarunang</li>
                    <li>Barat: Desa Paccinongang</li>
                    <li>Timur: Desa Romang Polong</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-2">Demografi</h3>
                  <p className="text-muted-foreground mb-4">
                    Desa Pao-Pao memiliki populasi sekitar 8.500 jiwa dengan 2.100 kepala keluarga. Mayoritas penduduk
                    bekerja di sektor pertanian, perdagangan, dan jasa.
                  </p>

                  <h3 className="text-lg font-semibold mb-2">Potensi Desa</h3>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1">
                    <li>Pertanian: padi, jagung, dan sayuran</li>
                    <li>Peternakan: ayam, sapi, dan kambing</li>
                    <li>Wisata: air terjun, pemandian alam</li>
                    <li>Kerajinan: anyaman bambu dan ukiran kayu</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">Peta Desa Pao-Pao</h3>
                <div className="aspect-video w-full rounded-lg overflow-hidden border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15894.954478252874!2d119.45!3d-5.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dbee329d5366b45%3A0x87c8aed3df8bb12f!2sPao-Pao%2C%20Kec.%20Somba%20Opu%2C%20Kabupaten%20Gowa%2C%20Sulawesi%20Selatan!5e0!3m2!1sid!2sid!4v1650000000000!5m2!1sid!2sid"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vision" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Visi dan Misi Desa Pao-Pao</CardTitle>
              <CardDescription>Arah dan tujuan pembangunan desa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-3">Visi</h3>
                  <div className="bg-muted p-4 rounded-lg">
                    <p className="text-lg font-medium">
                      "Terwujudnya Desa Pao-Pao yang Mandiri, Sejahtera, dan Berbudaya Berbasis Pertanian dan
                      Pariwisata"
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3">Misi</h3>
                  <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                    <li>
                      Meningkatkan kualitas pelayanan pemerintahan desa yang transparan, akuntabel, dan profesional
                    </li>
                    <li>Meningkatkan infrastruktur dasar desa untuk mendukung aktivitas ekonomi masyarakat</li>
                    <li>Mengembangkan potensi pertanian dengan teknologi tepat guna dan ramah lingkungan</li>
                    <li>Mengembangkan destinasi wisata desa yang berkelanjutan dan berbasis kearifan lokal</li>
                    <li>Meningkatkan kualitas sumber daya manusia melalui pendidikan dan pelatihan</li>
                    <li>Melestarikan dan mengembangkan nilai-nilai budaya lokal sebagai identitas desa</li>
                    <li>
                      Meningkatkan kesejahteraan masyarakat melalui pemberdayaan ekonomi dan pengentasan kemiskinan
                    </li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Sejarah Desa Pao-Pao</CardTitle>
              <CardDescription>Asal usul dan perkembangan desa</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none dark:prose-invert">
                <p>
                  Desa Pao-Pao memiliki sejarah panjang yang berawal dari abad ke-17. Nama "Pao-Pao" berasal dari bahasa
                  Makassar yang berarti "mangga", karena pada masa itu wilayah ini terkenal dengan kebun mangga yang
                  luas dan subur.
                </p>

                <h3>Masa Kerajaan</h3>
                <p>
                  Pada masa Kerajaan Gowa, wilayah Pao-Pao merupakan salah satu daerah penghasil bahan pangan utama.
                  Daerah ini dikenal dengan tanah yang subur dan sistem irigasi yang baik, sehingga menjadi lumbung padi
                  bagi kerajaan.
                </p>

                <h3>Masa Kolonial</h3>
                <p>
                  Selama masa penjajahan Belanda, Pao-Pao menjadi salah satu basis perlawanan rakyat. Beberapa tokoh
                  pejuang kemerdekaan berasal dari daerah ini dan berperan aktif dalam perjuangan melawan penjajah.
                </p>

                <h3>Masa Kemerdekaan</h3>
                <p>
                  Setelah kemerdekaan Indonesia, Pao-Pao resmi menjadi sebuah desa administratif pada tahun 1950. Sejak
                  saat itu, desa ini terus berkembang dengan fokus pada sektor pertanian dan pembangunan infrastruktur
                  dasar.
                </p>

                <h3>Perkembangan Modern</h3>
                <p>
                  Dalam dua dekade terakhir, Desa Pao-Pao mengalami transformasi signifikan dengan masuknya teknologi
                  dan perbaikan infrastruktur. Selain pertanian yang tetap menjadi andalan, desa ini mulai mengembangkan
                  sektor pariwisata dengan memanfaatkan keindahan alam dan kekayaan budaya yang dimiliki.
                </p>

                <p>
                  Saat ini, Desa Pao-Pao terus berbenah dan berkembang menjadi desa yang mandiri dan sejahtera, dengan
                  tetap mempertahankan nilai-nilai kearifan lokal dan kelestarian lingkungan.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="statistics" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Statistik Desa</CardTitle>
              <CardDescription>Data statistik penduduk dan pembangunan desa</CardDescription>
            </CardHeader>
            <CardContent>
              <VillageStatistics />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
