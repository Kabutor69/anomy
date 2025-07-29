import React from "react";

const fetchPosts = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/read?limit=4`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  return data.posts || [];
};

const Write = async () => {
  const posts = await fetchPosts();

  return (
    <main className="bg-black min-h-screen">
      <section className=" mx-auto px-3 py-40 flex items-center justify-center gap-12 ">
        <div className="text-center md:w-1/2 w-3/4">
          <h1 className={`md:text-9xl text-5xl font-bold text-white `}>
            Speak As None, Judgment Free .
          </h1>
          <p className="mt-6 md:text-4xl text-2xl text-white leading-relaxed">
            Share your thoughts anonymously , No login , No identity , Just
            words.
          </p>
        </div>
      </section>

      <section className="text-white py-10 px-3 flex flex-col items-center justify-center gap-12">
        <form
          action="/api/post"
          method="POST"
          className="w-full items-center justify-center flex flex-col space-y-6"
        >
          <div className="grid grid-cols-1 gap-8 w-full max-w-4xl md:text-2xl text-xl">
            <textarea
              name="message"
              rows={5}
              placeholder="What's on your mind?"
              required
              className="p-4 text-lg rounded-xl bg-neutral-900 border border-white text-white resize-none focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>
          <button
            type="submit"
            className="bg-lime-300 hover:bg-lime-400 text-black px-6 py-3 rounded-xl self-center font-semibold transition-all md:text-2xl text-xl hover:scale-105"
          >
            Post
          </button>
        </form>
      </section>

      <section className="text-white py-10 px-3 flex flex-col items-center justify-center gap-12 mb-16">
        <h2 className="md:text-4xl text-3xl font-bold text-center mb-10">
          Recent Posts
        </h2>
        <div className="grid grid-cols-1 gap-8 w-full max-w-4xl">
          {posts.map((item: any, index: number) => (
            <div
              key={index}
              className="h-full flex flex-col p-10 hover:scale-105 border border-white rounded-xl  hover:shadow-lg shadow-neutral-600 transition-all bg-neutral-950 justify-center text-xl hover:font-semibold"
            >
              <p className="text-white mt-2 mb-6 break-words">{item.message}</p>
            </div>
          ))}
          {posts.length === 0 && (
            <p className="text-neutral-400 text-center">No posts yet.</p>
          )}
        </div>
      </section>

      <section className="text-white py-10 px-3 flex flex-col items-center justify-center gap-12 mb-16">
        <div className="md:text-4xl text-3xl font-bold text-center mb-10">
          Say Anything, Be No One .
        </div>
      </section>
    </main>
  );
};

export default Write;
