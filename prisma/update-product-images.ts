import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const allowedCategoryMap: Record<string, ("DECORATIVE" | "RESIDENTIAL" | "COMMERCIAL" | "SAFETY")[]> = {
  "ceiling-glass": ["DECORATIVE"],
  "texture-crystal-glass-door-panel": ["DECORATIVE"],
  "texture-crystal-glass-window-panel": ["DECORATIVE"],
  "decorative-beveled-mirror-wall": ["DECORATIVE"],
  "decorative-led-smart-mirror": ["DECORATIVE"],
  "frosted-glass": ["DECORATIVE"],

  "shower-cabin": ["RESIDENTIAL"],
  "skylight-glass": ["RESIDENTIAL"],
  "single-glass-door": ["RESIDENTIAL"],
  "stairs-glass-railing": ["RESIDENTIAL"],
  "terrace-glass-railing": ["RESIDENTIAL"],

  "acp-wall-cladding": ["COMMERCIAL"],
  "double-glazed-glass": ["COMMERCIAL", "SAFETY"],
  "glass-curtain-wall": ["COMMERCIAL"],
  "glass-shop-front": ["COMMERCIAL"],
  "office-glass-partition": ["COMMERCIAL"],

  "tempered-glass": ["SAFETY"],
};

const productImages: Record<string, string[]> = {
  "ceiling-glass": [
    "/images/Ceiling glass.jpg",
  ],
  "texture-crystal-glass-door-panel": [
    "/images/Texture crystal glass door panel.jpeg",
  ],
  "texture-crystal-glass-window-panel": [
    "/images/Texture crystal glass window panel.jpeg",
  ],
  "decorative-beveled-mirror-wall": [
    "/images/Beveled mirror wall.jpeg",
  ],
  "decorative-led-smart-mirror": [
    "/images/Decorative LED smart mirror 1.jpeg",
    "/images/Decorative LED smart mirror 2.png",
  ],
  "frosted-glass": [
    "/images/Frosted glass.jpg",
  ],
  "shower-cabin": [
    "/images/Shower cabin 1.jpeg",
    "/images/Shower cabin 2.jpeg",
  ],
  "skylight-glass": [
    "/images/skylight glass.png",
    "/images/skylight glass 2.jpg",
  ],
  "single-glass-door": [
    "/images/single glass door.jpeg",
  ],
  "stairs-glass-railing": [
    "/images/Stairs glass railing 1.jpeg",
    "/images/Stairs glass railing 2.jpeg",
  ],
  "terrace-glass-railing": [
    "/images/Terrace glass railing.jpeg",
  ],
  "acp-wall-cladding": [
    "/images/ACP wall cladding 1.jpeg",
    "/images/ACP wall cladding 2.jpeg",
  ],
  "double-glazed-glass": [
    "/images/Double glazed glass 1.jpeg",
    "/images/Double glazed glass 2.jpeg",
  ],
  "glass-curtain-wall": [
    "/images/Glass curtain wall.jpeg",
  ],
  "glass-shop-front": [
    "/images/Office glass front.jpeg",
  ],
  "office-glass-partition": [
    "/images/Office glass partition 1.jpeg",
    "/images/Office glass partition 2.jpeg",
  ],
  "tempered-glass": [
    "/images/Tempered glass 1.jpeg",
    "/images/Tempered glass 2.jpeg",
  ],
};

async function main() {
  const allowedSlugs = Object.keys(allowedCategoryMap);

  // Delete any old products not in the 17 allowed products list
  const deleted = await prisma.product.deleteMany({
    where: {
      slug: {
        notIn: allowedSlugs,
      },
    },
  });
  console.log(`🗑️ Removed ${deleted.count} old products from database.`);

  let updated = 0;

  for (const slug of allowedSlugs) {
    const categories = allowedCategoryMap[slug];
    const urls = productImages[slug] || [];

    const product = await prisma.product.findUnique({ where: { slug } });
    if (!product) {
      console.log(`⚠️ Not found in DB: ${slug}`);
      continue;
    }

    // Ensure category mapping is up to date
    await prisma.product.update({
      where: { slug },
      data: { categories },
    });

    // Replace images with real photos
    await prisma.productImage.deleteMany({ where: { productId: product.id } });
    if (urls.length > 0) {
      await prisma.productImage.createMany({
        data: urls.map((url, i) => ({ productId: product.id, url, sortOrder: i })),
      });
    }
    console.log(`✅ ${slug} → [${categories.join(", ")}] → ${urls.length} images`);
    updated++;
  }

  // Replace gallery items with real project photos
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
  console.log(`✅ Products updated & cleaned: ${updated}`);
}

main().catch(console.error).finally(() => prisma.$disconnect());
