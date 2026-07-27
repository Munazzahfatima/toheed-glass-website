import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const p = await prisma.product.findUnique({ where: { slug: "decorative-beveled-mirror-wall" } });
  if (!p) { console.log("not found"); return; }
  // Add luxury mirror image as first image
  await prisma.productImage.deleteMany({ where: { productId: p.id } });
  await prisma.productImage.createMany({
    data: [
      { productId: p.id, url: "/images/led-mirror-luxury.jpeg", sortOrder: 0 },
      { productId: p.id, url: "/images/beveled-mirror-wall.jpeg", sortOrder: 1 },
      { productId: p.id, url: "/images/glass-5.jpeg", sortOrder: 2 },
    ]
  });
  console.log("✅ Luxury mirror image added to beveled mirror wall");
}
main().catch(console.error).finally(() => prisma.$disconnect());
