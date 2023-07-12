
import { IPostResponse } from "@app/interfaces/IPost";

export default async function getPost(id?: string | number): Promise<IPostResponse> {
  try {
    const res = await fetch(`${process.env.UI_URL}/api/post/${String(id)}`).then((resp) => {
      console.log("fetching getPost");
      return resp.json();
    });

    if (!res) {
      return {
        message: "Sorry the Post that you are looking is not available."
      };
    }
    return res;
  } catch (error) {
    return {
      message: "Sorry the Post that you are looking is not available."
    };
  }
}