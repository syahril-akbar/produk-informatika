import { PengaturanForm } from "@/components/pengaturan/pengaturan-form"
import { PengaturanUser } from "@/components/pengaturan/pengaturan-user"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function PengaturanPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pengaturan</h1>
        <p className="text-muted-foreground">Kelola pengaturan akun dan aplikasi Anda.</p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList>
          <TabsTrigger value="account">Akun</TabsTrigger>
          <TabsTrigger value="appearance">Tampilan</TabsTrigger>
          <TabsTrigger value="notifications">Notifikasi</TabsTrigger>
        </TabsList>
        <TabsContent value="account" className="space-y-4">
          <PengaturanUser />
        </TabsContent>
        <TabsContent value="appearance" className="space-y-4">
          <PengaturanForm />
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <PengaturanForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
