"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n";

const NAV_LINKS = [
  { href: "/", key: "nav.home", label: "Home" },
  { href: "/#demos", key: "nav.demos", label: "Demos" },
  { href: "/services", key: "nav.services", label: "Services" },
  { href: "/portfolio", key: "nav.portfolio", label: "Portfolio" },
  { href: "/about", key: "nav.about", label: "About" },
  { href: "/blog", key: "nav.blog", label: "Blog" },
  { href: "/contact", key: "nav.contact", label: "Contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const [pendingHref, setPendingHref] = useState<string | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [navProgress, setNavProgress] = useState(0);

  const pathname = usePathname();
  const router = useRouter();
  const { t } = useLanguage();

  // Scroll detection via IntersectionObserver
  useEffect(() => {
    let sentinel = document.getElementById("nav-scroll-sentinel");
    if (!sentinel) {
      sentinel = document.createElement("div");
      sentinel.id = "nav-scroll-sentinel";
      sentinel.style.position = "absolute";
      sentinel.style.top = "0";
      sentinel.style.left = "0";
      sentinel.style.width = "100%";
      sentinel.style.height = "32px";
      sentinel.style.pointerEvents = "none";
      sentinel.style.visibility = "hidden";
      sentinel.style.zIndex = "-1";
      document.body.prepend(sentinel);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting);
      },
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // Pre-warm routes
  useEffect(() => {
    NAV_LINKS.forEach((link) => {
      try {
        router.prefetch(link.href);
      } catch (err) {
        // Ignore prefetch network errors
      }
    });
  }, [router]);

  // Route change cleanup
  useEffect(() => {
    setIsNavigating(false);
    setPendingHref(null);
    setNavProgress(100);
    setMobileMenuOpen(false);

    const timer = setTimeout(() => {
      setNavProgress(0);
      document.documentElement.removeAttribute("data-navigating");
    }, 250);

    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
    return () => clearTimeout(timer);
  }, [pathname]);

  // Lock body scroll on mobile menu
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Progress bar ticker
  useEffect(() => {
    if (!isNavigating) return;
    setNavProgress(25);
    const t1 = setTimeout(() => setNavProgress(65), 100);
    const t2 = setTimeout(() => setNavProgress(88), 350);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [isNavigating]);

  const handleNavClick = (href: string) => {
    if (href === pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      setMobileMenuOpen(false);
      return;
    }

    document.documentElement.setAttribute("data-navigating", "true");
    setIsNavigating(true);
    setPendingHref(href);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Navigation Progress Laser Bar */}
      <div
        className="fixed top-0 left-0 right-0 z-[70] h-[3px] pointer-events-none transition-opacity duration-300"
        style={{ opacity: navProgress > 0 && navProgress < 100 ? 1 : 0 }}
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-[#7C5CFC] via-[#A78BFA] to-[#38BDF8] shadow-[0_0_12px_rgba(124,92,252,0.9)] transition-all duration-200 ease-out"
          style={{ width: `${navProgress}%` }}
        />
      </div>

      {/* Floating Glassmorphism Navbar — Seamlessly Merged into Hero */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-3 sm:pt-4 px-3 sm:px-6 pointer-events-none transition-all duration-300">
        <div className="w-full max-w-[1280px] pointer-events-auto">
          <nav
            className={`flex items-center justify-between px-4 sm:px-6 rounded-full transition-all duration-300 ease-out bg-[#090C15]/80 backdrop-blur-2xl border border-white/[0.04] shadow-[0_12px_40px_rgba(0,0,0,0.7)] ${
              scrolled
                ? "h-[50px] sm:h-[52px] bg-[#090C15]/92 border-white/[0.06] shadow-[0_16px_48px_rgba(0,0,0,0.85)]"
                : "h-[58px] sm:h-[62px]"
            }`}
            aria-label="Main Navigation"
          >
            {/* Logo — Always Clean White on Dark Glass */}
            <Link
              href="/"
              onClick={() => handleNavClick("/")}
              className="logo-link flex items-center group outline-none focus:outline-none ring-0 border-0 select-none transition-transform duration-200 hover:scale-[1.02]"
              aria-label="SHREEJAN AI SOLUTIONS Home"
            >
              {!logoError ? (
                <div className={`relative transition-all duration-300 ${scrolled ? "h-8 w-32 sm:h-9 sm:w-40" : "h-10 w-36 sm:h-11 sm:w-48"}`}>
                  <Image
                    src="/brand/logo-transparent.png"
                    alt="SHREEJAN AI SOLUTIONS"
                    fill
                    sizes="(max-width: 768px) 160px, 200px"
                    className="object-contain object-left border-0 outline-none"
                    priority
                    onError={() => setLogoError(true)}
                  />
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-black text-lg sm:text-xl tracking-tight text-white">
                    SHREEJAN <span className="text-[#7C5CFC]">AI</span>
                  </span>
                </div>
              )}
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1 xl:space-x-1.5">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                const isPending = pendingHref === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    onClick={() => handleNavClick(link.href)}
                    className={`font-body font-medium text-[13.5px] xl:text-[14.5px] px-3.5 py-1.5 rounded-full transition-all duration-200 relative select-none ${
                      isActive || isPending
                        ? "text-[#A78BFA] bg-[#7C5CFC]/20 font-semibold shadow-xs"
                        : "text-white/75 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span>{t(link.key) || link.label}</span>
                  </Link>
                );
              })}
            </div>

            {/* Right side CTA: Electric Violet CTA Button (Language Pill Removed) */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/contact"
                onClick={() => handleNavClick("/contact")}
                className="inline-flex items-center justify-center gap-2 px-5 py-2 rounded-full bg-[#7C5CFC] hover:bg-[#6847ED] text-white font-heading font-semibold text-xs sm:text-sm tracking-tight shadow-[0_4px_16px_rgba(124,92,252,0.4)] hover:shadow-[0_6px_24px_rgba(124,92,252,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 rounded-full flex items-center justify-center border border-white/15 bg-white/10 text-white focus:outline-none transition-colors"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer — Dark Frosted Glass */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/70 backdrop-blur-md"
          onClick={() => setMobileMenuOpen(false)}
        />

        <div
          className={`absolute top-0 right-0 w-[85vw] max-w-sm h-full bg-[#090C15]/95 backdrop-blur-2xl border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl transition-transform duration-300 ease-out overflow-y-auto text-white ${
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="pt-12">
            <div className="text-[11px] font-mono font-semibold uppercase tracking-[2px] text-[#7C5CFC] mb-5">
              SHREEJAN AI SOLUTIONS
            </div>
            <nav className="flex flex-col space-y-2">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);
                const isPending = pendingHref === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    prefetch={true}
                    onClick={() => handleNavClick(link.href)}
                    className={`flex items-center justify-between text-base font-heading font-medium py-3 px-3.5 rounded-xl transition-colors ${
                      isActive || isPending
                        ? "text-[#A78BFA] bg-[#7C5CFC]/20 font-semibold"
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span>{t(link.key) || link.label}</span>
                    <ArrowRight className="w-4 h-4 opacity-50" />
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-white/10 space-y-4">
            <Link
              href="/contact"
              onClick={() => handleNavClick("/contact")}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#7C5CFC] hover:bg-[#6847ED] text-white font-heading font-semibold text-sm shadow-lg shadow-[#7C5CFC]/30"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <div className="text-center text-xs text-white/50 font-mono">
              Mumbai HQ · Sovereign Gen AI Agency
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
