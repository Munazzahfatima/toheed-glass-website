"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { getWhatsappLink } from "@/lib/whatsapp";

const slides = [
  {
    tag: "Decorative Glass",
    title: "LED Smart Mirrors",
    desc: "Integrated LED lighting with customizable colors. For modern bathrooms, salons and luxury interiors.",
    cta: { label: "View Mirrors", href: "/products?category=DECORATIVE_GLASS" },
    accent: "#D4A64A",
    number: "01",
  },
  {
    tag: "Decorative Glass",
    title: "Beveled Mirror Walls",
    desc: "Custom panel sizes for hotels, homes and commercial spaces. Timeless elegance, any dimension.",
    cta: { label: "Explore Designs", href: "/products?category=DECORATIVE_GLASS" },
    accent: "#D4A64A",
    number: "02",
  },
  {
    tag: "Architectural Glass",
    title: "Curtain Walls & Façades",
    desc: "Structural glass systems for office buildings and hotels. Strength meets architectural beauty.",
    cta: { label: "View Solutions", href: "/products?category=ARCHITECTURAL_GLASS" },
    accent: "#D4A64A",
    number: "03",
  },
  {
    tag: "Architectural Glass",
    title: "Glass Railings & Partitions",
    desc: "Frameless shower cabins, staircase railings, terrace balustrades and office partitions.",
    cta: { label: "See Products", href: "/products?category=ARCHITECTURAL_GLASS" },
    accent: "#D4A64A",
    number: "04",
  },
];

const waLink = getWhatsappLink("Hi, I'm interested in your glass solutions. Please contact me.");

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => goTo((current + 1) % slides.length), 5500);
    return () => clearInterval(timer);
  }, [current]);

  function goTo(n: number) {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => { setCurrent(n); setAnimating(false); }, 300);
  }

  const slide = slides[current];

  return (
    <section className="relative overflow-hidden bg-dark-glass" style={{ minHeight: "600px" }}>

      {/* Big background number */}
      <div
        className="absolute right-0 top-0 select-none pointer-events-none font-black text-white/[0.03] leading-none"
        style={{ fontFamily: "Raleway, sans-serif", fontSize: "30vw" }}
      >
        {slide.number}
      </div>

      {/* Left gold accent bar */}
      <div className="absolute left-0 top-0 h-full w-1.5 bg-gold" />

      {/* Content */}
      <div className="container-luxe relative z-10 flex min-h-[600px] items-center">
        <div className={`max-w-2xl py-24 transition-all duration-300 ${animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>

          {/* Tag */}
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-gold" />
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-gold">{slide.tag}</span>
          </div>

          {/* Title */}
          <h1
            className="mt-4 text-5xl font-black leading-none text-white sm:text-6xl lg:text-7xl"
            style={{ fontFamily: "Raleway, sans-serif" }}
          >
            {slide.title}
          </h1>

          {/* Gold underline */}
          <div className="mt-4 h-1 w-20 bg-gold" />

          {/* Description */}
          <p className="mt-6 max-w-lg text-base leading-relaxed text-white/60">
            {slide.desc}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href={slide.cta.href} className="btn-primary">
              {slide.cta.label}
            </Link>
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border-2 border-[#25D366] bg-[#25D366]/10 px-8 py-3 text-sm font-bold uppercase tracking-wide text-[#25D366] transition hover:bg-[#25D366] hover:text-white"
              style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 100%, 12px 100%)" }}
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Slide counter */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-6">
        <button onClick={() => goTo((current - 1 + slides.length) % slides.length)}
          className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/60 transition hover:border-gold hover:text-gold"
          aria-label="Previous"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {/* Dots */}
        <div className="flex items-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 ${i === current ? "h-2 w-8 bg-gold" : "h-2 w-2 bg-white/30 hover:bg-white/60"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        <button onClick={() => goTo((current + 1) % slides.length)}
          className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/60 transition hover:border-gold hover:text-gold"
          aria-label="Next"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>

      {/* Slide number top-right */}
      <div className="absolute right-8 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-center gap-3 md:flex">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`text-xs font-bold transition ${i === current ? "text-gold" : "text-white/25 hover:text-white/50"}`}
          >
            {String(i + 1).padStart(2, "0")}
          </button>
        ))}
      </div>
    </section>
  );
}
