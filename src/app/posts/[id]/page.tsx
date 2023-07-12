import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Post as IPost } from "@app/types/post.type";
import getPost from "@app/actions/post/getPost";
import { EditPost } from "@app/components/EditPost"; 
//import getAllPosts from "@app/actions/post/getAllPosts";

export const revalidate = 0;

export type PostParams = {
  params: {
    id?: string;
  };
};

export async function generateMetadata({
  params: { id },
}: PostParams): Promise<Metadata> {
  const post = await getPost(id as string);

  if (!post || post.message) {
    return {
      title: "Post Not Found",
    };
  }
  return {
    title: post.title,
    description: post.description,
  };
}
/*
export async function generateStaticParams() {
  try {
    const posts = await getAllPosts();
    if (Array.isArray(posts)) {
      return posts.map((post) => ({
        id: post?._id?.toString(),
      }));
    }
    return [];
  } catch (error) {
    return [];
  }
}
*/
const PostPage = async ({ params }: PostParams) => {
  const { id } = params;
  const post = await getPost(id);
  if (!post || post.message) {
    return notFound();
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <section id="edit-post" className="p-2 my-12 max-w-lg w-full">
        <h2 className="text-2xl font-bold text-center sm:text-5xl mb-6 text-slate-900 dark:text-white">
          Edit Post
        </h2>
          <EditPost postData={post as IPost}/>
      </section>
    </main>
  );
};

export default PostPage;
