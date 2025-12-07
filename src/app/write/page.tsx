import React from "react";
import Link from "next/link";
import PostForm from "./PostForm";

export const dynamic = "force-dynamic";


type Post = {
  _id?: string;
  message: string;
  createdAt?: string;
};

const fetchPosts = async (): Promise<Post[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/read?limit=4`, {
      cache: "no-store",
    });

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data.posts) ? data.posts : [];
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    return [];
  }
};

const Write = async () => {
  const posts = await fetchPosts();

  return (
    <main className="bg-black min-h-screen">
      <section className="mx-auto px-6 py-20 md:py-40 flex items-center justify-center gap-12">
        <div className="text-center w-full md:w-1/2">
          <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white">
            Speak As None, Judgment Free .
          </h1>
          <p className="mt-6 text-xs sm:text-base md:text-lg lg:text-2xl text-neutral-400 leading-relaxed">
            Express yourself freely, without fear, without judgment, just pure honesty.
          </p>
        </div>
      </section>

      <PostForm />

      <section className="text-white py-10 px-6 flex flex-col items-center justify-center gap-12 mb-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10">
          Recent Posts
        </h2>
        <div className="grid grid-cols-1 gap-8 w-full max-w-4xl">
          {Array.isArray(posts) && posts.length > 0 ? (
            posts.map((item: Post, index: number) => (
              <div
                key={item._id?.toString() || index}
                className="h-full flex flex-col p-8 md:p-10 hover:scale-105 border border-white rounded-xl hover:shadow-lg shadow-neutral-600 transition-all bg-neutral-950 justify-center text-sm sm:text-base md:text-lg lg:text-xl hover:font-semibold"
              >
                <p className="text-white mt-2 mb-6 break-words whitespace-pre-line">{item.message}</p>
              </div>
            ))
          ) : (
            <p className="text-neutral-400 text-center">No posts yet.</p>
          )}
        </div>
      </section>

      <section className="text-white py-10 px-6 flex flex-col items-center justify-center gap-12 mb-16">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10">
          Say Anything, Be No One .
        </div>
         <Link
          href="/read"
           className="bg-lime-300 hover:bg-lime-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-xl self-center font-semibold transition-all text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl hover:scale-105"
            >
          Start Reading
        </Link>
      </section>
    </main>
  );
};

export default Write;
