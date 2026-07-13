import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display, Kaushan_Script } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["500", "700", "900"],
});

const script = Kaushan_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: "400",
});

const title = "Corneliuses — Laissez les bons temps rouler";
const description =
  "The Corneliuses hub — videos, Brian's corner, and Dinnerocracy, all under one wrought-iron balcony.";

export const metadata: Metadata = {
  metadataBase: new URL("https://corneliuses.com"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: "Corneliuses",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} ${script.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
