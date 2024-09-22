import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import Snippet from "../../../../models/Snippet";
// import { authOptions } from "../../auth/[...nextauth]/route";
import dbConnect from "../../../../lib/dbConnect";
// import { revalidatePath } from "next/cache";
export async function PATCH(req, { params }) {
  await dbConnect();

  const { id } = params;
  const session = await getServerSession(req);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    const snippet = await Snippet.findById(id);
    if (!snippet) {
      return NextResponse.json(
        { message: "Snippet not found" },
        { status: 404 }
      );
    }

    if (snippet.upvotes.includes(userId)) {
      return NextResponse.json({ message: "Already upvoted" }, { status: 400 });
    }

    // Add user to upvotes array
    snippet.upvotes.push(userId);
    await snippet.save();

    return NextResponse.json({
      message: "Upvote added",
      upvotes: snippet.upvotes.length,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating upvote", error },
      { status: 500 }
    );
  }
}
