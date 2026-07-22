"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { getWhatsappLink } from "@/lib/whatsapp";

const slides = [
  {
    eyebrow: "Decorative Glass",
    title:   "Decorative\nLED Smart Mirrors",
    desc:    "Integrated LED lighting with customisable colour temperature. Designed for modern bathrooms, salons, and luxury interiors.",
    cta:     { label: "Explore Mirrors", href: "/products?category=DECORATIVE_GLASS" },
    tag:     "Order Online Available",
  },
  {
    eyebrow: "Decorative Glass",
    title:   "Beveled Mirror\nWall Panels",
    desc:    "Premium beveled mirror walls crafted in any panel size. A timeless statement for hotels, villas and commercial spaces.",
    cta:     { label: "View Mirror Walls", href: "/products?category=DECORATIVE_GLASS" },
    tag:     "Custom Panel Sizes",
  },
  {
    eyebrow: "Architectural Glass",
    title:   "Glass Curtain\nWalls & Façades",
    desc:    "Structural glass curtain wall systems for office buildings and hotels. Where strength meets architectural elegance.",
    cta:     { label: "View Architectural Glass", href: "/products?category=ARCHITECTURAL_GLASS" },
    tag:     "Commercial & Residential",
  },
  {
    eyebrow: "Architectural Glass",
    title:   "Railings,\nPartitions & Cabins",
    desc:    "Frameless shower cabins, staircase glass railings, terrace balustrades and sleek office glass partitions.",
    cta:     { label: "Browse Solutions", href: "/products?category=ARCHITECTURAL_GLASS" },
    tag:     "Nationwide Installation",
  },
];

const waLink = getWhatsappLink("Hi, I'd like a free consultation for glass solutions.");

export default function HeroSlider() {
  const [cur, setCur]       = useState(0);
  const [prev, setPrev]     = useState<number | null>(null);
  const [dir, setDir]       = useState<1 | -1>(1);

  const go = useCallback((to: number, direction: 1 | -1 = 1) => {
    setPrev(cur);
    setDir(direction);
    setCur(to);
  }, [cur]);

  useEffect(() => {
    const t = setInterval(() => go((cur + 1) % slides.length, 1), 5500);
    return () => clearInterval(t);
  }, [cur, go]);

  const slide = slides[cur];

  return (
    <section className="relative overflow-hidden" style={{ minHeight: 620, background: "linear-gradient(135deg, #061828 0%, #0a2540 50%, #0d3b3b 100%)" }}>

      {/* Subtle grid texture */}
      <div className="absolute inset-0 opacity-[0.03]"
           style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "60px 60px" }} />

      {/* Teal glow circle */}
      <div className="absolute -right-32 top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-teal/10 blur-3xl" />
      <div className="absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-gold/5 blur-3xl" />

      {/* Slide content */}
      <div className="container-luxe relative z-10 flex min-h-[620px] items-center">
        <div key={cur} className="max-w-2xl py-24 fade-up">

          {/* Tag pill */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal/30 bg-teal/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            <span className="text-xs font-semibold tracking-widest text-teal uppercase">{slide.eyebrow}</span>
          </div>

          {/* Heading */}
          <h1 className="text-5xl font-bold leading-[1.1] text-white sm:text-6xl lg:text-7xl"
              style={{ fontFamily: "Cormorant Garamond, serif", whiteSpace: "pre-line" }}>
            {slide.title}
          </h1>

          {/* Teal accent line */}
          <div className="mt-6 flex items-center gap-3">
            <span className="h-0.5 w-12 rounded-full bg-teal" />
            <span className="h-0.5 w-4 rounded-full bg-gold" />
          </div>

          {/* Description */}
          <p className="mt-5 max-w-lg text-base leading-relaxed text-white/60">{slide.desc}</p>

          {/* Feature tag */}
          <p className="mt-3 text-xs font-medium text-gold/80">{slide.tag}</p>

          {/* CTAs */}
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href={slide.cta.href} className="btn-primary">
              {slide.cta.label}
            </Link>
            <a href={waLink} target="_blank" rel="noopener noreferrer"
               className="inline-flex items-center gap-2 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 px-6 py-3.5 text-sm font-semibold text-[#4ade80] transition hover:bg-[#25D366] hover:text-white hover:border-transparent">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4">
        <button onClick={() => go((cur - 1 + slides.length) % slides.length, -1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 backdrop-blur transition hover:border-teal hover:text-teal"
          aria-label="Previous">
          <ChevronLeft className="h-4 w-4" />
        </button>

        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => go(i, i > cur ? 1 : -1)}
              className={`rounded-full transition-all duration-500 ${
                i === cur ? "w-8 h-2 bg-teal" : "w-2 h-2 bg-white/25 hover:bg-white/50"
              }`}
              aria-label={`Slide ${i + 1}`} />
          ))}
        </div>

        <button onClick={() => go((cur + 1) % slides.length, 1)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/50 backdrop-blur transition hover:border-teal hover:text-teal"
          aria-label="Next">
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Slide count */}
      <div className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex">
        {slides.map((_, i) => (
          <button key={i} onClick={() => go(i)}
            className={`text-xs font-bold tabular-nums transition-all ${
              i === cur ? "text-teal scale-125" : "text-white/25 hover:text-white/50"
            }`}>
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
    </section>
  );
}
