"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ChevronLeft, ChevronRight, MessageCircle,
  ShoppingCart, LayoutGrid, Gem, Lock, PenTool, ShieldCheck,
} from "lucide-react";
import { getWhatsappLink } from "@/lib/whatsapp";

type Slide = {
  tag:   string;
  title: string;
  sub:   string;
  desc:  string;
  cta:   { label: string; href: string };
  view:  { label: string; href: string };
  img:   string;
};

const slides: Slide[] = [
  {
    tag: "Decorative Glass", title: "Decorative LED Smart Mirror",
    sub: "Integrated, Colour-Adjustable LED Lighting",
    desc: "Integrated LED lighting with customizable color temperature. Perfect for modern bathrooms, salons, hotels, and luxury interiors. Available in any custom size.",
    cta: { label: "Order Online", href: "/products/decorative-led-smart-mirror" },
    view: { label: "View Decorative Glass", href: "/products?category=DECORATIVE" },
    img: "/images/led-mirror-luxury.jpeg",
  },
  {
    tag: "Decorative Glass", title: "Decorative LED Smart Mirror",
    sub: "Perfect For Bathrooms & Salons",
    desc: "Integrated LED lighting with customizable color temperature. Perfect for modern bathrooms, salons, hotels, and luxury interiors. Available in any custom size.",
    cta: { label: "Order Online", href: "/products/decorative-led-smart-mirror" },
    view: { label: "View Decorative Glass", href: "/products?category=DECORATIVE" },
    img: "/images/led-smart-mirrors-fb.png",
  },
  {
    tag: "Decorative Glass", title: "Beveled Mirror Wall Panels",
    sub: "Available In Any Panel Size",
    desc: "Premium beveled mirror wall panels available in any panel size. Ideal for feature walls in homes, hotels, restaurants, and commercial spaces.",
    cta: { label: "Order Online", href: "/products/decorative-beveled-mirror-wall" },
    view: { label: "View Mirror Walls", href: "/products?category=DECORATIVE" },
    img: "/images/beveled-mirror-wall.jpeg",
  },
  {
    tag: "Decorative Glass", title: "Beveled Mirror Wall Panels",
    sub: "A Statement Feature Wall",
    desc: "Premium beveled mirror wall panels available in any panel size. Ideal for feature walls in homes, hotels, restaurants, and commercial spaces.",
    cta: { label: "Order Online", href: "/products/decorative-beveled-mirror-wall" },
    view: { label: "View Mirror Walls", href: "/products?category=DECORATIVE" },
    img: "/images/beveled-mirror-luxury.png",
  },
  {
    tag: "Decorative Glass", title: "Texture Crystal Glass Door Panel",
    sub: "Privacy Meets Elegance",
    desc: "Textured crystal glass door panels combining privacy and elegance. Ideal for interior doors, room dividers, and feature installations.",
    cta: { label: "Order Online", href: "/products/texture-crystal-glass-door-panel" },
    view: { label: "View Decorative Glass", href: "/products?category=DECORATIVE" },
    img: "/images/texture-crystal-door.jpeg",
  },
  {
    tag: "Decorative Glass", title: "Texture Crystal Glass Window Panel",
    sub: "Diffused Natural Light",
    desc: "Crystal texture glass window panels offering privacy while allowing diffused natural light. Available in multiple texture patterns.",
    cta: { label: "Order Online", href: "/products/texture-crystal-glass-window-panel" },
    view: { label: "View Decorative Glass", href: "/products?category=DECORATIVE" },
    img: "/images/texture-crystal-window.jpeg",
  },
  {
    tag: "Decorative Glass", title: "Texture Crystal Glass Window Panel",
    sub: "Multiple Texture Patterns",
    desc: "Crystal texture glass window panels offering privacy while allowing diffused natural light. Available in multiple texture patterns.",
    cta: { label: "Order Online", href: "/products/texture-crystal-glass-window-panel" },
    view: { label: "View Decorative Glass", href: "/products?category=DECORATIVE" },
    img: "/images/texture-crystal-window-2.jpeg",
  },
  {
    tag: "Aluminium Systems", title: "Aluminium Windows & Doors",
    sub: "Custom-Built For Every Space",
    desc: "Custom aluminium windows and doors engineered for durability, smooth operation, and a clean modern look — built to your exact opening size.",
    cta: { label: "Get A Quote", href: "/products" },
    view: { label: "View All Products", href: "/products" },
    img: "/images/aluminium-windows-doors.png",
  },
  {
    tag: "Architectural Glass", title: "Glass Curtain Walls & Façades",
    sub: "High-Performance Structural Glass",
    desc: "Structural glass curtain wall systems for office buildings, hotels, and corporate headquarters. Combines aesthetics with structural performance.",
    cta: { label: "Explore Solutions", href: "/products/glass-curtain-wall" },
    view: { label: "View Architectural Glass", href: "/products?category=COMMERCIAL" },
    img: "/images/glass-curtain-wall.jpeg",
  },
  {
    tag: "Architectural Glass", title: "Glass Curtain Walls & Façades",
    sub: "Built For Commercial Landmarks",
    desc: "Structural glass curtain wall systems for office buildings, hotels, and corporate headquarters. Combines aesthetics with structural performance.",
    cta: { label: "Explore Solutions", href: "/products/glass-curtain-wall" },
    view: { label: "View Architectural Glass", href: "/products?category=COMMERCIAL" },
    img: "/images/glass-curtain-walls-fb.png",
  },
  {
    tag: "Commercial Glass", title: "Office Glass Partitions",
    sub: "Open, Professional Workspaces",
    desc: "Modern frameless and framed office glass partition systems. Create open, professional workspaces while maintaining privacy.",
    cta: { label: "Order Online", href: "/products/office-glass-partition" },
    view: { label: "View Commercial Glass", href: "/products?category=COMMERCIAL" },
    img: "/images/office-glass-partition.jpeg",
  },
  {
    tag: "Commercial Glass", title: "Office Glass Partitions",
    sub: "Frameless & Framed Options",
    desc: "Modern frameless and framed office glass partition systems. Create open, professional workspaces while maintaining privacy.",
    cta: { label: "Order Online", href: "/products/office-glass-partition" },
    view: { label: "View Commercial Glass", href: "/products?category=COMMERCIAL" },
    img: "/images/office-glass-partition-2.jpeg",
  },
  {
    tag: "Commercial Glass", title: "Office Glass Partitions",
    sub: "Built For Modern Offices",
    desc: "Modern frameless and framed office glass partition systems. Create open, professional workspaces while maintaining privacy.",
    cta: { label: "Order Online", href: "/products/office-glass-partition" },
    view: { label: "View Commercial Glass", href: "/products?category=COMMERCIAL" },
    img: "/images/office-glass-partitions-fb.png",
  },
  {
    tag: "Commercial Glass", title: "ACP Wall Cladding",
    sub: "Lightweight, Durable Façades",
    desc: "Aluminium Composite Panel (ACP) wall cladding for modern building façades. Lightweight, durable, and available in a wide range of colors and finishes.",
    cta: { label: "Order Online", href: "/products/acp-wall-cladding" },
    view: { label: "View Commercial Glass", href: "/products?category=COMMERCIAL" },
    img: "/images/acp-wall-cladding.jpeg",
  },
  {
    tag: "Commercial Glass", title: "ACP Wall Cladding",
    sub: "A Wide Range Of Finishes",
    desc: "Aluminium Composite Panel (ACP) wall cladding for modern building façades. Lightweight, durable, and available in a wide range of colors and finishes.",
    cta: { label: "Order Online", href: "/products/acp-wall-cladding" },
    view: { label: "View Commercial Glass", href: "/products?category=COMMERCIAL" },
    img: "/images/acp-wall-cladding-2.jpeg",
  },
  {
    tag: "Safety Glass", title: "Double Glazed Glass",
    sub: "Thermal & Acoustic Insulation",
    desc: "High-performance double glazed units for superior thermal and acoustic insulation. Ideal for residential, commercial, and industrial applications.",
    cta: { label: "Order Online", href: "/products/double-glazed-glass" },
    view: { label: "View Safety Glass", href: "/products?category=SAFETY" },
    img: "/images/double-glazed-glass.jpeg",
  },
  {
    tag: "Safety Glass", title: "Double Glazed Glass",
    sub: "Residential & Industrial Use",
    desc: "High-performance double glazed units for superior thermal and acoustic insulation. Ideal for residential, commercial, and industrial applications.",
    cta: { label: "Order Online", href: "/products/double-glazed-glass" },
    view: { label: "View Safety Glass", href: "/products?category=SAFETY" },
    img: "/images/double-glazed-glass-2.jpeg",
  },
  {
    tag: "Residential Glass", title: "Shower Cabin",
    sub: "Designed For Luxury Bathrooms",
    desc: "Custom frameless and semi-frameless shower cabins with tempered safety glass. Designed for luxury bathrooms.",
    cta: { label: "Order Online", href: "/products/shower-cabin" },
    view: { label: "View Residential Glass", href: "/products?category=RESIDENTIAL" },
    img: "/images/shower-cabin.jpeg",
  },
  {
    tag: "Residential Glass", title: "Shower Cabin",
    sub: "Frameless & Semi-Frameless",
    desc: "Custom frameless and semi-frameless shower cabins with tempered safety glass. Designed for luxury bathrooms.",
    cta: { label: "Order Online", href: "/products/shower-cabin" },
    view: { label: "View Residential Glass", href: "/products?category=RESIDENTIAL" },
    img: "/images/shower-cabin-2.jpeg",
  },
  {
    tag: "Residential Glass", title: "Single Glass Door",
    sub: "Tempered For Safety",
    desc: "Frameless and framed single glass doors for offices, homes, and commercial spaces. Tempered for safety.",
    cta: { label: "Order Online", href: "/products/single-glass-door" },
    view: { label: "View Residential Glass", href: "/products?category=RESIDENTIAL" },
    img: "/images/single-glass-door.jpeg",
  },
  {
    tag: "Residential Glass", title: "Skylight Glass",
    sub: "Flood Your Interiors With Light",
    desc: "Structural skylight glazing systems for residential and commercial roofs. Flood your interiors with natural light.",
    cta: { label: "Order Online", href: "/products/skylight-glass" },
    view: { label: "View Residential Glass", href: "/products?category=RESIDENTIAL" },
    img: "/images/skylight-glass.png",
  },
  {
    tag: "Residential Glass", title: "Stairs Glass Railing",
    sub: "Frameless & Semi-Frameless Designs",
    desc: "Elegant toughened glass staircase railings and balustrades. Available in frameless and semi-frameless designs.",
    cta: { label: "Order Online", href: "/products/stairs-glass-railing" },
    view: { label: "View Residential Glass", href: "/products?category=RESIDENTIAL" },
    img: "/images/stairs-glass-railing.jpeg",
  },
  {
    tag: "Residential Glass", title: "Stairs Glass Railing",
    sub: "Elegant Toughened Glass",
    desc: "Elegant toughened glass staircase railings and balustrades. Available in frameless and semi-frameless designs.",
    cta: { label: "Order Online", href: "/products/stairs-glass-railing" },
    view: { label: "View Residential Glass", href: "/products?category=RESIDENTIAL" },
    img: "/images/stairs-glass-railing-2.jpeg",
  },
  {
    tag: "Residential Glass", title: "Terrace Glass Railing",
    sub: "Unobstructed Views, Maximum Safety",
    desc: "Weather-resistant toughened glass terrace railings and balustrades. Provides unobstructed views with maximum safety.",
    cta: { label: "Order Online", href: "/products/terrace-glass-railing" },
    view: { label: "View Residential Glass", href: "/products?category=RESIDENTIAL" },
    img: "/images/terrace-glass-railing.jpeg",
  },
  {
    tag: "Safety Glass", title: "Tempered Glass",
    sub: "Four Times Stronger",
    desc: "Heat-treated tempered safety glass for doors, windows, partitions, and furniture. Four times stronger than standard glass.",
    cta: { label: "Order Online", href: "/products/tempered-glass" },
    view: { label: "View Safety Glass", href: "/products?category=SAFETY" },
    img: "/images/tempered-glass.jpeg",
  },
  {
    tag: "Safety Glass", title: "Tempered Glass",
    sub: "Heat-Treated For Safety",
    desc: "Heat-treated tempered safety glass for doors, windows, partitions, and furniture. Four times stronger than standard glass.",
    cta: { label: "Order Online", href: "/products/tempered-glass" },
    view: { label: "View Safety Glass", href: "/products?category=SAFETY" },
    img: "/images/tempered-glass-2.jpeg",
  },
];

