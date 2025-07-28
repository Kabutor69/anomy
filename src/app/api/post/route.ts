import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.formData();
    const message = body.get("message")?.toString();

    if (!message || message.trim() === "") {
      return NextResponse.json({ error: "Message is required." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("anomy"); 
    const collection = db.collection("posts");

    await collection.insertOne({
      message,
      createdAt: new Date(),
    });

    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_HOST}/write`);
  } catch (error: any) {
    console.error("API POST error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
