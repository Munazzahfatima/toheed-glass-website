import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// slug -> which of the 4 groups this product belongs to.
// (Double Glazed Glass intentionally sits in both Commercial and Safety.)
const categoryMap: Record<string, ("DECORATIVE" | "RESIDENTIAL" | "COMMERCIAL" | "SAFETY")[]> = {
  // Decorative
  "ceiling-glass": ["DECORATIVE"],
  "texture-crystal-glass-door-panel": ["DECORATIVE"],
  "texture-crystal-glass-window-panel": ["DECORATIVE"],
  "decorative-beveled-mirror-wall": ["DECORATIVE"],
  "decorative-led-smart-mirror": ["DECORATIVE"],
  "frosted-glass": ["DECORATIVE"],
  "privacy-frosted-glass": ["DECORATIVE"],
  "original-stained-glass": ["DECORATIVE"],
  "artistic-stained-glass": ["DECORATIVE"],

  // Residential
  "shower-cabin": ["RESIDENTIAL"],
  "skylight-glass": ["RESIDENTIAL"],
  "single-glass-door": ["RESIDENTIAL"],
  "stairs-glass-railing": ["RESIDENTIAL"],
  "terrace-glass-railing": ["RESIDENTIAL"],

  // Commercial
  "acp-wall-cladding": ["COMMERCIAL"],
  "glass-curtain-wall": ["COMMERCIAL"],
  "glass-shop-front": ["COMMERCIAL"],
  "office-glass-partition": ["COMMERCIAL"],
  "double-glazed-glass": ["COMMERCIAL", "SAFETY"],

  // Safety
  "tempered-glass": ["SAFETY"],
};

async function main() {
  const products = await prisma.product.findMany();
  let updated = 0;
  let skipped: string[] = [];

  for (const p of products) {
    const categories = categoryMap[p.slug];
    if (!categories) {
      skipped.push(p.slug);
      continue;
    }
    await prisma.product.update({
      where: { id: p.id },
      data: { categories: categories as any },
    });
    updated++;
  }

  console.log(`✅ Updated categories for ${updated} product(s).`);
  if (skipped.length) {
    console.log(
      `⚠️  No mapping found for: ${skipped.join(", ")} — add these slugs to categoryMap in prisma/assign-categories.ts and re-run.`
    );
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
