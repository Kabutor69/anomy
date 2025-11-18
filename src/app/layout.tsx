import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anomy",
  description:
    "No faces, no filters, no names. Just real, honest voices sharing their true thoughts and feelings openly, without fear or judgment. A safe place where your words matter more than who you are.",
  verification: {
    google: "Q2d_2g4XEV5pIiAAxAEDIvhDvj6-4BihRRx9EcNKkDk",
  },
  openGraph: {
    title: "Anomy",
    description:
      "No faces, no filters, no names. Just real, honest voices sharing their true thoughts and feelings openly.",
    url: "https://anomy-teal.vercel.app",
    siteName: "Anomy",
    images: [
      {
        url: "https://anomy-teal.vercel.app/favicon.ico",
        width: 64,
        height: 64,
        alt: "Anomy Logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Anomy",
    description:
      "No faces, no filters, no names. Just real, honest voices sharing their true thoughts and feelings openly.",
    images: ["https://anomy-teal.vercel.app/favicon.ico"], 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}>
        {children}
      </body>
    </html>
  );
}
