"use client"

import type React from "react"
import { useEffect, useState } from "react"

// This component ensures its children only render on the client
// Helps prevent hydration mismatches with useId
export function ClientOnly({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return <>{children}</>
}
