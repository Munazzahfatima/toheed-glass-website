import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";
import { slugify } from "@/lib/slugify";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category");
  const activeOnly = searchParams.get("activeOnly") !== "false";

  const products = await prisma.product.findMany({
    where: {
      ...(category ? { category: category as any } : {}),
      ...(activeOnly ? { isActive: true } : {}),
    },
    include: { images: { orderBy: { sortOrder: "asc" } }, colors: { include: { color: true } } },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });

  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const slug = slugify(body.name);

  const product = await prisma.product.create({
    data: {
      name: body.name,
      slug: `${slug}-${Math.floor(Math.random() * 9000 + 1000)}`,
      category: body.category,
      description: body.description,
      pricingType: body.pricingType,
      pricePerSqft: body.pricingType === "PER_SQFT" ? body.pricePerSqft : null,
      fixedPrice: body.pricingType === "FIXED" ? body.fixedPrice : null,
      fixedSize: body.fixedSize || null,
      shapes: body.shapes || ["RECTANGLE", "SQUARE", "ROUND", "OVAL"],
      isFeatured: !!body.isFeatured,
      isActive: body.isActive !== false,
      hasCheckout: !!body.hasCheckout,
      images: {
        create: (body.images || []).map((url: string, i: number) => ({ url, sortOrder: i })),
      },
      colors: {
        create: (body.colorIds || []).map((colorId: string) => ({ colorId })),
      },
    },
    include: { images: true, colors: true },
  });

  return NextResponse.json(product, { status: 201 });
}
