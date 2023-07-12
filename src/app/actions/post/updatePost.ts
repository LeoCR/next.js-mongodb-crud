import { Post } from "@app/types/post.type";

export async function updatePost(post:Post) {
  const response = await fetch(`${process.env.UI_URL}/api/post/${post._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(post),
  });
  return response.json();
}
