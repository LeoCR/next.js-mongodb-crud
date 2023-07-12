import clientPromise from "@lib/mongoclient";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const mongoClient = await clientPromise();
    const result = await mongoClient
      .db(process.env.DB_NAME as string)
      .collection("posts")
      .find({
        title: {
          $ne: null,
        },
      })
      .toArray();

    return NextResponse.json(result);
  } catch (error) {
    console.error("An error occurs in GET /posts", error);
    return NextResponse.json(
      {
        message: "Sorry, We could not create your Post due an error.",
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request: NextRequest) {
  let result: any = {
    message: "We could Not create your post.",
    requiredFields: [
      "title",
      "content",
      "image_url",
      "description",
      "user_id",
      "category.name",
      "tags",
    ],
    post: {},
  };
  const post = await request.json();

  try {
    const mongoClient = await clientPromise();
    if (
      post.title &&
      post.content &&
      post.user_id &&
      post.tags &&
      post.category.name &&
      post.description &&
      post.image_url
    ) {
      const userID = new ObjectId(post.user_id);
      const postCreated = await mongoClient
        .db(process.env.DB_NAME as string)
        .collection("posts")
        .insertOne({
          title: post.title,
          content: post.content,
          image_url: post.image_url,
          description: post.description,
          user_id: userID,
          category: {
            name: post.category.name,
          },
          tags: post.tags,
        });
      if (postCreated.acknowledged === true) {
        result = {
          message: "The Post was created successfully.",
          post: {
            id: postCreated.insertedId,
            ...post,
          },
        };
      }
    }
    return NextResponse.json({
      ...result,
    });
  } catch (error) {
    console.error("An error occurs in POST /posts", error);
    return NextResponse.json(
      {
        message: "Sorry, We could not create your Post due an error.",
      },
      {
        status: 500,
      }
    );
  }
}
