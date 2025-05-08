"use server"

import { cookies } from "next/headers"
import { randomBytes } from "crypto"

// Generate CSRF token
export async function generateCsrfToken() {
  const token = randomBytes(32).toString("hex")
  const cookieStore = cookies()

  // Store token in a cookie
  cookieStore.set("csrf_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  })

  return token
}

// Validate CSRF token
export async function validateCsrfToken(token: string) {
  const cookieStore = cookies()
  const storedToken = cookieStore.get("csrf_token")?.value

  if (!storedToken || token !== storedToken) {
    throw new Error("Invalid CSRF token")
  }

  return true
}
