import dynamic from "next/dynamic"
import { Skeleton } from "@/components/ui/skeleton"

function PreviewSuratLoading() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Skeleton className="h-10 w-64 mb-6" />
      <div className="space-y-4">
        <Skeleton className="h-8 w-full max-w-md" />
        <Skeleton className="h-24 w-full max-w-md" />
        <Skeleton className="h-8 w-full max-w-md" />
        <Skeleton className="h-8 w-full max-w-md" />
        <Skeleton className="h-12 w-32" />
      </div>
    </div>
  )
}

// Dynamically import the client component with SSR disabled
const PreviewSuratClient = dynamic(() => import("@/components/preview-surat-client"), {
  ssr: false,
  loading: () => <PreviewSuratLoading />,
})

export default function PreviewSuratPage() {
  return <PreviewSuratClient />
}
