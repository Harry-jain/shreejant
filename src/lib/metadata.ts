import type { Metadata } from "next";

interface MetadataProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
}

export function constructMetadata({
  title,
  description,
  keywords = [],
  canonicalUrl = "/",
  ogImage = "/og-image.png",
}: MetadataProps): Metadata {
  const defaultKeywords = [
    "SHREEJAN AI SOLUTIONS",
    "Shreejan AI",
    "AI website development India",
    "AI chatbot India",
    "web development India",
    "business automation India",
    "Mumbai web development",
  ];

  return {
    title: `${title} | SHREEJAN AI SOLUTIONS`,
    description,
    keywords: Array.from(new Set([...defaultKeywords, ...keywords])),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${title} | SHREEJAN AI SOLUTIONS`,
      description,
      url: `https://shreejanai.in${canonicalUrl}`,
      siteName: "SHREEJAN AI SOLUTIONS",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${title} | SHREEJAN AI SOLUTIONS`,
        },
      ],
      locale: "en_IN",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | SHREEJAN AI SOLUTIONS`,
      description,
      images: [ogImage],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

