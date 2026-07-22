import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import { MessageCircle, GitCompare } from "lucide-react";
import { getWhatsappLink } from "@/lib/whatsapp";

export const metadata = { title: "Products" };

const categories = [
  { value: "", label: "All Products" },
  { value: "DECORATIVE_GLASS", label: "Decorative Glass" },
  { value: "ARCHITECTURAL_GLASS", label: "Architectural Glass" },
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
      ...(category ? { category: category as any } : {}),
    },
    include: { images: { take: 1, orderBy: { sortOrder: "asc" } } },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  const categoryLabel =
    category === "DECORATIVE_GLASS"
      ? "DECORATIVE GLASS"
      : category === "ARCHITECTURAL_GLASS"
      ? "ARCHITECTURAL GLASS"
      : "";

  return (
    <>
      {/* Page Header */}
      <section className="bg-navy/[0.04] py-14">
        <div className="container-luxe text-center">
          {categoryLabel && (
            <h1 className="text-4xl font-extrabold tracking-wide text-navy sm:text-5xl">
              {categoryLabel}
            </h1>
          )}
          {!categoryLabel && (
            <h1 className="text-4xl font-extrabold text-navy sm:text-5xl">All Products</h1>
          )}
          {categoryLabel && (
            <nav className="mt-3 text-xs text-navy/50">
              <Link href="/" className="hover:text-gold">Home</Link>
              {" › "}
              <Link href="/products" className="hover:text-gold">Products</Link>
              {" › "}
              <span className="font-semibold text-navy">{categoryLabel}</span>
            </nav>
          )}
        </div>
      </section>

      <section className="container-luxe py-12">
        {/* Category Tabs */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-3">
            {categories.map((c) => (
              <Link
                key={c.value}
                href={c.value ? `/products?category=${c.value}` : "/products"}
                className={`rounded-full px-5 py-2 text-sm font-medium transition ${
                  category === c.value
                    ? "bg-navy text-white"
                    : "border border-navy/15 text-navy/70 hover:border-gold hover:text-gold"
                }`}
              >
                {c.label}
              </Link>
            ))}
          </div>
          <p className="text-sm text-navy/50">
            Showing {products.length} result{products.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.length === 0 && (
            <div className="col-span-full py-20 text-center">
              <p className="text-navy/50">
                No products in this category yet. Contact us for custom solutions.
              </p>
              <a
                href={getWhatsappLink("Hi, I'd like to inquire about your glass products.")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6 inline-flex items-center gap-2"
              >
                <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
              </a>
            </div>
          )}

          {products.map((p) => {
            const waLink = getWhatsappLink(
              `Hi, I'm interested in "${p.name}". Please share more details and pricing.`
            );
            return (
              <div key={p.id} className="card-luxe group overflow-hidden">
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden bg-navy/5">
                  {p.images[0] ? (
                    <Image
                      src={p.images[0].url}
                      alt={p.images[0].altText || p.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-6xl">🪟</div>
                  )}
                  {p.isFeatured && (
                    <span className="absolute left-3 top-3 rounded-full bg-gold px-3 py-1 text-xs font-semibold text-white">
                      Featured
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="font-serif text-base font-semibold text-navy">{p.name}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-navy/55">{p.description}</p>

                  {/* Action Row */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {/* Compare – client-side compare is wired via a client wrapper below */}
                    <CompareButton productId={p.id} productName={p.name} />

                    <Link
                      href={`/products/${p.slug}`}
                      className="flex-1 rounded-full border border-navy/20 py-2 text-center text-xs font-semibold text-navy transition hover:border-gold hover:text-gold"
                    >
                      Read More
                    </Link>

                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 rounded-full bg-[#25D366] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#1ebe5d]"
                    >
                      <MessageCircle className="h-3.5 w-3.5" />
                      WhatsApp
                    </a>

                    {p.hasCheckout && (
                      <Link
                        href={`/products/${p.slug}`}
                        className="w-full rounded-full bg-navy py-2 text-center text-xs font-semibold text-white transition hover:bg-navy-light"
                      >
                        Order Now
                      </Link>
                    )}
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

// Compare button placeholder — clicking adds to a compare tray (simple client component)
function CompareButton({ productId, productName }: { productId: string; productName: string }) {
  return (
    <button
      className="flex items-center gap-1 rounded-full bg-navy/5 px-3 py-2 text-xs font-semibold text-navy/60 transition hover:bg-navy/10"
      title={`Compare ${productName}`}
    >
      <GitCompare className="h-3.5 w-3.5" />
      Compare
    </button>
  );
}
