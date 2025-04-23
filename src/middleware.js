import { NextResponse } from "next/server";

const BE_URI = process.env.NEXT_PUBLIC_BE_URI;
export async function middleware(req) {
  const accessTokenCookie = req.cookies.get("access_token");
  const accessToken = accessTokenCookie?.value;
  if (!accessToken) {
    console.log('No Access Token');
    if (req.nextUrl.pathname === "/login")
      return NextResponse.next();
    return NextResponse.redirect(new URL("/login", req.url));
  }

  const BE_USER_URI = `${BE_URI}/api/auth/user`;
  const response = await fetch(BE_USER_URI, {
    method: "GET",
    headers: { "Content-Type": "application/json", authorization: `${accessToken}` }, // Use the extracted token value
  });
  const data = await response.json();  
  if (!data.user) {
    console.log('Invalid User Data: redirecting to login');
    // delete the cookie
    const res = NextResponse.redirect(new URL("/login", req.url));
    res.cookies.delete("access_token");
    return res;   
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
