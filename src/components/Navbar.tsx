"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";

const decorativeLinks = [
  "Ceiling Glass", "Texture Crystal Door Panel", "Texture Crystal Window Panel",
  "Beveled Mirror Wall", "LED Smart Mirror", "Frosted Glass",
  "Original Stained Glass", "Artistic Stained Glass",
];
const architecturalLinks = [
  "ACP Wall Cladding", "Double Glazed Glass", "Glass Curtain Wall",
  "Glass Shop Front", "Office Glass Partition", "Shower Cabin",
  "Stairs Glass Railing", "Tempered Glass", "Terrace Glass Railing",
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [megaOpen,   setMegaOpen]   = useState(false);
  const [scrolled,   setScrolled]   = useState(false);
  const megaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <>
      {/* ── Top strip ──────────────────────────── */}
      <div className="hidden bg-navy py-2.5 md:block">
        <div className="container-luxe flex items-center justify-between">
          <span className="text-xs text-white/50 tracking-wide">
            Pakistan's Premier Architectural &amp; Decorative Glass Company
          </span>
          <div className="flex items-center gap-6 text-xs text-white/60">
            <a href="tel:+923015025862"
               className="flex items-center gap-1.5 transition hover:text-gold">
              <Phone className="h-3 w-3 text-gold" /> +92 301 502 5862
            </a>
            <a href="mailto:mudassirchadhar789@gmail.com"
               className="flex items-center gap-1.5 transition hover:text-gold">
              <Mail className="h-3 w-3 text-gold" /> mudassirchadhar789@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* ── Main header ────────────────────────── */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/96 shadow-luxury backdrop-blur-xl"
          : "border-b border-navy/[0.07] bg-white"
      }`}>
        <div className="container-luxe flex h-20 items-center justify-between gap-8">

          {/* Logo */}
          <Link href="/" className="group flex shrink-0 items-center gap-3">
            <Image src="/images/logo.png" alt="New Toheed Glass" width={52} height={52}
                   className="h-12 w-12 object-contain transition-transform duration-300 group-hover:scale-105" />
            <div className="leading-snug">
              <p className="font-serif text-[17px] font-bold text-navy tracking-tight">
                New Toheed Glass
              </p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-gold">
                &amp; Accessories
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden flex-1 items-center justify-end gap-7 md:flex">
            <Link href="/"
                  className="text-sm font-medium text-navy/70 transition hover:text-navy">
              Home
            </Link>

            {/* Mega dropdown */}
            <div className="relative" ref={megaRef}>
              <button
                onMouseEnter={() => setMegaOpen(true)}
                onClick={() => setMegaOpen(!megaOpen)}
                className={`flex items-center gap-1 text-sm font-medium transition ${
                  megaOpen ? "text-navy" : "text-navy/70 hover:text-navy"
                }`}>
                Products
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${megaOpen ? "rotate-180 text-gold" : ""}`} />
              </button>

              {megaOpen && (
                <div
                  onMouseLeave={() => setMegaOpen(false)}
                  className="absolute right-0 top-full z-50 mt-4 w-[600px] overflow-hidden rounded-2xl border border-navy/[0.07] bg-white shadow-hover">
                  {/* Header row */}
                  <div className="grid grid-cols-2 border-b border-navy/[0.06] bg-navy/[0.02] px-5 py-3">
                    <Link href="/products?category=DECORATIVE_GLASS"
                          onClick={() => setMegaOpen(false)}
                          className="text-xs font-bold uppercase tracking-widest text-gold hover:underline">
                      Decorative Glass →
                    </Link>
                    <Link href="/products?category=ARCHITECTURAL_GLASS"
                          onClick={() => setMegaOpen(false)}
                          className="text-xs font-bold uppercase tracking-widest text-gold hover:underline">
                      Architectural Glass →
                    </Link>
                  </div>
                  {/* Links grid */}
                  <div className="grid grid-cols-2 divide-x divide-navy/[0.05] p-2">
                    <ul className="p-2">
                      {decorativeLinks.map((l) => (
                        <li key={l}>
                          <Link href="/products?category=DECORATIVE_GLASS"
                                onClick={() => setMegaOpen(false)}
                                className="block rounded-lg px-3 py-2 text-sm text-navy/70 transition hover:bg-gold/5 hover:text-navy">
                            {l}
                          </Link>
                        </li>
                      ))}
                    </ul>
                    <ul className="p-2">
                      {architecturalLinks.map((l) => (
                        <li key={l}>
                          <Link href="/products?category=ARCHITECTURAL_GLASS"
                                onClick={() => setMegaOpen(false)}
                                className="block rounded-lg px-3 py-2 text-sm text-navy/70 transition hover:bg-gold/5 hover:text-navy">
                            {l}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  {/* Footer */}
                  <div className="flex items-center justify-between border-t border-navy/[0.06] bg-navy/[0.02] px-5 py-3">
                    <span className="text-xs text-navy/40">Trusted glass specialists in Pakistan</span>
                    <Link href="/products" onClick={() => setMegaOpen(false)}
                          className="text-xs font-semibold text-navy hover:text-gold">
                      View all products →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/gallery"
                  className="text-sm font-medium text-navy/70 transition hover:text-navy">
              Project References
            </Link>
            <Link href="/about"
                  className="text-sm font-medium text-navy/70 transition hover:text-navy">
              About
            </Link>
            <Link href="/contact"
                  className="text-sm font-medium text-navy/70 transition hover:text-navy">
              Contact
            </Link>
            <Link href="/contact" className="btn-primary shrink-0 text-sm">
              Free Quote
            </Link>
          </nav>

          <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen
              ? <X    className="h-6 w-6 text-navy" />
              : <Menu className="h-6 w-6 text-navy" />}
          </button>
        </div>

        {/* Mobile */}
        {mobileOpen && (
          <div className="border-t border-navy/[0.07] bg-white md:hidden">
            <div className="container-luxe flex flex-col gap-1 py-5">
              <Link href="/" onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-navy hover:bg-gold/5">Home</Link>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-navy hover:bg-gold/5">
                  Products <ChevronDown className="h-4 w-4 text-gold" />
                </summary>
                <div className="mt-1 rounded-xl bg-navy/[0.02] px-4 py-3">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-gold">Decorative Glass</p>
                  {decorativeLinks.slice(0,5).map((l) => (
                    <Link key={l} href="/products?category=DECORATIVE_GLASS"
                          onClick={() => setMobileOpen(false)}
                          className="block py-1.5 pl-3 text-sm text-navy/60 hover:text-navy">{l}</Link>
                  ))}
                  <p className="mb-2 mt-3 text-[10px] font-bold uppercase tracking-widest text-gold">Architectural Glass</p>
                  {architecturalLinks.slice(0,5).map((l) => (
                    <Link key={l} href="/products?category=ARCHITECTURAL_GLASS"
                          onClick={() => setMobileOpen(false)}
                          className="block py-1.5 pl-3 text-sm text-navy/60 hover:text-navy">{l}</Link>
                  ))}
                </div>
              </details>
              <Link href="/gallery" onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-navy hover:bg-gold/5">Project References</Link>
              <Link href="/about" onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-navy hover:bg-gold/5">About</Link>
              <Link href="/contact" onClick={() => setMobileOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium text-navy hover:bg-gold/5">Contact</Link>
              <div className="pt-2">
                <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-primary w-full justify-center">
                  Get Free Quote
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
