import Link from "next/link";
import Image from "next/image";
import {
  DoorOpen, ShowerHead, Sparkles, Building2, ShieldCheck, Layers,
  LayoutGrid, MessageCircle, Trophy, Users, Smile,
} from "lucide-react";
import { getWhatsappLink } from "@/lib/whatsapp";

const features = [
  { icon: DoorOpen,     title: "Windows & Doors",   desc: "Aluminium & Glass Windows and Doors" },
  { icon: ShowerHead,   title: "Shower Enclosures",  desc: "Frameless & Semi-Frameless Shower Cabins" },
  { icon: Sparkles,     title: "LED Smart Mirrors",  desc: "Modern LED Mirrors for Bathrooms & Bedrooms" },
  { icon: Building2,    title: "Office Partitions",  desc: "Glass Partitions for Offices & Commercial Spaces" },
  { icon: ShieldCheck,  title: "Tempered Glass",     desc: "High Strength & Safety Tempered Glass" },
  { icon: Layers,       title: "Glass Railings",     desc: "Staircase & Balcony Glass Railings" },
];

const stats = [
  { icon: Trophy, value: "2500+", label: "Projects Completed" },
  { icon: Users,  value: "20+",   label: "Years of Experience" },
  { icon: Smile,  value: "1000+", label: "Happy Customers" },
  { icon: ShieldCheck, value: "Warranty", label: "On Selected Products" },
];

const photos = [
  { src: "/images/shower-cabin.jpeg",           label: "Shower Enclosures" },
  { src: "/images/office-glass-partition.jpeg", label: "Office Partitions" },
  { src: "/images/glass-curtain-wall.jpeg",     label: "Aluminium Doors & Windows" },
  { src: "/images/stairs-glass-railing.jpeg",   label: "Glass Railings" },
  { src: "/images/acp-wall-cladding.jpeg",      label: "Shop Front Glass" },
  { src: "/images/led-mirror-luxury.jpeg",      label: "LED Smart Mirrors" },
];

export default function WhyChooseUs() {
  const wa = getWhatsappLink("Hi! I'd like a free consultation for glass solutions.");

  return (
    <section className="py-16 sm:py-20" style={{ background: "linear-gradient(135deg, #0f2447 0%, #1a3c6e 55%, #2a5298 100%)" }}>
      <div className="container-luxe">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          {/* Left — copy + feature grid + CTAs */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Premium Glass Solutions</p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl">
              Premium Glass Solutions for Homes &amp; Businesses
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/60">
              We design, manufacture and install high-quality glass products that bring
              elegance, functionality and value to your space.
            </p>

            {/* Feature cards */}
            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {features.map((f) => (
                <div key={f.title}
                     className="rounded-2xl border border-white/15 bg-white/[0.04] p-4 backdrop-blur-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-gold/40 bg-gold/10">
                    <f.icon className="h-5 w-5 text-gold" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-white">{f.title}</p>
                  <p className="mt-1 text-xs leading-snug text-white/50">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-navy transition hover:bg-white/90">
                <LayoutGrid className="h-4 w-4" /> View All Products
              </Link>
              <Link href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-6 py-3 text-sm font-semibold text-white transition hover:bg-gold-dark">
                <MessageCircle className="h-4 w-4" /> Get Free Quote
              </Link>
            </div>
          </div>

          {/* Right — photo collage */}
          <div className="grid grid-cols-2 gap-3">
            {photos.map((p, i) => (
              <div key={p.label}
                   className={`group relative overflow-hidden rounded-2xl bg-white/5 ${i < 2 ? "aspect-[4/3]" : "aspect-square"}`}>
                <Image src={p.src} alt={p.label} fill
                       className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                <span className="absolute bottom-2.5 left-2.5 rounded-md bg-navy/80 px-2.5 py-1 text-[11px] font-medium text-white backdrop-blur-sm">
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stat bar */}
        <div className="mt-14 grid grid-cols-2 gap-4 rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-sm sm:grid-cols-4 sm:gap-6">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <s.icon className="h-6 w-6 shrink-0 text-gold" />
              <div>
                <p className="font-serif text-xl font-bold text-white sm:text-2xl">{s.value}</p>
                <p className="text-xs text-white/50">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
