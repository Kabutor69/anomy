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
      <section className=" mx-auto px-3 py-40 flex items-center justify-center gap-12 ">
        <div className="text-center md:w-1/2 w-3/4">
          <h1 className={`md:text-8xl text-5xl font-bold text-white `}>
            Read The Unfiltered.
          </h1>
          <p className="mt-6 md:text-4xl text-2xl text-white leading-relaxed">
            Voices from no one , meant for everyone.
          </p>
        </div>
      </section>

      <section className="text-white py-10 px-3 flex flex-col items-center justify-center gap-12">
        <div className="grid grid-cols-1 gap-8 w-full max-w-4xl">
          {posts.map((item, index) => (
            <div
              key={item._id?.toString() || index}
              className="h-full flex flex-col p-10 hover:scale-105 border border-white rounded-xl hover:shadow-lg shadow-neutral-600 transition-all bg-neutral-950 justify-center md:text-xl text-lg hover:font-semibold"
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
          disabled={loading}
          className="bg-lime-300 hover:bg-lime-400 text-black px-6 py-3 rounded-xl self-center font-semibold transition-all md:text-2xl text-xl hover:scale-105"
        >
          {loading ? "Loading..." : "Load More"}
        </button>
      </section>

      <section className="text-white py-10 px-3 flex flex-col items-center justify-center gap-12 mb-16">
        <div className="md:text-4xl text-3xl font-bold text-center my-4">
          Got something to say? Post it
        </div>
        <Link
          href="/write"
          className="bg-transparent border-2 border-lime-400 text-white hover:bg-lime-400 hover:text-black px-6 py-3 rounded-xl font-semibold transition-all self-center md:text-2xl text-xl hover:scale-105"
        >
          Start Writing
        </Link>
      </section>
    </main>
  );
};

export default Read;
