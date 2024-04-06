import { authMiddleware } from '@clerk/nextjs'
import { redirectToSignIn } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export default authMiddleware({
  publicRoutes: ['/'],
  afterAuth(auth, req) {
    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url })
    }

    // If the user is logged in, navigate them to the dashboard
    // if (auth.userId && auth.isPublicRoute) {
    //   return NextResponse.redirect(new URL('/dashboard', req.url))
    // }

    // Allow users visiting public routes to access them
    return NextResponse.next()
  },
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api)(.*)'],
}
