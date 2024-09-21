// // File: app/api/snippets/route.js
// import { NextResponse } from "next/server";
// import { auth } from "@/auth";
// import dbConnect from "../../lib/dbConnect";
// import Snippet from "../../models/Snippet";

// export async function GET(request) {
//   await dbConnect();
//   const session = await auth();

//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const snippets = await Snippet.find({ userId: session.user.id });
//   return NextResponse.json(snippets);
// }

// export async function POST(request) {
//   await dbConnect();
//   const session = await auth();

//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const data = await request.json();
//   const snippet = new Snippet({
//     ...data,
//     userId: session.user.id,
//   });

//   await snippet.save();
//   return NextResponse.json(snippet, { status: 201 });
// }
// File: app/api/snippets/route.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import dbConnect from "../../lib/dbConnect";
import Snippet from "../../models/Snippet";

// export async function GET(request) {
//   await dbConnect();
//   const session = await getServerSession(authOptions);

//   // if (!session) {
//   //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   // }

//   const snippets = await Snippet.find({ userId: session.user.id });
//   return NextResponse.json(snippets);
// }

export async function GET(req) {
  // const { id } = params;
  await dbConnect();
  try {
    // Fetch the snippet regardless of session state
    const snippets = await Snippet.find();

    if (!snippets) {
      return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
    }

    // Get the session (check if user is authenticated)
    const session = await getServerSession(authOptions);

    if (!session) {
      // Return the snippet data for unauthenticated users without throwing unauthorized errors
      return NextResponse.json(snippets, { status: 200 });
    }

    // Return the snippet data, can include user-specific data if authenticated
    return NextResponse.json(snippets, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await request.json();
  const snippet = new Snippet({
    ...data,
    userId: session.user.id,
  });

  await snippet.save();
  return NextResponse.json(snippet, { status: 201 });
}
