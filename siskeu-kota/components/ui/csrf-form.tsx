"use client"

import { useEffect, useState, type FormEvent, type ReactNode } from "react"
import { generateCsrfToken } from "@/lib/csrf"

interface CsrfFormProps {
  children: ReactNode
  action: (formData: FormData) => Promise<void>
  className?: string
}

export function CsrfForm({ children, action, className }: CsrfFormProps) {
  const [csrfToken, setCsrfToken] = useState<string>("")

  useEffect(() => {
    async function fetchCsrfToken() {
      try {
        const token = await generateCsrfToken()
        setCsrfToken(token)
      } catch (error) {
        console.error("Failed to generate CSRF token:", error)
      }
    }

    fetchCsrfToken()
  }, [])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    formData.append("csrf_token", csrfToken)

    await action(formData)
  }

  return (
    <form onSubmit={handleSubmit} className={className}>
      <input type="hidden" name="csrf_token" value={csrfToken} />
      {children}
    </form>
  )
}
