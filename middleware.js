// // File: middleware.js
// import { auth } from "./auth";

// export default auth((req) => {
//   // Protect all routes except public ones
//   const publicRoutes = ["/", "/api/auth"];
//   const isPublicRoute = publicRoutes.some((route) =>
//     req.nextUrl.pathname.startsWith(route)
//   );

//   if (!isPublicRoute && !req.auth) {
//     return Response.redirect(new URL("/api/auth/signin", req.nextUrl));
//   }
// });

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// };

// File: middleware.js
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/create", "/snippets/:path*"],
};
