import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anomy - Write",
  description:
    "Speak your truth freely—no names, no judgment, no filters. Share your honest thoughts and feelings openly and anonymously in a safe space where your words are all that matter.",
};

export default function WriteLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
