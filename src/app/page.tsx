import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { MessageCircle, Star, Phone } from "lucide-react";
import { getWhatsappLink } from "@/lib/whatsapp";
import HeroSlider from "@/components/HeroSlider";

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
      prisma.galleryItem.findMany({ take: 8, orderBy: { sortOrder: "asc" } }),
    ]);
    return { decorative, architectural, gallery };
  } catch { return { decorative: [], architectural: [], gallery: [] }; }
}

const wa = getWhatsappLink("Hi! I'd like a free consultation for glass solutions.");

export default async function HomePage() {
  const { decorative, architectural, gallery } = await getData();

  return (
    <main>
      {/* 1 ── HERO SLIDER */}
      <HeroSlider />

      {/* 2 ── INTRO */}
      <section className="py-14 text-center">
        <div className="container-luxe">
          <h2 className="font-serif text-3xl font-bold text-navy sm:text-4xl">
            Best Architectural and Decorative Glass Company in Pakistan
          </h2>
          <div className="divider-blue" />
          <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-gray-600">
            Welcome to New Toheed Glass &amp; Accessories. We specialize in modern glass and aluminium
            solutions that combine functionality, durability, and elegance for residential, commercial,
            and corporate projects. From glass façades and partitions to shower cabins, mirrors,
            cladding, and custom decorative installations.
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-4">
            <Link href="/contact" className="btn-primary">Request a Free Quote</Link>
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-wa">
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 3 ── WHY CHOOSE US */}
      <section className="py-16" style={{ background: "linear-gradient(135deg, #1a3c6e 0%, #2a5298 100%)" }}>
        <div className="container-luxe grid items-center gap-12 lg:grid-cols-2">
          {/* Left — text + rounded feature cards */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Why Choose Us</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-white sm:text-4xl">
              Why Choose New Toheed Glass?
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              We combine decades of expertise with premium materials and modern techniques to deliver glass solutions that exceed expectations.
            </p>
            {/* Rounded feature pills */}
            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                { icon: "🏆", text: "Trusted manufacturer across Pakistan" },
                { icon: "⏱️", text: "10+ years of glass design experience" },
                { icon: "✅", text: "Certified quality & reliability" },
                { icon: "💰", text: "Transparent & warranty-backed pricing" },
                { icon: "🚚", text: "Nationwide service coverage" },
                { icon: "🔧", text: "Professional installation team" },
              ].map((item) => (
                <div key={item.text}
                     className="flex items-center gap-3 rounded-2xl bg-white/10 px-4 py-3 backdrop-blur-sm">
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm font-medium text-white/90">{item.text}</span>
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact"
                    className="rounded-full border-2 border-white px-7 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-navy">
                Get a Consultation
              </Link>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-wa">
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
          </div>
          {/* Right — image with rounded corners */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
              <Image
                src="https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=85"
                alt="Glass building architecture"
                width={600} height={450}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Floating stat badge */}
            <div className="absolute -bottom-5 -left-5 rounded-2xl bg-white px-6 py-4 shadow-hover">
              <p className="font-serif text-3xl font-bold text-navy">500+</p>
              <p className="text-xs text-gray-500">Projects Completed</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4 ── CORE SERVICES */}
      <section className="py-16">
        <div className="container-luxe">
          <div className="mb-12 text-center">
            <p className="section-tag">Popular Categories</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-navy sm:text-4xl">Our Core Services</h2>
            <div className="divider-blue" />
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Architectural Glass",
                items: ["Curtain Wall Glass & ACP Cladding", "Glass Façades & Shopfronts", "Skylights, Stairs & Railings"],
                href: "/products?category=ARCHITECTURAL_GLASS",
                icon: "https://images.unsplash.com/photo-1541976590-713941681591?w=200&q=80",
              },
              {
                title: "Decorative Glass Designs",
                items: ["Beveled Mirror Walls", "Stained & Frosted Glass", "LED Smart Mirrors"],
                href: "/products?category=DECORATIVE_GLASS",
                icon: "https://images.unsplash.com/photo-1548263594-a71ea65a8598?w=200&q=80",
              },
              {
                title: "Residential Glass",
                items: ["Frameless Shower Cabins", "Sliding & Folding Doors", "Staircase Railings"],
                href: "/products?category=ARCHITECTURAL_GLASS",
                icon: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=200&q=80",
              },
              {
                title: "Commercial Glass",
                items: ["Office Glass Partitions", "Atrium Glazing", "Decorative Wall Features"],
                href: "/products?category=ARCHITECTURAL_GLASS",
                icon: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&q=80",
              },
            ].map((s) => (
              <div key={s.title}
                   className="group flex flex-col items-center rounded-2xl border border-gray-100 bg-white px-6 pb-8 pt-6 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                {/* Circular icon image */}
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-gray-100 bg-gray-50 shadow-sm">
                  <Image src={s.icon} alt={s.title} fill className="object-cover" />
                </div>
                <h3 className="mt-5 font-serif text-base font-bold text-[#2563eb]">{s.title}</h3>
                <ul className="mt-3 flex-1 space-y-1.5">
                  {s.items.map((i) => (
                    <li key={i} className="text-sm text-gray-500">{i}</li>
                  ))}
                </ul>
                <Link href={s.href}
                      className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-[#2563eb] transition hover:gap-3 hover:text-navy">
                  LEARN MORE →
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-wa">
              <MessageCircle className="h-4 w-4" /> Chat Via WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* 5 ── DECORATIVE PRODUCTS */}
      {decorative.length > 0 && (
        <section className="section-bg py-14">
          <div className="container-luxe">
            <div className="mb-10 text-center">
              <p className="section-tag">Decorative Glass</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-navy">Featured Designs</h2>
              <div className="divider-blue" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {decorative.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="mt-8 text-center">
              <Link href="/products?category=DECORATIVE_GLASS" className="btn-primary">
                View All Decorative Glass
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 6 ── ARCHITECTURAL PRODUCTS */}
      {architectural.length > 0 && (
        <section className="py-14">
          <div className="container-luxe">
            <div className="mb-10 text-center">
              <p className="section-tag">Architectural Glass</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-navy">Featured Products</h2>
              <div className="divider-blue" />
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {architectural.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
            <div className="mt-8 text-center">
              <Link href="/products?category=ARCHITECTURAL_GLASS" className="btn-primary">
                View All Architectural Glass
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 7 ── PROCESS */}
      <section className="py-16" style={{ background: "#f0f4ff" }}>
        <div className="container-luxe">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-navy sm:text-4xl">Our Process</h2>
            <div className="divider-blue" />
          </div>

          {/* Row 1 — 3 cards */}
          <div className="grid gap-5 sm:grid-cols-3">
            {[
              {
                svg: (
                  <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" stroke="#1a3c6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="20" cy="20" r="8"/><circle cx="44" cy="20" r="8"/>
                    <path d="M4 52c0-8.837 7.163-16 16-16h24c8.837 0 16 7.163 16 16"/>
                    <path d="M32 28v8M28 36h8"/>
                  </svg>
                ),
                title: "Consultation",
                desc: "Understanding your project vision",
              },
              {
                svg: (
                  <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" stroke="#1a3c6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="8" y="8" width="48" height="36" rx="3"/>
                    <path d="M16 52h32M32 44v8"/>
                    <rect x="16" y="16" width="14" height="10" rx="1"/>
                    <rect x="34" y="16" width="14" height="4" rx="1"/>
                    <rect x="34" y="24" width="14" height="4" rx="1"/>
                    <path d="M16 32h32"/>
                  </svg>
                ),
                title: "Design & Mock-ups",
                desc: "Customized CAD drawings & proposals",
              },
              {
                svg: (
                  <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" stroke="#1a3c6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="12" y="8" width="40" height="48" rx="4"/>
                    <path d="M20 8v48M44 8v48M12 28h40M12 38h40"/>
                    <circle cx="32" cy="18" r="3"/>
                  </svg>
                ),
                title: "Fabrication",
                desc: "Precision cutting, tempering & finishing",
              },
            ].map((s) => (
              <div key={s.title}
                   className="relative flex flex-col items-center overflow-hidden rounded-2xl bg-white px-6 pb-8 pt-8 text-center shadow-sm"
                   style={{ backgroundImage: "radial-gradient(circle, #e8eeff 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
                {/* Lavender circle with icon */}
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e8eeff]">
                  {s.svg}
                </div>
                <h3 className="mt-5 font-serif text-base font-bold text-[#2563eb]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Row 2 — 2 cards centered */}
          <div className="mt-5 grid gap-5 sm:grid-cols-2 sm:px-24">
            {[
              {
                svg: (
                  <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" stroke="#1a3c6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="18" y="10" width="28" height="40" rx="2"/>
                    <path d="M32 10V6M26 58h12M32 50v8"/>
                    <circle cx="48" cy="18" r="8" fill="none"/>
                    <path d="M44 18l3 3 5-5"/>
                    <path d="M18 26H8M18 38H8"/>
                  </svg>
                ),
                title: "Installation",
                desc: "Expert installation with guaranteed quality",
              },
              {
                svg: (
                  <svg viewBox="0 0 64 64" className="h-10 w-10" fill="none" stroke="#1a3c6e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="32" cy="20" r="12"/>
                    <path d="M32 8v4M32 28v4M20 20h4M40 20h4"/>
                    <path d="M16 44c0-8.837 7.163-16 16-16s16 7.163 16 16"/>
                    <path d="M24 52h16M28 56h8"/>
                    <path d="M26 44l3 4 6-6"/>
                  </svg>
                ),
                title: "Support",
                desc: "After-sales service & warranty maintenance",
              },
            ].map((s) => (
              <div key={s.title}
                   className="relative flex flex-col items-center overflow-hidden rounded-2xl bg-white px-6 pb-8 pt-8 text-center shadow-sm"
                   style={{ backgroundImage: "radial-gradient(circle, #e8eeff 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#e8eeff]">
                  {s.svg}
                </div>
                <h3 className="mt-5 font-serif text-base font-bold text-[#2563eb]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 ── PROJECT GALLERY */}
      {gallery.length > 0 && (
        <section className="py-14">
          <div className="container-luxe">
            <div className="mb-10 text-center">
              <p className="section-tag">Portfolio</p>
              <h2 className="mt-2 font-serif text-3xl font-bold text-navy">Projects by New Toheed Glass</h2>
              <div className="divider-blue" />
              <div className="mx-auto mt-3 max-w-2xl text-sm text-gray-500">
                <p>Islamabad Corporate HQ – Curtain wall façade &amp; office partitions</p>
                <p>Karachi Luxury Hotel – Decorative media wall &amp; custom mirrors</p>
                <p>Lahore Villa – Frameless shower cabins &amp; staircase railing</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              {gallery.map((g) => (
                <div key={g.id} className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                  <Image src={g.imageUrl} alt={g.title} fill
                         className="object-cover transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/60 to-transparent p-3 opacity-0 transition group-hover:opacity-100">
                    <p className="text-xs font-medium text-white">{g.title}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link href="/gallery" className="btn-primary">View All Projects</Link>
            </div>
          </div>
        </section>
      )}

      {/* 9 ── TESTIMONIALS */}
      <section className="section-bg py-14">
        <div className="container-luxe">
          <div className="mb-12 text-center">
            <h2 className="font-serif text-3xl font-bold text-navy">What Clients Say</h2>
            <div className="divider-blue" />
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {[
              { name: "Ms. Fatima", city: "Islamabad", text: "New Toheed Glass is truly the best architectural and decorative glass company in Pakistan. Their team transformed our commercial project with elegance and precision." },
              { name: "Mr. Ahmed",  city: "Lahore",    text: "Our villa interiors look stunning with the glass partitions and decorative mirrors designed by New Toheed Glass. Highly recommended." },
            ].map((t) => (
              <div key={t.name} className="card-product p-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-gold text-gold" />)}
                </div>
                <p className="mt-3 text-sm italic text-gray-600">"{t.text}"</p>
                <div className="mt-4 border-t border-gray-100 pt-4">
                  <p className="font-semibold text-navy">{t.name}</p>
                  <p className="text-xs text-gray-400">{t.city}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 ── FINAL CTA */}
      <section className="py-14">
        <div className="container-luxe">
          <div className="rounded-2xl bg-navy px-8 py-14 text-center">
            <p className="text-xs font-semibold uppercase tracking-widest text-gold">Searching for the</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-white sm:text-4xl">
              Best Architectural and Decorative Glass Company in Pakistan?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-white/65">
              Choose New Toheed Glass for premium designs, professional installation, and long-lasting glass solutions.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn-secondary">Get a Free Consultation</Link>
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn-wa">
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
            <a href="tel:+923015025862"
               className="mt-5 flex items-center justify-center gap-1.5 text-sm text-white/40 transition hover:text-white/70">
              <Phone className="h-3.5 w-3.5" /> +92 301 502 5862
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── Product Card — matches competitor style exactly ── */
function ProductCard({ product }: {
  product: { id: string; name: string; slug: string; hasCheckout: boolean;
             images: { url: string; altText: string | null }[] };
}) {
  const wa = getWhatsappLink(`Hi, I'm interested in "${product.name}". Please share pricing.`);
  return (
    <div className="card-product group">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {product.images[0] ? (
          <Image src={product.images[0].url} alt={product.images[0].altText || product.name}
                 fill className="object-cover transition duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl">🪟</div>
        )}
        {product.hasCheckout && (
          <span className="absolute left-0 top-3 rounded-r-full bg-gold px-4 py-1 text-[10px] font-bold text-white">
            Order Online
          </span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-serif text-base font-semibold text-navy">{product.name}</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <button className="flex items-center gap-1 rounded border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-600 hover:border-navy hover:text-navy">
            Compare
          </button>
          <Link href={`/products/${product.slug}`}
                className="flex-1 rounded bg-navy py-1.5 text-center text-xs font-semibold text-white hover:bg-navy-light">
            Read More
          </Link>
          <a href={wa} target="_blank" rel="noopener noreferrer"
             className="flex items-center gap-1 rounded bg-[#25D366] px-3 py-1.5 text-xs font-semibold text-white hover:bg-[#1ebe5d]">
            <MessageCircle className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
