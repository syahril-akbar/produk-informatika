import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  // Only apply authentication checks to dashboard routes
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    // For development purposes, we're allowing all requests through
    // In production, you would implement proper authentication checks
    // Example of how you would check authentication:
    // const session = await getSession()
    // if (!session) {
    //   const url = new URL('/login', req.url)
    //   return NextResponse.redirect(url)
    // }
  }

  // For all other routes, just pass through
  return NextResponse.next()
}

export const config = {
  // Only run middleware on specific paths
  matcher: ["/dashboard/:path*"],
}
