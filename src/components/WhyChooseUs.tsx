import Link from "next/link";
import Image from "next/image";
import {
  DoorOpen, Sparkles, Building2, ShieldCheck,
  LayoutGrid, MessageCircle, Trophy, Users, Smile,
} from "lucide-react";
import { getWhatsappLink } from "@/lib/whatsapp";

const features = [
  { icon: DoorOpen,    title: "Aluminium Windows & Doors", desc: "Custom Aluminium Windows & Doors" },
  { icon: Building2,   title: "Glass Curtain Walls",       desc: "Modern Glass Façade Systems for Commercial Buildings" },
  { icon: LayoutGrid,  title: "Office Glass Partitions",   desc: "Frameless Glass Partitions for Modern Workspaces" },
  { icon: Sparkles,    title: "LED Smart Mirrors",         desc: "Illuminated Smart Mirrors for Bathrooms & Interiors" },
];

const stats = [
  { icon: Trophy, value: "2500+", label: "Projects Completed" },
  { icon: Users,  value: "20+",   label: "Years of Experience" },
  { icon: Smile,  value: "1000+", label: "Happy Customers" },
  { icon: ShieldCheck, value: "Warranty", label: "On Selected Products" },
];

const photos = [
  { src: "/images/aluminium-windows-doors.png",       label: "Aluminium Windows & Doors" },
  { src: "/images/glass-curtain-walls-fb.png",        label: "Glass Curtain Walls" },
  { src: "/images/office-glass-partitions-fb.png",    label: "Office Glass Partitions" },
  { src: "/images/led-smart-mirrors-fb.png",          label: "LED Smart Mirrors" },
];

export default function WhyChooseUs() {
  const wa = getWhatsappLink("Hi! I'd like a free consultation for glass solutions.");

  return (
    <section className="py-20 sm:py-24" style={{ background: "linear-gradient(135deg, #0f2447 0%, #1a3c6e 55%, #2a5298 100%)" }}>
      <div className="container-luxe">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
          {/* Left — copy + feature grid + CTAs */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">Premium Glass Solutions</p>
            <h2 className="mt-3 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl">
              Premium Glass Solutions for Homes &amp; Businesses
            </h2>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/60">
              We design, manufacture and install high-quality glass products that bring
              elegance, functionality and value to your space.
            </p>

            {/* Feature cards */}
            <div className="mt-10 grid grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.title}
                     className="rounded-2xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-sm">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-gold/40 bg-gold/10">
                    <f.icon className="h-7 w-7 text-gold" />
                  </div>
                  <p className="mt-4 text-base font-bold text-white">{f.title}</p>
                  <p className="mt-1.5 text-sm leading-snug text-white/50">{f.desc}</p>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/products"
                    className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-base font-semibold text-navy transition hover:bg-white/90">
                <LayoutGrid className="h-5 w-5" /> View All Products
              </Link>
              <Link href="/contact"
                    className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3.5 text-base font-semibold text-white transition hover:bg-gold-dark">
                <MessageCircle className="h-5 w-5" /> Get Free Quote
              </Link>
            </div>
          </div>

          {/* Right — photo collage */}
          <div className="grid grid-cols-2 gap-4">
            {photos.map((p) => (
              <div key={p.label}
                   className="group relative h-52 overflow-hidden rounded-2xl bg-white/5 sm:h-64 lg:h-72">
                <Image src={p.src} alt={p.label} fill sizes="(min-width: 1024px) 25vw, 50vw"
                       className="object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 rounded-md bg-navy/80 px-3 py-1.5 text-sm font-medium text-white backdrop-blur-sm">
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stat bar */}
        <div className="mt-16 grid grid-cols-2 gap-5 rounded-2xl border border-white/15 bg-white/[0.04] p-7 backdrop-blur-sm sm:grid-cols-4 sm:gap-8">
          {stats.map((s) => (
            <div key={s.label} className="flex items-center gap-4">
              <s.icon className="h-8 w-8 shrink-0 text-gold" />
              <div>
                <p className="font-serif text-2xl font-bold text-white sm:text-3xl">{s.value}</p>
                <p className="text-sm text-white/50">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
