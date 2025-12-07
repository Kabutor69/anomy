import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.formData();
    const message = body.get("message")?.toString();

    if (!message || message.trim() === "") {
      return NextResponse.json(
        { error: "Message is required." },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("anomy");
    const collection = db.collection("posts");

    const result = await collection.insertOne({
      message,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { success: true, id: result.insertedId },
      { status: 200 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("API POST error:", error.message);
    } else {
      console.error("API POST error:", error);
    }

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
