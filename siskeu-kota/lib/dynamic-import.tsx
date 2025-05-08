import type React from "react"
import dynamic from "next/dynamic"

/**
 * Creates a dynamically imported component with loading state
 *
 * @param importPath - Path to the component to import
 * @param loadingComponent - Optional component to show while loading
 * @returns Dynamically imported component
 */
export function createDynamicComponent(importPath: string, loadingComponent?: React.ReactNode) {
  return dynamic(() => import(importPath), {
    loading: () => <>{loadingComponent || <div className="p-4 animate-pulse bg-muted rounded-md">Loading...</div>}</>,
    ssr: true, // Enable server-side rendering by default
  })
}

// Example usage:
// const DynamicComponent = createDynamicComponent('@/components/some-component');
