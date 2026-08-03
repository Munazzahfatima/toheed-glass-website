/**
 * Run: npx tsx prisma/update-product-images.ts
 * Updates all products with client's real images
 */
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const productImages: Record<string, string[]> = {
  "decorative-led-smart-mirror": [
    "/images/glass-5.jpeg",
    "/images/glass-4.jpeg",
  ],
  "decorative-beveled-mirror-wall": [
    "/images/beveled-mirror-wall.jpeg",
    "/images/glass-5.jpeg",
  ],
  "ceiling-glass": [
    "/images/glass-3.jpeg",
    "/images/skylight-glass.png",
  ],
  "texture-crystal-glass-door-panel": [
    "/images/texture-crystal-door.jpeg",
    "/images/single-glass-door.jpeg",
  ],
  "texture-crystal-glass-window-panel": [
    "/images/texture-crystal-window.jpeg",
    "/images/texture-crystal-window-2.jpeg",
  ],
  "frosted-glass": [
    "/images/office-glass-partition.jpeg",
    "/images/texture-crystal-window.jpeg",
  ],
  "privacy-frosted-glass": [
    "/images/texture-crystal-window-2.jpeg",
    "/images/office-glass-partition-2.jpeg",
  ],
  "original-stained-glass": [
    "/images/glass-1.jpeg",
    "/images/glass-2.jpeg",
  ],
  "artistic-stained-glass": [
    "/images/glass-2.jpeg",
    "/images/glass-1.jpeg",
  ],
  "acp-wall-cladding": [
    "/images/acp-wall-cladding.jpeg",
    "/images/acp-wall-cladding-2.jpeg",
  ],
  "double-glazed-glass": [
    "/images/double-glazed-glass.jpeg",
    "/images/double-glazed-glass-2.jpeg",
  ],
  "glass-curtain-wall": [
    "/images/glass-curtain-wall.jpeg",
    "/images/acp-wall-cladding.jpeg",
  ],
  "glass-shop-front": [
    "/images/single-glass-door.jpeg",
    "/images/glass-curtain-wall.jpeg",
  ],
  "office-glass-partition": [
    "/images/office-glass-partition.jpeg",
    "/images/office-glass-partition-2.jpeg",
  ],
  "shower-cabin": [
    "/images/shower-cabin.jpeg",
    "/images/shower-cabin-2.jpeg",
  ],
  "skylight-glass": [
    "/images/skylight-glass.png",
    "/images/glass-curtain-wall.jpeg",
  ],
  "single-glass-door": [
    "/images/single-glass-door.jpeg",
    "/images/texture-crystal-door.jpeg",
  ],
  "stairs-glass-railing": [
    "/images/stairs-glass-railing.jpeg",
    "/images/stairs-glass-railing-2.jpeg",
  ],
  "tempered-glass": [
    "/images/tempered-glass.jpeg",
    "/images/tempered-glass-2.jpeg",
  ],
  "terrace-glass-railing": [
    "/images/terrace-glass-railing.jpeg",
    "/images/stairs-glass-railing.jpeg",
  ],
};

async function main() {
  let updated = 0;

  for (const [slug, urls] of Object.entries(productImages)) {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) { console.log(`⚠️  Not found: ${slug}`); continue; }

    // Replace images with client's real photos
    await prisma.productImage.deleteMany({ where: { productId: product.id } });
    await prisma.productImage.createMany({
      data: urls.map((url, i) => ({ productId: product.id, url, sortOrder: i })),
    });
    console.log(`✅ ${slug} → ${urls.length} images`);
    updated++;
  }

  // Replace gallery with client's real project photos
  await prisma.galleryItem.deleteMany({});
  const galleryItems = [
    { title: "ACP Wall Cladding Project",              imageUrl: "/projects/ACP%20wall%20claiding%20proj.jpg" },
    { title: "Decorative Beveled Mirror Wall",          imageUrl: "/projects/Beveled%20mirrors%20proj%201.jpeg" },
    { title: "Custom Beveled Mirror Wall",              imageUrl: "/projects/Beveled%20mirrors%20proj%202.jpeg" },
    { title: "Decorative Glass Door Panel",            imageUrl: "/projects/Decorative%20glass%20door%20pannel%20proj.jpg" },
    { title: "Frosted Glass Door Installation",        imageUrl: "/projects/Frosted%20glass%20door%20proj%201.jpeg" },
    { title: "Privacy Frosted Glass Door",             imageUrl: "/projects/Frosted%20glass%20door%20proj%202.jpeg" },
    { title: "LED Smart Mirror Installation",          imageUrl: "/projects/LED%20mirror%20proj%201.jpeg" },
    { title: "Backlit LED Mirror Installation",        imageUrl: "/projects/LED%20mirror%20proj%202.jpeg" },
    { title: "Luxury LED Smart Mirror",                imageUrl: "/projects/LED%20mirror%20proj%203.jpeg" },
    { title: "Frameless Shower Cabin",                 imageUrl: "/projects/shower%20cabin%20proj%201.jpeg" },
    { title: "Modern Shower Cabin Installation",       imageUrl: "/projects/shower%20cabin%20proj%202.jpeg" },
    { title: "Staircase Glass Railing",                imageUrl: "/projects/Stairs%20railing%20%20proj.jpg" },
    { title: "Texture Crystal Glass Panel",            imageUrl: "/projects/texture%20crestal%20glass%20proj.jpg" },
  ];
  for (let i = 0; i < galleryItems.length; i++) {
    await prisma.galleryItem.create({ data: { ...galleryItems[i], sortOrder: i } });
  }

  console.log(`\n✅ Gallery: ${galleryItems.length} real project photos`);
  console.log(`✅ Products updated: ${updated}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
