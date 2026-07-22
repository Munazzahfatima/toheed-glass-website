import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import {
  ShieldCheck, Star, MessageCircle, ArrowRight,
  Layers, Maximize2, Wrench, Award, Phone, CheckCircle2, Sparkles, Truck,
} from "lucide-react";
import { getWhatsappLink } from "@/lib/whatsapp";
import HeroSlider from "@/components/HeroSlider";

/* ── Data fetching ─────────────────────────── */
async function getData() {
  try {
    const [decorative, architectural, gallery] = await Promise.all([
      prisma.product.findMany({
        where: { category: "DECORATIVE_GLASS", isActive: true, isFeatured: true },
        include: { images: { take: 1, orderBy: { sortOrder: "asc" } } },
        take: 4, orderBy: { sortOrder: "asc" },
      }),
      prisma.product.findMany({
        where: { category: "ARCHITECTURAL_GLASS", isActive: true, isFeatured: true },
        include: { images: { take: 1, orderBy: { sortOrder: "asc" } } },
        take: 4, orderBy: { sortOrder: "asc" },
      }),
      prisma.galleryItem.findMany({ take: 6, orderBy: { sortOrder: "asc" } }),
    ]);
    return { decorative, architectural, gallery };
  } catch { return { decorative: [], architectural: [], gallery: [] }; }
}

const wa = getWhatsappLink("Hi! I'd like a free consultation for glass solutions.");

