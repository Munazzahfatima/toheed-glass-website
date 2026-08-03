"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";

export interface ProjectItem {
  id: string;
  title: string;
  imageUrl: string;
  sortOrder?: number;
}

export default function InteractivePortfolio({
  items,
}: {
  items: ProjectItem[];
}) {
  const [expanded, setExpanded] = useState(false);

  const displayedItems = expanded ? items : items.slice(0, 6);

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
        {displayedItems.map((g, i) => (
          <div
            key={g.id || i}
            className="group relative aspect-square overflow-hidden rounded-xl bg-gray-100 shadow-sm transition-all duration-300 hover:shadow-md"
          >
            <Image
              src={g.imageUrl}
              alt={g.title}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/85 via-navy/20 to-transparent p-4 opacity-0 transition duration-300 group-hover:opacity-100">
              <p className="text-xs font-semibold text-white sm:text-sm">{g.title}</p>
            </div>
          </div>
        ))}
      </div>

      {items.length > 6 && (
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="btn-primary inline-flex items-center gap-2 px-8 py-3.5 text-sm font-semibold shadow-md transition hover:shadow-lg"
          >
            {expanded ? (
              <>
                Show Less <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                Show All Projects ({items.length}) <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
