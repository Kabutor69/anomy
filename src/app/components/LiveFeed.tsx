"use client";

import React, { useEffect, useState } from "react";

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

type LiveFeedProps = {
  initialPosts: Post[];
  maxItems?: number;
};

const LiveFeed = ({ initialPosts, maxItems }: LiveFeedProps) => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

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

          const next = [payload, ...prev];

          if (maxItems && next.length > maxItems) {
            return next.slice(0, maxItems);
          }

          return next;
        });
      } catch {
        return;
      }
    };

    source.addEventListener("post-created", handlePostCreated as EventListener);

    return () => {
      source.removeEventListener("post-created", handlePostCreated as EventListener);
      source.close();
    };
  }, [maxItems]);

  return (
    <div className="grid grid-cols-1 gap-6 md:gap-8 w-full max-w-4xl">
      {posts.map((item, index) => (
        <div
          key={item._id?.toString() || index}
          className="h-full flex flex-col p-6 md:p-10 hover:scale-105 border border-white rounded-xl hover:shadow-lg shadow-neutral-600 transition-all bg-neutral-950 justify-center text-sm sm:text-base md:text-lg lg:text-xl hover:font-semibold"
        >
          <p className="text-white mt-2 mb-6 break-words whitespace-pre-line">{item.message}</p>
        </div>
      ))}

      {posts.length === 0 && <p className="text-neutral-400 text-center">No posts yet.</p>}
    </div>
  );
};

export default LiveFeed;
