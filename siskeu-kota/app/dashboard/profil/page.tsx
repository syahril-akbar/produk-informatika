import { ProfilDesa } from "@/components/profil/profil-desa"
import { ProfilForm } from "@/components/profil/profil-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profil Desa</h1>
        <p className="text-muted-foreground">Kelola informasi dan data profil desa Anda.</p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Ringkasan</TabsTrigger>
          <TabsTrigger value="edit">Edit Profil</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <ProfilDesa />
        </TabsContent>
        <TabsContent value="edit" className="space-y-4">
          <ProfilForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
