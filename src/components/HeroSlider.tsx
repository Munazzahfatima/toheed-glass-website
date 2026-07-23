"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { getWhatsappLink } from "@/lib/whatsapp";

const slides = [
  {
    tag:   "Decorative Glass",
    title: "Decorative LED Smart Mirror",
    sub:   "Also Known As LED SMART MIRROR",
    desc:  "Integrated LED lighting with customizable colors. Designed for modern bathrooms, salons, and luxury interiors. Available in any size.",
    cta:   { label: "Order Online",         href: "/products/decorative-led-smart-mirror" },
    view:  { label: "View Decorative Glass", href: "/products?category=DECORATIVE_GLASS" },
    img:   "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=1200&q=85",
  },
  {
    tag:   "Decorative Glass",
    title: "Beveled Mirror Wall Panels",
    sub:   "Available In Any Panel Size",
    desc:  "Premium beveled mirror walls crafted in custom panel sizes for hotels, homes and commercial spaces.",
    cta:   { label: "Order Online",         href: "/products/decorative-beveled-mirror-wall" },
    view:  { label: "View Mirror Walls",    href: "/products?category=DECORATIVE_GLASS" },
    img:   "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=85",
  },
  {
    tag:   "Architectural Glass",
    title: "Glass Curtain Walls & Façades",
    sub:   "High-Performance Structural Glass",
    desc:  "Structural glass curtain wall systems for office buildings and hotels across Pakistan.",
    cta:   { label: "Explore Solutions",       href: "/products?category=ARCHITECTURAL_GLASS" },
    view:  { label: "View Architectural Glass", href: "/products?category=ARCHITECTURAL_GLASS" },
    img:   "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=85",
  },
  {
    tag:   "Architectural Glass",
    title: "Stairs & Terrace Glass Railings",
    sub:   "Nationwide Professional Installation",
    desc:  "Frameless shower cabins, staircase railings, terrace balustrades and office glass partitions.",
    cta:   { label: "Browse Products",     href: "/products?category=ARCHITECTURAL_GLASS" },
    view:  { label: "View All Products",   href: "/products" },
    img:   "https://images.unsplash.com/photo-1558618047-f4e80ccacd02?w=1200&q=85",
  },
];

const wa = getWhatsappLink("Hi! I'd like a free consultation for glass solutions.");

export default function HeroSlider() {
  const [cur, setCur]     = useState(0);
  const [fading, setFading] = useState(false);

  const go = useCallback((to: number) => {
    if (to === cur) return;
    setFading(true);
    setTimeout(() => { setCur(to); setFading(false); }, 250);
  }, [cur]);

  useEffect(() => {
    const t = setInterval(() => go((cur + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [cur, go]);

  const s = slides[cur];

  return (
    <section className="relative overflow-hidden" style={{ minHeight: 520 }}>
      {/* Background image */}
      <div className={`absolute inset-0 transition-opacity duration-400 ${fading ? "opacity-0" : "opacity-100"}`}>
        <Image src={s.img} alt={s.title} fill className="object-cover" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/70 to-navy/30" />
      </div>

      {/* Content */}
      <div className="container-luxe relative z-10 flex min-h-[520px] items-center">
        <div className={`max-w-xl py-20 transition-all duration-250 ${fading ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"}`}>

          {/* Tag */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/15 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" />
            <span className="text-xs font-semibold uppercase tracking-widest text-gold">{s.tag}</span>
          </div>

          {/* Title */}
          <h1 className="font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            {s.title}
          </h1>
          <p className="mt-2 font-serif text-lg italic text-gold/80">{s.sub}</p>

          {/* Divider */}
          <div className="mt-5 h-0.5 w-16 rounded bg-gold" />

          {/* Desc */}
          <p className="mt-4 text-sm leading-relaxed text-white/65">{s.desc}</p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={s.cta.href} className="btn-gold">{s.cta.label}</Link>
            <Link href={s.view.href} className="btn-white">{s.view.label}</Link>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-wa">
              <MessageCircle className="h-4 w-4" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Prev/Next */}
      <button onClick={() => go((cur - 1 + slides.length) % slides.length)}
              className="absolute left-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white backdrop-blur transition hover:bg-black/40"
              aria-label="Previous">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button onClick={() => go((cur + 1) % slides.length)}
              className="absolute right-3 top-1/2 z-20 -translate-y-1/2 rounded-full bg-black/20 p-2 text-white backdrop-blur transition hover:bg-black/40"
              aria-label="Next">
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button key={i} onClick={() => go(i)}
                  className={`rounded-full transition-all duration-400 ${i === cur ? "h-2 w-8 bg-gold" : "h-2 w-2 bg-white/40 hover:bg-white/70"}`}
                  aria-label={`Slide ${i + 1}`} />
        ))}
      </div>
    </section>
  );
}
