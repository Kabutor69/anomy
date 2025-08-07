import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Anomy - Read",
  description:
    "Discover real, honest voices—no faces, no filters, no names. Read true thoughts and feelings shared openly and anonymously in a safe, judgment-free space where words speak louder than identity.",
};

export default function ReadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>; 
}
