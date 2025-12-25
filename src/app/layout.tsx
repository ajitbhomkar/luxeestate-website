import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SanityLive } from "@/sanity/lib/live";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Luxury Real Estate | Find Your Dream Home",
  description: "Discover luxury properties, modern homes, and exclusive real estate opportunities with our expert agents.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
        <SanityLive />
      </body>
    </html>
  );
}
