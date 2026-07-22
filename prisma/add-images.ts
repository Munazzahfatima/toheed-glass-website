/**
 * Run with: npx tsx prisma/add-images.ts
 * Adds Unsplash images to existing products that have no images
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const productImages: Record<string, string[]> = {
  "decorative-led-smart-mirror": [
    "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  ],
  "decorative-beveled-mirror-wall": [
    "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
  ],
  "ceiling-glass": [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
  ],
  "texture-crystal-glass-door-panel": [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80",
  ],
  "texture-crystal-glass-window-panel": [
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
    "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=800&q=80",
  ],
  "frosted-glass": [
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
  ],
  "privacy-frosted-glass": [
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
    "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
  ],
  "original-stained-glass": [
    "https://images.unsplash.com/photo-1548263594-a71ea65a8598?w=800&q=80",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  ],
  "artistic-stained-glass": [
    "https://images.unsplash.com/photo-1533158388-350df1a4e5f5?w=800&q=80",
    "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80",
  ],
  "acp-wall-cladding": [
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=800&q=80",
  ],
  "double-glazed-glass": [
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  ],
  "glass-curtain-wall": [
    "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
    "https://images.unsplash.com/photo-1541976590-713941681591?w=800&q=80",
  ],
  "glass-shop-front": [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&q=80",
  ],
  "office-glass-partition": [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
  ],
  "shower-cabin": [
    "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
    "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
  ],
  "skylight-glass": [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
  ],
  "single-glass-door": [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80",
  ],
  "stairs-glass-railing": [
    "https://images.unsplash.com/photo-1558618047-f4e80ccacd02?w=800&q=80",
    "https://images.unsplash.com/photo-1600210491892-03d54730d505?w=800&q=80",
  ],
  "tempered-glass": [
    "https://images.unsplash.com/photo-1541976590-713941681591?w=800&q=80",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
  ],
  "terrace-glass-railing": [
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
    "https://images.unsplash.com/photo-1558618047-f4e80ccacd02?w=800&q=80",
  ],
};

const galleryItems = [
  { title: "Luxury Villa Staircase Glass Railing",   imageUrl: "https://images.unsplash.com/photo-1558618047-f4e80ccacd02?w=800&q=80" },
  { title: "Modern Office Glass Partition",          imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
  { title: "Hotel Lobby LED Mirror Installation",    imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80" },
  { title: "Commercial Glass Shop Front",            imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
  { title: "Artistic Stained Glass Window",          imageUrl: "https://images.unsplash.com/photo-1548263594-a71ea65a8598?w=800&q=80" },
  { title: "Frameless Shower Cabin Installation",    imageUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80" },
  { title: "Glass Curtain Wall Building Facade",     imageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80" },
  { title: "Terrace Glass Railing City View",        imageUrl: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80" },
  { title: "Frosted Glass Office Divider",           imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80" },
  { title: "Beveled Mirror Feature Wall",            imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" },
  { title: "ACP Cladding Modern Building",           imageUrl: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=800&q=80" },
  { title: "Skylight Glass Interior",                imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" },
];

async function main() {
  let updated = 0;
  let skipped = 0;

  // Add images to products
  for (const [slug, urls] of Object.entries(productImages)) {
    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) { console.log(`⚠️  Product not found: ${slug}`); skipped++; continue; }

    const existing = await prisma.productImage.count({ where: { productId: product.id } });
    if (existing > 0) { console.log(`⏭️  Already has images: ${slug}`); skipped++; continue; }

    await prisma.productImage.createMany({
      data: urls.map((url, i) => ({ productId: product.id, url, sortOrder: i })),
    });
    console.log(`✅ Images added: ${slug} (${urls.length} images)`);
    updated++;
  }

  // Add gallery items
  const galleryCount = await prisma.galleryItem.count();
  if (galleryCount === 0) {
    for (let i = 0; i < galleryItems.length; i++) {
      await prisma.galleryItem.create({ data: { ...galleryItems[i], sortOrder: i } });
    }
    console.log(`✅ Gallery: ${galleryItems.length} items added`);
  } else {
    console.log(`⏭️  Gallery already has ${galleryCount} items`);
  }

  console.log(`\nDone! Updated: ${updated}, Skipped: ${skipped}`);
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
