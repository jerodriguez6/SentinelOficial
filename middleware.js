
import { NextResponse } from "next/server";

export async function middleware(req) {

  try {


  } catch (error) {
    console.log(error);

  }

}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
};
