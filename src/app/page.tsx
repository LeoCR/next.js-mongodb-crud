import { dehydrate } from "@tanstack/query-core";
import ListPosts from "@app/containers/ListPosts";
import getQueryClient from "@app/utils/getQueryClient";
import getAllPosts from "@app/actions/post/getAllPosts";
import Hydrate from "@app/utils/hydrate.client";

export default async function Home() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["hydrate-posts"], getAllPosts);
  const dehydratedState = dehydrate(queryClient);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-2">
      <section id="rockets" className="p-6 my-12 scroll-mt-20">
        <h2 className="text-2xl font-bold text-center sm:text-5xl mb-6 text-slate-900 dark:text-white">
          Posts
        </h2>
        <Hydrate state={dehydratedState}>
          <ListPosts />
        </Hydrate>
      </section>
    </main>
  );
}
