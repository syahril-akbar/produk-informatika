"use client"

import type React from "react"

import { useEffect } from "react"

// This component helps identify which component is causing React errors
export function DebugErrorBoundary({ id, children }: { id: string; children: React.ReactNode }) {
  useEffect(() => {
    console.log(`Component mounted: ${id}`)
    return () => {
      console.log(`Component unmounted: ${id}`)
    }
  }, [id])

  return <div data-debug-id={id}>{children}</div>
}
