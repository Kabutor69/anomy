"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type Post = {
  _id?: string;
  message: string;
  createdAt?: string;
};

const Read = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const limit = 12;

  const fetchPosts = async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    const nextSkip = skip;
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/read?limit=${limit}&skip=${nextSkip}`,
      { cache: "no-store" }
    );

    const data = await res.json();

    if (!res.ok || !data.posts) {
      setLoading(false);
      return;
    }

    if (data.posts.length < limit) {
      setHasMore(false);
    }

    setPosts((prev) => [...prev, ...data.posts]);
    setSkip((prev) => prev + limit);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <main className="bg-black min-h-screen">
      <section className="mx-auto px-6 py-20 md:py-40 flex items-center justify-center gap-12">
        <div className="text-center w-full md:w-1/2">
          <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white">
            Read The Unfiltered.
          </h1>
          <p className="mt-6 text-xs sm:text-base md:text-lg lg:text-2xl text-neutral-400 leading-relaxed">
            Read unfiltered thoughts from anonymous voices, no barriers, just pure honesty.
          </p>
        </div>
      </section>

      <section className="text-white py-10 px-6 flex flex-col items-center justify-center gap-12">
        <div className="grid grid-cols-1 gap-8 w-full max-w-4xl">
          {posts.map((item, index) => (
            <div
              key={item._id?.toString() || index}
              className="h-full flex flex-col p-8 md:p-10 hover:scale-105 border border-white rounded-xl hover:shadow-lg shadow-neutral-600 transition-all bg-neutral-950 justify-center text-sm sm:text-base md:text-lg lg:text-xl hover:font-semibold"
            >
              <p className="text-white mt-2 mb-6 break-words whitespace-pre-line">{item.message}</p>
            </div>
          ))}

          {posts.length === 0 && (
            <p className="text-neutral-400 text-center">No posts yet.</p>
          )}
        </div>

        <button
          onClick={fetchPosts}
          disabled={loading || !hasMore}
          className="bg-lime-300 hover:bg-lime-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-xl self-center font-semibold transition-all text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {loading ? "Loading..." : hasMore ? "Load More" : "No more posts"}
        </button>
      </section>

      <section className="text-white py-10 px-6 flex flex-col items-center justify-center gap-12 mb-16">
        <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-10">
          Got something to say? Post it
        </div>
        <Link
          href="/write"
          className="bg-transparent border-2 border-lime-400 text-white hover:bg-lime-400 hover:text-black px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl hover:scale-105"
        >
          Start Writing
        </Link>
      </section>
    </main>
  );
};

export default Read;
