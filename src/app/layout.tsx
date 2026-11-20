import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/demo.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const viewport: Viewport = {
  themeColor: "#FAFAF9",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SHREEJAN AI SOLUTIONS | AI-Powered Websites & Automation — Mumbai",
  description:
    "Mumbai-based web agency building modern Next.js websites, AI chatbots, and smart automations for businesses across India.",
  keywords: [
    "AI website development India",
    "AI chatbot India",
    "web development Mumbai",
    "business automation India",
    "Shreejan AI",
    "SHREEJAN AI SOLUTIONS",
  ],
  authors: [{ name: "SHREEJAN AI SOLUTIONS" }],
  creator: "SHREEJAN AI SOLUTIONS",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://shreejanai.in"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/brand/app-icon.png", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/brand/app-icon.png",
    apple: "/brand/app-icon.png",
  },
  openGraph: {
    title: "SHREEJAN AI SOLUTIONS — AI Websites & Automation",
    description: "Modern Next.js websites and business automation for ambitious Indian businesses.",
    url: "https://shreejanai.in",
    siteName: "SHREEJAN AI SOLUTIONS",
    images: [{ url: "/brand/brand-banner.png", width: 1200, height: 630, alt: "SHREEJAN AI SOLUTIONS" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SHREEJAN AI SOLUTIONS — AI Websites & Automation",
    description: "Modern Next.js websites and business automation for ambitious Indian businesses.",
    images: ["/brand/brand-banner.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-bg text-text antialiased selection:bg-accent selection:text-white`}>
        {children}
      </body>
    </html>
  );
}
