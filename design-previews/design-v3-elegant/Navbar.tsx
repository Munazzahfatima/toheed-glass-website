"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, Phone, Mail } from "lucide-react";

const productCategories = [
  { href: "/products?category=DECORATIVE_GLASS",   label: "Decorative Glass",    desc: "Mirrors, stained glass, frosted & LED" },
  { href: "/products?category=ARCHITECTURAL_GLASS", label: "Architectural Glass", desc: "Curtain walls, railings, partitions" },
  { href: "/products",                               label: "All Products",         desc: "Browse complete catalogue" },
];

const navLinks = [
  { href: "/",       label: "Home" },
  { href: "/gallery", label: "Projects" },
  { href: "/about",  label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen]       = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) setDropOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      {/* ── Top info bar ────────────────────────── */}
      <div className="hidden bg-navy py-2 md:block">
        <div className="container-luxe flex items-center justify-between">
          <span className="text-xs text-white/50 tracking-wide">
            Pakistan's Premier Architectural &amp; Decorative Glass Specialists
          </span>
          <div className="flex items-center gap-6 text-xs text-white/60">
            <a href="tel:+923015025862" className="flex items-center gap-1.5 transition hover:text-gold">
              <Phone className="h-3 w-3 text-teal" /> +92 301 502 5862
            </a>
            <a href="mailto:mudassirchadhar789@gmail.com" className="flex items-center gap-1.5 transition hover:text-gold">
              <Mail className="h-3 w-3 text-teal" /> mudassirchadhar789@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* ── Main header ─────────────────────────── */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-soft"
          : "bg-white border-b border-slate-100"
      }`}>
        <div className="container-luxe flex h-20 items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="New Toheed Glass"
              width={52}
              height={52}
              className="h-12 w-12 object-contain transition group-hover:scale-105"
            />
            <div className="leading-tight">
              <p className="text-[17px] font-bold text-navy tracking-tight"
                 style={{ fontFamily: "Cormorant Garamond, serif", fontWeight: 700 }}>
                New Toheed Glass
              </p>
              <p className="text-[10px] font-semibold tracking-[0.25em] text-teal uppercase">
                &amp; Accessories
              </p>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.slice(0, 1).map((l) => (
              <Link key={l.href} href={l.href}
                className="text-sm font-medium text-slate-600 transition hover:text-teal">
                {l.label}
              </Link>
            ))}

            {/* Products dropdown */}
            <div className="relative" ref={dropRef}>
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className={`flex items-center gap-1 text-sm font-medium transition ${
                  dropOpen ? "text-teal" : "text-slate-600 hover:text-teal"
                }`}
              >
                Products
                <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${dropOpen ? "rotate-180" : ""}`} />
              </button>

              {dropOpen && (
                <div className="absolute left-0 top-full mt-3 w-64 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lift">
                  <div className="p-1">
                    {productCategories.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        onClick={() => setDropOpen(false)}
                        className="group flex flex-col rounded-xl px-4 py-3 transition hover:bg-teal/5"
                      >
                        <span className="text-sm font-semibold text-navy transition group-hover:text-teal">
                          {c.label}
                        </span>
                        <span className="mt-0.5 text-xs text-slate-400">{c.desc}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(1).map((l) => (
              <Link key={l.href} href={l.href}
                className="text-sm font-medium text-slate-600 transition hover:text-teal">
                {l.label}
              </Link>
            ))}

            <Link href="/contact" className="btn-primary text-sm">
              Free Quote
            </Link>
          </nav>

          {/* Mobile toggle */}
          <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Menu">
            {open
              ? <X    className="h-6 w-6 text-navy" />
              : <Menu className="h-6 w-6 text-navy" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <div className="border-t border-slate-100 bg-white md:hidden">
            <div className="container-luxe flex flex-col gap-1 py-5">
              <Link href="/"       onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-navy hover:bg-teal/5 hover:text-teal">Home</Link>
              <div className="rounded-lg bg-slate-50 px-3 py-3">
                <p className="mb-2 text-[10px] font-bold uppercase tracking-widest text-teal">Products</p>
                {productCategories.map((c) => (
                  <Link key={c.href} href={c.href} onClick={() => setOpen(false)}
                    className="block py-1.5 pl-3 text-sm text-slate-600 hover:text-teal">
                    {c.label}
                  </Link>
                ))}
              </div>
              <Link href="/gallery" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-navy hover:bg-teal/5 hover:text-teal">Projects</Link>
              <Link href="/about"   onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-navy hover:bg-teal/5 hover:text-teal">About</Link>
              <Link href="/contact" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2.5 text-sm font-medium text-navy hover:bg-teal/5 hover:text-teal">Contact</Link>
              <div className="pt-2">
                <Link href="/contact" onClick={() => setOpen(false)} className="btn-primary w-full justify-center">
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
