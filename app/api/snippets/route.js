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
// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import { authOptions } from "../auth/[...nextauth]/route";
// import dbConnect from "../../lib/dbConnect";
// import Snippet from "../../models/Snippet";

// export async function GET(request) {
//   await dbConnect();
//   const session = await getServerSession(authOptions);

//   // if (!session) {
//   //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   // }

//   const snippets = await Snippet.find({ userId: session.user.id });
//   return NextResponse.json(snippets);
// }

// export async function GET(req) {
//   // const { id } = params;
//   await dbConnect();
//   try {
//     // Fetch the snippet regardless of session state
//     const snippets = await Snippet.find();

//     if (!snippets) {
//       return NextResponse.json({ error: "Snippet not found" }, { status: 404 });
//     }

//     // Get the session (check if user is authenticated)
//     const session = await getServerSession(authOptions);

//     if (!session) {
//       // Return the snippet data for unauthenticated users without throwing unauthorized errors
//       return NextResponse.json(snippets, { status: 200 });
//     }

//     // Return the snippet data, can include user-specific data if authenticated
//     return NextResponse.json(snippets, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import dbConnect from "../../lib/dbConnect";
import Snippet from "../../models/Snippet";
// import User from "../../models/User";
import { authOptions } from "../auth/[...nextauth]/route"; // Make sure this path points to your authOptions
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
export async function GET(req) {
  await dbConnect();

  try {
    // Get the session (check if user is authenticated)
    const session = await getServerSession(authOptions);

    let snippets;

    if (session) {
      // If the user is authenticated, fetch their specific snippets
      snippets = await Snippet.find({ userId: session.user.id });
    } else {
      // If not authenticated, fetch all snippets
      snippets = await Snippet.find();
    }

    if (!snippets) {
      return NextResponse.json({ error: "No snippets found" }, { status: 404 });
    }

    // Return the snippets based on session state
    return NextResponse.json(snippets, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// export async function POST(request) {
//   await dbConnect();
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const data = await request.json();
//   const snippet = new Snippet({
//     ...data,
//     userId: session.user.id,
//   });

//   await snippet.save();
//   revalidatePath("/");
//   return NextResponse.json(snippet, { status: 201 });
// }
export async function POST(request) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Validate the user ID
    if (!mongoose.Types.ObjectId.isValid(session.user.id)) {
      console.error("Invalid user ID:", session.user.id);
      return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }

    const userId = new mongoose.Types.ObjectId(session.user.id);

    const snippet = new Snippet({
      ...data,
      userId: userId,
    });

    await snippet.save();

    revalidatePath("/");
    return NextResponse.json(snippet, { status: 201 });
  } catch (error) {
    console.error("Error creating snippet:", error);
    return NextResponse.json(
      { error: "Error creating snippet" },
      { status: 500 }
    );
  }
}
