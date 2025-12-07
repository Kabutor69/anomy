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
    "No faces, no filters, no names. Just real, honest voices sharing their true thoughts and feelings openly, without fear or judgment.",
  keywords: [
    "anonymous",
    "confessions",
    "text posts",
    "no identity",
    "talk freely",
    "mental health",
    "safe space",
    "anomy",
    "anomy-teal",
    "anomyy",
    "no face",
    "no name",
    "no filters",
    "be real",
    "no judgement",
  ],

  metadataBase: new URL("https://anomy-teal.vercel.app"),

  verification: {
    google: "Q2d_2g4XEV5pIiAAxAEDIvhDvj6-4BihRRx9EcNKkDk",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title: "Anomy",
    description:
      "No faces, no filters, no names. Just real, honest voices sharing their true thoughts and feelings openly.",
    url: "https://anomy-teal.vercel.app",
    siteName: "Anomy",
    images: [
      {
        url: "/og-image.png", 
        width: 1200,
        height: 630,
        alt: "Anomy - Speak Freely",
      },
    ],
    type: "website",
    locale: "en_US",
  },

  twitter: {
    card: "summary_large_image",
    title: "Anomy",
    description:
      "No faces, no filters, no names. Just real, honest voices sharing their true thoughts and feelings openly.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
      >
        {children}
      </body>
    </html>
  );
}
