"use client";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

type Post = {
  _id?: string;
  message: string;
  createdAt?: string;
};

type LivePostPayload = {
  _id: string;
  message: string;
  createdAt: string;
};

const Read = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const postsRef = useRef<HTMLDivElement>(null);
  const limit = 10;
  const totalPages = Math.max(1, Math.ceil(total / limit));

  const fetchPosts = async (requestedPage: number, query: string) => {
    setLoading(true);
    const params = new URLSearchParams({
      limit: limit.toString(),
      skip: ((requestedPage - 1) * limit).toString(),
    });

    if (query) params.set("q", query);

    const res = await fetch(`/api/read?${params.toString()}`, {
      cache: "no-store",
    });

    const data = await res.json();

    if (!res.ok || !data.posts) {
      setLoading(false);
      return;
    }

    setPosts(data.posts);
    setTotal(data.total || 0);
    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(page, searchTerm);
  }, [page, searchTerm]);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setSearchTerm(searchInput.trim());
  };

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    postsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const source = new EventSource("/api/live");

    const handlePostCreated = (event: MessageEvent<string>) => {
      try {
        const payload = JSON.parse(event.data) as LivePostPayload;

        setPosts((prev) => {
          const alreadyExists = prev.some((item) => item._id === payload._id);

          if (alreadyExists) {
            return prev;
          }

          return [payload, ...prev];
        });

        setTotal((prev) => prev + 1);
      } catch {
        return;
      }
    };

    source.addEventListener("post-created", handlePostCreated as EventListener);

    return () => {
      source.removeEventListener("post-created", handlePostCreated as EventListener);
      source.close();
    };
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
        <div className="w-full max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-neutral-500">
            Explore the archive
          </p>
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-3 rounded-2xl border border-neutral-800 bg-neutral-950/80 p-2 shadow-[0_18px_50px_rgba(0,0,0,0.25)] transition focus-within:border-lime-300/60"
          >
            <span className="pl-3 text-lg text-neutral-500" aria-hidden="true">
              /
            </span>
            <label htmlFor="post-search" className="sr-only">
              Search posts
            </label>
            <input
              id="post-search"
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Search a thought"
              className="min-w-0 flex-1 bg-transparent px-1 py-2 text-sm text-white outline-none placeholder:text-neutral-600 sm:text-base"
            />
            {searchInput && (
              <button
                type="button"
                onClick={() => {
                  setSearchInput("");
                  setSearchTerm("");
                  setPage(1);
                }}
                aria-label="Clear search"
                className="px-2 text-lg leading-none text-neutral-500 transition hover:text-white"
              >
                ×
              </button>
            )}
            <button
              type="submit"
              className="rounded-xl bg-lime-300 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-lime-400"
            >
              Search
            </button>
          </form>
        </div>

        <div ref={postsRef} className="grid scroll-mt-6 grid-cols-1 gap-8 w-full max-w-4xl">
          {posts.map((item, index) => (
            <div
              key={item._id?.toString() || index}
              className="h-full flex flex-col p-8 md:p-10 hover:scale-105 border border-white rounded-xl hover:shadow-lg shadow-neutral-600 transition-all bg-neutral-950 justify-center text-sm sm:text-base md:text-lg lg:text-xl hover:font-semibold"
            >
              <p className="text-white mt-2 mb-6 break-word whitespace-pre-line">{item.message}</p>
            </div>
          ))}

          {posts.length === 0 && (
            <p className="text-neutral-400 text-center">
              {loading ? "Loading..." : searchTerm ? "No matching posts." : "No posts yet."}
            </p>
          )}
        </div>

        {total > 0 && (
          <nav
            aria-label="Posts pagination"
            className="flex w-full max-w-4xl items-center justify-between border-t border-neutral-800 pt-6 text-sm sm:text-base"
          >
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={loading || page === 1}
              className="text-neutral-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              <span aria-hidden="true">‹</span> Previous
            </button>
            <span className="text-neutral-400" aria-live="polite">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={loading || page === totalPages}
              className="text-neutral-400 transition hover:text-white disabled:cursor-not-allowed disabled:opacity-30"
            >
              Next <span aria-hidden="true">›</span>
            </button>
          </nav>
        )}
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
