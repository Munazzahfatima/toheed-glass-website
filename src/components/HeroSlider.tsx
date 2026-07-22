"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MessageCircle, ArrowRight } from "lucide-react";
import { getWhatsappLink } from "@/lib/whatsapp";

const slides = [
  {
    eyebrow:  "Decorative Glass",
    title:    "Decorative LED\nSmart Mirrors",
    italic:   "Crafted With Precision",
    desc:     "Integrated LED lighting with customisable colour temperatures. Available in any size for bathrooms, salons, hotels and luxury interiors.",
    cta:      { label: "Order Online",   href: "/products/decorative-led-smart-mirror" },
    browse:   { label: "Browse Decorative Glass", href: "/products?category=DECORATIVE_GLASS" },
    badge:    "Order Available Online",
    image:    "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=900&q=85",
    imageAlt: "LED smart mirror in modern bathroom",
  },
  {
    eyebrow:  "Decorative Glass",
    title:    "Beveled Mirror\nWall Panels",
    italic:   "Available In Any Panel Size",
    desc:     "Premium handcrafted beveled mirror walls for hotels, villas and commercial spaces. Timeless elegance with fully custom dimensions.",
    cta:      { label: "Order Online",   href: "/products/decorative-beveled-mirror-wall" },
    browse:   { label: "View Mirror Walls", href: "/products?category=DECORATIVE_GLASS" },
    badge:    "Custom Panel Sizes",
    image:    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=900&q=85",
    imageAlt: "Decorative mirror feature wall in luxury interior",
  },
  {
    eyebrow:  "Architectural Glass",
    title:    "Glass Curtain Walls\n& Façades",
    italic:   "Strength Meets Elegance",
    desc:     "High-performance structural glass curtain wall systems for modern offices, hotels and corporate buildings across Pakistan.",
    cta:      { label: "Explore Solutions", href: "/products?category=ARCHITECTURAL_GLASS" },
    browse:   { label: "View Architectural Glass", href: "/products?category=ARCHITECTURAL_GLASS" },
    badge:    "Commercial & Residential",
    image:    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=85",
    imageAlt: "Modern glass curtain wall building facade",
  },
  {
    eyebrow:  "Architectural Glass",
    title:    "Glass Railings &\nShower Cabins",
    italic:   "Nationwide Professional Installation",
    desc:     "Frameless shower cabins, tempered glass railings, terrace balustrades and sleek office glass partitions — installed by experts.",
    cta:      { label: "Browse Products", href: "/products?category=ARCHITECTURAL_GLASS" },
    browse:   { label: "View All Products", href: "/products" },
    badge:    "Nationwide Coverage",
    image:    "https://images.unsplash.com/photo-1558618047-f4e80ccacd02?w=900&q=85",
    imageAlt: "Glass staircase railing in luxury villa",
  },
];

const wa = getWhatsappLink("Hi! I'd like a free consultation for glass solutions.");

export default function HeroSlider() {
  const [cur,    setCur]    = useState(0);
  const [fading, setFading] = useState(false);

  const go = useCallback((to: number) => {
    if (to === cur) return;
    setFading(true);
    setTimeout(() => { setCur(to); setFading(false); }, 280);
  }, [cur]);

  useEffect(() => {
    const t = setInterval(() => go((cur + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [cur, go]);

  const s = slides[cur];

  return (
    <section className="relative overflow-hidden bg-hero-gradient" style={{ minHeight: "92vh" }}>

      {/* ── Background image (full bleed, dimmed) ─── */}
      <div className={`absolute inset-0 transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}>
        <Image
          src={s.image}
          alt={s.imageAlt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-r from-navy-dark/95 via-navy/80 to-navy/40" />
      </div>

      {/* ── Dot grid texture ─── */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
           style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />

      {/* ── Content (left side) ─── */}
      <div className="container-luxe relative z-10 grid min-h-[92vh] items-center lg:grid-cols-2">

        {/* Left — text */}
        <div className={`py-24 transition-all duration-300 ${fading ? "opacity-0 translate-y-5" : "opacity-100 translate-y-0"}`}>

          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">{s.eyebrow}</span>
          </div>

          {/* Title */}
          <h1 className="mt-5 font-serif text-5xl font-bold leading-[1.08] text-white sm:text-6xl lg:text-[5rem]"
              style={{ whiteSpace: "pre-line" }}>
            {s.title}
          </h1>

          {/* Italic sub */}
          <p className="mt-3 font-serif text-xl italic text-gold/90">{s.italic}</p>

          {/* Divider */}
          <div className="mt-5 flex items-center gap-3">
            <span className="h-0.5 w-16 bg-gold" />
            <span className="h-0.5 w-5 bg-white/20" />
          </div>

          {/* Description */}
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/65">{s.desc}</p>

          {/* Badge */}
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-gold/25 bg-gold/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="text-xs font-medium text-gold/90">{s.badge}</span>
          </div>

          {/* Buttons */}
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href={s.cta.href} className="btn-gold group">
              {s.cta.label}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link href={s.browse.href} className="btn-white">
              {s.browse.label}
            </Link>
            <a href={wa} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/70 transition hover:border-[#25D366]/60 hover:bg-[#25D366]/10 hover:text-[#4ade80]">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>

        {/* Right — floating image card (desktop only) */}
        <div className={`hidden lg:flex items-center justify-center py-24 pl-12 transition-all duration-500 ${fading ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}>
          <div className="relative">
            {/* Main image */}
            <div className="relative h-[440px] w-[360px] overflow-hidden rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
              <Image
                src={s.image}
                alt={s.imageAlt}
                fill
                className="object-cover"
                sizes="360px"
                priority
              />
              {/* Subtle inner overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
            </div>

            {/* Gold border accent */}
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl border-2 border-gold/30 -z-10" />

            {/* Floating badge bottom-left */}
            <div className="absolute -bottom-5 -left-8 rounded-2xl bg-white px-5 py-4 shadow-hover">
              <p className="font-serif text-2xl font-bold text-navy">{s.eyebrow}</p>
              <p className="mt-0.5 text-xs text-navy/50">{s.badge}</p>
            </div>

            {/* Floating dot top-right */}
            <div className="absolute -right-4 -top-4 h-8 w-8 rounded-full bg-gold shadow-gold" />
          </div>
        </div>
      </div>

      {/* ── Slide navigation ─── */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4 lg:left-auto lg:translate-x-0" style={{ left: "calc(50% - 160px)" }}>
        <button onClick={() => go((cur - 1 + slides.length) % slides.length)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/50 transition hover:border-gold hover:text-gold"
                aria-label="Previous">
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => go(i)}
                    className={`rounded-full transition-all duration-500 ${
                      i === cur ? "h-2 w-10 bg-gold" : "h-2 w-2 bg-white/30 hover:bg-white/60"
                    }`}
                    aria-label={`Slide ${i + 1}`} />
          ))}
        </div>

        <button onClick={() => go((cur + 1) % slides.length)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/50 transition hover:border-gold hover:text-gold"
                aria-label="Next">
          <ChevronRight className="h-4 w-4" />
        </button>

        <span className="ml-2 font-serif text-sm italic text-white/30">
          {String(cur + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
        </span>
      </div>

      {/* ── Vertical slide numbers (right edge) ─── */}
      <div className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-5 md:flex">
        {slides.map((_, i) => (
          <button key={i} onClick={() => go(i)}
                  className={`text-xs font-semibold tabular-nums transition-all ${
                    i === cur ? "scale-125 text-gold" : "text-white/25 hover:text-white/60"
                  }`}>
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
    </section>
  );
}
