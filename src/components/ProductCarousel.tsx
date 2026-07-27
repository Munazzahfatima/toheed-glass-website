"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { getWhatsappLink } from "@/lib/whatsapp";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  hasCheckout: boolean;
  images: { url: string; altText: string | null }[];
};

export default function ProductCarousel({ products }: { products: Product[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate items for seamless loop
  const items = [...products, ...products, ...products];

  useEffect(() => {
    const track = trackRef.current;
    if (!track || isPaused) return;

    let pos = 0;
    const cardWidth = 220; // px — matches card width + gap
    const total = products.length * cardWidth;

    const step = () => {
      pos += 0.6; // speed — lower = slower
      if (pos >= total) pos = 0;
      track.style.transform = `translateX(-${pos}px)`;
    };

    const id = setInterval(step, 10);
    return () => clearInterval(id);
  }, [isPaused, products.length]);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Left fade */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-gradient-to-r from-white to-transparent" />
      {/* Right fade */}
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-gradient-to-l from-white to-transparent" />

      <div
        ref={trackRef}
        className="flex gap-4 will-change-transform"
        style={{ width: "max-content" }}
      >
        {items.map((p, i) => {
          const wa = getWhatsappLink(`Hi, I'm interested in "${p.name}". Please share pricing.`);
          return (
            <div
              key={`${p.id}-${i}`}
              className="w-[200px] shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition hover:shadow-md"
            >
              {/* Image */}
              <Link href={`/products/${p.slug}`}>
                <div className="relative h-36 w-full overflow-hidden bg-gray-50">
                  {p.images[0] ? (
                    <Image
                      src={p.images[0].url}
                      alt={p.name}
                      fill
                      className="object-cover transition duration-300 hover:scale-105"
                      sizes="200px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-3xl">🪟</div>
                  )}
                  {p.hasCheckout && (
                    <span className="absolute left-0 top-2 rounded-r-full bg-gold px-2.5 py-0.5 text-[9px] font-bold text-white">
                      Order
                    </span>
                  )}
                </div>
              </Link>

              {/* Info */}
              <div className="p-3">
                <Link href={`/products/${p.slug}`}>
                  <h3 className="line-clamp-2 text-xs font-bold leading-snug text-[#2563eb] hover:underline">
                    {p.name}
                  </h3>
                </Link>
                <div className="mt-2 flex gap-1.5">
                  <Link
                    href={`/products/${p.slug}`}
                    className="flex-1 rounded bg-navy py-1 text-center text-[10px] font-semibold text-white hover:bg-navy-light"
                  >
                    View
                  </Link>
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center rounded bg-[#25D366] px-2 py-1 text-[10px] text-white hover:bg-[#1ebe5d]"
                  >
                    <MessageCircle className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
