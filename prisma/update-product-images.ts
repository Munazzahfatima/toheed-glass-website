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
    { title: "ACP Wall Cladding Project",        imageUrl: "/images/acp-wall-cladding.jpeg" },
    { title: "Decorative Beveled Mirror Wall",    imageUrl: "/images/beveled-mirror-wall.jpeg" },
    { title: "Glass Curtain Wall Installation",   imageUrl: "/images/glass-curtain-wall.jpeg" },
    { title: "Office Glass Partition",            imageUrl: "/images/office-glass-partition.jpeg" },
    { title: "Shower Cabin Installation",         imageUrl: "/images/shower-cabin.jpeg" },
    { title: "Stairs Glass Railing Project",      imageUrl: "/images/stairs-glass-railing.jpeg" },
    { title: "Tempered Glass Work",               imageUrl: "/images/tempered-glass.jpeg" },
    { title: "Terrace Glass Railing",             imageUrl: "/images/terrace-glass-railing.jpeg" },
    { title: "Texture Crystal Glass Door",        imageUrl: "/images/texture-crystal-door.jpeg" },
    { title: "Double Glazed Glass",               imageUrl: "/images/double-glazed-glass.jpeg" },
    { title: "Single Glass Door",                 imageUrl: "/images/single-glass-door.jpeg" },
    { title: "Skylight Glass Installation",       imageUrl: "/images/skylight-glass.png" },
  ];
  for (let i = 0; i < galleryItems.length; i++) {
    await prisma.galleryItem.create({ data: { ...galleryItems[i], sortOrder: i } });
  }

  console.log(`\n✅ Gallery: ${galleryItems.length} real project photos`);
  console.log(`✅ Products updated: ${updated}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
