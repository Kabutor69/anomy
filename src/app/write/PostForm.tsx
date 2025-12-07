"use client";

import React, { useState, FormEvent, KeyboardEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

const PostForm = () => {
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("message", message);

      const res = await fetch("/api/post", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        toast.error(errorData.error || "Failed to post message");
        setIsSubmitting(false);
        return;
      }

      await res.json();
      
      setMessage("");
      
      toast.success("Posted successfully");
      
      router.refresh();
    } catch (error) {
      console.error("Error submitting post:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!isSubmitting && message.trim()) {
        const form = e.currentTarget.form;
        if (form) {
          form.requestSubmit();
        }
      }
    }
  };

  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#000",
            color: "#fff",
            border: "1px solid #fff",
            borderRadius: "8px",
            padding: "12px 16px",
            fontSize: "14px",
            fontWeight: "400",
            minWidth: "200px",
          },
          success: {
            iconTheme: {
              primary: "#84cc16",
              secondary: "#000",
            },
            style: {
              border: "1px solid #84cc16",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#fff",
            },
            style: {
              border: "1px solid #ef4444",
            },
          },
        }}
      />
      <section className="text-white py-10 px-3 flex flex-col items-center justify-center gap-12">
        <form
          onSubmit={handleSubmit}
          className="w-full items-center justify-center flex flex-col space-y-6"
        >
          <div className="grid grid-cols-1 gap-8 w-full max-w-4xl md:text-2xl text-xl">
            <textarea
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={5}
              placeholder="What's on your mind? (Press Enter to submit, Shift+Enter for new line)"
              required
              disabled={isSubmitting}
              className="p-4 text-lg rounded-xl bg-neutral-900 border border-white text-white resize-none focus:outline-none focus:ring-2 focus:ring-lime-400 disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-lime-300 hover:bg-lime-400 text-black px-6 py-3 rounded-xl self-center font-semibold transition-all md:text-2xl text-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? "Posting..." : "Post"}
          </button>
        </form>
      </section>
    </>
  );
};

export default PostForm;

