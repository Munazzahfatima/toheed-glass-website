import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

async function main() {
  // ── Admin ──────────────────────────────────────────────────────────────
  const hashedPassword = await bcrypt.hash("Admin@12345", 10);
  await prisma.admin.upsert({
    where: { email: "admin@newtoheedglass.com" },
    update: {},
    create: {
      name: "Store Admin",
      email: "admin@newtoheedglass.com",
      password: hashedPassword,
      role: "SUPER_ADMIN",
    },
  });

  // ── Settings ───────────────────────────────────────────────────────────
  await prisma.settings.upsert({
    where: { id: "settings" },
    update: {},
    create: {
      id: "settings",
      installationEnabled: true,
      installationCharge: 3000,
      defaultDeliveryCharge: 1500,
      freeDeliveryThreshold: 50000,
      estimatedProductionDays: 7,
      estimatedDeliveryDays: 3,
      whatsappNumber: "923015025862",
      ownerEmail: "mudassirchadhar789@gmail.com",
    },
  });

  // ── LED Colors (used for products with checkout) ───────────────────────
  const colorData = [
    { name: "Warm White (3000K)", hexPreview: "#F6D9A0", extraCharge: 0 },
    { name: "Natural White (4000K)", hexPreview: "#F5EFD9", extraCharge: 0 },
    { name: "Cool White (6500K)", hexPreview: "#EAF2FB", extraCharge: 0 },
    { name: "Daylight White", hexPreview: "#FFFFFF", extraCharge: 0 },
    { name: "Soft Yellow", hexPreview: "#FCE38A", extraCharge: 500 },
    { name: "Golden Glow", hexPreview: "#D4A64A", extraCharge: 500 },
    { name: "Ice Blue", hexPreview: "#AEE7F5", extraCharge: 800 },
    { name: "RGB Multicolor", hexPreview: "#B892FF", extraCharge: 2000 },
    { name: "RGB Smart LED", hexPreview: "#FF8FB1", extraCharge: 3500 },
  ];

  const colors = [];
  for (const c of colorData) {
    const color = await prisma.ledColor.upsert({
      where: { slug: slugify(c.name) },
      update: {},
      create: {
        name: c.name,
        slug: slugify(c.name),
        hexPreview: c.hexPreview,
        extraCharge: c.extraCharge,
        description: `${c.name} LED lighting option.`,
      },
    });
    colors.push(color);
  }

  // ── DECORATIVE GLASS products ──────────────────────────────────────────
  const decorativeProducts = [
    {
      name: "Decorative LED Smart Mirror",
      slug: "decorative-led-smart-mirror",
      description:
        "Integrated LED lighting with customizable color temperature. Perfect for modern bathrooms, salons, hotels, and luxury interiors. Available in any custom size.",
      pricingType: "PER_SQFT" as const,
      pricePerSqft: 3500,
      isFeatured: true,
      hasCheckout: true,
      shapes: ["RECTANGLE", "SQUARE", "ROUND", "OVAL"] as const,
      colorCount: 9,
      images: [
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
        "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      ],
    },
    {
      name: "Decorative Beveled Mirror Wall",
      slug: "decorative-beveled-mirror-wall",
      description:
        "Premium beveled mirror wall panels available in any panel size. Ideal for feature walls in homes, hotels, restaurants, and commercial spaces.",
      pricingType: "PER_SQFT" as const,
      pricePerSqft: 2800,
      isFeatured: true,
      hasCheckout: true,
      shapes: ["RECTANGLE", "SQUARE"] as const,
      colorCount: 0,
      images: [
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
        "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80",
      ],
    },
    {
      name: "Ceiling Glass",
      slug: "ceiling-glass",
      description:
        "Decorative glass ceiling panels with custom designs, etching, and backlit options. Transform any room with a stunning overhead focal point.",
      pricingType: "PER_SQFT" as const,
      pricePerSqft: 2200,
      isFeatured: true,
      hasCheckout: false,
      shapes: ["RECTANGLE", "SQUARE"] as const,
      colorCount: 0,
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
      ],
    },
    {
      name: "Texture Crystal Glass Door Panel",
      slug: "texture-crystal-glass-door-panel",
      description:
        "Textured crystal glass door panels combining privacy and elegance. Ideal for interior doors, room dividers, and feature installations.",
      pricingType: "PER_SQFT" as const,
      pricePerSqft: 1900,
      isFeatured: false,
      hasCheckout: false,
      shapes: ["RECTANGLE"] as const,
      colorCount: 0,
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80",
      ],
    },
    {
      name: "Texture Crystal Glass Window Panel",
      slug: "texture-crystal-glass-window-panel",
      description:
        "Crystal texture glass window panels offering privacy while allowing diffused natural light. Available in multiple texture patterns.",
      pricingType: "PER_SQFT" as const,
      pricePerSqft: 1700,
      isFeatured: false,
      hasCheckout: false,
      shapes: ["RECTANGLE", "SQUARE"] as const,
      colorCount: 0,
      images: [
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80",
        "https://images.unsplash.com/photo-1503174971373-b1f69850bded?w=800&q=80",
      ],
    },
    {
      name: "Frosted Glass",
      slug: "frosted-glass",
      description:
        "Premium sandblasted frosted glass for partitions, shower screens, office dividers and window panels. Offers privacy with style.",
      pricingType: "PER_SQFT" as const,
      pricePerSqft: 1500,
      isFeatured: true,
      hasCheckout: false,
      shapes: ["RECTANGLE", "SQUARE"] as const,
      colorCount: 0,
      images: [
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
        "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
      ],
    },
    {
      name: "Privacy Frosted Glass",
      slug: "privacy-frosted-glass",
      description:
        "High-opacity privacy frosted glass ideal for bathroom windows, office cabins, and any space requiring complete privacy.",
      pricingType: "PER_SQFT" as const,
      pricePerSqft: 1600,
      isFeatured: false,
      hasCheckout: false,
      shapes: ["RECTANGLE", "SQUARE"] as const,
      colorCount: 0,
      images: [
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
      ],
    },
    {
      name: "Original Stained Glass",
      slug: "original-stained-glass",
      description:
        "Authentic handcrafted stained glass for windows, doors, skylights, and decorative panels. Custom designs available.",
      pricingType: "PER_SQFT" as const,
      pricePerSqft: 4500,
      isFeatured: true,
      hasCheckout: false,
      shapes: ["RECTANGLE", "SQUARE", "ROUND", "OVAL"] as const,
      colorCount: 0,
      images: [
        "https://images.unsplash.com/photo-1548263594-a71ea65a8598?w=800&q=80",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
      ],
    },
    {
      name: "Artistic Stained Glass",
      slug: "artistic-stained-glass",
      description:
        "Bespoke artistic stained glass creations for mosques, churches, homes, and commercial interiors. Fully customized artwork.",
      pricingType: "PER_SQFT" as const,
      pricePerSqft: 5500,
      isFeatured: true,
      hasCheckout: false,
      shapes: ["RECTANGLE", "SQUARE", "ROUND", "OVAL"] as const,
      colorCount: 0,
      images: [
        "https://images.unsplash.com/photo-1533158388-350df1a4e5f5?w=800&q=80",
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=800&q=80",
      ],
    },
  ];

  for (let i = 0; i < decorativeProducts.length; i++) {
    const p = decorativeProducts[i];
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } });
    if (existing) {
      // Update images if none exist
      const imgCount = await prisma.productImage.count({ where: { productId: existing.id } });
      if (imgCount === 0) {
        await prisma.productImage.createMany({
          data: p.images.map((url, idx) => ({ productId: existing.id, url, sortOrder: idx })),
        });
      }
      await prisma.product.update({
        where: { slug: p.slug },
        data: { hasCheckout: p.hasCheckout, isFeatured: p.isFeatured, sortOrder: i },
      });
    } else {
      await prisma.product.create({
        data: {
          name: p.name,
          slug: p.slug,
          category: "DECORATIVE_GLASS",
          description: p.description,
          pricingType: p.pricingType,
          pricePerSqft: p.pricePerSqft,
          shapes: p.shapes as any,
          isFeatured: p.isFeatured,
          hasCheckout: p.hasCheckout,
          sortOrder: i,
          images: { create: p.images.map((url, idx) => ({ url, sortOrder: idx })) },
          colors: p.colorCount > 0
            ? { create: colors.slice(0, p.colorCount).map((c) => ({ colorId: c.id })) }
            : undefined,
        },
      });
    }
  }

  // ── ARCHITECTURAL GLASS products ───────────────────────────────────────
  const architecturalProducts = [
    {
      name: "ACP Wall Cladding",
      slug: "acp-wall-cladding",
      description: "Aluminium Composite Panel (ACP) wall cladding for modern building façades. Lightweight, durable, and available in a wide range of colors and finishes.",
      isFeatured: true,
      images: [
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
        "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=800&q=80",
      ],
    },
    {
      name: "Double Glazed Glass",
      slug: "double-glazed-glass",
      description: "High-performance double glazed units for superior thermal and acoustic insulation. Ideal for residential, commercial, and industrial applications.",
      isFeatured: true,
      images: [
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
      ],
    },
    {
      name: "Glass Curtain Wall",
      slug: "glass-curtain-wall",
      description: "Structural glass curtain wall systems for office buildings, hotels, and corporate headquarters. Combines aesthetics with structural performance.",
      isFeatured: true,
      images: [
        "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
        "https://images.unsplash.com/photo-1541976590-713941681591?w=800&q=80",
      ],
    },
    {
      name: "Glass Shop Front",
      slug: "glass-shop-front",
      description: "Professional glass shop fronts for retail stores, banks, and commercial spaces. Frameless and framed options available.",
      isFeatured: true,
      images: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
        "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=800&q=80",
      ],
    },
    {
      name: "Office Glass Partition",
      slug: "office-glass-partition",
      description: "Modern frameless and framed office glass partition systems. Create open, professional workspaces while maintaining privacy.",
      isFeatured: false,
      images: [
        "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
        "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80",
      ],
    },
    {
      name: "Shower Cabin",
      slug: "shower-cabin",
      description: "Custom frameless and semi-frameless shower cabins with tempered safety glass. Designed for luxury bathrooms.",
      isFeatured: true,
      images: [
        "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80",
      ],
    },
    {
      name: "Skylight Glass",
      slug: "skylight-glass",
      description: "Structural skylight glazing systems for residential and commercial roofs. Flood your interiors with natural light.",
      isFeatured: false,
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
        "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80",
      ],
    },
    {
      name: "Single Glass Door",
      slug: "single-glass-door",
      description: "Frameless and framed single glass doors for offices, homes, and commercial spaces. Tempered for safety.",
      isFeatured: false,
      images: [
        "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
        "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?w=800&q=80",
      ],
    },
    {
      name: "Stairs Glass Railing",
      slug: "stairs-glass-railing",
      description: "Elegant toughened glass staircase railings and balustrades. Available in frameless and semi-frameless designs.",
      isFeatured: true,
      images: [
        "https://images.unsplash.com/photo-1558618047-f4e80ccacd02?w=800&q=80",
        "https://images.unsplash.com/photo-1600210491892-03d54730d505?w=800&q=80",
      ],
    },
    {
      name: "Tempered Glass",
      slug: "tempered-glass",
      description: "Heat-treated tempered safety glass for doors, windows, partitions, and furniture. Four times stronger than standard glass.",
      isFeatured: false,
      images: [
        "https://images.unsplash.com/photo-1541976590-713941681591?w=800&q=80",
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80",
      ],
    },
    {
      name: "Terrace Glass Railing",
      slug: "terrace-glass-railing",
      description: "Weather-resistant toughened glass terrace railings and balustrades. Provides unobstructed views with maximum safety.",
      isFeatured: true,
      images: [
        "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
        "https://images.unsplash.com/photo-1558618047-f4e80ccacd02?w=800&q=80",
      ],
    },
  ];

  for (let i = 0; i < architecturalProducts.length; i++) {
    const p = architecturalProducts[i];
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } });
    if (existing) {
      const imgCount = await prisma.productImage.count({ where: { productId: existing.id } });
      if (imgCount === 0) {
        await prisma.productImage.createMany({
          data: p.images.map((url, idx) => ({ productId: existing.id, url, sortOrder: idx })),
        });
      }
      await prisma.product.update({
        where: { slug: p.slug },
        data: { isFeatured: p.isFeatured, sortOrder: i },
      });
    } else {
      await prisma.product.create({
        data: {
          name: p.name,
          slug: p.slug,
          category: "ARCHITECTURAL_GLASS",
          description: p.description,
          pricingType: "PER_SQFT",
          pricePerSqft: 1500,
          isFeatured: p.isFeatured,
          hasCheckout: false,
          sortOrder: i,
          images: { create: p.images.map((url, idx) => ({ url, sortOrder: idx })) },
        },
      });
    }
  }

  // ── Gallery items ──────────────────────────────────────────────────────
  const galleryItems = [
    { title: "Luxury Villa Staircase Glass Railing",       imageUrl: "https://images.unsplash.com/photo-1558618047-f4e80ccacd02?w=800&q=80" },
    { title: "Modern Office Glass Partition",              imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80" },
    { title: "Hotel Lobby LED Mirror Installation",        imageUrl: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&q=80" },
    { title: "Commercial Glass Shop Front",                imageUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80" },
    { title: "Artistic Stained Glass Window",              imageUrl: "https://images.unsplash.com/photo-1548263594-a71ea65a8598?w=800&q=80" },
    { title: "Frameless Shower Cabin Installation",        imageUrl: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80" },
    { title: "Glass Curtain Wall Building Facade",         imageUrl: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80" },
    { title: "Terrace Glass Railing with City View",       imageUrl: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80" },
    { title: "Frosted Glass Office Partition",             imageUrl: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800&q=80" },
    { title: "Decorative Beveled Mirror Feature Wall",     imageUrl: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80" },
    { title: "ACP Cladding Modern Building",               imageUrl: "https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?w=800&q=80" },
    { title: "Skylight Glass Installation",                imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80" },
  ];

  // Only add gallery items that don't exist yet
  const existingGallery = await prisma.galleryItem.count();
  if (existingGallery === 0) {
    for (let i = 0; i < galleryItems.length; i++) {
      await prisma.galleryItem.create({
        data: { ...galleryItems[i], sortOrder: i },
      });
    }
    console.log("   Gallery items added:", galleryItems.length);
  }

  console.log("✅ Seed complete!");
  console.log("   Admin login: admin@newtoheedglass.com / Admin@12345");
  console.log("   Decorative Glass products:", decorativeProducts.length);
  console.log("   Architectural Glass products:", architecturalProducts.length);
  console.log("   Products with checkout (order wizard): Decorative LED Smart Mirror + Beveled Mirror Wall");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
