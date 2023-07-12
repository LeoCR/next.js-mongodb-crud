/* eslint-disable @next/next/no-img-element */
"use client";

import { useRouter } from "next/navigation";
import { deletePost } from "@app/actions/post/deletePost";
import { Post as IPost } from "@app/types/post.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const Post = ({ postData }: { postData: IPost }) => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hydrate-posts"] });
    },
  });
   const handleDelete = (id:string) => {
     deletePostMutation.mutate(id);
   };

  return (
    <li className="w-64 min-h-[430px] flex flex-col items-center border border-solid border-slate-900 dark:border-gray-100 bg-white dark:bg-black p-2 rounded-3xl shadow-xl">
      <button
        onClick={() => handleDelete(postData._id)}
        className=" m-[-15px] relative float-left left-1/2 bg-blue-600 text-white p-4 rounded-1 basis-0 flex-5 "
      >
        X
      </button>
      <img
        src={postData.image_url}
        alt={postData.title}
        className="w-1/2 mb-6"
      />

      <p className="absolute p-1 transform -rotate-45 text-xs text-center bg-red-600 mt-[40px] mr-[125px] text-white dark:text-slate-400">
        {postData.category.name}
      </p>
      <h3 className="mt-6 text-2xl text-center text-slate-900 dark:text-white">
        {postData.title}
      </h3>

      <p className="text-base text-center mt-2 text-slate-500 dark:text-slate-400">
        {postData.description}
      </p>
      <button className="p-2 bg-green-600" onClick={()=> router.push(`/posts/${postData._id}`) }>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="#FFFFFF"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
          />
        </svg>
      </button>
    </li>
  );
};

export default Post;
