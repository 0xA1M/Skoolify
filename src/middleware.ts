import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { cookies } from "next/headers";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  if (cookies().has("token")) {
    const token = String(cookies().get("token")?.value);

    const response = await fetch(`http://localhost:3000/api/check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(token),
    });

    if (response.ok) {
      const Data_ = await response.json();

      switch (Data_) {
        case "student":
          return NextResponse.redirect(new URL("/student", request.url));
        case "teacher":
          return NextResponse.redirect(new URL("/teacher", request.url));
        case "admin":
          return NextResponse.redirect(new URL("/dashboard", request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
