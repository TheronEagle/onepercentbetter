import { withClerkMiddleware } from "@clerk/nextjs/server";

export default withClerkMiddleware();

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};



