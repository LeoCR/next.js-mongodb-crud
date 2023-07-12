import { IMessage } from "@app/interfaces/IMessage";
import { IPost } from "@app/interfaces/IPost";

export default async function getAllPosts(): Promise<IPost[]|IMessage> {
  try {
    const posts: Promise<IPost[]> = await fetch(
      `${process.env.UI_URL}/api/posts`,
      {
        next: {
          revalidate:890000,
        },
      }
    ).then((resp) => {
      console.log("fetching getAllPosts");
      return resp.json();
    });

    return posts;
  } catch (error) {
    return {
      message: "We dont have any Posts available on this moment"
    }
  }
}
