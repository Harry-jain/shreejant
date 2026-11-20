import React from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WorldClientProvider } from "@/components/world/WorldClientProvider";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <WorldClientProvider>
      <Header />
      <main className="min-h-screen bg-bg text-text transition-colors duration-300">
        {children}
      </main>
      <Footer />
    </WorldClientProvider>
  );
}
