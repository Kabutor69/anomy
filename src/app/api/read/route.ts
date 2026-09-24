import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "10", 10);
  const skip = parseInt(searchParams.get("skip") || "0", 10);
  const query = searchParams.get("q")?.trim() || "";

  try {
    const client = await clientPromise;
    const db = client.db("anomy");
    const collection = db.collection("posts");

    const filter = query
      ? { message: { $regex: query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), $options: "i" } }
      : {};
    const total = await collection.countDocuments(filter);
    const posts = await collection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({ posts, total });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("GET /posts error:", error.message);
    } else {
      console.error("GET /posts unknown error:", error);
    }

    return NextResponse.json({ error: "Error fetching posts" }, { status: 500 });
  }
}
