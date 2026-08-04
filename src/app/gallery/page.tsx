import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { syncAndGetProjects } from "@/lib/projects";
import InteractivePortfolio from "@/components/InteractivePortfolio";

export const metadata = { title: "Project References" };
export const revalidate = 60;

export default async function GalleryPage() {
  const fallbackProjects = syncAndGetProjects();
  let dbItems: any[] = [];
  try {
    dbItems = await prisma.galleryItem.findMany({ orderBy: { sortOrder: "asc" } });
  } catch (e) {
    dbItems = [];
  }

  const validDbItems = dbItems.filter(item => item.imageUrl && item.imageUrl.includes("/projects/"));
  const items = validDbItems.length > 0 ? validDbItems : fallbackProjects;

  return (
    <section className="container-luxe py-16">
      <div className="mb-12 text-center">
        <p className="section-tag">Portfolio</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-navy sm:text-5xl">Project References</h1>
        <div className="divider-blue" />
        <p className="mx-auto mt-4 max-w-xl text-sm text-gray-500">
          A showcase of our completed decorative glass, architectural glass, and glass installation projects across Pakistan.
        </p>
      </div>

      {items.length === 0 ? (
        <p className="text-center text-gray-400">No gallery items yet.</p>
      ) : (
        <InteractivePortfolio items={items} />
      )}

      {/* CTA */}
      <div className="mt-14 rounded-2xl bg-navy px-8 py-12 text-center">
        <h2 className="font-serif text-2xl font-bold text-white sm:text-3xl">
          Want a Similar Project?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm text-white/60">
          Contact us for a free consultation and quote tailored to your project.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-4">
          <Link href="/contact" className="btn-gold">Get Free Quote</Link>
          <Link href="/products" className="btn-secondary">Browse Products</Link>
        </div>
      </div>
    </section>
  );
}
