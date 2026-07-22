import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import {
  ShieldCheck, Star, MessageCircle, ArrowRight,
  Layers, Maximize2, Wrench, Award, Phone, CheckCircle2,
} from "lucide-react";
import { getWhatsappLink } from "@/lib/whatsapp";
import HeroSlider from "@/components/HeroSlider";

async function getFeatured() {
  try {
    return await prisma.product.findMany({
      where: { isActive: true, isFeatured: true },
      include: { images: { take: 1, orderBy: { sortOrder: "asc" } } },
      take: 8,
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
  const decorative    = featured.filter((p) => p.category === "DECORATIVE_GLASS");
  const architectural = featured.filter((p) => p.category === "ARCHITECTURAL_GLASS");

  return (
    <>
      <HeroSlider />

      {/* ── STATS ──────────────────────────────────── */}
      <section className="border-b border-slate-100 bg-white">
        <div className="container-luxe grid grid-cols-2 divide-x divide-slate-100 md:grid-cols-4">
          {[
            { value: "10+",  label: "Years of Excellence" },
            { value: "500+", label: "Projects Delivered" },
            { value: "20+",  label: "Glass Products" },
            { value: "100%", label: "Quality Guaranteed" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center py-7">
              <span className="text-3xl font-bold text-teal"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}>{s.value}</span>
              <span className="mt-1 text-xs font-medium text-slate-500">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── ABOUT ──────────────────────────────────── */}
      <section className="py-24">
        <div className="container-luxe grid items-center gap-16 lg:grid-cols-2">

          {/* Image panel */}
          <div className="relative">
            <div className="relative z-10 overflow-hidden rounded-3xl bg-navy shadow-lift">
              <Image src="/images/logo.png" alt="New Toheed Glass" width={600} height={450}
                     className="h-full w-full object-contain p-16" />
            </div>
            {/* Gold corner accent */}
            <div className="absolute -bottom-5 -right-5 h-40 w-40 rounded-3xl border-4 border-gold/40 -z-0" />
            {/* Teal corner accent */}
            <div className="absolute -top-5 -left-5 h-28 w-28 rounded-2xl border-4 border-teal/30 -z-0" />
            {/* Floating badge */}
            <div className="absolute bottom-8 left-0 z-20 -translate-x-6 rounded-2xl bg-white px-5 py-4 shadow-lift">
              <p className="text-2xl font-bold text-teal"
                 style={{ fontFamily: "Cormorant Garamond, serif" }}>10+</p>
              <p className="text-xs text-slate-500">Years in Glass</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <span className="section-eyebrow">Who We Are</span>
            <h2 className="mt-5 text-4xl font-bold leading-snug text-navy sm:text-5xl"
                style={{ fontFamily: "Cormorant Garamond, serif" }}>
              Pakistan's Trusted<br />
              <em className="not-italic text-teal">Glass Specialists</em>
            </h2>
            <div className="mt-5 flex items-center gap-3">
              <span className="gold-divider" />
            </div>
            <p className="mt-5 leading-relaxed text-slate-600">
              New Toheed Glass &amp; Accessories specialises in decorative and architectural glass
              solutions for residential, commercial, and corporate projects. From custom LED mirrors
              and artistic stained glass to curtain walls, shower cabins, and glass railings — we
              combine craftsmanship with modern design.
            </p>
            <ul className="mt-7 grid grid-cols-2 gap-3">
              {[
                { icon: ShieldCheck, text: "Certified Quality" },
                { icon: Layers,      text: "Custom Sizes" },
                { icon: Wrench,      text: "Expert Installation" },
                { icon: Award,       text: "Warranty Backed" },
              ].map((f) => (
                <li key={f.text} className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                  <f.icon className="h-5 w-5 flex-shrink-0 text-teal" />
                  {f.text}
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link href="/about"   className="btn-primary">Learn More</Link>
              <Link href="/contact" className="btn-secondary">Get Free Quote</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORIES ─────────────────────────────── */}
      <section className="bg-navy py-24">
        <div className="container-luxe">
          <div className="mb-14 flex flex-col items-center text-center">
            <span className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.3em] uppercase text-teal">
              <span className="h-px w-8 bg-teal/50" /> What We Offer
            </span>
            <h2 className="mt-4 text-4xl font-bold text-white sm:text-5xl"
                style={{ fontFamily: "Cormorant Garamond, serif" }}>
              Our Product Categories
            </h2>
            <p className="mt-3 max-w-xl text-sm text-white/50">
              Two specialised categories — each crafted to the highest standards of quality and design.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {[
              {
                icon: Layers,
                title: "Decorative Glass",
                desc: "Elegant glass designs that transform interiors — LED smart mirrors, beveled walls, stained glass, frosted panels and more.",
                items: ["LED Smart Mirrors", "Beveled Mirror Walls", "Stained & Artistic Glass", "Frosted & Ceiling Glass"],
                href: "/products?category=DECORATIVE_GLASS",
                accent: "teal",
              },
              {
                icon: Maximize2,
                title: "Architectural Glass",
                desc: "Structural glass systems for modern buildings — curtain walls, shop fronts, office partitions, railings and shower cabins.",
                items: ["Glass Curtain Walls", "Office Partitions", "Shower Cabins", "Stairs & Terrace Railings"],
                href: "/products?category=ARCHITECTURAL_GLASS",
                accent: "gold",
              },
            ].map((cat) => (
              <Link key={cat.title} href={cat.href}
                    className="group relative overflow-hidden rounded-3xl border border-white/5 bg-white/[0.04] p-8 backdrop-blur transition-all duration-300 hover:bg-white/[0.08] hover:border-white/10">
                {/* Accent glow */}
                <div className={`absolute -right-10 -top-10 h-40 w-40 rounded-full blur-2xl transition group-hover:scale-150 ${
                  cat.accent === "teal" ? "bg-teal/20" : "bg-gold/20"
                }`} />

                <div className={`relative z-10 inline-flex h-12 w-12 items-center justify-center rounded-2xl ${
                  cat.accent === "teal" ? "bg-teal/20" : "bg-gold/20"
                }`}>
                  <cat.icon className={`h-6 w-6 ${cat.accent === "teal" ? "text-teal-light" : "text-gold-light"}`} />
                </div>

                <h3 className="relative z-10 mt-5 text-2xl font-bold text-white"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}>{cat.title}</h3>
                <p className="relative z-10 mt-2 text-sm leading-relaxed text-white/55">{cat.desc}</p>

                <ul className="relative z-10 mt-5 space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-white/50">
                      <CheckCircle2 className={`h-4 w-4 flex-shrink-0 ${cat.accent === "teal" ? "text-teal/60" : "text-gold/60"}`} />
                      {item}
                    </li>
                  ))}
                </ul>

                <div className={`relative z-10 mt-7 flex items-center gap-2 text-sm font-semibold transition-all group-hover:gap-4 ${
                  cat.accent === "teal" ? "text-teal-light" : "text-gold-light"
                }`}>
                  Explore Products <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ──────────────────────── */}
      {featured.length > 0 && (
        <section className="py-24" style={{ background: "linear-gradient(180deg, #faf8f5 0%, #ffffff 100%)" }}>
          <div className="container-luxe">
            <div className="mb-14 text-center">
              <span className="section-eyebrow">Handpicked Selection</span>
              <h2 className="mt-4 text-4xl font-bold text-navy sm:text-5xl"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}>Featured Products</h2>
              <span className="mt-4 gold-divider mx-auto block" />
            </div>

            {decorative.length > 0 && (
              <div className="mb-12">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-5 w-0.5 rounded-full bg-teal" />
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Decorative Glass</h3>
                  </div>
                  <Link href="/products?category=DECORATIVE_GLASS"
                        className="flex items-center gap-1 text-sm font-semibold text-teal transition hover:gap-2">
                    View All <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {decorative.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            )}

            {architectural.length > 0 && (
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="h-5 w-0.5 rounded-full bg-gold" />
                    <h3 className="text-sm font-semibold uppercase tracking-widest text-slate-400">Architectural Glass</h3>
                  </div>
                  <Link href="/products?category=ARCHITECTURAL_GLASS"
                        className="flex items-center gap-1 text-sm font-semibold text-teal transition hover:gap-2">
                    View All <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                  {architectural.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── PROCESS ────────────────────────────────── */}
      <section className="bg-cream py-24">
        <div className="container-luxe">
          <div className="mb-14 text-center">
            <span className="section-eyebrow">How We Work</span>
            <h2 className="mt-4 text-4xl font-bold text-navy sm:text-5xl"
                style={{ fontFamily: "Cormorant Garamond, serif" }}>Our Simple Process</h2>
            <span className="mt-4 gold-divider mx-auto block" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { n: "01", title: "Consultation",      desc: "We discuss your vision, space dimensions and requirements in detail." },
              { n: "02", title: "Design & Quote",    desc: "Receive design mockups and a fully transparent, itemised quote." },
              { n: "03", title: "Fabrication",       desc: "Precision manufacturing using premium glass and top-quality materials." },
              { n: "04", title: "Install & Support", desc: "Professional installation with full after-sales warranty service." },
            ].map((s, i) => (
              <div key={s.n} className="card-luxe p-7">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-teal/20"
                        style={{ fontFamily: "Cormorant Garamond, serif" }}>{s.n}</span>
                  <span className="h-px flex-1 bg-slate-100" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-navy"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}>{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GALLERY ────────────────────────────────── */}
      {gallery.length > 0 && (
        <section className="py-24">
          <div className="container-luxe">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <span className="section-eyebrow">Portfolio</span>
                <h2 className="mt-4 text-4xl font-bold text-navy"
                    style={{ fontFamily: "Cormorant Garamond, serif" }}>Project References</h2>
                <span className="mt-4 gold-divider block" />
              </div>
              <Link href="/gallery"
                    className="hidden items-center gap-1 text-sm font-semibold text-teal transition hover:gap-2 sm:flex">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {gallery.map((g, i) => (
                <div key={g.id}
                     className={`group relative overflow-hidden rounded-2xl bg-slate-100 ${i === 0 ? "md:col-span-1 md:row-span-2" : ""}`}
                     style={{ aspectRatio: i === 0 ? "3/4" : "4/3" }}>
                  <Image src={g.imageUrl} alt={g.title} fill
                         className="object-cover transition duration-700 group-hover:scale-108" />
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-navy/60 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    <p className="text-sm font-semibold text-white">{g.title}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 text-center sm:hidden">
              <Link href="/gallery" className="btn-secondary">View All Projects</Link>
            </div>
          </div>
        </section>
      )}

      {/* ── TESTIMONIALS ───────────────────────────── */}
      <section className="bg-cream py-24">
        <div className="container-luxe">
          <div className="mb-14 text-center">
            <span className="section-eyebrow">Client Stories</span>
            <h2 className="mt-4 text-4xl font-bold text-navy sm:text-5xl"
                style={{ fontFamily: "Cormorant Garamond, serif" }}>What Our Clients Say</h2>
            <span className="mt-4 gold-divider mx-auto block" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Ms. Fatima",     city: "Islamabad", text: "New Toheed Glass transformed our commercial space with elegance and precision. The best glass company we have worked with." },
              { name: "Mr. Ahmed",      city: "Lahore",    text: "Our villa interiors look stunning with the decorative mirrors and glass partitions. Exceptional craftsmanship." },
              { name: "Raza Interiors", city: "Karachi",   text: "Reliable partner for all our hotel projects. Quality materials, transparent pricing and on-time delivery every time." },
            ].map((t) => (
              <div key={t.name} className="card-luxe p-7">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-gold text-gold" />
                  ))}
                </div>
                <p className="mt-4 text-sm italic leading-relaxed text-slate-600">&ldquo;{t.text}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3 border-t border-slate-100 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-teal/10 text-sm font-bold text-teal"
                       style={{ fontFamily: "Cormorant Garamond, serif" }}>
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-navy">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────── */}
      <section className="py-16">
        <div className="container-luxe">
          <div className="relative overflow-hidden rounded-3xl bg-navy px-8 py-16 text-center">
            {/* Glow effects */}
            <div className="absolute -left-20 top-1/2 h-60 w-60 -translate-y-1/2 rounded-full bg-teal/20 blur-3xl" />
            <div className="absolute -right-20 top-1/2 h-60 w-60 -translate-y-1/2 rounded-full bg-gold/15 blur-3xl" />

            <div className="relative z-10">
              <span className="inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.3em] uppercase text-teal">
                <span className="h-px w-8 bg-teal/50" /> Get In Touch
              </span>
              <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl"
                  style={{ fontFamily: "Cormorant Garamond, serif" }}>
                Ready to Transform Your Space?
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-white/55">
                Get a free consultation and quote from our glass experts. Professional installation available nationwide across Pakistan.
              </p>
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <Link href="/contact" className="btn-gold">Get Free Quote</Link>
                <a href={waLink} target="_blank" rel="noopener noreferrer"
                   className="inline-flex items-center gap-2 rounded-lg border border-[#25D366]/40 bg-[#25D366]/10 px-7 py-3.5 text-sm font-semibold text-[#4ade80] transition hover:bg-[#25D366] hover:text-white hover:border-transparent">
                  <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                </a>
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/40">
                <Phone className="h-3.5 w-3.5" />
                <a href="tel:+923015025862" className="hover:text-white transition">+92 301 502 5862</a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ── Product Card ─────────────────────────────────────────────────────────────
function ProductCard({ product }: {
  product: {
    id: string; name: string; slug: string; hasCheckout: boolean;
    images: { url: string; altText: string | null }[];
  };
}) {
  const waLink = getWhatsappLink(`Hi, I'm interested in "${product.name}". Please share pricing.`);
  return (
    <div className="card-luxe group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden bg-slate-50">
        {product.images[0] ? (
          <Image src={product.images[0].url} alt={product.images[0].altText || product.name}
                 fill className="object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">🪟</div>
        )}
        {product.hasCheckout && (
          <span className="absolute left-3 top-3 rounded-full bg-teal px-3 py-1 text-[10px] font-semibold text-white">
            Order Available
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-navy leading-snug text-sm"
            style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1rem" }}>
          {product.name}
        </h3>
        <div className="mt-3 flex gap-2">
          <Link href={`/products/${product.slug}`}
                className="flex-1 rounded-lg bg-slate-50 py-2 text-center text-xs font-semibold text-navy transition hover:bg-teal hover:text-white">
            View Details
          </Link>
          <a href={waLink} target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-1 rounded-lg bg-[#25D366]/10 px-3 py-2 text-xs font-semibold text-[#16a34a] transition hover:bg-[#25D366] hover:text-white">
            <MessageCircle className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
