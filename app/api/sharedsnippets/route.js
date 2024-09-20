// app/api/sharedsnippets/route.js
import dbConnect from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";
import Snippet from "../../models/Snippet";
export async function GET(request) {
  await dbConnect();
  try {
    const snippets = await Snippet.find();

    // const formattedSnippets = snippets.map((snippet) => ({
    //   ...snippet.toObject(),
    //   createdAt: snippet.createdAt.toISOString(),
    // }));
    // console.log("formattedSnippets", formattedSnippets);
    return NextResponse.json(snippets);
  } catch (error) {
    console.error("Failed to fetch snippets:", error);
    return NextResponse.json(
      { error: "Failed to fetch snippets" },
      { status: 500 }
    );
  }
}
