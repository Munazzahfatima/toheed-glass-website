import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/require-admin";

export const dynamic = "force-dynamic";

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const product = await prisma.product.findUnique({
    where: { id: params.id },
    include: { images: true, colors: { include: { color: true } } },
  });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();

  const product = await prisma.product.update({
    where: { id: params.id },
    data: {
      name: body.name,
      category: body.category,
      description: body.description,
      pricingType: body.pricingType,
      pricePerSqft: body.pricingType === "PER_SQFT" ? body.pricePerSqft : null,
      fixedPrice: body.pricingType === "FIXED" ? body.fixedPrice : null,
      fixedSize: body.fixedSize || null,
      shapes: body.shapes,
      isFeatured: !!body.isFeatured,
      hasCheckout: !!body.hasCheckout,
      isActive: !!body.isActive,
    },
  });

  return NextResponse.json(product);
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const session = await requireAdmin();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await prisma.product.delete({ where: { id: params.id } });
  return NextResponse.json({ success: true });
}
