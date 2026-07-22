import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import {
  ShieldCheck, Star, MessageCircle, ArrowRight,
  Layers, Maximize2, Wrench, Award, Phone,
} from "lucide-react";
import { getWhatsappLink } from "@/lib/whatsapp";
import HeroSlider from "@/components/HeroSlider";

async function getFeatured() {
  try {
    return await prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      include: { images: { take: 1, orderBy: { sortOrder: "asc" } } },
      take: 6,
      orderBy: { sortOrder: "asc" },
    });
  } catch { return []; }
}

async function getGallery() {
  try {
    return await prisma.galleryItem.findMany({ take: 6, orderBy: { sortOrder: "asc" } });
  } catch { return []; }
}

const waLink = getWhatsappLink("Hi, I'd like a free consultation for glass solutions.");

export default async function HomePage() {
  const [featured, gallery] = await Promise.all([getFeatured(), getGallery()]);

  const decorative = featured.filter((p) => p.category === "DECORATIVE_GLASS");
  const architectural = featured.filter((p) => p.category === "ARCHITECTURAL_GLASS");

  return (
    <>
      {/* ── HERO ─────────────────────────────────────── */}
      <HeroSlider />

      {/* ── STATS STRIP ──────────────────────────────── */}
      <section className="bg-gold">
        <div className="container-luxe grid grid-cols-2 divide-x divide-gold-dark md:grid-cols-4">
          {[
            { value: "10+", label: "Years Experience" },
            { value: "500+", label: "Projects Completed" },
            { value: "20+", label: "Glass Products" },
            { value: "100%", label: "Quality Assured" },
          ].map((s) => (
            <div key={s.label} className="py-5 text-center">
              <p className="text-2xl font-black text-white" style={{ fontFamily: "Raleway, sans-serif" }}>{s.value}</p>
              <p className="mt-0.5 text-xs font-medium uppercase tracking-widest text-white/80">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT SPLIT ──────────────────────────────── */}
      <section className="container-luxe py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left — image stack */}
          <div className="relative">
            <div className="relative z-10 aspect-[4/3] overflow-hidden bg-navy/10">
              <Image src="/images/logo.png" alt="New Toheed Glass" fill className="object-contain p-16 bg-navy" />
            </div>
            {/* Decorative accent */}
            <div className="absolute -bottom-4 -right-4 h-32 w-32 border-4 border-gold" />
            <div className="absolute -top-4 -left-4 h-32 w-32 border-4 border-navy/20" />
          </div>

          {/* Right — text */}
          <div>
            <span className="section-eyebrow">Who We Are</span>
            <h2 className="mt-4 text-4xl font-black leading-tight text-navy" style={{ fontFamily: "Raleway, sans-serif" }}>
              Pakistan's Trusted Glass<br />
              <span className="text-gold">Specialists</span>
            </h2>
            <p className="mt-5 text-gray-600 leading-relaxed">
              New Toheed Glass &amp; Accessories delivers premium decorative and architectural glass
              solutions for residential, commercial, and corporate projects. From custom LED mirrors
              and stained glass to curtain walls and glass railings — we combine craftsmanship with
              modern design.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {[
                { icon: ShieldCheck, text: "Certified Quality" },
                { icon: Layers, text: "Custom Sizes" },
                { icon: Wrench, text: "Pro Installation" },
                { icon: Award, text: "Warranty Backed" },
              ].map((f) => (
                <div key={f.text} className="flex items-center gap-2.5 text-sm font-medium text-gray-700">
                  <f.icon className="h-5 w-5 flex-shrink-0 text-gold" />
                  {f.text}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/about" className="btn-primary">Discover More</Link>
              <Link href="/contact" className="btn-secondary">Get Free Quote</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ───────────────────────────────── */}
      <section className="bg-navy py-20">
        <div className="container-luxe">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] text-gold uppercase">
                <span className="block h-px w-8 bg-gold" /> What We Offer
              </span>
              <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl" style={{ fontFamily: "Raleway, sans-serif" }}>
                Our Product Categories
              </h2>
            </div>
            <Link href="/products" className="hidden text-sm font-bold text-gold hover:text-gold-light sm:flex items-center gap-1 uppercase tracking-wide">
              All Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Decorative Glass */}
            <Link href="/products?category=DECORATIVE_GLASS" className="group relative overflow-hidden bg-navy-light p-8 transition hover:bg-navy-dark">
              <div className="absolute right-0 top-0 h-full w-1 bg-gold transition group-hover:w-2" />
              <Layers className="h-10 w-10 text-gold" />
              <h3 className="mt-5 text-2xl font-black text-white" style={{ fontFamily: "Raleway, sans-serif" }}>Decorative Glass</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                LED smart mirrors, beveled mirror walls, stained glass, frosted glass, ceiling glass, and artistic glass designs.
              </p>
              <ul className="mt-4 space-y-1">
                {["LED Smart Mirrors", "Beveled Mirror Walls", "Stained & Frosted Glass", "Ceiling Glass"].map((i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-white/50">
                    <span className="h-1 w-1 rounded-full bg-gold" /> {i}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-2 text-sm font-bold text-gold uppercase tracking-wide">
                Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-2" />
              </div>
            </Link>

            {/* Architectural Glass */}
            <Link href="/products?category=ARCHITECTURAL_GLASS" className="group relative overflow-hidden bg-navy-light p-8 transition hover:bg-navy-dark">
              <div className="absolute right-0 top-0 h-full w-1 bg-gold transition group-hover:w-2" />
              <Maximize2 className="h-10 w-10 text-gold" />
              <h3 className="mt-5 text-2xl font-black text-white" style={{ fontFamily: "Raleway, sans-serif" }}>Architectural Glass</h3>
              <p className="mt-2 text-sm text-white/60 leading-relaxed">
                ACP cladding, curtain walls, shop fronts, office partitions, shower cabins, railings, skylights and tempered glass.
              </p>
              <ul className="mt-4 space-y-1">
                {["Glass Curtain Walls", "Office Partitions", "Shower Cabins", "Glass Railings"].map((i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-white/50">
                    <span className="h-1 w-1 rounded-full bg-gold" /> {i}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-2 text-sm font-bold text-gold uppercase tracking-wide">
                Explore <ArrowRight className="h-4 w-4 transition group-hover:translate-x-2" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ────────────────────────── */}
      {featured.length > 0 && (
        <section className="py-20">
          <div className="container-luxe">
            <div className="mb-12 text-center">
              <span className="section-eyebrow">Handpicked</span>
              <h2 className="mt-4 text-3xl font-black text-navy sm:text-4xl" style={{ fontFamily: "Raleway, sans-serif" }}>
                Featured Products
              </h2>
              <div className="gold-divider mx-auto mt-4" />
            </div>

            {/* Decorative products row */}
            {decorative.length > 0 && (
              <div className="mb-10">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-6 w-1 bg-gold" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-navy/60">Decorative Glass</h3>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {decorative.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            )}

            {/* Architectural products row */}
            {architectural.length > 0 && (
              <div>
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-6 w-1 bg-navy" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-navy/60">Architectural Glass</h3>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {architectural.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            )}

            <div className="mt-10 text-center">
              <Link href="/products" className="btn-secondary">Browse All Products</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── PROCESS ──────────────────────────────────── */}
      <section className="bg-[#f0f2f5] py-20">
        <div className="container-luxe">
          <div className="mb-14 text-center">
            <span className="section-eyebrow">Simple Steps</span>
            <h2 className="mt-4 text-3xl font-black text-navy sm:text-4xl" style={{ fontFamily: "Raleway, sans-serif" }}>
              How It Works
            </h2>
            <div className="gold-divider mx-auto mt-4" />
          </div>
          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Connecting line */}
            <div className="absolute top-10 left-0 right-0 hidden h-px bg-gold/30 lg:block" style={{ top: "2.5rem" }} />
            {[
              { n: "01", title: "Consultation", desc: "Tell us your project vision, space dimensions and requirements." },
              { n: "02", title: "Design & Quote", desc: "We prepare design mockups and transparent pricing for your approval." },
              { n: "03", title: "Fabrication", desc: "Precision manufacturing using premium glass and materials." },
              { n: "04", title: "Install & Support", desc: "Expert installation with after-sales warranty service." },
            ].map((s) => (
              <div key={s.n} className="relative bg-white p-6 shadow-card">
                {/* Step number badge */}
                <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center bg-gold font-black text-white text-lg" style={{ fontFamily: "Raleway, sans-serif", clipPath: "polygon(0 0, calc(100% - 8px) 0, 100% 100%, 8px 100%)" }}>
                  {s.n}
                </div>
                <h3 className="font-black text-navy text-base" style={{ fontFamily: "Raleway, sans-serif" }}>{s.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY STRIP ────────────────────────────── */}
      {gallery.length > 0 && (
        <section className="py-20">
          <div className="container-luxe">
            <div className="mb-10 flex items-end justify-between">
              <div>
                <span className="section-eyebrow">Our Work</span>
                <h2 className="mt-4 text-3xl font-black text-navy" style={{ fontFamily: "Raleway, sans-serif" }}>
                  Project References
                </h2>
              </div>
              <Link href="/gallery" className="hidden text-sm font-bold uppercase tracking-wide text-gold hover:text-gold-dark sm:flex items-center gap-1">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            {/* Masonry-style grid */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {gallery.slice(0, 6).map((g, i) => (
                <div
                  key={g.id}
                  className={`group relative overflow-hidden bg-navy/10 ${i === 0 ? "md:row-span-2" : ""}`}
                  style={{ aspectRatio: i === 0 ? "auto" : "4/3" }}
                >
                  <Image
                    src={g.imageUrl}
                    alt={g.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-navy/0 transition duration-300 group-hover:bg-navy/50" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                    <p className="text-sm font-bold text-white">{g.title}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center md:hidden">
              <Link href="/gallery" className="btn-secondary">View All Projects</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ─────────────────────────────── */}
      <section className="bg-navy py-20">
        <div className="container-luxe">
          <div className="mb-12 text-center">
            <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.3em] text-gold uppercase">
              <span className="block h-px w-8 bg-gold" /> Client Feedback
            </span>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl" style={{ fontFamily: "Raleway, sans-serif" }}>
              What Our Clients Say
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Ms. Fatima", city: "Islamabad", text: "New Toheed Glass transformed our commercial space with precision and elegance. Outstanding quality and service." },
              { name: "Mr. Ahmed", city: "Lahore", text: "The glass partitions and decorative mirrors made our villa interiors look stunning. Highly recommended." },
              { name: "Raza Interiors", city: "Karachi", text: "Our go-to partner for all glass installations. Professional team, on-time delivery and premium quality every time." },
            ].map((t) => (
              <div key={t.name} className="border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-sm italic leading-relaxed text-white/70">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
                  <div className="flex h-10 w-10 items-center justify-center bg-gold text-sm font-black text-white" style={{ fontFamily: "Raleway, sans-serif" }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-xs text-white/40">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────── */}
      <section className="py-20">
        <div className="container-luxe">
          <div className="relative overflow-hidden bg-gold px-8 py-16 text-center">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10" style={{
              backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.5) 20px, rgba(255,255,255,0.5) 21px)"
            }} />
            <div className="relative z-10">
              <h2 className="text-3xl font-black text-white sm:text-4xl" style={{ fontFamily: "Raleway, sans-serif" }}>
                Ready to Transform Your Space?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm text-white/80">
                Get a free consultation and quote from our glass experts. We cover all of Pakistan with professional installation.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-navy px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-navy-dark"
                  style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 100%, 12px 100%)" }}
                >
                  Get Free Quote
                </Link>
                <a
                  href={waLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-[#1ebe5d]"
                  style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 100%, 12px 100%)" }}
                >
                  <MessageCircle className="h-4 w-4" /> WhatsApp Us
                </a>
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/70">
                <Phone className="h-4 w-4" />
                <a href="tel:+923015025862" className="font-medium hover:text-white">+92 301 502 5862</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Product Card ────────────────────────────────────────────────────────────
function ProductCard({
  product,
}: {
  product: {
    id: string;
    name: string;
    slug: string;
    hasCheckout: boolean;
    images: { url: string; altText: string | null }[];
  };
}) {
  const waLink = getWhatsappLink(`Hi, I'm interested in "${product.name}". Please share pricing.`);

  return (
    <div className="group bg-white shadow-card overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {product.images[0] ? (
          <Image
            src={product.images[0].url}
            alt={product.images[0].altText || product.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl bg-navy/5">🪟</div>
        )}
        {product.hasCheckout && (
          <div className="absolute top-0 right-0 bg-gold px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">
            Order Now
          </div>
        )}
      </div>
      <div className="p-4 border-t-2 border-transparent group-hover:border-gold transition-all duration-300">
        <h3 className="font-black text-sm text-navy truncate" style={{ fontFamily: "Raleway, sans-serif" }}>
          {product.name}
        </h3>
        <div className="mt-3 flex gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="flex-1 bg-navy/5 py-1.5 text-center text-xs font-bold uppercase tracking-wide text-navy transition hover:bg-navy hover:text-white"
          >
            Details
          </Link>
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 bg-[#25D366] px-3 py-1.5 text-xs font-bold text-white transition hover:bg-[#1ebe5d]"
          >
            <MessageCircle className="h-3 w-3" />
          </a>
        </div>
      </div>
    </div>
  );
}
