import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const metadata = { title: "Project References" };

export default async function GalleryPage() {
  const items = await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } });

  return (
    <section className="container-luxe py-20">
      <div className="mb-12 text-center">
        <span className="section-eyebrow">Portfolio</span>
        <h1 className="mt-3 text-4xl font-bold text-navy sm:text-5xl">Project References</h1>
        <p className="mx-auto mt-4 max-w-xl text-navy/60">
          A showcase of our completed decorative glass, architectural glass, and glass installation projects across Pakistan.
        </p>
      </div>

      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
        {items.length === 0 && <p className="text-center text-navy/50">Gallery items will appear here once uploaded by the admin.</p>}
        {items.map((g) => (
          <div key={g.id} className="relative break-inside-avoid overflow-hidden rounded-xl bg-navy/5 shadow-luxury">
            <Image src={g.imageUrl} alt={g.title} width={500} height={500} className="w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 bg-navy/70 p-3 text-xs text-white opacity-0 transition hover:opacity-100">
              {g.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
