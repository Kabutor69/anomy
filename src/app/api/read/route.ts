import { NextRequest, NextResponse } from "next/server";
import { Collection, Document } from "mongodb";
import clientPromise from "@/lib/mongodb";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const limit = parseInt(searchParams.get("limit") || "12", 10);
    const skip = parseInt(searchParams.get("skip") || "0", 10);

    const client = await clientPromise;
    const db = client.db("anomy");
    const collection: Collection<Document> = db.collection("posts");

    const posts = await collection
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

    return NextResponse.json({ posts: posts || [] }, { status: 200 });
  } catch (error: unknown) {
    console.error("API GET error in read route:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}