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
/////////////////////////////////////////////////////////////////////
///version 2
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import User from "@/app/models/User";
// import bcrypt from "bcrypt";

// export const authOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: "credentials",
//       // credentials: {
//       //   username: { label: "Username", type: "text" },
//       //   email: { label: "Email", type: "email" },
//       //   password: { label: "Password", type: "password" },
//       // },
//       async authorize(credentials, req) {
//         try {
//           if (!credentials.email || !credentials.password) {
//             throw new Error("Please enter an email and password");
//           }
//           // Add logic here to look up the user from the credentials supplied by the client
//           const user = await User.findOne({ email: credentials.email }); // Implement this in your project
//           // Add logic here to look up the user from the credentials supplied
//           // console.log("user from db", user);
//           // if (!user) throw new Error("Wrong credentials!");
//           if (!user || !isPasswordCorrect) {
//             console.log("Authentication failed");
//             return null;
//           }

//           const isPasswordCorrect = await bcrypt.compare(
//             credentials.password,
//             user.password
//           );
//           // const { username, email, password } = credentials;
//           // if (!isPasswordCorrect) throw new Error("Wrong credentials!");
//           // Example logic (replace with your DB logic)
//           if (isPasswordCorrect) {
//             return { ...user, redirectUrl: "/" };
//           }
//           return user;
//         } catch (error) {
//           console.log(error);
//           throw new Error("Failed to login!");
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       if (session?.user) {
//         session.user.id = token.sub;
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       console.log("user", user);
//       if (user) {
//         token.sub = user.id || user._id;
//       }
//       return token;
//     },
//   },
//   callbackUrl: "/",
//   secret: process.env.NEXTAUTH_SECRET,
//   pages: {
//     signIn: "/signin",
//     newUser: "/register",
//     //   signUp: "/register",
//     //   // error: '/auth/error', // Error code passed in query string as ?error=
//     //   // verifyRequest: '/auth/verify-request', // (used for check email message)
//     //   // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
//   },
//   session: { strategy: "jwt" },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
////////////////////////////
///version 3///////////
// File: app/api/auth/[...nextauth]/route.js
// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import User from "@/app/models/User";
// import bcrypt from "bcrypt";
// // import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

// export const authOptions = {
//   // adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     }),
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           return null;
//         }

//         try {
//           const user = await User.findOne({ email: credentials.email });
//           if (!user) {
//             return null;
//           }

//           const isPasswordCorrect = await bcrypt.compare(
//             credentials.password,
//             user.password
//           );

//           if (!isPasswordCorrect) {
//             return null;
//           }

//           return {
//             id: user._id.toString(),
//             email: user.email,
//             username: user.username,
//           };
//         } catch (error) {
//           console.error("Auth error:", error);
//           return null;
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user, account }) {
//       if (user) {
//         token.id = user.id;
//         token.username = user.username;
//         token.email = user.email;
//         token.likes = user.likes;
//         token.upvotes = user.upvotes;
//       }
//       if (account) {
//         token.accessToken = account.access_token;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id;
//         session.user.username = token.username;
//         session.user.email = token.email;
//         session.user.likes = token.likes;
//         session.user.upvotes = token.upvotes;
//       }
//       session.accessToken = token.accessToken;
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/signin",
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };
///version 4///////////
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/app/models/User";
import bcrypt from "bcrypt";
import dbConnect from "@/app/lib/dbConnect";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";

export const authOptions = {
  // adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await dbConnect();
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const user = await User.findOne({ email: credentials.email });
          if (!user) {
            return null;
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.password
          );

          if (!isPasswordCorrect) {
            return null;
          }

          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
            image: user.image,
            favoriteSnippets: user.favoriteSnippets,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      await dbConnect();
      // Check if user exists in your database
      let dbUser = await User.findOne({ email: user.email });
      if (!dbUser) {
        // If user doesn't exist, create a new one
        dbUser = await User.create({
          username: user.username,
          email: user.email,
          image: user.image,
        });
      }
      // Attach the database user id to the user object
      user.id = dbUser._id.toString();
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.image = user.image;
        token.favoriteSnippets = user.favoriteSnippets;
      }
      return token;
    },
    async session({ session, token, user }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.favoriteSnippets = token.favoriteSnippets;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
