import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@lib/mongoclient";

export async function GET(
  request: NextRequest,
  { params }: { params: { id?: string } }
) {
  const { id } = params;
  const ID = typeof id === "string" ? new ObjectId(id) : id;
  try {
    const mongoClient = await clientPromise();

    const post = await mongoClient
      .db(process.env.DB_NAME as string)
      .collection("posts")
      .findOne({ _id: ID });

    return NextResponse.json(post);
  } catch (error) {
    console.error(`An error occurs in GET /post/${id} .Error=> `, error);
    return NextResponse.json(
      {
        message: "Sorry, We could not fetch the Post with the ID:" + ID,
      },
      {
        status: 500,
      }
    );
  }
}
export async function PUT(
  request: NextRequest,
  { params }: { params: { id?: string } }
) {
  const { id } = params;
  const post = await request.json();
  let result = {};
  const ID = typeof id === "string" ? new ObjectId(id) : id;
  try {
    if (ID) {
      const mongoClient = await clientPromise();
      if (
        post.title ||
        post.content ||
        post.image_url ||
        post.tags ||
        post.description ||
        post.category.name ||
        post.category.image
      ) {
        delete post._id;
        result = await mongoClient
          .db(process.env.DB_NAME as string)
          .collection("posts")
          .updateOne({ _id: ID }, { $set: { ...post } });
      }
    }
    return NextResponse.json({
      post: result,
    });
  } catch (error) {
    console.error(`An error occurs in PATCH /post/${id} .Error=> `, error);
    return NextResponse.json(
      {
        message: "Sorry, We could not update the Post with the ID:" + ID,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id?: string } }
) {
  const { id } = params;
  const ID = typeof id === "string" ? new ObjectId(id) : id;
  try {
    const mongoClient = await clientPromise();
    const result = await mongoClient
      .db(process.env.DB_NAME as string)
      .collection("posts")
      .deleteOne({ _id: ID });

    if (result?.deletedCount === 1) {
      return NextResponse.json({
        message: "The Post with the ID: " + ID + " was deleted successfully.",
      });
    } else {
      return NextResponse.json({
        message: "We could Not delete the Post with the ID: " + ID,
      });
    }
  } catch (error) {
    console.error(`An error occurs in DELETE /post/${id} .Error=> `, error);
    return NextResponse.json(
      {
        message: "Sorry, We could not delete the Post with the ID:" + ID,
      },
      {
        status: 500,
      }
    );
  }
}
