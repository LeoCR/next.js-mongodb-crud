/* eslint-disable @next/next/no-img-element */
"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import getAllPosts from "@app/actions/post/getAllPosts";
import Post from "@app/components/Post";
import { Post as IPost } from "@app/types/post.type";

const ListPosts = () => {
  const { data, isLoading, isFetching, error } = useQuery({
    queryKey: ["hydrate-posts"],
    queryFn: () => getAllPosts()
  });
  return (
    <section className="flex flex-col md:flex-row">
      {error ? (
        <p>Oh no, there was an error</p>
      ) : isLoading || isFetching ? (
        <p>Loading...</p>
      ) : data && Array.isArray(data) ? (
        <ul className="list-none mx-auto my-12 flex flex-col sm:flex-row items-center gap-8">
          {data.map((post: IPost) => (
            <Post postData={post} key={post._id} />
          ))}
        </ul>
      ) : (
        <>There is no Posts</>
      )}
    </section>
  );
};

export default ListPosts;
