import { NextResponse } from "next/server";

const BE_URI = process.env.NEXT_PUBLIC_BE_URI;

// In-memory cache for user data with TTL
const userCache = new Map();
const CACHE_TTL = 45 * 60 * 1000; // 45 mins

export async function middleware(req) {
  const accessTokenCookie = req.cookies.get("access_token");
  const accessToken = accessTokenCookie?.value;
  if (!accessToken) {
    console.log('No Access Token');

    if (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/sign-up" || req.nextUrl.pathname === "/sign-up/verify")
      return NextResponse.next();
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Check if user data is cached and not expired
  const cachedEntry = userCache.get(accessToken);
  if (cachedEntry) {
    const { user, timestamp } = cachedEntry;
    if (Date.now() - timestamp < CACHE_TTL) {
      console.log('Using Cached User Data');
    } else {
      console.log('Cached User Data Expired: removing from cache');
      userCache.delete(accessToken);
    }
  }

  if (!userCache.has(accessToken)) {
    const BE_USER_URI = `${BE_URI}/api/auth/user`;
    const response = await fetch(BE_USER_URI, {
      method: "GET",
      headers: { "Content-Type": "application/json", authorization: `${accessToken}` },
    });
    const data = await response.json();  
    if (!data.user) {
      console.log('Invalid User Data: redirecting to login');
      // delete the cookie
      const res = NextResponse.redirect(new URL("/login", req.url));
      res.cookies.delete("access_token");
      return res;   
    }
    // Cache the user data with timestamp
    userCache.set(accessToken, { user: data.user, timestamp: Date.now() });
  }
  
  if (req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/sign-up") {
    console.log('User is already logged in: redirecting to home');
    // update the cookie
    const res = NextResponse.redirect(new URL("/", req.url));
    res.cookies.set("access_token", accessToken);
    return res;
  }
  const res = NextResponse.next();
  res.cookies.set("access_token", accessToken);
  return res;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // Exclude API routes and static files
};
