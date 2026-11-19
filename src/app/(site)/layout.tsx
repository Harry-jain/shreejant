import type { Metadata, Viewport } from "next";
import "../globals.css";
import "@/styles/demo.css";
import "@/styles/devanagari.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { StickyMobileBar } from "@/components/StickyMobileBar";
import { SplashCurtain } from "@/components/SplashCurtain";
import { GlobalCursorGlow } from "@/components/layout/GlobalCursorGlow";
import { LanguageProvider } from "@/i18n";

export const viewport: Viewport = {
  themeColor: "#090C15",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "SHREEJAN AI SOLUTIONS | AI-Powered Websites & Automation — Mumbai-based, serving all of India",
  description:
    "Mumbai-based startup building AI-powered websites, chatbots, and automation for businesses across India. Engineering Intelligence. Building Tomorrow.",
  keywords: [
    "AI website development India",
    "AI chatbot India",
    "web development India",
    "business automation India",
    "Shreejan AI",
    "SHREEJAN AI SOLUTIONS",
    "Gen AI Agency India",
  ],
  authors: [{ name: "SHREEJAN AI SOLUTIONS" }],
  creator: "SHREEJAN AI SOLUTIONS",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://shreejanai.in"),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/brand/app-icon.png?v=3", sizes: "any" },
      { url: "/favicon-32x32.png?v=3", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png?v=3", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/brand/app-icon.png?v=3",
    apple: "/brand/app-icon.png?v=3",
  },
  openGraph: {
    title: "SHREEJAN AI SOLUTIONS — Engineering Intelligence. Building Tomorrow.",
    description: "AI-powered websites and autonomous enterprise workflows for businesses that refuse to settle.",
    url: "https://shreejanai.in",
    siteName: "SHREEJAN AI SOLUTIONS",
    images: [{ url: "/brand/brand-banner.png", width: 1200, height: 630, alt: "SHREEJAN AI SOLUTIONS" }],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SHREEJAN AI SOLUTIONS — Engineering Intelligence. Building Tomorrow.",
    description: "AI-powered websites and autonomous enterprise workflows for businesses that refuse to settle.",
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

const perfInitScript = `(function(){try{var s=localStorage.getItem('shreejan_perf');document.documentElement.dataset.perf=(s==='lite')?'lite':'full';}catch(e){document.documentElement.dataset.perf='full';}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "SHREEJAN AI SOLUTIONS",
    image: "https://shreejanai.in/brand/brand-banner.png",
    "@id": "https://shreejanai.in/#business",
    url: "https://shreejanai.in",
    telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ? `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}` : "+918976517353",
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "aishreejan@gmail.com",
    priceRange: "₹₹₹",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.0688,
      longitude: 72.8703,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:30",
      closes: "19:00",
    },
    sameAs: [
      "https://linkedin.com",
      "https://instagram.com",
      "https://x.com",
    ],
  };

  return (
    <html
      lang="en"
      data-theme="dark"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="icon" href="/brand/app-icon.png?v=3" type="image/png" sizes="any" />
        <link rel="shortcut icon" href="/brand/app-icon.png?v=3" type="image/png" />
        <link rel="apple-touch-icon" href="/brand/app-icon.png?v=3" />
        <link rel="preload" href="/fonts/cal-sans-semibold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/cal-sans-bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=DM+Sans:ital,opsz,wght@0,9..40,300..700;1,9..40,300..700&family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;600;700;800&family=Noto+Sans+Devanagari:wght@400;500;700&family=Noto+Serif+Devanagari:wght@500;600&family=Space+Grotesk:wght@400;500;600;700&display=swap"
        />
        <script
          id="shreejan-perf-init"
          dangerouslySetInnerHTML={{ __html: perfInitScript }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body bg-[#090C15] text-[#F4F7FB] antialiased selection:bg-[#7C5CFC] selection:text-white">
        <SplashCurtain />
        <GlobalCursorGlow />
        <LanguageProvider>
          <Navbar />
          <main className="min-h-screen pb-16 md:pb-0 overflow-x-clip">{children}</main>
          <Footer />
          <WhatsAppButton />
          <StickyMobileBar />
        </LanguageProvider>
      </body>
    </html>
  );
}
