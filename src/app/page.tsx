import Link from "next/link";

export const dynamic = "force-dynamic";

type Post = {
  _id?: string;
  message: string;
  createdAt?: string;
};

const fetchPosts = async (): Promise<Post[]> => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_HOST}/api/read?limit=3`,
      {
        cache: "no-store",
      }
    );

    if (!res.ok) return [];

    const data = await res.json();
    return Array.isArray(data.posts) ? data.posts : [];
  } catch (err) {
    console.error("Failed to fetch posts:", err);
    return [];
  }
};

const Home = async () => {
  const posts = await fetchPosts();

  return (
    <main className="bg-black min-h-screen">
      <section className="mx-auto px-6 py-16 md:py-40 flex items-center justify-center">
        <div className="text-center w-full md:w-1/2">
          <h1 className="text-2xl sm:text-4xl md:text-6xl lg:text-8xl font-bold text-white">
            Say Anything, Be No One.
          </h1>
          <p className="mt-6 text-xs sm:text-base md:text-lg lg:text-2xl text-neutral-400 leading-relaxed">
            Share your thoughts anonymously, no login, no identity, just pure words.
          </p>
          <div className="mt-8 flex flex-row justify-center gap-4 sm:gap-6">
            <Link
              href="/read"
              className="bg-lime-300 hover:bg-lime-400 text-black px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl hover:scale-105"
            >
              Start Reading
            </Link>
            <Link
              href="/write"
              className="bg-transparent border-2 border-lime-400 text-white hover:bg-lime-400 hover:text-black px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl hover:scale-105"
            >
              Start Writing
            </Link>
          </div>
        </div>
      </section>
      <section className="text-white py-12 md:py-16 px-6 flex flex-col items-center justify-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-10">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
          {[
            {
              title: "Write",
              description: "Express yourself without revealing who you are.",
            },
            {
              title: "Read",
              description:
                "Discover what others have shared without any barriers.",
            },
            {
              title: "Forget",
              description:
                "Leave no trace behind, your identity is never tied to your words.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="h-full flex flex-col justify-between p-6 md:p-10 hover:shadow-lg shadow-neutral-600 border border-white rounded-xl transition-all bg-neutral-950 hover:scale-105"
            >
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-lime-300">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white mt-2 mb-6">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="text-white py-12 md:py-16 px-6 flex flex-col items-center justify-center">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-10">
          Why Anonymous?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-6xl">
          {[
            {
              title: "Freedom of Expression",
              description: "Speak your mind without fear of judgment.",
            },
            {
              title: "Privacy in the Digital Age",
              description:
                "Protect your personal information by staying anonymous.",
            },
            {
              title: "Honest Conversations",
              description: "Engage in open discussions without reservations.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="h-full flex flex-col justify-between p-6 md:p-10 hover:shadow-lg shadow-neutral-600 border border-white rounded-xl transition-all bg-neutral-950 hover:scale-105"
            >
              <div>
                <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-lime-300">
                  {item.title}
                </h3>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white mt-2 mb-6">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="text-white py-12 md:py-16 px-6 flex flex-col items-center justify-center mb-16">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-8 md:mb-10">
          Recent Posts
        </h2>
        <div className="grid grid-cols-1 gap-6 md:gap-8 w-full max-w-4xl">
          {posts.map((item: Post, index: number) => (
            <div
              key={item._id?.toString() || index}
              className="h-full flex flex-col p-6 md:p-10 hover:scale-105 border border-white rounded-xl hover:shadow-lg shadow-neutral-600 transition-all bg-neutral-950 justify-center text-sm sm:text-base md:text-lg lg:text-xl hover:font-semibold"
            >
              <p className="text-white mt-2 mb-6 break-words whitespace-pre-line">{item.message}</p>
            </div>
          ))}
          {posts.length === 0 && (
            <p className="text-neutral-400 text-center">No posts yet.</p>
          )}
        </div>
      </section>
    </main>
  );
};

export default Home;
