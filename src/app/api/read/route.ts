import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "12", 10);

  try {
    const client = await clientPromise;
    const db = client.db("anomy");
    const collection = db.collection("posts");

    const posts = await collection
      .find({})
      .sort({ createdAt: -1 })
      .limit(limit)
      .toArray();

    return NextResponse.json({ posts });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("GET /posts error:", error.message);
    } else {
      console.error("GET /posts unknown error:", error);
    }

    return NextResponse.json({ error: "Error fetching posts" }, { status: 500 });
  }
}
