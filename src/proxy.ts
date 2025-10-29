import { NextRequest, NextResponse } from "next/server";
import { getUserData } from "./services/auth/auth.service";

type TRole = keyof typeof roleBaseRoutes;
const authRoutes = ["/login", "/register"];
const roleBaseRoutes = {
  Admin: [/^\Admin/],
  Driver: [/^\Driver/],
  Rider: [/^\Rider/],
};

export const proxy = async (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const userData = await getUserData();
  if (!userData) {
    if (authRoutes.includes(pathname)) {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(
        new URL(`http://localhost:5000/login?redirect=${pathname}`, request.url)
      );
    }
  }
  if (userData?.role && roleBaseRoutes[userData?.role as TRole]) {
    const routes = roleBaseRoutes[userData?.role as TRole];
    if (routes.some((x) => pathname.match(x))) {
      return NextResponse.next();
    }
  }
  return NextResponse.redirect(new URL("/", request.url));
};

export const config = {
  matcher: [
    "/login",
    "/register",
    "/Admin",
    "/Admin/:page",
    "/Driver",
    "/Driver/:page",
    "/Rider",
    "/Rider/:page",
  ],
};
