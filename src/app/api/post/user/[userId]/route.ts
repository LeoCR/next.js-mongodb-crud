import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@lib/mongoclient";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId?: string } }
) {
  const { userId } = params;
  try {
    const mongoClient = await clientPromise();

    const post = await mongoClient
      .db(process.env.DB_NAME as string)
      .collection("posts")
      .find({ user_id: userId })
      .toArray();

    return NextResponse.json(post);
  } catch (error) {
    console.error(`An error occurs in GET /post/${userId} .Error=> `, error);
    return NextResponse.json(
      {
        message: "Sorry, We could not fetch the Post with the ID:" + userId,
      },
      {
        status: 500,
      }
    );
  }
}
