"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Phone } from "lucide-react";

const productCategories = [
  { href: "/products?category=DECORATIVE_GLASS", label: "Decorative Glass" },
  { href: "/products?category=ARCHITECTURAL_GLASS", label: "Architectural Glass" },
  { href: "/products", label: "All Products" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function handler(e: MouseEvent) {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* Top contact strip */}
      <div className="bg-navy py-2">
        <div className="container-luxe flex items-center justify-between text-xs text-white/70">
          <span>Premium Glass Solutions Across Pakistan</span>
          <a href="tel:+923015025862" className="flex items-center gap-1.5 font-medium text-gold hover:text-gold-light">
            <Phone className="h-3 w-3" /> +92 301 502 5862
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-md" : "bg-white border-b border-gray-100"
      }`}>
        <div className="container-luxe flex h-18 items-center justify-between py-3">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="New Toheed Glass"
              width={50}
              height={50}
              className="h-12 w-12 object-contain"
            />
            <div>
              <p style={{ fontFamily: 'Raleway, sans-serif' }} className="text-base font-black uppercase tracking-tight text-navy leading-none">
                New Toheed Glass
              </p>
              <p className="text-[10px] font-medium tracking-[0.2em] text-gold uppercase">
                &amp; Accessories
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            <Link href="/" className="text-sm font-semibold uppercase tracking-wide text-gray-600 transition hover:text-gold">
              Home
            </Link>

            {/* Products dropdown */}
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className="flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-gray-600 transition hover:text-gold"
              >
                Products
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${dropOpen ? "rotate-180 text-gold" : ""}`} />
              </button>
              {dropOpen && (
                <div className="absolute left-0 top-full mt-3 w-52 bg-white shadow-xl border-t-2 border-gold">
                  {productCategories.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setDropOpen(false)}
                      className="block border-b border-gray-50 px-5 py-3 text-sm font-medium text-gray-700 transition hover:bg-gold/5 hover:text-gold hover:pl-7"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link href="/gallery" className="text-sm font-semibold uppercase tracking-wide text-gray-600 transition hover:text-gold">
              Projects
            </Link>

            <Link href="/about" className="text-sm font-semibold uppercase tracking-wide text-gray-600 transition hover:text-gold">
              About
            </Link>

            <Link href="/contact" className="text-sm font-semibold uppercase tracking-wide text-gray-600 transition hover:text-gold">
              Contact
            </Link>

            <Link href="/contact" className="btn-primary text-xs">
              Free Quote
            </Link>
          </nav>

          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X className="h-6 w-6 text-navy" /> : <Menu className="h-6 w-6 text-navy" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t-2 border-gold bg-white md:hidden">
            <div className="container-luxe flex flex-col py-4">
              <Link href="/" onClick={() => setOpen(false)} className="border-b border-gray-50 py-3 text-sm font-semibold uppercase tracking-wide text-gray-700">Home</Link>
              <div className="border-b border-gray-50 py-3">
                <p className="text-xs font-bold uppercase tracking-widest text-gold mb-2">Products</p>
                {productCategories.map((c) => (
                  <Link key={c.href} href={c.href} onClick={() => setOpen(false)} className="block py-1.5 pl-3 text-sm text-gray-600 hover:text-gold">
                    {c.label}
                  </Link>
                ))}
              </div>
              <Link href="/gallery" onClick={() => setOpen(false)} className="border-b border-gray-50 py-3 text-sm font-semibold uppercase tracking-wide text-gray-700">Projects</Link>
              <Link href="/about" onClick={() => setOpen(false)} className="border-b border-gray-50 py-3 text-sm font-semibold uppercase tracking-wide text-gray-700">About</Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="border-b border-gray-50 py-3 text-sm font-semibold uppercase tracking-wide text-gray-700">Contact</Link>
              <div className="pt-4">
                <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary w-fit">Get Free Quote</Link>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
