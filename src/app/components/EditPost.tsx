"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState, useTransition } from "react";
import { updatePost } from "@app/actions/post/updatePost";
import { Post } from "@app/types/post.type";

export const EditPost = ({ postData }: { postData: Post }) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const updatePostMutation = useMutation({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["hydrate-posts"] });
    },
    onError: (err)=>{
        console.error("An error occurs",err)
    }
  });
  const [post, setPost] = useState<Post>({
    ...postData,
  });
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };
  const handleChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost({
      ...post,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updatePostMutation.mutate(post);
    startTransition(()=>{
      router.refresh()
      router.push('/')
    })
    
  };
  return (
    <form className="bg-white shadow-md rounded w-full" onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="title"
        >
          Title
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="title"
          name="title"
          type="text"
          placeholder="Title"
          value={post.title}
          onChange={handleChangeInput}
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="user_id"
        >
          User Id
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="user_id"
          name="user_id"
          type="text"
          placeholder="User Id"
          value={post.user_id}
          onChange={handleChangeInput}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="content"
        >
          Content
        </label>
        <textarea
          className="peer h-full min-h-[100px] w-full rounded-[7px] border border-gray-200  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-700  focus:outline-0 "
          onChange={handleChangeTextArea}
          id="content"
          name="content"
          placeholder="Content"
          value={post.content}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="image_url"
        >
          Image URL
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="image_url"
          name="image_url"
          type="text"
          placeholder="image_url"
          value={post.image_url}
          onChange={handleChangeInput}
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="description"
        >
          Description
        </label>
        <textarea
          className="peer h-full min-h-[100px] w-full rounded-[7px] border border-gray-200  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-black outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-700  focus:outline-0 "
          onChange={handleChangeTextArea}
          id="description"
          name="description"
          placeholder="Description"
          value={post.description}
        />
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Save
        </button>
      </div>
    </form>
  );
};
