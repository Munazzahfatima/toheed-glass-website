"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

type NavProduct = { name: string; slug: string };

const categoryGroups: { key: string; label: string; items: NavProduct[] }[] = [
  {
    key: "DECORATIVE",
    label: "Decorative",
    items: [
      { name: "Ceiling Glass", slug: "ceiling-glass" },
      { name: "Texture Crystal Glass Door Panel", slug: "texture-crystal-glass-door-panel" },
      { name: "Texture Crystal Glass Window Panel", slug: "texture-crystal-glass-window-panel" },
      { name: "Decorative Beveled Mirror Wall", slug: "decorative-beveled-mirror-wall" },
      { name: "Decorative LED Smart Mirror", slug: "decorative-led-smart-mirror" },
      { name: "Frosted Glass", slug: "frosted-glass" },
    ],
  },
  {
    key: "RESIDENTIAL",
    label: "Residential",
    items: [
      { name: "Shower Cabin", slug: "shower-cabin" },
      { name: "Skylight Glass", slug: "skylight-glass" },
      { name: "Single Glass Door", slug: "single-glass-door" },
      { name: "Stairs Glass Railing", slug: "stairs-glass-railing" },
      { name: "Terrace Glass Railing", slug: "terrace-glass-railing" },
    ],
  },
  {
    key: "COMMERCIAL",
    label: "Commercial",
    items: [
      { name: "ACP Wall Cladding", slug: "acp-wall-cladding" },
      { name: "Double Glazed Glass", slug: "double-glazed-glass" },
      { name: "Glass Curtain Wall", slug: "glass-curtain-wall" },
      { name: "Glass Shop Front", slug: "glass-shop-front" },
      { name: "Office Glass Partition", slug: "office-glass-partition" },
    ],
  },
  {
    key: "SAFETY",
    label: "Safety",
    items: [
      { name: "Tempered Glass", slug: "tempered-glass" },
      { name: "Double Glazed Glass", slug: "double-glazed-glass" },
    ],
  },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [prodOpen, setProdOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const fn = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setProdOpen(false);
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <>
      {/* Announcement bar */}
      <div className="bg-navy py-2 text-center text-xs font-medium text-white/80">
        Best Architectural and Decorative Glass Company in Pakistan
      </div>

      {/* Main header */}
      <header className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${scrolled ? "shadow-md" : "border-b border-gray-100"}`}>
        <div className="container-luxe flex h-28 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <Image src="/images/logo.png" alt="New Toheed Glass" width={96} height={96}
                   className="h-20 w-20 shrink-0 object-contain" />
            <div className="leading-tight min-w-0">
              <p className="font-serif text-2xl font-extrabold text-navy leading-none truncate sm:text-[26px]">New Toheed Glass</p>
              <p className="mt-1 text-xs font-bold uppercase tracking-[0.18em] text-gold truncate">
                &amp; Accessories
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-1 md:flex">
            {[
              { href: "/", label: "HOME" },
            ].map((l) => (
              <Link key={l.href} href={l.href}
                    className="rounded px-4 py-2 text-sm font-semibold text-navy/80 transition hover:text-navy">
                {l.label}
              </Link>
            ))}

            {/* Products mega dropdown */}
            <div className="relative" ref={dropRef}>
              <button
                onMouseEnter={() => setProdOpen(true)}
                onClick={() => setProdOpen(!prodOpen)}
                className={`flex items-center gap-1 rounded px-4 py-2 text-sm font-semibold transition ${prodOpen ? "text-navy" : "text-navy/80 hover:text-navy"}`}>
                PRODUCTS <ChevronDown className={`h-4 w-4 transition-transform ${prodOpen ? "rotate-180" : ""}`} />
              </button>

              {prodOpen && (
                <div onMouseLeave={() => setProdOpen(false)}
                     className="absolute left-1/2 top-full z-50 mt-1 w-[820px] max-w-[92vw] -translate-x-1/2 rounded-xl border border-gray-100 bg-white shadow-hover">
                  <div className="grid grid-cols-4 divide-x divide-gray-100">
                    {categoryGroups.map((group) => (
                      <div key={group.key} className="p-4">
                        <Link href={`/products?category=${group.key}`}
                              onClick={() => setProdOpen(false)}
                              className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold hover:underline">
                          {group.label}
                        </Link>
                        {group.items.map((i) => (
                          <Link key={i.slug} href={`/products/${i.slug}`}
                                onClick={() => setProdOpen(false)}
                                className="block rounded py-1.5 px-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-navy">
                            {i.name}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-100 bg-gray-50 px-4 py-2 text-right">
                    <Link href="/products" onClick={() => setProdOpen(false)}
                          className="text-xs font-semibold text-navy hover:text-gold">
                      View all products →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {[
              { href: "/gallery",  label: "PROJECT REFERENCES" },
              { href: "/contact",  label: "CONTACT US" },
              { href: "/about",    label: "SERVICES" },
            ].map((l) => (
              <Link key={l.href} href={l.href}
                    className="rounded px-4 py-2 text-sm font-semibold text-navy/80 transition hover:text-navy">
                {l.label}
              </Link>
            ))}

            <Link href="/contact"
                  className="ml-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-light">
              Free Quote
            </Link>
          </nav>

          <button className="md:hidden" onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6 text-navy" /> : <Menu className="h-6 w-6 text-navy" />}
          </button>
        </div>

        {/* Mobile */}
        {open && (
          <div className="max-h-[calc(100vh-7rem)] overflow-y-auto border-t border-gray-100 bg-white md:hidden">
            <div className="container-luxe flex flex-col gap-1 py-4">
              <Link href="/" onClick={() => setOpen(false)} className="px-3 py-2 text-sm font-semibold text-navy">Home</Link>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-sm font-semibold text-navy">
                  Products <ChevronDown className="h-4 w-4 text-gold" />
                </summary>
                <div className="max-h-[60vh] overflow-y-auto bg-gray-50 px-4 py-3">
                  {categoryGroups.map((group) => (
                    <div key={group.key} className="mb-3">
                      <Link href={`/products?category=${group.key}`} onClick={() => setOpen(false)}
                            className="mb-1 block text-[10px] font-bold uppercase tracking-widest text-gold">
                        {group.label}
                      </Link>
                      {group.items.map((i) => (
                        <Link key={i.slug} href={`/products/${i.slug}`} onClick={() => setOpen(false)}
                              className="block py-1 pl-2 text-sm text-gray-600">{i.name}</Link>
                      ))}
                    </div>
                  ))}
                </div>
              </details>
              <Link href="/gallery"  onClick={() => setOpen(false)} className="px-3 py-2 text-sm font-semibold text-navy">Project References</Link>
              <Link href="/contact"  onClick={() => setOpen(false)} className="px-3 py-2 text-sm font-semibold text-navy">Contact Us</Link>
              <Link href="/about"    onClick={() => setOpen(false)} className="px-3 py-2 text-sm font-semibold text-navy">Services</Link>
              <div className="pt-2">
                <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary w-full justify-center">Get Free Quote</Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
