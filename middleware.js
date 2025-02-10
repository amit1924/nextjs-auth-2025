// import { NextResponse } from "next/server";
// import { getToken } from "next-auth/jwt";

// export async function middleware(req) {
//   const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
//   const { pathname } = req.nextUrl;
//   console.log("Middleware is running...");
//   console.log("Token:", token);
//   console.log("Pathname:", pathname);
//   // Allow unauthenticated access to login and API routes
//   if (!token && pathname !== "/login" && !pathname.startsWith("/api")) {
//     return NextResponse.redirect(new URL("/login", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/dashboard/:path*", "/admin/:path*"], // Protect these routes
// };

import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  console.log("Middleware Running...");
  console.log("Token Data:", token); // Debugging

  // Redirect if no token (not logged in)
  if (!token) {
    if (pathname !== "/login" && !pathname.startsWith("/api")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
    return NextResponse.next();
  }

  // Restrict "/admin" to admin users only
  if (pathname.startsWith("/admin") && token.role !== "admin") {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect non-admin users to home
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"], // Protect these routes
};