/* ── Page ──────────────────────────────────── */
export default async function HomePage() {
  const { decorative, architectural, gallery } = await getData();

  return (
    <main>
      {/* ── 1. HERO ────────────────────────────── */}
      <HeroSlider />

      {/* ── 2. STATS BAR ───────────────────────── */}
      <section className="border-y border-navy/[0.07] bg-white">
        <div className="container-luxe grid grid-cols-2 divide-x divide-navy/[0.07] md:grid-cols-4">
          {[
            { n: "10+",  label: "Years of Excellence" },
            { n: "500+", label: "Projects Completed"  },
            { n: "20+",  label: "Glass Products"      },
            { n: "100%", label: "Quality Guaranteed"  },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center py-7">
              <span className="font-serif text-3xl font-bold text-navy">{s.n}</span>
              <span className="mt-1 text-center text-xs font-medium text-navy/50">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 3. ABOUT ───────────────────────────── */}
      <section className="py-24">
        <div className="container-luxe grid items-center gap-16 lg:grid-cols-2">

          {/* Left — image with decorative borders */}
          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-3xl bg-navy shadow-hover">
              <Image src="/images/logo.png" alt="New Toheed Glass" width={600} height={480}
                     className="h-full w-full object-contain p-16 opacity-90" />
            </div>
            {/* Gold corner */}
            <div className="absolute -bottom-5 -right-5 -z-10 h-44 w-44 rounded-3xl border-[3px] border-gold/40" />
            {/* Navy corner */}
            <div className="absolute -left-5 -top-5 -z-10 h-32 w-32 rounded-2xl border-[3px] border-navy/15" />
            {/* Floating badge */}
            <div className="absolute -left-6 bottom-10 z-20 rounded-2xl bg-white px-6 py-4 shadow-hover">
              <p className="font-serif text-3xl font-bold text-navy">10+</p>
              <p className="mt-0.5 text-xs text-navy/50">Years of Excellence</p>
            </div>
            {/* Gold dot accent */}
            <div className="absolute right-6 -top-3 z-20 h-6 w-6 rounded-full bg-gold shadow-gold" />
          </div>

          {/* Right — text */}
          <div>
            <span className="eyebrow">Who We Are</span>
            <h2 className="section-title mt-4">
              Pakistan's Trusted<br />
              <em className="not-italic text-gold">Glass Specialists</em>
            </h2>
            <span className="gold-divider mt-5 block" />
            <p className="mt-6 leading-relaxed text-navy/65">
              New Toheed Glass &amp; Accessories manufactures and supplies premium decorative and
              architectural glass solutions for residential, commercial, and corporate projects.
              From custom LED mirrors and artistic stained glass to curtain walls, shower cabins
              and glass railings — craftsmanship meets modern design.
            </p>
            <ul className="mt-7 grid grid-cols-2 gap-3">
              {[
                { icon: ShieldCheck, text: "Certified Quality"    },
                { icon: Layers,      text: "Custom Dimensions"   },
                { icon: Wrench,      text: "Expert Installation"  },
                { icon: Truck,       text: "Nationwide Delivery"  },
              ].map((f) => (
                <li key={f.text} className="flex items-center gap-2.5 text-sm font-medium text-navy/70">
                  <f.icon className="h-4 w-4 shrink-0 text-gold" /> {f.text}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/about"   className="btn-primary">About Us</Link>
              <Link href="/contact" className="btn-secondary">Get Free Quote</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. CATEGORIES ──────────────────────── */}
      <section className="bg-navy py-24">
        <div className="container-luxe">
          <div className="mb-14 text-center">
            <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
              <span className="h-px w-8 bg-gold" /> What We Offer
            </span>
            <h2 className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl">
              Our Product Categories
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-white/45">
              Two specialised categories — each crafted to the highest standards of quality and design.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Layers,
                title: "Decorative Glass",
                desc: "Elegant glass designs that transform interiors — LED smart mirrors, beveled mirror walls, stained glass, frosted panels and ceiling glass.",
                items: ["LED Smart Mirrors (Order Online)", "Beveled Mirror Wall Panels", "Stained & Artistic Glass", "Frosted, Ceiling & Crystal Glass"],
                href: "/products?category=DECORATIVE_GLASS",
              },
              {
                icon: Maximize2,
                title: "Architectural Glass",
                desc: "Structural glass systems for modern buildings — curtain walls, shop fronts, office partitions, railings and shower cabins.",
                items: ["Glass Curtain Walls & ACP Cladding", "Office Partitions & Shop Fronts", "Frameless Shower Cabins", "Stairs, Terrace & Glass Railings"],
                href: "/products?category=ARCHITECTURAL_GLASS",
              },
            ].map((cat, i) => (
              <Link key={cat.title} href={cat.href}
                    className="group relative overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.04] p-8 backdrop-blur-sm transition-all duration-300 hover:border-gold/20 hover:bg-white/[0.07]">
                {/* Glow blob */}
                <div className="absolute -right-10 -top-10 h-44 w-44 rounded-full bg-gold/10 blur-3xl transition-transform duration-500 group-hover:scale-150" />

                <div className="relative z-10 flex h-13 w-13 items-center justify-center rounded-2xl bg-gold/15 p-3">
                  <cat.icon className="h-6 w-6 text-gold" />
                </div>

                <h3 className="relative z-10 mt-5 font-serif text-2xl font-bold text-white">
                  {cat.title}
                </h3>
                <p className="relative z-10 mt-2 text-sm leading-relaxed text-white/50">{cat.desc}</p>

                <ul className="relative z-10 mt-5 space-y-2.5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-white/50">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-gold/60" /> {item}
                    </li>
                  ))}
                </ul>

                <div className="relative z-10 mt-8 flex items-center gap-2 text-sm font-semibold text-gold transition-all group-hover:gap-4">
                  Explore Products <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. WHY CHOOSE US ───────────────────── */}
      <section className="section-bg py-24">
        <div className="container-luxe">
          <div className="mb-14 text-center">
            <span className="eyebrow">Our Promise</span>
            <h2 className="section-title mt-4">Why Choose New Toheed Glass?</h2>
            <span className="gold-divider mx-auto mt-5 block" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Sparkles,    title: "Premium Materials",     desc: "Only the finest glass and materials used in every design and installation." },
              { icon: ShieldCheck, title: "Quality Assured",       desc: "Every product is inspected for finish, durability and precision before delivery." },
              { icon: Wrench,      title: "Custom Manufacturing",  desc: "Fully tailored designs, dimensions and finishes to perfectly fit your space." },
              { icon: Truck,       title: "Nationwide Coverage",   desc: "Safe delivery and professional installation across Pakistan." },
            ].map((f) => (
              <div key={f.title} className="card-luxe p-7 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10">
                  <f.icon className="h-7 w-7 text-gold" />
                </div>
                <h3 className="mt-5 font-serif text-lg font-semibold text-navy">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/55">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. DECORATIVE PRODUCTS ─────────────── */}
      {decorative.length > 0 && (
        <section className="py-24">
          <div className="container-luxe">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <span className="eyebrow">Decorative Glass</span>
                <h2 className="mt-3 font-serif text-3xl font-bold text-navy sm:text-4xl">Featured Designs</h2>
              </div>
              <Link href="/products?category=DECORATIVE_GLASS"
                    className="hidden items-center gap-1 text-sm font-semibold text-navy transition hover:text-gold sm:flex">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {decorative.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── 7. ARCHITECTURAL PRODUCTS ──────────── */}
      {architectural.length > 0 && (
        <section className="section-bg py-24">
          <div className="container-luxe">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <span className="eyebrow">Architectural Glass</span>
                <h2 className="mt-3 font-serif text-3xl font-bold text-navy sm:text-4xl">Featured Products</h2>
              </div>
              <Link href="/products?category=ARCHITECTURAL_GLASS"
                    className="hidden items-center gap-1 text-sm font-semibold text-navy transition hover:text-gold sm:flex">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {architectural.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ── 8. PROCESS ─────────────────────────── */}
      <section className="py-24">
        <div className="container-luxe">
          <div className="mb-14 text-center">
            <span className="eyebrow">How We Work</span>
            <h2 className="section-title mt-4">From Idea to Installation</h2>
            <span className="gold-divider mx-auto mt-5 block" />
          </div>
          <div className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Connecting dashed line */}
            <div className="absolute left-[12.5%] right-[12.5%] top-7 hidden h-px border-t border-dashed border-gold/30 lg:block" />
            {[
              { n: "01", title: "Consultation",      desc: "Share your vision, dimensions and requirements with our expert team." },
              { n: "02", title: "Design & Quote",    desc: "We prepare detailed mockups and a transparent itemised price quote." },
              { n: "03", title: "Fabrication",       desc: "Precision manufacturing using premium glass and the finest materials." },
              { n: "04", title: "Install & Support", desc: "Expert installation with full after-sales warranty service included." },
            ].map((s) => (
              <div key={s.n} className="card-luxe p-7">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold/30 bg-gold/[0.08]">
                  <span className="font-serif text-xl font-bold text-gold">{s.n}</span>
                </div>
                <h3 className="mt-5 font-serif text-lg font-semibold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/55">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. GALLERY ─────────────────────────── */}
      {gallery.length > 0 && (
        <section className="section-bg py-24">
          <div className="container-luxe">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <span className="eyebrow">Portfolio</span>
                <h2 className="mt-3 font-serif text-4xl font-bold text-navy">Project References</h2>
                <span className="gold-divider mt-4 block" />
              </div>
              <Link href="/gallery"
                    className="hidden items-center gap-1 text-sm font-semibold text-navy transition hover:text-gold sm:flex">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {gallery.map((g, i) => (
                <div key={g.id}
                     className={`group relative overflow-hidden rounded-2xl bg-navy/5 ${i === 0 ? "md:row-span-2" : ""}`}
                     style={{ aspectRatio: i === 0 ? "3/4" : "4/3" }}>
                  <Image src={g.imageUrl} alt={g.title} fill
                         className="object-cover transition duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 translate-y-2 p-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm font-semibold text-white">{g.title}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center sm:hidden">
              <Link href="/gallery" className="btn-secondary">View All Projects</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── 10. TESTIMONIALS ───────────────────── */}
      <section className="py-24">
        <div className="container-luxe">
          <div className="mb-14 text-center">
            <span className="eyebrow">Client Stories</span>
            <h2 className="section-title mt-4">What Our Clients Say</h2>
            <span className="gold-divider mx-auto mt-5 block" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Ms. Fatima",     city: "Islamabad", review: "New Toheed Glass transformed our commercial project with elegance and precision. Truly the best glass company we have worked with." },
              { name: "Mr. Ahmed",      city: "Lahore",    review: "Our villa interiors look stunning with the glass partitions and decorative mirrors. Exceptional craftsmanship throughout." },
              { name: "Raza Interiors", city: "Karachi",   review: "Reliable partner for all hotel projects. Quality materials, transparent pricing and on-time delivery every single time." },
            ].map((t, i) => (
              <div key={t.name}
                   className={`card-luxe p-7 ${i === 1 ? "md:-translate-y-4 md:shadow-hover" : ""}`}>
                <div className="flex gap-1">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="mt-4 text-sm italic leading-relaxed text-navy/65">"{t.review}"</p>
                <div className="mt-6 flex items-center gap-3 border-t border-navy/[0.07] pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-navy/[0.06] font-serif text-lg font-bold text-navy">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-navy">{t.name}</p>
                    <p className="text-xs text-navy/40">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. CTA ────────────────────────────── */}
      <section className="py-16">
        <div className="container-luxe">
          <div className="relative overflow-hidden rounded-3xl bg-navy px-8 py-16 text-center">
            {/* Glow effects */}
            <div className="pointer-events-none absolute -left-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl" />
            <div className="pointer-events-none absolute -right-24 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-navy-light/40 blur-3xl" />
            {/* Subtle dot grid */}
            <div className="pointer-events-none absolute inset-0 opacity-[0.04]"
                 style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,1) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">
                <span className="h-px w-8 bg-gold" /> Get In Touch Today
              </span>
              <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl">
                Ready to Transform Your Space?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/55">
                Get a free consultation and quote from our glass experts. Professional installation
                available nationwide across Pakistan.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn-gold">Get Free Quote</Link>
                <a href={wa} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-7 py-3.5 text-sm font-semibold text-[#4ade80] transition hover:bg-[#25D366] hover:text-white hover:border-transparent">
                  <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                </a>
              </div>
              <a href="tel:+923015025862"
                 className="mt-6 flex items-center justify-center gap-2 text-sm text-white/35 transition hover:text-white/70">
                <Phone className="h-3.5 w-3.5" /> +92 301 502 5862
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── Product Card ──────────────────────────── */
function ProductCard({ product }: {
  product: {
    id: string; name: string; slug: string; hasCheckout: boolean;
    images: { url: string; altText: string | null }[];
  };
}) {
  const wa = getWhatsappLink(`Hi, I'm interested in "${product.name}". Please share pricing.`);
  return (
    <div className="card-luxe group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-navy/[0.04]">
        {product.images[0] ? (
          <Image src={product.images[0].url} alt={product.images[0].altText || product.name}
                 fill className="object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">🪟</div>
        )}
        {product.hasCheckout && (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-[10px] font-semibold text-white shadow-gold">
            Order Online
          </span>
        )}
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-navy/0 transition duration-300 group-hover:bg-navy/10" />
      </div>
      <div className="p-5">
        <h3 className="font-serif text-base font-semibold text-navy leading-snug">
          {product.name}
        </h3>
        <div className="mt-4 flex gap-2">
          <Link href={`/products/${product.slug}`}
                className="flex-1 rounded-full bg-navy/[0.04] py-2 text-center text-xs font-semibold text-navy transition hover:bg-navy hover:text-white">
            View Details
          </Link>
          <a href={wa} target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-1 rounded-full bg-[#25D366]/10 px-3 py-2 text-xs font-semibold text-green-700 transition hover:bg-[#25D366] hover:text-white">
            <MessageCircle className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
