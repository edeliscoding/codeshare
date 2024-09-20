// // // File: app/api/auth/[...nextauth]/route.js
// // import NextAuth from "next-auth";
// // // import GitHub from "next-auth/providers/github";
// // import GoogleProvider from "next-auth/providers/google";
// // export const authOptions = {
// //   providers: [
// //     GoogleProvider({
// //       clientId: process.env.GOOGLE_CLIENT_ID,
// //       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
// //     }),
// //   ],
// //   callbacks: {
// //     async jwt({ token, account, profile }) {
// //       if (account) {
// //         token.accessToken = account.access_token;
// //         token.id = profile.id;
// //       }
// //       return token;
// //     },
// //     async session({ session, token }) {
// //       session.accessToken = token.accessToken;
// //       session.user.id = token.id;
// //       return session;
// //     },
// //   },
// // };

// // const handler = NextAuth(authOptions);
// // export { handler as GET, handler as POST };
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// // import { pages } from "next/dist/build/templates/app-page";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, account, profile }) {
//       if (account) {
//         token.accessToken = account.access_token;
//         token.id = profile.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       session.accessToken = token.accessToken;
//       session.user.id = token.id;
//       return session;
//     },
//   },
//   pages: {
//     callback: "/create",
//   },
// };

// const handler = NextAuth(authOptions);

// // Ensure the route handler is exported correctly for both GET and POST requests
// export { handler as GET, handler as POST };

// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//   ],
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
