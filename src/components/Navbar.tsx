"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const decorativeItems = [
  "Ceiling Glass","Texture Crystal Door Panel","Texture Crystal Window Panel",
  "Beveled Mirror Wall","LED Smart Mirror","Frosted Glass",
  "Original Stained Glass","Privacy Frosted Glass","Artistic Stained Glass",
];
const architecturalItems = [
  "ACP Wall Cladding","Double Glazed Glass","Glass Curtain Wall",
  "Glass Shop Front","Office Glass Partition","Shower Cabin",
  "Skylight Glass","Single Glass Door","Stairs Glass Railing",
  "Tempered Glass","Terrace Glass Railing",
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
        <div className="container-luxe flex h-20 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image src="/images/logo.png" alt="New Toheed Glass" width={52} height={52}
                   className="h-12 w-12 object-contain" />
            <div className="leading-tight">
              <p className="font-serif text-[17px] font-bold text-navy">New Toheed Glass</p>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-gold">
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
                     className="absolute left-0 top-full z-50 mt-1 w-[480px] rounded-xl border border-gray-100 bg-white shadow-hover">
                  <div className="grid grid-cols-2 divide-x divide-gray-100">
                    <div className="p-4">
                      <Link href="/products?category=DECORATIVE_GLASS"
                            onClick={() => setProdOpen(false)}
                            className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold hover:underline">
                        DECORATIVE GLASS
                      </Link>
                      {decorativeItems.map((i) => (
                        <Link key={i} href="/products?category=DECORATIVE_GLASS"
                              onClick={() => setProdOpen(false)}
                              className="block rounded py-1.5 px-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-navy">
                          {i}
                        </Link>
                      ))}
                    </div>
                    <div className="p-4">
                      <Link href="/products?category=ARCHITECTURAL_GLASS"
                            onClick={() => setProdOpen(false)}
                            className="mb-2 block text-xs font-bold uppercase tracking-widest text-gold hover:underline">
                        ARCHITECTURAL GLASS
                      </Link>
                      {architecturalItems.map((i) => (
                        <Link key={i} href="/products?category=ARCHITECTURAL_GLASS"
                              onClick={() => setProdOpen(false)}
                              className="block rounded py-1.5 px-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-navy">
                          {i}
                        </Link>
                      ))}
                    </div>
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
          <div className="border-t border-gray-100 bg-white md:hidden">
            <div className="container-luxe flex flex-col gap-1 py-4">
              <Link href="/" onClick={() => setOpen(false)} className="px-3 py-2 text-sm font-semibold text-navy">Home</Link>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between px-3 py-2 text-sm font-semibold text-navy">
                  Products <ChevronDown className="h-4 w-4 text-gold" />
                </summary>
                <div className="bg-gray-50 px-4 py-3">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-widest text-gold">Decorative Glass</p>
                  {decorativeItems.map((i) => (
                    <Link key={i} href="/products?category=DECORATIVE_GLASS" onClick={() => setOpen(false)}
                          className="block py-1 pl-2 text-sm text-gray-600">{i}</Link>
                  ))}
                  <p className="mb-1 mt-3 text-[10px] font-bold uppercase tracking-widest text-gold">Architectural Glass</p>
                  {architecturalItems.map((i) => (
                    <Link key={i} href="/products?category=ARCHITECTURAL_GLASS" onClick={() => setOpen(false)}
                          className="block py-1 pl-2 text-sm text-gray-600">{i}</Link>
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
