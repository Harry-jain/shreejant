import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import "@/styles/demo.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500", "600"],
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#F5F2EA",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SHREEJAN // Digital Engineering Studio — Mumbai",
  description:
    "We build the digital systems behind ambitious businesses. Fast, clean web platforms, intelligent automation, and custom digital products.",
  keywords: [
    "Digital Engineering Studio Mumbai",
    "Next.js web development Mumbai",
    "intelligent automation India",
    "custom software development",
    "Shreejan AI Solutions",
    "SHREEJAN",
  ],
  authors: [{ name: "SHREEJAN AI SOLUTIONS" }],
  creator: "SHREEJAN AI SOLUTIONS",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://shreejanai.in"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/brand/logo-transparent.png", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/brand/logo-transparent.png",
    apple: "/brand/logo-transparent.png",
  },
  openGraph: {
    title: "SHREEJAN // Digital Engineering Studio",
    description: "We make ambitious ideas work in the real world. Websites. Intelligent automation. Custom digital products.",
    url: "https://shreejanai.in",
    siteName: "SHREEJAN",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SHREEJAN // Digital Engineering Studio",
    description: "We make ambitious ideas work in the real world. Websites. Intelligent automation. Custom digital products.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} ${ibmPlexMono.variable} font-sans bg-bg text-text antialiased selection:bg-accent selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
