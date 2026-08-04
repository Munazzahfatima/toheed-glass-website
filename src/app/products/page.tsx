import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { MessageCircle } from "lucide-react";
import { getWhatsappLink } from "@/lib/whatsapp";

export const dynamic = "force-dynamic";
export const metadata = { title: "Products" };

const categories = [
  { value: "",             label: "All Products" },
  { value: "DECORATIVE",   label: "Decorative" },
  { value: "RESIDENTIAL",  label: "Residential" },
  { value: "COMMERCIAL",   label: "Commercial" },
  { value: "SAFETY",       label: "Safety" },
];

const ALLOWED_SLUGS = [
  "ceiling-glass",
  "texture-crystal-glass-door-panel",
  "texture-crystal-glass-window-panel",
  "decorative-beveled-mirror-wall",
  "decorative-led-smart-mirror",
  "frosted-glass",
  "shower-cabin",
  "skylight-glass",
  "single-glass-door",
  "stairs-glass-railing",
  "terrace-glass-railing",
  "acp-wall-cladding",
  "double-glazed-glass",
  "glass-curtain-wall",
  "glass-shop-front",
  "office-glass-partition",
  "tempered-glass",
];

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  const category = searchParams.category || "";

  const products = await prisma.product.findMany({
    where: {
      isActive: true,
      slug: { in: ALLOWED_SLUGS },
      ...(category ? { categories: { has: category as any } } : {}),
    },
    include: { images: { take: 1, orderBy: { sortOrder: "asc" } } },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  const categoryLabel = category ? categories.find((c) => c.value === category)?.label || "" : "";

  return (
    <>
      {/* Page Header */}
      <section className="bg-gray-50 py-12">
        <div className="container-luxe">
          <h1 className="font-serif text-4xl font-bold text-navy">
            {categoryLabel || "All Products"}
          </h1>
          {categoryLabel && (
            <nav className="mt-2 text-xs text-gray-400">
              <Link href="/" className="hover:text-gold">Home</Link>
              {" › "}
              <Link href="/products" className="hover:text-gold">Products</Link>
              {" › "}
              <span className="text-navy">{categoryLabel}</span>
            </nav>
          )}
        </div>
      </section>

      <section className="container-luxe py-10">
        {/* Tabs + count */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {categories.map((c) => (
              <Link
                key={c.value}
                href={c.value ? `/products?category=${c.value}` : "/products"}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                  category === c.value
                    ? "bg-navy text-white"
                    : "border border-gray-200 text-gray-600 hover:border-navy hover:text-navy"
                }`}
              >
                {c.label}
              </Link>
            ))}
          </div>
          <p className="text-sm text-gray-400">
            Showing {products.length} result{products.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Products Grid — 3 columns */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-gray-400">No products yet.</p>
              <a href={getWhatsappLink("Hi, I'd like to know about your glass products.")}
                 target="_blank" rel="noopener noreferrer"
                 className="btn-primary mt-6 inline-flex items-center gap-2">
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
          )}

          {products.map((p) => {
            const waLink = getWhatsappLink(
              `Hi, I'm interested in "${p.name}". Please share details and pricing.`
            );
            return (
              <div key={p.id} className="card-product group overflow-hidden">
                {/* Image — fixed height */}
                <Link href={`/products/${p.slug}`} className="relative block h-56 w-full overflow-hidden bg-gray-100">
                  {p.images[0] ? (
                    <Image
                      src={p.images[0].url}
                      alt={p.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-5xl">🪟</div>
                  )}
                  {p.isFeatured && (
                    <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white">
                      Featured
                    </span>
                  )}
                </Link>

                {/* Info */}
                <div className="p-4">
                  <Link href={`/products/${p.slug}`}>
                    <h3 className="font-serif text-base font-bold text-[#2563eb]">{p.name}</h3>
                  </Link>
                  <p className="mt-1 line-clamp-2 text-xs text-gray-500">{p.description}</p>

                  {/* Actions */}
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Link href={`/products/${p.slug}`}
                          className="flex-1 rounded bg-navy py-2 text-center text-xs font-semibold text-white hover:bg-navy-light">
                      Read More
                    </Link>
                    <a href={waLink} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-1.5 rounded bg-[#25D366] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1ebe5d]">
                      <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
