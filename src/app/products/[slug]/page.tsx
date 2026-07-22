import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import OrderWizard from "@/components/OrderWizard";
import { getWhatsappLink } from "@/lib/whatsapp";
import { MessageCircle, Phone, ArrowLeft, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await prisma.product.findUnique({ where: { slug: params.slug } });
  if (!product) return {};
  return {
    title: product.metaTitle || product.name,
    description: product.metaDesc || product.description,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: {
      images: { orderBy: { sortOrder: "asc" } },
      colors: { include: { color: true }, where: { color: { isActive: true } } },
    },
  });

  if (!product || !product.isActive) notFound();

  const settings = await prisma.settings.findUnique({ where: { id: "settings" } });

  const categoryLabel =
    product.category === "DECORATIVE_GLASS" ? "Decorative Glass" : "Architectural Glass";

  const categoryHref =
    product.category === "DECORATIVE_GLASS"
      ? "/products?category=DECORATIVE_GLASS"
      : "/products?category=ARCHITECTURAL_GLASS";

  const waLink = getWhatsappLink(
    `Hi, I'm interested in "${product.name}". Please share pricing and availability.`
  );

  // ── Checkout product ─────────────────────────────────────────────────────
  if (product.hasCheckout) {
    return (
      <section className="container-luxe py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-navy/50">
          <Link href="/" className="hover:text-gold">Home</Link>
          {" › "}
          <Link href={categoryHref} className="hover:text-gold">{categoryLabel}</Link>
          {" › "}
          <span className="font-medium text-navy">{product.name}</span>
        </nav>
        <OrderWizard
          product={{
            id: product.id,
            name: product.name,
            slug: product.slug,
            description: product.description,
            category: product.category,
            pricingType: product.pricingType,
            pricePerSqft: product.pricePerSqft ? Number(product.pricePerSqft) : null,
            fixedPrice: product.fixedPrice ? Number(product.fixedPrice) : null,
            fixedSize: product.fixedSize,
            shapes: product.shapes,
            images: product.images.map((i) => i.url),
            colors: product.colors.map((c) => ({
              id: c.color.id,
              name: c.color.name,
              hexPreview: c.color.hexPreview,
              previewImage: c.color.previewImage,
              description: c.color.description,
              extraCharge: Number(c.color.extraCharge),
            })),
          }}
          installationEnabled={settings?.installationEnabled ?? true}
          installationCharge={settings ? Number(settings.installationCharge) : 0}
        />
      </section>
    );
  }

  // ── Info-only product (Read More / Contact on WhatsApp) ─────────────────
  return (
    <>
      <section className="container-luxe py-16">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-xs text-navy/50">
          <Link href="/" className="hover:text-gold">Home</Link>
          {" › "}
          <Link href={categoryHref} className="hover:text-gold">{categoryLabel}</Link>
          {" › "}
          <span className="font-medium text-navy">{product.name}</span>
        </nav>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Images */}
          <div>
            <div className="relative aspect-square overflow-hidden rounded-3xl bg-navy/5 shadow-luxury">
              {product.images[0] ? (
                <Image
                  src={product.images[0].url}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-8xl">🪟</div>
              )}
            </div>
            {product.images.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {product.images.slice(1, 5).map((img, i) => (
                  <div
                    key={i}
                    className="relative aspect-square overflow-hidden rounded-xl bg-navy/5"
                  >
                    <Image
                      src={img.url}
                      alt={img.altText || `${product.name} ${i + 2}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <span className="section-eyebrow">{categoryLabel}</span>
            <h1 className="mt-3 font-serif text-3xl font-bold text-navy sm:text-4xl">
              {product.name}
            </h1>
            <div className="gold-divider mt-4" />

            <p className="mt-6 leading-relaxed text-navy/70">{product.description}</p>

            {/* Features */}
            <ul className="mt-8 space-y-2.5">
              {[
                "Available in custom panel sizes",
                "Suitable for residential & commercial projects",
                "Professional installation available",
                "Warranty-backed quality assurance",
                "Nationwide delivery across Pakistan",
              ].map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-navy/70">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-gold" />
                  {f}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-10 space-y-3">
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-3.5 text-sm font-semibold text-white transition hover:bg-[#1ebe5d]"
              >
                <MessageCircle className="h-5 w-5" />
                Contact on WhatsApp
              </a>
              <Link
                href="/contact"
                className="btn-secondary flex w-full items-center justify-center gap-2"
              >
                <Phone className="h-4 w-4" />
                Request a Free Quote
              </Link>
              <Link
                href={categoryHref}
                className="flex w-full items-center justify-center gap-2 text-sm text-navy/50 transition hover:text-navy"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to {categoryLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related / CTA */}
      <section className="bg-navy/[0.04] py-14">
        <div className="container-luxe text-center">
          <h2 className="text-2xl font-bold text-navy">Interested in This Product?</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-navy/60">
            Our team will provide you with a detailed quote and answer any questions about{" "}
            <span className="font-semibold text-navy">{product.name}</span>.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3 text-sm font-medium text-white transition hover:bg-[#1ebe5d]"
            >
              <MessageCircle className="h-4 w-4" />
              WhatsApp Us
            </a>
            <Link href="/contact" className="btn-primary">
              Get Free Quote
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
