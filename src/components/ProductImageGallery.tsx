"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductImageGallery({
  images,
  title,
}: {
  images: string[];
  title: string;
}) {
  const [activeIdx, setActiveIdx] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-navy/5 shadow-luxury flex items-center justify-center text-8xl">
        🪟
      </div>
    );
  }

  const activeImage = images[activeIdx] || images[0];

  return (
    <div>
      {/* Main Image */}
      <div className="relative aspect-square overflow-hidden rounded-3xl bg-navy/5 shadow-luxury">
        <Image
          src={activeImage}
          alt={title}
          fill
          className="object-cover transition-opacity duration-300"
          priority
        />
      </div>

      {/* Thumbnails if 2 or more images exist */}
      {images.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActiveIdx(i)}
              className={`relative aspect-square overflow-hidden rounded-xl border-2 transition ${
                activeIdx === i
                  ? "border-gold scale-105 shadow-md"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${title} view ${i + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
