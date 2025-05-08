"use client"

import type React from "react"
import { createContext, useContext, useId } from "react"

// Create a context for stable IDs
const IdContext = createContext<string | null>(null)

export function useStableId(prefix: string): string {
  const contextId = useContext(IdContext)
  const localId = useId()

  // Use context ID if available, otherwise use local ID
  return `${prefix}-${contextId || localId}`
}

// Provider component to ensure consistent ID generation
export function IdProvider({ children }: { children: React.ReactNode }) {
  const rootId = useId()

  return <IdContext.Provider value={rootId}>{children}</IdContext.Provider>
}