const trustBadges = [
  { icon: Gem,         title: "Premium Quality",    desc: "High-grade crystal glass for lasting beauty" },
  { icon: Lock,        title: "Enhanced Privacy",   desc: "Textured designs ensure elegance with privacy" },
  { icon: PenTool,     title: "Custom Designs",     desc: "Wide range of patterns and customization" },
  { icon: ShieldCheck, title: "Durable & Reliable",  desc: "Built to last with strength and safety" },
];

const wa = getWhatsappLink("Hi! I'd like a free consultation for glass solutions.");
const AUTOPLAY_MS = 4500;

export default function HeroSlider() {
  const [cur, setCur]       = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  const go = useCallback((to: number) => {
    setCur(((to % total) + total) % total);
  }, [total]);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => go(cur + 1), AUTOPLAY_MS);
    return () => clearInterval(t);
  }, [cur, paused, go]);

  const s = slides[cur];

  return (
    <section
      className="relative overflow-hidden bg-[#f7f5f1]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* faint corner texture, matches the rest of the site's paper-like feel */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 38px, rgba(26,60,110,0.6) 38px, rgba(26,60,110,0.6) 39px)",
        }}
      />
      <div className="pointer-events-none absolute left-0 top-0 h-2 w-40 bg-gold sm:w-56" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />

      <div className="relative z-10 grid gap-10 pb-0 pt-10 lg:grid-cols-[1fr_1.15fr] lg:items-center lg:gap-0 lg:pt-14">

        {/* Left — text, crossfades per slide */}
        <div className="container-luxe relative lg:pr-10">
          {slides.map((slide, i) => (
            <div
              key={i}
              className={
                i === cur
                  ? "relative opacity-100 translate-y-0 transition-all duration-700 ease-out"
                  : "absolute inset-0 opacity-0 translate-y-3 pointer-events-none transition-all duration-700 ease-out"
              }
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-gold">{slide.tag}</p>

              <h1 className="mt-3 font-serif text-4xl font-bold leading-[1.1] text-navy sm:text-5xl lg:text-[3.4rem]">
                {slide.title}
              </h1>
              <p className="mt-3 font-serif text-xl italic text-gold">{slide.sub}</p>

              <div className="mt-5 h-1 w-16 rounded bg-gold" />

              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-gray-500">{slide.desc}</p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href={slide.cta.href}
                      className="inline-flex items-center gap-2 rounded-full bg-navy px-6 py-3.5 text-sm font-semibold text-white shadow-hover transition hover:bg-navy-light">
                  <ShoppingCart className="h-4 w-4" /> {slide.cta.label}
                </Link>
                <Link href={slide.view.href}
                      className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-navy transition hover:border-navy/30 hover:bg-gray-50">
                  <LayoutGrid className="h-4 w-4" /> {slide.view.label}
                </Link>
                <a href={wa} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-6 py-3.5 text-sm font-semibold text-navy transition hover:border-[#25D366]/40 hover:bg-gray-50">
                  <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Right — full-bleed angled photo panel */}
        <div className="relative h-[340px] w-full sm:h-[440px] lg:h-[560px]">
          {/* gold outline shape, slightly larger, sits behind the photo */}
          <div
            className="absolute inset-0 bg-gold"
            style={{ clipPath: "polygon(6% 0%, 100% 0%, 100% 100%, 6% 100%, 0% 50%)" }}
          />
          <div
            className="absolute inset-[3px] overflow-hidden bg-navy-dark sm:inset-1"
            style={{ clipPath: "polygon(7% 0%, 100% 0%, 100% 100%, 7% 100%, 1.2% 50%)" }}
          >
            {slides.map((slide, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${i === cur ? "opacity-100" : "opacity-0"}`}
              >
                <Image
                  src={slide.img}
                  alt={slide.title}
                  fill
                  priority={i === 0}
                  sizes="(min-width: 1024px) 55vw, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
          </div>

          {/* Slide counter */}
          <span className="absolute bottom-5 right-5 z-20 rounded-full border border-white/30 bg-black/30 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm sm:bottom-7 sm:right-8">
            {String(cur + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>

          {/* Prev / Next */}
          <button
            onClick={() => go(cur - 1)}
            className="absolute left-2 top-1/2 z-20 -translate-y-1/2 rounded-full bg-navy p-2.5 text-white shadow-hover transition hover:bg-navy-light sm:left-4"
            aria-label="Previous"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => go(cur + 1)}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-navy p-2.5 text-white shadow-hover transition hover:bg-navy-light sm:right-8"
            aria-label="Next"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Progress dots */}
      <div className="container-luxe relative z-10 mt-8 flex flex-wrap items-center justify-center gap-1.5 lg:mt-6">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => go(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === cur ? "w-8 bg-gold" : "w-1.5 bg-navy/15 hover:bg-navy/30"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Trust badges — floating card, overlaps into the section below */}
      <div className="container-luxe relative z-10 mt-10 lg:mt-8">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 rounded-2xl border border-gray-100 bg-white p-7 shadow-hover sm:grid-cols-4 sm:gap-8 sm:p-9">
          {trustBadges.map((b) => (
            <div key={b.title} className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy">
                <b.icon className="h-6 w-6 text-gold" />
              </div>
              <div>
                <p className="text-base font-bold text-navy">{b.title}</p>
                <p className="mt-1 text-sm leading-snug text-gray-500">{b.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pb-14 sm:pb-16" />
    </section>
  );
}
