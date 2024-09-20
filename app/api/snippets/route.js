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

export async function GET(request) {
  await dbConnect();
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const snippets = await Snippet.find({ userId: session.user.id });
  return NextResponse.json(snippets);
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
