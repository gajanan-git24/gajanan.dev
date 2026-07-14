import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import portfolioData from "@/data/portfolio.json";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${portfolioData.profile.name} | ${portfolioData.profile.title}`,
    template: `%s | ${portfolioData.profile.name}`,
  },
  description: portfolioData.profile.bio,
  keywords: [
    "Full-Stack Developer",
    "Python",
    "React",
    "FastAPI",
    "Web Development",
    "CS Student",
  ],
  authors: [{ name: portfolioData.profile.name }],
  creator: portfolioData.profile.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gajanan.dev",
    title: `${portfolioData.profile.name} | ${portfolioData.profile.title}`,
    description: portfolioData.profile.bio,
    siteName: "gajanan.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: `${portfolioData.profile.name} | ${portfolioData.profile.title}`,
    description: portfolioData.profile.bio,
  },
  metadataBase: new URL("https://gajanan.dev"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${syne.variable} font-sans min-h-screen flex flex-col antialiased`}>
        <Navbar />
        <main className="flex-grow pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto w-full">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
