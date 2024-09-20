"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-lg font-bold">
          Code Snippet App
        </Link>
        <div className="space-x-4">
          <Link href="/snippets" className="text-gray-300 hover:text-white">
            MY Snippets
          </Link>
          {session ? (
            <>
              <Link href="/create" className="text-gray-300 hover:text-white">
                Create Snippet
              </Link>
              <span className="text-gray-300">{session.user.name}</span>
              <button
                onClick={() => signOut()}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
